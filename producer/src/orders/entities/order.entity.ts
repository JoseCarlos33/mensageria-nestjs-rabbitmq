import { Prisma } from '@prisma/client';
import { DecimalJsLike } from '@prisma/client/runtime/library';

export class Order implements Prisma.OrderCreateInput {
  id?: string;
  customerId: string;
  totalAmount: string | number | Prisma.Decimal | DecimalJsLike;
  status: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
