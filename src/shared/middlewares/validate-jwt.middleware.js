const jwt = require("jsonwebtoken");
const { response, request } = require("express");

const validateJWT = async (req = request, res = response, next) => {
    // Leer el Token
    const token = req.header("x-token");

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No hay token en la petición",
        });
    }

    try {
        const verificar = jwt.verify(token, process.env.JWT_SECRET);
        const { uid } = verificar;
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no válido",
        });
    }
};

module.exports = {
    validateJWT,
};
