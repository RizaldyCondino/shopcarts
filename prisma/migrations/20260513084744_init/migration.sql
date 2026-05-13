-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "sanityId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_clerkUserId_sanityId_key" ON "Favorite"("clerkUserId", "sanityId");
