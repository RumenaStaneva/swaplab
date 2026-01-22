import { Clock, ArrowRight, CheckCircle, XCircle, Loader } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { usePublicClient } from "wagmi";

export type TxStatus = "pending" | "success" | "failed";

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

type RecentActivityProps = {
    data: TransferActivity[];
    isLoading: boolean;
    error: string | null;
};

function formatTimeIso(iso: string) {
    const ts = Date.parse(iso);
    if (Number.isNaN(ts)) return "";
    const diff = Date.now() - ts;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    if (minutes < 60) return `${minutes}m ago`;
    return `${hours}h ago`;
}

function getStatusIcon(status: TxStatus) {
    switch (status) {
        case "success":
            return <CheckCircle className="w-4 h-4 text-green-500" />;
        case "failed":
            return <XCircle className="w-4 h-4 text-red-500" />;
        case "pending":
        default:
            return <Loader className="w-4 h-4 text-yellow-500 animate-spin" />;
    }
}

export default function RecentActivity({ data, error, isLoading }: RecentActivityProps) {
    const publicClient = usePublicClient();
    const [statusByHash, setStatusByHash] = useState<Record<string, TxStatus>>({});

    useEffect(() => {
        if (!publicClient) return;
        if (!data || data.length === 0) return;

        const hashes = data
            .map((a) => a.hash)
            .filter(Boolean) as `0x${string}`[];

        const uniqueHashes = Array.from(new Set(hashes)).slice(0, 25);

        const missing = uniqueHashes.filter((h) => statusByHash[h] == null);
        if (missing.length === 0) return;

        let cancelled = false;

        (async () => {
            const updates: Record<string, TxStatus> = {};

            await Promise.all(
                missing.map(async (h) => {
                    try {
                        const receipt = await publicClient.getTransactionReceipt({ hash: h });
                        updates[h] = receipt.status === "success" ? "success" : "failed";
                    } catch {
                        // pending / not found yet
                        updates[h] = "pending";
                    }
                })
            );

            if (!cancelled) {
                setStatusByHash((prev) => ({ ...prev, ...updates }));
            }
        })();

        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, publicClient]);

    const sorted = useMemo(() => {
        const arr = [...(data ?? [])];
        arr.sort((a, b) => Date.parse(b.metadata.blockTimestamp) - Date.parse(a.metadata.blockTimestamp));
        return arr;
    }, [data]);

    if (isLoading) {
        return (
            <div className="text-center py-12 text-gray-500">
                <Loader className="w-12 h-12 mx-auto mb-3 animate-spin" />
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 text-red-400">
                <p className="text-sm whitespace-pre-wrap">{error}</p>
            </div>
        );
    }

    if (!sorted || sorted.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent activity</p>
            </div>
        );
    }

    return (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {sorted.map((activity) => {
                const status: TxStatus =
                    activity.hash ? (statusByHash[activity.hash] ?? "pending") : "pending";

                const title = activity.category === "erc20" ? "Token transfer" : activity.category ?? "Activity";
                const symbol = activity.asset ?? "—";
                const amount = activity.value ?? 0;

                return (
                    <div
                        key={activity.uniqueId}
                        className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                {getStatusIcon(status)}
                                <span className="text-sm text-gray-400">
                                    {formatTimeIso(activity.metadata.blockTimestamp)}
                                </span>
                                <span className="text-xs text-gray-500">• {title}</span>
                            </div>

                            {activity.hash && (
                                <a
                                    href={`https://sepolia.etherscan.io/tx/${activity.hash}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-accent-400 hover:text-accent-300"
                                >
                                    View
                                </a>
                            )}
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex-1">
                                <div className="font-semibold">
                                    {amount} {symbol}
                                </div>
                                <div className="text-xs text-gray-400 break-all">
                                    {activity.from} <ArrowRight className="inline w-4 h-4 mx-1 text-gray-500" /> {activity.to}
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
