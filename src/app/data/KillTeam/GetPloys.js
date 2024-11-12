import { GetPrismaClient } from "@/app/db/prisma";

export async function GetPloys(factionId, ktId) {
  const prisma = await GetPrismaClient();

  const ploys = await prisma.ploy.findMany({
    where: {
      factionid: factionId,
      killteamid: ktId,
    },
  });

  const strat = [];
  const tac = [];

  ploys.forEach((p) => {
    if (p.ploytype === "S") strat.push(p);
    else tac.push(p);
  });

  return [strat, tac];
}
