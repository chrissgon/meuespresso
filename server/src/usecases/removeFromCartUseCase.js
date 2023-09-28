"use strict";

export default class RemoveFromCartUseCase {
  constructor({ userRepo }) {
    this.userRepo = userRepo;
  }

  async execute({ userID, productID }) {
    const notExists = !(await this.userRepo.getProductInCartByProductID({
      userID,
      productID,
    }));

    if (notExists) return false;

    const ok = await this.userRepo.removeFromCart({ userID, productID });

    return !!ok;
  }
}
