const { Router } = require("express");

const {
    getMessagesByPage,
    getMessage,
    createMessage,
    responseMessage,
} = require("../controllers/review.controller");

const { validateJWT } = require("../middlewares/validate-jwt.middleware");

const router = Router();

router.get("/paginado", validateJWT, getMessagesByPage);
router.get("/:id", getMessage);

router.post("/", validateJWT, createMessage);
router.patch("/:id", validateJWT, responseMessage);

module.exports = router;
