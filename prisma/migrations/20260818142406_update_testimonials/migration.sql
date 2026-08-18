/*
  Warnings:

  - Added the required column `sortOrder` to the `testimonial_categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sortOrder` to the `testimonials` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtitle` to the `testimonials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "testimonial_categories" ADD COLUMN     "sortOrder" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "testimonials" ADD COLUMN     "sortOrder" INTEGER NOT NULL,
ADD COLUMN     "subtitle" TEXT NOT NULL;
