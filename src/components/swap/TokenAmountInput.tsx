import { ChevronDown } from 'lucide-react'
import { Token } from '../../types/swap'

interface TokenAmountInputProps {
    label: string
    amount: string
    onAmountChange: (value: string) => void
    token?: Token
    onTokenClick: () => void
    readOnly?: boolean
    balance?: string
}

export default function TokenAmountInput({
    label,
    amount,
    onAmountChange,
    token,
    onTokenClick,
    readOnly = false,
    balance,
}: TokenAmountInputProps) {
    return (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
                <label className="text-sm text-gray-400 font-medium">{label}</label>
                {balance && (
                    <span className="text-sm text-gray-400">
                        Balance: {balance}
                    </span>
                )}
            </div>

            <div className="flex items-center gap-3">
                <input
                    type="text"
                    value={amount}
                    onChange={(e) => onAmountChange(e.target.value)}
                    placeholder="0.0"
                    readOnly={readOnly}
                    className={`flex-1 bg-transparent text-3xl font-semibold outline-none ${readOnly ? 'cursor-not-allowed text-gray-500' : 'text-white'
                        }`}
                />

                <button
                    onClick={onTokenClick}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-900 hover:bg-gray-700 border border-gray-600 rounded-lg transition-colors"
                >
                    {token ? (
                        <>
                            <div className="w-6 h-6 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
                                {token.symbol[0]}
                            </div>
                            <span className="font-semibold">{token.symbol}</span>
                        </>
                    ) : (
                        <span className="text-gray-400">Select</span>
                    )}
                    <ChevronDown className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}