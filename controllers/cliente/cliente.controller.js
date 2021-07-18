const { response } = require("express");
const Cliente = require("../../models/cliente.model");

const actualizarCliente = async (req, res = response) => {
    const nuevaData = req.body;
    const id = req.params.id;
    try {
        const nuevoCliente = await Cliente.findByIdAndUpdate(id, nuevaData);
        res.json({
            ok: true,
            msg: "Cliente actualizado",
            nuevoCliente,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const desactivarCliente = async (req, res = Response) => {
    const id = req.params.id;
    const inactivo = { $set: { activo: false } };
    try {
        const cliente = await Cliente.findByIdAndUpdate(id, inactivo);
        res.json({
            ok: true,
            msg: "Cliente inactivo",
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
    actualizarCliente,
    desactivarCliente,
};
