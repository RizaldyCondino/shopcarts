import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getPrismaClient } from "@/lib/prisma";

export async function GET() {
  const { userId } = await auth();
  const prisma = getPrismaClient();

  if (!userId) {
    return NextResponse.json({ count: 0 });
  }

  const count = await prisma.favorite.count({
    where: { clerkUserId: userId },
  });

  return NextResponse.json({ count });
}