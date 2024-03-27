import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ERC20Contract, VaultAddressLookup, VaultAsset } from "../../../generated/schema";
import { Token } from "../../../generated/templates";
import { fetchAccount } from "./fetch/account";
import { fetchVaultAsset } from "./fetch/vaultAsset";

export function createTokenAndAssignAssetInfo(
  address: Address,
  vaultId: BigInt,
  type: string
): void {
  const account = fetchAccount(address);
  const tokenContract = ERC20Contract.load(account.id);
  let vaultAsset = VaultAsset.load(address.toHexString())
  if(!vaultAsset){
     vaultAsset = fetchVaultAsset(account.id);
  }
  if (!tokenContract) Token.create(address);
  //const tokenContract = ERC20Contract.load(account.id);

  vaultAsset.vaultId = vaultId;
  vaultAsset.type = type;
  vaultAsset.save();
}


export function createVaultAddressLookup(address: Address, vaultId: BigInt) : void {
  let vaultAddressLookup = new VaultAddressLookup(vaultId.toHexString());
  vaultAddressLookup.address = address;
  vaultAddressLookup.save();
}

export function getVaultFromID(vaultId: BigInt) : VaultAddressLookup | null {
  return VaultAddressLookup.load(vaultId.toHexString());
}