const { response, request } = require("express");
const Address = require("../../../shared/models/address.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../../../shared/helpers/pages.helper");

const getAddressesByPage = async (req = request, res = response) => {
    const term = req.query.term;
    const regex = new RegExp(term, "i");

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let addresses = {
        addresses: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Message.find({
            $or: [{ addresse: regex }, { dni: regex }],
        }).countDocuments();
        addresses.longitud = longitud;
        addresses.addresses = await Message.find({
            $or: [{ addresse: regex }, { dni: regex }],
        })
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        addresses.pages = fillPagesArr(lengthArr);

        addresses.previous = conditionPrevious(startIndex, page, limit);
        addresses.next = conditionNext(endIndex, longitud, page, limit);

        res.json({
            ok: true,
            addresses,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getAddress = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const address = await Address.findById(id);
        res.json({
            ok: true,
            address,
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
    getAddressesByPage,
    getAddress,
};
