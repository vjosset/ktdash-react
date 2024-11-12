import { GetPrismaClient } from "@/app/db/prisma";

/**
 * Returns a single User object from the database based on input userid.
 * @function
 * @async
 * @param {String} userid - The userid of the User to return.
 * @returns {Promise<Object>} A promise that resolves to an object containing the result of the database query.
 * @throws {Error} If an error occurs during the database query.
 */
export async function GetUser(userId) {
  const prisma = await GetPrismaClient();

  return prisma.User.findFirst({
    select: {
      userid: true,
      username: true,
      createddate: true
    },
    where: {
        userid: userId
    }
  });
}
