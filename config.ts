import { createConfig, http, injected } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

export const config = createConfig({
    chains: [mainnet, sepolia],
    connectors: [
        injected(),
        walletConnect({ projectId: (import.meta as any).env.VITE_WALLETCONNECT_PROJECT_ID }),
    ],
    transports: {
        [mainnet.id]: http((import.meta as any).env.VITE_MAINNET_RPC_URL),
        [sepolia.id]: http((import.meta as any).env.VITE_SEPOLIA_RPC_URL),
    },
})