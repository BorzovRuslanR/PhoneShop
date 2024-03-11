import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/prisma/db';
import { z } from 'zod';
import { getAuthSession } from '@/lib/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const session = await getAuthSession();

  if (session?.user?.email) {
    const email = session.user.email;
    const body = await req.json();
    const bodySchema = z.object({
      rating: z.number().int().min(1).max(5),
      productId: z.number().gt(0),
    });
    const parsedBody = await bodySchema.safeParseAsync(body);

    if (parsedBody.success) {
      try {
        const productId = parsedBody.data.productId;

        const product = await prisma.product.findUnique({
          where: {
            id: productId,
          },
        });

        if (product) {
          const updatedProduct = await prisma.product.update({
            where: {
              id: productId,
            },
            data: {
              rating: parsedBody.data.rating,
            },
          });

          const productRating = await prisma.productRating.create({
            data: {
              rating: parsedBody.data.rating,
              productId: productId,
              userId: email,
            },
          });

          return NextResponse.json({ success: true, productRating });
        } else {
          console.error('Failed to update product rating: Product not found');

          return NextResponse.json({ error: 'Failed to update product rating' }, { status: 404 });
        }
      } catch (error) {
        console.error('Failed to update product rating:', error);

        return NextResponse.json({ error: 'Failed to update product rating' }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
}

export async function GET(req: Request) {
  const products = await db.product.findMany();
  const ratings = products.map((product) => ({
    id: product.id,
    rating: product.rating
  }));

  return Response.json({ ratings });
}