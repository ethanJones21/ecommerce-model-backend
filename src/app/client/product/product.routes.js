const { Router } = require("express");

const {
    getProductsByPage,
    getProduct,
    getProductBySlug,
} = require("./product.controller");

const router = Router();

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

router.get("/paginado", getProductsByPage);
router.get("/:id", validateJWT, getProduct);
router.get("/:slug", getProductBySlug);

module.exports = router;
