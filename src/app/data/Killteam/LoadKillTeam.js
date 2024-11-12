import { GetPloys } from "@/app/data/Killteam/GetPloys";
import { GetEquipments } from "@/app/data/Killteam/GetEquipments";
import { GetWeaponByEqId } from "@/app/data/Weapon/GetWeaponByEqId";
import { GetWeaponProfile } from "@/app/data/Weapon/GetWeaponProfile";
import { GetKillTeam } from "@/app/data/Killteam/GetKillTeam";

export async function LoadKillTeam(factionId, ktId) {
  const [killTeam, ploys, equipments] = await Promise.all([
    GetKillTeam(factionId, ktId),
    GetPloys(factionId, ktId),
    GetEquipments(factionId, ktId),
  ]);

  const getWeapons = equipments.map(
    async (e) =>
      await GetWeaponByEqId(factionId, ktId, e.eqid).then(async (w) => {
        const wp = await GetWeaponProfile(
          factionId,
          ktId,
          w.fireteamid,
          w.opid,
          w.wepid,
        );

        if (!!wp) return { ...e, weapons: { ...w, profile: wp } };
        else return wp;
      }),
  );

  killTeam.ploys = ploys;
  killTeam.equipments = await Promise.all(getWeapons);

  return killTeam;
}
