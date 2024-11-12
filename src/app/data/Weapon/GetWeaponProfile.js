import { GetPrismaClient } from "@/app/db/prisma";

export async function GetWeaponProfile(
  factionId,
  ktId,
  fireteamId,
  opId,
  wepId,
) {
  const prisma = await GetPrismaClient();

  return prisma.weaponProfile.findMany({
    where: {
      factionid: factionId,
      killteamid: ktId,
      opid: opId,
      wepid: wepId,
    },
  });
}
