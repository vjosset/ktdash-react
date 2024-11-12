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

    // Commented out because SUPER slow (> 1s)
    //    queryRaw is MUCH faster
    //let roster = prisma.Roster.findUnique({
    //    where: {
    //        rosterid: rosterId
    //    }
    //});
    //return roster;

    return (await prisma.$queryRaw`SELECT * FROM RosterView WHERE rosterid = ${rosterId}`)[0];
}
