# 📦 Changelog

Todas as mudanças importantes neste projeto serão documentadas aqui.

## [1.0.0] - 14-07-2025

### Adicionado
- Formatação de preços no componente `PedidoCard` utilizando `Intl.NumberFormat`, exibindo
valores no formato de moeda brasileira (ex: R$ 123,45).
- Gerador de pedidos com dados realistas (UUIDs, nomes falsos, endereços, etc).
- Componentes reutilizáveis: `<BotaoStatus />` e `<ConteudoPedido />`.
- Separação e organização do código React em componentes.

### Alterado
- Atualização da rota `/pedidos/{id}` para registrar `data_envio` e `data_entregue` com base no novo `status`.
- Correção de bug no frontend causado por `https://localhost` → trocado para `http://localhost`.

### Removido
- Campos desnecessários do antigo formulário de pedidos.
- Banco de dados antigo (removido manualmente para aplicar nova estrutura).
