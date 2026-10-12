function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function getStatusLabel(status) {
  switch (status) {
    case "unlocked":
      return "Unlocked";
    case "locked":
      return "Locked";
    case "unknown":
      return "Profile status unknown";
    default:
      return "Status unavailable";
  }
}

function createAchievementCard(achievement) {
  const card = document.createElement("article");
  const header = document.createElement("div");
  const logoFrame = document.createElement("span");
  const logo = document.createElement("img");
  const labels = document.createElement("div");
  const category = createTextElement("span", "achievement-category", achievement.category);
  const status = createTextElement(
    "span",
    `achievement-status status-${achievement.status}`,
    getStatusLabel(achievement.status),
  );
  const title = createTextElement("h3", "achievement-title", achievement.name);
  const description = createTextElement(
    "p",
    "achievement-description",
    achievement.description,
  );
  const details = document.createElement("dl");
  const difficultyTerm = createTextElement("dt", "", "Difficulty");
  const difficultyValue = createTextElement(
    "dd",
    "achievement-difficulty",
    achievement.difficulty ?? "Not rated",
  );
  const requirement = document.createElement("div");
  const requirementLabel = createTextElement(
    "span",
    "requirement-label",
    "Commonly associated activity",
  );
  const requirementText = createTextElement(
    "p",
    "requirement-text",
    achievement.requirements,
  );
  const availability = createTextElement(
    "p",
    "availability-note",
    achievement.availability,
  );
  const source = document.createElement("a");
  const sourceArrow = createTextElement("span", "", "↗");

  card.className = "achievement-card";

  header.className = "achievement-card-header";
  logoFrame.className = "achievement-logo-frame";
  logo.className = "achievement-logo";
  logo.alt = achievement.artwork.alt;
  logo.width = 296;
  logo.height = 296;
  logo.loading = "lazy";
  logo.decoding = "async";
  logo.addEventListener(
    "error",
    () => {
      logo.hidden = true;
      logoFrame.classList.add("is-unavailable");
      logoFrame.setAttribute("role", "img");
      logoFrame.setAttribute("aria-label", achievement.artwork.alt);
    },
    { once: true },
  );
  logo.src = achievement.artwork.path;
  labels.className = "achievement-labels";
  details.className = "achievement-details";
  requirement.className = "achievement-requirement";
  source.className = "achievement-source";
  source.href = achievement.source.url;
  source.target = "_blank";
  source.rel = "noopener noreferrer";
  source.append(document.createTextNode(achievement.source.label), sourceArrow);
  sourceArrow.setAttribute("aria-hidden", "true");
  source.setAttribute("aria-label", `${achievement.source.label} (opens in a new tab)`);

  labels.append(category, status);
  logoFrame.append(logo);
  header.append(logoFrame, labels);
  details.append(difficultyTerm, difficultyValue);
  requirement.append(requirementLabel, requirementText);
  card.append(header, title, description, details, requirement, availability, source);

  return card;
}

export function renderAchievementCards(container, achievements, emptyState) {
  if (!container || typeof container.replaceChildren !== "function") {
    throw new TypeError("A valid catalogue container is required.");
  }

  if (!Array.isArray(achievements)) {
    throw new TypeError("Achievements must be provided as an array.");
  }

  if (!emptyState || !("hidden" in emptyState)) {
    throw new TypeError("A valid empty-state element is required.");
  }

  if (achievements.length === 0) {
    container.replaceChildren();
    container.hidden = true;
    emptyState.hidden = false;
    return;
  }

  const cards = document.createDocumentFragment();

  achievements.forEach((achievement) => {
    if (
      !achievement ||
      typeof achievement.id !== "string" ||
      typeof achievement.name !== "string" ||
      typeof achievement.description !== "string" ||
      typeof achievement.category !== "string" ||
      typeof achievement.requirements !== "string" ||
      typeof achievement.availability !== "string" ||
      !achievement.artwork ||
      typeof achievement.artwork.path !== "string" ||
      typeof achievement.artwork.alt !== "string" ||
      typeof achievement.artwork.source !== "string" ||
      !achievement.source ||
      typeof achievement.source.label !== "string" ||
      typeof achievement.source.url !== "string"
    ) {
      throw new TypeError("Achievement data is missing required card fields.");
    }

    cards.append(createAchievementCard(achievement));
  });

  container.replaceChildren(cards);
  container.hidden = false;
  emptyState.hidden = true;
}
