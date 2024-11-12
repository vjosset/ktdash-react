import { GetPrismaClient } from "@/app/db/prisma";

/**
 * Returns an array of TacOp objects from the database for the specified rosterId.
 * @function
 * @async
 * @param {String} rosterId - The rosterid of the Roster whose TacOps to return.
 * @returns {Promise<Object>} A promise that resolves to an object containing the result of the database query.
 * @throws {Error} If an error occurs during the database query.
 */
export async function GetRosterTacOps(rosterId) {
  const prisma = await GetPrismaClient();

  return await prisma.$queryRaw`
    SELECT DISTINCT
        T.*,
        
        /* MySQL returns these as BIGINT without the CAST(), which Prisma doesn't know how to serialize */
        CAST(CASE WHEN RTO.rosterid IS NULL THEN 0 ELSE 1 END AS DECIMAL) AS active,
        IFNULL(RTO.revealed, CAST(0 AS DECIMAL)) AS revealed,
        IFNULL(RTO.VP1, CAST(0 AS DECIMAL)) AS VP1,
        IFNULL(RTO.VP2, CAST(0 AS DECIMAL)) AS VP2

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
        WHERE RO.rosterid = ${rosterId}
        ) A
        ON  A.edition = T.edition
        AND (
        CONCAT('/', A.archetype, '/') LIKE CONCAT('%/', T.archetype, '/%')
        OR T.tacopid LIKE CONCAT(A.factionid, '-', A.killteamid, '-', A.fireteamid, '-%')
        )
        INNER JOIN Roster R
        ON  R.rosterid = ${rosterId}
        LEFT JOIN RosterTacOp RTO
        ON  RTO.userid = R.userid
        AND RTO.rosterid = R.rosterid
        AND RTO.tacopid = T.tacopid
        ORDER BY T.tacopid, T.tacopseq`;
}
