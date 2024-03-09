import { PrismaClient, Product } from '@prisma/client';

const prisma = new PrismaClient();

export async function getProductById(productId: number): Promise<Product | null> {
    try {
      const product = await prisma.product.findUnique({
        where: {
          id: productId,
        },
      });
  
      return product;
    } catch (error) {
      console.error('Error retrieving Product:', error);
      return null;
    }
  }