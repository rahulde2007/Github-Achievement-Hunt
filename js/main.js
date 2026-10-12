import { achievements } from "./achievements.js";
import { getAchievementCategories, filterAchievements } from "./filters.js";
import { renderAchievementCards } from "./render.js";

function getRequiredElement(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Required page element not found: ${selector}`);
  }

  return element;
}

function initializeNavigationMenu() {
  const menuButton = getRequiredElement(".nav-toggle");
  const navigation = getRequiredElement("#primary-navigation");

  function closeMenu() {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation menu");
    navigation.classList.remove("is-open");
  }

  menuButton.addEventListener("click", () => {
    const isExpanded = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isExpanded));
    menuButton.setAttribute(
      "aria-label",
      isExpanded ? "Open navigation menu" : "Close navigation menu",
    );
    navigation.classList.toggle("is-open", !isExpanded);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof Element && event.target.closest("a")) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });

  document.addEventListener("pointerdown", (event) => {
    if (
      menuButton.getAttribute("aria-expanded") === "true" &&
      event.target instanceof Node &&
      !menuButton.contains(event.target) &&
      !navigation.contains(event.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (
      !window.matchMedia("(max-width: 48rem)").matches &&
      menuButton.getAttribute("aria-expanded") === "true"
    ) {
      closeMenu();
    }
  });
}

function initializeAchievementExplorer() {
  const searchInput = getRequiredElement("#achievement-search");
  const clearSearchButton = getRequiredElement("#clear-search");
  const categoryFilter = getRequiredElement("#category-filter");
  const statusFilter = getRequiredElement("#status-filter");
  const sortOrder = getRequiredElement("#sort-order");
  const catalogue = getRequiredElement("#achievement-catalogue");
  const emptyState = getRequiredElement("#achievement-empty");
  const resultsSummary = getRequiredElement("#results-summary");
  const datasetCount = getRequiredElement("#dataset-count");
  const resetButton = getRequiredElement("#reset-explorer");

  const categoryOptions = document.createDocumentFragment();

  for (const category of getAchievementCategories(achievements)) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryOptions.append(option);
  }

  categoryFilter.append(categoryOptions);
  datasetCount.textContent = `${achievements.length} achievements in this guide`;

  function updateExplorer() {
    const results = filterAchievements(achievements, {
      query: searchInput.value,
      category: categoryFilter.value,
      status: statusFilter.value,
      sortBy: sortOrder.value,
    });

    renderAchievementCards(catalogue, results, emptyState);

    const summaryParts = [
      results.length === 0
        ? `No matches — 0 of ${achievements.length} achievements shown.`
        : `Showing ${results.length} of ${achievements.length} achievements.`,
    ];
    const normalizedQuery = searchInput.value.trim();

    if (normalizedQuery) {
      summaryParts.push(`Search: ${normalizedQuery}.`);
    }

    if (categoryFilter.value !== "all") {
      summaryParts.push(`Category: ${categoryFilter.value}.`);
    }

    if (statusFilter.value !== "all") {
      summaryParts.push(`Profile status: ${statusFilter.options[statusFilter.selectedIndex].text}.`);
    }

    summaryParts.push(`Sorted by ${sortOrder.options[sortOrder.selectedIndex].text}.`);
    resultsSummary.textContent = summaryParts.join(" ");

    clearSearchButton.hidden = searchInput.value.length === 0;
  }

  searchInput.addEventListener("input", updateExplorer);
  clearSearchButton.addEventListener("click", () => {
    searchInput.value = "";
    updateExplorer();
    searchInput.focus();
  });
  categoryFilter.addEventListener("change", updateExplorer);
  statusFilter.addEventListener("change", updateExplorer);
  sortOrder.addEventListener("change", updateExplorer);
  resetButton.addEventListener("click", () => {
    searchInput.value = "";
    categoryFilter.value = "all";
    statusFilter.value = "all";
    sortOrder.value = "guide";
    updateExplorer();
    searchInput.focus();
  });

  updateExplorer();
}

initializeNavigationMenu();
initializeAchievementExplorer();
