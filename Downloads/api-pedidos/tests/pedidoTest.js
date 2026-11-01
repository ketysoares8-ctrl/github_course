const request = require('supertest');
const app = require('../src/index');

describe('API de Gerenciamento de Pedidos', () => {
    let pedidoIdCriado;

    // Teste de Criação (RF01)
    it('Deve criar um pedido válido e retornar HTTP 201', async () => {
        const resposta = await request(app)
            .post('/pedidos')
            .send({
                cliente: "Ketly Soares",
                tipo: "entrega",
                valor: 350,
                prioridade: "normal"
            });

        expect(resposta.statusCode).toBe(201);
        expect(resposta.body).toHaveProperty('id');
        expect(resposta.body.status).toBe('recebido');

        pedidoIdCriado = resposta.body.id; // Guarda o ID para os testes seguintes
    });

    it('Deve retornar HTTP 400 ao tentar criar pedido sem cliente', async () => {
        const resposta = await request(app)
            .post('/pedidos')
            .send({
                cliente: "",
                tipo: "entrega",
                valor: 350,
                prioridade: "normal"
            });

        expect(resposta.statusCode).toBe(400);
        expect(resposta.body).toHaveProperty('erro');
    });

    // Teste de Listagem (RF02)
    it('Deve listar os pedidos cadastrados e retornar HTTP 200', async () => {
        const resposta = await request(app).get('/pedidos');

        expect(resposta.statusCode).toBe(200);
        expect(Array.isArray(resposta.body)).toBeTruthy();
        expect(resposta.body.length).toBeGreaterThan(0);
    });

    // Teste de Consulta Específica (RF03)
    it('Deve retornar HTTP 200 ao buscar um pedido existente', async () => {
        const resposta = await request(app).get(`/pedidos/${pedidoIdCriado}`);

        expect(resposta.statusCode).toBe(200);
        expect(resposta.body.id).toBe(pedidoIdCriado);
    });

    it('Deve retornar HTTP 404 ao buscar um pedido inexistente', async () => {
        const resposta = await request(app).get('/pedidos/9999');

        expect(resposta.statusCode).toBe(404);
    });

    // Teste de Atualização de Status (RF04)
    it('Deve atualizar o status do pedido e retornar HTTP 200', async () => {
        const resposta = await request(app)
            .patch(`/pedidos/${pedidoIdCriado}/status`)
            .send({ status: "em_preparacao" });

        expect(resposta.statusCode).toBe(200);
        expect(resposta.body.status).toBe('em_preparacao');
    });

    it('Deve retornar HTTP 400 ao tentar atualizar com status inválido', async () => {
        const resposta = await request(app)
            .patch(`/pedidos/${pedidoIdCriado}/status`)
            .send({ status: "status_inexistente" });

        expect(resposta.statusCode).toBe(400);
    });
});