const { response, request } = require("express");
const Client = require("../models/client.model");
const bcrypt = require("bcryptjs");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../helpers/pages.helper");

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
        const longitud = await Client.find({
            $or: [{ name: regex }, { lastname: regex }, { email: regex }],
        }).countDocuments();
        clients.longitud = longitud;
        clients.clients = await Client.find({
            $or: [{ name: regex }, { lastname: regex }, { email: regex }],
        })
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        clients.pages = fillPagesArr(lengthArr);

        clients.previous = conditionPrevious(startIndex, page, limit);
        clients.next = conditionNext(endIndex, longitud, page, limit);

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

const getClient = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const client = await Client.findById(id);
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

const createClientTest = async (req = request, res = response) => {
    const { email, password } = req.body;
    try {
        // Comprobar si ya existe el correo
        const existEmail = await Client.findOne({ email });
        if (existEmail) {
            return res.status(404).json({
                ok: false,
                msg: "Correo ya está registrado",
            });
        }
        // Creando un nuevo cliente
        const client = new Client(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        client.password = bcrypt.hashSync(password, salt);
        client.test = true;
        // guardar cliente
        await client.save();

        res.json({
            ok: true,
            msg: "Cliente de prueba creado",
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
    const newClient = req.body;
    const id = req.params.id;
    try {
        const searchID = await Client.findById(id);
        if (!searchID) {
            return res.status(404).json({
                ok: true,
                msg: "Cliente no encontrado por id",
                client: {},
            });
        }

        if (newClient.email != searchID.email) {
            const searchEmail = await Client.findOne({
                email: newClient.email,
            });
            if (searchEmail) {
                return res.status(404).json({
                    ok: true,
                    msg: "Este correo ya existe",
                    client: {},
                });
            }
        }

        const client = await Client.findByIdAndUpdate(id, newClient, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Cliente actualizado",
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

const deactivateClient = async (req = request, res = Response) => {
    const id = req.params.id;
    const { active } = req.body;
    const inactive = { $set: { active } };
    try {
        await Cliente.findByIdAndUpdate(id, inactive);
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
    createClientTest,
    updateClient,
    deactivateClient,
};
