const jwt = require("jwt-simple");
const moment = require("moment");

const createToken = (user) => {
    const { uid, name, lastname, email } = user;
    const payload = {
        uid,
        name,
        lastname,
        email,
        iat: moment().unix(),
        exp: moment().add(7, "days").unix(),
    };
    return jwt.encode(payload, process.env.JWT_SECRET);
};

module.exports = {
    createToken,
};
