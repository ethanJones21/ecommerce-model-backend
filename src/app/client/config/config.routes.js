const { Router } = require("express");

const { getCategories, getDelivery } = require("./config.controller");

const router = Router();

router.get("/delivery", getDelivery);
router.get("/categories", getCategories);

module.exports = router;
