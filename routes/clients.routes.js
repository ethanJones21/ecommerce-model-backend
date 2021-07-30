const { Router } = require("express");
const {
    registerClient,
    loginClient,
} = require("../controllers/clients/clients-auth.controller");

const {
    getClientsByPage,
    getClient,
    updateClient,
    deactivateClient,
    createClientTest,
} = require("../controllers/clients/clients.controller");

const router = Router();

router.get("/paginado", getClientsByPage);
router.get("/:id", getClient);

router.post("/register", registerClient);
router.post("/login", loginClient);

router.post("/test", createClientTest);

router.put("/:id", updateClient);
router.patch("/:id", deactivateClient);

module.exports = router;
