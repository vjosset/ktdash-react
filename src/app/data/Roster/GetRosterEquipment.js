import { GetPrismaClient } from "@/app/db/prisma";

export async function GetRosterEquipment(rosterId) {
  const prisma = await GetPrismaClient();

  return prisma.$queryRaw`
    SELECT DISTINCT
    E.*,
    CASE WHEN RE.rosterid IS NULL THEN 0 ELSE 1 END AS selected
        FROM
    Roster R
    INNER JOIN Equipment E
    ON  E.eqcategory IN ('Equipment', 'Universal Equipment')
    AND (
    (E.factionid = R.factionid AND E.killteamid = R.killteamid)
    OR  (E.factionid = 'kt24' AND E.killteamid = 'ALL')
    ) 
    LEFT JOIN RosterEquipment RE
    ON  RE.rosterid = R.rosterid
    AND RE.eqfactionid = E.factionid
    AND RE.eqkillteamid = E.killteamid
    AND RE.eqid = E.eqid
        WHERE
    R.rosterid = ${rosterId}
        ORDER BY E.eqcategory, E.eqseq;`;
}
