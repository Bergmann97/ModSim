class SingleProductShop extends oBJECT {
  constructor({ id, name, stockQuantity, reorderPoint, targetInventory, reorderInterval, prevStockQuantity}) {
    super( id, name);
    this.stockQuantity = stockQuantity;
    this.prevStockQuantity = prevStockQuantity;
    this.reorderPoint = reorderPoint;  // for continuous review policy
    this.targetInventory = targetInventory;
    this.reorderInterval = reorderInterval;  // for periodic review policy
  }
}
SingleProductShop.labels = {"stockQuantity":"stock"};

