import { GetPrismaClient } from "@/app/db/prisma";

export async function GetWeaponByEqId(factionId, ktId, eqId) {
  const prisma = await GetPrismaClient();

  return prisma.weapon.findMany({
    where: {
      factionid: factionId,
      killteamid: ktId,
      fireteamid: 'EQ',
      opid: 'EQ',
      wepid: eqId,
    },
  });
}
