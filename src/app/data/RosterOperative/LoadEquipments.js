import { GetEquipments } from "@/app/data/RosterOperative/GetEquipments";
import { GetWeaponByEqId } from "@/app/data/Weapon/GetWeaponByEqId";
import { GetWeaponProfile } from "@/app/data/Weapon/GetWeaponProfile";

export async function LoadEquipments(factionId, killteamId, eqId) {
  const equipments = await GetEquipments(factionId, killteamId, eqId);

  const loadEquipmentData = equipments.map(async (e) => {
    if (e.eqtype === "Weapon")
      return await GetWeaponByEqId(factionId, killteamId, eqId).then(
        async (w) =>
          await GetWeaponProfile(
            factionId,
            killteamId,
            e.fireteamid,
            e.opid,
            e.wepid,
          ),
      );
  });

  return await Promise.all(loadEquipmentData);
}
