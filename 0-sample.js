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


function validarCarrinho(order){
  if (!order.items || order.items.length === 0) { // verificar itens no carrinho 
    console.log('Erro: Pedido sem itens');
    return false;
  }
  return true;
}


function validarEndereco(order){
  if (!order.deliveryAddress) { // verificarEndereço
    console.log('Erro: Endereço de entrega não fornecido');
    return false;
  }
return true;
}


function calcularSubtotal(order){
  let subtotal = 0; //valor subtotal do item
  for (let item of order.items) {
    subtotal += item.price * item.quantity;
  }
  return subtotal;
}


function calcularDesconto(order, subtotal){
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
  return discount;
}

function calcularFrete(order, subtotal){
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
  if (subtotal > 50) {
    deliveryFee = 0;
    console.log('Entrega grátis para pedidos acima de R$ 50');
}
  
  return deliveryFee;
}

function calcularTaxaDeServico(subtotal){
  const serviceFee = subtotal * 0.05; // taxa de serviço
  return serviceFee;
}

function calcularTotal(subtotal,discount,deliveryFee,serviceFee){
   const total = subtotal - discount + deliveryFee + serviceFee; // total do pedido sera o valor do subtotal + frete + taxa de serviço
  return total;
}

function atualizarEstoque(order){

  for (let item of order.items) {
    console.log(`Reduzindo estoque do item ${item.id} em ${item.quantity} unidades`); //atualiza o estoque dos itens vendidos
  }
}

function criarPedido(order,subtotal,discount,deliveryFee,serviceFee,total){
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
  return orderRecord;
}


  function registraPedido(orderRecord){
    console.log('Pedido registrado no banco de dados:', orderRecord.id);
  }

  function enviarNotificacaoRestaurante(order){
    console.log(`Notificação enviada ao restaurante ${order.restaurantId}`); // envia para o restarante
    console.log('Restaurante recebeu novo pedido');
  }

  function enviarNotificacaoCliente(order){
    console.log(`Email de confirmação enviado para ${order.customerEmail}`); //cliente recebe a confirmação
    console.log(`SMS enviado para ${order.customerPhone}`);
  }

  function adicionarFilaEntrega(){
    console.log(`Pedido adicionado à fila de entrega`);
    console.log(`Entregador será atribuído em breve`);
  }

  function atualizarHistorico(order){
  console.log(`Histórico de compras do cliente ${order.customerId} atualizado`); // atualiza historico e compras do cliente
  }

  function enviarDadosRecomendacoes(order){
    console.log(`Dados do pedido enviados para sistema de recomendações`);
  }
 
  function processarPedido(orderRecord){
    console.log(`Pedido ${orderRecord.id} processado com sucesso`);
  }

  function totalPedido(total){
    console.log(`Total: R$ ${total.toFixed(2)}`);
  }

  




function processiFoodOrder(order) {

  const restauranteValido = validarRestaurante(order);
  if(!restauranteValido){
    return null;
  }


  const clienteValido = validarCliente(order);
  if(!clienteValido){
    return null;
  }


  const carrinhoValido = validarCarrinho(order);
  if(!carrinhoValido) {
    return null;
  }

  const enderecoValido = validarEndereco(order);
  if(!enderecoValido){
    return null;
  }

  const subtotal = calcularSubtotal(order);

  const discount = calcularDesconto(order,subtotal); // precisou criar mais um parametro, pois a porpia estrutura do codigo tinha subtotal envolvido

  const deliveryFee = calcularFrete(order,subtotal);
  
  const serviceFee = calcularTaxaDeServico(subtotal);

  const total = calcularTotal(subtotal,discount,deliveryFee,serviceFee);

  const orderRecord = criarPedido(order, subtotal, discount, deliveryFee, serviceFee, total);
  
  atualizarEstoque(order); // não precisa de const! pois não esta retornando nada. apenas atualizando o estoque
 
  registraPedido(orderRecord);

  enviarNotificacaoRestaurante(order);

  enviarNotificacaoCliente(order);

  adicionarFilaEntrega();

  atualizarHistorico(order);

  enviarDadosRecomendacoes(order);
 
  processarPedido(orderRecord);

  totalPedido(total);


  




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
}

}

console.log('=== PROCESSANDO PEDIDO DO IFOOD ===\n');
const result = processiFoodOrder(iFoodOrder);
console.log('\n=== RESULTADO ===');
console.log(result);


