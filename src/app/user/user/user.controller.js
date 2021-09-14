const { response, request } = require("express");
const User = require("../../../shared/models/user.model");
const { createToken } = require("../../../shared/helpers/jwt.helper");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        // Comprobar si ya existe el correo
        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(404).json({
                ok: false,
                msg: "Correo ya está registrado",
            });
        }
        // Creando un nuevo User
        const newUser = new User(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync(password, salt);

        // guardar User
        await newUser.save();

        const { profile } = newUser;
        // const { profile, role } = user;

        res.json({
            ok: true,
            profile,
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

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Correo no encontrado",
            });
        }

        const validPass = bcrypt.compareSync(password, user.password);
        if (!validPass) {
            return res.status(404).json({
                ok: false,
                msg: "Contraseña incorrecta",
            });
        }

        const { profile } = user;

        res.json({
            ok: true,
            profile,
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

const updateUser = async (req = request, res = response) => {
    const newUser = req.body;
    const id = req.params.id;
    try {
        const searchID = await User.findById(id);
        if (!searchID) {
            return res.status(404).json({
                ok: true,
                msg: "Usuario no encontrado por id",
                client: {},
            });
        }

        if (newUser.email != searchId.email) {
            const searchEmail = await User.findOne({ email: newUser.email });
            if (searchEmail) {
                return res.status(404).json({
                    ok: true,
                    msg: "Este correo ya existe",
                    user: {},
                });
            }
        }

        const user = await User.findByIdAndUpdate(id, newUser, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Usuario actualizado",
            user,
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
    updateUser,
};
