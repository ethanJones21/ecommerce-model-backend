const { response, request } = require("express");
const Config = require("../../../shared/models/config.model");

const getConfig = async (req = request, res = response) => {
    const idConfig = process.env.IDCONFIG;
    try {
        const config = await Config.findById(idConfig);
        res.json({
            ok: true,
            config,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getDelivery = async (req = request, res = response) => {
    const idConfig = process.env.IDCONFIG;
    try {
        const { delivery } = await Config.findById(idConfig);
        res.json({
            ok: true,
            delivery,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getCategories = async (req = request, res = response) => {
    const idConfig = process.env.IDCONFIG;
    try {
        const { categories } = await Config.findById(idConfig);
        res.json({
            ok: true,
            categories,
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
    getConfig,
    getDelivery,
    getCategories,
};
