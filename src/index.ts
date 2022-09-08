import { withContract, createClient } from '@unstoppablejs/solidity-bindings';
import ethProvider from './provider';
import { decimalsFn, approveTx, transferFromTx } from './erc20-generated';

const TENDERLY_FORK_ID = '66e972fb-b726-46a9-9d2d-281a28e5967d'; // TODO: DON'T FORGET TO UPDATE IT
const TOKEN_ADDRESS = '0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1'; // THIS ONE IS FOR USDC
const AMOUNT = 500_000n;
const FROM_ADDRESS = '0x489ee077994b6658eafa855c308275ead8097c4a'; // This one is the Coinbase 2 Address
const TO_ADDRESS = '0x70997970c51812dc3a010c7d01b50e0d17dc79c8';

const erc20 = withContract(
  () => TOKEN_ADDRESS,
  createClient(() =>
    ethProvider(`https://rpc.tenderly.co/fork/${TENDERLY_FORK_ID}`)
  )
);
const decimals = erc20.call(decimalsFn);
const approve = erc20.tx(approveTx);
const transfer = erc20.tx(transferFromTx);

const TOKEN_DECIMALS = await decimals();
const AMOUNT_WITH_DECIMALS = AMOUNT * 10n ** TOKEN_DECIMALS;

await approve(FROM_ADDRESS, FROM_ADDRESS, AMOUNT_WITH_DECIMALS);

const txHash = await transfer(
  FROM_ADDRESS,
  FROM_ADDRESS,
  TO_ADDRESS,
  AMOUNT_WITH_DECIMALS
);
console.log('transaction hash', txHash);
