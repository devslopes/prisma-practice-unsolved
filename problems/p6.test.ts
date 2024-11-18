/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, expect, it, beforeEach } from "vitest";
import { clearDb, seedFixtures } from "../seed-helpers";
import { map, pipe, sortBy } from "remeda";
import { findAllMoviesThatAUserWatched } from "./p6";
import { readFile } from "fs/promises";
import path from "path";

describe("p6", () => {
  beforeEach(async () => {
    await clearDb();
  });

  it("should use rawSQL and not the ORM", async () => {
    const solution = await readFile(path.join(__dirname, "p6.ts"), "utf-8");
    expect(solution.match(/prisma\.(user|starRating|movie)/)).toBeFalsy();
  });

  it("findAllMoviesThatAUserWatched should be a function", () => {
    expect(findAllMoviesThatAUserWatched).toBeInstanceOf(Function);
  });

  it("Should give me all the movies that rachel has watched", async () => {
    const {
      users: { rachel },
      rachelsRatings,
      allMovies,
    } = await seedFixtures();

    const expected = pipe(
      rachelsRatings,
      map(
        (rating) =>
          Object.values(allMovies).find((movie) => movie.id === rating.movieId)!
      ),
      sortBy((movie) => movie.id)
    );

    const actual = pipe(
      await findAllMoviesThatAUserWatched(rachel.id),
      sortBy((movie) => movie.id)
    );

    expect(actual).toEqual(expected);
  });

  it("Should give me all the movies that jon has watched", async () => {
    const {
      users: { jon },
      jonsRatings,
      allMovies,
    } = await seedFixtures();

    const expected = pipe(
      jonsRatings,
      map(
        (rating) =>
          Object.values(allMovies).find((movie) => movie.id === rating.movieId)!
      ),
      sortBy((movie) => movie.id)
    );

    const actual = pipe(
      await findAllMoviesThatAUserWatched(jon.id),
      sortBy((movie) => movie.id)
    );

    expect(actual).toEqual(expected);
  });
});
