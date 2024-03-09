import { PrismaClient, ProductCart } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProductCartByCartId(cartId: number): Promise<ProductCart | null> {
  try {
    const productCart = await prisma.productCart.findUnique({
      where: {
        id: cartId,
      },
    });

    return productCart;
  } catch (error) {
    console.error('Error retrieving ProductCart:', error);
    return null;
  }
}