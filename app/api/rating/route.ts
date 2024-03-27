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
        // userId: z.string()
      });
    const parsedBody = await bodySchema.safeParseAsync(
      body
    );
    if (parsedBody.success) {
      let ratingFromDb: Rating | null = null;
      try {
        const rating = await db.rating.findFirst({
          where: {
            user: {
              email,
            },
            productId: parsedBody.data.productId,
          },
        });
        if (rating) {
          ratingFromDb = rating
        } else
        ratingFromDb = await db.rating.create({
          data: {
            rating: parsedBody.data.rating,
            user: {
              connect: {
                email
              },
            },
            product: {
              connect: {
                id: parsedBody.data.productId,
              },
            },
          },
        });
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
    const session = await getAuthSession()
      
      if (session?.user?.email) {
        const email = session.user.email
        const rating = await db.rating.findMany({
          where: {
            user: {
              email
            }
          },
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
      return new NextResponse<string>("Auth required", {
        status: 401,
      });
    }
  