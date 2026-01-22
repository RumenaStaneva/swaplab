import { useEffect, useMemo, useState } from "react";

const KEY = import.meta.env.VITE_ALCHEMY_API_KEY;

export type TransferActivity = {
    hash?: `0x${string}`;
    uniqueId: string;
    from: string;
    to: string;
    category?: string;
    asset?: string;
    value?: number;
    metadata: { blockTimestamp: string };
    rawContract?: { address?: string; value?: string; decimal?: string };
};

type Result = {
    data: TransferActivity[];
    isLoading: boolean;
    error: string | null;
};

export function useRecentTransactions(
    address?: `0x${string}`,
    enabled: boolean = false
): Result {
    const [data, setData] = useState<TransferActivity[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const rpcUrl = useMemo(() => {
        if (!KEY) return null;
        return `https://eth-sepolia.g.alchemy.com/v2/${KEY}`;
    }, []);

    useEffect(() => {
        if (!enabled || !address || !rpcUrl) {
            setData([]);
            setError(null);
            setIsLoading(false);
            return;
        }

        let cancelled = false;

        async function fetchTransfers(params: any) {
            if (!rpcUrl) throw new Error("RPC URL not available");
            const res = await fetch(rpcUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    jsonrpc: "2.0",
                    id: 1,
                    method: "alchemy_getAssetTransfers",
                    params: [params],
                }),
            });

            const json = await res.json();
            if (json?.error) throw new Error(json.error.message ?? "Alchemy error");
            return (json?.result?.transfers ?? []) as TransferActivity[];
        }

        (async () => {
            try {
                setIsLoading(true);
                setError(null);

                const common = {
                    fromBlock: "0x0",
                    toBlock: "latest",
                    excludeZeroValue: true,
                    category: ["external", "erc20", "erc721", "erc1155"],
                    withMetadata: true,
                    maxCount: "0x32", // 50
                };

                const [outgoing, incoming] = await Promise.all([
                    fetchTransfers({ ...common, fromAddress: address }),
                    fetchTransfers({ ...common, toAddress: address }),
                ]);

                const merged = [...outgoing, ...incoming];

                const dedup = Array.from(new Map(merged.map((t) => [t.uniqueId, t])).values());

                if (!cancelled) setData(dedup);
            } catch (e: any) {
                if (!cancelled) setError(e?.message ?? "Failed to fetch transfers");
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [enabled, address, rpcUrl]);

    return { data, isLoading, error };
}
