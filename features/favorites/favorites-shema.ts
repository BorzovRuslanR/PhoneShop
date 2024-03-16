import { GET } from '@/app/api/favorites/route';
import { NextResponse } from "next/server";
import { z } from "zod"

type Favorite = typeof GET extends () => Promise<NextResponse<infer T>> ? T : never

export type FavoritesDTO = Exclude<Favorite, string>
 
export const favoritesSchema: z.ZodType<FavoritesDTO> = z.object({
  favorites: z.array(
    z.object({
      id: z.number(),
      userId: z.string(),
      productId: z.number(),
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