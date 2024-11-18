/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { describe, expect, it, beforeEach } from "vitest";
import { clearDb, seedFixtures } from "../seed-helpers";
import { updateUsername } from "./p9";
import { prisma } from "./prisma";
import { readFile } from "fs/promises";
import path from "path";
describe("p9", () => {
  beforeEach(async () => {
    await clearDb();
  });

  it("should use rawSQL and not the ORM", async () => {
    const solution = await readFile(path.join(__dirname, "p9.ts"), "utf-8");
    expect(solution.match(/prisma\.(user|starRating|movie)/)).toBeFalsy();
  });

  it("updateUsername should be a function", () => {
    expect(updateUsername).toBeInstanceOf(Function);
  });

  it("should update jons username to 'superjon9000'", async () => {
    const { users } = await seedFixtures();
    const result = await updateUsername(users.jon.id, "superjon9000");
    console.log(result);
    const jon = await prisma.user.findFirst({
      where: {
        id: users.jon.id,
      },
    });
    expect(jon?.username).toBe("superjon9000");
  });
});
