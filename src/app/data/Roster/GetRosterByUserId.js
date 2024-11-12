import { findSingleGeneric, GetPrismaClient } from "@/app/db/prisma";
import { Prisma } from "@prisma/client";

export async function GetRosterByUserId(userId) {
  const prisma = await GetPrismaClient();

  return prisma.roster.findMany({
      where: {
          userid: userId
      }
  });
}
