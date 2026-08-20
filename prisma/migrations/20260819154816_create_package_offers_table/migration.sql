-- CreateTable
CREATE TABLE "package_offers" (
    "id" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "subtitle" TEXT,
    "badge" TEXT,
    "price" TEXT NOT NULL,
    "priceNote" TEXT,
    "perks" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "ctaLabel" TEXT,
    "ctaHref" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "package_offers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "package_offers_sortOrder_key" ON "package_offers"("sortOrder");
