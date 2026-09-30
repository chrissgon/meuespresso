"use strict";

import { ServiceUnavailableError } from "../errors.js";

// The database cannot be reached: no connection yet (ours), or the driver
// found no server for an operation (MongoServerSelectionError).
function isUnavailable(err) {
  return (
    err instanceof ServiceUnavailableError ||
    err?.name === "MongoServerSelectionError"
  );
}

// Express 4 does not catch rejected promises from handlers, and an unhandled
// rejection ends the Node process. Every handler answers an error instead.
function handleErrors(callback) {
  return async (req, res) => {
    try {
      await callback(req, res);
    } catch (err) {
      console.error(err);
      if (res.headersSent) return;
      if (isUnavailable(err)) {
        res.status(503).send("service unavailable");
        return;
      }
      res.status(500).send("internal server error");
    }
  };
}

export default class ExpressAdapter {
  constructor({ express }) {
    this.lib = express;
  }

  post(url, callback) {
    this.lib.post(url, handleErrors(callback));
  }

  get(url, callback) {
    this.lib.get(url, handleErrors(callback));
  }

  listen(port) {
    this.lib.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  }
}
