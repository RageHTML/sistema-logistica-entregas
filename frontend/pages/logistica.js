import { useEffect, useState } from "react";
import NavBar from "../components/NavBar"
import StatusButtons from "../components/StatusButtons";
import PedidoCard from "../components/PedidoCard";
import GeradorPedido from "../components/GerarPedidos";

export default function Home() {
  const [id_client, setIdClient] = useState("");
  const [id_product, setIdProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [address, setAddress] = useState("");
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    buscarPedidos();
  }, []);

  const buscarPedidos = async () => {
    const res = await fetch("http://localhost:8000/pedidos");
    const data = await res.json();
    setPedidos(data);
  };

  const deletarPedido = async (id) => {
    await fetch(`http://localhost:8000/pedidos/${id}`, {
      method: "DELETE",
    });
    buscarPedidos();
  };

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
      <GeradorPedido onCriar={async (pedido) => {
        await fetch("http://localhost:8000/pedidos", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify(pedido),
        });
        buscarPedidos()
      }} />
      {/* Barra de Navagecao */}
      <div className="fixed bottom-4 right-4 flex flex-col items-end gap-3 z-50">
        <a href="#pendentes" className="flex items-center gap-2 text-white hover:text-red-600"><strong>📦 Pendentes</strong></a>
        <a href="#enviados" className="flex items-center gap-2 text-white hover:text-yellow-500"><strong>🚚 Enviados</strong></a>
        <a href="#entregues" className="flex items-center gap-2 text-white hover:text-green-500"><strong>✅ Entregues</strong></a>
      </div>
      <h1 className="text-center text-2xl font-bold mb-4">Painel de Logística e Entregas</h1>
      {/* Pedidos Pendentes */}
      <h2 id="pendentes" className="text-xl font-semibold mb-2">📦 Pedidos Pendentes</h2>
      <ul className="mb-6 border rounded-4x">
        {pedidos
          .filter((p) => p.status === "pendente")
          .map((p) => (
            <PedidoCard
              key={p.id}
              pedido={p}
              atualizarStatus={atualizarStatus}
              deletarPedido={deletarPedido}
            />
          ))}
      </ul>
      {/* Pedidos Enviados */}
      <h2 id="enviados" className="text-xl font-semibold mb-2">🚚 Pedidos Enviados</h2>
      <ul className="border rounded">
        {pedidos
          .filter((p) => p.status === "enviado")
          .map((p) => (
            <PedidoCard
              key={p.id}
              pedido={p}
              atualizarStatus={atualizarStatus}
              deletarPedido={deletarPedido}
            />
          ))}
      </ul>
      {/* Pedidos Entregues */}
      <h2 id="entregues" className="text-xl font-semibold mb-2">✔️ Pedidos Entregue</h2>
      <ul className="border rounded">
        {pedidos
          .filter((p) => p.status === "entregue")
          .map((p) => (
            <PedidoCard
              key={p.id}
              pedido={p}
              atualizarStatus={atualizarStatus}
              deletarPedido={deletarPedido}
            />
          ))}
      </ul>
    </div>
  );
}
