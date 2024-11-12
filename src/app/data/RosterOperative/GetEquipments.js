import { GetPrismaClient } from "@/app/db/prisma";

export async function GetEquipments(factionId, killteamId, eqId) {
  const prisma = await GetPrismaClient();

  return prisma.$queryRaw`
    SELECT * FROM Equipment WHERE ((factionid = ${factionId} AND killteamid = ${killteamId}) OR (factionid = ${factionId} AND killteamid = 'ALL')) AND CONCAT(',', ${eqId}, ',') LIKE CONCAT('%,', eqid, ',%') ORDER BY eqseq`;
}
