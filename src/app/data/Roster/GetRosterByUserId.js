import { findSingleGeneric, GetPrismaClient } from "@/app/db/prisma";
import { Prisma } from "@prisma/client";

export async function GetRosterByUserId(loadRosterDetail, userId) {
  const prisma = await GetPrismaClient();

  return prisma.$queryRaw(
    Prisma.sql`SELECT * FROM RosterView WHERE userid = ${userId} ORDER BY seq`,
  );
}
