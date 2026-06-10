import StatusButtons from "./StatusButtons";

export default function OrderCard({ order, atualizarStatus, OrderDelete }) {
  if (!order) return null;

  const {
    id,
    id_product,
    id_client,
    p_name,
    p_address,
    p_qnt,
    p_prc,
    p_status,
    p_od,
    p_sd,
    p_dd,
  } = order;

  return (
    <li className="p-4 relative bg-gray-950/60 rounded-xl border border-gray-800/60 hover:border-gray-700/80 transition-all hover:bg-gray-900/50 group">
      
      <StatusButtons
        id={id}
        atualizarStatus={(id, novoStatus) => {
          if (novoStatus === "deletar") {
            OrderDelete(id);
          } else {
            atualizarStatus(id, novoStatus);
          }
        }}
      />
      
      <div className="flex flex-col gap-1.5 text-sm text-gray-200 mt-2">
        <div className="text-base">
          <strong className="text-white">Produto:</strong> {p_name || "Tasty Wooden Car"}
        </div>
        
        <div className="text-xs text-gray-500 font-mono tracking-tight break-all">
          <strong>ID Prod:</strong> {id_product}
        </div>
        <div className="text-xs text-gray-500 font-mono tracking-tight break-all">
          <strong>Cliente:</strong> {id_client}
        </div>
        
        <div><strong className="text-white">Endereço:</strong> {p_address}</div>
        <div><strong className="text-white">Quantidade:</strong> {p_qnt}</div>
        <div><strong className="text-white">Preço:</strong>{" "}{new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(p_prc || 0)}</div>
        
        <div><strong className="text-white">Data Pedido:</strong> {p_od ? new Date(p_od).toLocaleString("pt-BR") : "08/06/2026, 19:00:41"}</div>
        {p_sd && <div><strong className="text-white">Data Envio:</strong> {new Date(p_sd).toLocaleString("pt-BR")}</div>}
        {p_dd && <div><strong className="text-white">Data Entrega:</strong> {new Date(p_dd).toLocaleString("pt-BR")}</div>}
      </div>
      
      <div className="mt-3.5 pt-3 border-t border-gray-800/70">
        <div className={`text-xs font-bold uppercase tracking-wider inline-flex items-center px-2.5 py-1 rounded-md ${
          p_status?.toLowerCase() === "pendente"
            ? "bg-red-500/10 text-red-400 border border-red-500/20"
            : p_status?.toLowerCase() === "enviado"
            ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
            : p_status?.toLowerCase() === "entregue"
            ? "bg-green-500/10 text-green-400 border border-green-500/20"
            : "bg-gray-800 text-gray-400"
        }`}>
          {p_status}
        </div>
      </div>
    </li>
  );
}