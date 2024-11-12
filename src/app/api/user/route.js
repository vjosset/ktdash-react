import { GetUserByUserName } from "@/app/data/User/GetUserByUserName.js";
import { GetUser } from "@/app/data/User/GetUser.js";
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
  let [username, userid] = [
    req.nextUrl.searchParams.get("username") ?? undefined,
    req.nextUrl.searchParams.get("userid") ?? undefined
  ];

  // Get the user record
  let user = null;
  if (username) {
    user = await GetUserByUserName(username);
  } else if (userid) {
    user = await GetUser(userid);
  } else {
    return Response.json({ error: "Invalid params" }, { status: 400 });
  }

  if (!user) {
    return Response.json({ error: "User not found" }, { status: 404 });
  }

  // Get this user's rosters
  user.rosters = await GetRostersByUserId(user.userid);

  return Response.json(user);
}
