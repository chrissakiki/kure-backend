-- CreateEnum
CREATE TYPE "HeroPage" AS ENUM ('HOME', 'SIGNATURE', 'PACKAGES', 'CORPORATE', 'ACADEMY', 'FAQ');

-- CreateTable
CREATE TABLE "heroes" (
    "id" TEXT NOT NULL,
    "page" "HeroPage" NOT NULL,
    "eyebrow" TEXT,
    "title" TEXT NOT NULL,
    "titleAccent" TEXT,
    "tagline" TEXT,
    "description" TEXT,
    "notice" TEXT,
    "imageUrl" TEXT,
    "primaryCtaLabel" TEXT,
    "primaryCtaHref" TEXT,
    "secondaryCtaLabel" TEXT,
    "secondaryCtaHref" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "heroes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "heroes_page_key" ON "heroes"("page");
