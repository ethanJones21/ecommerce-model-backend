const jwt = require("jwt-simple");
const moment = require("moment");

const createToken = (user) => {
    const { uid, name, lastname, email, role, active } = user;
    const payload = {
        uid,
        name,
        lastname,
        email,
        active,
        iat: moment().unix(),
        exp: moment().add(7, "days").unix(),
    };
    return jwt.encode(payload, process.env.JWT_SECRET);
};

module.exports = {
    createToken,
};
