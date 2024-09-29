import { Controller } from '@nestjs/common';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';

@Controller()
export class RabbitMQController {
  constructor(private readonly rabbitMQService: RabbitMQService) {}

  @EventPattern('order-placed')
  async handleOrderPlaced(@Payload() order: any) {
    const response = await this.rabbitMQService.handleOrderPlaced(order);

    return response;
  }

  @MessagePattern({ cmd: 'fetch-orders' })
  getOrders(@Ctx() context: RmqContext) {
    console.log(context.getMessage());
  }
}
