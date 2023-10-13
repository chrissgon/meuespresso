"use strict";

import { randomUUID } from "node:crypto";
import InMemoryBaseRepo from "./inMemoryBaseRepo.js";
import InMemoryProductRepo from "./inMemoryProductRepo.js";

export default class InMemoryUserRepo extends InMemoryBaseRepo {
  constructor() {
    super();
    this.inMemoryProductRepo = new InMemoryProductRepo();
  }

  login({ email, password }) {
    if (!this.users) return;

    return this.users.find((user) => {
      return user.email === email && user.password === password;
    });
  }

  getByID({ userID }) {
    if (!this.users) return;

    return this.users.find((user) => user.userID === userID);
  }

  updateByID({ userID, address, addressNumber, addressComplement, password }) {
    if (!this.users) return;

    const index = this.users.findIndex((user) => user.userID === userID);

    if (index === -1) return;

    this.users[index] = {
      ...this.users[index],
      address,
      addressNumber,
      addressComplement,
      password,
    };

    return this.users[index];
  }

  getProductInCartByProductID({ userID, productID }) {
    if (!this.users) return;

    const user = this.getByID({ userID });

    if (!user) return;

    const product = user.cart.find((item) => item.productID === productID);

    return product;
  }

  addToCart({ userID, product }) {
    if (!this.users) return;

    const user = this.getByID({ userID });

    if (!user) return;

    user.cart.push(product);

    return true;
  }

  removeFromCart({ userID, productID }) {
    if (!this.users) return;

    const user = this.getByID({ userID });

    if (!user) return;

    const index = user.cart.findIndex(
      (product) => product.productID === productID
    );

    if (index === -1) return;

    user.cart.splice(index, 1);

    return true;
  }

  resetCart({ userID }) {
    const index = this.users.findIndex((user) => user.userID === userID);

    if (index === -1) return;

    this.users[index].cart.length = 0;

    return true;
  }

  setOrder({
    userID,
    productID,
    address,
    addressNumber,
    addressComplement,
    quantity,
    shipping,
  }) {
    const index = this.users.findIndex((user) => user.userID === userID);

    if (index === -1) return;

    const product = this.inMemoryProductRepo.getByID({ productID });

    if (!product) return;

    const { name, price, image } = product;

    const orderID = randomUUID();

    this.users[index].orders.push({
      orderID,
      productID,
      name,
      price,
      quantity,
      image,
      address,
      addressNumber,
      addressComplement,
      shipping,
      createdAt: new Date().toISOString(),
    });

    return orderID;
  }
}
