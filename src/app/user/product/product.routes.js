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
const {
    validateUSER_or_ADMIN,
} = require("../../../shared/middlewares/role.middleware");
const multiparty = require("connect-multiparty");
const UPLOAD = multiparty({ uploadDir: "../../../uploads/products" });

router.get(
    "/paginado",
    [validateJWT, validateUSER_or_ADMIN],
    getProductsByPage
);
router.get("/:id", [validateJWT, validateUSER_or_ADMIN], getProduct);

router.post("/", [validateJWT, validateUSER_or_ADMIN, UPLOAD], createProduct);

router.put("/:id", [validateJWT, validateUSER_or_ADMIN, UPLOAD], updateProduct);
router.patch("/:id", [validateJWT, validateUSER_or_ADMIN], deactivateProduct);

module.exports = router;
