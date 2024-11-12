import { findSingleGeneric, GetPrismaClient } from "@/app/db/prisma";

export async function GetKillTeam(factionId, ktId) {
  const prisma = await GetPrismaClient();

  return prisma.killteam.findFirst({
    where: {
      factionid: factionId,
      killteamid: ktId,
    },
  });
}
