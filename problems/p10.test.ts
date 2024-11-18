import { describe, it, expect, beforeEach } from "vitest";
import { clearDb, seedFixtures } from "../seed-helpers";
import { deleteAllUsersWithAgeUnderN } from "./p10";
import { prisma } from "./prisma";
import { filter, pipe, sortBy } from "remeda";
import { readFile } from "fs/promises";
import path from "path";

describe("p10", () => {
  beforeEach(async () => {
    await clearDb();
  });

  it("should use rawSQL and not the ORM", async () => {
    const solution = await readFile(path.join(__dirname, "p10.ts"), "utf-8");
    expect(solution.match(/prisma\.(user|starRating|movie)/)).toBeFalsy();
  });

  it("deletaAllUsersWithAgeUnderN should exist", () => {
    expect(deleteAllUsersWithAgeUnderN).toBeInstanceOf(Function);
  });

  it("shouldn't explode due to foreign key constraint issues", async () => {
    await seedFixtures();

    const didFail = await Promise.resolve()
      .then(() => deleteAllUsersWithAgeUnderN(20))
      .catch(() => "failed");

    expect(didFail).not.toBe("failed");
  });
  it("should delete all users with age under 20", async () => {
    const { users } = await seedFixtures();
    const usersNotUnder20 = pipe(
      Object.values(users),
      filter((user) => user.age >= 20),
      sortBy((user) => user.age)
    );

    await deleteAllUsersWithAgeUnderN(20);
    const usersAfterMutation = pipe(
      await prisma.user.findMany({}),
      sortBy((user) => user.age)
    );

    expect(usersAfterMutation).toEqual(usersNotUnder20);
  });
});
