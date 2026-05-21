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
      title: "The first hello",
      text: "I still remember the beginning, because sometimes the smallest opening becomes the doorway to something unforgettable.",
    },
    {
      title: "The calmest moment",
      text: "There was a moment with you that felt safe, simple, and strangely complete. That kind of peace is rare, and I do not take it lightly.",
    },
    {
      title: "The last look back",
      text: "Some goodbyes do not become loud. They become a silence we keep revisiting because it carried more feeling than words could hold.",
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
const memoryTitle = document.getElementById("memoryTitle");
const memoryText = document.getElementById("memoryText");
const wishList = document.getElementById("wishList");
const closingTitle = document.getElementById("closingTitle");
const closingText = document.getElementById("closingText");
const closingFrom = document.getElementById("closingFrom");
const currentDate = document.getElementById("currentDate");
const signature = document.getElementById("signature");
const metaIds = ["metaOne", "metaTwo", "metaThree"];

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
        <button class="memory-card${index === 0 ? " is-active" : ""}" type="button" data-memory="${index}">
          <span class="memory-card__index">${String(index + 1).padStart(2, "0")}</span>
          <span class="memory-card__title">${memory.title}</span>
        </button>
      `
    )
    .join("");

  updateMemory(0);
}

function updateMemory(index) {
  const selectedMemory = farewellContent.memories[index];
  if (!selectedMemory) {
    return;
  }

  memoryTitle.textContent = selectedMemory.title;
  memoryText.textContent = selectedMemory.text;

  document.querySelectorAll(".memory-card").forEach((card) => {
    const isActive = Number(card.dataset.memory) === index;
    card.classList.toggle("is-active", isActive);
  });
}

function bindMemoryCards() {
  memoryList.addEventListener("click", (event) => {
    const target = event.target.closest(".memory-card");
    if (!target) {
      return;
    }

    updateMemory(Number(target.dataset.memory));
  });
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
bindMemoryCards();
bindOverlay();
applyCurrentDate();
revealOnScroll();
addParticles();
