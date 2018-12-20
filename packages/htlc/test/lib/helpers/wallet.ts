import bip39 from 'bip39';
import {
  bip32,
  networks,
  payments,
} from '../../../src/overrides/bitcoinjs-lib';
import { KeyPair, Network, Subnet } from '../../../src/types';

/**
 * Generate a key pair from a mnemonic and an index
 * @param network The network
 * @param subnet The network subnet
 * @param mnemonic The mnemonic used to derive the seed
 * @param index The index used to derive the path
 */
export function getKeyPairFromMnemonic(
  network: Network,
  subnet: Subnet,
  mnemonic: string,
  index: number = 0,
): KeyPair {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error('Invalid Mnemonic');
  }
  const seed = bip39.mnemonicToSeed(mnemonic);
  const networkPayload = networks[subnet];
  const root = bip32.fromSeed(seed, networkPayload);
  const keyPair = root.derivePath(`m/0'/0/${index}`);
  const { publicKey } = keyPair;

  return {
    network,
    subnet,
    index,
    public_key_hash: keyPair.identifier.toString('hex'),
    p2wpkh_address: payments.p2wpkh({
      pubkey: publicKey,
      network: networkPayload,
    }).address,
    p2pkh_address: payments.p2pkh({
      pubkey: publicKey,
      network: networkPayload,
    }).address,
    private_key: keyPair.toWIF(),
    public_key: publicKey.toString('hex'),
    key_pair: keyPair,
  };
}