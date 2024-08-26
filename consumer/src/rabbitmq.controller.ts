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
  handleOrderPlaced(@Payload() order: any) {
    return this.rabbitMQService.handleOrderPlaced(order);
  }

  @MessagePattern({ cmd: 'fetch-orders' })
  getOrders(@Ctx() context: RmqContext) {
    console.log(context.getMessage());
  }
}
