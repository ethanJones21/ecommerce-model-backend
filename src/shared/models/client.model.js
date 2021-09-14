"use strict";
const { Schema, model } = require("mongoose");

const ClientSchema = new Schema(
    {
        name: { type: String, required: true },
        lastname: { type: String, required: true },
        country: { type: String, required: false },
        email: { type: String, required: true },
        password: { type: String, required: true },
        profile: { type: String, default: "assets/noimage.jpg" },
        phone: { type: String, required: false },
        gender: { type: String, required: false },
        birthday: { type: String, required: false },
        dni: { type: String, required: false },
        active: { type: Boolean, default: true, required: true },
        test: { type: Boolean, default: false, required: true },
    },
    { collection: "clients" }
);

ClientSchema.method("toJSON", function () {
    const { __v, _id, pass, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("Client", ClientSchema);
