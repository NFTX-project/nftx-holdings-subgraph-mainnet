import { NFTXFeeDistributor } from "../../generated/NFTXVaultFactoryUpgradeable/NFTXFeeDistributor";
import {
  NewFeeDistributor,
  NewVault
} from "../../generated/NFTXVaultFactoryUpgradeable/NFTXVaultFactoryUpgradeable";
import { NFTXLPStaking } from "../../generated/templates";
import { ADDRESS_ZERO } from "./utils/constants";
import { createTokenAndAssignAssetInfo, createVaultAddressLookup } from "./utils/vaultIdAssignment";

export function handleNewVault(event: NewVault): void {
  createTokenAndAssignAssetInfo(event.params.vaultAddress, event.params.vaultId, "vToken");
  createVaultAddressLookup(event.params.vaultAddress, event.params.vaultId);
}

export function handleNewFeeDistributor(event: NewFeeDistributor): void {
  const feeDistributor = NFTXFeeDistributor.bind(event.params.newDistributor);

  const lpStakingAddressFromInstance = feeDistributor.try_lpStaking();

  const lpStakingAddress = lpStakingAddressFromInstance.reverted
    ? ADDRESS_ZERO
    : lpStakingAddressFromInstance.value;

  NFTXLPStaking.create(lpStakingAddress);
}
