"use strict";

export default class ExpressAdapter {
  constructor({ express }) {
    this.lib = express;
  }

  post(url, callback) {
    this.lib.post(url, callback);
  }

  listen(port) {
    this.lib.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
}
