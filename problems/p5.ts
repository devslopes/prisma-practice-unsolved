import { getAllMoviesWithAverageScoreOverN as getAllMoviesWithAverageScoreOverNQuery } from "@prisma/client/sql";
import { prisma } from "./prisma";

export const getAllMoviesWithAverageScoreOverN = async (n: number) => {
  return prisma.$queryRawTyped(getAllMoviesWithAverageScoreOverNQuery(n));
};
