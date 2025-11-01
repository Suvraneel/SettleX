import {cookieStorage, createStorage} from '@wagmi/core'
import {WagmiAdapter} from '@reown/appkit-adapter-wagmi'
import {arbitrumSepolia, baseSepolia, optimismSepolia, scrollSepolia} from "@reown/appkit/networks";

// Get projectId from https://cloud.reown.com
export const projectId = 'fbf4aed6e4f0d8baadb9de4fb451d08b'

if (!projectId) {
    throw new Error('Project ID is not defined')
}

export const networks = [arbitrumSepolia, baseSepolia, scrollSepolia, optimismSepolia]

// Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks
})

export const config = wagmiAdapter.wagmiConfig