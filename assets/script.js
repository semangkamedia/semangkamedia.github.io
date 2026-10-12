// Inisialisasi icon Lucide
lucide.createIcons();

const areaSwiperElement = document.querySelector(".area-swiper");
if (areaSwiperElement && typeof Swiper !== "undefined") {
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  new Swiper(areaSwiperElement, {
    loop: true,
    speed: prefersReducedMotion ? 0 : 700,
    spaceBetween: 24,
    slidesPerView: 1,
    autoplay: prefersReducedMotion
      ? false
      : {
          delay: 3500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
    pagination: {
      el: ".area-swiper .swiper-pagination",
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
}

// Toggle menu mobile
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

// Menutup menu mobile saat link diklik
document.querySelectorAll("#mobileMenu a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.add("hidden");
  });
});

// Animasi komponen saat mulai terlihat di layar
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (!prefersReducedMotion) {
  const animatedComponents = document.querySelectorAll(
    [
      'section > div > div[class*="max-w-"]',
      "section .grid > div",
      "footer .grid > div",
      "footer > div > div:last-child",
    ].join(","),
  );

  const revealComponent = (component) => {
    const siblingIndex = Array.from(component.parentElement.children).indexOf(
      component,
    );
    component.style.setProperty(
      "--animate-delay",
      `${Math.min(siblingIndex, 4) * 100}ms`,
    );
    component.classList.add("scroll-reveal");
    component.classList.add("animate__animated", "animate__fadeInUp");
  };

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealComponent(entry.target);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    animatedComponents.forEach((component) =>
      revealObserver.observe(component),
    );
  } else {
    animatedComponents.forEach(revealComponent);
  }
}
