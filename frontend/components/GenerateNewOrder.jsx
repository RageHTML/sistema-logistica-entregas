import { faker } from "@faker-js/faker";

export default function GenerateNewOrder({ onCriar }) {
  const NewOrder = () => {
    const Order = {
      id_client: faker.string.uuid(),
      id_product: faker.string.uuid(),
      p_name: faker.commerce.productName(),
      p_qnt: faker.number.int({ min: 1, max: 5 }),
      p_prc: parseInt(faker.commerce.price({ min: 10, max: 500 })),
      p_address: faker.location.streetAddress(),
      p_status: "pendente", 
    };
    onCriar(Order);
  };

  return (
    <button
      className="bg-blue-600 text-white p-2 rounded mb-4 left-2"
      onClick={NewOrder}
    >
      Gerar Pedido Realista
    </button>
  );
}
