const bcrypt = require("bcryptjs");
const Admin = require("../../models/admin.model");
const bcrypt = require("bcryptjs");
const { crearToken } = require("../../helpers/auth/jwt");

const registroAdmin = async (req, res = response) => {
    const { email, password } = req.body;
    try {
        // Comprobar si ya existe el correo
        const existeEmail = await Admin.findOne({ email });
        if (existeEmail) {
            res.status(404).json({
                ok: false,
                msg: "Correo ya está registrado",
            });
        }
        // Creando un nuevo admin
        const nuevoAdmin = new Admin(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        nuevoAdmin.password = bcrypt.hashSync(password, salt);

        // guardar admin
        await nuevoAdmin.save();

        res.json({
            ok: true,
            user: nuevoAdmin,
            token: crearToken(nuevoAdmin),
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const loginAdmin = async (req, res = Response) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            res.status(404).json({
                ok: false,
                msg: "Correo no encontrado",
            });
        }

        const validPass = bcrypt.compareSync(password, admin.password);
        if (!validPass) {
            res.status(404).json({
                ok: false,
                msg: "Contraseña incorrecta",
            });
        }

        res.json({
            ok: true,
            user: admin,
            token: crearToken(admin),
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
    registroAdmin,
    loginAdmin,
};
