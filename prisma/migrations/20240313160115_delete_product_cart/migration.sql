/*
  Warnings:

  - You are about to drop the `ProductCart` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `productId` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ProductCart" DROP CONSTRAINT "ProductCart_cartId_fkey";

-- DropForeignKey
ALTER TABLE "ProductCart" DROP CONSTRAINT "ProductCart_productId_fkey";

-- AlterTable
ALTER TABLE "Cart" ADD COLUMN     "productId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ProductCart";

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
