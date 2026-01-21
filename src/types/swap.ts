export enum SwapState {
    DISCONNECTED = 'DISCONNECTED',
    ENTER_AMOUNT = 'ENTER_AMOUNT',
    WRONG_NETWORK = 'WRONG_NETWORK',
    NEEDS_APPROVAL = 'NEEDS_APPROVAL',
    READY_TO_SWAP = 'READY_TO_SWAP',
    TX_PENDING = 'TX_PENDING',
    TX_SUCCESS = 'TX_SUCCESS',
    TX_ERROR = 'TX_ERROR',
}

export enum SwapMode {
    EXACT_IN = 'EXACT_IN',
    EXACT_OUT = 'EXACT_OUT',
}

export interface Token {
    symbol: string
    name: string
    address?: string
    decimals: number
    logoUrl?: string
}

export interface SwapActivity {
    id: string
    timestamp: number
    tokenIn: Token
    tokenOut: Token
    amountIn: string
    amountOut: string
    status: 'pending' | 'success' | 'failed'
    txHash?: string
}

export interface SwapSettings {
    slippageTolerance: number
    deadline: number
}