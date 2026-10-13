const achievementsData = [
  {
    id: "quickdraw",
    name: "Quickdraw",
    description:
      "A profile achievement historically associated with resolving an issue or pull request quickly.",
    category: "Issues",
    status: "unknown",
    artwork: {
      path: "./assets/images/quickdraw-default.png",
      alt: "Quickdraw badge artwork showing the GitHub mascot in a cowboy hat",
      source: "https://github.githubassets.com/images/modules/profile/achievements/quickdraw-default.png",
    },
    keywords: ["issue", "close", "resolve", "pull request", "timing", "historical"],
    requirements:
      "The often-repeated timing description is not confirmed in the public GitHub documentation linked here. Do not race or close issues solely to pursue an achievement.",
    availability:
      "Current availability is uncertain; a live badge image or historical description does not establish that it can still be earned.",
    source: {
      label: "GitHub issues guide",
      url: "https://docs.github.com/en/issues/tracking-your-work-with-issues/learning-about-issues/about-issues",
    },
  },
  {
    id: "pull-shark",
    name: "Pull Shark",
    description:
      "A GitHub profile achievement commonly associated with merged pull-request activity.",
    category: "Pull requests",
    status: "unknown",
    artwork: {
      path: "./assets/images/pull-shark-default.png",
      alt: "Pull Shark badge artwork showing the GitHub mascot in a shark costume",
      source: "https://github.githubassets.com/images/modules/profile/achievements/pull-shark-default.png",
    },
    keywords: ["pull request", "merge", "review", "contribution", "code"],
    requirements:
      "Commonly associated with merged pull requests. GitHub's public documentation does not specify an award threshold or guarantee an award.",
    availability:
      "Current award availability and tier thresholds are not confirmed in the public documentation linked here.",
    source: {
      label: "Creating a pull request",
      url: "https://docs.github.com/en/pull-requests/how-tos/create-pull-requests/creating-a-pull-request",
    },
  },
  {
    id: "yolo",
    name: "YOLO",
    description:
      "A GitHub profile achievement commonly associated with merging a pull request without review.",
    category: "Pull requests",
    status: "unknown",
    artwork: {
      path: "./assets/images/yolo-default.png",
      alt: "YOLO badge artwork with colorful YOLO lettering",
      source: "https://github.githubassets.com/images/modules/profile/achievements/yolo-default.png",
    },
    keywords: ["pull request", "merge", "review", "no review"],
    requirements:
      "The no-review description is commonly associated with this achievement, not a rule stated in GitHub's public documentation. Never bypass required reviews or repository safeguards.",
    availability:
      "Current award availability and tier thresholds are not confirmed in the public documentation linked here.",
    source: {
      label: "GitHub pull request reference",
      url: "https://docs.github.com/en/pull-requests",
    },
  },
  {
    id: "galaxy-brain",
    name: "Galaxy Brain",
    description:
      "A GitHub profile achievement commonly associated with helpful answers accepted in Discussions.",
    category: "Discussions",
    status: "unknown",
    artwork: {
      path: "./assets/images/galaxy-brain-default.png",
      alt: "Galaxy Brain badge artwork showing a glowing brain",
      source: "https://github.githubassets.com/images/modules/profile/achievements/galaxy-brain-default.png",
    },
    keywords: ["discussion", "answer", "accepted answer", "community", "help"],
    requirements:
      "Commonly associated with answers marked as accepted in GitHub Discussions. Another participant makes that decision; an accepted answer does not guarantee an award.",
    availability:
      "Current award availability and tier thresholds are not confirmed in the public documentation linked here.",
    source: {
      label: "GitHub Discussions guide",
      url: "https://docs.github.com/en/discussions/collaborating-with-your-community-using-discussions/about-discussions",
    },
  },
  {

    id: "starstruck",
    name: "Starstruck",
    description:
      "A GitHub profile achievement commonly associated with stars received by a repository.",
    category: "Repositories",
    status: "unknown",
    artwork: {
      path: "./assets/images/starstruck-default.png",
      alt: "Starstruck badge artwork showing the GitHub mascot with star-shaped eyes",
      source: "https://github.githubassets.com/images/modules/profile/achievements/starstruck-default.png",
    },
    keywords: ["star", "stars", "repository", "repo", "popularity"],
    requirements:
      "Commonly associated with repository stars, which other users choose to give. GitHub's public documentation linked here does not specify ownership rules or thresholds.",
    availability:
      "Current award availability and tier thresholds are not confirmed in the public documentation linked here.",
    source: {
      label: "GitHub starring guide",
      url: "https://docs.github.com/en/get-started/exploring-projects-on-github/saving-repositories-with-stars",
    },
  },
  {
    id: "pair-extraordinaire",
    name: "Pair Extraordinaire",
    description:
      "A GitHub profile achievement commonly associated with genuine co-authored contributions.",
    category: "Collaboration",
    status: "unknown",
    artwork:     {
      path: "./assets/images/pair-extraordinaire-default.png",
      alt: "Pair Extraordinaire badge artwork showing two peas in a pod",
      source: "https://github.githubassets.com/images/modules/profile/achievements/pair-extraordinaire-default.png",
    },
    keywords: ["pair", "pairing", "co-author", "co-authored", "collaboration", "pull request"],
    requirements:
      "Commonly associated with genuine co-authored work on merged pull requests. Credit only people who actually contributed; public docs do not specify award thresholds.",
    availability:
      "Current award availability and exact co-authoring rules are not confirmed in the public documentation linked here.",
    source: {
      label: "GitHub commit authors guide",
      url: "https://docs.github.com/en/pull-requests/how-tos/commit-changes/creating-a-commit-with-multiple-authors",
    },
  },
];

/**
 * These are profile achievement names with commonly associated activity descriptions,
 * not official eligibility rules. Status is deliberately unknown because this static
 * guide has no access to a visitor's profile.
 */
export const achievements = Object.freeze(
  achievementsData.map((achievement) =>
    Object.freeze({
      ...achievement,
      keywords: Object.freeze([...achievement.keywords]),
      artwork: Object.freeze({ ...achievement.artwork }),
      source: Object.freeze({ ...achievement.source }),
    }),
  ),
);
