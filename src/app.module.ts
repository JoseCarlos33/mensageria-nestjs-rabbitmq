import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { OrdersModule } from './orders/orders.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';

@Module({
  imports: [RabbitmqModule, OrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
