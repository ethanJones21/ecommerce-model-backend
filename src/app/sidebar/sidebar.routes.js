const { Router } = require("express");

const {
    validateJWT,
} = require("../../shared/middlewares/validate-jwt.middleware");

const {
    validateUSER_or_ADMIN,
} = require("../../shared/middlewares/role.middleware");
const { sidebar } = require("./sidebar.controller");

const router = Router();

router.get("/", [validateJWT, validateUSER_or_ADMIN], sidebar);

module.exports = router;
