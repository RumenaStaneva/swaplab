import { SwapState } from '../../types/swap'
import Button from '../ui/Button'

interface PrimaryActionButtonProps {
    state: SwapState
    onClick: () => void
    tokenSymbol?: string
}

export default function PrimaryActionButton({
    state,
    onClick,
    tokenSymbol,
}: PrimaryActionButtonProps) {
    const getButtonConfig = () => {
        switch (state) {
            case SwapState.DISCONNECTED:
                return { text: 'Connect Wallet', disabled: false, loading: false }
            case SwapState.WRONG_NETWORK:
                return { text: 'Switch to Sepolia', disabled: false, loading: false }
            case SwapState.NEEDS_APPROVAL:
                return { text: `Approve ${tokenSymbol || 'Token'}`, disabled: false, loading: false }
            case SwapState.READY_TO_SWAP:
                return { text: 'Swap', disabled: false, loading: false }
            case SwapState.TX_PENDING:
                return { text: 'Swapping...', disabled: true, loading: true }
            default:
                return { text: 'Swap', disabled: true, loading: false }
        }
    }

    const { text, disabled, loading } = getButtonConfig()

    return (
        <Button
            onClick={onClick}
            disabled={disabled}
            isLoading={loading}
            variant="primary"
            size="lg"
            className="w-full"
        >
            {text}
        </Button>
    )
}