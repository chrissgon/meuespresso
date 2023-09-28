"use strict";

import MongoDBBaseRepo from "./mongoDBBaseRepo.js";

export default class MongoDBProductRepo extends MongoDBBaseRepo {
  constructor({ mongodb }) {
    super({ mongodb, collection: "product" });
  }

  getByID({ productID }) {
    return this.db.findOne({ productID });
  }
}
