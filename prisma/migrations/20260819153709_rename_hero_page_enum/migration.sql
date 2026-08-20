/*
  Warnings:

  - Changed the type of `page` on the `heroes` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "SitePage" AS ENUM ('HOME', 'SERVICES', 'PACKAGES', 'GIFT_VOUCHERS', 'LOCATIONS', 'CORPORATE', 'ACADEMY', 'ABOUT', 'CAREERS', 'TESTIMONIALS', 'FAQ', 'TERMS', 'PRIVACY');

-- AlterTable
ALTER TABLE "heroes" DROP COLUMN "page",
ADD COLUMN     "page" "SitePage" NOT NULL;

-- DropEnum
DROP TYPE "HeroPage";

-- CreateIndex
CREATE UNIQUE INDEX "heroes_page_key" ON "heroes"("page");
