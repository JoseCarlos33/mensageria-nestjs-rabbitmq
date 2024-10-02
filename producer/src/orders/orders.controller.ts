import { Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Res() res: Response) {
    const order = await this.orderService.createOrder(createOrderDto);

    if (!order) {
      return res.status(400).json({ message: 'Order not created' });
    }

    return res.status(200).json(order);
  }

  @Patch('/order-processed/:orderId')
  async handleOrderProcessed(
    @Param('orderId') orderId: string,
    @Body() data: { status: 'PENDING' | 'COMPLETED' | 'CANCELLED' },
  ) {
    const formattedData = { orderId, status: data.status };
    return this.orderService.handleOrderProcessed(formattedData);
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }
}
