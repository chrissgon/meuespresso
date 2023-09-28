"use strict";

export default class OrderService {
  constructor({ userRepo, productRepo }) {
    this.userRepo = userRepo;
    this.productRepo = productRepo;
  }

  async buy({
    userID,
    products,
    address,
    addressNumber,
    addressComplement,
    shipping,
    resetCart,
  }) {
    const valid = await this.validate({
      userID,
      products,
      address,
      addressNumber,
      addressComplement,
      shipping,
      resetCart,
    });

    if (valid instanceof Error) throw valid;

    const orders = []

    for (const { productID, quantity } of products) {
      const orderID = await this.userRepo.setOrder({
        userID,
        productID,
        address,
        addressNumber,
        addressComplement,
        quantity,
        shipping,
      });

      if(!orderID) throw new Error("error to set order")

      orders.push(orderID)
    }

    if (resetCart) {
      const ok = await this.userRepo.resetCart({ userID });

      if (!ok) throw new Error("error to reset cart");
    }

    return orders;
  }

  async validate({ userID, products, address, addressNumber, shipping }) {
    if (!userID) {
      return new Error("invalid userID");
    }

    const user = await this.userRepo.getByID({ userID });
    if (!user) {
      return new Error("not found user");
    }

    if (!products.length) {
      return new Error("empty products");
    }
    if (!address) {
      return new Error("invalid address");
    }
    if (!addressNumber) {
      return new Error("invalid address number");
    }

    for (const { quantity } of products) {
      if (typeof quantity !== "number" || quantity <= 0) {
        return new Error("invalid quantity");
      }
    }

    if (typeof shipping !== "number" || shipping < 0) {
      return new Error("invalid shipping");
    }

    return true;
  }
}
