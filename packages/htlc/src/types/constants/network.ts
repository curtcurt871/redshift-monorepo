import { EvmHtlc, UtxoHtlc } from '../../network-models';
import { KnownKeys, ValueOf } from '../lib';

// tslint:disable:variable-name

/**
 * Bitcoin simnet, testnet, & mainnet
 */
export enum BitcoinSubnet {
  SIMNET = 'simnet',
  TESTNET = 'testnet',
  BITCOIN = 'bitcoin',
}

/**
 * Litecoin testnet & mainnet
 */
export enum LitecoinSubnet {
  LTCTESTNET = 'ltctestnet',
  LITECOIN = 'litecoin',
}

/**
 * Ethereum private chain, testnet, & mainnet
 */
export enum EthereumSubnet {
  GANACHE = 'ganache',
  KOVAN = 'kovan',
  MAINNET = 'mainnet',
}

export enum StellarSubnet {
  ZULUCRYPTO = 'zulucrypto',
  XLMTESTNET = 'xlmtestnet',
  STELLAR = 'stellar',
  CUSTOM = 'custom',
}

/**
 * Supported networks
 */
export enum Network {
  BITCOIN = 'bitcoin',
  LITECOIN = 'litecoin',
  ETHEREUM = 'ethereum',
  STELLAR = 'stellar',
}

/**
 * Supported network subnets
 */
export const Subnet = {
  ...BitcoinSubnet,
  ...LitecoinSubnet,
  ...EthereumSubnet,
  ...StellarSubnet,
};
export type Subnet = ValueOf<Pick<typeof Subnet, KnownKeys<typeof Subnet>>>;