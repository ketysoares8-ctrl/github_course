const service = require('../services/pedidoService');

const tiposValidos = ['entrega', 'retirada'];
const prioridadesValidas = ['normal', 'alta', 'urgente'];

function criar(req, res) {
    try {
        let { cliente, tipo, valor, prioridade } = req.body;

        if (!cliente || typeof cliente !== 'string' || cliente.trim() === '') {
            return res.status(400).json({ erro: 'Cliente é obrigatório e não pode ser vazio.' });
        }
        if (typeof valor !== 'number' || valor <= 0) {
            return res.status(400).json({ erro: 'Valor deve ser numérico e maior que zero.' });
        }
        if (!tiposValidos.includes(tipo)) {
            return res.status(400).json({ erro: 'Tipo de pedido inválido.' });
        }
        if (!prioridadesValidas.includes(prioridade)) {
            return res.status(400).json({ erro: 'Prioridade inválida.' });
        }

        const novoPedido = service.criarPedido({
            cliente: cliente.trim(), tipo, valor, prioridade
        });

        return res.status(201).json(novoPedido);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

function listar(req, res) {
    try {
        return res.status(200).json(service.listarPedidos());
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

function buscar(req, res) {
    try {
        const pedido = service.buscarPorId(req.params.id);
        if (!pedido) {
            return res.status(404).json({ erro: 'Pedido não encontrado.' });
        }
        return res.status(200).json(pedido);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

function atualizarStatus(req, res) {
    try {
        const { status } = req.body;
        if (!status || !service.statusValidos.includes(status)) {
            return res.status(400).json({ erro: 'Status inválido.' });
        }

        const pedidoAtualizado = service.atualizarStatus(req.params.id, status);
        if (!pedidoAtualizado) {
            return res.status(404).json({ erro: 'Pedido não encontrado.' });
        }

        return res.status(200).json(pedidoAtualizado);
    } catch (error) {
        return res.status(500).json({ erro: 'Erro interno do servidor.' });
    }
}

module.exports = { criar, listar, buscar, atualizarStatus };