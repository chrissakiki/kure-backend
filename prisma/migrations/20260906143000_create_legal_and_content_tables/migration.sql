-- CreateEnum
CREATE TYPE "JobOpeningStatus" AS ENUM ('ACTIVELY_HIRING', 'TALENT_POOL');

-- CreateTable
CREATE TABLE "legal_documents" (
    "id" TEXT NOT NULL,
    "page" "SitePage" NOT NULL,
    "content" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "legal_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "content_blocks" (
    "id" TEXT NOT NULL,
    "page" "SitePage" NOT NULL,
    "sectionKey" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "content_blocks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "milestone_stats" (
    "id" TEXT NOT NULL,
    "page" "SitePage" NOT NULL,
    "sectionKey" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "milestone_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_openings" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "JobOpeningStatus" NOT NULL,
    "employmentTypes" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "locations" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "description" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_openings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "legal_documents_page_key" ON "legal_documents"("page");

-- CreateIndex
CREATE UNIQUE INDEX "content_blocks_page_sectionKey_key" ON "content_blocks"("page", "sectionKey");

-- CreateIndex
CREATE UNIQUE INDEX "milestone_stats_page_sectionKey_sortOrder_key" ON "milestone_stats"("page", "sectionKey", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "job_openings_sortOrder_key" ON "job_openings"("sortOrder");
