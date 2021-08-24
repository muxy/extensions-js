import { MuxySDK } from ".";
import { CurrentEnvironment, forceType } from './util';
import Config from './config';

import { TwitchBitsProduct, TwitchBitsTransaction } from './twitch';

export enum TransactionType {
  Twitch,
  Server,
  Unknown
}

export interface PurchaseClient {
  sdk: MuxySDK;

  getProducts(): Promise<Product[]>;
  purchase(identifier: string): void;
  onUserPurchase(callback: <T>(data: T) => void): void;
}

export interface Cost {
  amount: number;
  type: string;
}

export interface Product {
  sku: string;
  displayName: string;
  cost: Cost;
}

// TwitchTransactions implements the basic 'transaction' interface.
// This is used by SDK to provide low-level access to twitch bits transactions.
class TwitchPurchase implements PurchaseClient {
  public sdk: MuxySDK

  public constructor(clientSDK: MuxySDK) {
    this.sdk = clientSDK;
  }

  /**
   * purchase will start the twitch bits transaction.
   *
   * @since 2.4.0
   *
   * @throws {SDKError} Will throw an error if the MuxySDK didn't load.
   * 
   * @param identifier the twitch sku of the item to be purchased.
   *
   * @example
   * client.purchase("XXSKU000");
   */
  public purchase(identifier: string) {
    if (!window.Twitch.ext.bits) {
      throw new Error('sdk.loaded() was not complete. Please call this method only after the promise has resolved.');
    }

    window.Twitch?.ext?.bits.useBits(identifier);
  }
 
  /**
   * Returns a list of Twitch Bits Products for the current channel.
   *
   * @since 2.4.0
   *
   * @return {Promise<[]TwitchBitsProduct>} Resolves with a list of {@link TwitchBitsProduct}
   * objects for each available sku.
   *
   * @example
   * const products = client.getProducts();
   */
  public getProducts(): Promise<TwitchBitsProduct[]> {
    const target = window.Twitch?.ext?.bits;
    if (target) {
      return target.getProducts();
    }
  
    return Promise.resolve([]);
  } 

  /**
   * onUserPurchase is the interface for adding a post transaction callback.
   *
   * @since 2.4.0
   *
   * @param callback a function(body)
   *
   * @example
   * client.onUserPurchase(() => {
   *  console.log("Transaction finished!");
   * });
   */
  public onUserPurchase(callback): void {
    window.Twitch.ext.bits.onTransactionComplete(
      (tx: TwitchBitsTransaction) => {
        if (tx.initiator.toLowerCase() === "current_user") {
          this.sdk.signedRequest("POST", "bits/transactions", JSON.stringify(tx));
          callback(tx);
        }
      }
    );
  }
}

export default function DefaultTransactions(sdk: MuxySDK): PurchaseClient {
  const type = Config.DefaultTransactionType(CurrentEnvironment());
  switch (type) {
    case TransactionType.Twitch:
      return new TwitchPurchase(sdk);
    default:
      throw new Error('Could not determine proper transaction type for environment.');
  }
}
