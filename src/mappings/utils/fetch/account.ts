// https://github.com/OpenZeppelin/openzeppelin-subgraphs/blob/7d6ad2e5b47a26bd654d9d4164e645258e4b3c51/src/fetch/account.ts#L9

import { Address } from "@graphprotocol/graph-ts";

import { Account } from "../../../../generated/schema";

export function fetchAccount(address: Address): Account {
  let account = Account.load(address.toHexString())
  if(!account){
    account = new Account(address.toHexString());
    account.save();
  }

  return account;
}
