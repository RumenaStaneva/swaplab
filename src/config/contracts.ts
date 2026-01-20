export const ADDR = {
    RUMBA: ((import.meta as any).env.VITE_RUMBA_TOKEN_ADDRESS) as `0x${string}`,
    PYUSD: ((import.meta as any).env.VITE_PYUSD_TOKEN_ADDRESS) as `0x${string}`,
    UNIV2_ROUTER: ((import.meta as any).env.VITE_UNISWAP_V2_ROUTER) as `0x${string}`,
};

export const SEPOLIA_CHAIN_ID = 11155111;
