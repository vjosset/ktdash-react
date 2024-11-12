import {GetPrismaClient} from "@/app/db/prisma";
import {Prisma} from "@prisma/client";

export async function LoadUniqueAction(factionid, killteamid, fireteamid, opid) {
    const prisma = await GetPrismaClient()

    return prisma.$queryRaw(Prisma.sql`SELECT * FROM UniqueAction WHERE factionid = factionid AND killteamid = killteamid AND fireteamid = fireteamid AND opid = opid`)

}