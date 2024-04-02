import { getAuthSession } from '@/lib/auth';
import { db } from '@/prisma/db';
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


  export async function GET() {
    const session = await getAuthSession()
      
      if (session?.user?.email) {
        const email = session.user.email
        const order = await db.order.findMany({
          where: {
            User: {
              email
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            userId: true,
            total: true,
            address: true,
            items: {
              select: {
                id: true,
                productId: true,
                price: true,
                orderId: true,
                quantity: true
              }
            }
          },
        });
        return NextResponse.json<{ order: typeof order }>({
          order,
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
          orderId: z.number().gt(0),
        });
        const parsedBody = await bodySchema.safeParseAsync(body);
    
        if (parsedBody.success) {
          const user = await db.user.findUnique({
            where: {
              email,
            },
          });
    
          if (user) {
            const order = await db.order.findFirst({
              where: {
                id: parsedBody.data.orderId,
                userId: user.id,
              },
              include: {
                items: true,
              },
            });
    
            if (order) {
              await db.orderItem.deleteMany({
                where: {
                  orderId: order.id,
                },
              });
    
              await db.order.delete({
                where: {
                  id: order.id,
                },
              });
    
              return new Response(JSON.stringify({ message: "Order and associated items deleted successfully" }), {
                headers: {
                  "Content-Type": "application/json",
                },
              });
            } else {
              return new Response(JSON.stringify({ message: "Order not found" }), {
                status: 404,
                headers: {
                  "Content-Type": "application/json",
                },
              });
            }
          } else {
            return new Response(JSON.stringify({ message: "Auth required" }), {
              status: 401,
              headers: {
                "Content-Type": "application/json",
              },
            });
          }
        }
      }
    
      return new Response(JSON.stringify({ message: "Auth required" }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }