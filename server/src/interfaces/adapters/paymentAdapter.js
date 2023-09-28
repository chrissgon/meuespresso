"use strict";

export default class PaymentAdapter {
  constructor() {}

  async validate() {
    return new Promise((resolve) => setTimeout(resolve(true), 2000));
  }

  async process() {
    return new Promise((resolve) => setTimeout(resolve(true), 5000));
  }
}
