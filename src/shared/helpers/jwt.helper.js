const jwt = require("jwt-simple");
const moment = require("moment");

const createToken = (user) => {
    const { _id, name, lastname, email, role, active } = user;
    const payload = {
        uid: _id,
        name,
        lastname,
        email,
        role, //ver si es factible
        active,
        iat: moment().unix(),
        exp: moment().add(7, "days").unix(),
    };
    return jwt.encode(payload, process.env.JWT_SECRET);
};

module.exports = {
    createToken,
};
