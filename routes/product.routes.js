const { Router } = require("express");

const {
    getProductsByPage,
    getProduct,
    updateProduct,
    deactivateProduct,
    createProduct,
    getProductBySlug,
} = require("../controllers/product.controller");

const router = Router();

const { validateJWT } = require("../middlewares/validate-jwt.middleware");
const multiparty = require("connect-multiparty");
const UPLOAD = multiparty({ uploadDir: "./uploads/products" });

router.get("/paginado", getProductsByPage);
// aqui cambie ya no id/:id sino solo id
router.get("/:id", validateJWT, getProduct);
router.get("/:slug", getProductBySlug);

router.post("/", [validateJWT, UPLOAD], createProduct);

router.put("/:id", [validateJWT, UPLOAD], updateProduct);
router.patch("/:id", validateJWT, deactivateProduct);

module.exports = router;
