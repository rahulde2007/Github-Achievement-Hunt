function normalize(value) {
  return String(value ?? "").trim().toLocaleLowerCase();
}

export function getAchievementCategories(achievements) {
  if (!Array.isArray(achievements)) {
    throw new TypeError("Achievements must be provided as an array.");
  }

  return [...new Set(achievements.map((achievement) => achievement.category))].sort((a, b) =>
    a.localeCompare(b),
  );
}

/**
 * Search and filter achievement records without inferring user eligibility.
 * Supported status values describe profile data and may be "unknown".
 */
export function filterAchievements(
  achievements,
  { query = "", category = "all", status = "all", sortBy = "guide" } = {},
) {
  if (!Array.isArray(achievements)) {
    throw new TypeError("Achievements must be provided as an array.");
  }

  const normalizedQuery = normalize(query);
  const normalizedCategory = normalize(category);
  const normalizedStatus = normalize(status);

  const results = achievements.filter((achievement) => {
    const searchableText = [
      achievement.name,
      achievement.description,
      achievement.category,
      achievement.requirements,
      achievement.availability,
      ...(achievement.keywords ?? []),
    ]
      .map(normalize)
      .join(" ");

    const matchesQuery = !normalizedQuery || searchableText.includes(normalizedQuery);
    const matchesCategory =
      !normalizedCategory ||
      normalizedCategory === "all" ||
      normalize(achievement.category) === normalizedCategory;
    const matchesStatus =
      !normalizedStatus ||
      normalizedStatus === "all" ||
      normalize(achievement.status) === normalizedStatus;

    return matchesQuery && matchesCategory && matchesStatus;
  });

  const compareNames = (a, b) => a.name.localeCompare(b.name);

  if (sortBy === "category") {
    results.sort((a, b) => a.category.localeCompare(b.category) || compareNames(a, b));
  } else if (sortBy === "name") {
    results.sort(compareNames);
  } else if (sortBy !== "guide") {
    throw new RangeError(`Unsupported achievement sort order: ${sortBy}`);
  }

  return results;
}
