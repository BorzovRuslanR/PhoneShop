import { getAuthSession } from '@/lib/auth';
import { db } from '@/prisma/db';
import { Cart } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import {z} from 'zod';
import { Order, OrderItem } from '@prisma/client'

export async function POST(req: NextRequest) {
    const session = await getAuthSession();
    
    if (session?.user?.email) {
      const body = await req.json();
      const email = session.user.email;
      const bodySchema = z.object({
        address: z.string().min(5, 'Address cannot be empty'),
      });
      const parsedBody = await bodySchema.safeParseAsync(
        body
      );
      if (parsedBody.success) {
        
        const user = await db.user.findUnique({
            where: {
                email
            }
        })
        if (user) {
          const carts = await db.cart.findMany({
            where: {
              userId: user.id
            },
            include: {
              Product: true
            }
          })
          const order = await db.order.create({
            data: {
              address: parsedBody.data.address,
              total: carts.reduce((acc, cur) => acc + cur.quantity * cur.Product.price, 0),
              userId: user.id,
              items: {
                create: carts.map((cart) => ({
                  quantity: cart.quantity,
                  price: cart.Product.price,
                  productId: cart.productId
                }))
              }
            },
          });
          await db.cart.deleteMany({
            where: {
              userId: user.id
            }
          })
          return NextResponse.json({
            order
          })
        } else {
          return new Response("Auth required", {
            status: 401,
          });
        }
      }
      return new Response("Wrong cart data", {
        status: 400,
      });
    }
    return new Response("Auth required", {
      status: 401,
    });
  }