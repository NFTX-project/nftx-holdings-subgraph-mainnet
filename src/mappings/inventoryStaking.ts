import { Address, BigInt, dataSource } from "@graphprotocol/graph-ts";
import {
  XTokenCreated,
  Deposit,
  Withdraw,
  NFTXInventoryStaking,
} from "../../generated/NFTXInventoryStaking/NFTXInventoryStaking";
import { VaultAsset } from "../../generated/schema";
import {
  ADDRESS_ZERO,
  NFTX_INVENTORY_STAKING,
} from "./utils/constants";
import { fetchAccount } from "./utils/fetch/account";
import { fetchVaultAsset } from "./utils/fetch/vaultAsset";
import {
  createTokenAndAssignAssetInfo,
  getVaultFromID,
} from "./utils/vaultIdAssignment";

export function handleXTokenCreated(event: XTokenCreated): void {
  createTokenAndAssignAssetInfo(
    event.params.xToken,
    event.params.vaultId,
    "xToken"
  );
}

export function handleXTokenDeposited(event: Deposit): void {
  const network: string = dataSource.network();
  const vaultId = event.params.vaultId;

  let vault = getVaultFromID(vaultId);
  if (vault != null) {
    let vaultAddress = vault.address;
    let xTokenShareValue = getXTokenShareValue(vaultId, network);

    let account = fetchAccount(Address.fromBytes(vaultAddress));
    let vaultAsset = VaultAsset.load(vaultAddress.toHexString());
    if (!vaultAsset) {
      vaultAsset = fetchVaultAsset(account.id);
    }
    vaultAsset.xTokenShareValue = xTokenShareValue;
    vaultAsset.save();
  }
}

export function handleXTokenWithdrawn(event: Withdraw): void {
  const network: string = dataSource.network();
  const vaultId = event.params.vaultId;

  let vault = getVaultFromID(vaultId);
  if (vault != null) {
    let vaultAddress = vault.address;
    let xTokenShareValue = getXTokenShareValue(vaultId, network);
    if (vaultAddress == ADDRESS_ZERO || xTokenShareValue == BigInt.fromI32(0))
      return;

    let account = fetchAccount(Address.fromBytes(vaultAddress));
    let vaultAsset = VaultAsset.load(vaultAddress.toHexString());
    if (!vaultAsset) {
      vaultAsset = fetchVaultAsset(account.id);
    }
    vaultAsset.xTokenShareValue = xTokenShareValue;
    vaultAsset.save();
  }
}

function getXTokenShareValue(vaultId: BigInt, network: string): BigInt {
  const nftxInventoryStaking = NFTXInventoryStaking.bind(
    NFTX_INVENTORY_STAKING(network)
  );
  const xTokenShareValueFromInstance = nftxInventoryStaking.try_xTokenShareValue(
    vaultId
  );
  if (xTokenShareValueFromInstance.reverted) return BigInt.fromI32(0);
  return xTokenShareValueFromInstance.value;
}
