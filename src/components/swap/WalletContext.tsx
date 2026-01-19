import { createContext, useContext, useMemo } from "react";
import { useAccount, useConnect, useDisconnect, useChainId } from "wagmi";
import { injected } from "wagmi/connectors";

type WalletContextValue = {
    address?: `0x${string}`;
    chainId?: number;
    isConnected: boolean;
    isConnecting: boolean;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
};

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
    const { address, isConnected } = useAccount();

    const chainId = useChainId?.() as number | undefined;

    const { connect, isPending } = useConnect();
    const { disconnect } = useDisconnect();

    const connectWallet = () =>

        new Promise<void>((resolve, reject) => {
            connect(
                { connector: injected() },
                {
                    onSuccess: () => async () => {
                        resolve();
                    },
                    onError: (err) => reject(err),
                }
            );
        });

    const disconnectWallet = () => disconnect();

    const value = useMemo(
        () => ({
            address,
            chainId,
            isConnected,
            isConnecting: isPending,
            connectWallet,
            disconnectWallet,
        }),
        [address, chainId, isConnected, isPending]
    );

    return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet() {
    const ctx = useContext(WalletContext);
    if (!ctx) throw new Error("useWallet must be used within WalletProvider");
    return ctx;
}
