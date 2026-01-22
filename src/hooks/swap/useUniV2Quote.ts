import { useMemo } from "react";
import { useReadContract } from "wagmi";
import { UNIV2_ROUTER_ABI } from "../../abis/univ2Router";
import { SwapMode } from "../../types/swap";

const factory = "0xeE567Fe1712Faf6149d80dA1E6934E354124CfE3"

type Params = {
    mode: SwapMode;
    router: `0x${string}`;
    path: `0x${string}`[];
    amountInWei?: bigint;  // used in EXACT_IN
    amountOutWei?: bigint; // used in EXACT_OUT
    enabled: boolean;
};

export function useUniV2Quote({
    mode,
    router,
    path,
    amountInWei,
    amountOutWei,
    enabled,
}: Params) {
    const shouldQuoteExactIn =
        enabled && mode === SwapMode.EXACT_IN && amountInWei != null && amountInWei > 0n;

    const shouldQuoteExactOut =
        enabled && mode === SwapMode.EXACT_OUT && amountOutWei != null && amountOutWei > 0n;


    const quoteExactIn = useReadContract({
        abi: UNIV2_ROUTER_ABI,
        address: router,
        functionName: "getAmountsOut",
        args: shouldQuoteExactIn ? [amountInWei!, path] : undefined,
        query: { enabled: shouldQuoteExactIn },
    });

    const quoteExactOut = useReadContract({
        abi: UNIV2_ROUTER_ABI,
        address: router,
        functionName: "getAmountsIn",
        args: shouldQuoteExactOut ? [amountOutWei!, path] : undefined,
        query: { enabled: shouldQuoteExactOut },
    });



    const quotedOutWei = useMemo(() => {
        const arr = quoteExactIn.data;
        if (!arr || arr.length < 2) return undefined;
        return arr[arr.length - 1];
    }, [quoteExactIn.data]);

    const quotedInWei = useMemo(() => {
        const arr = quoteExactOut.data;
        if (!arr || arr.length < 2) return undefined;
        return arr[0];
    }, [quoteExactOut.data]);

    return {
        quotedOutWei, // for EXACT_IN
        quotedInWei,  // for EXACT_OUT
        isFetching: quoteExactIn.isFetching || quoteExactOut.isFetching,
        isError: quoteExactIn.isError || quoteExactOut.isError,
        error: quoteExactIn.error ?? quoteExactOut.error,
    };
}
