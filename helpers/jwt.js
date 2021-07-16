const jwt = require("jwt-simple");
const moment = require("moment");

const crearToken = (usuario) => {
    const { uid, nombre, apellido, email } = usuario;
    const payload = {
        uid,
        nombre,
        apellido,
        email,
        iat: moment().unix(),
        exp: moment().add(7, "days").unix(),
    };
    return jwt.encode(payload, process.env.JWT_PASS);
};

module.exports = {
    crearToken,
};
