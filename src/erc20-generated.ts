import { address, bool, Tuple, uint } from 'solidity-codecs';
import { solidityFn } from '@unstoppablejs/solidity-bindings';

export const decimalsFn = solidityFn('decimals', [], Tuple(uint), 1);
export const approveTx = solidityFn(
  'approve',
  [address, uint] as [spender: typeof address, value: typeof uint],
  Tuple(bool),
  2
);

export const transferFromTx = solidityFn(
  'transferFrom',
  [address, address, uint] as [
    from: typeof address,
    to: typeof address,
    value: typeof uint
  ],
  Tuple(bool),
  2
);
