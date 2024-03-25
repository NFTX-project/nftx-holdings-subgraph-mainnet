import { Address } from "@graphprotocol/graph-ts";

export const ADDRESS_ZERO: Address = Address.fromString(
  "0x0000000000000000000000000000000000000000"
);

export const MAINNET_STAKING_TOKEN_PROVIDER = Address.fromString(
  "0x5fAD0e4cc9925365b9B0bbEc9e0C3536c0B1a5C7"
);
export const GOERLI_STAKING_TOKEN_PROVIDER = Address.fromString(
  "0x057862b3DB9fDe38d030479FEe43Deb38b04d211"
);
export const ARBITRUM_ONE_STAKING_TOKEN_PROVIDER = Address.fromString(
  "0xe5AB394e284d095aDacff8A0fb486cb5a24b0b7a"
);

export const MAINNET_NFTX_VAULT_FACTORY = Address.fromString(
  "0xBE86f647b167567525cCAAfcd6f881F1Ee558216"
);
export const GOERLI_NFTX_VAULT_FACTORY = Address.fromString(
  "0x1478bEB5D18B23d2bA90FcEe91d66460AC585e6b"
);
export const ARBITRUM_ONE_NFTX_VAULT_FACTORY = Address.fromString(
  "0xE77b89FEc41A7b7dC74eb33602e82F0672FbB33C"
);
export const SEPOLIA_NFTX_VAULT_FACTORY = Address.fromString(
  "0x31C56CaF49125043e80B4d3C7f8734f949d8178C"
);

export const MAINNET_NFTX_INVENTORY_STAKING = Address.fromString(
  "0x3E135c3E981fAe3383A5aE0d323860a34CfAB893"
);
export const GOERLI_NFTX_INVENTORY_STAKING = Address.fromString(
  "0x6e91A3f27cE6753f47C66B76B03E6A7bFdDB605B"
);
export const ARBITRUM_ONE_NFTX_INVENTORY_STAKING = Address.fromString(
  "0x1A2C03ABD4Af7C87d8b4d5aD39b56fa98E8C4Cc6"
);

export const SEPOLIA_NFTX_INVENTORY_STAKING = Address.fromString(
  "0xfBFf0635f7c5327FD138E1EBa72BD9877A6a7C1C"
);

export const MAINNET_WETH = Address.fromString(
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
);

export const GOERLI_WETH = Address.fromString(
  "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6"
);

export const SEPOLIA_WETH = Address.fromString(
  "0xfff9976782d46cc05630d1f6ebab18b2324d6b14"
);

export const ARBITRUM_WETH = Address.fromString(
  "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1"
);

export function STAKING_TOKEN_PROVIDER(network: string): Address {
  if (network === "mainnet") return MAINNET_STAKING_TOKEN_PROVIDER;
  else if (network === "goerli") return GOERLI_STAKING_TOKEN_PROVIDER;
  else if (network === "arbitrum-one") return ARBITRUM_ONE_STAKING_TOKEN_PROVIDER;
  return MAINNET_STAKING_TOKEN_PROVIDER;
}

export function NFTX_VAULT_FACTORY(network: string): Address {
  if (network === "mainnet") return MAINNET_NFTX_VAULT_FACTORY;
  else if (network === "goerli") return GOERLI_NFTX_VAULT_FACTORY;
  else if (network === "sepolia") return SEPOLIA_NFTX_VAULT_FACTORY;
  else if (network === "arbitrum-one") return ARBITRUM_ONE_NFTX_VAULT_FACTORY;
  return MAINNET_NFTX_VAULT_FACTORY;
}

export function NFTX_INVENTORY_STAKING(network: string): Address {
  if (network === "mainnet") return MAINNET_NFTX_INVENTORY_STAKING;
  else if (network === "goerli") return GOERLI_NFTX_INVENTORY_STAKING;
  else if (network === "sepolia") return SEPOLIA_NFTX_INVENTORY_STAKING;
  else if (network === "arbitrum-one") return ARBITRUM_ONE_NFTX_INVENTORY_STAKING;
  return MAINNET_NFTX_INVENTORY_STAKING;
}

export function WETH(network: string): Address {
  if (network === "mainnet") return MAINNET_WETH;
  else if (network === "goerli") return GOERLI_WETH;
  else if (network === "sepolia") return SEPOLIA_WETH;
  else if (network === "arbitrum-one") return ARBITRUM_WETH;
  return MAINNET_WETH;
}