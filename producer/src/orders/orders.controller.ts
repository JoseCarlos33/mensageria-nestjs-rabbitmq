import { Payload } from '@nestjs/microservices';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Body, Controller, Get, Patch, Post, Res } from '@nestjs/common';
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

  @Patch('/order-processed')
  async handleOrderProcessed(@Payload() data: any) {
    return this.orderService.handleOrderProcessed(data);
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }
}
