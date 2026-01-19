import { useState } from 'react'
import { ArrowDownUp } from 'lucide-react'
import Card from '../components/ui/Card'
import WalletStatus from '../components/swap/WalletStatus'
import SwapModeToggle from '../components/swap/SwapModeToggle'
import TokenSelectorModal from '../components/swap/TokenSelectorModal'
import TokenAmountInput from '../components/swap/TokenAmountInput'
import SwapDetailsPanel from '../components/swap/SwapDetailsPanel'
import PrimaryActionButton from '../components/swap/PrimaryActionButton'
import SettingsDrawer from '../components/swap/SettingsDrawer'
import TxStatusModal from '../components/swap/TxStatusModal'
import RecentActivity from '../components/swap/RecentActivity'
import { SwapState, SwapMode, Token, SwapSettings } from '../types/swap'
import { RUMBA, PYUSD, mockActivities } from '../mocks/mockActivity'
import { injected } from '@wagmi/connectors'
import { useConnect } from 'wagmi'

export default function SwapPage() {
    // TODO: Replace with real wagmi hooks
    const [isConnected, setIsConnected] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [address, setAddress] = useState<string>()
    const [chainId, setChainId] = useState<number>()

    const [swapState, setSwapState] = useState<SwapState>(SwapState.DISCONNECTED)
    const [swapMode, setSwapMode] = useState<SwapMode>(SwapMode.EXACT_IN)

    const [tokenIn, setTokenIn] = useState<Token>(RUMBA)
    const [tokenOut, setTokenOut] = useState<Token>(PYUSD)
    const [amountIn, setAmountIn] = useState('')
    const [amountOut, setAmountOut] = useState('')

    const [selectingToken, setSelectingToken] = useState<'in' | 'out' | null>(null)
    const [txStatusOpen, setTxStatusOpen] = useState(false)

    const connect = useConnect()


    const [settings, setSettings] = useState<SwapSettings>({
        slippageTolerance: 0.5,
        deadline: 20,
    })

    function waitForWindowFocus(): Promise<void> {
        if (document.hasFocus()) return Promise.resolve();

        return new Promise((resolve) => {
            const onFocus = () => {
                window.removeEventListener("focus", onFocus);
                resolve();
            };
            window.addEventListener("focus", onFocus, { once: true });
        });
    }

    // Wallet connection
    const handleConnect = async () => {
        setIsLoading(true);
        try {
            const result = await connect.mutateAsync({ connector: injected() });

            // wait until user is back in your tab
            await waitForWindowFocus();

            setAddress(result.accounts?.[0] ?? null);
            setChainId(result.chainId);
            setIsConnected(true);
            setSwapState(SwapState.NEEDS_APPROVAL);
        } catch (err) {
            setIsConnected(false);
            console.error("connect failed", err);
        } finally {
            setIsLoading(false);
        }
    };




    const handleDisconnect = () => {
        // TODO: Implement wagmi useDisconnect
        setIsConnected(false)
        setAddress(undefined)
        setChainId(undefined)
        setSwapState(SwapState.DISCONNECTED)
    }

    const handlePrimaryAction = () => {
        switch (swapState) {
            case SwapState.DISCONNECTED:
                handleConnect()
                break
            case SwapState.WRONG_NETWORK:
                // TODO: Implement wagmi useSwitchChain
                setChainId(11155111)
                setSwapState(SwapState.NEEDS_APPROVAL)
                break
            case SwapState.NEEDS_APPROVAL:
                // TODO: Implement token approval with wagmi
                setTimeout(() => setSwapState(SwapState.READY_TO_SWAP), 1000)
                break
            case SwapState.READY_TO_SWAP:
                setSwapState(SwapState.TX_PENDING)
                // TODO: Implement actual swap with wagmi
                setTimeout(() => {
                    setSwapState(Math.random() > 0.2 ? SwapState.TX_SUCCESS : SwapState.TX_ERROR)
                    setTxStatusOpen(true)
                }, 2000)
                break
        }
    }

    const handleAmountInChange = (value: string) => {
        setAmountIn(value)
        if (swapMode === SwapMode.EXACT_IN && value) {
            // TODO: Fetch real quote
            const mockQuote = (parseFloat(value) * 0.98).toFixed(2)
            setAmountOut(mockQuote)
        }
    }

    const handleAmountOutChange = (value: string) => {
        setAmountOut(value)
        if (swapMode === SwapMode.EXACT_OUT && value) {
            // TODO: Fetch real quote
            const mockRequired = (parseFloat(value) / 0.98).toFixed(2)
            setAmountIn(mockRequired)
        }
    }

    const handleFlipTokens = () => {
        setTokenIn(tokenOut)
        setTokenOut(tokenIn)
        setAmountIn(amountOut)
        setAmountOut(amountIn)
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Swap Interface */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold">Swap Tokens</h1>
                        <div className="flex items-center gap-3">
                            <SettingsDrawer settings={settings} onChange={setSettings} />

                            <WalletStatus
                                isConnected={isConnected}
                                isLoading={isLoading}
                                address={address}
                                chainId={chainId}
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
                                    onTokenClick={() => setSelectingToken('in')}
                                    readOnly={swapMode === SwapMode.EXACT_OUT}
                                    balance="1,234.56"
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
                                    rate={`1 ${tokenIn.symbol} = ${(parseFloat(amountOut) / parseFloat(amountIn)).toFixed(4)} ${tokenOut.symbol}`}
                                    priceImpact="0.12"
                                    minimumReceived={`${(parseFloat(amountOut) * 0.995).toFixed(2)} ${tokenOut.symbol}`}
                                />
                            )}

                            <PrimaryActionButton
                                state={swapState}
                                onClick={handlePrimaryAction}
                                tokenSymbol={tokenIn.symbol}
                            />
                        </div>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <Card>
                        <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
                        <RecentActivity activities={mockActivities} />
                    </Card>
                </div>
            </div>

            {/* Modals */}
            <TokenSelectorModal
                isOpen={selectingToken !== null}
                onClose={() => setSelectingToken(null)}
                onSelect={(token) => {
                    if (selectingToken === 'in') setTokenIn(token)
                    else setTokenOut(token)
                }}
                selectedToken={selectingToken === 'in' ? tokenIn : tokenOut}
            />

            <TxStatusModal
                isOpen={txStatusOpen}
                onClose={() => {
                    setTxStatusOpen(false)
                    if (swapState === SwapState.TX_SUCCESS) {
                        setSwapState(SwapState.READY_TO_SWAP)
                        setAmountIn('')
                        setAmountOut('')
                    } else {
                        setSwapState(SwapState.READY_TO_SWAP)
                    }
                }}
                status={swapState as SwapState.TX_SUCCESS | SwapState.TX_ERROR}
                txHash={swapState === SwapState.TX_SUCCESS ? '0x1234567890abcdef' : undefined}
            />
        </div>
    )
}