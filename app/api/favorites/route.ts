import { getAuthSession } from '@/lib/auth';
import { db } from '@/prisma/db';
import { Cart } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import {z} from 'zod';


export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (session?.user?.email) {
    const body = await req.json();
    const email = session.user.email;
    const bodySchema = z.object({
      quantity: z.number().gt(0),
      productId: z.number().gt(0),
    });
    const parsedBody = await bodySchema.safeParseAsync(
      body
    );
    if (parsedBody.success) {
      let cartFromDb: Cart | null = null;
      try {
        const favor = await db.favorites.findFirst({
          where: {
            User: {
              email,
            },
            productId: parsedBody.data.productId,
          },
        });
        if (favor) {
            return new Response("Product has already been added", {
                status: 400,
              });
        } else
          cartFromDb = await db.favorites.create({
            data: {
              userId,
              productId,
            },
          });
      } catch (error) {
        return new Response("Wrong product ID", {
          status: 409,
        });
      }
      return NextResponse.json({
        cart: cartFromDb,
      });
    }
    return new Response("Wrong cart data", {
      status: 400,
    });
  }
  return new Response("Auth required", {
    status: 401,
  });
}