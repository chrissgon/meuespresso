"use strict";

import Router from "./router.js";

const port = 3333;

const app = new Router().httpAdapter.lib;

app.listen(port);
