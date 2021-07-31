const bcrypt = require("bcryptjs");
const User = require("../../models/user.model");
const { createToken } = require("../../helpers/jwt.helper");

const registerUser = async (req, res = response) => {
    const { email, pass } = req.body;
    try {
        // Comprobar si ya existe el correo
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            res.status(404).json({
                ok: false,
                msg: "Correo ya está registrado",
            });
        }
        // Creando un nuevo User
        const newUser = new User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newUser.pass = bcrypt.hashSync(pass, salt);

        // guardar User
        await newUser.save();

        res.json({
            ok: true,
            user: newUser,
            token: createToken(newUser),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const loginUser = async (req, res = Response) => {
    const { email, pass } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({
                ok: false,
                msg: "Correo no encontrado",
            });
        }

        const validPass = bcrypt.compareSync(pass, user.pass);
        if (!validPass) {
            res.status(404).json({
                ok: false,
                msg: "Contraseña incorrecta",
            });
        }

        res.json({
            ok: true,
            user,
            token: createToken(user),
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
    registerUser,
    loginUser,
};
