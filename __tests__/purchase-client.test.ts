import { TestPurchaseClient } from "../src/purchase-client";
import Util from "../src/util";

const devTestProducts = [{
  sku: "UNITTESTSKU01",
  displayName: "Unit Test SKU 01",
  cost: {
      amount: 1,
      type: "test-cost",
    },
  },
  {
    sku: "UNITTESTSKU02",
    displayName: "Unit Test SKU 02",
    cost: {
     amount: 2,
     type: "test-cost",
    }
  }
];

describe('PurchaseClient', () => {
  describe('DevPurchaseClient', () => {
    beforeEach(() => {
      window.MEDKIT_PURCHASABLE_ITEMS = devTestProducts;
    });

    test('should return an array of products', async () => {
      const client = new TestPurchaseClient();
      
      await expect(client.getProducts()).resolves.toMatchObject(devTestProducts);
    });
  });
});
