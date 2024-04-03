import { GET } from '@/app/api/order/route';
import { NextResponse } from "next/server";
import { z } from "zod"

export type Order = typeof GET extends () => Promise<NextResponse<infer T>> ? T : never

export type OrderDTO = Exclude<Order, string>
 
export const orderSchema = z.object({
  order: z.array(
    z.object({
      id: z.number(),
      userId: z.string(),
      total: z.number(),
      address: z.string(),
      createdAt: z.string(),
      items: z.array(
        z.object({
          id: z.number(),
          orderId: z.number(), 
          quantity: z.number(),
          productId: z.number().nullable(),
          price: z.number(),
        })
      ),
    })
  ),
});