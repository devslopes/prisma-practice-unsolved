import { describe, it, expect, beforeEach } from "vitest";
import { clearDb } from "../seed-helpers";
import { prisma } from "./prisma";
import { createUserWithData } from "./p11";
import { readFile } from "fs/promises";
import path from "path";

describe("p11", () => {
  beforeEach(async () => {
    await clearDb();
  });

  it("should use rawSQL and not the ORM", async () => {
    const solution = await readFile(path.join(__dirname, "p11.ts"), "utf-8");
    expect(solution.match(/prisma\.(user|starRating|movie)/)).toBeFalsy();
  });

  it("createUserWithData should exist", () => {
    expect(createUserWithData).toBeInstanceOf(Function);
  });

  it("should create a user", async () => {
    const userObj = {
      age: 2,
      username: "chillMcChillerton",
    };

    await createUserWithData(userObj);

    const usersAfterMutation = await prisma.user.findMany({});

    const userFromDb = usersAfterMutation[0];

    expect(userFromDb.age).toBe(userObj.age);
    expect(userFromDb.username).toBe(userObj.username);
  });
});
