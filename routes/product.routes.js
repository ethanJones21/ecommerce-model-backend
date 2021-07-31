const { Router } = require("express");

const {
    getProductsByPage,
    getProduct,
    updateProduct,
    deactivateProduct,
    createProduct,
} = require("../controllers/product.controller");

const router = Router();

const multiparty = require("connect-multiparty");
const { validateJWT } = require("../middlewares/validate-jwt.middleware");
const UPLOAD = multiparty({ uploadDir: "./uploads/products" });

router.get("/paginado", validateJWT, getProductsByPage);
router.get("/:id", validateJWT, getProduct);

router.post("/", [validateJWT, UPLOAD], createProduct);

router.put("/:id", [validateJWT, UPLOAD], updateProduct);
router.patch("/:id", validateJWT, deactivateProduct);

module.exports = router;
