"use strict";

import { randomUUID } from "node:crypto";
import BaseRepoLocalDB from "./baseRepoLocalDB.js";

export default class UserRepoLocalDB extends BaseRepoLocalDB {
  constructor({ productRepoLocalDB }) {
    super();
    this.productRepoLocalDB = productRepoLocalDB;
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

  removeToCart({ userID, productID }) {
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

    this.users[index].length = 0;

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
    
    const product = this.productRepoLocalDB.getByID({
        productID,
    });

    if (!product) return;

    const { name, price, image } = product

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
