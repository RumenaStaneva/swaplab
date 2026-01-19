import { createContext, useContext, useMemo } from "react";
import { useConnect, useChainId, useSwitchChain, useConnection, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";

type WalletContextValue = {
    address?: `0x${string}`;
    chainId?: number;
    isConnected: boolean;
    isConnecting: boolean;
    metamaskChainId: number | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    switchWrongChain: (targetChainId: number) => Promise<void>;
};

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
    const { address, isConnected, chain: metamaskChain } = useConnection();
    const { connect, isPending } = useConnect();
    const { disconnect } = useDisconnect();
    const switchChain = useSwitchChain();
    const chainId = useChainId();

    const connectWallet = () =>

        new Promise<void>((resolve, reject) => {
            connect(
                { connector: injected() },
                {
                    onSuccess: () => {
                        resolve();
                    },
                    onError: (err) => reject(err),
                }
            );
        });

    const disconnectWallet = () => disconnect();

    // In a perfect world this would change the wrong chain to the target chain and update the metamaskChain accordingly
    // But we don't live in a perfect world
    const switchWrongChain = async (targetChainId: number) => {
        try {
            await switchChain.mutate({ chainId: targetChainId });
        } catch (error) {
            console.error("Failed to switch chains:", error);
        }
    };

    const metamaskChainId = metamaskChain?.id ?? null;

    const value = useMemo(
        () => ({
            address,
            chainId,
            isConnected,
            isConnecting: isPending,
            connectWallet,
            disconnectWallet,
            switchWrongChain,
            metamaskChainId
        }),
        [address, chainId, isConnected, isPending, metamaskChain?.id]
    );

    return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
    const ctx = useContext(WalletContext);
    if (!ctx) throw new Error("useWallet must be used within WalletProvider");
    return ctx;
}
