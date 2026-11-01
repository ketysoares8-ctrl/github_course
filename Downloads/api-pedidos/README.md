# API de Gerenciamento de Pedidos

## Instalação e Execução
1. Faça o clone do repositório.
2. Instale as dependências: `npm install`
3. Inicie o servidor: `npm start`
4. A API ficará disponível em `http://localhost:3000`

## Arquitetura
O projeto utiliza uma arquitetura em camadas (Routes, Controllers, Services) com armazenamento em memória, separando as regras de validação da manipulação de dados.

## Valores Aceites
- **Tipos:** entrega, retirada
- **Prioridades:** normal, alta, urgente
- **Status:** recebido, em_preparacao, enviado, entregue, cancelado

## Uso de IA
Utilizei inteligência artificial (Gemini) para apoiar a criação estrutural e a separação de ficheiros (Controllers e Services). A sugestão de validar o `cliente.trim()` no Controller foi aceite para evitar nomes apenas com espaços em branco.