const { response, request } = require("express");
const Setting = require("../../../shared/models/setting.model");
const path = require("path");
const {
    deleteBeforeFile,
} = require("../../../shared/helpers/delete-file.helper");

const getSetting = async (req = request, res = response) => {
    const idSetting = process.env.IDCONFIG;
    try {
        const setting = await Setting.findById(idSetting);
        res.json({
            ok: true,
            setting,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const updateSetting = async (req = request, res = response) => {
    const idSetting = process.env.IDCONFIG;
    const newSetting_a = req.body;
    try {
        const searchID = await Setting.findById(idSetting);
        if (!searchID) {
            return res.status(404).json({
                ok: true,
                msg: "Configuracion no encontrado por id",
                setting: {},
            });
        }

        for (let i = 0; i < newSetting_a.categories.length; i++) {
            newSetting_a.categories[i] = JSON.parse(newSetting_a.categories[i]);
        }

        let path_a = req.files.logo.path;
        path_a = path_a.split("\\")[2];

        if (path_a != searchID.logo) {
            const pathImg = path.join(
                __dirname,
                `../uploads/logo/${searchID.logo}`
            );
            await deleteBeforeFile(res, pathImg);
            newSetting_a.logo = path_a;
        }

        const newSetting = await Setting.findByIdAndUpdate(id, newSetting_a, {
            new: true,
        });
        res.json({
            ok: true,
            msg: "Configuracion actualizada",
            setting: newSetting,
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
    getSetting,
    updateSetting,
};
