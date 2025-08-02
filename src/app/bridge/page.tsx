"use client";
import { useState, useEffect, FormEvent, useCallback } from "react";
import { Bounce, toast } from "react-toastify";
import { useTheme } from "next-themes";
import { ComboBox } from "@components/ComboBox";
import { chains, contractAddressMapping } from "@lib/chains";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { Input } from "@components/ui/input";
import { Button } from "@components/ui/button";
import { ArrowLongDown, CreditCard } from "@mynaui/icons-react";
import { AnimatePresence, motion } from "framer-motion";
import { tokens } from "@lib/tokens";
import { NumericFormat } from "react-number-format";
import { MarketDataResponse } from "@/types/uniblock-response";
import Navbar from "@components/Navbar";
import { useBalance, useWriteContract } from "wagmi";
import { useAppKitAccount } from "@reown/appkit/react";
import { erc20Abi, parseUnits, type Address } from "viem";
import Image from "next/image";
import { ParticlesContainer } from "@/components/ParticlesContainer";
import { abi } from "@/abi";

export default function Bridge() {
  const { resolvedTheme } = useTheme();
  const [sourceChain, setSourceChain] = useState("");
  const [destinationChain, setDestinationChain] = useState("");
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [receivingAddressInputShow, setReceivingAddressInputShow] =
    useState(false);
  const [receivingAddress, setReceivingAddress] = useState("");
  const [marketData, setMarketData] = useState<MarketDataResponse | null>(null);
  const [unableToFetch, setUnableToFetch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [needsApproval, setNeedsApproval] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const { address, isConnected } = useAppKitAccount();
  const { refetch } = useBalance({ address: address as Address });

  // Separate hooks for approval and main transaction
  const {
    writeContract: writeApproval,
    isPending: isApprovalPending,
    isSuccess: isApprovalSuccess,
    isError: isApprovalError,
    error: approvalError,
  } = useWriteContract();

  const {
    writeContract: writeMainTransaction,
    isPending: isMainTxPending,
    isSuccess: isMainTxSuccess,
    isError: isMainTxError,
    error: mainTxError,
  } = useWriteContract();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/uniblock`, {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });
        const data = await response.json();
        setMarketData(data);
        console.log("Fetched market data:", data);
      } catch (error) {
        console.error("Error fetching market data:", error);
        setUnableToFetch(true);
      }
    };

    fetchData();
  }, []);

  // Reset approval state when token or chain changes
  useEffect(() => {
    setNeedsApproval(false);
    setIsApproved(false);
  }, [token, sourceChain]);

  // Define executeMainTransaction before using it in useEffect
  const executeMainTransaction = useCallback(async () => {
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
              chains.find((chain) => chain.name === destinationChain)
                ?.chainId || 0,
            protocolTokenId:
              tokens.find((t) => t.name === token)?.protocolTokenId || 1,
            receiver: (receivingAddress as `0x${string}`) || address,
            amount: parseUnits(amount.replace(/,/g, ""), 18),
          },
        ],
      });

      // Note: API call removed to prevent duplicate transactions
      // The blockchain transaction above should be sufficient
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
  }, [
    writeMainTransaction,
    sourceChain,
    destinationChain,
    token,
    receivingAddress,
    address,
    amount,
    resolvedTheme,
  ]);

  // Handle approval transaction success - automatically trigger main transaction
  useEffect(() => {
    if (isApprovalSuccess) {
      setIsApproved(true);
      setNeedsApproval(false);

      toast.success("Token approved! Creating transaction...", {
        position: "bottom-right",
        autoClose: 3000,
        theme: resolvedTheme || "dark",
        transition: Bounce,
      });

      // Automatically trigger the main transaction
      executeMainTransaction();
    }
  }, [isApprovalSuccess, resolvedTheme, executeMainTransaction]);

  // Handle approval transaction error
  useEffect(() => {
    if (isApprovalError) {
      console.error("Approval error:", approvalError);
      toast.error("Approval failed. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        theme: resolvedTheme || "dark",
        transition: Bounce,
      });
    }
  }, [isApprovalError, approvalError, resolvedTheme]);

  // Handle main transaction success
  useEffect(() => {
    if (isMainTxSuccess) {
      setIsSubmitting(false);
      toast.success("Intent created successfully!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: resolvedTheme || "dark",
        transition: Bounce,
      });

      // Optional: Log to backend after successful blockchain transaction
      const logToBackend = async () => {
        try {
          const requestBody = {
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
            body: JSON.stringify(requestBody),
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

      logToBackend();

      // Reset form
      setAmount("");
      setSourceChain("");
      setDestinationChain("");
      setToken("");
      setReceivingAddress("");
      setNeedsApproval(false);
      setIsApproved(false);
    }
  }, [
    isMainTxSuccess,
    resolvedTheme,
    sourceChain,
    destinationChain,
    token,
    amount,
    address,
    receivingAddress,
  ]);

  // Handle main transaction error
  useEffect(() => {
    if (isMainTxError) {
      setIsSubmitting(false);
      console.error("Main transaction error:", mainTxError);
      toast.error("Transaction failed. Please try again.", {
        position: "bottom-right",
        autoClose: 3000,
        theme: resolvedTheme || "dark",
        transition: Bounce,
      });
    }
  }, [isMainTxError, mainTxError, resolvedTheme]);

  const handleGetBalance = async () => {
    const balance = await refetch();
    console.log(`${balance?.data?.formatted} ${balance?.data?.symbol}`);
    return balance?.data?.formatted.toString() || "0";
  };

  const handleApproval = async () => {
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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // For ETH, go directly to main transaction
    if (token === "ETH") {
      setIsSubmitting(true);
      executeMainTransaction();
      return;
    }

    // For ERC20 tokens, check if approval is needed
    if (!isApproved) {
      setNeedsApproval(true);
      setIsSubmitting(true); // Set this so the flow continues after approval
      toast.info("Token approval required before creating transaction", {
        position: "bottom-right",
        autoClose: 3000,
        theme: resolvedTheme || "dark",
        transition: Bounce,
      });
      return;
    }

    // If already approved, go directly to main transaction
    setIsSubmitting(true);
    executeMainTransaction();
  };
  return (
    <div className="relative flex flex-col items-center w-full h-full p-5 transition-all">
      <Navbar showWallet />
      <>
        {/* Radial Blur Effect */}
        <div className="absolute -translate-y-1/2 inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(23,193,222,0.45)_0%,_transparent_90%)] blur-3xl z-0 scale-y-150 scale-x-75" />
        <div className="absolute -translate-y-1/2 inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(23,193,222,0.35)_0%,_transparent_60%)] blur-xl z-[1] scale-y-150 scale-x-75" />
        <div className="absolute -translate-y-1/2 inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(23,193,222,0.15)_0%,_transparent_30%)] blur-md z-[2] scale-y-150 scale-x-75" />

        {/* Rays */}
        <div className="absolute -top-0 w-1/2 h-[50vh] pointer-events-none select-none z-[1]">
          <Image
            src="/hero/Rays.svg"
            alt="Sunray"
            width={1000}
            height={1000}
            className="absolute top-0 left-1/2 -translate-x-1/2 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-auto scale-150 bg-blend-overlay"
          />
          <div className="absolute inset-0">
            <ParticlesContainer />
          </div>
        </div>

        <div className="relative h-full w-full flex flex-col items-center text-center z-10">
          {/* Floating Icons */}
          <div className="absolute top-12 w-1/2 h-full pointer-events-none opacity-60">
            <Image
              src="/hero/floating-coin-3.svg"
              alt="Flow"
              width={110}
              height={120}
              className="absolute top-12 left-10 animate-float delay-1000"
            />
            <Image
              src="/hero/floating-coin-1.svg"
              alt="USDC"
              width={120}
              height={120}
              className="absolute top-96 -left-40 animate-float"
            />
            <Image
              src="/hero/floating-coin-2.svg"
              alt="Doge"
              width={120}
              height={120}
              className="absolute top-36 right-12 animate-float delay-2000"
            />
            <Image
              src="/hero/floating-coin-4.svg"
              alt="USDT"
              width={120}
              height={120}
              className="absolute top-96 -right-48 animate-float delay-3000"
            />
          </div>
        </div>
      </>
      <div className="w-full h-full min-h-[90vh] m-auto flex flex-col items-center gap-4 justify-center flex-wrap mt-16 z-20">
        <form
          onSubmit={handleSubmit}
          className="w-full relative md:max-w-lg bg-card text-card-foreground py-6 px-10 rounded-3xl shadow-xl transition"
        >
          <div className="flex flex-col gap-2 pb-2 px-4">
            <div className="flex items-center justify-between">
              <div className="text-2xl font-light">Bridge</div>
            </div>
            <div className="text-muted-foreground text-base font-light">
              Your bridge will be optimized for the lowest, and most efficient
              settlement.
            </div>
          </div>
          <div>
            <div className="border border-theme-surface-border px-4 flex items-center justify-between rounded-xl border-none">
              <div className="text-base font-light">From</div>
              <ComboBox
                label={"Select Chain"}
                options={chains}
                selection={sourceChain}
                setSelection={setSourceChain}
              />
            </div>
            <div className={"py-3 px-4 flex items-center justify-between"}>
              <div className="text-base font-light">Token</div>
              <div className={"flex justify-end gap-2"}>
                <ArrowLongDown height={40} />
                <ComboBox
                  label={"Select Token"}
                  options={tokens}
                  selection={token}
                  setSelection={setToken}
                  className={"w-[150px]"}
                />
              </div>
            </div>
            <div className="border border-theme-surface-border px-4 flex items-center justify-between rounded-xl border-none">
              <div className="text-base font-light">To</div>
              <ComboBox
                label={"Select Chain"}
                options={chains}
                selection={destinationChain}
                setSelection={setDestinationChain}
              />
            </div>
            <div className="py-3 px-4 space-y-3 rounded-xl">
              <div className="text-base font-light">Amount</div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between gap-2">
                  <NumericFormat
                    disabled={!token}
                    allowNegative={false}
                    thousandSeparator=","
                    customInput={Input}
                    inputMode="numeric"
                    displayType="input"
                    className="w-full text-base font-light outline-none"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <Button
                    type="button"
                    disabled={!token || !isConnected}
                    onClick={async () => setAmount(await handleGetBalance())}
                  >
                    Max
                  </Button>
                </div>
                <div className="text-base font-light text-muted-foreground flex justify-between">
                  {!marketData
                    ? !unableToFetch
                      ? "Loading market data..."
                      : "Unable to fetch market data"
                    : !token
                    ? "Select a token to see the estimated value"
                    : amount
                    ? new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(
                        parseFloat(amount.replaceAll(",", "")) *
                          marketData.data[token.toUpperCase()].usd
                      )
                    : "$0.00"}
                </div>
              </div>
            </div>
            <div className="border border-theme-surface-border px-4 space-y-1 rounded-xl border-none text-sm">
              <div className="flex w-full justify-between disabled:cursor-not-allowed">
                <Accordion type="single" collapsible className={"w-full"}>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="text-sm font-normal underline decoration-dashed group-hover:decoration-solid underline-offset-4">
                        Estimates
                      </div>
                    </AccordionTrigger>
                    <AccordionContent
                      className={"flex flex-row justify-between"}
                    >
                      <div className="text-sm font-normal underline decoration-dashed underline-offset-4">
                        Estimated Fee
                      </div>
                      <div> -</div>
                    </AccordionContent>
                    <AccordionContent
                      className={"flex flex-row justify-between"}
                    >
                      <div className="text-sm font-normal underline decoration-dashed underline-offset-4">
                        Avg Settlement Time
                      </div>
                      <div>5-10 min</div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>
          <AnimatePresence>
            {receivingAddressInputShow && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="py-3 px-4 space-y-3 rounded-xl group overflow-hidden"
              >
                <div className="text-base font-light">Receiving Address</div>
                <div className="flex flex-row gap-2 relative">
                  <Input
                    className="w-full text-base font-light sm:w-full"
                    placeholder="Enter Ethereum Wallet Address"
                    type="text"
                    onChange={(e) => setReceivingAddress(e.target.value)}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex gap-2 px-4 rounded-xl">
            {needsApproval && token !== "ETH" && !isApproved ? (
              <Button
                loading={isApprovalPending}
                className="w-full"
                disabled={
                  !isConnected ||
                  isApprovalPending ||
                  !sourceChain ||
                  !destinationChain ||
                  !token ||
                  !amount
                }
                type="button"
                onClick={handleApproval}
              >
                {isApprovalPending
                  ? "Approving..."
                  : `Approve ${token} for spending`}
              </Button>
            ) : (
              <Button
                loading={isSubmitting || isMainTxPending}
                className="w-full"
                disabled={
                  !isConnected ||
                  isSubmitting ||
                  isMainTxPending ||
                  !sourceChain ||
                  !destinationChain ||
                  !token ||
                  !amount
                }
                type="submit"
              >
                {isSubmitting || isMainTxPending
                  ? "Creating Intent..."
                  : isConnected
                  ? "Create Intent"
                  : "Connect an Ethereum Wallet to proceed"}
              </Button>
            )}
            <Button
              type="button"
              onClick={() =>
                setReceivingAddressInputShow(!receivingAddressInputShow)
              }
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap
                                disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0"
            >
              <CreditCard />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
