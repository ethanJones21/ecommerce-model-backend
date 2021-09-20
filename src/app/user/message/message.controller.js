const { response, request } = require("express");
const Message = require("../../../shared/models/message.model");
const {
    conditionPrevious,
    conditionNext,
    fillPagesArr,
} = require("../../../shared/helpers/pages.helper");

const getMessagesByPage = async (req = request, res = response) => {
    const term = req.query.term;
    const regex = new RegExp(term, "i");

    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    let messages = {
        messages: [],
        next: null,
        previous: null,
        pages: [],
        longitud: 0,
    };

    try {
        const longitud = await Message.find({
            $or: [{ subject: regex }, { state: regex }],
        }).countDocuments();
        messages.longitud = longitud;
        messages.messages = await Message.find({
            $or: [{ subject: regex }, { state: regex }],
        })
            .populate("client", "name lastname email")
            .limit(limit)
            .skip(startIndex);

        const lengthArr = Math.ceil(longitud / limit);
        messages.pages = fillPagesArr(lengthArr);

        messages.previous = conditionPrevious(startIndex, page, limit);
        messages.next = conditionNext(endIndex, longitud, page, limit);

        res.json({
            ok: true,
            messages,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const getMessage = async (req = request, res = response) => {
    const id = req.params.id;
    try {
        const message = await Message.findById(id);
        res.json({
            ok: true,
            message,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar logs",
        });
    }
};

const responseMessage = async (req = request, res = response) => {
    const id = req.params.id;
    const { state } = req.body;
    const responseM = { $set: { state } };
    try {
        await Message.findByIdAndUpdate(id, responseM);
        res.json({
            ok: true,
            msg: "Mensaje respondido",
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
    getMessagesByPage,
    getMessage,
    responseMessage,
};
