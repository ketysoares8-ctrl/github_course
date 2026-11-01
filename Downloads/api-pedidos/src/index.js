const express = require('express');
const pedidoRoutes = require('./routes/pedidoRoutes');

const app = express();

app.use(express.json());
app.use(pedidoRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor a correr na porta ${PORT}`);
    if (require.main === module) {
        app.listen(PORT, () => {
            console.log(`Servidor a correr na porta ${PORT}`);
        });
    }

    module.exports = app;
});