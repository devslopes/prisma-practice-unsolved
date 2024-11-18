import { prisma } from "./prisma";
import { deleteAllUsersWithAgeUnderN as deleteAllUsersWithAgeUnderNQuery } from "@prisma/client/sql";
// Deleting a thing, only works swell, if things that reference it are deleted as well
export const deleteAllUsersWithAgeUnderN = async (n: number) => {
  return prisma.$queryRawTyped(deleteAllUsersWithAgeUnderNQuery(n));
};
