function createTextElement(tagName, className, text) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

function createAchievementCard(achievement) {
  const card = document.createElement("article");
  const header = document.createElement("div");
  const logoFrame = document.createElement("span");
  const logo = document.createElement("img");
  const labels = document.createElement("div");
  const category = createTextElement("span", "achievement-category", achievement.category);
  const title = createTextElement("h3", "achievement-title", achievement.name);
  const description = createTextElement(
    "p",
    "achievement-description",
    achievement.description,
  );
  const detailsButton = document.createElement("button");

  card.className = "achievement-card";
  card.dataset.achievementId = achievement.id;
  card.tabIndex = 0;
  card.setAttribute("aria-labelledby", `achievement-title-${achievement.id}`);

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
  title.id = `achievement-title-${achievement.id}`;
  detailsButton.className = "achievement-details-button";
  detailsButton.type = "button";
  detailsButton.dataset.viewDetails = achievement.id;
  detailsButton.setAttribute("aria-label", `View ${achievement.name} instructions`);
  detailsButton.textContent = "View instructions";

  labels.append(category);
  logoFrame.append(logo);
  header.append(logoFrame, labels);
  card.append(header, title, description, detailsButton);

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
      !achievement.artwork ||
      typeof achievement.artwork.path !== "string" ||
      typeof achievement.artwork.alt !== "string"
    ) {
      throw new TypeError("Achievement data is missing required card fields.");
    }

    cards.append(createAchievementCard(achievement));
  });

  container.replaceChildren(cards);
  container.hidden = false;
  emptyState.hidden = true;
}
