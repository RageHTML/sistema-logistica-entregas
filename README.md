# 📦 Sistema de Logística e Entregas

Este projeto é uma aplicação web completa para gerenciamento de pedidos logísticos, composta por:

- **Backend** em [FastAPI](https://fastapi.tiangolo.com/) com banco de dados **SQLite**
- **Frontend** em [React](https://reactjs.org/) com [TailwindCSS](https://tailwindcss.com/)
- **Dashboard** com gráficos utilizando [Recharts](https://recharts.org/)

---
## 📝 Changelog

Veja todas as alterações feitas no projeto:

➡️ [CHANGELOG.md](./CHANGELOG.md)

## ✨ Funcionalidades

- Novo gerador de pedidos 
- Atualizar status dos pedidos: (icones 📦,🚚,✔️)
  - `pendente` → `enviado` → `entregue`
- Obter todos os pedidos
- Filtrar pedidos por status em abas separadas
- Remover pedidos (ícone de lixeira)
- Visualizar estatísticas em um **painel de dashboard**
- Interface visual limpa e intuitiva

---

## 📁 Estrutura de Pastas

```
/backend
  └── main.py
  └── pedidos.db
/frontend
  └── src/
      └── components/
          └── GerarPedidos.jsx
          └── NavBar.js
          └── PedidoCard.jsx
          └── StatusButtons.jsx
      └── pages/
          └── logistica.js
          └── dashboard.js
```

---

## 🚀 Instalação

### Backend (FastAPI)

1. Acesse a pasta do backend:

```bash
cd backend
```

2. Crie e ative um ambiente virtual (opcional):

```bash
python -m venv venv
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows
```

3. Instale as dependências:

```bash
pip install fastapi uvicorn sqlalchemy
```

4. Inicie o servidor:

```bash
uvicorn main:app --reload
```

- Acesse: [http://localhost:8000](http://localhost:8000)
- Documentação automática: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Frontend (React + Tailwind)

1. Acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie o frontend:

```bash
npm run dev
```

- Acesse: [http://localhost:5173](http://localhost:5173) (ou a porta exibida)

---

## 📊 Dashboard

A aba de **Dashboard** exibe gráficos gerados com base nos dados da base de pedidos (`status`, `quantidade`, `hora`, etc), permitindo uma visão gerencial dos pedidos.

---

## 💡 Futuras Melhorias

- Dashboard mais Profissional
- Paginação e busca por pedidos
- Integração com APIs externas (ex: Mercado Livre)
- Exportar relatórios em PDF/CSV
- Notificações em tempo real (WebSocket)
- Confirmar Envio de Pedidos e Entregas

---

## 🛠 Tecnologias Utilizadas

- [FastAPI](https://fastapi.tiangolo.com/)
- [SQLite](https://www.sqlite.org/)
- [SQLAlchemy](https://www.sqlalchemy.org/)
- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Recharts](https://recharts.org/)
- [Faker](https://v9.fakerjs.dev/)


## 👤 Autor

Desenvolvido por **[Deyvid Martins]**

[![GitHub](https://img.shields.io/badge/GitHub-Perfil-black?logo=github)](https://github.com/RageHTML)

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Perfil-blue?logo=linkedin)](https://www.linkedin.com/in/deyvid-martins-545530352/)

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**.  
Sinta-se livre para usar, modificar e distribuir.

---