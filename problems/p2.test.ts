/* eslint-disable @typescript-eslint/no-unused-vars */
import { describe, expect, it, beforeEach } from "vitest";
import { clearDb, seedFixtures } from "../seed-helpers";
import { getNYoungestUsers } from "./p2";
import { sortBy } from "remeda";
import { readFile } from "fs/promises";
import path from "path";

describe("p2", () => {
  beforeEach(async () => {
    await clearDb();
  });

  it("should use rawSQL and not the ORM", async () => {
    const solution = await readFile(path.join(__dirname, "p2.ts"), "utf-8");
    expect(solution.match(/prisma\.(user|starRating|movie)/)).toBeFalsy();
  });
  it("getAllUsers should be a function", () => {
    expect(getNYoungestUsers).toBeInstanceOf(Function);
  });

  it("should return the youngest user in an array if howManyUsersToGrab = 1", async () => {
    const { users } = await seedFixtures();
    const sortedByAgeUsers = sortBy(Object.values(users), (n) => n.age);
    const [youngestUser, _secondYoungestUser, _thirdYoungestUser] =
      sortedByAgeUsers;

    expect(await getNYoungestUsers(1)).toEqual([youngestUser]);
  });

  it("should return the youngest user and secondYoungest in an array if howManyUsersToGrab = 2", async () => {
    const { users } = await seedFixtures();
    const sortedByAgeUsers = sortBy(Object.values(users), (n) => n.age);
    const [youngestUser, secondYoungestUser, _thirdYoungestUser] =
      sortedByAgeUsers;

    expect(await getNYoungestUsers(2)).toEqual([
      youngestUser,
      secondYoungestUser,
    ]);
  });

  it("should return the youngest user and secondYoungest and thirdYoungest in an array if howManyUsersToGrab = 3", async () => {
    const { users } = await seedFixtures();
    const sortedByAgeUsers = sortBy(Object.values(users), (n) => n.age);
    const [youngestUser, secondYoungestUser, thirdYoungestUser] =
      sortedByAgeUsers;

    expect(await getNYoungestUsers(3)).toEqual([
      youngestUser,
      secondYoungestUser,
      thirdYoungestUser,
    ]);
  });
});
