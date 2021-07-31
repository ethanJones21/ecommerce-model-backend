const Usuario = require("../models/usuario.model");
const { response, request } = require("express");

const validarADMIN_ROLE = async (req = request, res = response, next) => {
    const uid = req.uid;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no existe",
            });
        }

        if (usuarioDB.role !== "ADMIN_ROLE") {
            return res.status(403).json({
                ok: false,
                msg: "No tiene privilegios para hacer eso",
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const validarTrabajador_o_ADMIN_ROLE = async (
    req = request,
    res = response,
    next
) => {
    const uid = req.uid;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no existe",
            });
        }

        if (usuarioDB.role === "TRABAJADOR" || "ADMIN_ROLE") {
            return res.status(403).json({
                ok: false,
                msg: "No tiene privilegios para hacer eso",
            });
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

const validarADMIN_ROLE_o_MismoUsuario = async (
    req = request,
    res = response,
    next
) => {
    const uid = req.uid;
    const id = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no existe",
            });
        }

        if (usuarioDB.role === "ADMIN_ROLE" || uid === id) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg: "No tiene privilegios para hacer eso",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador",
        });
    }
};

module.exports = {
    validarADMIN_ROLE,
    validarTrabajador_o_ADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario,
};
