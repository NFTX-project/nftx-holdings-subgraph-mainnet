import { Address, BigInt, dataSource } from "@graphprotocol/graph-ts";
import { UserStaked } from "../../generated/NFTXStakingZapV2/NFTXStakingZap";
import {
  PoolCreated,
  PoolUpdated,
  Deposit
} from "../../generated/NFTXLPStaking/NFTXLPStaking";
import { NFTXVaultFactoryUpgradeable } from "../../generated/templates/Token/NFTXVaultFactoryUpgradeable";
import { StakingTokenProvider } from "../../generated/templates/Token/StakingTokenProvider";
import { NFTX_VAULT_FACTORY, STAKING_TOKEN_PROVIDER } from "./utils/constants";
import { createTokenAndAssignAssetInfo } from "./utils/vaultIdAssignment";

export function handleVaultTokenWETHPairCreation(event: UserStaked): void {
  //stakingPair(event.params.vaultId);
}

function stakingPair(vaultId: BigInt): void {
  const network: string = dataSource.network();

  const nftxVaultFactory = NFTXVaultFactoryUpgradeable.bind(
    NFTX_VAULT_FACTORY(network)
  );
  const stakingTokenProvider = StakingTokenProvider.bind(
    STAKING_TOKEN_PROVIDER(network)
  );

  const vaultTokenFromInstance = nftxVaultFactory.try_vault(vaultId);
  if (vaultTokenFromInstance.reverted) return;

  const pairFromInstance = stakingTokenProvider.try_stakingTokenForVaultToken(
    vaultTokenFromInstance.value
  );
  if (pairFromInstance.reverted) return;

  createTokenAndAssignAssetInfo(pairFromInstance.value, vaultId, "vTokenWETH");
}

function newPool(pair: Address, vaultId: BigInt): void {
  createTokenAndAssignAssetInfo(pair, vaultId, "xTokenWETH");
}

export function handlePoolCreated(event: PoolCreated): void {
  newPool(event.params.pool, event.params.vaultId);
  //stakingPair(event.params.vaultId);
}


export function handleDeposit(event: Deposit): void {
  // newPool(event.params.pool, event.params.vaultId);
  createTokenAndAssignAssetInfo(event.params.stakingToken, event.params.vaultId, "vTokenWETH")
}

export function handlePoolUpdated(event: PoolUpdated): void {
  newPool(event.params.pool, event.params.vaultId);
}
