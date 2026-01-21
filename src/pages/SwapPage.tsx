import { useEffect, useMemo, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { formatUnits, parseUnits } from "viem";
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
import { useTokenDecimals } from "../hooks/useTokenDecimals";

export default function SwapPage() {
    // ✅ wagmi wallet state
    const { address, isConnected, chainId, isConnecting, disconnectWallet, switchToSepoliaChain, handleConnect, } = useWallet();

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


    const router = ADDR.UNIV2_ROUTER;
    const path = useMemo(
        () => [tokenIn.address as `0x${string}`, tokenOut.address as `0x${string}`],
        [tokenIn, tokenOut]
    );

    const { decimals: tokenInDecimals } = useTokenDecimals(tokenIn?.address as `0x${string}` | undefined);
    const { decimals: tokenOutDecimals } = useTokenDecimals(tokenOut?.address as `0x${string}` | undefined);

    const convertUserInputToWei = (amount: string, decimals: number | undefined) => {
        if (decimals === null || decimals === undefined || !amount) return undefined;
        try {
            const amountWei = parseUnits(amount, decimals);
            return amountWei;

        } catch (error) {
            console.error('Error converting user input to wei:', error);
            return undefined;
        }
    }
    const amountInWei = useMemo(() => convertUserInputToWei(amountIn, tokenInDecimals), [amountIn, tokenInDecimals]);

    const allowanceResult = useReadContract({
        abi: ERC20_ABI,
        address: tokenIn.address as `0x${string}`,
        functionName: "allowance",
        args: address ? [address as `0x${string}`, router] : undefined,
        query: { enabled: !!address },
    });

    const allowance = allowanceResult.data;
    const needsApproval = useMemo(() => {
        if (allowance === undefined || amountInWei === undefined) {
            return false;
        }
        return allowance < amountInWei;
    }, [allowance, amountInWei]);

    useEffect(() => {
        if (!isConnected) {
            setSwapState(SwapState.DISCONNECTED);
        } else if (chainId !== SEPOLIA_CHAIN_ID) {
            setSwapState(SwapState.WRONG_NETWORK);
        } else if (!amountInWei) {
            setSwapState(SwapState.ENTER_AMOUNT);
        } else if (needsApproval) {
            setSwapState(SwapState.NEEDS_APPROVAL);
        } else {
            setSwapState(SwapState.READY_TO_SWAP);
        }
    }, [needsApproval, isConnected, chainId, amountInWei]);

    const balanceResult = useReadContract({
        abi: ERC20_ABI,
        address: tokenIn.address as `0x${string}`,
        functionName: "balanceOf",
        args: address ? [address as `0x${string}`] : undefined,
        query: { enabled: !!address && chainId === SEPOLIA_CHAIN_ID },
    });

    const balanceIn = balanceResult.data;

    const quoteExactInGetter = useReadContract({
        abi: UNIV2_ROUTER_ABI,
        address: router as `0x${string}`,
        functionName: "getAmountsOut",
        args: amountInWei ? [amountInWei, path] : undefined,
        query: { enabled: !!amountInWei && tokenIn.address !== tokenOut.address && chainId === SEPOLIA_CHAIN_ID },
    });

    const quoteAmountOut = useMemo(() => {
        return quoteExactInGetter.data ? quoteExactInGetter.data[quoteExactInGetter.data.length - 1] : undefined;
    }, [quoteExactInGetter.data]);

    useEffect(() => {
        if (!quoteAmountOut || tokenOutDecimals == null) return;

        const amountOutFormatted = formatUnits(quoteAmountOut, tokenOutDecimals);
        setAmountOut(amountOutFormatted);
    }, [amountIn, quoteAmountOut, tokenOutDecimals]);




    const handlePrimaryAction = () => {
        switch (swapState) {
            case SwapState.DISCONNECTED:
                handleConnect()
                break
            case SwapState.WRONG_NETWORK:
                switchToSepoliaChain(11155111);
                break
            case SwapState.NEEDS_APPROVAL:
                // TODO: Implement token approval with wagmi
                // setTimeout(() => setSwapState(SwapState.READY_TO_SWAP), 1000)
                break
            case SwapState.READY_TO_SWAP:
                // TODO: Implement actual swap with wagmi
                // setTimeout(() => {
                //     setSwapState(Math.random() > 0.2 ? SwapState.TX_SUCCESS : SwapState.TX_ERROR)
                //     setTxStatusOpen(true)
                // }, 2000)
                break
        }
    }
    const handleAmountInChange = (value: string) => {
        setAmountIn(value)
        if (swapMode === SwapMode.EXACT_IN && value) {

        }
    }
    const handleAmountOutChange = (value: string) => {
        setAmountOut(value)
        if (swapMode === SwapMode.EXACT_OUT && value) {
        }
    }

    const handleFlipTokens = () => {
        setTokenIn(tokenOut)
        setTokenOut(tokenIn)
        setAmountIn(amountOut)
        setAmountOut(amountIn)
    }

    const handleDisconnect = disconnectWallet;

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
                                onDisconnect={handleDisconnect}
                            />
                        </div>
                    </div>

                    <Card>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <SwapModeToggle mode={swapMode} onChange={setSwapMode} />
                            </div>

                            <div className="space-y-2 relative">
                                <TokenAmountInput
                                    label="You Sell"
                                    amount={amountIn}
                                    onAmountChange={handleAmountInChange}
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
                                    onAmountChange={handleAmountOutChange}
                                    token={tokenOut}
                                    onTokenClick={() => setSelectingToken('out')}
                                    readOnly={swapMode === SwapMode.EXACT_IN}
                                />
                            </div>

                            {amountIn && amountOut && (
                                <SwapDetailsPanel
                                    // rate={rateUi}
                                    // priceImpact={quote.isError ? "—" : "?"}
                                    minimumReceived={amountOut}
                                />
                            )}

                            <PrimaryActionButton
                                state={swapState}
                                onClick={handlePrimaryAction}
                                tokenSymbol={tokenIn.symbol}
                            />

                            {/* debug */}
                            {/* <div className="text-xs text-gray-400 space-y-1">
                                <div>chainId: {String(chainId)} (need {SEPOLIA_CHAIN_ID})</div>
                                <div>decimalsIn: {String(tokenInDecimals.data ?? "-")}</div>
                                <div>decimalsOut: {String(tokenOutDecimals.data ?? "-")}</div>
                                <div>amountInWei: {String(amountInWei ?? "-")}</div>
                                <div>allowance: {String(allowance.data ?? "-")}</div>
                                <div>needsApproval: {String(needsApproval)}</div>
                                <div>quote error: {String(quote.isError)}</div>
                                {quote.error && <div>quote error msg: {quote.error.message}</div>}
                                {approveWrite.error && <div>approve error: {approveWrite.error.message}</div>}
                                {swapWrite.error && <div>swap error: {swapWrite.error.message}</div>}
                                <div className="text-xs text-gray-400 space-y-1">
                                    <div>tokenIn.address: {String(tokenIn.address)}</div>
                                    <div>tokenOut.address: {String(tokenOut.address)}</div>

                                    <div>tokenInDecimals error: {tokenInDecimals.error?.message ?? "-"}</div>
                                    <div>tokenOutDecimals error: {tokenOutDecimals.error?.message ?? "-"}</div>
                                </div>

                            </div> */}
                        </div>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
                        {/* <RecentActivity activities={mockActivities} /> */}
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
                    setSwapState(SwapState.READY_TO_SWAP);
                    if (swapState === SwapState.TX_SUCCESS) {
                        setAmountIn("");
                        setAmountOut("");
                    }
                }}
                status={swapState as SwapState.TX_SUCCESS | SwapState.TX_ERROR}
            // txHash={swapWrite.data}
            />
        </div>
    );




}