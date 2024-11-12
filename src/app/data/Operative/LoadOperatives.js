import { GetRosterOperative } from "@/app/data/RosterOperative/GetRosterOperative";
import { GetROWeapons } from "@/app/data/RosterOperative/GetROWeapons";
import { GetOperative } from "@/app/data/Operative/GetOperative";

export async function LoadOperatives(userId, rosterId) {
  const ro = await GetRosterOperative(rosterId);
  const roData = ro.map(
    async (r) =>
      await Promise.all([
        GetOperative(r.factionid, r.killteamid, r.fireteamid, r.opid),
        GetROWeapons(r.factionid, r.killteamid, r.fireteamid, r.opid, r.wepids),
      ]),
  );
}
