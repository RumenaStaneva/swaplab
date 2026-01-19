import { SwapActivity, Token } from '../types/swap'

export const RUMBA: Token = {
    symbol: 'RUMBA',
    name: 'Rumba Token',
    decimals: 18,
}

export const PYUSD: Token = {
    symbol: 'PYUSD',
    name: 'PayPal USD',
    decimals: 6,
}

export const mockActivities: SwapActivity[] = [
    {
        id: '1',
        timestamp: Date.now() - 300000,
        tokenIn: RUMBA,
        tokenOut: PYUSD,
        amountIn: '100.0',
        amountOut: '98.50',
        status: 'success',
        txHash: '0x1234...5678',
    },
    {
        id: '2',
        timestamp: Date.now() - 3600000,
        tokenIn: PYUSD,
        tokenOut: RUMBA,
        amountIn: '50.0',
        amountOut: '51.20',
        status: 'success',
        txHash: '0xabcd...efgh',
    },
    {
        id: '3',
        timestamp: Date.now() - 7200000,
        tokenIn: RUMBA,
        tokenOut: PYUSD,
        amountIn: '200.0',
        amountOut: '0.0',
        status: 'failed',
    },
]