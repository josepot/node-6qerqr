// src/index.ts
import { withContract, createClient } from "@unstoppablejs/solidity-bindings";

// src/provider.js
import provider from "eth-provider";
var provider_default = provider;

// src/erc20-generated.ts
import { address, bool, Tuple, uint } from "solidity-codecs";
import { solidityFn } from "@unstoppablejs/solidity-bindings";
var decimalsFn = solidityFn("decimals", [], Tuple(uint), 1);
var approveTx = solidityFn("approve", [address, uint], Tuple(bool), 2);
var transferFromTx = solidityFn("transferFrom", [address, address, uint], Tuple(bool), 2);

// src/index.ts
var TENDERLY_FORK_ID = "66e972fb-b726-46a9-9d2d-281a28e5967d";
var TOKEN_ADDRESS = "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1";
var AMOUNT = 500000n;
var FROM_ADDRESS = "0x489ee077994b6658eafa855c308275ead8097c4a";
var TO_ADDRESS = "0x70997970c51812dc3a010c7d01b50e0d17dc79c8";
var erc20 = withContract(() => TOKEN_ADDRESS, createClient(() => provider_default(`https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`)));
var decimals = erc20.call(decimalsFn);
var approve = erc20.tx(approveTx);
var transfer = erc20.tx(transferFromTx);
var TOKEN_DECIMALS = await decimals();
var AMOUNT_WITH_DECIMALS = AMOUNT * 10n ** TOKEN_DECIMALS;
await approve(FROM_ADDRESS, FROM_ADDRESS, AMOUNT_WITH_DECIMALS);
var txHash = await transfer(FROM_ADDRESS, FROM_ADDRESS, TO_ADDRESS, AMOUNT_WITH_DECIMALS);
console.log("transaction hash", txHash);
//# sourceMappingURL=index.js.map
