import { getPrismaClient } from "@/lib/prisma";

export const getFavoritesCount = async (userId: string) => {
  const prisma = getPrismaClient();
  const count = await prisma.favorite.count({
    where: {
      clerkUserId: userId,
    },
  });

  return count;
};