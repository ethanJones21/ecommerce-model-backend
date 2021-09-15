const { Router } = require("express");

const { getFile } = require("./file.controller");

const router = Router();

router.get("/:model/:img", getFile);

module.exports = router;
