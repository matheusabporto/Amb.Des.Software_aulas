function validarRestaurante(order) {
  if (!order.restaurantId) { // autenticarRestaurante
    console.log('Erro: Restaurante não identificado');
    return false;
  }
  return true;
}


function validarCliente(order){
  if (!order.customerId) { // autenticarCliente
    console.log('Erro: Cliente não identificado');
    return false;
  }
  return true;
}






function processiFoodOrder(order) {

  const restauranteValido = validarRestaurante(order);

  const clienteValido = validarCliente(order);

  

  if (!order.items || order.items.length === 0) { // verificar itens no carrinho 
    console.log('Erro: Pedido sem itens');
    return null;
  }

  if (!order.deliveryAddress) { // verificarEndereço
    console.log('Erro: Endereço de entrega não fornecido');
    return null;
  }

  let subtotal = 0; //valor subtotal do item
  for (let item of order.items) {
    subtotal += item.price * item.quantity;
  }

  let discount = 0;
  if (order.couponCode) { //adicina possibilidade de desconto, podendo variar nas %
    if (order.couponCode === 'IFOOD10') {
      discount = subtotal * 0.10;
      console.log('Cupom IFOOD10 aplicado: 10% de desconto');
    } else if (order.couponCode === 'PRIMEIRACOMPRA') {
      discount = subtotal * 0.15;
      console.log('Cupom PRIMEIRACOMPRA aplicado: 15% de desconto');
    }
  }

  let deliveryFee = 0; // calcula o preço do frete baseado na distancia de entrega
  const distance = order.deliveryAddress.distance || 5; // caso nao exista, o valor do frete é 5

  if (distance <= 2) {
    deliveryFee = 5;
  } else if (distance <= 5) {
    deliveryFee = 8;
  } else if (distance <= 10) {
    deliveryFee = 12;
  } else {
    deliveryFee = 15;
  }

  if (subtotal > 50) { // tira o valor do frete  para pedidos acima de 50
    deliveryFee = 0;
    console.log('Entrega grátis para pedidos acima de R$ 50');
  }

  const serviceFee = subtotal * 0.05; // taxa de serviço

  const total = subtotal - discount + deliveryFee + serviceFee; // total do pedido sera o valor do subtotal + frete + taxa de serviço

  for (let item of order.items) {
    console.log(`Reduzindo estoque do item ${item.id} em ${item.quantity} unidades`); //atualiza o estoque dos itens vendidos
  }

  const orderRecord = { //cria um recibo do pedido/abre instancia de um pedido - envia para o restarante  cliente recebe a confirmação
    id: `IFOOD-${Date.now()}`,
    restaurantId: order.restaurantId,
    customerId: order.customerId,
    items: order.items,
    subtotal,
    discount,
    deliveryFee,
    serviceFee,
    total,
    status: 'confirmed',
    createdAt: new Date()
  };

  console.log('Pedido registrado no banco de dados:', orderRecord.id);

  console.log(`Notificação enviada ao restaurante ${order.restaurantId}`); // envia para o restarante
  console.log('Restaurante recebeu novo pedido');

  console.log(`Email de confirmação enviado para ${order.customerEmail}`); //cliente recebe a confirmação
  console.log(`SMS enviado para ${order.customerPhone}`);

  console.log(`Pedido adicionado à fila de entrega`);
  console.log(`Entregador será atribuído em breve`);

  console.log(`Histórico de compras do cliente ${order.customerId} atualizado`); // atualiza historico e compras do cliente

  console.log(`Dados do pedido enviados para sistema de recomendações`);

  console.log(`Pedido ${orderRecord.id} processado com sucesso`);
  console.log(`Total: R$ ${total.toFixed(2)}`);

  return orderRecord;
}

const iFoodOrder = { // ordem do pedido contendo os dados
  restaurantId: 'rest-123',
  customerId: 'cust-456',
  customerEmail: 'cliente@example.com',
  customerPhone: '11999999999',
  couponCode: 'IFOOD10',
  items: [
    { id: 'item-1', name: 'Hambúrguer', price: 25, quantity: 2 },
    { id: 'item-2', name: 'Refrigerante', price: 8, quantity: 2 },
    { id: 'item-3', name: 'Batata Frita', price: 12, quantity: 1 }
  ],
  deliveryAddress: {
    street: 'Rua das Flores',
    number: '123',
    city: 'São Paulo',
    distance: 4
  }
};

console.log('=== PROCESSANDO PEDIDO DO IFOOD ===\n');
const result = processiFoodOrder(iFoodOrder);
console.log('\n=== RESULTADO ===');
console.log(result);
