"use strict";

import Router from "./router.js";

const port = 3000;

new Router().httpAdapter.listen(port);
