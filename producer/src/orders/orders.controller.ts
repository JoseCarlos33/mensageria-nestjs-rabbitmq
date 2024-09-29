import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Body, Controller, Get, Post, Res } from '@nestjs/common';
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

    return order;
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }
}
