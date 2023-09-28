"use strict";

export default class ProductRepo {
  constructor({ db }) {
    this.db = db;
  }

  getByID({ productID }) {
    return this.db.getByID({ productID });
  }
}
