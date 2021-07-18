const { response } = require("express");
const Admin = require("../../models/admin.model");

const actualizarAdmin = async (req, res = response) => {
    const nuevaData = req.body;
    const id = req.params.id;
    try {
        const nuevoAdmin = await Admin.findByIdAndUpdate(id, nuevaData);
        res.json({
            ok: true,
            msg: "Admin actualizado",
            nuevoAdmin,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const desactivarAdmin = async (req, res = Response) => {
    const id = req.params.id;
    const inactivo = { $set: { activo: false } };
    try {
        await Admin.findByIdAndUpdate(id, inactivo);
        res.json({
            ok: true,
            msg: "Admin inactivo",
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
    actualizarAdmin,
    desactivarAdmin,
};
