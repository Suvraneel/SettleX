import { parseUnits, erc20Abi, formatUnits } from "viem";
import { toast, Bounce } from "react-toastify";
import { tokens } from "@lib/tokens";
import { chains, contractAddressMapping } from "@lib/chains";

export interface BridgeLogicParams {
  token: string;
  amount: string;
  sourceChain: string;
  destinationChain: string;
  receivingAddress: string;
  address: string | undefined;
  resolvedTheme: string | undefined;
  checkAllowance: () => Promise<{ data?: bigint }>;
  writeMainTransaction: (args: {
    address: `0x${string}`;
    abi: readonly unknown[];
    functionName: string;
    args: readonly unknown[];
  }) => void;
  writeApproval: (args: {
    address: `0x${string}`;
    abi: readonly unknown[];
    functionName: string;
    args: readonly unknown[];
  }) => void;
  setIsSubmitting: (value: boolean) => void;
  setNeedsApproval: (value: boolean) => void;
  setIsApproved: (value: boolean) => void;
  setApprovalButtonText: (value: string) => void;
  isApprovalPending: boolean;
  abi: readonly unknown[];
  refetch?: () => Promise<{ data?: { formatted: string; symbol: string } }>; // For balance fetching
}

// Helper function to check if approval is needed
export const checkApprovalNeeded = async (
  params: BridgeLogicParams
): Promise<boolean> => {
  const { token, amount, checkAllowance } = params;

  if (!token || token === "ETH" || !amount) {
    return false;
  }

  try {
    const { data: allowance } = await checkAllowance();
    if (!allowance) return true;

    const requiredAmount = parseUnits(amount.replace(/,/g, ""), 18);
    return allowance < requiredAmount;
  } catch (error) {
    console.error("Error checking allowance:", error);
    return true; // Assume approval needed if we can't check
  }
};

// Helper function to get approval button text based on current allowance
export const getApprovalButtonText = async (
  params: BridgeLogicParams
): Promise<string> => {
  const { token, amount, checkAllowance, isApprovalPending } = params;

  if (isApprovalPending) return "Approving...";

  if (!token || token === "ETH" || !amount) {
    return `Approve ${token || "Token"} for spending`;
  }

  try {
    const { data: allowance } = await checkAllowance();

    if (!allowance || allowance === BigInt(0)) {
      return `Approve ${token} for spending`;
    }

    const requiredAmount = parseUnits(amount.replace(/,/g, ""), 18);
    if (allowance < requiredAmount) {
      return `Increase ${token} allowance`;
    }

    return `Approve ${token} for spending`;
  } catch (error) {
    console.error("Error checking allowance for button text:", error);
    return `Approve ${token} for spending`;
  }
};

// Execute main transaction function
export const executeMainTransaction = async (
  params: BridgeLogicParams
): Promise<void> => {
  const {
    writeMainTransaction,
    sourceChain,
    destinationChain,
    token,
    receivingAddress,
    address,
    amount,
    resolvedTheme,
    setIsSubmitting,
    abi,
  } = params;

  try {
    // Write contract call to create intent
    writeMainTransaction({
      address: contractAddressMapping[sourceChain],
      abi,
      functionName: "createTransaction",
      args: [
        {
          sourceChainId:
            chains.find((chain) => chain.name === sourceChain)?.chainId || 0,
          destinationChainId:
            chains.find((chain) => chain.name === destinationChain)?.chainId ||
            0,
          protocolTokenId:
            tokens.find((t) => t.name === token)?.protocolTokenId || 1,
          receiver: (receivingAddress as `0x${string}`) || address,
          amount: parseUnits(amount.replace(/,/g, ""), 18),
        },
      ],
    });

    console.log("Main transaction initiated on blockchain");
  } catch (error) {
    console.error("Main transaction error:", error);
    toast.error("Failed to create intent. Please try again.", {
      position: "bottom-right",
      autoClose: 3000,
      theme: resolvedTheme || "dark",
      transition: Bounce,
    });
    setIsSubmitting(false);
  }
};

// Handle approval function
export const handleApproval = async (
  params: BridgeLogicParams
): Promise<void> => {
  const { address, token, sourceChain, amount, writeApproval, resolvedTheme } =
    params;

  if (!address || !token || token === "ETH") return;

  const selectedToken = tokens.find((t) => t.name === token);
  if (
    !selectedToken?.contractAddresses[
      chains.find((chain) => chain.name === sourceChain)?.chainId || 0
    ]
  ) {
    toast.error("Token contract address not found for this chain", {
      position: "bottom-right",
      autoClose: 3000,
      theme: resolvedTheme || "dark",
      transition: Bounce,
    });
    return;
  }

  const spenderAddress = contractAddressMapping[sourceChain];
  const tokenAddress = selectedToken.contractAddresses[
    chains.find((chain) => chain.name === sourceChain)?.chainId || 0
  ] as `0x${string}`;

  const approvalAmount = parseUnits(amount.replace(/,/g, ""), 18);

  try {
    writeApproval({
      address: tokenAddress,
      abi: erc20Abi,
      functionName: "approve",
      args: [spenderAddress, approvalAmount],
    });
  } catch (error) {
    console.error("Approval error:", error);
    toast.error("Failed to initiate approval transaction", {
      position: "bottom-right",
      autoClose: 3000,
      theme: resolvedTheme || "dark",
      transition: Bounce,
    });
  }
};

// Handle form submission function
export const handleSubmit = async (
  e: React.FormEvent<HTMLFormElement>,
  params: BridgeLogicParams
): Promise<void> => {
  e.preventDefault();

  const {
    token,
    setIsSubmitting,
    setNeedsApproval,
    setIsApproved,
    setApprovalButtonText,
    resolvedTheme,
  } = params;

  // For ETH, go directly to main transaction
  if (token === "ETH") {
    setIsSubmitting(true);
    await executeMainTransaction(params);
    return;
  }

  // For ERC20 tokens, check if approval is needed
  setIsSubmitting(true);

  try {
    const needsApproval = await checkApprovalNeeded(params);

    if (needsApproval) {
      // Update button text based on current allowance
      const buttonText = await getApprovalButtonText(params);
      setApprovalButtonText(buttonText);

      setNeedsApproval(true);
      setIsApproved(false);
      toast.info("Token approval required before creating transaction", {
        position: "bottom-right",
        autoClose: 3000,
        theme: resolvedTheme || "dark",
        transition: Bounce,
      });
      // Don't reset isSubmitting here - approval flow will continue
      return;
    }

    // If no approval needed, go directly to main transaction
    setIsApproved(true);
    setNeedsApproval(false);
    await executeMainTransaction(params);
  } catch (error) {
    console.error("Error checking approval:", error);
    setIsSubmitting(false);
    toast.error("Failed to check token approval status", {
      position: "bottom-right",
      autoClose: 3000,
      theme: resolvedTheme || "dark",
      transition: Bounce,
    });
  }
};

// Handle getting wallet balance
export const handleGetBalance = async (
  params: Pick<BridgeLogicParams, "refetch"> & {
    token?: string;
    sourceChain?: string;
    address?: string;
    readTokenBalance?: () => Promise<{ data?: bigint }>;
  }
): Promise<string> => {
  const { refetch, token, sourceChain, address, readTokenBalance } = params;

  // If no token specified or token is ETH, fetch native balance
  if (!token || token === "ETH") {
    if (!refetch) {
      console.warn("refetch function not provided for native balance");
      return "0";
    }

    try {
      const balance = await refetch();
      console.log(`${balance?.data?.formatted} ${balance?.data?.symbol}`);
      return balance?.data?.formatted?.toString() || "0";
    } catch (error) {
      console.error("Error fetching native balance:", error);
      return "0";
    }
  }

  // For ERC20 tokens, fetch token balance
  if (!address || !sourceChain || !readTokenBalance) {
    console.warn("Missing required parameters for ERC20 balance fetch");
    return "0";
  }

  try {
    const selectedToken = tokens.find((t) => t.name === token);
    if (!selectedToken) {
      console.warn(`Token ${token} not found`);
      return "0";
    }

    const sourceChainId = chains.find((chain) => chain.name === sourceChain)?.chainId || 0;
    const tokenAddress = selectedToken.contractAddresses[sourceChainId] as `0x${string}`;

    if (!tokenAddress) {
      console.warn(`Token contract address not found for ${token} on ${sourceChain}`);
      return "0";
    }

    const { data: balance } = await readTokenBalance();

    if (balance === undefined) {
      console.warn("Failed to fetch token balance");
      return "0";
    }

    // Convert from wei to token units (assuming 18 decimals)
    const formatted = formatUnits(balance, 18);
    console.log(`${token} balance: ${formatted}`);
    return formatted;
  } catch (error) {
    console.error(`Error fetching ${token} balance:`, error);
    return "0";
  }
};

// Log transaction to backend
export const logToBackend = async (
  params: Pick<
    BridgeLogicParams,
    | "sourceChain"
    | "destinationChain"
    | "token"
    | "amount"
    | "address"
    | "receivingAddress"
  >
): Promise<void> => {
  const {
    sourceChain,
    destinationChain,
    token,
    amount,
    address,
    receivingAddress,
  } = params;

  try {
    const currentFormValues = {
      sourceChain,
      destChain: destinationChain,
      token,
      amount: amount.replaceAll(",", ""),
      address,
      senderWalletAddress: address,
      recipientWalletAddress: receivingAddress || address,
    };

    const response = await fetch("/api/intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentFormValues),
    });

    const result = await response.json();
    if (result.success) {
      console.log(`Intent logged with ID: ${result.data?.intentId}`);
    }
  } catch (error) {
    console.error("Backend logging error:", error);
    // Don't show error to user since main transaction succeeded
  }
};
