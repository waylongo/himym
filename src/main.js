import { characters, props, quotes, relationships, seasons } from "./data/content.js";
import imageManifest from "./data/images.js";
import { getFallbackImage } from "./lib/fallback-art.js";

window.HIMYM_IMAGE_MANIFEST = imageManifest;

const imageById = new Map(imageManifest.map((item) => [item.id, item]));

function $(selector) {
  return document.querySelector(selector);
}

function createFigure(item, className, eager) {
  const figure = document.createElement("figure");
  figure.className = `photo ${className || ""}`.trim();

  const img = document.createElement("img");
  let initialFallback = "";
  if (item.src) {
    img.src = item.src;
  } else {
    initialFallback = getFallbackImage(item);
    img.src = initialFallback;
    img.dataset.fallbackReady = "true";
  }
  img.dataset.fallback = initialFallback;
  img.dataset.fallbackReady = img.dataset.fallbackReady || "false";
  img.dataset.fallbackTried = "false";
  img.dataset.backupSrc = item.backupSrc || "";
  img.dataset.backupTried = "false";
  img.dataset.credit = item.credit || "";
  img.referrerPolicy = "no-referrer";
  img.alt = item.alt;
  img.loading = eager ? "eager" : "lazy";
  img.decoding = "async";
  img.fetchPriority = eager ? "high" : "auto";
  img.sizes = "(max-width: 720px) 92vw, (max-width: 1040px) 46vw, 360px";
  img.onerror = function () {
    if (img.dataset.backupSrc && img.dataset.backupTried === "false") {
      img.dataset.backupTried = "true";
      img.src = img.dataset.backupSrc;
    } else if (img.dataset.fallbackTried === "false") {
      img.dataset.fallbackTried = "true";
      if (img.dataset.fallbackReady !== "true") {
        img.dataset.fallback = getFallbackImage(item);
        img.dataset.fallbackReady = "true";
      }
      if (img.src !== img.dataset.fallback) {
        img.src = img.dataset.fallback;
      }
    }
  };

  const caption = document.createElement("figcaption");
  caption.textContent = item.caption || item.fallback.tag || item.fallback.title;

  figure.append(img, caption);
  return figure;
}

function image(id) {
  const item = imageById.get(id);
  if (!item) {
    throw new Error(`Missing image manifest entry: ${id}`);
  }
  return item;
}

function renderHero() {
  const container = $("#hero-collage");
  imageManifest
    .filter((item) => item.section === "hero")
    .forEach((item, index) => {
      const figure = createFigure(item, "hero-photo", index < 3);
      figure.style.setProperty("--i", index);
      container.append(figure);
    });
}

function renderCharacters() {
  const container = $("#character-grid");
  characters.forEach((person) => {
    const card = document.createElement("article");
    card.className = "character-card reveal";
    const body = document.createElement("div");
    body.className = "character-body";
    body.innerHTML = `
      <h3>${person.name}<span class="character-role">${person.cn} · ${person.role}</span></h3>
      <div class="tag-row">${person.keywords.map((keyword) => `<span>${keyword}</span>`).join("")}</div>
      <p><strong>关系线：</strong>${person.relation}</p>
      <p><strong>代表物件：</strong>${person.object}</p>
      <p>${person.note}</p>
    `;
    card.append(createFigure(image(person.image), "", false), body);
    container.append(card);
  });
}

function renderSeasons() {
  const container = $("#season-timeline");
  seasons.forEach((season) => {
    const panel = document.createElement("article");
    panel.className = "season-panel reveal";
    const meta = document.createElement("div");
    meta.className = "season-meta";
    meta.innerHTML = `
      <div>
        <div class="season-number">${season.number}</div>
        <h3>${season.title}</h3>
        <p>${season.summary}</p>
      </div>
      <span class="season-tag">${season.tag}</span>
    `;
    const images = document.createElement("div");
    images.className = "season-images";
    season.images.forEach((id) => images.append(createFigure(image(id), "", false)));
    panel.append(meta, images);
    container.append(panel);
  });
}

function renderProps() {
  const container = $("#object-gallery");
  props.forEach((prop) => {
    const card = document.createElement("article");
    card.className = "prop-card reveal";
    const body = document.createElement("div");
    body.innerHTML = `<h3>${prop.title}</h3><p>${prop.copy}</p>`;
    card.append(createFigure(image(prop.image), "", false), body);
    container.append(card);
  });
}

function renderRelationships() {
  const container = $("#relationship-wall");
  relationships.forEach((relation) => {
    const card = document.createElement("article");
    card.className = "relationship-card reveal";
    const body = document.createElement("div");
    body.innerHTML = `<h3>${relation.title}</h3><p>${relation.copy}</p>`;
    card.append(createFigure(image(relation.image), "", false), body);
    container.append(card);
  });
}

function renderQuotes() {
  const container = $("#quote-board");
  quotes.forEach((quote) => {
    const card = document.createElement("article");
    card.className = "quote-card reveal";
    card.append(createFigure(image(quote.image), "", false));
    const blockquote = document.createElement("blockquote");
    blockquote.textContent = quote.quote;
    const cite = document.createElement("cite");
    cite.textContent = quote.cite;
    card.append(blockquote, cite);
    container.append(card);
  });
}

function renderFinale() {
  const container = $("#finale-photos");
  ["finale-farhampton", "finale-window"].forEach((id) => {
    container.append(createFigure(image(id), "", false));
  });
}

function setupReveal() {
  const targets = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    targets.forEach((node) => node.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
  );
  targets.forEach((node) => observer.observe(node));
}

function init() {
  renderHero();
  renderCharacters();
  renderSeasons();
  renderProps();
  renderRelationships();
  renderQuotes();
  renderFinale();
  setupReveal();
}

document.addEventListener("DOMContentLoaded", init);
