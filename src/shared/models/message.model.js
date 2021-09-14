"use strict";
const { Schema, model } = require("mongoose");

const MessageSchema = new Schema(
    {
        client: { type: Schema.Types.ObjectId, ref: "Client", required: true },
        message: { type: String, required: true },
        subject: { type: String, required: true },
        state: { type: String, required: true, default: "Enviado" },
        createdAt: { type: Date, required: true, default: Date.now },
    },
    { collection: "messages" }
);

MessageSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});

module.exports = model("Message", MessageSchema);
