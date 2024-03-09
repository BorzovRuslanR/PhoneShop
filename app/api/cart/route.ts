import { getAuthSession } from '@/lib/auth';
import { db } from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';
import {z} from 'zod';


export async function POST(req: NextRequest) {
    const session = await getAuthSession()
    

    if (session?.user?.email) {
        const body = await req.json();
        const email = session.user.email
        const bodySchema = z.object({
            quantity: z.number().gt(0),
            productId: z.number().gt(0),
        })
        const parsedBody = await bodySchema.safeParseAsync(body)
        if(parsedBody.success) {
            try {
              const cart = await db.cart.findFirst({
                where: {
                  User: {
                    email
                  },
                  ProductCart: {
                    some: {
                      productId: parsedBody.data.productId
                    }
                  }
                },
                include: {
                    ProductCart: true
                }
              })
              if (cart) {
                await db.cart.update({
                  where: {
                    id: cart.id
                  },
                  data: {
                    ProductCart: {
                      update: {
                        where: {
                          id: cart.ProductCart[0].id
                        },
                        data: {
                          quantity: cart.ProductCart[0].quantity + parsedBody.data.quantity
                        }
                      }
                    }
                  }
                })
              } else  await db.cart.create({
                data: {
                    User: {
                        connect: {
                            email
                        }
                    },
                    ProductCart: {
                        create: {
                            quantity: parsedBody.data.quantity,
                            productId: parsedBody.data.productId
                        },
                    },
                }
              })
            } catch (error) { 
              return new Response('Wrong product ID', {
                status: 409
            })
            }

            return NextResponse.json({
                token: req.cookies.get('next-auth.session-token'),
                body
            })
        }

        return new Response('Wrong cart data', {
            status: 400
        })
    }
            
            
    return new Response('Auth required', {
        status: 401
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
        include: {
          ProductCart: {
            include: {
              Product: true
            }
          }
        }
      })
      return NextResponse.json({
        cart
      })
    }
    
  }

  export async function DELETE(req: NextRequest) {
    const session = await getAuthSession()
    if (session?.user?.email) {
      const email = session.user.email;
      const body = await req.json()
      const bodySchema = z.object({
        productId: z.number().gt(0)
      })
      const parsedBody = await bodySchema.safeParseAsync(body)
      if (parsedBody.success) {
        const cart = await db.cart.findFirst({
          where: {
            User: {
              email
            },
            ProductCart: {
              some: {
                productId: parsedBody.data.productId
              }
            }
          }
        })
        if (!cart) {
          return new Response('Product not found in cart', {
            status: 404
          })
        }
        const productCart = await db.productCart.findFirst({
          where: {
            productId: parsedBody.data.productId,
            cartId: cart.id
          }
        })
        if (!productCart) {
          return new Response('Product not found in cart', {
            status: 404
          })
        }
        if (productCart.quantity > 1) {
          await db.productCart.update({
            where: {
              id: productCart.id
            },
            data: {
              quantity: productCart.quantity - 1
            }
          })
          return NextResponse.json({
            message: 'Product quantity updated'
          })
        } else {
          await db.productCart.delete({
            where: {
              id: productCart.id
            }
          })
          await db.cart.delete({
            where: {
              id: cart.id
            }
          })
          return NextResponse.json({
            message: 'Product removed from cart'
          })
        }
      }
    }
  }

  