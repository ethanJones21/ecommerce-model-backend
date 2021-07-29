const { response, request } = require("express");
const Cliente = require("../../models/cliente.model");
const bcrypt = require("bcryptjs");
const { crearToken } = require("../../helpers/auth/jwt");

const registerClient = async (req = request, res = response) => {
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

        res.json({
            ok: true,
            user: nuevoCliente,
            token: crearToken(nuevoCliente),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const loginClient = async (req = request, res = Response) => {
    const { email, password } = req.body;
    try {
        const cliente = await Cliente.findOne({ email });
        if (!cliente) {
            res.status(404).json({
                ok: false,
                msg: "Correo no encontrado",
            });
        }

        const validPass = bcrypt.compareSync(password, cliente.password);
        if (!validPass) {
            res.status(404).json({
                ok: false,
                msg: "Contraseña incorrecta",
            });
        }

        res.json({
            ok: true,
            user: cliente,
            token: crearToken(cliente),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

module.exports = {
    registerClient,
    loginClient,
};
