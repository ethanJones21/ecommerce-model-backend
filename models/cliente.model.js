"use strict";
const { Schema, model } = require("mongoose");

const ClienteSchema = new Schema(
    {
        nombre: { type: String, required: true },
        apellido: { type: String, required: true },
        pais: { type: String, required: false },
        email: { type: String, required: true },
        password: { type: String, required: true },
        perfil: { type: String, default: "assets/noimage.jpg" },
        telefono: { type: String, required: false },
        genero: { type: String, required: false },
        fnacimiento: { type: String, required: false },
        dni: { type: String, required: false },
        activo: { type: Boolean, default: true, required: true },
        test: { type: Boolean, default: false, required: true },
    },
    { collection: "clientes" }
);

ClienteSchema.method("toJSON", function () {
    const { __v, _id, password, ...object } = this.toObject();
    object.uid = _id;
    return object;
});

module.exports = model("Cliente", ClienteSchema);
