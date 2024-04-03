import { getAuthSession } from '@/lib/auth';
import { db } from '@/prisma/db';
import { Rating } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import {z} from 'zod';


export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  console.log(session);

  if (session?.user?.email) {
    const body = await req.json();
    const email = session.user.email;
    const bodySchema = z.object({
      rating: z.number().int().min(1).max(5),
      productId: z.number().gt(0),
    });
    const parsedBody = await bodySchema.safeParseAsync(body);
    if (parsedBody.success) {
      let ratingFromDb: Rating | null = null;
      try {
        const existingRating = await db.rating.findFirst({
          where: {
            user: {
              email,
            },
            productId: parsedBody.data.productId,
          },
        });

        if (existingRating) {
          // Если оценка уже существует, обновляем ее значение
          ratingFromDb = await db.rating.update({
            where: {
              id: existingRating.id,
            },
            data: {
              rating: parsedBody.data.rating,
            },
          });
        } else {
          // Если оценка не существует, создаем новую запись
          ratingFromDb = await db.rating.create({
            data: {
              rating: parsedBody.data.rating,
              user: {
                connect: {
                  email,
                },
              },
              product: {
                connect: {
                  id: parsedBody.data.productId,
                },
              },
            },
          });
        }
        const productAllRatings = await db.rating.aggregate({
          _avg: {
            rating: true
          },
          where: {
            productId: parsedBody.data.productId
          },          
        })
        const rating = productAllRatings._avg.rating
        if (rating) {
          await db.product.update({
            data: {
              ratingAverage: rating
            },
            where: {
              id: parsedBody.data.productId
            }
          })
        }
      } catch (error) {
        return new Response("Wrong product ID", {
          status: 409,
        });
      }
      return NextResponse.json({
        rating: ratingFromDb,
      });
    }
    return new Response("Wrong favorite data", {
      status: 400,
    });
  }
  return new Response("Auth required", {
    status: 401,
  });
}

export async function GET() {
  const rating = await db.rating.findMany({
    select: {
      id: true,
      productId: true,
      userId: true,
      rating: true,
    },
  });
        return NextResponse.json<{ rating: typeof rating }>({
          rating,
        });
      }
      
  