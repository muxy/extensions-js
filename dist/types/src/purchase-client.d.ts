import { TwitchBitsProduct } from './twitch';
declare global {
    interface Window {
        MEDKIT_PURCHASABLE_ITEMS: Product[];
    }
}
export declare enum PurchaseClientType {
    Dev = 0,
    Server = 1,
    Test = 2,
    Twitch = 3,
    Unknown = 4
}
export declare type TransactionResponse = Record<string, never>;
export interface PurchaseClient {
    getProducts(): Promise<Product[]>;
    purchase(sku: string): void;
    onUserPurchase(callback: (transaction: Transaction, sendToServerPromise: Promise<TransactionResponse>) => void): void;
    onUserPurchaseCanceled(callback: () => void): void;
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
export declare class TwitchPurchaseClient implements PurchaseClient {
    private purchaseCallbacks;
    private cancelationCallbacks;
    private identifier;
    constructor(id: string);
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
    purchase(sku: string): void;
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
    getProducts(): Promise<TwitchBitsProduct[]>;
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
    onUserPurchase(callback: (tx: Transaction, promise: Promise<TransactionResponse>) => void): void;
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
    onUserPurchaseCanceled(callback: () => void): void;
}
export declare class DevPurchaseClient implements PurchaseClient {
    private purchaseCallbacks;
    private identifier;
    constructor(id: string);
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
    purchase(sku: string): Promise<void>;
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
    getProducts(): Promise<Product[]>;
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
    onUserPurchase(callback: (tx: Transaction, promise: Promise<TransactionResponse>) => void): void;
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
    onUserPurchaseCanceled(callback: () => void): void;
}
export declare class TestPurchaseClient implements PurchaseClient {
    private purchaseCallbacks;
    private purchaseCanceledCallbacks;
    private identifier;
    constructor(id: string);
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
    purchase(sku: string): void;
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
    getProducts(): Promise<Product[]>;
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
    onUserPurchase(callback: (tx: Transaction, promise: Promise<TransactionResponse>) => void): void;
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
    onUserPurchaseCanceled(callback: () => void): void;
}
export default function DefaultPurchaseClient(identifier: string): PurchaseClient;
