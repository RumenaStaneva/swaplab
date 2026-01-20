import { X, Wallet } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'
import LoadingSpinner from '../ui/LoadingSpinner'
import { useWallet } from './WalletContext'

interface WalletStatusProps {
    isConnected: boolean
    isLoading?: boolean
    address?: string
    chainId?: number
    metamaskChainId: number | null
    onConnect: () => void
    onDisconnect: () => void
}


export default function WalletStatus({
    isConnected,
    isLoading,
    address,
    chainId,
    metamaskChainId,
    onConnect,
    onDisconnect,
}: WalletStatusProps) {
    const { isConnecting, switchToSepoliaChain } = useWallet();
    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    if (isLoading) {
        return <LoadingSpinner />
    }

    if (!isConnected) {
        return (
            <Button onClick={onConnect} size="md" variant="secondary">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
            </Button>
        )
    }


    const isWrongNetwork = isConnected && metamaskChainId !== chainId;

    return (
        <div className="flex items-center gap-3">
            {isWrongNetwork && <Badge variant="danger">Wrong Network</Badge>}
            {isWrongNetwork && (
                <button
                    disabled={isConnecting}
                    onClick={() => switchToSepoliaChain(chainId || 11155111)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg border border-blue-700 transition-colors disabled:opacity-50"
                >
                    Switch to Sepolia
                </button>
            )}


            {/* Address Display */}
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg border border-gray-700">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-mono text-sm">{address && formatAddress(address)}</span>
            </div>

            {/* Disconnect Button */}
            <button
                onClick={onDisconnect}
                className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors text-gray-400 hover:text-red-400"
                title="Disconnect Wallet"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}