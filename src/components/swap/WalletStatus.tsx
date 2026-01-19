import { Wallet } from 'lucide-react'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

interface WalletStatusProps {
    isConnected: boolean
    address?: string
    chainId?: number
    onConnect: () => void
    onDisconnect: () => void
}

export default function WalletStatus({
    isConnected,
    address,
    chainId,
    onConnect,
    onDisconnect,
}: WalletStatusProps) {
    const formatAddress = (addr: string) => {
        return `${addr.slice(0, 6)}...${addr.slice(-4)}`
    }

    if (!isConnected) {
        return (
            <Button onClick={onConnect} size="md" variant="secondary">
                <Wallet className="w-4 h-4 mr-2" />
                Connect Wallet
            </Button>
        )
    }

    const isCorrectNetwork = chainId === 11155111 // Sepolia

    return (
        <div className="flex items-center gap-3">
            {!isCorrectNetwork && (
                <Badge variant="danger">Wrong Network</Badge>
            )}
            <button
                onClick={onDisconnect}
                className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 transition-colors"
            >
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="font-mono text-sm">{address && formatAddress(address)}</span>
            </button>
        </div>
    )
}