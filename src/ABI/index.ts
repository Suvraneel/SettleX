export const abi = [
  {
    name: "createTransaction",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      {
        name: "_transaction",
        type: "tuple",
        internalType: "struct Spoke.CrossChainTransfer",
        components: [
          {
            name: "sourceChainId",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "destinationChainId",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "protocolTokenId",
            type: "uint32",
            internalType: "uint32",
          },
          {
            name: "receiver",
            type: "address",
            internalType: "address",
          },
          { name: "amount", type: "uint256", internalType: "uint256" },
        ],
      },
    ],
    outputs: [],
  },
] as const;
