import { faker } from "@faker-js/faker";

export default function GeradorPedido({ onCriar }) {
  const gerar = () => {
    const pedido = {
      id_client: faker.string.uuid(),
      id_product: faker.string.uuid(),
      quantity: faker.number.int({ min: 1, max: 5 }),
      address: faker.location.streetAddress(),
      status: "pendente", // ou "enviado", etc.
      data_pedido: new Date().toISOString(),
      data_envio: null,
      data_entregue: null,
    };
    onCriar(pedido);
  };

  return (
    <button
      className="bg-blue-600 text-white p-2 rounded mb-4 left-2"
      onClick={gerar}
    >
      Gerar Pedido Realista
    </button>
  );
}
