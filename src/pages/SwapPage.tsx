import { use, useEffect, useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { formatUnits } from "viem";
import {
    useReadContract,
    useWriteContract,
    useWaitForTransactionReceipt,
} from "wagmi";

import Card from "../components/ui/Card";
import WalletStatus from "../components/swap/WalletStatus";
import SwapModeToggle from "../components/swap/SwapModeToggle";
import TokenSelectorModal from "../components/swap/TokenSelectorModal";
import TokenAmountInput from "../components/swap/TokenAmountInput";
import SwapDetailsPanel from "../components/swap/SwapDetailsPanel";
import PrimaryActionButton from "../components/swap/PrimaryActionButton";
import SettingsDrawer from "../components/swap/SettingsDrawer";
import TxStatusModal from "../components/swap/TxStatusModal";
import RecentActivity from "../components/swap/RecentActivity";

import { SwapState, SwapMode, Token, SwapSettings } from "../types/swap";
import { ADDR, SEPOLIA_CHAIN_ID } from "../config/contracts";
import { ERC20_ABI, PYUSD, RUMBA } from "../abis/erc20";
import { UNIV2_ROUTER_ABI } from "../abis/univ2Router";
import { useWallet } from "../components/swap/WalletContext";

import { useTokenDecimals } from "../hooks/swap/useTokenDecimals";
import { useSwapAmounts } from "../hooks/swap/useSwapAmounts";
import { useUniV2Quote } from "../hooks/swap/useUniV2Quote";
import { useRecentTransactions } from "../hooks/useRecentTransactions";

export default function SwapPage() {
    const {
        address,
        isConnected,
        chainId,
        isConnecting,
        disconnectWallet,
        switchToSepoliaChain,
        handleConnect,
    } = useWallet();

    const [swapState, setSwapState] = useState<SwapState>(SwapState.DISCONNECTED);
    const [swapMode, setSwapMode] = useState<SwapMode>(SwapMode.EXACT_IN);
    const [tokenIn, setTokenIn] = useState<Token>(RUMBA);
    const [tokenOut, setTokenOut] = useState<Token>(PYUSD);
    const [amountIn, setAmountIn] = useState("");
    const [amountOut, setAmountOut] = useState("");
    const [selectingToken, setSelectingToken] = useState<"in" | "out" | null>(null);
    const [txStatusOpen, setTxStatusOpen] = useState(false);
    const [settings, setSettings] = useState<SwapSettings>({
        slippageTolerance: 0.5, // %
        deadline: 20, // minutes
    });
    const [recentActivities, setRecentActivities] = useState<any[]>([]);

    const router = ADDR.UNIV2_ROUTER as `0x${string}`;
    const path = useMemo(
        () => [tokenIn.address as `0x${string}`, tokenOut.address as `0x${string}`],
        [tokenIn, tokenOut]
    );

    const { decimals: inDec } = useTokenDecimals(
        tokenIn?.address as `0x${string}` | undefined
    );
    const { decimals: outDec } = useTokenDecimals(
        tokenOut?.address as `0x${string}` | undefined
    );

    const { amountInWei, amountOutWei } = useSwapAmounts({
        mode: swapMode,
        amountIn,
        amountOut,
        inDecimals: inDec,
        outDecimals: outDec,
    });

    const readsEnabled =
        isConnected &&
        chainId === SEPOLIA_CHAIN_ID &&
        tokenIn.address !== tokenOut.address;

    const { quotedOutWei, quotedInWei, isFetching: isQuoting, error: quoteError } =
        useUniV2Quote({
            mode: swapMode,
            router,
            path,
            amountInWei,
            amountOutWei,
            enabled: readsEnabled,
        });

    // ---- slippage bounds
    const amountOutMinWei = useMemo(() => {
        if (swapMode !== SwapMode.EXACT_IN) return undefined;
        if (quotedOutWei == null) return undefined;
        const bps = BigInt(Math.round(settings.slippageTolerance * 100)); // 0.5% => 50
        const keepBps = 10_000n - bps;
        return (quotedOutWei * keepBps) / 10_000n;
    }, [swapMode, quotedOutWei, settings.slippageTolerance]);

    const amountInMaxWei = useMemo(() => {
        if (swapMode !== SwapMode.EXACT_OUT) return undefined;
        if (quotedInWei == null) return undefined;
        const bps = BigInt(Math.round(settings.slippageTolerance * 100)); // 0.5% => 50
        const addBps = 10_000n + bps;
        return (quotedInWei * addBps) / 10_000n;
    }, [swapMode, quotedInWei, settings.slippageTolerance]);

    // ---- allowance (needed for both modes)
    const requiredSpendWei =
        swapMode === SwapMode.EXACT_IN ? amountInWei : amountInMaxWei;

    const allowanceResult = useReadContract({
        abi: ERC20_ABI,
        address: tokenIn.address as `0x${string}`,
        functionName: "allowance",
        args: address ? [address as `0x${string}`, router] : undefined,
        query: { enabled: !!address && chainId === SEPOLIA_CHAIN_ID },
    });

    const allowance = allowanceResult.data;

    const needsApproval = useMemo(() => {
        if (!readsEnabled) return false;
        if (allowance == null || requiredSpendWei == null) return false; // not ready yet
        return allowance < requiredSpendWei;
    }, [readsEnabled, allowance, requiredSpendWei]);

    // ---- sync derived UI field
    useEffect(() => {
        if (swapMode !== SwapMode.EXACT_IN) return;
        if (outDec == null || quotedOutWei == null) {
            setAmountOut("");
            return;
        }
        setAmountOut(formatUnits(quotedOutWei, outDec));
    }, [swapMode, quotedOutWei, outDec]);

    useEffect(() => {
        if (swapMode !== SwapMode.EXACT_OUT) return;
        if (inDec == null || quotedInWei == null) {
            setAmountIn("");
            return;
        }
        setAmountIn(formatUnits(quotedInWei, inDec));
    }, [swapMode, quotedInWei, inDec]);

    // ---- state machine
    useEffect(() => {
        if (!isConnected) {
            setSwapState(SwapState.DISCONNECTED);
            return;
        }
        if (chainId !== SEPOLIA_CHAIN_ID) {
            setSwapState(SwapState.WRONG_NETWORK);
            return;
        }

        const hasAmount =
            swapMode === SwapMode.EXACT_IN ? !!amountInWei : !!amountOutWei;

        if (!hasAmount) {
            setSwapState(SwapState.ENTER_AMOUNT);
            return;
        }

        if (needsApproval) {
            setSwapState(SwapState.NEEDS_APPROVAL);
            return;
        }

        setSwapState(SwapState.READY_TO_SWAP);
    }, [isConnected, chainId, swapMode, amountInWei, amountOutWei, needsApproval]);

    // ---- writes: approve + swap
    const approveWrite = useWriteContract();
    const swapWrite = useWriteContract();

    const approveReceipt = useWaitForTransactionReceipt({
        hash: approveWrite.data,
    });
    const swapReceipt = useWaitForTransactionReceipt({ hash: swapWrite.data });

    const doApprove = () => {
        if (!requiredSpendWei) return;
        approveWrite.writeContract({
            abi: ERC20_ABI,
            address: tokenIn.address as `0x${string}`,
            functionName: "approve",
            args: [router, requiredSpendWei],
        });
    };

    const doSwap = () => {
        if (!address) return;

        const deadline = BigInt(
            Math.floor(Date.now() / 1000) + settings.deadline * 60
        );

        if (swapMode === SwapMode.EXACT_IN) {
            if (!amountInWei || !amountOutMinWei) return;
            swapWrite.writeContract({
                abi: UNIV2_ROUTER_ABI,
                address: router,
                functionName: "swapExactTokensForTokens",
                args: [
                    amountInWei,
                    amountOutMinWei,
                    path,
                    address as `0x${string}`,
                    deadline,
                ],
            });
            return;
        }

        // EXACT_OUT
        if (!amountOutWei || !amountInMaxWei) return;
        swapWrite.writeContract({
            abi: UNIV2_ROUTER_ABI,
            address: router,
            functionName: "swapTokensForExactTokens" as any,
            args: [
                amountOutWei,
                amountInMaxWei,
                path,
                address as `0x${string}`,
                deadline,
            ],
        });
    };

    // show modal on swap result
    useEffect(() => {
        if (swapReceipt.isSuccess) {
            setSwapState(SwapState.TX_SUCCESS);
            setTxStatusOpen(true);
        } else if (swapReceipt.isError) {
            setSwapState(SwapState.TX_ERROR);
            setTxStatusOpen(true);
        }
    }, [swapReceipt.isSuccess, swapReceipt.isError]);

    const handlePrimaryAction = () => {
        switch (swapState) {
            case SwapState.DISCONNECTED:
                handleConnect();
                break;
            case SwapState.WRONG_NETWORK:
                switchToSepoliaChain(SEPOLIA_CHAIN_ID);
                break;
            case SwapState.NEEDS_APPROVAL:
                doApprove();
                break;
            case SwapState.READY_TO_SWAP:
                doSwap();
                break;
        }
    };

    const handleFlipTokens = () => {
        setTokenIn(tokenOut);
        setTokenOut(tokenIn);
        setAmountIn(amountOut);
        setAmountOut(amountIn);
    };

    const minReceivedUi = useMemo(() => {
        if (swapMode !== SwapMode.EXACT_IN) return "";
        if (outDec == null || amountOutMinWei == null) return "";
        return `${formatUnits(amountOutMinWei, outDec)} ${tokenOut.symbol}`;
    }, [swapMode, outDec, amountOutMinWei, tokenOut.symbol]);

    const maxSpendUi = useMemo(() => {
        if (swapMode !== SwapMode.EXACT_OUT) return "";
        if (inDec == null || amountInMaxWei == null) return "";
        return `${formatUnits(amountInMaxWei, inDec)} ${tokenIn.symbol}`;
    }, [swapMode, inDec, amountInMaxWei, tokenIn.symbol]);


    const recentActivitiesData = useRecentTransactions(
        address as `0x${string}`,
        isConnected
    );

    if (swapWrite.isPending || swapReceipt.isLoading) {
        return (
            <div className="flex items-center justify-center py-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent-400"></div>
                <p className="ml-2">Processing...</p>
            </div>
        );
    }
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Swap Tokens</h1>
                        <div className="flex items-center gap-3">
                            <SettingsDrawer settings={settings} onChange={setSettings} />
                            <WalletStatus
                                isConnected={isConnected}
                                isLoading={isConnecting}
                                address={address}
                                chainId={chainId}
                                metamaskChainId={chainId ?? null}
                                onConnect={handleConnect}
                                onDisconnect={disconnectWallet}
                            />
                        </div>
                    </div>

                    <Card>
                        <div className="space-y-4">
                            <SwapModeToggle mode={swapMode} onChange={setSwapMode} />

                            <div className="space-y-2 relative">
                                <TokenAmountInput
                                    label="You Sell"
                                    amount={amountIn}
                                    onAmountChange={setAmountIn}
                                    token={tokenIn}
                                    onTokenClick={() => setSelectingToken("in")}
                                    readOnly={swapMode === SwapMode.EXACT_OUT}
                                    balance="-"
                                />

                                <div className="flex justify-center -my-2 relative z-10">
                                    <button
                                        onClick={handleFlipTokens}
                                        className="p-2 bg-gray-900 border-4 border-gray-950 rounded-xl hover:bg-gray-800 transition-colors"
                                    >
                                        <ArrowDownUp className="w-5 h-5 text-accent-400" />
                                    </button>
                                </div>

                                <TokenAmountInput
                                    label="You Buy"
                                    amount={amountOut}
                                    onAmountChange={setAmountOut}
                                    token={tokenOut}
                                    onTokenClick={() => setSelectingToken("out")}
                                    readOnly={swapMode === SwapMode.EXACT_IN}
                                />
                            </div>

                            {(swapMode === SwapMode.EXACT_IN ? minReceivedUi : maxSpendUi) && (
                                <SwapDetailsPanel
                                    minimumReceived={
                                        swapMode === SwapMode.EXACT_IN ? minReceivedUi : maxSpendUi
                                    }
                                    priceImpact={isQuoting ? "…" : quoteError ? "—" : "?"}
                                    rate={""}
                                />
                            )}

                            <PrimaryActionButton
                                state={swapState}
                                onClick={handlePrimaryAction}
                                tokenSymbol={tokenIn.symbol}
                            />

                            {/* minimal tx feedback */}
                            {(approveWrite.isPending || approveReceipt.isLoading) && (
                                <div className="text-xs text-gray-400">Approving…</div>
                            )}
                            {approveWrite.error && (
                                <div className="text-xs text-red-400">
                                    Approve error: {approveWrite.error.message}
                                </div>
                            )}
                            {(swapWrite.isPending || swapReceipt.isLoading) && (
                                <div className="text-xs text-gray-400">Swapping…</div>
                            )}
                            {swapWrite.error && (
                                <div className="text-xs text-red-400">
                                    Swap error:
                                    <div className="whitespace-pre-wrap wrap">
                                        {swapWrite.error.message}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
                        <RecentActivity data={recentActivitiesData.data} isLoading={recentActivitiesData.isLoading} error={recentActivitiesData.error} />
                    </Card>
                </div>
            </div>

            <TokenSelectorModal
                isOpen={selectingToken !== null}
                onClose={() => setSelectingToken(null)}
                onSelect={(token) => {
                    if (selectingToken === "in") setTokenIn(token);
                    else setTokenOut(token);
                    setSelectingToken(null);
                }}
                selectedToken={selectingToken === "in" ? tokenIn : tokenOut}
            />

            <TxStatusModal
                isOpen={txStatusOpen}
                onClose={() => {
                    setTxStatusOpen(false);
                    if (swapState === SwapState.TX_SUCCESS) {
                        setAmountIn("");
                        setAmountOut("");
                    }
                    setSwapState(SwapState.ENTER_AMOUNT);
                }}
                status={swapState as SwapState.TX_SUCCESS | SwapState.TX_ERROR}
                txHash={swapWrite.data}
            />
        </div>
    );
}
