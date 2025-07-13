import { useEffect, useState } from "react";
import NavBar from "../components/NavBar"
// logitica page
export default function Home() {
  // Estados para o formulário de novo pedido
  const [id_client, setIdClient] = useState("");
  const [id_product, setIdProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");

  // Lista de pedidos
  const [pedidos, setPedidos] = useState([]);

  // Buscar os pedidos ao carregar a página
  useEffect(() => {
    buscarPedidos();
  }, []);

  const buscarPedidos = async () => {
    const res = await fetch("http://localhost:8000/pedidos");
    const data = await res.json();
    setPedidos(data);
  };

  // Criar novo pedido
  const criarPedido = async () => {
    await fetch("http://localhost:8000/pedidos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_client,
        id_product,
        quantity: Number(quantity),
        address,
        status: "pendente",
      }),
    });
    buscarPedidos(); // Atualiza a lista
  };

  // Remover Pedidos
  const deletarPedido = async (id) => {
    await fetch(`http://localhost:8000/pedidos/${id}`, {
      method: "DELETE",
    });
    buscarPedidos();
  };

  // Atualizar status do pedido (ex: de pendente → entregue)
  const atualizarStatus = async (id, novoStatus) => {
    await fetch(`http://localhost:8000/pedidos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: novoStatus }),
    });
    buscarPedidos();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <NavBar/>
      {/* Barra de Navagecao */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end gap-3 z-50">
        <a href="#pendentes" className="flex items-center gap-2 text-white hover:text-red-600"><strong>📦 Pendentes</strong></a>
        <a href="#enviados" className="flex items-center gap-2 text-white hover:text-yellow-500"><strong>🚚 Enviados</strong></a>
        <a href="#entregues" className="flex items-center gap-2 text-white hover:text-green-500"><strong>✅ Entregues</strong></a>
      </div>
      <h1 className="text-center text-2xl font-bold mb-4">Painel de Logística e Entregas</h1>
      {/* Formulário de novo pedido */}
      <div className="mb-6 grid grid-cols-2 gap-2">
        <input
          placeholder="ID do Cliente"
          className="border p-2"
          value={id_client}
          onChange={(e) => setIdClient(e.target.value)}
        />
        <input
          placeholder="ID do Produto"
          className="border p-2"
          value={id_product}
          onChange={(e) => setIdProduct(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantidade"
          className="border p-2"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
        <input
          placeholder="Endereço"
          className="border p-2"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <button
          className="bg-green-600 text-white col-span-2 p-2"
          onClick={criarPedido}
        >
          Criar Pedido
        </button>
      </div>

      {/* Exibição dos pedidos */}
      <h2 id="pendentes" className="text-xl font-semibold mb-2">📦 Pedidos Pendentes</h2>
      <ul className="mb-6 border rounded-4x">
        {pedidos
          .filter((p) => p.status === "pendente")
          .map((p) => (
            <li key={p.id} className="p-4 border-b relative bg-black text-white rounded">
              <div className="absolute top-2 right-2 flex items-center gap-2">
                {/* Botao Lixeira */}
                <button
                  onClick={() => deletarPedido(p.id)}
                  title="Deletar pedido"
                >
                  🗑️
                </button>
                {/* Botao Pendente */}
                <button
                  onClick={() => atualizarStatus(p.id, "pendente")}
                  title="Marcar como Pendente"
                >
                  📦
                </button>
                {/* Botao Enviar */}
                <button
                  onClick={() => atualizarStatus(p.id, "enviado")}
                  title="Marcar como Enviado"
                >
                  🚚
                </button>
                {/* Botao Entregue */}
                <button
                  onClick={() => atualizarStatus(p.id, "entregue")}
                  title="Marcar como Entregue"
                >
                  ✔️
                </button> 
              </div>
              {/* Conteudo do Pedido */}
              <div className="flex flex-col gap-1">
                <div><strong>Produto:</strong> {p.id_product}</div>
                <div><strong>Cliente:</strong> {p.id_client}</div>
                <div><strong>Endereço:</strong> {p.address}</div>
                <div><strong>Quantidade:</strong> {p.quantity}</div>
                <div><strong>Data:</strong> {new Date(p.hora).toLocaleString()}</div>
              </div>
              {/* Status do pedido */}
              <div className="mt-3">
                <div className="text-red-600 font-semibold">{p.status}</div>
              </div>
            </li>
          ))}
      </ul>

      <h2 id="enviados" className="text-xl font-semibold mb-2">🚚 Pedidos Enviados</h2>
      <ul className="border rounded">
        {pedidos
          .filter((p) => p.status === "enviado")
          .map((p) => (
            <li key={p.id} className="p-4 border-b relative bg-black text-white rounded">
              <div className="absolute top-2 right-2 flex items-center gap-2">
                {/* Botao Lixeira */}
                <button
                  onClick={() => deletarPedido(p.id)}
                  title="Deletar pedido"
                >
                  🗑️
                </button>
                {/* Botao Pendente */}
                <button
                  onClick={() => atualizarStatus(p.id, "pendente")}
                  title="Marcar como Pendente"
                >
                  📦
                </button>
                {/* Botao Enviar */}
                <button
                  onClick={() => atualizarStatus(p.id, "enviado")}
                  title="Marcar como Enviado"
                >
                  🚚
                </button>
                {/* Botao Entregue */}
                <button
                  onClick={() => atualizarStatus(p.id, "entregue")}
                  title="Marcar como Entregue"
                >
                  ✔️
                </button> 
              </div>
              {/* Conteudo do Pedido */}
              <div className="flex flex-col gap-1">
                <div><strong>Produto:</strong> {p.id_product}</div>
                <div><strong>Cliente:</strong> {p.id_client}</div>
                <div><strong>Endereço:</strong> {p.address}</div>
                <div><strong>Quantidade:</strong> {p.quantity}</div>
                <div><strong>Data:</strong> {new Date(p.hora).toLocaleString()}</div>
              </div>
              {/* Status do pedido */}
              <div className="mt-3">
                <div className="text-yellow-500 font-semibold">{p.status}</div>
              </div>
            </li>
          ))}
      </ul>

      {/* Pedidos Enviado */}
      <h2 id="entregues" className="text-xl font-semibold mb-2">✔️ Pedidos Entregue</h2>
      <ul className="border rounded">
        {pedidos
          .filter((p) => p.status === "entregue")
          .map((p) => (
            <li key={p.id} className="p-4 border-b relative bg-black text-white rounded">
              <div className="absolute top-2 right-2 flex items-center gap-2">
                {/* Botao Lixeira */}
                <button
                  onClick={() => deletarPedido(p.id)}
                  title="Deletar pedido"
                >
                  🗑️
                </button>
                {/* Botao Pendente */}
                <button
                  onClick={() => atualizarStatus(p.id, "pendente")}
                  title="Marcar como Pendente"
                >
                  📦
                </button>
                {/* Botao Enviar */}
                <button
                  onClick={() => atualizarStatus(p.id, "enviado")}
                  title="Marcar como Enviado"
                >
                  🚚
                </button>
                {/* Botao Entregue */}
                <button
                  onClick={() => atualizarStatus(p.id, "entregue")}
                  title="Marcar como Entregue"
                >
                  ✔️
                </button> 
              </div>
              {/* Conteudo do Pedido */}
              <div className="flex flex-col gap-1">
                <div><strong>Produto:</strong> {p.id_product}</div>
                <div><strong>Cliente:</strong> {p.id_client}</div>
                <div><strong>Data:</strong> {new Date(p.hora).toLocaleString()}</div>
              </div>
              {/* Hora e Data */}
              
              {/* Status do pedido */}
              <div className="mt-3">
                <div className="text-green-500 font-semibold">{p.status}</div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
