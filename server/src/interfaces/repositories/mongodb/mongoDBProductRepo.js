"use strict";

import MongoDBBaseRepo from "./mongoDBBaseRepo.js";

export default class MongoDBProductRepo extends MongoDBBaseRepo {
  constructor({ mongodb }) {
    super({ mongodb, collection: "products" });
  }

  getByID({ productID }) {
    return this.db.findOne({ productID }, { projection: { _id: 0 } });
  }

  getAll() {
    return this.db.find({}, { projection: { _id: 0 } }).toArray();
  }

  getByFilters({ name }) {
    return this.db
      .find(
        { name: new RegExp(name.toUpperCase(), "i") },
        { projection: { _id: 0 } }
      )
      .toArray();
  }
}
