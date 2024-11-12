import { GetPrismaClient } from "@/app/db/prisma";

export async function GetROWeapons(
  factionId,
  killteamId,
  fireteamId,
  opId,
  wepIds,
) {
  const prisma = await GetPrismaClient();

  return prisma.$queryRaw`
    SELECT * FROM Weapon WHERE factionid = ${factionId} AND killteamid = ${killteamId} AND fireteamid = ${fireteamId} AND opid = ${opId} AND CONCAT(',', ${wepIds}, ',') LIKE CONCAT('%,', wepid, ',%') ORDER BY wepseq, weptype DESC`;
}
