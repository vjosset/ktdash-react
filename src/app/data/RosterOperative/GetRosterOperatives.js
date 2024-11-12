import { GetPrismaClient } from "@/app/db/prisma";

/**
 * Returns an array of RosterOperative objects from the database for the specified rosterId.
 * @function
 * @async
 * @param {String} rosterId - The rosterid of the Roster Operatives to return.
 * @returns {Promise<Object>} A promise that resolves to an object containing the result of the database query.
 * @throws {Error} If an error occurs during the database query.
 */
export async function GetRosterOperatives(rosterId) {
  const prisma = await GetPrismaClient();

  return prisma.RosterOperativeView.findMany({
    where: {
      rosterid: rosterId
    }
  });
}
