import { GetPrismaClient } from "@/app/db/prisma";

/**
 * Returns a single RosterOperative object from the database based on input rosterOpId.
 * @function
 * @async
 * @param {String} rosterOpId - The rosteropid of the Roster Operative to return.
 * @returns {Promise<Object>} A promise that resolves to an object containing the result of the database query.
 * @throws {Error} If an error occurs during the database query.
 */
export async function GetRosterOperative(rosterOpId) {
  const prisma = await GetPrismaClient();

  return prisma.RosterOperativeView.findUnique({
    where: {
      rosteropid: rosterOpId
    }
  });
}
