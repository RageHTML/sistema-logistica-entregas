import NavBar from "@/components/NavBar";
import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, Legend,
} from "recharts";

const COLORS = ["#facc15", "#3b82f6", "#10b981"]; // amarelo, azul, verde

export default function Dashboard() {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/pedidos")
      .then((res) => res.json())
      .then(setPedidos);
  }, []);

  // Processar dados para o gráfico de status
  const statusData = [
    { name: "Pendente", value: pedidos.filter(p => p.status === "pendente").length },
    { name: "Enviado", value: pedidos.filter(p => p.status === "enviado").length },
    { name: "Entregue", value: pedidos.filter(p => p.status === "entregue").length },
  ];

  // Gráfico de pedidos por cliente (simplificado)
  const pedidosPorCliente = Object.values(
    pedidos.reduce((acc, p) => {
      acc[p.id_client] = acc[p.id_client] || { name: p.id_client, total: 0 };
      acc[p.id_client].total += 1;
      return acc;
    }, {})
  );

  return (
    <div className="p-6 max-w-4xl mx-auto">
        <NavBar/>
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard de Pedidos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Gráfico de Pizza: Status dos pedidos */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Pedidos por Status</h2>
          <PieChart width={300} height={250}>
            <Pie
              data={statusData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {statusData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* Gráfico de Barras: Pedidos por cliente */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Pedidos por Cliente</h2>
          <BarChart width={350} height={250} data={pedidosPorCliente}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#3b82f6" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}
