-- CreateTable
CREATE TABLE "section_outros" (
    "id" TEXT NOT NULL,
    "page" "SitePage" NOT NULL,
    "eyebrow" TEXT,
    "title" TEXT NOT NULL,
    "titleAccent" TEXT,
    "description" TEXT,
    "primaryCtaLabel" TEXT,
    "primaryCtaHref" TEXT,
    "secondaryCtaLabel" TEXT,
    "secondaryCtaHref" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "section_outros_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "section_outros_page_key" ON "section_outros"("page");
