import { describe, expect, it, beforeEach } from "vitest";
import { clearDb, seedFixtures } from "../seed-helpers";
import { sumBy } from "remeda";
import { getAverageUserAge } from "./p3";
import { prisma } from "./prisma";
import { readFile } from "fs/promises";
import path from "path";

describe("p3", () => {
  beforeEach(async () => {
    await clearDb();
  });

  it("should use rawSQL and not the ORM", async () => {
    const solution = await readFile(path.join(__dirname, "p3.ts"), "utf-8");
    expect(solution.match(/prisma\.(user|starRating|movie)/)).toBeFalsy();
  });

  it("getAverageUserAge should be a function", () => {
    expect(getAverageUserAge).toBeInstanceOf(Function);
  });

  it("should return the youngest user in an array if howManyUsersToGrab = 1", async () => {
    const { users } = await seedFixtures();
    const allUsers = Object.values(users);
    const ageSum = sumBy(allUsers, (n) => n.age);
    const expected = ageSum / allUsers.length;
    const actual = await getAverageUserAge();

    expect(actual).toEqual(expected);
  });

  it("should work when I add another user", async () => {
    const { users } = await seedFixtures();
    const allUsers = Object.values(users);
    const newUser = await prisma.user.create({
      data: {
        age: 55,
        username: "jimbyjimbl",
      },
    });
    const ageSum = sumBy([...allUsers, newUser], (n) => n.age);
    const expected = ageSum / (allUsers.length + 1);
    const actual = await getAverageUserAge();

    expect(actual).toEqual(expected);
  });
});
