import { Clock, ArrowRight, CheckCircle, XCircle, Loader } from 'lucide-react'
import { SwapActivity } from '../../types/swap'

interface RecentActivityProps {
    activities: SwapActivity[]
}

export default function RecentActivity({ activities }: RecentActivityProps) {
    const formatTime = (timestamp: number) => {
        const diff = Date.now() - timestamp
        const minutes = Math.floor(diff / 60000)
        const hours = Math.floor(diff / 3600000)

        if (minutes < 60) return `${minutes}m ago`
        return `${hours}h ago`
    }

    const getStatusIcon = (status: SwapActivity['status']) => {
        switch (status) {
            case 'success':
                return <CheckCircle className="w-4 h-4 text-green-500" />
            case 'failed':
                return <XCircle className="w-4 h-4 text-red-500" />
            case 'pending':
                return <Loader className="w-4 h-4 text-yellow-500 animate-spin" />
        }
    }

    if (activities.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent activity</p>
            </div>
        )
    }

    return (
        <div className="space-y-3">
            {activities.map((activity) => (
                <div
                    key={activity.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-4 hover:border-gray-600 transition-colors"
                >
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            {getStatusIcon(activity.status)}
                            <span className="text-sm text-gray-400">{formatTime(activity.timestamp)}</span>
                        </div>
                        {activity.txHash && (
                            <a
                                href={`https://sepolia.etherscan.io/tx/${activity.txHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-accent-400 hover:text-accent-300"
                            >
                                View
                            </a>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex-1 text-right">
                            <div className="font-semibold">{activity.amountIn}</div>
                            <div className="text-sm text-gray-400">{activity.tokenIn.symbol}</div>
                        </div>

                        <ArrowRight className="w-5 h-5 text-gray-500" />

                        <div className="flex-1">
                            <div className="font-semibold">{activity.amountOut || '—'}</div>
                            <div className="text-sm text-gray-400">{activity.tokenOut.symbol}</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}