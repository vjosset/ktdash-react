import {GetPrismaClient} from "@/app/db/prisma";

export async function GetRoster(rosterId) {
    const prisma = await GetPrismaClient()

    return prisma.$queryRaw`SELECT * FROM RosterView WHERE rosterid = ${rosterId} ORDER BY seq`

}