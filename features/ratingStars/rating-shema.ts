import { GET } from '@/app/api/rating/route';
import { NextResponse } from "next/server";
import { z } from "zod"

type Rating = typeof GET extends () => Promise<NextResponse<infer T>> ? T : never

export type RatingDTO = Exclude<Rating, string>
 
export const ratingSchema: z.ZodType<RatingDTO> = z.object({
  rating: z.array(
    z.object({
      id: z.number(),
      userId: z.string(),
      productId: z.number(),
      rating: z.number().int().min(1).max(5),
    })
  ),
});