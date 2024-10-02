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

  async createOrder(createOrderDto: CreateOrderDto): Promise<any | null> {
    const order = await this.prisma.order.create({ data: createOrderDto });
    if (order) {
      this.rabbitClient.emit('order-placed', order);
      return { order };
    }
    return null;
  }

  async handleOrderProcessed(data: {
    orderId: string;
    status: 'PENDING' | 'PENDING' | 'COMPLETED' | 'CANCELLED';
  }): Promise<Order> {
    return this.prisma.order.update({
      where: { id: data.orderId },
      data: { status: data.status },
    });
  }

  async updateOrderStatus(
    id: string,
    status: 'PENDING' | 'PENDING' | 'COMPLETED' | 'CANCELLED',
  ): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data: { status },
    });
  }

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }
}
