/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, expect, it, beforeEach } from "vitest";
import { clearDb, seedFixtures } from "../seed-helpers";
import { findTheGrumpiestCriticId, findTheNicestCriticId } from "./p8";
import { readFile } from "fs/promises";
import path from "path";

describe("p7", () => {
  beforeEach(async () => {
    await clearDb();
  });

  it("should use rawSQL and not the ORM", async () => {
    const solution = await readFile(path.join(__dirname, "p8.ts"), "utf-8");
    expect(solution.match(/prisma\.(user|starRating|movie)/)).toBeFalsy();
  });

  it("findGrumpiestCriticId should be a function", () => {
    expect(findTheGrumpiestCriticId).toBeInstanceOf(Function);
  });

  it("should return Peter", async () => {
    const { users } = await seedFixtures();

    expect(await findTheGrumpiestCriticId()).toEqual(users.peter.id);
  });

  it("findTheNicestCriticId should be a function", async () => {
    expect(findTheNicestCriticId).toBeInstanceOf(Function);
  });

  it("the nicest critic should be andrey", async () => {
    const { users } = await seedFixtures();

    expect(await findTheNicestCriticId()).toEqual(users.andrey.id);
  });
});
