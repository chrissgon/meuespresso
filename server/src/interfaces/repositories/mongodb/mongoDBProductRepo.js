"use strict";

import MongoDBBaseRepo from "./mongoDBBaseRepo.js";

export default class MongoDBProductRepo extends MongoDBBaseRepo {
  constructor({ mongodb }) {
    super({ mongodb, collection: "product" });
  }

  login({ email, password }) {
    return this.db.findOne({ email, password });
  }

  getByID({ userID }) {
    return this.db.findOne({ userID });
  }
}
