import { Market, OffChainTicker, OnChainTicker } from '.';
import { Network, Subnet, UserSwapState } from './constants';

//#region User

export interface TakerQuoteRequest {
  market: Market;
  invoice: string;
  refundAddress?: string;
}

export interface StateUpdateRequest {
  invoiceHash: string;
}

export type MarketsResponse = {
  onchainTicker: OnChainTicker;
  offchainTicker: OffChainTicker;
  market: Market;
}[];

export interface OrderResponse {
  network: Network;
  subnet: Subnet;
  createdAt: string;
  state: UserSwapState;
  swapAddress: string;
  amount: string;
  amountPaid: string;
  paymentHash: string;
}

//#endregion

//#region Liquidity Provider

export interface AuthenticationRequest {
  apiKey: string;
  secretKey: string;
}

export type QuoteSubscriptionRequest = Market[];

export interface UtxoDetails {
  redeemScript: string;
  payToAddress: string;
}

export interface EvmUnsignedTx {
  to: string;
  data: string;
  value?: string | number;
}

export interface PartialEvmTxParams {
  nonce?: string | number;
  from?: string;
  gas?: string | number;
  gasPrice?: string | number;
}

export interface EvmDetails {
  unsignedFundingTx: EvmUnsignedTx;
}

export interface MakerQuoteRequest {
  market: Market;
  details: UtxoDetails | EvmDetails;
  id: string; // The socket id that was passed to the maker in the quote request
}

//#endregion
