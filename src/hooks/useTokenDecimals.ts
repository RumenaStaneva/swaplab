import { useReadContract } from "wagmi";
import { ERC20_ABI } from "../abis/erc20";

export function useTokenDecimals(tokenAddress?: `0x${string}`) {

    const result = useReadContract({
        abi: ERC20_ABI,
        address: tokenAddress,
        functionName: 'decimals',
        query: { enabled: !!tokenAddress },
    });
    return { decimals: result.data, isLoading: result.isLoading, isError: result.isError }
};
