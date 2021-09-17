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

const {
    validateUSER_or_ADMIN,
} = require("../../../shared/middlewares/role.middleware");

const router = Router();

router.get("/paginado", [validateJWT, validateUSER_or_ADMIN], getCouponsByPage);
router.get("/:id", [validateJWT, validateUSER_or_ADMIN], getCoupon);

router.post("/", [validateJWT, validateUSER_or_ADMIN], createCoupon);

router.put("/:id", [validateJWT, validateUSER_or_ADMIN], updateCoupon);
router.delete("/:id", [validateJWT, validateUSER_or_ADMIN], deleteCoupon);

module.exports = router;
