import { findSingleGeneric, GetPrismaClient } from "@/app/db/prisma";
import { Prisma } from "@prisma/client";

export async function GetRosterByUserId(userId) {
  const prisma = await GetPrismaClient();

  return prisma.RosterView.findMany({
    where: {
        userid: userId
    }
});
}
