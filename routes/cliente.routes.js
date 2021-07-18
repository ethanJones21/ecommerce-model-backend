const { Router } = require("express");
const {
    registroCliente,
    loginCliente,
} = require("../controllers/cliente/cliente-auth.controller");

const {
    actualizarCliente,
    desactivarCliente,
} = require("../controllers/cliente/cliente.controller");

const router = Router();

router.post("/registro_cliente", registroCliente);
router.post("/login_cliente", loginCliente);

router.put("/:id", actualizarCliente);
router.patch("/:id", desactivarCliente);

module.exports = router;
