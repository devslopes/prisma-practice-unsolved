import { prisma } from "./prisma";
import { getAverageUserAgeQuery } from "@prisma/client/sql";
// Get the average age of all users
// hint: the hot tub is hot, the water is great, to solve this problem you should "aggregate"
export const getAverageUserAge = async () => {
  return prisma.$queryRawTyped(getAverageUserAgeQuery()).then((result) => {
    return result[0]['AVG("age")'];
  });
};
