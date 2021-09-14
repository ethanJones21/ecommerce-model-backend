const { Router } = require("express");

const {
    registerClient,
    loginClient,
    updateClient,
} = require("./client.controller");

const { validateJWT } = require("../../middlewares/validate-jwt.middleware");

const router = Router();

router.post("/register", registerClient);
router.post("/login", loginClient);

router.put("/:id", validateJWT, updateClient);

module.exports = router;
