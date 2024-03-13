import { GET } from '@/app/api/cart/route';
import { NextResponse } from "next/server";
import { z } from "zod"

type Cart = typeof GET extends () => Promise<NextResponse<infer T>> ? T : never

export type CartDTO = Exclude<Cart, string>
 
export const cartSchema: z.ZodType<CartDTO> = z.object({
  cart: z.array(
    z.object({
      id: z.number(),
      userId: z.string(),
      productId: z.number(),
      quantity: z.number(),
      Product: z.object({
        id: z.number(),
        name: z.string(),
        price: z.number(),
        desc: z.string(),
        img: z.string(),
      }),
    })
  ),
});
