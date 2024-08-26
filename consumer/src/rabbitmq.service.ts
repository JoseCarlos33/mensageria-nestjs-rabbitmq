import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { RABBITMQ_QUEUE } from './rabbitmq.constants';

@Injectable()
export class RabbitMQService {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue: RABBITMQ_QUEUE,
        queueOptions: { durable: false },
      },
    });
  }

  emit(pattern: string, data: any) {
    return this.client.emit(pattern, data);
  }

  getClient() {
    return this.client;
  }

  handleOrderPlaced(order: any) {
    console.log(`Received a new order - customer: ${order.email}`);
    //Send email
  }
}
