import { prisma } from "./prisma";
import { createUserWithData as createUserWithDataQuery } from "@prisma/client/sql";

export const createUserWithData = async ({
  username,
  age,
}: {
  username: string;
  age: number;
}) => {
  return prisma.$queryRawTyped(createUserWithDataQuery(username, age));
};
