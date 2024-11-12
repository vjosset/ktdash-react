import { GetPrismaClient } from "@/app/db/prisma";

export async function GetTacOps(userId, rosterId) {
  const prisma = await GetPrismaClient();

  return prisma.$queryRaw`
    SELECT DISTINCT
        T.*,
        CASE WHEN RTO.rosterid IS NULL THEN 0 ELSE 1 END AS active,
        IFNULL(RTO.revealed, 0) AS revealed,
        IFNULL(RTO.VP1, 0) AS VP1,
        IFNULL(RTO.VP2, 0) AS VP2
        FROM
        TacOp T
        INNER JOIN
        (
        SELECT DISTINCT F.archetype, F.factionid, F.killteamid, F.fireteamid, K.edition
        FROM RosterOperative RO
        INNER JOIN Killteam K
        ON  K.killteamid = RO.killteamid
        INNER JOIN Fireteam F
        ON  F.killteamid = RO.killteamid
        AND F.fireteamid = RO.fireteamid
        WHERE RO.userid = ${userId} AND RO.rosterid = ${rosterId}
        ) A
        ON  A.edition = T.edition
        AND (
        CONCAT('/', A.archetype, '/') LIKE CONCAT('%/', T.archetype, '/%')
        OR T.tacopid LIKE CONCAT(A.factionid, '-', A.killteamid, '-', A.fireteamid, '-%')
        )
        
        INNER JOIN Roster R
        ON  R.userid = ${userId} AND R.rosterid = ${rosterId}
        LEFT JOIN RosterTacOp RTO
        ON  RTO.userid = R.userid
        AND RTO.rosterid = R.rosterid
        AND RTO.tacopid = T.tacopid
        ORDER BY T.tacopid, T.tacopseq;`;
}
