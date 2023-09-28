"use strict";

import BaseRepoLocalDB from "./baseRepoLocalDB.js";

export default class ProductRepoLocalDB extends BaseRepoLocalDB {
  constructor() {
    super();
  }

  getByID({ productID }) {
    if (!this.products) return;
    return this.products.find((product) => product.productID === productID);
  }
}
