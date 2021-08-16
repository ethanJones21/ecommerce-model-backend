const fs = require("fs");
const { response } = require("express");

const deleteBeforeFile = async (res = response, path) => {
    try {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(path)) {
                resolve(fs.unlinkSync(path));
            }
        });
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: "Hable con el administrador",
        });
    }
};

module.exports = { deleteBeforeFile };
