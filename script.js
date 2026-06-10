const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".primary-nav");
const form = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");
const portfolioTrack = document.querySelector("[data-portfolio-track]");
const prevButton = document.querySelector("[data-carousel='prev']");
const nextButton = document.querySelector("[data-carousel='next']");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
      navToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

if (portfolioTrack && prevButton && nextButton) {
  const updateCarouselButtons = () => {
    const maxScroll = portfolioTrack.scrollWidth - portfolioTrack.clientWidth;
    prevButton.disabled = portfolioTrack.scrollLeft <= 4;
    nextButton.disabled = portfolioTrack.scrollLeft >= maxScroll - 4;
  };

  const scrollPortfolio = (direction) => {
    const card = portfolioTrack.querySelector(".portfolio-card");
    const gap = 18;
    const amount = card ? card.getBoundingClientRect().width + gap : portfolioTrack.clientWidth * 0.8;

    portfolioTrack.scrollBy({
      left: direction * amount,
      behavior: "smooth"
    });
  };

  prevButton.addEventListener("click", () => scrollPortfolio(-1));
  nextButton.addEventListener("click", () => scrollPortfolio(1));
  portfolioTrack.addEventListener("scroll", updateCarouselButtons, { passive: true });
  window.addEventListener("resize", updateCarouselButtons);
  updateCarouselButtons();
}

if (form && formNote) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const summary = `${data.get("name")} selected ${data.get("project")}.`;

    formNote.textContent = `${summary} Add an email service, CRM, or booking link here before the site goes live.`;
  });
}
