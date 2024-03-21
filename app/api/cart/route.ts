// import { Cart } from '@/features/cart/cart-schema';
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
        const cart = await db.cart.findFirst({
          where: {
            User: {
              email,
            },
            productId: parsedBody.data.productId,
          },
        });
        if (cart) {
          cartFromDb = await db.cart.update({
            where: {
              id: cart.id,
            },
            data: {
              quantity:
                cart.quantity + parsedBody.data.quantity,
            },
          });
        } else
          cartFromDb = await db.cart.create({
            data: {
              User: {
                connect: {
                  email,
                },
              },
              quantity: parsedBody.data.quantity,
              Product: {
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

export async function GET() {
  const session = await getAuthSession()
    
    if (session?.user?.email) {
      const email = session.user.email
      const cart = await db.cart.findMany({
        where: {
          User: {
            email
          }
        },
        orderBy: {
          createdAt: 'asc'
        },
        select: {
          id: true,
          quantity: true,
          productId: true,
          userId: true,
          Product: {
            select: {
              id: true,
              name: true,
              price: true,
              desc: true,
              img: true,
            },
          },
        },
      });
      return NextResponse.json<{ cart: typeof cart }>({
        cart,
      });
    }
    return new NextResponse<string>("Auth required", {
      status: 401,
    });
  }

  export async function DELETE(req: NextRequest) {
    const session = await getAuthSession();
    if (session?.user?.email) {
      const email = session.user.email;
      const body = await req.json();
      const bodySchema = z.object({
        productId: z.union([z.number().gt(0), z.undefined()]),
      });
      const parsedBody = await bodySchema.safeParseAsync(
        body
      );
      if (parsedBody.success) {
        if (parsedBody.data.productId === undefined) {
          await db.cart.deleteMany({
            where: {
              User: {
                email,
              },
            },
          });
          return NextResponse.json({
            message: "Cart cleared",
          });
        }
        const cart = await db.cart.findFirst({
          where: {
            User: {
              email,
            },
            productId: parsedBody.data.productId,
          },
        });
        if (!cart) {
          return new Response("Product not found in cart", {
            status: 404,
          });
        }
        await db.cart.delete({
          where: {
            id: cart.id,
          },
        });
        return NextResponse.json({
          message: "Product removed from cart",
        });
      }
    }
  }
  
  export async function PATCH(req: NextRequest) {
    const session = await getAuthSession();
    if (session?.user?.email) {
      const email = session.user.email;
      const body = await req.json();
      const bodySchema = z.object({
        productId: z.number().gt(0),
        quantity: z.number().gte(0),
      });
      const parsedBody = await bodySchema.safeParseAsync(
        body
      );
      if (parsedBody.success) {
        const cart = await db.cart.findFirst({
          where: {
            User: {
              email,
            },
            productId: parsedBody.data.productId,
          },
        });
        if (!cart) {
          return new Response("Product not found in cart", {
            status: 404,
          });
        }
        if (parsedBody.data.quantity === 0) {
          await db.cart.delete({
            where: {
              id: cart.id,
            },
          });
          return NextResponse.json({
            message: "Product removed from cart",
          });
        }
        const updatedCart = await db.cart.update({
          where: {
            id: cart.id,
          },
          data: {
            quantity: parsedBody.data.quantity,
          },
        });
        return NextResponse.json({
          cart: updatedCart,
        });
      }
    }
  }

  