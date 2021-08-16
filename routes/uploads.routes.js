const { Router } = require("express");

const { getFile } = require("../controllers/uploads.controller");

const router = Router();

router.get("/:model/:img", getFile);

module.exports = router;
