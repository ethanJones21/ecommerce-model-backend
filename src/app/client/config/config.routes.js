const { Router } = require("express");

const {
    getConfig,
    getCategories,
    getDelivery,
} = require("../../../shared/controllers/config.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const router = Router();

router.get("/", validateJWT, getConfig);
router.get("/delivery", getDelivery);
router.get("/categories", getCategories);

module.exports = router;
