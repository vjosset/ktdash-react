import { GetPrismaClient } from "@/app/db/prisma";
import { Prisma } from "@prisma/client";

export async function GetOperatives(userId, rosterId) {
  const prisma = await GetPrismaClient();

  return prisma.$queryRaw(
    Prisma.sql`SELECT * FROM RosterOperativeView WHERE userid = ${userId} AND rosterid = ${rosterId} ORDER BY seq`,
  );
}
