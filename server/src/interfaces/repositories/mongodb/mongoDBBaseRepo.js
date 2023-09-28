"use strict";

export default class MongoDBBaseRepo {
  constructor({ mongodb, collection }) {
    this.mongodb = mongodb;
    this.init({ collection });
  }

  async init({ collection }) {
    try {
      this.db = (await this.mongodb.connect()).collection(collection);
    } catch (e) {
      console.log(e);
      process.exit(1);
    }
  }
}
