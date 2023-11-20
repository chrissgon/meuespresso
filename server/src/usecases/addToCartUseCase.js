"use strict";

import { randomUUID } from "node:crypto";

export default class AddToCartUseCase {
  constructor({ userRepo, productRepo }) {
    this.userRepo = userRepo;
    this.productRepo = productRepo;
  }

  async execute({ userID, productID, quantity }) {
    const exists = await this.userRepo.getProductInCartByProductID({
      userID,
      productID,
    });

    if (exists) return false;

    const entireProduct = await this.productRepo.getByID({ productID });

    if (!entireProduct) {
      return false;
    }

    const cartItem = { ...entireProduct, cartID: randomUUID() };
    delete cartItem.description;
    cartItem.quantity = quantity;

    const ok = await this.userRepo.addToCart({ userID, cartItem });

    return !!ok;
  }
}
