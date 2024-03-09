import { z } from "zod"

export const cartSchema = z.object({
  cart: z.array(
    z.object({
      id: z.number(),
      createdAt: z.string(),
      updatedAt: z.string(),
      userId: z.string(),
      ProductCart: z.array(
        z.object({
          id: z.number(),
          productId: z.number(),
          cartId: z.number(),
          quantity: z.number(),
          Product: z.object({
            id: z.number(),
            name: z.string(),
            price: z.number(),
            desc: z.string(),
            img: z.string(),
            createdAt: z.string(),
            updatedAt: z.string()
          })
        })
      )
    })
  )
});

export type Cart = z.infer<typeof cartSchema>;