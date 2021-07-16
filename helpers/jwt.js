import jwt from "jwt-simple";
import moment from "moment";

exports.createToken = (usuario) => {
    const payload = {
        uid,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        iat: moment().unix(),
        exp: moment().add(7, "days").unix(),
    };
    return jwt.encode(payload, process.env.JWT_PASS);
};
