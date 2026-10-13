import { achievements } from "./achievements.js";
import { getAchievementCategories, filterAchievements } from "./filters.js";
import { getAchievementGuide } from "./mission-details.js";
import { renderAchievementCards } from "./render.js";

function getRequiredElement(selector) {
  const element = document.querySelector(selector);

  if (!element) {
    throw new Error(`Required page element not found: ${selector}`);
  }

  return element;
}

function initializeTheme() {
  const themeToggle = getRequiredElement("#theme-toggle");
  const themeColorMeta = getRequiredElement('meta[name="theme-color"]');

  function setTheme(theme, persist) {
    const isDark = theme === "dark";
    document.documentElement.dataset.theme = theme;
    themeColorMeta.setAttribute("content", isDark ? "#111917" : "#eef2ed");
    themeToggle.setAttribute("aria-pressed", String(isDark));

    const label = `Switch to ${isDark ? "light" : "dark"} mode`;
    themeToggle.setAttribute("aria-label", label);
    themeToggle.title = label;

    if (persist) {
      try {
        localStorage.setItem("gh-theme", theme);
      } catch (error) {
        console.warn("Could not save the theme preference.", error);
      }
    }
  }

  setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light", false);
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme, true);
  });
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
      !window.matchMedia("(max-width: 56rem)").matches &&
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
  const achievementDialog = getRequiredElement("#achievement-dialog");
  const dialogCloseButton = getRequiredElement("#dialog-close");
  const dialogBadge = getRequiredElement("#dialog-badge");
  const dialogCategory = getRequiredElement("#dialog-category");
  const dialogTitle = getRequiredElement("#dialog-title");
  const dialogDescription = getRequiredElement("#dialog-description");
  const dialogAvailability = getRequiredElement("#dialog-availability");
  const dialogRequirements = getRequiredElement("#dialog-requirements");
  const dialogSteps = getRequiredElement("#dialog-steps");
  const dialogSource = getRequiredElement("#dialog-source");
  const dialogSourceLabel = getRequiredElement("#dialog-source-label");
  let currentDialogAchievementId = "";

  const categoryOptions = document.createDocumentFragment();

  for (const category of getAchievementCategories(achievements)) {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categoryOptions.append(option);
  }

  categoryFilter.append(categoryOptions);
  datasetCount.textContent = `${achievements.length} achievements in this guide`;

  function updateAchievementDialog(achievement) {
    const guide = getAchievementGuide(achievement.id);
    const steps = document.createDocumentFragment();

    guide.steps.forEach((step) => {
      const item = document.createElement("li");
      item.textContent = step;
      steps.append(item);
    });

    dialogBadge.src = achievement.artwork.path;
    dialogBadge.alt = achievement.artwork.alt;
    dialogCategory.textContent = achievement.category;
    dialogTitle.textContent = achievement.name;
    dialogDescription.textContent = achievement.description;
    dialogAvailability.textContent = achievement.availability;
    dialogRequirements.textContent = `${guide.exactRequirement} ${achievement.requirements}`;
    dialogSteps.replaceChildren(steps);
    dialogSource.href = achievement.source.url;
    dialogSource.setAttribute(
      "aria-label",
      `${achievement.source.label} (opens in a new tab)`,
    );
    dialogSourceLabel.textContent = achievement.source.label;
  }

  function openAchievementDialog(achievementId) {
    const achievement = achievements.find((item) => item.id === achievementId);

    if (!achievement) {
      throw new RangeError(`Unknown achievement: ${achievementId}`);
    }

    currentDialogAchievementId = achievementId;
    updateAchievementDialog(achievement);

    if (!achievementDialog.open) {
      achievementDialog.showModal();
    }
  }

  function updateExplorer() {
    const results = filterAchievements(achievements, {
      query: searchInput.value,
      category: categoryFilter.value,
      status: statusFilter.value,
      sortBy: sortOrder.value,
    });

    renderAchievementCards(catalogue, results, emptyState);

    if (achievementDialog.open && currentDialogAchievementId) {
      const activeAchievement = achievements.find(
        (item) => item.id === currentDialogAchievementId,
      );

      if (activeAchievement) {
        updateAchievementDialog(activeAchievement);
      }
    }

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
  catalogue.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) {
      return;
    }

    const card = event.target.closest(".achievement-card");

    if (!(card instanceof HTMLElement) || !catalogue.contains(card)) {
      return;
    }

    if (event.target.closest("a")) {
      return;
    }

    const detailsButton = event.target.closest("[data-view-details]");

    if (detailsButton instanceof HTMLButtonElement) {
      event.stopPropagation();
      openAchievementDialog(detailsButton.dataset.viewDetails);
      return;
    }

    if (event.target.closest("button")) {
      return;
    }

    openAchievementDialog(card.dataset.achievementId);
  });
  catalogue.addEventListener("keydown", (event) => {
    if (
      !(event.target instanceof HTMLElement) ||
      !event.target.matches(".achievement-card") ||
      (event.key !== "Enter" && event.key !== " ")
    ) {
      return;
    }

    event.preventDefault();
    openAchievementDialog(event.target.dataset.achievementId);
  });
  dialogCloseButton.addEventListener("click", () => {
    achievementDialog.close();
  });
  achievementDialog.addEventListener("click", (event) => {
    if (event.target === achievementDialog) {
      achievementDialog.close();
    }
  });
  achievementDialog.addEventListener("close", () => {
    const opener = catalogue.querySelector(
      `[data-achievement-id="${CSS.escape(currentDialogAchievementId)}"]`,
    );

    if (opener instanceof HTMLElement) {
      opener.focus();
    } else {
      searchInput.focus();
    }

    currentDialogAchievementId = "";
  });
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

initializeTheme();
initializeNavigationMenu();
initializeAchievementExplorer();
