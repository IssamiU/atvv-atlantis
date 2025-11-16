const express = require('express');
const router = express.Router();
const hospedagemController = require('../controllers/hospedagemController');

router.get('/', hospedagemController.listarHospedagens);
router.post('/', hospedagemController.criarHospedagem);
router.delete('/:id', hospedagemController.deletarHospedagem);

module.exports = router;