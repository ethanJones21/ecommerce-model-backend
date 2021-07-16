const Cliente = require("../../models/cliente.model");
const bcrypt = require("bcryptjs");

const registroCliente = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Comprobar si ya existe el correo
        const existeEmail = await Cliente.findOne({ email });
        if (existeEmail) {
            res.status(404).json({
                ok: false,
                msg: "Correo ya está registrado",
            });
        }
        // Creando un nuevo cliente
        const nuevoCliente = new Cliente(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        nuevoCliente.password = bcrypt.hashSync(password, salt);

        // guardar cliente
        await nuevoCliente.save();

        // generar token de jwt
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const loginCliente = async (req, res) => {
    const { email, password } = req.body;
    try {
        const clienteDB = await Cliente.findOne({ email });
        if (!clienteDB) {
            res.status(404).json({
                ok: false,
                msg: "Correo no encontrado",
            });
        }

        const validPass = bcrypt.compareSync(password, clienteDB.password);
        if (!validPass) {
            res.status(404).json({
                ok: false,
                msg: "Contraseña incorrecta",
            });
        }
    } catch (error) {}
};

module.exports = {
    registroCliente,
    loginCliente,
};
