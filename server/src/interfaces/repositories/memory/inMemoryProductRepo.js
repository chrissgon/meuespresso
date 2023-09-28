"use strict";

import InMemoryBaseRepo from "./inMemoryBaseRepo.js";

export default class InMemoryProductRepo extends InMemoryBaseRepo {
  constructor() {
    super();
  }

  getByID({ productID }) {
    if (!this.products) return;
    return this.products.find((product) => product.productID === productID);
  }
}
