-- AlterTable
ALTER TABLE "feature_items" ADD COLUMN     "content" TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "offer_cards" ADD COLUMN     "imageUrl" TEXT;
