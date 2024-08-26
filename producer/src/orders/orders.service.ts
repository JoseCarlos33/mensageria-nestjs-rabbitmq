import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './entities/order.entity';
import { PrismaService } from '../prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    @Inject('ORDERS_SERVICE') private rabbitClient: ClientProxy,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    this.rabbitClient.emit('order-placed', createOrderDto);

    return this.prisma.order.create({
      data: createOrderDto,
    });
  }

  async updateOrderStatus(id: string, status: string): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }
}
