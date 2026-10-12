/**
 * Summarize checklist entries shaped as { completed: boolean }.
 * This tracks a learner's own checklist only; it never verifies a GitHub achievement.
 */
export function calculateProgress(checklist) {
  if (!Array.isArray(checklist)) {
    throw new TypeError("Checklist progress must be calculated from an array.");
  }

  const total = checklist.length;
  const completed = checklist.filter((item) => item?.completed === true).length;

  return {
    completed,
    total,
    percentage: total === 0 ? 0 : Math.round((completed / total) * 100),
  };
}
