import {
  findGrumpiestCriticId as findGrumpiestCriticIdQuery,
  findNicestCriticId as findNicestCriticIdQuery,
} from "@prisma/client/sql";

import { prisma } from "./prisma";
// find the critic with the lowest average score
export const findTheGrumpiestCriticId = async () => {
  return prisma
    .$queryRawTyped(findGrumpiestCriticIdQuery())
    .then((result) => result[0].id);
};

// find the critic with the highest average score
export const findTheNicestCriticId = async () => {
  return prisma
    .$queryRawTyped(findNicestCriticIdQuery())
    .then((result) => result[0].id);
};
