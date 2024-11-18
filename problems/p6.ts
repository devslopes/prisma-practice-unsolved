import { prisma } from "./prisma";
import { findAllMoviesThatAUserWatched as findAllMoviesThatAUserWatchedQuery } from "@prisma/client/sql";

// find all movies that a user has watched
export const findAllMoviesThatAUserWatched = async (userId: number) => {
  return prisma.$queryRawTyped(findAllMoviesThatAUserWatchedQuery(userId));
};
