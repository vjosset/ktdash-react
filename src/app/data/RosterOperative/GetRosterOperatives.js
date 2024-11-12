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

  // Commented out because SUPER slow (> 1s)
  //    queryRaw is MUCH faster
  //return prisma.rosterOperative.findMany({
  //  where: {
  //    rosterid: rosterId
  //  }
  //});

  return await prisma.$queryRaw`SELECT * FROM RosterOperativeView WHERE rosterid = ${rosterId} ORDER BY seq`;
}
