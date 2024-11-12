import { GetPrismaClient } from "@/app/db/prisma";
import { GetRoster } from "@/app/data/Roster/GetRoster";
import { GetOperatives } from "@/app/data/Operative/GetOperatives";
import { GetRandomRosterId } from "@/app/data/Roster/GetRandomRosterId";
import { GetRosterByUserId } from "@/app/data/Roster/GetRosterByUserId";
import { LoadKillTeam } from "@/app/data/Killteam/LoadKillTeam";
import { GetTacOps } from "@/app/data/Roster/GetTacOps";
import { GetRosterEquipment } from "@/app/data/Roster/GetRosterEquipment";
import { LoadOperatives } from "@/app/data/Operative/LoadOperatives";
import { LoadEquipments } from "@/app/data/RosterOperative/LoadEquipments";
import { UpdateViewCount } from "@/app/data/Roster/UpdateViewCount";

export async function GET(req) {
  let [loadRoasterDetail, randomSpotlight, rosterId] = [
    req.nextUrl.searchParams.get("loadRosterDetail") ?? undefined,
    req.nextUrl.searchParams.get("randomSpotlight") ?? undefined,
    req.nextUrl.searchParams.get("rosterId") ?? undefined,
  ];

  if (loadRoasterDetail.length > 2 || randomSpotlight.length > 1) {
    return Response.json({ error: "Invalid params" }, { status: 400 });
  }

  if (randomSpotlight === "1") {
    rosterId = await GetRandomRosterId();
  }

  // No roster id passed in, need to get user's roster
  if (!rosterId) {
    // TODO: Add auth check here

    const userRoster = await GetRosterByUserId(loadRoasterDetail, "123");
    const userRosterData = Promise.all(
      userRoster.map(
        async (ur) =>
          await Promise.all([
            GetOperatives("123", ur.rosterid),
            LoadKillTeam(ur.factionid),
            GetTacOps("123", ur.rosterid),
            GetRosterEquipment(ur.rosterid),
          ]),
      ),
    );

    return Response.json({ userRosterData });
  } else {
    const roster = await GetRoster(rosterId);

    if (!roster)
      return Response.json({ error: "Roster Not Found" }, { status: 404 });

    const rosterData = Promise.all([
      LoadOperatives("123", roster[0].rosterid),
      GetTacOps("123", roster[0].rosterid),
      LoadEquipments(roster[0].factionid, roster[0].killteamid, roster[0].eqid),
    ]);

    if (loadRoasterDetail > 0) {
      rosterData.killTeam = await LoadKillTeam(
        roster[0].factionid,
        roster.killteamid,
      );
    }

    const skipViewCount = req.params["skipviewcount"];

    // TODO: Add if req user ==== roster's user id
    if (!!skipViewCount && skipViewCount != "1") {
      await UpdateViewCount(roster[0].rosterid);
    }

    return Response.json({ rosterData }, { status: 200 });
  }
}
