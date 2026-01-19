import { CheckCircle, XCircle, ExternalLink } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'
import { SwapState } from '../../types/swap'

interface TxStatusModalProps {
    isOpen: boolean
    onClose: () => void
    status: SwapState.TX_SUCCESS | SwapState.TX_ERROR
    txHash?: string
    errorMessage?: string
}

export default function TxStatusModal({
    isOpen,
    onClose,
    status,
    txHash,
    errorMessage,
}: TxStatusModalProps) {
    const isSuccess = status === SwapState.TX_SUCCESS

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="sm">
            <div className="text-center space-y-4">
                {isSuccess ? (
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
                ) : (
                    <XCircle className="w-16 h-16 text-red-500 mx-auto" />
                )}

                <div>
                    <h3 className="text-2xl font-bold mb-2">
                        {isSuccess ? 'Swap Successful!' : 'Transaction Failed'}
                    </h3>
                    <p className="text-gray-400">
                        {isSuccess
                            ? 'Your tokens have been swapped successfully'
                            : errorMessage || 'The transaction was rejected or failed'}
                    </p>
                </div>

                {txHash && (
                    <a
                        href={`https://sepolia.etherscan.io/tx/${txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-accent-400 hover:text-accent-300 transition-colors"
                    >
                        View on Etherscan
                        <ExternalLink className="w-4 h-4" />
                    </a>
                )}


                <Button onClick={onClose} variant="primary" className="w-full">
                    Close
                </Button>
            </div>
        </Modal>
    )
}