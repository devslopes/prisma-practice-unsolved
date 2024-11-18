import { prisma } from "./prisma";
import { getAllPG13Movies as getAllPG13MoviesQuery } from "@prisma/client/sql";

// get All Pg-13 movies, ordered by release year descending
export const getAllPG13Movies = () => {
  return prisma.$queryRawTyped(getAllPG13MoviesQuery());
};
