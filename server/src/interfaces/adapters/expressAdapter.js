"use strict";

export default class ExpressAdapter {
  constructor({ express }) {
    this.lib = express;
  }

  post(url, callback) {
    this.lib.post(url, callback);
  }

  get(url, callback) {
    this.lib.get(url, callback);
  }

  listen(port) {
    this.lib.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
}
