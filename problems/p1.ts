import { prisma } from "./prisma";
import { getAllUsersQuery } from "@prisma/client/sql";

// Hint: look up "orderBy"
// get an array of all users
export const getAllUsers = () => {
  return prisma.$queryRawTyped(getAllUsersQuery());
};
