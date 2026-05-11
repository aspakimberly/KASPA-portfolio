const menuButton = document.querySelector("[data-menu-button]");
const menu = document.querySelector("[data-menu]");

if (menuButton && menu) {
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = carousel.querySelectorAll(".carousel-slide");
  const prevButton = carousel.querySelector(".prev");
  const nextButton = carousel.querySelector(".next");

  if (slides.length === 0) {
    return;
  }

  let currentIndex = 0;

  const showSlide = (index) => {
    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === index);
    });
  };

  prevButton?.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  });

  nextButton?.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  });

  setInterval(() => {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }, 5000);
});

document.querySelectorAll("[data-accordion]").forEach((accordion) => {
  const groups = accordion.querySelectorAll(".skill-group");

  groups.forEach((group) => {
    const button = group.querySelector(".skill-toggle");

    button?.addEventListener("click", () => {
      const isOpen = group.classList.contains("is-open");

      groups.forEach((item) => {
        item.classList.remove("is-open");
        item.querySelector(".skill-toggle")?.setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        group.classList.add("is-open");
        button.setAttribute("aria-expanded", "true");
      }
    });
  });
});
