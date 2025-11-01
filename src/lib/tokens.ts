const baseURL = "/tokens/";

export interface Token {
  name: string;
  logo: string;
  protocolTokenId: number;
  contractAddresses: Record<number, string>;
}

export const tokens: Token[] = [
  {
    name: "USDT",
    logo: baseURL + "usdt.png",
    protocolTokenId: 1,
    // Add contract addresses for different chains
    contractAddresses: {
      84532: "0xe0200a6BF2c0F22A6da80531976Cfd6Fe339E045", // Base
      11155420: "0xd6908808D6D5c825994A34348202C82c26C9a63f", // Optimism
      534351: "0x1922968E9A8131FEda8bD04c1dD0312A78a0356C", // Scroll
    },
  },
  // {
  //   name: "ETH",
  //   logo: baseURL + "eth.png",
  //   protocolTokenId: 2,
  //   // ETH is native, no contract address needed
  //   contractAddresses: {},
  // },
  // {
  //   name: "WETH",
  //   logo: baseURL + "weth.png",
  //   protocolTokenId: 3,
  //   contractAddresses: {}, // Add later
  // },
  // {
  //   name: "USDC",
  //   logo: baseURL + "usdc.png",
  //   protocolTokenId: 4,
  //   contractAddresses: {}, // Add later
  // },
  // {
  //   name: "PufETH",
  //   logo: baseURL + "pufeth.png",
  //   protocolTokenId: 5,
  //   contractAddresses: {}, // Add later
  // },
];
