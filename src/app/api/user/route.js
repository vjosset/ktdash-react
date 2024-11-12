import { GetUserByUserName } from "@/app/data/User/GetUserByUserName.js";
import { GetRostersByUserId } from "@/app/data/Roster/GetRostersByUserId.js";

/**
 * Returns a User object from the database based on input username.
 * @function
 * @async
 * @param {Object} req - The Http Request for this API call
 * @returns {Promise<Object>} A promise that resolves to an object containing the result of the request.
 * @throws {Error} If an error occurs.
 */
export async function GET(req) {
  /*
  Sample API request: /api/user?username=jodawznev
  */
  let [username] = [
    req.nextUrl.searchParams.get("username") ?? undefined
  ];

  if (!username) {
    return Response.json({ error: "Invalid params" }, { status: 400 });
  }

  // Get the user record
  let user = await GetUserByUserName(username);

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  // Get this user's rosters
  user.rosters = await GetRostersByUserId(user.userid);

  return Response.json(user);
}
