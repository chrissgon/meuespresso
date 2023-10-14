"use strict";

import https from "https";
import fs from "fs";
import Router from "./router.js";

const port = 3333;

const app = new Router().httpAdapter.lib;

https
  .createServer(
    {
      key: fs.readFileSync("config/aws.pem"),
      cert: fs.readFileSync("config/cert.pem"),
    },
    app
  )
  .listen(port);
