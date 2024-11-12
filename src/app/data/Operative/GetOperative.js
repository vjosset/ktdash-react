import { LoadAbilities } from "@/app/data/Operative/LoadAbilities";
import { LoadUniqueAction } from "@/app/data/Operative/LoadUniqueAction";
import { LoadWeapons } from "@/app/data/Operative/LoadWeapons";

export async function GetOperative(factionid, killteamid, fireteamid, opid) {
  const [abilities, uniqueActions, weapons] = await Promise.all([
    LoadAbilities(factionid, killteamid, fireteamid, opid),
    LoadUniqueAction(factionid, killteamid, fireteamid, opid),
    LoadWeapons(factionid, killteamid, fireteamid, opid),
  ]);
}
