const { Router } = require("express");

const {
    getGalery,
    updateGalery,
    deleteImgOfGalery,
} = require("../controllers/galery.controller");

const { validateJWT } = require("../middlewares/validate-jwt.middleware");
const multiparty = require("connect-multiparty");
const UPLOAD = multiparty({ uploadDir: "./uploads/products" });

const router = Router();

router.get("/:productID", validateJWT, getGalery);

router.put("/:productID", [validateJWT, UPLOAD], updateGalery);
router.delete(
    "/:productID/:galeryID",
    [validateJWT, UPLOAD],
    deleteImgOfGalery
);

module.exports = router;
