const { response, request } = require("express");
const Message = require("../../../shared/models/message.model");

const createMessage = async (req = request, res = response) => {
    const addMessage = req.body;
    const client = req.uid;

    try {
        const newMessage = new Message(addMessage);
        newMessage.client = client;
        await newMessage.save();

        res.json({
            ok: true,
            msg: "Mensaje enviado",
            message: newMessage,
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
    createMessage,
};
