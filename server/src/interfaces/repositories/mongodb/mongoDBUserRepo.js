"use strict";

import MongoDBBaseRepo from "./mongoDBBaseRepo.js";
import MongoDBProductRepo from "./mongoDBProductRepo.js";
import { randomUUID } from "node:crypto";

export default class MongoDBUserRepo extends MongoDBBaseRepo {
  constructor({ mongodb }) {
    super({ mongodb, collection: "users" });
    this.mongoDBProductRepo = new MongoDBProductRepo({ mongodb });
  }

  login({ email, password }) {
    return this.db.findOne({ email, password }, { projection: { _id: 0 } });
  }

  getByID({ userID }) {
    return this.db.findOne({ userID }, { projection: { _id: 0 } });
  }

  async updateByID({
    userID,
    address,
    addressNumber,
    addressComplement,
    password,
  }) {
    await this.db.updateOne(
      { userID },
      {
        $set: {
          address,
          addressNumber,
          addressComplement,
          password,
        },
      }
    );

    return this.getByID({ userID });
  }

  async getProductInCartByProductID({ userID, productID }) {
    return this.db.findOne({
      userID,
      "cart.productID": productID,
    });
  }

  async addToCart({ userID, cartItem }) {
    const { modifiedCount } = await this.db.updateOne(
      { userID },
      { $push: { cart: cartItem } },
      { upsert: true }
    );

    return !!modifiedCount;
  }

  async removeFromCart({ userID, productID }) {
    const { modifiedCount } = await this.db.updateOne(
      { userID },
      { $pull: { cart: { productID } } }
    );
    return !!modifiedCount;
  }

  async resetCart({ userID }) {
    const { modifiedCount } = await this.db.updateOne(
      { userID },
      { $set: { cart: [] } }
    );
    return !!modifiedCount;
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
    const { name, price, image } = await this.mongoDBProductRepo.getByID({
      productID,
    });

    const orderID = randomUUID();

    const orderItem = {
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
    };

    const { modifiedCount } = await this.db.updateOne(
      { userID },
      { $push: { orders: orderItem } },
      { upsert: true }
    );

    return !!modifiedCount ? orderID : null;
  }
}
