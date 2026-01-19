import { SwapMode } from '../../types/swap'

interface SwapModeToggleProps {
    mode: SwapMode
    onChange: (mode: SwapMode) => void
}

export default function SwapModeToggle({ mode, onChange }: SwapModeToggleProps) {
    return (
        <div className="flex items-center gap-2 p-1 bg-gray-800 rounded-lg border border-gray-700">
            <button
                onClick={() => onChange(SwapMode.EXACT_IN)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === SwapMode.EXACT_IN
                        ? 'bg-accent-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
            >
                Exact In
            </button>
            <button
                onClick={() => onChange(SwapMode.EXACT_OUT)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${mode === SwapMode.EXACT_OUT
                        ? 'bg-accent-500 text-white shadow-lg'
                        : 'text-gray-400 hover:text-gray-200'
                    }`}
            >
                Exact Out
            </button>
        </div>
    )
}