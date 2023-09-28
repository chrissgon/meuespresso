"use strict";

export default class PaymentAdapter {
  constructor() {}

  async validate() {
    return new Promise((resolve) => setTimeout(resolve(true), 2000));
  }

  async new() {
    return new Promise((resolve) => setTimeout(resolve(true), 5000));
  }
}
