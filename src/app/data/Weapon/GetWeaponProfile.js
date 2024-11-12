import { GetPrismaClient } from "@/app/db/prisma";

export async function GetWeaponProfile(
  factionId,
  killteamId,
  fireteamId,
  opId,
  wepId,
) {
  const prisma = await GetPrismaClient();

  return prisma.weaponProfile.findMany({
    where: {
      factionid: factionId,
      killteamid: killteamId,
      fireteamid: fireteamId,
      opid: opId,
      wepid: wepId,
    },
    orderBy: {
      profileid: 'asc'
    }
  });
}
