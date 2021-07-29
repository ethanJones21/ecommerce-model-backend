const { response, request } = require("express");
const Cliente = require("../../models/cliente.model");

const getClientsByPage = async (req = request, res = response) => {
    const term = req.query.term;
    const regex = new RegExp(term, "i");

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let clients = {
        clients: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Cliente.find({
            $or: [{ apellido: regex }, { email: regex }],
        }).countDocuments();
        clients.longitud = longitud;
        clients.clients = await Cliente.find({
            $or: [{ nombre: regex }, { apellido: regex }, { email: regex }],
        })
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        clients.pages = llenarArr(lengthArr);

        if (startIndex > 0) {
            clients.previous = {
                page: page - 1,
                limit,
            };
        } else {
            clients.previous = null;
        }

        if (endIndex < longitud) {
            clients.next = {
                page: page + 1,
                limit,
            };
        } else {
            clients.next = null;
        }

        res.json({
            ok: true,
            clients,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const llenarArr = (lengthArr) => {
    let arr = [];
    for (let i = 0; i < lengthArr; i++) {
        arr[i] = i + 1;
    }
    return arr;
};

const getClient = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const client = await Cliente.findById(id);
        res.json({
            ok: true,
            client,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const updateClient = async (req = request, res = response) => {
    const nuevaData = req.body;
    const id = req.params.id;
    try {
        const nuevoCliente = await Cliente.findByIdAndUpdate(id, nuevaData);
        res.json({
            ok: true,
            msg: "Cliente actualizado",
            client: nuevoCliente,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const deactivateClient = async (req = request, res = Response) => {
    const id = req.params.id;
    const inactivo = { $set: { activo: false } };
    try {
        await Cliente.findByIdAndUpdate(id, inactivo);
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
    getClientsByPage,
    getClient,
    updateClient,
    deactivateClient,
};
