import { useState } from 'react'
// import { ChevronDown } from 'lucide-react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import { Token } from '../../types/swap'
import { RUMBA, PYUSD } from '../../mocks/mockActivity'

interface TokenSelectorModalProps {
    isOpen: boolean
    onClose: () => void
    onSelect: (token: Token) => void
    selectedToken?: Token
}

const AVAILABLE_TOKENS = [RUMBA, PYUSD]

export default function TokenSelectorModal({
    isOpen,
    onClose,
    onSelect,
    selectedToken,
}: TokenSelectorModalProps) {
    const [customAddress, setCustomAddress] = useState('')

    const handleSelect = (token: Token) => {
        onSelect(token)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Select Token" size="sm">
            <div className="space-y-4">
                <Input
                    placeholder="Paste token address (UI only)"
                    value={customAddress}
                    onChange={(e) => setCustomAddress(e.target.value)}
                />

                <div className="space-y-2">
                    <p className="text-sm text-gray-400 font-medium">Available Tokens</p>
                    {AVAILABLE_TOKENS.map((token) => (
                        <button
                            key={token.symbol}
                            onClick={() => handleSelect(token)}
                            className={`w-full flex items-center justify-between p-4 rounded-lg border transition-all ${selectedToken?.symbol === token.symbol
                                ? 'bg-accent-900/20 border-accent-600'
                                : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-accent-400 to-accent-600 rounded-full flex items-center justify-center font-bold text-white">
                                    {token.symbol[0]}
                                </div>
                                <div className="text-left">
                                    <div className="font-semibold">{token.symbol}</div>
                                    <div className="text-sm text-gray-400">{token.name}</div>
                                </div>
                            </div>
                            {selectedToken?.symbol === token.symbol && (
                                <div className="w-5 h-5 bg-accent-500 rounded-full flex items-center justify-center">
                                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </Modal>
    )
}