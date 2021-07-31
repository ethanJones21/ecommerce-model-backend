const { response, request } = require("express");
const User = require("../models/user.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../helpers/pages.helper");

const getUsersByPage = async (req = request, res = response) => {
    const term = req.query.term;
    const regex = new RegExp(term, "i");

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let users = {
        users: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await User.find({
            $or: [{ apellido: regex }, { email: regex }],
        }).countDocuments();
        users.longitud = longitud;
        users.users = await User.find({
            $or: [{ nombre: regex }, { apellido: regex }, { email: regex }],
        })
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        users.pages = fillPagesArr(lengthArr);

        users.previous = conditionPrevious(startIndex, page, limit);
        users.previous = conditionNext(endIndex, longitud, page, limit);

        res.json({
            ok: true,
            users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getUser = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        res.json({
            ok: true,
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

const updateUser = async (req = request, res = response) => {
    const nuevaData = req.body;
    const id = req.params.id;
    try {
        const newUser = await User.findByIdAndUpdate(id, nuevaData);
        res.json({
            ok: true,
            msg: "Usuario actualizado",
            user: newUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const deactivateUser = async (req = request, res = Response) => {
    const id = req.params.id;
    const inactive = { $set: { active: false } };
    try {
        await User.findByIdAndUpdate(id, inactive);
        res.json({
            ok: true,
            msg: "Usuario inactivo",
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
    getUsersByPage,
    getUser,
    updateUser,
    deactivateUser,
};
