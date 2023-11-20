"use strict";

export default class BuyUseCase {
  constructor({ userRepo, paymentAdapter }) {
    this.userRepo = userRepo;
    this.paymentAdapter = paymentAdapter;
  }

  async execute({
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
    });

    if (valid instanceof Error) return false;

    // false payment provider
    const invalidPayment = !(await this.paymentAdapter.validate());

    if (invalidPayment) return false;

    const paymentHasAnError = !(await this.paymentAdapter.process());

    if (paymentHasAnError) return false;

    const orders = [];

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

      if (!orderID) return false;

      orders.push(orderID);
    }

    if (resetCart) {
      const ok = await this.userRepo.resetCart({ userID });

      if (!ok) return false;
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
