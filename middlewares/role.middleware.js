const Usuario = require("../models/user.model");
const { response, request } = require("express");

const validateADMIN = async (req = request, res = response, next) => {
    const uid = req.uid;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no existe",
            });
        }

        if (usuarioDB.role !== "ADMIN") {
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

const validateWORKER_or_ADMIN = async (req = request, res = response, next) => {
    const uid = req.uid;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no existe",
            });
        }

        if (usuarioDB.role === "USER" || "ADMIN") {
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

const validateADMIN_or_SAME_USER = async (
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

        if (usuarioDB.role === "ADMIN" || uid === id) {
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
    validateADMIN,
    validateWORKER_or_ADMIN,
    validateADMIN_or_SAME_USER,
};
