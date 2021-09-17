const { response, request } = require("express");
const Sale = require("../../../shared/models/sale.model");
const SaleDetail = require("../../../shared/models/sale-detail.model");
const Setting = require("../../../shared/models/setting.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../../../shared/helpers/pages.helper");

const getClientOrdersByPage = async (req = request, res = response) => {
    const client = req.uid;

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let orders = {
        orders: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Sale.find({
            client,
        }).countDocuments();
        orders.longitud = longitud;
        orders.orders = await Sale.find({
            client,
        })
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        orders.pages = fillPagesArr(lengthArr);

        orders.previous = conditionPrevious(startIndex, page, limit);
        orders.next = conditionNext(endIndex, longitud, page, limit);

        res.json({
            ok: true,
            orders,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getOrder = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const order = await Sale.findById(id);
        const details = await SaleDetail.findById(id);
        res.json({
            ok: true,
            order,
            details,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const createOrder = async (req = request, res = response) => {
    const client = req.uid;
    const { details, ...sale } = req.body;
    try {
        const idSetting = process.env.IDCONFIG;
        const { serie, correlative } = await Setting.findById(idSetting);

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

module.exports = {
    getClientOrdersByPage,
    getOrder,
    createOrder,
};
