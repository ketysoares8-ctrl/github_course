let pedidos = [];
let proximoId = 1;

const statusValidos = ['recebido', 'em_preparacao', 'enviado', 'entregue', 'cancelado'];

function criarPedido(dados) {
    const novoPedido = {
        id: proximoId++,
        cliente: dados.cliente,
        tipo: dados.tipo,
        valor: dados.valor,
        prioridade: dados.prioridade,
        status: 'recebido'
    };
    pedidos.push(novoPedido);
    return novoPedido;
}

function listarPedidos() {
    return pedidos;
}

function buscarPorId(id) {
    return pedidos.find(p => p.id === parseInt(id));
}

function atualizarStatus(id, novoStatus) {
    const pedido = buscarPorId(id);
    if (!pedido) return null;

    pedido.status = novoStatus;
    return pedido;
}

module.exports = {
    criarPedido,
    listarPedidos,
    buscarPorId,
    atualizarStatus,
    statusValidos
};