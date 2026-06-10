import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import OrderCard from "../components/OrderCard";
import GenerateNewOrder from "../components/GenerateNewOrder";

export default function Home() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    GetOrders();
  }, []);

  const GetOrders = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/pedidos/");
      if (res.ok) {
        const data = await res.json();
        setPedidos(data);
      }
    } catch (error) {
      console.error("Erro ao buscar pedidos:", error);
    }
  };

  const GenerateNewOrderForBD = async (Order) => {
    try {
      await fetch("http://127.0.0.1:8000/api/pedidos/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Order),
      });
      GetOrders();
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
    }
  };

  const OrderDelete = async (id) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/pedidos/${id}/`, {
        method: "DELETE",
      });
      GetOrders();
    } catch (error) {
      console.error("Erro ao deletar pedido:", error);
    }
  };

  const actualizarStatus = async (id, novoStatus) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/pedidos/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ p_status: novoStatus }),
      }); 
      GetOrders();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 antialiased selection:bg-blue-500 selection:text-white">
      <NavBar />
      
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-800 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Painel de Logística e Entregas
            </h1>
            <p className="text-sm text-gray-400 mt-1">Gerencie fluxos, despache cargas e monitore o status em tempo real.</p>
          </div>
          <div className="flex items-center gap-3">
            <GenerateNewOrder onCriar={GenerateNewOrderForBD} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          
          <div className="bg-gray-900/40 rounded-2xl p-4 border border-gray-800/60 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-base font-bold text-amber-400 flex items-center gap-2">
                <span>📦</span> Pedidos Pendentes
              </h2>
              <span className="bg-amber-400/10 text-amber-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-amber-400/20">
                {pedidos.filter((p) => p.p_status?.toLowerCase() === "pendente").length}
              </span>
            </div>
            <ul className="flex flex-col gap-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-1 custom-scrollbar">
              {pedidos
                .filter((p) => p.p_status?.toLowerCase() === "pendente")
                .map((p) => (
                  <OrderCard key={p.id} order={p} atualizarStatus={actualizarStatus} OrderDelete={OrderDelete} />
                ))}
            </ul>
          </div>

          <div className="bg-gray-900/40 rounded-2xl p-4 border border-gray-800/60 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-base font-bold text-blue-400 flex items-center gap-2">
                <span>🚚</span> Pedidos Enviados
              </h2>
              <span className="bg-blue-400/10 text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-blue-400/20">
                {pedidos.filter((p) => p.p_status?.toLowerCase() === "enviado").length}
              </span>
            </div>
            <ul className="flex flex-col gap-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-1 custom-scrollbar">
              {pedidos
                .filter((p) => p.p_status?.toLowerCase() === "enviado")
                .map((p) => (
                  <OrderCard key={p.id} order={p} atualizarStatus={actualizarStatus} OrderDelete={OrderDelete} />
                ))}
            </ul>
          </div>

          <div className="bg-gray-900/40 rounded-2xl p-4 border border-gray-800/60 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4 px-1">
              <h2 className="text-base font-bold text-green-400 flex items-center gap-2">
                <span>✅</span> Pedidos Entregues
              </h2>
              <span className="bg-green-400/10 text-green-400 text-xs font-semibold px-2.5 py-0.5 rounded-full border border-green-400/20">
                {pedidos.filter((p) => p.p_status?.toLowerCase() === "entregue").length}
              </span>
            </div>
            <ul className="flex flex-col gap-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-1 custom-scrollbar">
              {pedidos
                .filter((p) => p.p_status?.toLowerCase() === "entregue")
                .map((p) => (
                  <OrderCard key={p.id} order={p} atualizarStatus={actualizarStatus} OrderDelete={OrderDelete} />
                ))}
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}