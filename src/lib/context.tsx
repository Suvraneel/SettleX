"use client";

import { wagmiAdapter, projectId } from "../config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createAppKit } from "@reown/appkit/react";
import {
  arbitrumSepolia,
  baseSepolia,
  scrollSepolia,
  optimismSepolia,
} from "@reown/appkit/networks";
import React, { type ReactNode } from "react";
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi";

// Set up queryClient
const queryClient = new QueryClient();

if (!projectId) {
  throw new Error("Project ID is not defined");
}

// Set up metadata
const metadata = {
  name: "SettleX",
  description: "The Settlement Layer for Stablecoins",
  url: "https://settlex.fi",
  icons: ["https://assets.reown.com/reown-profile-pic.png"],
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [baseSepolia, arbitrumSepolia, scrollSepolia, optimismSepolia],
  defaultNetwork: baseSepolia,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  themeMode: "dark",
  themeVariables: {
    "--w3m-accent": "var(--accent-80)",
    "--w3m-color-mix": "var(--card)",
    "--w3m-color-mix-strength": 40,
    "--w3m-font-family": "Helvetica Neue, Inter, sans-serif",
    // "--w3m-border-radius-master": "0.5rem",
  },
});

function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode;
  cookies: string | null;
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  );

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;