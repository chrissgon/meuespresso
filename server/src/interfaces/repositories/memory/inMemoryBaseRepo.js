"use strict";

import * as url from "url";
import { join } from "path";
import { readFile } from "fs/promises";

export default class InMemoryBaseRepo {
  constructor() {
    this.load();
  }

  async load() {
    const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
    const usersDatabasePath = join(__dirname, "./users.json");
    const productsProductsPath = join(__dirname, "./products.json");
    this.users = JSON.parse(await readFile(usersDatabasePath));
    this.products = JSON.parse(await readFile(productsProductsPath));
  }
}
