import StatusButtons from "./StatusButtons";

export default function PedidoCard({ pedido, atualizarStatus, deletarPedido}) {
    const {
        id,
        id_product,
        id_client,
        address,
        quantity,
        status,
        data_pedido,
        data_envio,
        data_entregue,
    } = pedido;
    return (
        <li className="p-4 border-b relative bg-black text-white rounded">
            {/* Botoes de acao */}
            <StatusButtons
                id={id}
                atualizarStatus={(id, novoStatus) => {
                    if (novoStatus === "deletar") {
                        deletarPedido(id);
                    } else {
                        atualizarStatus(id, novoStatus);
                    }
                }}
            />
            {/* Conteuodo */}
            <div className="flex flex-col gap-1">
                <div><strong>Produto:</strong> {id_product}</div>
                <div><strong>Cliente:</strong> {id_client}</div>
                <div><strong>Endereço:</strong> {address}</div>
                <div><strong>Quantidade:</strong> {quantity}</div>
                <div><strong>Data Pedido:</strong> {new Date(data_pedido).toLocaleString()}</div>
                {data_envio && <div><strong>Data Entrega:</strong> {new Date(data_entregue).toLocaleString()}</div>}
            </div>
            {/* Status */}
            <div className="mt-3">
                <div className={`font-semibold ${
                    status === "pendente"
                        ? "text-red-500"
                        : status === "enviado"
                        ? "text-yellow-500"
                        : status === "entregue"
                        ? "text-green-500"
                        : "text-gray-400"
                    }`}>
                    {status}
                </div>
            </div>
        </li>
    );
}