const { Router } = require("express");

const { createMessage } = require("./message.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const router = Router();

router.post("/", validateJWT, createMessage);

module.exports = router;
