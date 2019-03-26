import Web3 from 'web3';
import { ERC20SwapContract, EtherSwapContract } from './contracts';

export namespace EVM {
  export enum AssetType {
    ETHER = 'ether',
    ERC20 = 'erc20',
  }

  interface SharedOptions {
    web3: Web3;
    invoice: string;
    assetType: AssetType;
  }

  export interface EtherOptions extends SharedOptions {
    assetType: AssetType.ETHER;
  }

  export interface ERC20Options extends SharedOptions {
    assetType: AssetType.ERC20;
    tokenContractAddress: string;
  }

  export type Options = EtherOptions | ERC20Options;
}

export type SwapContract<O extends EVM.Options> = O extends EVM.ERC20Options
  ? ERC20SwapContract
  : EtherSwapContract;
