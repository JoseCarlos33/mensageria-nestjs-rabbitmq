import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    const order = await this.orderService.createOrder(createOrderDto);

    return order;
  }

  @Get()
  async findAll() {
    return this.orderService.findAll();
  }
}
