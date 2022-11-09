import { CurrentEnvironment } from './util';
import Config from './config';

import { TwitchBitsProduct, TwitchBitsTransaction } from './twitch';
import mxy from './muxy';
import Ext from './twitch-ext';

import { PurchaseClientType, TransactionResponse } from './types/purchases';
import type { Product, PurchaseClient, Transaction } from './types/purchases';

// Muxy dev variable
declare global {
  interface Window {
    MEDKIT_PURCHASABLE_ITEMS: Product[];
  }
}

// TwitchPurchaseClient implements the basic 'purchase client' interface.
// This is used by SDK to provide low-level access to twitch bits transactions.
export class TwitchPurchaseClient implements PurchaseClient {
  private purchaseCallbacks: Array<(tx: Transaction, promise: Promise<TransactionResponse>) => void> = [];
  private cancelationCallbacks: Array<() => void> = [];
  private identifier: string = '';

  constructor(id: string) {
    if (!window?.Twitch?.ext?.bits) {
      throw new Error('Twitch helper is required for bits transactions not loaded.');
    }

    this.identifier = id;

    // Twitch only allows one handler for complete/cancel
    window.Twitch.ext.bits.onTransactionComplete((tx: TwitchBitsTransaction) => {
      if (tx.initiator.toLowerCase() === 'current_user') {
        let promise: Promise<TransactionResponse> = Promise.resolve<TransactionResponse>({});
        if (mxy.transactionsEnabled) {
          promise = mxy.client.sendTransactionToServer(this.identifier, tx) as Promise<TransactionResponse>;
        }

        this.purchaseCallbacks.forEach(cb => cb(tx, promise));
      }
    });

    window.Twitch.ext.bits.onTransactionCancelled(() => {
      this.cancelationCallbacks.forEach(cb => cb());
    });
  }

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
    return window.Twitch.ext.bits.getProducts();
  }

  /**
   * onUserPurchase is the interface for adding a post transaction callback.
   *
   * @since 2.4.0
   *
   * @throws {TwitchHelperError} Will throw an error if the Twitch Helper didn't load.
   *
   * @param callback a function(body)
   *
   * @example
   * client.onUserPurchase(() => {
   *  console.log("Transaction finished!");
   * });
   */
  public onUserPurchase(callback: (tx: Transaction, promise: Promise<TransactionResponse>) => void): void {
    this.purchaseCallbacks.push(callback);
  }

  /**
   * onUserPurchaseCancelled is the interface for adding a post transaction failure callback.
   *
   * @since 2.4.5
   *
   * @throws {TwitchHelperError} Will throw an error if the Twitch Helper didn't load.
   *
   * @param callback a function(body)
   *
   * @example
   * client.onUserPurchaseCanceled(() => {
   *  console.log("Transaction cancelled!");
   * });
   */
  public onUserPurchaseCanceled(callback: () => void): void {
    this.cancelationCallbacks.push(callback);
  }
}

// DevPurchaseClient implements the basic 'purchase client' interface.
// This is used by SDK to provide low-level access to stubbed transactions.
export class DevPurchaseClient implements PurchaseClient {
  private purchaseCallbacks: Array<(tx: Transaction, promise: Promise<TransactionResponse>) => void> = [];
  private identifier: string = '';

  public constructor(id: string) {
    this.identifier = id;
  }

  /**
   * purchase will start the Dev purchase transaction.
   *
   * @since 2.4.0
   *
   * @param sku the sku of the item to be purchased.
   *
   * @example
   * client.purchase("TESTSKU00");
   */
  public async purchase(sku: string) {
    if ('MEDKIT_PURCHASABLE_ITEMS' in window) {
      const products = await this.getProducts();
      const item = products.find((p: Product) => p.sku === sku);

      const testDate = new Date();

      const [date, time] = testDate.toISOString().split(/T|Z/);
      const golangDate = `${date} ${time} +0000 UTC`;

      const jwtHeader = {
        alg: 'HS256',
        typ: 'JWT'
      };

      const jwtPayload = {
        topic: 'bits_transaction_receipt',
        exp: Math.round((testDate.getTime() + 10000) / 1000),
        data: {
          transactionId: `test:${testDate.getTime()}`,
          time: golangDate,
          userId: mxy.user.twitchID,
          product: {
            domainId: `twitch.ext.${Ext.extensionID}`,
            sku: item.sku,
            displayName: item.displayName,
            cost: {
              amount: item.cost.amount,
              type: item.cost.type
            }
          }
        }
      };

      const encodedHeader = btoa(JSON.stringify(jwtHeader));
      const encodedPayload = btoa(JSON.stringify(jwtPayload));

      // End of signature intentionally doesn't match.
      const testEncodedJWT = `${encodedHeader}.${encodedPayload}.DK02m0j0HQMKsPeFIrAuVdFh5X8f0hknjEKHAjGt6B0`;

      setTimeout(() => {
        if (item) {
          const tx: Transaction = {
            transactionId: `test:${testDate.getTime()}`,
            product: item,
            userId: mxy.user.twitchID,
            displayName: 'DevTestUser',
            initiator: 'current_user',
            transactionReceipt: testEncodedJWT
          };

          let promise: Promise<TransactionResponse> = Promise.resolve<TransactionResponse>({});
          if (mxy.transactionsEnabled) {
            promise = mxy.client.sendTransactionToServer(this.identifier, tx) as Promise<TransactionResponse>;
          }

          this.purchaseCallbacks.forEach(cb => cb(tx, promise));
        } else {
          throw new Error(`Product with SKU "${sku}" not found in product list.`);
        }
      }, 3000);
    } else {
      throw new Error('No development products set. Use "window.MEDKIT_PURCHASABLE_ITEMS" to set debugging products.');
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
   * const products = await client.getProducts();
   */
  public getProducts(): Promise<Product[]> {
    return Promise.resolve(window.MEDKIT_PURCHASABLE_ITEMS || []);
  }

  /**
   * onUserPurchase is the interface for adding a post transaction callback.
   *
   * @since 2.4.0
   *
   * @param callback a function(body)
   *
   * @example
   * client.onUserPurchase((transaction) => {
   *  console.log("Transaction finished!");
   * });
   */
  public onUserPurchase(callback: (tx: Transaction, promise: Promise<TransactionResponse>) => void): void {
    this.purchaseCallbacks.push(callback);
  }

  /**
   * onUserPurchaseCanceled is the interface for adding a post transaction failure callback.
   *
   * @since 2.4.5
   *
   * @param callback a function(body)
   *
   * @example
   * client.onUserPurchaseCanceled(() => {
   *  console.log("User cancelled transaction!");
   * });
   */
  public onUserPurchaseCanceled(callback: () => void): void {
    // Transactions always succeed on dev, so this will never be called.
  }
}

// TestPurchaseClient implements the basic 'purchase client' interface.
// This is used by the test of the SDK to provide low-level access to stubbed transactions.
export class TestPurchaseClient implements PurchaseClient {
  private purchaseCallbacks: Array<(tx: Transaction, promise: Promise<TransactionResponse>) => void> = [];
  private purchaseCanceledCallbacks: Array<(tx: Transaction) => void> = [];
  private identifier: string = '';

  public constructor(id: string) {
    this.identifier = id;
  }
  /**
   * purchase will start the Test purchase transaction.
   *
   * @since 2.4.0
   *
   * @param sku the sku of the test item to be purchased.
   *
   * @example
   * client.purchase("TESTSKU00");
   */
  public purchase(sku: string) {
    if ('MEDKIT_PURCHASABLE_ITEMS' in window) {
      const devItems = this.getProducts();

      const products = Object.keys(devItems).map(sku => devItems[sku]);
      const foundItem = products.find((sku: string) => sku === sku);

      setTimeout(() => {
        if (foundItem) {
          const tx: Transaction = {
            transactionId: 'dev-transaction-id',
            product: foundItem,
            userId: 'dev-test-user',
            displayName: 'DevTestUser',
            initiator: 'current_user',
            transactionReceipt: 'transaction-receipt'
          };

          let promise: Promise<TransactionResponse> = Promise.resolve<TransactionResponse>({});
          if (mxy.transactionsEnabled) {
            promise = mxy.client.sendTransactionToServer(this.identifier, tx) as Promise<TransactionResponse>;
          }

          this.purchaseCallbacks.forEach(callback => {
            callback(tx, promise);
          });
        } else {
          throw new Error(`Product with SKU ${sku} not found in product list.`);
        }
      }, 3000);
    } else {
      throw new Error('No development products set. Use "window.MEDKIT_PURCHASABLE_ITEMS" to set debugging products.');
    }
  }

  /**
   * Returns a list of test supplied Products.
   *
   * @async
   * @since 2.4.0
   *
   * @return {<[]Product>} Returns an array of test {@link Product}
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
   * const products = await client.getProducts();
   */
  public getProducts(): Promise<Product[]> {
    return Promise.resolve(window.MEDKIT_PURCHASABLE_ITEMS || []);
  }

  /**
   * onUserPurchase is the interface for testing adding a post transaction callback.
   *
   * @since 2.4.0
   *
   * @param callback a function(body)
   *
   * @example
   * client.onUserPurchase((transaction) => {
   *  console.log("Transaction finished!");
   * });
   */
  public onUserPurchase(callback: (tx: Transaction, promise: Promise<TransactionResponse>) => void): void {
    this.purchaseCallbacks.push(callback);
  }

  /**
   * onUserPurchaseCancelled is the interface for adding a post transaction failure callback.
   *
   * @since 2.4.5
   *
   * @param callback a function(body)
   *
   * @example
   * client.onUserPurchaseCanceled(() => {
   *  console.log("User cancelled transaction!");
   * });
   */
  public onUserPurchaseCanceled(callback: () => void): void {
    this.purchaseCanceledCallbacks.push(callback);
  }
}

export default function DefaultPurchaseClient(identifier: string): PurchaseClient {
  const type = Config.DefaultPurchaseClientType(CurrentEnvironment());
  switch (type) {
    case PurchaseClientType.Dev:
      return new DevPurchaseClient(identifier);
    case PurchaseClientType.Test:
      return new TestPurchaseClient(identifier);
    case PurchaseClientType.Twitch:
      return new TwitchPurchaseClient(identifier);
    default:
      throw new Error('Could not determine proper transaction type for environment.');
  }
}
