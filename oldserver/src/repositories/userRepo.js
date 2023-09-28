"use strict";

export default class UserRepo {
  constructor({ db }) {
    this.db = db;
  }

  async getByID({ userID }) {
    return this.db.getByID({ userID });
  }

  async login({ email, password }) {
    return this.db.login({ email, password });
  }

  async getProductInCartByProductID({ userID, productID }) {
    return this.db.getProductInCartByProductID({ userID, productID });
  }

  async addToCart({ userID, product }) {
    return this.db.addToCart({ userID, product });
  }

  async removeToCart({ userID, productID }) {
    return this.db.removeToCart({ userID, productID });
  }

  async resetCart({ userID }) {
    return this.db.resetCart({ userID });
  }

  async setOrder({
    userID,
    productID,
    address,
    addressNumber,
    addressComplement,
    quantity,
    shipping,
  }) {
    return this.db.setOrder({
      userID,
      productID,
      address,
      addressNumber,
      addressComplement,
      quantity,
      shipping,
    });
  }
}
