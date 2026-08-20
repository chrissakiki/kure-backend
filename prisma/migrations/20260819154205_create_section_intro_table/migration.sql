-- CreateTable
CREATE TABLE "section_intro" (
    "id" TEXT NOT NULL,
    "page" "SitePage" NOT NULL,
    "key" TEXT NOT NULL,
    "eyebrow" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "section_intro_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "section_intro_key_key" ON "section_intro"("key");

-- CreateIndex
CREATE UNIQUE INDEX "section_intro_page_key_key" ON "section_intro"("page", "key");
