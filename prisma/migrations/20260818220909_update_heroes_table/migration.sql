/*
  Warnings:

  - The values [SIGNATURE] on the enum `HeroPage` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "HeroPage_new" AS ENUM ('HOME', 'SERVICES', 'PACKAGES', 'GIFT_VOUCHERS', 'LOCATIONS', 'CORPORATE', 'ACADEMY', 'ABOUT', 'CAREERS', 'TESTIMONIALS', 'FAQ', 'TERMS', 'PRIVACY');
ALTER TABLE "heroes" ALTER COLUMN "page" TYPE "HeroPage_new" USING ("page"::text::"HeroPage_new");
ALTER TYPE "HeroPage" RENAME TO "HeroPage_old";
ALTER TYPE "HeroPage_new" RENAME TO "HeroPage";
DROP TYPE "public"."HeroPage_old";
COMMIT;

-- AlterTable
ALTER TABLE "heroes" ADD COLUMN     "highlights" TEXT[] DEFAULT ARRAY[]::TEXT[];
