const baseURL = "/chains/";
export const chains = [
  { name: "BASE", logo: baseURL + "BASE.avif", chainId: 84532 },
  { name: "Optimism", logo: baseURL + "Optimism.avif", chainId: 11155420 },
  { name: "Scroll", logo: baseURL + "Scroll.avif", chainId: 534351 },
  { name: "ARB", logo: baseURL + "ARB.avif", chainId: 421614 },
  { name: "Ethereum", logo: baseURL + "Ethereum.avif", chainId: 1 },
  { name: "BSC", logo: baseURL + "BSC.avif", chainId: 56 },
  { name: "Unichain", logo: baseURL + "Unichain.svg", chainId: 130 },
  { name: "Polygon", logo: baseURL + "Polygon.avif", chainId: 137 },
  { name: "zksync", logo: baseURL + "zksync.avif", chainId: 324 },
  { name: "Ronin", logo: baseURL + "Ronin.avif", chainId: 2020 },
  { name: "Ape-Chain", logo: baseURL + "Ape-Chain.avif", chainId: 33139 },
  { name: "Mode", logo: baseURL + "Mode.avif", chainId: 34443 },
  { name: "Avalanche", logo: baseURL + "Avalanche.png", chainId: 43114 },
  { name: "zircuit", logo: baseURL + "zircuit.svg", chainId: 48900 },
  { name: "Linea", logo: baseURL + "Linea.avif", chainId: 59144 },
  { name: "blast", logo: baseURL + "blast.png", chainId: 81457 },
  { name: "Taiko", logo: baseURL + "Taiko.avif", chainId: 167000 },
];

export const contractAddressMapping: Record<string, `0x${string}`> = {
  Arbitrum: "0x34266b2b424F3cA4FE3ca2aE785633eb5d804d2d",
  BASE: "0x6dC368ea0F0889D0babafDEbbFd8C30485b490c5",
  Optimism: "0x40D57e8dA5205d9EA0B5eF48f462d2e1Cc452508",
  Scroll: "0x9768C04C9bC6297bB97ebc7FdE519018A693Bc86",
};
