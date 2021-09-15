const { Router } = require("express");

const {
    getGalery,
    updateGalery,
    deleteImgOfGalery,
} = require("./galery.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const { validateUSER } = require("../../../shared/middlewares/role.middleware");

const multiparty = require("connect-multiparty");
const UPLOAD = multiparty({ uploadDir: "../../../uploads/products" });

const router = Router();

router.get("/:productID", [validateJWT, validateUSER], getGalery);

router.put("/:productID", [validateJWT, validateUSER, UPLOAD], updateGalery);
router.delete(
    "/:productID/:galeryID",
    [validateJWT, validateUSER, UPLOAD],
    deleteImgOfGalery
);

module.exports = router;
