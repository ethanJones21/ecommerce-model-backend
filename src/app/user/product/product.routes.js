const { Router } = require("express");

const {
    getProductsByPage,
    getProduct,
    updateProduct,
    deactivateProduct,
    createProduct,
} = require("./product.controller");

const router = Router();

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");
const { validateUSER } = require("../../../shared/middlewares/role.middleware");
const multiparty = require("connect-multiparty");
const UPLOAD = multiparty({ uploadDir: "../../../uploads/products" });

router.get("/paginado", [validateJWT, validateUSER], getProductsByPage);
router.get("/:id", [validateJWT, validateUSER], getProduct);

router.post("/", [validateJWT, validateUSER, UPLOAD], createProduct);

router.put("/:id", [validateJWT, validateUSER, UPLOAD], updateProduct);
router.patch("/:id", [validateJWT, validateUSER], deactivateProduct);

module.exports = router;
