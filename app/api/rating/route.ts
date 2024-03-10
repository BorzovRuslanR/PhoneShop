import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/prisma/db';
import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';


export async function POST(req: NextRequest) {
  const body = await req.json();
  const bodySchema = z.object({
    rating: z.number().int().min(1).max(5),
    productId: z.number().gt(0),
  });
  const parsedBody = await bodySchema.safeParseAsync(body);
  
  if (parsedBody.success) {
    try {
      await db.product.update({
        where: {
          id: parsedBody.data.productId,
        },
        data: {
          rating: parsedBody.data.rating,
        },
      });
      
      return NextResponse.json({ success: true });
    } catch (error) {
      console.error('Failed to update product rating:', error);
  
      return NextResponse.json({ error: 'Failed to update product rating' }, { status: 500 });
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