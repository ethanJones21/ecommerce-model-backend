const { response, request } = require("express");
const Config = require("../models/config.model");
const path = require("path");
const { deleteBeforeFile } = require("../helpers/delete-file.helper");

const getConfig = async (req = request, res = response) => {
    const id = "611e9e3510884a2a6a003dbc";
    try {
        const config = await Config.findById(id);
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

const updateConfig = async (req = request, res = response) => {
    const newConfig_a = req.body;
    const id = "611e9e3510884a2a6a003dbc";
    try {
        const searchID = await Config.findById(id);
        if (!searchID) {
            return res.status(404).json({
                ok: true,
                msg: "Configuracion no encontrado por id",
                config: {},
            });
        }

        for (let i = 0; i < newConfig_a.categories.length; i++) {
            newConfig_a.categories[i] = JSON.parse(newConfig_a.categories[i]);
        }

        let path_a = req.files.logo.path;
        path_a = path_a.split("\\")[2];

        if (path_a != searchID.logo) {
            const pathImg = path.join(
                __dirname,
                `../uploads/logo/${searchID.logo}`
            );
            await deleteBeforeFile(res, pathImg);
            newConfig_a.logo = path_a;
        }

        const newConfig = await Config.findByIdAndUpdate(id, newConfig_a, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Configuracion actualizada",
            config: newConfig,
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
    updateConfig,
};
