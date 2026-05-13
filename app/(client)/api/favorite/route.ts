import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { getPrismaClient } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const prisma = getPrismaClient();
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { sanityId } = body;

    if (!sanityId) {
      return NextResponse.json(
        { error: "Missing sanityId" },
        { status: 400 }
      );
    }

    const favorite = await prisma.favorite.create({
      data: {
        clerkUserId: user.id,
        sanityId,
      },
    });

    return NextResponse.json(favorite);
    
  } catch (error: any) {
    // Handle duplicate favorite (important because of @@unique)
    if (error.code === "P2002") {
      return NextResponse.json(
        { message: "Already in favorites" },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}