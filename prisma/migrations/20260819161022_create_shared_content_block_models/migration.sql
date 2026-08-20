/*
  Warnings:

  - You are about to drop the `package_benefits` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `package_offers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `package_steps` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `section_intro` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "package_benefits";

-- DropTable
DROP TABLE "package_offers";

-- DropTable
DROP TABLE "package_steps";

-- DropTable
DROP TABLE "section_intro";

-- CreateTable
CREATE TABLE "section_intros" (
    "id" TEXT NOT NULL,
    "page" "SitePage" NOT NULL,
    "sectionKey" TEXT NOT NULL,
    "eyebrow" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "section_intros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "offer_cards" (
    "id" TEXT NOT NULL,
    "page" "SitePage" NOT NULL,
    "sectionKey" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subtitle" TEXT,
    "badge" TEXT,
    "price" TEXT NOT NULL,
    "priceNote" TEXT,
    "perks" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ctaLabel" TEXT,
    "ctaHref" TEXT,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "offer_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feature_items" (
    "id" TEXT NOT NULL,
    "page" "SitePage" NOT NULL,
    "sectionKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "feature_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "step_items" (
    "id" TEXT NOT NULL,
    "page" "SitePage" NOT NULL,
    "sectionKey" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "step_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "section_intros_page_sectionKey_key" ON "section_intros"("page", "sectionKey");

-- CreateIndex
CREATE UNIQUE INDEX "offer_cards_page_sectionKey_sortOrder_key" ON "offer_cards"("page", "sectionKey", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "feature_items_page_sectionKey_sortOrder_key" ON "feature_items"("page", "sectionKey", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "step_items_page_sectionKey_sortOrder_key" ON "step_items"("page", "sectionKey", "sortOrder");
