const body = document.body;
const themeToggle = document.getElementById("themeToggle");
const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");
const cursorGlow = document.querySelector(".cursor-glow");

document.getElementById("year").textContent = new Date().getFullYear();

const savedTheme = localStorage.getItem("portfolio-theme");
if (savedTheme === "light") body.classList.add("light");
updateThemeIcon();

themeToggle.addEventListener("click", () => {
  body.classList.toggle("light");
  localStorage.setItem(
    "portfolio-theme",
    body.classList.contains("light") ? "light" : "dark"
  );
  updateThemeIcon();
});

function updateThemeIcon() {
  themeToggle.textContent = body.classList.contains("light") ? "☾" : "☼";
}

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("open");
  menuToggle.textContent = nav.classList.contains("open") ? "×" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
  });
});

document.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

const activeObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => link.classList.remove("active"));
        const active = document.querySelector(`nav a[href="#${entry.target.id}"]`);
        if (active) active.classList.add("active");
      }
    });
  },
  { rootMargin: "-40% 0px -50% 0px" }
);

sections.forEach(section => activeObserver.observe(section));
