const express = require('express');
const router = express.Router();
const controller = require('../controllers/pedidoController');

router.post('/pedidos', controller.criar);
router.get('/pedidos', controller.listar);
router.get('/pedidos/:id', controller.buscar);
router.patch('/pedidos/:id/status', controller.atualizarStatus);

module.exports = router;