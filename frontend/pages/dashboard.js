import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend, ResponsiveContainer, AreaChart, Area,
} from "recharts";

const COLORS = ["#facc15", "#3b82f6", "#10b981"];

export default function Dashboard() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/pedidos/")
      .then((res) => res.json())
      .then(setPedidos)
      .catch((err) => console.error("Erro ao buscar dados do Dashboard:", err));
  }, []);

  const totalPedidos = pedidos.length;
  const faturamentoTotal = pedidos.reduce((acc, p) => acc + Number(p.p_prc || 0), 0);
  const ticketMedio = totalPedidos > 0 ? faturamentoTotal / totalPedidos : 0;

  const statusData = [
    { name: "Pendente", value: pedidos.filter(p => p.p_status?.toLowerCase() === "pendente").length },
    { name: "Enviado", value: pedidos.filter(p => p.p_status?.toLowerCase() === "enviado").length },
    { name: "Entregue", value: pedidos.filter(p => p.p_status?.toLowerCase() === "entregue").length },
  ];

  const rawClientes = pedidos.reduce((acc, p) => {
    if (!p.id_client) return acc;
    acc[p.id_client] = (acc[p.id_client] || 0) + 1;
    return acc;
  }, {});

  const pedidosPorCliente = Object.entries(rawClientes)
    .map(([id, total], index) => ({
      name: `Cliente ${index + 1}`,
      total: total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const rawFaturamentoPorData = pedidos.reduce((acc, p) => {
    if (!p.p_od) return acc;
    const dataApenas = p.p_od.split(" ")[0]; 
    acc[dataApenas] = (acc[dataApenas] || 0) + Number(p.p_prc || 0);
    return acc;
  }, {});

  const faturamentoPorData = Object.entries(rawFaturamentoPorData)
    .map(([dataRaw, faturamento]) => {
      const [ano, mes, dia] = dataRaw.split("-");
      return {
        dataOrdenacao: new Date(ano, mes - 1, dia),
        data: `${dia}/${mes}`,
        faturamento: faturamento,
      };
    })
    .sort((a, b) => a.dataOrdenacao - b.dataOrdenacao);

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 antialiased">
      <NavBar />

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
        
        <div className="border-b border-gray-800 pb-6 mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
            📊 Dashboard Analítico
          </h1>
          <p className="text-sm text-gray-400 mt-1">Dados de performance, faturamento e logística volumétrica.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/60 backdrop-blur-sm">
            <p className="text-sm font-medium text-gray-400">Volume Total de Pedidos</p>
            <p className="text-3xl font-bold mt-2 text-white">{totalPedidos}</p>
          </div>
          <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/60 backdrop-blur-sm">
            <p className="text-sm font-medium text-gray-400">Faturamento Bruto</p>
            <p className="text-3xl font-bold mt-2 text-green-400">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(faturamentoTotal)}
            </p>
          </div>
          <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/60 backdrop-blur-sm">
            <p className="text-sm font-medium text-gray-400">Ticket Médio por Pedido</p>
            <p className="text-3xl font-bold mt-2 text-blue-400">
              {new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(ticketMedio)}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/60 backdrop-blur-sm lg:col-span-1">
            <h2 className="text-base font-bold text-gray-200 mb-4">Divisão por Status</h2>
            <div className="h-64 flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={statusData} dataKey="value" nameKey="name" outerRadius={75} fill="#8884d8" label>
                    {statusData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#374151", color: "#fff" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/60 backdrop-blur-sm lg:col-span-2">
            <h2 className="text-base font-bold text-gray-200 mb-4">Top Clientes (Volume)</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={pedidosPorCliente}>
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} allowDecimals={false} />
                  <Tooltip contentStyle={{ backgroundColor: "#111827", borderColor: "#374151", color: "#fff" }} />
                  <Bar dataKey="total" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        <div className="bg-gray-900/40 p-6 rounded-2xl border border-gray-800/60 backdrop-blur-sm">
          <h2 className="text-base font-bold text-gray-200 mb-4">Evolução do Faturamento Diário</h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={faturamentoPorData}>
                <XAxis dataKey="data" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#111827", borderColor: "#374151", color: "#fff" }}
                  formatter={(value) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value)}
                />
                <Area type="monotone" dataKey="faturamento" stroke="#10b981" fillOpacity={0.1} fill="#10b981" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

      </main>
    </div>
  );
}