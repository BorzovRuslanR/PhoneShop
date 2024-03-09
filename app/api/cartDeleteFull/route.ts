import { getAuthSession } from '@/lib/auth';
import { db } from '@/prisma/db';
import { NextRequest, NextResponse } from 'next/server';



export async function DELETE(req: NextRequest) {
  const session = await getAuthSession();
  if (session?.user?.email) {
    const email = session.user.email;

    const cart = await db.cart.findFirst({
      where: {
        User: {
          email,
        },
      },
      include: {
        ProductCart: true,
      },
    });

    if (!cart) {
      return new Response('Cart not found', {
        status: 404,
      });
    }

    const productIds = cart.ProductCart.map((productCart) => productCart.productId);

    try {
      await db.productCart.deleteMany({
        where: {
          cartId: cart.id,
        },
      });

      await db.cart.delete({
        where: {
          id: cart.id,
        },
      });

      return NextResponse.json({
        message: 'All products removed from cart',
        removedProductIds: productIds,
      });
    } catch (error) {
      console.error(error);
      return new Response('Internal server error', {
        status: 500,
      });
    }
  }
}