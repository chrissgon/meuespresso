"use strict";

import { randomUUID } from "node:crypto";

export default class User {
  constructor(
    userID = randomUUID(),
    name,
    address,
    addressNumber,
    addressComplement,
    email,
    password,
    cart,
    orders
  ) {
    this.userID = userID;
    this.name = name;
    this.address = address;
    this.addressNumber = addressNumber;
    this.addressComplement = addressComplement;
    this.email = email;
    this.password = password;
    this.cart = cart;
    this.orders = orders;
  }
}
