/*
  Warnings:

  - Added the required column `categoryId` to the `faqs` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sortOrder` to the `faqs` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "FaqPage" AS ENUM ('MAIN', 'ACADEMY');

-- AlterTable
ALTER TABLE "faqs" ADD COLUMN     "categoryId" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "sortOrder" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "faq_categories" (
    "id" TEXT NOT NULL,
    "page" "FaqPage" NOT NULL,
    "label" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "faq_categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "faqs" ADD CONSTRAINT "faqs_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "faq_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
