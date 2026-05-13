import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getPrismaClient } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  const prisma = getPrismaClient();

  // 🚫 BLOCK NON-LOGGED USERS
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { sanityId } = await req.json();

  const existing = await prisma.favorite.findUnique({
    where: {
      clerkUserId_sanityId: {
        clerkUserId: userId,
        sanityId,
      },
    },
  });

  // 🔁 UNDO FAVORITE
  if (existing) {
    await prisma.favorite.delete({
      where: {
        clerkUserId_sanityId: {
          clerkUserId: userId,
          sanityId,
        },
      },
    });

    return NextResponse.json({ favorited: false });
  }

  // ❤️ ADD FAVORITE
  await prisma.favorite.create({
    data: {
      clerkUserId: userId,
      sanityId,
    },
  });

  return NextResponse.json({ favorited: true });
}