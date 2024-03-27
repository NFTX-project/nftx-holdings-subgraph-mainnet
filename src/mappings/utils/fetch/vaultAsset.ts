import { VaultAsset } from "../../../../generated/schema";

export function fetchVaultAsset(accountId: string): VaultAsset {
  let vaultAsset = VaultAsset.load(accountId)
  if(!vaultAsset){
    vaultAsset = new VaultAsset(accountId);
    vaultAsset.save();
  }
  return vaultAsset;
}
