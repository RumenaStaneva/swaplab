import { Token } from "../types/swap";

declare global {
    interface ImportMetaEnv {
        readonly VITE_RUMBA_TOKEN_ADDRESS: string;
        readonly VITE_PYUSD_TOKEN_ADDRESS: string;
        readonly [key: string]: string | undefined;
    }

    interface ImportMeta {
        readonly env: ImportMetaEnv;
    }
}

export const ERC20_ABI = [
    { type: "function", name: "decimals", stateMutability: "view", inputs: [], outputs: [{ type: "uint8" }] },
    { type: "function", name: "balanceOf", stateMutability: "view", inputs: [{ name: "owner", type: "address" }], outputs: [{ type: "uint256" }] },
    { type: "function", name: "allowance", stateMutability: "view", inputs: [{ name: "owner", type: "address" }, { name: "spender", type: "address" }], outputs: [{ type: "uint256" }] },
    { type: "function", name: "approve", stateMutability: "nonpayable", inputs: [{ name: "spender", type: "address" }, { name: "amount", type: "uint256" }], outputs: [{ type: "bool" }] },
] as const;


export const RUMBA: Token = {
    symbol: "RUMBA",
    name: "Rumba",
    address: import.meta.env.VITE_RUMBA_TOKEN_ADDRESS,
    decimals: 18,
};

export const PYUSD: Token = {
    symbol: "PYUSD",
    name: "PayPal USD",
    address: import.meta.env.VITE_PYUSD_TOKEN_ADDRESS,
    decimals: 6,
};