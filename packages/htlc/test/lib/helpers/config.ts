import { BitcoinSubnet, Network } from '@radar/redshift-types';
import { crypto } from 'bitcoinjs-lib';
import uuidv4 from 'uuid/v4';
import { UTXO } from '../../../src';
import { addHexPrefix } from '../../../src/utils';
import { getTestingMnemonic } from './env-vars';
import { getKeyPairFromMnemonic } from './wallet';

/**
 * Generate a random hex string
 */
function generateRandomHexString() {
  return Math.random()
    .toString(16)
    .replace('0.', '')
    .substring(1);
}

/**
 * SHA256 hash a hex string and return the hashed string value
 * @param str The hex string to hash
 */
function sha256Hash(str: string) {
  return crypto.sha256(Buffer.from(str, 'hex')).toString('hex');
}

/**
 * Generate random invoice, secret, and hash values for testing
 * @param prefixHex Whether or not the hex secret & hash should be prefixed
 */
function generateRandomIdSecretAndHashValues(prefixHex: boolean) {
  const orderUUID = uuidv4();
  let paymentSecret = sha256Hash(generateRandomHexString());
  let paymentHash = sha256Hash(paymentSecret);

  if (prefixHex) {
    paymentSecret = addHexPrefix(paymentSecret);
    paymentHash = addHexPrefix(paymentHash);
  }
  return {
    orderUUID,
    paymentSecret,
    paymentHash,
    amount: Math.random()
      .toFixed(2)
      .toString(),
  };
}

/**
 * Network specific data and configuration
 */
const networkSpecificConfigs = {
  bitcoin: {
    unit: {
      valid: {
        absoluteTimeLock: {
          redeemScript:
            '76a820e0531eaf4c51c77afc74a0ae13ebe7b1832c4a1c864abde6ca3e2eb280aa413d876375210398c9a44bed9f59c6041a574602aab0af6a08f3f0fb847fd9a167f7afd71b8d256702e10bb17576a9143f1857b3db895b4d481a46e5a0129cb2b04781c88868ac',
          htlc: {
            args: {
              claimerPublicKey:
                '0398c9a44bed9f59c6041a574602aab0af6a08f3f0fb847fd9a167f7afd71b8d25',
              paymentHash:
                'e0531eaf4c51c77afc74a0ae13ebe7b1832c4a1c864abde6ca3e2eb280aa413d',
              refundAddress: 'ST3cmHBZSa5KsDrbgFMmDaj78DhDa9US3J',
              timelock: {
                type: UTXO.LockType.ABSOLUTE,
                blockHeight: 3041,
              },
            },
            details: {
              network: 'bitcoin',
              subnet: 'simnet',
              claimerPublicKey:
                '0398c9a44bed9f59c6041a574602aab0af6a08f3f0fb847fd9a167f7afd71b8d25',
              paymentHash:
                'e0531eaf4c51c77afc74a0ae13ebe7b1832c4a1c864abde6ca3e2eb280aa413d',
              refundPublicKeyHash: '3f1857b3db895b4d481a46e5a0129cb2b04781c8',
              timelockBlockHeight: 3041,
              p2shOutputScript:
                'a9145a53e89d2db880a0dcaa627693b021344d15fdcf87',
              p2shAddress: 'rdooShNdwHvAX73aXvu7kG2sqfE93RRshs',
              p2shP2wshAddress: 'rWD48icLn4KwfPCWECVqRkfYD8rXmo6zdD',
              p2shP2wshOutputScript:
                'a91406f8bb6bbc7e0932d010e2242ba7f1c37208682587',
              p2wshAddress:
                'sb1qg69sz0pa3xj5sfftq0lrtt6c3pl9ry0vd547he6j3sn55x6kujlsdtpk2y',
              p2wshOutputScript:
                '0020468b013c3d89a548252b03fe35af58887e5191ec6d2bebe7528c274a1b56e4bf',
              refundP2wpkhAddress: 'sb1q8uv90v7m39d56jq6gmj6qy5uk2cy0qwgfu40g6',
              refundP2pkhAddress: 'ST3cmHBZSa5KsDrbgFMmDaj78DhDa9US3J',
              redeemScript:
                '76a820e0531eaf4c51c77afc74a0ae13ebe7b1832c4a1c864abde6ca3e2eb280aa413d876375210398c9a44bed9f59c6041a574602aab0af6a08f3f0fb847fd9a167f7afd71b8d256702e10bb17576a9143f1857b3db895b4d481a46e5a0129cb2b04781c88868ac',
            },
          },
        },
        relativeTimeLock: {
          redeemScript:
            '76a820e0531eaf4c51c77afc74a0ae13ebe7b1832c4a1c864abde6ca3e2eb280aa413d876375210398c9a44bed9f59c6041a574602aab0af6a08f3f0fb847fd9a167f7afd71b8d25670114b27576a9143f1857b3db895b4d481a46e5a0129cb2b04781c88868ac',
          htlc: {
            args: {
              claimerPublicKey:
                '0398c9a44bed9f59c6041a574602aab0af6a08f3f0fb847fd9a167f7afd71b8d25',
              paymentHash:
                'e0531eaf4c51c77afc74a0ae13ebe7b1832c4a1c864abde6ca3e2eb280aa413d',
              refundAddress: 'ST3cmHBZSa5KsDrbgFMmDaj78DhDa9US3J',
              timelock: {
                type: UTXO.LockType.RELATIVE,
                blockBuffer: 20,
              },
            },
            details: {
              network: 'bitcoin',
              subnet: 'simnet',
              claimerPublicKey:
                '0398c9a44bed9f59c6041a574602aab0af6a08f3f0fb847fd9a167f7afd71b8d25',
              paymentHash:
                'e0531eaf4c51c77afc74a0ae13ebe7b1832c4a1c864abde6ca3e2eb280aa413d',
              refundPublicKeyHash: '3f1857b3db895b4d481a46e5a0129cb2b04781c8',
              nSequence: 20,
              p2shOutputScript:
                'a914102db4b60d31c96283b39a7d3c865844b0fdf30387',
              p2shAddress: 'rX3jg8PPqP93MQehGUnZpPxfdXdFNw3pfJ',
              p2shP2wshAddress: 'rdRHR7EJgmZnfaV8SrvZpM54kLLfpgBJrR',
              p2shP2wshOutputScript:
                'a9145611b11f6367e110baefbb71f0d932690680d49b87',
              p2wshAddress:
                'sb1qpwj0n8tpt6s0mfjjy59ml3kvn70tfdgu4uyj76779lu6w9aa2ylsec4gp0',
              p2wshOutputScript:
                '00200ba4f99d615ea0fda652250bbfc6cc9f9eb4b51caf092f6bde2ff9a717bd513f',
              refundP2wpkhAddress: 'sb1q8uv90v7m39d56jq6gmj6qy5uk2cy0qwgfu40g6',
              refundP2pkhAddress: 'ST3cmHBZSa5KsDrbgFMmDaj78DhDa9US3J',
              redeemScript:
                '76a820e0531eaf4c51c77afc74a0ae13ebe7b1832c4a1c864abde6ca3e2eb280aa413d876375210398c9a44bed9f59c6041a574602aab0af6a08f3f0fb847fd9a167f7afd71b8d25670114b27576a9143f1857b3db895b4d481a46e5a0129cb2b04781c88868ac',
            },
          },
        },
      },
      invalid: {
        redeemScript: 'not_a_redeem_script',
      },
    },
    integration: {
      funder: getKeyPairFromMnemonic(
        Network.BITCOIN,
        BitcoinSubnet.SIMNET,
        getTestingMnemonic(),
        0,
      ),
      claimer: getKeyPairFromMnemonic(
        Network.BITCOIN,
        BitcoinSubnet.SIMNET,
        getTestingMnemonic(),
        1,
      ),
      refunder: getKeyPairFromMnemonic(
        Network.BITCOIN,
        BitcoinSubnet.SIMNET,
        getTestingMnemonic(),
        2,
      ),
    },
  },
  ethereum: {
    accounts: [
      '0xf1bbe56399e4d6364ff7afbe6809d9096f9ffe42',
      '0x7456485e92e734b59257fff1cbda22b96de60325',
      '0x4f0655478a6e15d05a73f4353a19bfeadbf77afd',
      '0x7f2eeffb609044b5b1b77ca1cf1ef10d67092aa5',
      '0x2f0ba4c6635f983e57a4edf09655b78efba893b9',
      '0x23bf24cd36806200136b69a0a6e9809f36c5ca0a',
      '0xc4a29a15a1c4f5a9f3b8d861be47d00d1950d307',
      '0x208bec74231c2ba3f8b4f1946a678ebc3e38802f',
      '0x38f4c97e2dccf4e1e22e4acce8fa811480485b92',
      '0xc516633e1f501ad5d813a86df04e90e5eaec0518',
    ],
  },
};

/**
 * Shared configuration
 */
const sharedConfig = {
  random: {
    args: (prefixHex: boolean = false) =>
      generateRandomIdSecretAndHashValues(prefixHex),
  },
  pattern: {
    hex: /^(0x)?[0-9a-fA-F]+$/,
    hex256Bit: /^(0x)?[0-9a-fA-F]{64}$/,
    isoDateTime: /^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/,
  },
};

/**
 * The configuration for the active network
 */
export const config = {
  ...sharedConfig,
  ...networkSpecificConfigs,
};
