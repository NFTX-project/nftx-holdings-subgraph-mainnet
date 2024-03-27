import { Address, BigInt, dataSource, log } from "@graphprotocol/graph-ts";
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
  stakingPair(event.params.vaultId);
}

function stakingPair(vaultId: BigInt): void {
  const network: string = dataSource.network();

  const nftxVaultFactory = NFTXVaultFactoryUpgradeable.bind(
    NFTX_VAULT_FACTORY(network)
  );
  const stakingTokenProvider = StakingTokenProvider.bind(
    STAKING_TOKEN_PROVIDER(network)
  );
  log.info("St1",[])

  const vaultTokenFromInstance = nftxVaultFactory.try_vault(vaultId);
  if (vaultTokenFromInstance.reverted) return;
  log.info("St2",[])

  const pairFromInstance = stakingTokenProvider.try_stakingTokenForVaultToken(
    vaultTokenFromInstance.value
  );
  if (pairFromInstance.reverted) return;
  log.info("St3",[])

  createTokenAndAssignAssetInfo(pairFromInstance.value, vaultId, "vTokenWETH");
}

function newPool(pair: Address, vaultId: BigInt): void {
  createTokenAndAssignAssetInfo(pair, vaultId, "xTokenWETH");
}

export function handlePoolCreated(event: PoolCreated): void {
  log.info("PolC - {} - {}",[event.params.token.toHexString(), event.params.poolId.toString()])
  newPool(event.params.token, event.params.poolId);
  stakingPair(event.params.poolId);
}


export function handleDeposit(event: Deposit): void {
  // newPool(event.params.pool, event.params.vaultId);
  createTokenAndAssignAssetInfo(event.params.stakingToken, event.params.vaultId, "vTokenWETH")
}

export function handlePoolUpdated(event: PoolUpdated): void {
  newPool(event.params.pool, event.params.vaultId);
}
