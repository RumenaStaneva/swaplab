import { createContext, useContext, useMemo } from "react";
import { useConnect, useChainId, useSwitchChain, useConnection, useDisconnect, useBalance } from "wagmi";
import { injected } from "wagmi/connectors";

type WalletContextValue = {
    address?: `0x${string}`;
    chainId?: number;
    isConnected: boolean;
    isConnecting: boolean;
    metamaskChainId: number | null;
    sepoliaBalance?: bigint;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    handleConnect: () => void;
    switchToSepoliaChain: (targetChainId: number) => Promise<void>;
};

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
    const { address, isConnected, chain: metamaskChain } = useConnection();
    const { connect, isPending, connectors } = useConnect();
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

    // In a perfect world this would change the wrong chain to the target chain AND update the Metamask UI accordingly
    // But we don't live in a perfect world
    const switchToSepoliaChain = async (targetChainId: number) => {
        try {
            await switchChain.mutate({ chainId: targetChainId });
        } catch (error) {
            console.error("Failed to switch chains:", error);
        }
    };

    const handleConnect = async () => {
        // choose injected connector (MetaMask) if available
        const injected = connectors.find((c) => c.type === "injected") ?? connectors[0];
        connect({ connector: injected });
    };

    const metamaskChainId = metamaskChain?.id ?? null;
    const { data } = useBalance({
        address,
        chainId,
    });
    const sepoliaBalance = data?.value;

    const value = useMemo(
        () => ({
            address,
            chainId,
            isConnected,
            isConnecting: isPending,
            sepoliaBalance,
            connectWallet,
            disconnectWallet,
            switchToSepoliaChain,
            handleConnect,
            metamaskChainId
        }),
        [address, chainId, isConnected, handleConnect, isPending, sepoliaBalance, metamaskChainId]
    );

    return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
    const ctx = useContext(WalletContext);
    if (!ctx) throw new Error("useWallet must be used within WalletProvider");
    return ctx;
}
