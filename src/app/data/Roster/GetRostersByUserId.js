import { findSingleGeneric, GetPrismaClient } from "@/app/db/prisma";
import { Prisma } from "@prisma/client";
import { orderBy } from "lodash";

export async function GetRostersByUserId(userId) {
  const prisma = await GetPrismaClient();

  return prisma.RosterView.findMany({
    where: {
        userid: userId
    },
    orderBy: {
      seq: 'asc'
    }
});
}
