const Hospedagem = require('../models/Hospedagem');
const Cliente = require('../models/Cliente');

exports.listarHospedagens = async (req, res) => {
  try {
    const hospedagens = await Hospedagem.find().populate('idCliente');
    
    const hospedagensValidas = hospedagens.filter(h => h.idCliente !== null);
    
    res.json(hospedagensValidas);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

exports.criarHospedagem = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.body.idCliente);
    if (!cliente) {
      return res.status(404).json({ mensagem: 'Cliente não encontrado!' });
    }


    if (cliente.tipo !== 'titular') {
      return res.status(400).json({ mensagem: 'Apenas clientes titulares podem fazer hospedagens!' });
    }

    const hospedagem = new Hospedagem(req.body);
    await hospedagem.save();
    
    const hospedagemCompleta = await Hospedagem.findById(hospedagem._id).populate('idCliente');
    res.status(201).json(hospedagemCompleta);
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

exports.deletarHospedagem = async (req, res) => {
  try {
    const hospedagem = await Hospedagem.findByIdAndDelete(req.params.id);
    if (!hospedagem) return res.status(404).json({ mensagem: 'Hospedagem não encontrada' });
    res.json({ mensagem: 'Hospedagem deletada com sucesso' });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};