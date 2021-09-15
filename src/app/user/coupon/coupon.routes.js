const { Router } = require("express");

const {
    getCouponsByPage,
    getCoupon,
    createCoupon,
    updateCoupon,
    deleteCoupon,
} = require("./coupon.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const { validateUSER } = require("../../../shared/middlewares/role.middleware");

const router = Router();

router.get("/paginado", [validateJWT, validateUSER], getCouponsByPage);
router.get("/:id", [validateJWT, validateUSER], getCoupon);

router.post("/", [validateJWT, validateUSER], createCoupon);

router.put("/:id", [validateJWT, validateUSER], updateCoupon);
router.delete("/:id", [validateJWT, validateUSER], deleteCoupon);

module.exports = router;
