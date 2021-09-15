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

router.get("/paginado", [validateJWT, validateUSER], getMessagesByPage);
router.get("/:id", [validateJWT, validateUSER], getMessage);

router.patch("/:id", [validateJWT, validateUSER], responseMessage);

module.exports = router;
