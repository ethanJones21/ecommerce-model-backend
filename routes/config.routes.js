const { Router } = require("express");

const {
    getConfig,
    updateConfig,
    getCategories,
} = require("../controllers/config.controller");

const { validateJWT } = require("../middlewares/validate-jwt.middleware");
const multiparty = require("connect-multiparty");
const UPLOAD = multiparty({ uploadDir: "./uploads/logo" });

const router = Router();

router.get("/", validateJWT, getConfig);
router.get("/categories", getCategories);

router.put("/", [validateJWT, UPLOAD], updateConfig);

module.exports = router;
