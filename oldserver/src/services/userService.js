"use strict";

export default class UserService {
  constructor({ userRepo, productRepo, orderService }) {
    this.userRepo = userRepo;
    this.productRepo = productRepo;
    this.orderService = orderService;
  }

  async login({ email, password }) {
    const user = await this.userRepo.login({ email, password });
    if (!user) throw new Error("invalid credentials");
    return user;
  }

  async addToCart({ userID, productID, quantity }) {
    if (await this.productExistInCart({ userID, productID })) {
      throw new Error("product already exists");
    }

    const product = await this.productRepo.getByID({ productID });

    delete product.description;
    product.quantity = quantity;

    const ok = await this.userRepo.addToCart({ userID, product });

    if (!ok) throw new Error("error to add");

    return true;
  }

  async removeToCart({ userID, productID }) {
    if (!(await this.productExistInCart({ userID, productID }))) {
      throw new Error("product not exists");
    }

    const ok = await this.userRepo.removeToCart({ userID, productID });

    if (!ok) throw new Error("error to remove");

    return true;
  }

  async productExistInCart({ userID, productID }) {
    const item = await this.userRepo.getProductInCartByProductID({
      userID,
      productID,
    });
    return !!item;
  }
}
