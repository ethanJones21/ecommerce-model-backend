const { Router } = require("express");

const {
    getGalery,
    updateGalery,
    deleteImgOfGalery,
} = require("./galery.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const {
    validateUSER_or_ADMIN,
} = require("../../../shared/middlewares/role.middleware");

const multiparty = require("connect-multiparty");
const UPLOAD = multiparty({ uploadDir: "../../../uploads/products" });

const router = Router();

router.get("/:productID", [validateJWT, validateUSER_or_ADMIN], getGalery);

router.put(
    "/:productID",
    [validateJWT, validateUSER_or_ADMIN, UPLOAD],
    updateGalery
);
router.delete(
    "/:productID/:galeryID",
    [validateJWT, validateUSER_or_ADMIN, UPLOAD],
    deleteImgOfGalery
);

module.exports = router;
