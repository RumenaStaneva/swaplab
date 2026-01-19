import { Info } from 'lucide-react'

interface SwapDetailsPanelProps {
    rate?: string
    priceImpact?: string
    minimumReceived?: string
    fee?: string
}

export default function SwapDetailsPanel({
    rate,
    priceImpact,
    minimumReceived,
    fee,
}: SwapDetailsPanelProps) {
    return (
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400 flex items-center gap-1">
                    <Info className="w-4 h-4" />
                    Rate
                </span>
                <span className="font-medium">{rate || '—'}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Price Impact</span>
                <span className={`font-medium ${priceImpact && parseFloat(priceImpact) > 5 ? 'text-red-400' : ''}`}>
                    {priceImpact ? `${priceImpact}%` : '—'}
                </span>
            </div>

            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Minimum Received</span>
                <span className="font-medium">{minimumReceived || '—'}</span>
            </div>

            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Network Fee</span>
                <span className="font-medium">{fee || '~$0.50'}</span>
            </div>
        </div>
    )
}