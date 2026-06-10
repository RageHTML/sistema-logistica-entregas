export default function StatusButtons({ id, atualizarStatus }) {
  const statusList = [
    { label: "📦", status: "pendente", title: "Marcar como Pendente" },
    { label: "🚚", status: "enviado", title: "Marcar como Enviado" },
    { label: "✔️", status: "entregue", title: "Marcar como Entregue" },
  ];

  return (
    <div className="absolute top-2 right-2 flex items-center gap-2">
      {statusList.map((item) => (
        <button
          key={item.status}
          onClick={() => atualizarStatus(id, item.status)}
          title={item.title}
          className="hover:scale-125 transition-transform"
        >
          {item.label}
        </button>
      ))}
      <button 
        onClick={() => atualizarStatus(id, "deletar")} 
        title="Deletar Pedido"
        className="hover:scale-125 transition-transform text-red-500"
      >
        🗑️
      </button>
    </div>
  );
}