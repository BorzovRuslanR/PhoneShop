import { getAuthSession } from '@/lib/auth';
import { db } from '@/prisma/db';
import { Favorites } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import {z} from 'zod';


export async function POST(req: NextRequest) {
  const session = await getAuthSession();
  if (session?.user?.email) {
    const body = await req.json();
    const email = session.user.email;
    const bodySchema = z.object({
      productId: z.number().gt(0),
    });
    const parsedBody = await bodySchema.safeParseAsync(
      body
    );
    if (parsedBody.success) {
      let favoriteFromDb: Favorites | null = null;
      try {
        const favorite = await db.favorites.findFirst({
          where: {
            User: {
              email,
            },
            productId: parsedBody.data.productId,
          },
        });
        if (favorite) {
          favoriteFromDb = favorite
        } else
          favoriteFromDb = await db.favorites.create({
            data: {
              User: {
                connect: {
                  email,
                },
              },
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
        favorite: favoriteFromDb,
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
      const favorites = await db.favorites.findMany({
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
      return NextResponse.json<{ favorites: typeof favorites }>({
        favorites,
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
          await db.favorites.deleteMany({
            where: {
              User: {
                email,
              },
            },
          });
          return NextResponse.json({
            message: "Cleared",
          });
        }
        const favorites = await db.favorites.findFirst({
          where: {
            User: {
              email,
            },
            productId: parsedBody.data.productId,
          },
        });
        if (!favorites) {
          return new Response("Product not found in list", {
            status: 404,
          });
        }
        await db.favorites.delete({
          where: {
            id: favorites.id,
          },
        });
        return NextResponse.json({
          message: "Product removed from favorites list",
        });
      }
    }
  }