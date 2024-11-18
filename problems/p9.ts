import { updateUsername as updateUsernameQuery } from "@prisma/client/sql";
import { prisma } from "./prisma";

export const updateUsername = async (userId: number, newUsername: string) => {
  return prisma.$queryRawTyped(updateUsernameQuery(newUsername, userId));
};
