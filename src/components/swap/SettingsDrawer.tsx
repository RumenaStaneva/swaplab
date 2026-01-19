import { Settings } from 'lucide-react'
import { useState } from 'react'
import Modal from '../ui/Modal'
import Input from '../ui/Input'
import { SwapSettings } from '../../types/swap'

interface SettingsDrawerProps {
    settings: SwapSettings
    onChange: (settings: SwapSettings) => void
}

export default function SettingsDrawer({ settings, onChange }: SettingsDrawerProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-gray-200"
            >
                <Settings className="w-5 h-5" />
            </button>

            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                title="Swap Settings"
                size="sm"
            >
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                            Slippage Tolerance
                        </label>
                        <div className="flex gap-2">
                            {[0.1, 0.5, 1.0].map((value) => (
                                <button
                                    key={value}
                                    onClick={() => onChange({ ...settings, slippageTolerance: value })}
                                    className={`flex-1 px-4 py-2 rounded-lg border transition-all ${settings.slippageTolerance === value
                                        ? 'bg-accent-500 border-accent-400 text-white'
                                        : 'bg-gray-800 border-gray-700 hover:border-gray-600'
                                        }`}
                                >
                                    {value}%
                                </button>
                            ))}
                        </div>
                        <Input
                            type="number"
                            value={settings.slippageTolerance}
                            onChange={(e) => onChange({ ...settings, slippageTolerance: parseFloat(e.target.value) || 0 })}
                            placeholder="Custom"
                            className="mt-2"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-3">
                            Transaction Deadline
                        </label>
                        <div className="flex items-center gap-2">
                            <Input
                                type="number"
                                value={settings.deadline}
                                onChange={(e) => onChange({ ...settings, deadline: parseInt(e.target.value) || 20 })}
                            />
                            <span className="text-gray-400">minutes</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}