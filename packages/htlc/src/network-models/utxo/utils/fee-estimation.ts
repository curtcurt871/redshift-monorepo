import { TxOutput, WeightEstimationError } from '@radar/redshift-types';
import { isArray, isDefined } from '../../../utils';

const shortPushdataLength = 1;
const ecdsaSignatureLength = 72; // ECDSA Signature Max Byte Length
const sequenceLength = 4; // Sequence Number Byte Length

/**
 * Estimate the weight of a transaction after signed SegWit inputs are added
 * @param utxos The funding utxos
 * @param weight Weight Without Signed Inputs Number
 * @param redeem The redeem script buffer
 * @param unlock Claim secret (preimage) OR refund public key OR refund public key AND refund secret
 */
export function estimateWeightWithInputs(
  utxos: TxOutput[],
  weight: number,
  redeem: Buffer,
  unlock?: string | [string, string],
): number {
  if (!isArray(utxos)) {
    throw new Error(WeightEstimationError.EXPECTED_UTXOS);
  }

  if (!weight) {
    throw new Error(WeightEstimationError.EXPECTED_UNSIGNED_TX_WEIGHT);
  }

  const feeEstimateFactors = [shortPushdataLength, ecdsaSignatureLength];

  // if adminRefund, unlock is an array of the publicKey and refundSecret
  if (Array.isArray(unlock)) {
    const [refundSecret, publicKey] = unlock;
    feeEstimateFactors.push(
      shortPushdataLength,
      Buffer.from(publicKey, 'hex').length,
      shortPushdataLength,
      Buffer.from(refundSecret, 'hex').length,
    );
  } else if (unlock) {
    feeEstimateFactors.push(
      !!unlock ? shortPushdataLength : [].length,
      Buffer.from(unlock, 'hex').length,
    );
  }

  feeEstimateFactors.push(sequenceLength, redeem.length);

  return utxos.reduce(sum => {
    return [...feeEstimateFactors, sum].reduce((sum, n) => sum + n);
  }, weight);
}

/**
 * Estimate the transaction fee for a specific tx using target fee
 * per kilobyte of the passed network and the transaction's weight
 * @param redeemScript The redeem script for the transaction
 * @param utxos The UTXOs used in the transaction
 * @param txWeight The transaction's weight in weight units
 * @param feeTokensPerVirtualByte Fee per byte in the transaction
 * @param unlock Claim secret (preimage) OR refund public key OR refund public key AND refund secret
 */
export function estimateFee(
  redeemScript: string,
  utxos: TxOutput[],
  txWeight: number,
  feeTokensPerVirtualByte: number,
  unlock?: string | [string, string],
) {
  // Guess at the final weight of the transaction for fee/vbyte calculation
  const anticipatedWeight = estimateWeightWithInputs(
    utxos,
    txWeight,
    Buffer.from(redeemScript, 'hex'),
    unlock,
  );

  const vRatio = 4; // A witness byte weighs one weight unit; compared to four non-witness weight units.
  return feeTokensPerVirtualByte * Math.ceil(anticipatedWeight / vRatio);
}
