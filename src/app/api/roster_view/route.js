import {GetPrismaClient} from "@/app/db/prisma";

export default async function GET(req, res) {
    const prisma = GetPrismaClient()

    const data = await prisma.roster

}