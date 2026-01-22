import { useMemo } from "react";
import { parseUnits } from "viem";
import { SwapMode } from "../../types/swap";

type Params = {
    mode: SwapMode;
    amountIn: string;
    amountOut: string;
    inDecimals?: number;
    outDecimals?: number;
};

function safeParseUnits(value: string, decimals?: number) {
    if (!value || decimals == null) return undefined;
    try {
        return parseUnits(value, decimals);
    } catch {
        return undefined;
    }
}

export function useSwapAmounts({
    mode,
    amountIn,
    amountOut,
    inDecimals,
    outDecimals,
}: Params) {
    const amountInWei = useMemo(() => {
        if (mode !== SwapMode.EXACT_IN) return undefined;
        return safeParseUnits(amountIn, inDecimals);
    }, [mode, amountIn, inDecimals]);

    const amountOutWei = useMemo(() => {
        if (mode !== SwapMode.EXACT_OUT) return undefined;
        return safeParseUnits(amountOut, outDecimals);
    }, [mode, amountOut, outDecimals]);

    return { amountInWei, amountOutWei };
}
