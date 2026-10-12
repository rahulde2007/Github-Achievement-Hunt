import assert from "node:assert/strict";
import test from "node:test";
import { achievements } from "../js/achievements.js";
import { getAchievementGuide } from "../js/mission-details.js";

test("every listed achievement has a sourced, cautious instruction guide", () => {
  assert.equal(achievements.length, 6);

  for (const achievement of achievements) {
    const guide = getAchievementGuide(achievement.id);

    assert.ok(guide.exactRequirement.length > 50, `${achievement.name} explains unknown criteria`);
    assert.equal(guide.steps.length, 4, `${achievement.name} has four steps`);
    assert.ok(guide.steps.every((step) => step.length > 20));
  }
});

test("guides do not encourage bypassing safeguards or inventing co-authorship", () => {
  assert.match(getAchievementGuide("yolo").steps.join(" "), /Never skip or disable a review/);
  assert.match(
    getAchievementGuide("pair-extraordinaire").steps.join(" "),
    /Never add a co-author who did not contribute/,
  );
  assert.match(getAchievementGuide("quickdraw").exactRequirement, /unverified/i);
});

test("unknown achievement guides fail explicitly", () => {
  assert.throws(() => getAchievementGuide("unknown"), RangeError);
});
