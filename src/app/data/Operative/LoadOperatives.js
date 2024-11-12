import { GetRosterOperative, GetRosterOperatives } from "@/app/data/RosterOperative/GetRosterOperative";
import { GetROWeapons } from "@/app/data/RosterOperative/GetROWeapons";
import { GetOperative } from "@/app/data/Operative/GetOperative";

export async function LoadOperatives(roster) {
  // Pull all RosterOperatives for this roster, and add them in the "operatives" member
  if (roster) {
    roster.operatives = await GetRosterOperatives(rosterid);
  }

  // Now load their weapons and equipments/options
  // TODO
}
