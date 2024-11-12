import { GetPrismaClient } from "@/app/db/prisma";

export async function GetRosterOperative(rosterId) {
  const prisma = await GetPrismaClient();

  return prisma.$queryRaw`
    SELECT * FROM RosterOperativeView WHERE rosteropid = ${rosterId} ORDER BY seq`;
}
