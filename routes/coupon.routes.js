const { Router } = require("express");

const {
    getCouponsByPage,
    getCoupon,
    createCoupon,
    updateCoupon,
    deleteCoupon,
} = require("../controllers/coupon.controller");

const { validateJWT } = require("../middlewares/validate-jwt.middleware");

const router = Router();

router.get("/paginado", validateJWT, getCouponsByPage);
router.get("/:id", validateJWT, getCoupon);

router.post("/", validateJWT, createCoupon);

router.put("/:id", validateJWT, updateCoupon);
router.delete("/:id", validateJWT, deleteCoupon);

module.exports = router;
