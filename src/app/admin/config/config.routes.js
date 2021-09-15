const { Router } = require("express");

const { getConfig, updateConfig } = require("./config.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const {
    validateADMIN,
} = require("../../../shared/middlewares/role.middleware");

const multiparty = require("connect-multiparty");
const UPLOAD = multiparty({ uploadDir: "../../../uploads/logo" });

const router = Router();

router.get("/", [validateJWT, validateADMIN], getConfig);
router.put("/", [validateJWT, validateADMIN, UPLOAD], updateConfig);

module.exports = router;
