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
  let vaultAsset = VaultAsset.load(address.toHexString())
  if(!vaultAsset){
    const account = fetchAccount(address);
     vaultAsset = fetchVaultAsset(account.id);
     Token.create(address);

  vaultAsset.vaultId = vaultId;
  vaultAsset.type = type;
  vaultAsset.save();
  }
  
  //const tokenContract = ERC20Contract.load(account.id);

  
}


export function createVaultAddressLookup(address: Address, vaultId: BigInt) : void {
  let vaultAddressLookup = new VaultAddressLookup(vaultId.toHexString());
  vaultAddressLookup.address = address;
  vaultAddressLookup.save();
}

export function getVaultFromID(vaultId: BigInt) : VaultAddressLookup | null {
  return VaultAddressLookup.load(vaultId.toHexString());
}