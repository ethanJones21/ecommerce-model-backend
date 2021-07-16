"use strict";
const mongoose, { Schema } = require("mongoose");

const ClienteSchema = new Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    pais: { type: String, required: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    perfil: { type: String, default: perfil.png, required: true },
    telefono: { type: String, required: false },
    genero: { type: String, required: false },
    fnacimiento: { type: String, required: false },
    dni: { type: String, required: false },
},{collection: 'clientes'});

module.exports = mongoose.model("Cliente", ClienteSchema);
