const { Router } = require("express");

const {
    getMessagesByPage,
    getMessage,
    responseMessage,
} = require("./message.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const {
    validateUSER_or_ADMIN,
} = require("../../../shared/middlewares/role.middleware");

const router = Router();

router.get(
    "/paginado",
    [validateJWT, validateUSER_or_ADMIN],
    getMessagesByPage
);
router.get("/:id", [validateJWT, validateUSER_or_ADMIN], getMessage);

router.patch("/:id", [validateJWT, validateUSER_or_ADMIN], responseMessage);

module.exports = router;
