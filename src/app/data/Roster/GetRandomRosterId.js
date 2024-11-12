import { GetPrismaClient } from "@/app/db/prisma";

export async function GetRandomRosterId() {
  const prisma = await GetPrismaClient();

  return prisma.$queryRaw`SELECT rosterid FROM Roster WHERE spotlight = 1 ORDER BY RAND() LIMIT 1`;
}
