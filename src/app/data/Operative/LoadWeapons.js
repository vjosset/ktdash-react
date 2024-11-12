import {GetPrismaClient} from "@/app/db/prisma";
import {Prisma} from "@prisma/client";

export async function LoadWeapons(factionid, killteamid, fireteamid, opid) {
    const prisma = await GetPrismaClient()

    return prisma.$queryRaw(Prisma.sql`SELECT W.*, WP.profileid, W.weptype, WP.name, WP.A, WP.BS, WP.D, WP.A, WP.SR, W.isdefault FROM Weapon W INNER JOIN WeaponProfile WP ON WP.killteamid = W.killteamid AND WP.fireteamid = W.fireteamid AND W.opid = WP.opid AND WP.wepid = W.wepid WHERE W.factionid = factionid AND W.killteamid = killteamid AND W.fireteamid = fireteamid AND W.opid = opid ORDER BY W.weptype DESC, W.wepseq,W.wepname, WP.profileid;`)
}