import { Module } from '@nestjs/common';
import { RabbitMQService } from './rabbitmq.service';
import { RabbitMQController } from './rabbitmq.controller';
@Module({
  controllers: [RabbitMQController],
  providers: [RabbitMQService],
})
export class AppModule {}
