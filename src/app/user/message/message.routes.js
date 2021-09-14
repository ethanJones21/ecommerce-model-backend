const { Router } = require("express");

const {
    getMessagesByPage,
    getMessage,
    responseMessage,
} = require("./message.controller");

const {
    validateJWT,
} = require("../../../shared/middlewares/validate-jwt.middleware");

const router = Router();

router.get("/paginado", validateJWT, getMessagesByPage);
router.get("/:id", getMessage);

router.patch("/:id", validateJWT, responseMessage);

module.exports = router;
