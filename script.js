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
