import { prisma } from "./prisma";
import { getNYoungestUsersQuery } from "@prisma/client/sql";

// We want to grab the first N youngest users
// hint: The garden has leaves, I think you should rake, to give me an answer, first you should "take"
export const getNYoungestUsers = (howManyUsersToGrab: number) => {
  return prisma.$queryRawTyped(getNYoungestUsersQuery(howManyUsersToGrab));
};
