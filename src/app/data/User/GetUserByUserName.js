import { GetPrismaClient } from "@/app/db/prisma";

/**
 * Returns a single User object from the database based on input username.
 * @function
 * @async
 * @param {String} username - The username of the User to return.
 * @returns {Promise<Object>} A promise that resolves to an object containing the result of the database query.
 * @throws {Error} If an error occurs during the database query.
 */
export async function GetUserByUserName(userName) {
  const prisma = await GetPrismaClient();

  return prisma.User.findFirst({
    select: {
      userid: true,
      username: true,
      createddate: true
    },
    where: {
        username: userName
    }
  });
}
