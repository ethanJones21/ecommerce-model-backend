const { response, request } = require("express");
const Sale = require("../models/sale.model");
const SaleDetail = require("../models/sale-detail.model");
const Config = require("../models/config.model");

const getSales = async (req = request, res = response) => {
    try {
        const sale = await Sale.find();
        res.json({
            ok: true,
            sale,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const createSale = async (req = request, res = response) => {
    const client = req.uid;
    const { details, ...sale } = req.body;
    try {
        const idConfig = process.env.IDCONFIG;
        const { serie, correlative } = await Config.findById(idConfig);

        const newSale = new Sale(sale);
        newSale.client = client;

        const lastSale = await Sale.find().sort({ createdAt: -1 });
        if (lastSale.length > 0) {
            const sc = lastSale[0].sale.split("-");
            if (sc[1] !== "999999") {
                const newCorrelative = zfill(Number(sc[1]) + 1, 6);
                newSale.sale = `${serie} - ${newCorrelative}`;
            } else {
                const newSerie = zfill(Number(sc[0]) + 1, 3);
                newSale.sale = `${serie} - ${newSerie}`;
            }
        } else {
            newSale.sale = `${serie} - ${correlative}`;
        }

        await newSale.save();

        let sdArr = [];

        details.forEach(async (detail) => {
            const newSaleDetail = new SaleDetail(detail);
            newSaleDetail.client = client;
            newSaleDetail.sale = newSale.id;
            await newSaleDetail.save();
            sdArr.push(detail);
        });

        res.json({
            ok: true,
            msg: "Se registro la venta exitosamente",
            sale,
            details: sdArr,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const zfill = (number, width) => {
    var numberOutput = Math.abs(number);
    var length = number.toString().length;
    var zero = "0";

    if (width <= length) {
        if (number < 0) {
            return "-" + numberOutput.toString();
        } else {
            return numberOutput.toString();
        }
    } else {
        if (number < 0) {
            return "-" + zero.repeat(width - length) + numberOutput.toString();
        } else {
            return zero.repeat(width - length) + numberOutput.toString();
        }
    }
};

const deleteSale = async (req = request, res = Response) => {
    // try {
    // } catch (error) {
    //     console.log(error);
    //     res.status(500).json({
    //         ok: false,
    //         msg: "Error inesperado... revisar logs",
    //     });
    // }
};

module.exports = {
    getSales,
    createSale,
    // deleteSale,
};
