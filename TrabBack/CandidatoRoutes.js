const CandidatoController = require('../controller/CandidatoController');

const candidatosController = new CandidatoController();
const express = require('express');
const router =express.Router();
router.get('/candidatos',candidatosController.obterTodos)

module.exports=router;