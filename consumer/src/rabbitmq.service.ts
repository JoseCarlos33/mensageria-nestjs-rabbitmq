import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMQService {
  constructor(@Inject('ORDERS_SERVICE') private rabbitClient: ClientProxy) {}

  async handleOrderPlaced(order: any): Promise<boolean> {
    console.log(order);

    setTimeout(() => {
      fetch('http://localhost:3000/orders/order-processed', {
        body: JSON.stringify({
          orderId: order.id,
          status: 'COMPLETED',
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'PATCH',
      });
    }, 2000);
    return true;
  }
}
