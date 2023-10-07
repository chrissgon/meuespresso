"use strict";

import Router from "./router.js";

const port = 3333;

new Router().httpAdapter.listen(port);
