import { GetPrismaClient } from "@/app/db/prisma";

/**
 * Returns a single Roster object from the database based on input rosterId.
 * @function
 * @async
 * @param {String} rosterId - The rosterid of the Roster to return.
 * @returns {Promise<Object>} A promise that resolves to an object containing the result of the database query.
 * @throws {Error} If an error occurs during the database query.
 */
export async function GetRoster(rosterId) {
  const prisma = await GetPrismaClient();

  return prisma.RosterView.findUnique({
    where: {
        rosterid: rosterId
    }
  });
}
