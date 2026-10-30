// Mobile menu toggle
const nav = document.querySelector(".site-nav");
const toggle = nav && nav.querySelector(".site-nav__toggle");
if (toggle) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.textContent = open ? "Close" : "Menu";
  });
}

// Light/dark switch. Dark is the default; a choice of "light" is
// remembered in this browser only (nothing is sent anywhere).
const root = document.documentElement;
document.querySelectorAll(".theme-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const toLight = root.dataset.theme !== "light";
    if (toLight) root.dataset.theme = "light";
    else delete root.dataset.theme;
    try {
      if (toLight) localStorage.setItem("theme", "light");
      else localStorage.removeItem("theme");
    } catch (e) { /* storage blocked: the switch still works on this page */ }
  });
});

// Keep the footer year current
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
