const VagaController = require('../controller/VagaController');

const vagasController = new VagaController();
const express = require('express');
const router =express.Router();
router.get('/vagas',vagasController.obterTodos)

module.exports=router;