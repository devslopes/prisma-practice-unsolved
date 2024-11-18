/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, expect, it, beforeEach } from "vitest";
import { clearDb, seedFixtures } from "../seed-helpers";
import { getAverageScoreForUser } from "./p7";
import { pipe } from "remeda";
import { averageBy } from "../utils";
import { readFile } from "fs/promises";
import path from "path";

describe("p7", () => {
  beforeEach(async () => {
    await clearDb();
  });

  it("should use rawSQL and not the ORM", async () => {
    const solution = await readFile(path.join(__dirname, "p7.ts"), "utf-8");
    expect(solution.match(/prisma\.(user|starRating|movie)/)).toBeFalsy();
  });

  it("getAverageScoreForUser should be a function", () => {
    expect(getAverageScoreForUser).toBeInstanceOf(Function);
  });

  it("should return a number for a user that exists", async () => {
    const {
      users: { peter },
    } = await seedFixtures();

    const actual = await getAverageScoreForUser(peter.id);

    expect(typeof actual).toEqual("number");
  });

  it("should get the average score for peter", async () => {
    const {
      users: { peter },
      petersRatings,
    } = await seedFixtures();

    const expected = pipe(
      petersRatings,
      averageBy((n) => n.score),
      (n) => n.toPrecision(5)
    );

    const result = await getAverageScoreForUser(peter.id);
    // @ts-expect-error bigint
    const actual = await pipe(result, (n) => n && (n as number).toPrecision(5));

    expect(actual).toEqual(expected);
  });

  it("should get the average score for rachel", async () => {
    const {
      users: { rachel },
      rachelsRatings,
    } = await seedFixtures();

    const expected = pipe(
      rachelsRatings,
      averageBy((n) => n.score),
      (n) => n.toPrecision(5)
    );

    const actual = await pipe(
      await getAverageScoreForUser(rachel.id),
      // @ts-expect-error bigint
      (n) => n && (n as number).toPrecision(5)
    );

    expect(actual).toEqual(expected);
  });
});
