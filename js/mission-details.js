const achievementGuides = {
  quickdraw: {
    exactRequirement:
      "GitHub does not publish a confirmed timing rule, award threshold, or current eligibility rule for Quickdraw in the public documentation linked here. The often-repeated five-minute rule is unverified.",
    steps: [
      "Work on a real issue or pull request that is appropriate for the project.",
      "Resolve or close it only when the work is genuinely complete and the project process calls for it.",
      "Explain the resolution and follow the maintainers' normal workflow; do not race a timer to pursue a badge.",
      "Check your GitHub profile for an award. This guide cannot verify or guarantee one.",
    ],
  },
  "pull-shark": {
    exactRequirement:
      "GitHub's public documentation does not specify an eligible pull-request count, tier threshold, or guarantee that merged pull requests will earn Pull Shark.",
    steps: [
      "Choose a useful change that fits a repository's contribution guidelines.",
      "Create a focused branch and open a pull request with a clear description.",
      "Respond to feedback and complete any reviews and checks required by the project.",
      "Have the pull request merged through the repository's normal process, then check your GitHub profile.",
    ],
  },
  yolo: {
    exactRequirement:
      "GitHub does not document a confirmed no-review rule, eligible scope, or threshold for YOLO in the public documentation linked here. Do not bypass required reviews or repository safeguards.",
    steps: [
      "Read the repository's contribution and branch-protection rules before proposing a change.",
      "Open a pull request only for a genuine contribution and follow every required review and check.",
      "Never skip or disable a review, required check, or safeguard to pursue an achievement.",
      "GitHub's award criteria are not confirmed here; check your profile rather than assuming eligibility.",
    ],
  },
  "galaxy-brain": {
    exactRequirement:
      "GitHub's public documentation explains accepted answers in Discussions but does not specify a required number of accepted answers or guarantee a Galaxy Brain award.",
    steps: [
      "Find a relevant GitHub Discussion where you can contribute useful, accurate knowledge.",
      "Write a clear answer that addresses the question and includes context or references when helpful.",
      "Let the question author or community decide whether the answer resolves the discussion; do not request an acceptance solely for a badge.",
      "Check your GitHub profile. An accepted answer does not guarantee an achievement.",
    ],
  },
  starstruck: {
    exactRequirement:
      "GitHub's public documentation does not specify a Starstruck star threshold, eligible repository scope, or guarantee that a repository will receive an award.",
    steps: [
      "Build or maintain a repository that is useful to its intended audience.",
      "Provide clear documentation and keep the project in good working order.",
      "Share the project appropriately; other users decide independently whether to star it.",
      "Check your GitHub profile. Stars or repository popularity do not guarantee an achievement.",
    ],
  },
  "pair-extraordinaire": {
    exactRequirement:
      "GitHub's public documentation describes commit co-authorship but does not specify Pair Extraordinaire's exact qualifying rules, required count, or guarantee an award.",
    steps: [
      "Collaborate on a real change with someone who makes a genuine contribution.",
      "Credit contributors accurately using GitHub's documented co-author commit format when appropriate.",
      "Submit the work through the repository's normal pull-request and review process.",
      "Check your profile after the work is merged. Never add a co-author who did not contribute.",
    ],
  },
};

export function getAchievementGuide(achievementId) {
  const guide = achievementGuides[achievementId];

  if (!guide) {
    throw new RangeError(`No achievement guide is available for: ${achievementId}`);
  }

  return guide;
}
