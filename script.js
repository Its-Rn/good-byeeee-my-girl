const farewellContent = {
  person: "Your Special Person",
  from: "Someone who still carries this memory",
  overlayText:
    "This page is for the goodbye that mattered too much to leave unsaid.",
  title: "To someone unforgettable",
  quote:
    "Some people stay in our story even when life only lets them stay for a chapter.",
  meta: ["Last hello", "Unsaid words", "Still remembered"],
  heroNote:
    "If this was the last time our paths crossed, I still wanted the moment to be honored with tenderness.",
  letterLead:
    "There are people we expect to forget, and then there are people who quietly become part of us.",
  letterParagraphs: [
    "Meeting you changed the way I look at timing, connection, and the fragile beauty of a single moment.",
    "Even if this was our last chapter, I want you to know you mattered in ways bigger than the time we had.",
    "I will carry the good in you forward, and I hope life returns that goodness to you in every place I cannot follow.",
  ],
  remains: [
    "A memory that still feels warm",
    "A story I will never speak of lightly",
    "A quiet kind of gratitude that stayed behind",
  ],
  memories: [
    {
      date: "18 Octomber 2024",
      title: "The first hello",
      text: "I still remember the first day I met you - the beginning, because life rarely announces the moments that will later mean everything........",
    },
    {
      date: "02 January 2025",
      title: "The calmest moment",
      text: "There was a moment that felt safe, simple, and strangely complete. That kind of peace is rare. I had never experienced anything like it before - it was the kind of feeling I could never fully put into words.",
    },
    {
      date: "10 Januuary 2025",
      title: "A day that never truly ended",
      text: `10 January 2025 - an unforgettable day of my life. Sometimes we imagine countless possibilities, yet destiny carries its own plans. Some unspoken things never become loud; instead, they become a silence we keep returning to, because they hold more emotion than words ever could.

In that silence, all I wanted was to listen to you. I kept wondering how someone can wait so deeply for another person - what such waiting truly means. Feelings, emotions, memories... everything seemed impossible to explain completely. I have countless words to describe how it all happened, and so many things I still want to share with you. But the moment was so intense, so delicate, that from then on, everything inside me slowly became silent.

And for me, that day was never truly ended.`,
    },
    {
      date: "22 January 2025",
      title: "The words I still kept",
      text: "There were so many things I wanted to say, but not every feeling arrives with courage at the same time. Some words stayed inside me, not because they were small, but because they mattered too much.",
    },
    {
      date: "14 February 2025",
      title: "A distance that still felt close",
      text: "Even when there was distance, something in your presence stayed near. It was strange and beautiful to miss someone and still feel guided by the memory of them.",
    },
    {
      date: "03 March 2025",
      title: "The goodbye I could not rush",
      text: "Some goodbyes refuse to be short. They keep returning in thoughts, pauses, and late-night silence until the heart learns how to carry them gently.",
    },
  ],
  wishes: [
    "That you are loved with the same gentleness you gave without trying.",
    "That life becomes kinder to you in every place where it once felt late.",
    "That when you think of me, the memory carries peace more than pain.",
  ],
  closingTitle: "Goodbye, but never without meaning.",
  closingText:
    "Some endings are not failures. They are proof that something beautiful once existed.",
  signature: "Goodbye, and thank you for being real.",
};

const heroTitle = document.getElementById("heroTitle");
const heroQuote = document.getElementById("heroQuote");
const heroNote = document.getElementById("heroNote");
const heroFrom = document.getElementById("heroFrom");
const overlayText = document.getElementById("overlayText");
const letterLead = document.getElementById("letterLead");
const letterBody = document.getElementById("letterBody");
const remainList = document.getElementById("remainList");
const memoryList = document.getElementById("memoryList");
const memoryRail = document.getElementById("memoryRail");
const memoryIndicators = document.getElementById("memoryIndicators");
const memoryTitle = document.getElementById("memoryTitle");
const memoryText = document.getElementById("memoryText");
const wishList = document.getElementById("wishList");
const closingTitle = document.getElementById("closingTitle");
const closingText = document.getElementById("closingText");
const closingFrom = document.getElementById("closingFrom");
const currentDate = document.getElementById("currentDate");
const signature = document.getElementById("signature");
const metaIds = ["metaOne", "metaTwo", "metaThree"];
let activeMemoryIndex = 0;
let memoryScrollSyncFrame = null;

function setTextContent() {
  document.title = `Goodbye, ${farewellContent.person}`;
  heroTitle.textContent = `To ${farewellContent.person}`;
  heroQuote.textContent = farewellContent.quote;
  heroNote.textContent = farewellContent.heroNote;
  heroFrom.textContent = `From ${farewellContent.from}`;
  overlayText.textContent = farewellContent.overlayText;
  letterLead.textContent = farewellContent.letterLead;
  signature.textContent = farewellContent.signature;
  closingTitle.textContent = farewellContent.closingTitle;
  closingText.textContent = farewellContent.closingText;
  closingFrom.textContent = `From ${farewellContent.from}`;

  metaIds.forEach((id, index) => {
    const element = document.getElementById(id);
    if (element && farewellContent.meta[index]) {
      element.textContent = farewellContent.meta[index];
    }
  });

  letterBody.innerHTML = farewellContent.letterParagraphs
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");

  remainList.innerHTML = farewellContent.remains
    .map((item) => `<li>${item}</li>`)
    .join("");

  wishList.innerHTML = farewellContent.wishes
    .map(
      (wish, index) => `
        <article class="wish">
          <span class="wish__number">${String(index + 1).padStart(2, "0")}</span>
          <p>${wish}</p>
        </article>
      `
    )
    .join("");

  memoryList.innerHTML = farewellContent.memories
    .map(
      (memory, index) => `
        <button
          class="memory-card${index === 0 ? " is-active" : ""}"
          type="button"
          data-memory="${index}"
          onclick="window.selectMemory && window.selectMemory(${index})"
        >
          <span class="memory-card__meta">
            <span class="memory-card__index">${String(index + 1).padStart(2, "0")}</span>
            ${memory.date ? `<span class="memory-card__date">${memory.date}</span>` : ""}
          </span>
          <span class="memory-card__title">${memory.title}</span>
        </button>
      `
    )
    .join("");

  if (memoryIndicators) {
    memoryIndicators.innerHTML = farewellContent.memories
      .map(
        (_, index) =>
          `<span class="memory-mobile-indicator${index === 0 ? " is-active" : ""}" data-memory-indicator="${index}"></span>`
      )
      .join("");
  }

  bindMemoryCards();
  updateMemory(0);
}

function updateMemory(index, options = {}) {
  const selectedMemory = farewellContent.memories[index];
  if (!selectedMemory) {
    return;
  }

  activeMemoryIndex = index;
  memoryTitle.textContent = selectedMemory.title;
  memoryText.textContent = selectedMemory.text;

  document.querySelectorAll(".memory-card").forEach((card) => {
    const isActive = Number(card.dataset.memory) === index;
    card.classList.toggle("is-active", isActive);

    if (isActive && options.scrollCard !== false) {
      const useInlineCenter = window.matchMedia("(max-width: 1024px)").matches;
      card.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: useInlineCenter ? "center" : "nearest",
      });
    }
  });

  document.querySelectorAll("[data-memory-indicator]").forEach((indicator) => {
    const isActive = Number(indicator.dataset.memoryIndicator) === index;
    indicator.classList.toggle("is-active", isActive);
  });

  window.setTimeout(updateMemoryRailState, 260);
}

window.selectMemory = updateMemory;

function bindMemoryCards() {
  document.querySelectorAll(".memory-card").forEach((card) => {
    card.addEventListener("click", () => {
      updateMemory(Number(card.dataset.memory));
    });
  });
}

function updateMemoryRailState() {
  if (!memoryList || !memoryRail) {
    return;
  }

  const isCompactMemoryRail = window.matchMedia("(max-width: 1024px)").matches;
  const hasOverflow = isCompactMemoryRail
    ? memoryList.scrollWidth > memoryList.clientWidth + 4
    : memoryList.scrollHeight > memoryList.clientHeight + 4;
  const atTop = isCompactMemoryRail ? memoryList.scrollLeft <= 6 : memoryList.scrollTop <= 6;
  const atBottom = isCompactMemoryRail
    ? memoryList.scrollLeft + memoryList.clientWidth >= memoryList.scrollWidth - 6
    : memoryList.scrollTop + memoryList.clientHeight >= memoryList.scrollHeight - 6;

  memoryRail.classList.toggle("has-overflow", hasOverflow);
  memoryRail.classList.toggle("is-at-top", atTop);
  memoryRail.classList.toggle("is-at-bottom", atBottom);
}

function syncMemorySelectionFromScroll() {
  if (!memoryList || !window.matchMedia("(max-width: 1024px)").matches) {
    return;
  }

  const cards = Array.from(document.querySelectorAll(".memory-card"));
  if (!cards.length) {
    return;
  }

  const listRect = memoryList.getBoundingClientRect();
  const targetX = listRect.left + listRect.width * 0.4;
  let closestIndex = activeMemoryIndex;
  let closestDistance = Number.POSITIVE_INFINITY;

  cards.forEach((card) => {
    const cardRect = card.getBoundingClientRect();
    const cardCenter = cardRect.left + cardRect.width / 2;
    const distance = Math.abs(cardCenter - targetX);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = Number(card.dataset.memory);
    }
  });

  if (closestIndex !== activeMemoryIndex) {
    updateMemory(closestIndex, { scrollCard: false });
  }
}

function bindMemoryRail() {
  if (!memoryList) {
    return;
  }

  memoryList.addEventListener(
    "scroll",
    () => {
      updateMemoryRailState();

      if (window.matchMedia("(max-width: 1024px)").matches) {
        window.cancelAnimationFrame(memoryScrollSyncFrame);
        memoryScrollSyncFrame = window.requestAnimationFrame(syncMemorySelectionFromScroll);
      }
    },
    { passive: true }
  );
  window.addEventListener("resize", updateMemoryRailState);
  window.requestAnimationFrame(updateMemoryRailState);
}

function bindOverlay() {
  const overlay = document.getElementById("letterOverlay");
  const openLetterButton = document.getElementById("openLetterButton");

  openLetterButton.addEventListener("click", () => {
    overlay.classList.add("is-hidden");
    document.body.classList.remove("overlay-open");
  });
}

function applyCurrentDate() {
  const formatter = new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  currentDate.textContent = formatter.format(new Date());
}

function revealOnScroll() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  document.querySelectorAll(".reveal").forEach((element) => {
    observer.observe(element);
  });
}

function addParticles() {
  const stars = document.getElementById("stars");

  for (let index = 0; index < 22; index += 1) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${12 + Math.random() * 14}s`;
    particle.style.animationDelay = `${Math.random() * 9}s`;
    particle.style.setProperty("--drift-x", `${-30 + Math.random() * 60}px`);
    stars.appendChild(particle);
  }
}

setTextContent();
bindMemoryRail();
bindOverlay();
applyCurrentDate();
revealOnScroll();
addParticles();
