const { Router } = require("express");

const {
    totalSales,
    totalSalesByMonth,
    graphSaleXMonth,
} = require("./home.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const {
    validateADMIN,
} = require("../../../shared/middlewares/role.middleware");

const router = Router();

router.get("/total", [validateJWT, validateADMIN], totalSales);
router.get(
    "/month/:year/:month",
    [validateJWT, validateADMIN],
    totalSalesByMonth
);
router.get(
    "/graph-sales-month/:year",
    [validateJWT, validateADMIN],
    graphSaleXMonth
);

module.exports = router;
