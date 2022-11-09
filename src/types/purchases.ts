export enum PurchaseClientType {
  Dev,
  Server,
  Test,
  Twitch,
  Unknown
}

export type TransactionResponse = Record<string, never>;

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
