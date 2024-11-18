import { prisma } from "./prisma";
import { getAverageScoreForUser as getAverageScoreForUserQuery } from "@prisma/client/sql";

export const getAverageScoreForUser = async (userId: number) => {
  return prisma
    .$queryRawTyped(getAverageScoreForUserQuery(userId))
    .then((result) => result[0]['AVG(sr."score")']);
};
