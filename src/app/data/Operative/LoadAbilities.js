import { GetPrismaClient } from "@/app/db/prisma";

export async function LoadAbilities(factionid, killteamid, fireteamid, opid) {
  const prisma = await GetPrismaClient();

  return prisma.$queryRaw(
    Prisma.sql`SELECT * FROM Ability WHERE factionid = factionid AND killteamid = killteamid AND fireteamid = fireteamid AND opid = opid`,
  );
}
