const Cliente = require('../models/Cliente');
const Hospedagem = require('../models/Hospedagem');

exports.listarClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

exports.criarCliente = async (req, res) => {
  try {
    
    const cpfExistente = await Cliente.findOne({ cpf: req.body.cpf });
    if (cpfExistente) {
      return res.status(400).json({ mensagem: 'CPF já cadastrado!' });
    }

    const cliente = new Cliente(req.body);
    await cliente.save();
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

exports.buscarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};

exports.atualizarCliente = async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!cliente) return res.status(404).json({ mensagem: 'Cliente não encontrado' });
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ mensagem: error.message });
  }
};

exports.deletarCliente = async (req, res) => {
  try {
    const clienteId = req.params.id;

    const cliente = await Cliente.findById(clienteId);
    if (!cliente) return res.status(404).json({ mensagem: 'Cliente não encontrado' });

    if (cliente.tipo === 'titular') {
      const dependentes = await Cliente.find({ idTitular: clienteId });
      if (dependentes.length > 0) {
        return res.status(400).json({ 
          mensagem: 'Não é possível excluir. Existem dependentes vinculados a este titular.' 
        });
      }
    }

    await Hospedagem.deleteMany({ idCliente: clienteId });

    await Cliente.findByIdAndDelete(clienteId);

    res.json({ 
      mensagem: 'Cliente e suas hospedagens deletados com sucesso' 
    });
  } catch (error) {
    res.status(500).json({ mensagem: error.message });
  }
};