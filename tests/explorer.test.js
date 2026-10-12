import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { achievements } from "../js/achievements.js";
import { filterAchievements, getAchievementCategories } from "../js/filters.js";

test("Explorer retains all six local badge images and unknown profile statuses", () => {
  assert.equal(achievements.length, 6);

  for (const achievement of achievements) {
    assert.equal(achievement.status, "unknown");
    assert.ok(
      existsSync(fileURLToPath(new URL(`../${achievement.artwork.path.replace("./", "")}`, import.meta.url))),
      `${achievement.name} badge artwork exists locally`,
    );
  }
});

test("Explorer search matches names, categories, and related activity", () => {
  assert.deepEqual(
    filterAchievements(achievements, { query: "galaxy brain" }).map(({ id }) => id),
    ["galaxy-brain"],
  );
  assert.deepEqual(
    filterAchievements(achievements, { query: "accepted answer" }).map(({ id }) => id),
    ["galaxy-brain"],
  );
  assert.deepEqual(
    filterAchievements(achievements, { category: "Collaboration" }).map(({ id }) => id),
    ["pair-extraordinaire"],
  );
  assert.deepEqual(
    filterAchievements(achievements, { status: "unlocked" }),
    [],
  );
});

test("Explorer keeps guide order and supports name and category sorting", () => {
  assert.deepEqual(
    filterAchievements(achievements).map(({ id }) => id),
    [
      "quickdraw",
      "pull-shark",
      "yolo",
      "galaxy-brain",
      "starstruck",
      "pair-extraordinaire",
    ],
  );
  assert.deepEqual(
    filterAchievements(achievements, { sortBy: "name" }).map(({ name }) => name),
    [...achievements].map(({ name }) => name).sort((a, b) => a.localeCompare(b)),
  );
  assert.deepEqual(
    getAchievementCategories(achievements),
    ["Collaboration", "Discussions", "Issues", "Pull requests", "Repositories"],
  );
  assert.throws(
    () => filterAchievements(achievements, { sortBy: "unsupported" }),
    RangeError,
  );
});
