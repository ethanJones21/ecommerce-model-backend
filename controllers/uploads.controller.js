const fs = require("fs");
const path = require("path");
const { request, response } = require("express");

const getFile = (req = request, res = response) => {
    const model = req.params.model;
    const img = req.params.img;
    const pathImg = path.join(__dirname, `../uploads/${model}/${img}`);

    // imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/default.jpg`);
        res.sendFile(pathImg);
    }

    // const model = req.params.model;
    // const img = req.params.img;
    // const path_img = `./uploads/${model}/${img}`;
    // const path_default = `./uploads/default.jpg`;
    // let file = '';
    // fs.stat(file,(err)=>{
    //     if (!err) {
    //         file = path.resolve(path_img);
    //         return res.status(200).json({
    //             ok: true,
    //             file
    //         });
    //     } else {
    //         file = path.resolve(path_default);
    //         return res.status(200).json({
    //             ok: true,
    //             file
    //         });
    //     }
    // })
};

module.exports = {
    getFile,
};
