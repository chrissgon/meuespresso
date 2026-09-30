"use strict";

import { ServiceUnavailableError } from "../../errors.js";

const RETRY_MS = 2000;

export default class MongoDBBaseRepo {
  #collection;

  constructor({ mongodb, collection }) {
    this.mongodb = mongodb;
    this.init({ collection });
  }

  // Keeps trying until MongoDB answers, so the server stays up (and answers
  // 503) while the database is down instead of exiting.
  async init({ collection }) {
    try {
      this.#collection = (await this.mongodb.connect()).collection(collection);
    } catch (e) {
      console.error(
        `MongoDB unavailable (${e.message}); retrying in ${RETRY_MS} ms`
      );
      setTimeout(() => this.init({ collection }), RETRY_MS).unref();
    }
  }

  get db() {
    if (!this.#collection) throw new ServiceUnavailableError();
    return this.#collection;
  }
}
