const InscricaoController = require('../controller/InscricaoController');

const inscricaoController = new InscricaoController();
const express = require('express');
const router =express.Router();
router.get('/inscricao',inscricaoController.obterTodos)
router.post('/inscricao',inscricaoController.adicionar)

module.exports=router;