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

    const product = Object.create(await this.productRepo.getByID({ productID }));

    if (!product) {
      return false;
    }

    delete product.description;
    product.quantity = quantity;

    const ok = await this.userRepo.addToCart({ userID, product });

    return !!ok;
  }
}
