const mongoose = require('mongoose');

const hospedagemSchema = new mongoose.Schema({
  idCliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  nomeAcomodacao: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Hospedagem', hospedagemSchema);