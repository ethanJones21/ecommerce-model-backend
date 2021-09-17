const { Router } = require("express");

const { getSetting, updateSetting } = require("./setting.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const {
    validateADMIN,
} = require("../../../shared/middlewares/role.middleware");

const multiparty = require("connect-multiparty");
const UPLOAD = multiparty({ uploadDir: "../../../uploads/logo" });

const router = Router();

router.get("/", [validateJWT, validateADMIN], getSetting);
router.put("/", [validateJWT, validateADMIN, UPLOAD], updateSetting);

module.exports = router;
