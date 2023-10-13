"use strict";

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

    const product = { ...entireProduct };
    delete product.description;
    product.quantity = quantity;

    const ok = await this.userRepo.addToCart({ userID, product });

    return !!ok;
  }
}
