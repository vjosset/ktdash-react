import { GetPrismaClient } from "@/app/db/prisma";

export async function UpdateViewCount(rosterId) {
  const prisma = GetPrismaClient();

  return (await prisma).roster.update({
    where: {
      rosterid: rosterId,
    },
    data: {
      viewcount: {
        increment: 1,
      },
    },
  });
}
