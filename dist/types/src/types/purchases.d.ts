export declare enum PurchaseClientType {
    Dev = 0,
    Server = 1,
    Test = 2,
    Twitch = 3,
    Unknown = 4
}
export declare type TransactionResponse = Record<string, never>;
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
export interface PurchaseClient {
    getProducts(): Promise<Product[]>;
    purchase(sku: string): void;
    onUserPurchase(callback: (transaction: Transaction, sendToServerPromise: Promise<TransactionResponse>) => void): void;
    onUserPurchaseCanceled(callback: () => void): void;
}
