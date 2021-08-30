import { MuxySDK } from ".";
import { CurrentEnvironment } from './util';
import Config from './config';

import { TwitchBitsProduct, TwitchBitsTransaction } from './twitch';

// Muxy dev variable
declare global {
  interface Window {
    MEDKIT_PURCHASABLE_ITEMS: Product[];
  }
}

export enum PurchaseClientType {
  Dev,
  Server,
  Twitch,
  Unknown
}

export interface PurchaseClient {
  getProducts(): Promise<Product[]>;
  purchase(identifier: string): void;
  onUserPurchase(callback: (transaction: Transaction) => void): void;
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

export interface Transaction {
  transactionId: string;
  product: Product;
  userId: string;
  displayName: string;
  initiator: any;
  transactionReceipt: string;
}

// TwitchPurchaseClient implements the basic 'purchase client' interface.
// This is used by SDK to provide low-level access to twitch bits transactions.
class TwitchPurchaseClient implements PurchaseClient {
  /**
   * purchase will start the twitch bits transaction.
   *
   * @since 2.4.0
   *
   * @throws {TwitchHelperError} Will throw an error if the Twitch Helper didn't load.
   * 
   * @param sku the twitch sku of the item to be purchased.
   *
   * @example
   * client.purchase("XXSKU000");
   */
  public purchase(sku: string) {
    if (!window.Twitch?.ext?.bits) {
      throw new Error('Twitch helper was not loaded.');
    }

    window.Twitch.ext.bits.useBits(sku);
  }
 
  /**
   * Returns a list of Twitch Bits Products for the current channel.
   * 
   * @async
   * @since 2.4.0
   * 
   * @throws {TwitchHelperError} Will throw an error if the Twitch Helper didn't load.
   *
   * @return {Promise<[]TwitchBitsProduct>} Resolves with an array of {@link TwitchBitsProduct}
   * objects for each available sku.
   *
   * @example
   * const products = client.getProducts();
   */
  public getProducts(): Promise<TwitchBitsProduct[]> {
    if (!window.Twitch?.ext?.bits) {
      throw new Error('Twitch helper was not loaded.');
    }
    
    return window.Twitch.ext.bits.getProducts();
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
  public onUserPurchase(callback: (tx: Transaction) => void): void {
    window.Twitch.ext.bits.onTransactionComplete(
      (tx: TwitchBitsTransaction) => {
        if (tx.initiator.toLowerCase() === "current_user") {
          callback(tx);
        }
      }
    );
  }
}

// DevPurchaseClient implements the basic 'purchase client' interface.
// This is used by SDK to provide low-level access to stubbed transactions.
class DevPurchaseClient implements PurchaseClient {
  /**
   * purchase will start the Dev purchase transaction.
   *
   * @since 2.4.0
   *
   * @throws {SDKError} Will throw an error if the MuxySDK didn't load.
   * 
   * @param sku the sku of the item to be purchased.
   *
   * @example
   * client.purchase("TESTSKU00");
   */
  private purchaseCallbacks = [];

  public purchase(sku: string) {
    if ("MEDKIT_PURCHASABLE_ITEMS" in window) {
      const devItems = this.getProducts();

      const products = Object.keys(devItems).map((sku) => devItems[sku]);
      const foundItem = products.find((sku: string) => sku === sku);

      setTimeout(() => {
        if (foundItem) {
          this.purchaseCallbacks.forEach(function(callback){
            callback(foundItem);
          });
        }
      }, 3000);
    }
  }
 
  /**
   * Returns a list of dev supplied Products.
   * 
   * @async
   * @since 2.4.0
   *
   * @return {<[]Product>} Returns an array of {@link Product}
   * objects for each available sku.
   *
   * @example
   * window.MEDKIT_PURCHASABLE_ITEMS = [{
   *   sku: "TESTSKU01",
   *   displayName: "Test SKU 01",
   *   cost: {
   *       amount: 1,
   *       type: "test-cost",
   *     },
   *   },
   *   {
   *     sku: "TESTSKU02",
   *     displayName: "Test SKU 02",
   *     cost: {
   *      amount: 2,
   *      type: "test-cost",
   *   }
   * ];
   *
   * const products = client.getProducts();
   */
  public getProducts(): Promise<Product[]> {
    if ("MEDKIT_PURCHASABLE_ITEMS" in window) {
      return Promise.resolve(window.MEDKIT_PURCHASABLE_ITEMS);
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
  public onUserPurchase(callback: (tx: Transaction) => void): void {
    this.purchaseCallbacks.push(callback);
  }
}

export default function DefaultPurchaseClient(): PurchaseClient {
  const type = Config.DefaultPurchaseClientType(CurrentEnvironment());
  switch (type) {
    case PurchaseClientType.Dev:
      return new DevPurchaseClient();
    case PurchaseClientType.Twitch:
      return new TwitchPurchaseClient();
    default:
      throw new Error('Could not determine proper transaction type for environment.');
  }
}
