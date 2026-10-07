-- AlterTable
ALTER TABLE "offer_cards" ADD COLUMN IF NOT EXISTS "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "feature_items" ADD COLUMN IF NOT EXISTS "content" TEXT;
ALTER TABLE "feature_items" ALTER COLUMN "description" DROP NOT NULL;
