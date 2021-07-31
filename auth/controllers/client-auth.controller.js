const { response, request } = require("express");
const Client = require("../../models/client.model");
const bcrypt = require("bcryptjs");
const { createToken } = require("../../helpers/jwt.helper");

const registerClient = async (req = request, res = response) => {
    const { email, pass } = req.body;
    try {
        // Comprobar si ya existe el correo
        const existeEmail = await Client.findOne({ email });
        if (existeEmail) {
            res.status(404).json({
                ok: false,
                msg: "Correo ya está registrado",
            });
        }
        // Creando un nuevo cliente
        const newClient = new Client(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newClient.password = bcrypt.hashSync(pass, salt);

        // guardar cliente
        await newClient.save();

        res.json({
            ok: true,
            user: newClient,
            token: createToken(newClient),
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
    const { email, pass } = req.body;
    try {
        const client = await Client.findOne({ email });
        if (!client) {
            res.status(404).json({
                ok: false,
                msg: "Correo no encontrado",
            });
        }

        const validPass = bcrypt.compareSync(pass, client.pass);
        if (!validPass) {
            res.status(404).json({
                ok: false,
                msg: "Contraseña incorrecta",
            });
        }

        res.json({
            ok: true,
            user: client,
            token: createToken(client),
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
