function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Dark / light Mode

const btn = document.getElementById("modeToggle");
const btn2 = document.getElementById("modeToggle2");
const themeIcons = document.querySelectorAll(".icon");
const currentTheme = localStorage.getItem("theme");

if (currentTheme === "light") {
  setLightMode();
} else {
  setDarkMode(); // dark is the default
}

btn.addEventListener("click", function () {
  setTheme();
});

btn2.addEventListener("click", function () {
  setTheme();
});

function setTheme() {
  let currentTheme = document.body.getAttribute("theme");

  if (currentTheme === "dark") {
    setLightMode();
  } else {
    setDarkMode();
  }
}

function setDarkMode() {
  document.body.setAttribute("theme", "dark");
  localStorage.setItem("theme", "dark");

  themeIcons.forEach((icon) => {
    icon.src = icon.getAttribute("src-dark");
  });
}

function setLightMode() {
  document.body.removeAttribute("theme");
  localStorage.setItem("theme", "light");

  themeIcons.forEach((icon) => {
    icon.src = icon.getAttribute("src-light");
  });
}

// Initialize carousels — stamp pixel widths so slides are never percentage-ambiguous
function initCarousels() {
  document.querySelectorAll(".carousel").forEach((carousel) => {
    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-slide");
    function setWidths() {
      const w = carousel.offsetWidth;
      slides.forEach((slide) => (slide.style.width = w + "px"));
      // Re-apply current translate in case width changed during resize
      const current = parseInt(carousel.dataset.current || "0");
      track.style.transform = `translateX(-${current * w}px)`;
    }
    function setWidthsRetry() {
      const w = carousel.offsetWidth;
      if (w === 0) {
        requestAnimationFrame(setWidthsRetry);
        return;
      }
      setWidths();
    }
    setWidthsRetry();
    window.addEventListener("resize", setWidths);
  });
}
if (document.readyState === "complete") {
  initCarousels();
} else {
  window.addEventListener("load", initCarousels);
}

// Image carousel
function carouselMove(btn, dir) {
  const carousel = btn.closest(".carousel");
  const track = carousel.querySelector(".carousel-track");
  const slides = carousel.querySelectorAll(".carousel-slide");
  const dots = carousel.querySelectorAll(".carousel-dot");
  let current = parseInt(carousel.dataset.current || "0");
  current = (current + dir + slides.length) % slides.length;
  carousel.dataset.current = current;
  const w = carousel.offsetWidth;
  track.style.transform = `translateX(-${current * w}px)`;
  dots.forEach((d, i) => d.classList.toggle("active", i === current));
}

function carouselGoTo(dot, index) {
  const carousel = dot.closest(".carousel");
  const track = carousel.querySelector(".carousel-track");
  const dots = carousel.querySelectorAll(".carousel-dot");
  carousel.dataset.current = index;
  const w = carousel.offsetWidth;
  track.style.transform = `translateX(-${index * w}px)`;
  dots.forEach((d, i) => d.classList.toggle("active", i === index));
}

// Staggered scroll reveal
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  // Stagger cards within each container group
  const groups = document.querySelectorAll(
    ".about-containers, .about-award-containers, .freelance-container, .spotlight-container"
  );

  groups.forEach((group) => {
    const cards = group.querySelectorAll(
      ".details-container.color-container, .spotlight-feature"
    );
    cards.forEach((card, i) => {
      card.classList.add("reveal");
      card.style.transitionDelay = `${i * 80}ms`;
      observer.observe(card);
    });
  });

  // Skills panel as one unit
  document.querySelectorAll(".skills-panel").forEach((panel) => {
    panel.classList.add("reveal");
    observer.observe(panel);
  });
}

initScrollReveal();

// Scroll progress bar
const scrollProgress = document.getElementById("scroll-progress");
if (scrollProgress) {
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + "%";
  });
}
