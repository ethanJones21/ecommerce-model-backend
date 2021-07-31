const { Router } = require("express");

const {
    getClientsByPage,
    getClient,
    updateClient,
    deactivateClient,
    createClientTest,
} = require("../controllers/client.controller");

const { validateJWT } = require("../middlewares/validate-jwt.middleware");

const router = Router();

router.get("/paginado", validateJWT, getClientsByPage);
router.get("/:id", validateJWT, getClient);

router.post("/test", validateJWT, createClientTest);

router.put("/:id", validateJWT, updateClient);
router.patch("/:id", validateJWT, deactivateClient);

module.exports = router;
