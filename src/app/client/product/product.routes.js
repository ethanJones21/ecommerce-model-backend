const { Router } = require("express");

const { getProductsByPage, getProductBySlug } = require("./product.controller");

const router = Router();

router.get("/paginado", getProductsByPage);
router.get("/:slug", getProductBySlug);

module.exports = router;
