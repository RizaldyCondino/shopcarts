import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getPrismaClient } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  const prisma = getPrismaClient();

  if (!userId) {
    return NextResponse.json({ favorites: [] });
  }

  const favorites = await prisma.favorite.findMany({
    where: { clerkUserId: userId },
    select: { sanityId: true },
  });

  return NextResponse.json({
    favorites: favorites.map((f) => f.sanityId),
  });
}