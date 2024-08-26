import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './orders/orders.module';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
@Module({
  imports: [RabbitmqModule, OrderModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
