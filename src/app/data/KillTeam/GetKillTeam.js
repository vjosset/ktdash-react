import { findSingleGeneric, GetPrismaClient } from "@/app/db/prisma";

/**
 * Returns a single KillTeam object from the database based on input factionId and killTeamId.
 * @function
 * @async
 * @param {String} rosterId - The rosterid of the Roster to return.
 * @returns {Promise<Object>} A promise that resolves to an object containing the result of the database query.
 * @throws {Error} If an error occurs during the database query.
 */
export async function GetKillTeam(factionId, killTeamId) {
  const prisma = await GetPrismaClient();
  
  return prisma.killteam.findFirst({
    where: {
      factionid: factionId,
      killteamid: killTeamId
    }
  });
}
