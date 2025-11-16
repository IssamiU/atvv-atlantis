const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  nomeSocial: String,
  dataNascimento: { type: Date, required: true },
  cpf: { type: String, required: true, unique: true },
  telefone: { type: String, required: true },
  email: { type: String, required: true },
  endereco: {
    rua: String,
    numero: String,
    bairro: String,
    cidade: String,
    estado: String,
    cep: String
  },
  tipo: { type: String, enum: ['titular', 'dependente'], required: true },
  idTitular: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente' }
}, { timestamps: true });

module.exports = mongoose.model('Cliente', clienteSchema);