import "./main.min2.js";
import "./scrollto.min.js";
import "./slider.min.js";
import "./popup.min.js";
import "./watcher.min.js";
import "./common.min.js";
document.addEventListener("DOMContentLoaded", () => {
  const DESKTOP_WIDTH = 992;
  if (window.innerWidth < DESKTOP_WIDTH) return;
  const links = document.querySelectorAll(".categories__link");
  const images = {
    tops: document.querySelector(".media-categories__image--tops"),
    bottoms: document.querySelector(".media-categories__image--bottoms"),
    roompers: document.querySelector(".media-categories__image--roompers"),
    hats: document.querySelector(".media-categories__image--hats"),
    all: document.querySelector(".media-categories__image--all")
  };
  const categoryMap = ["tops", "bottoms", "roompers", "hats", "all"];
  let activeCategory = null;
  const activeColor = getComputedStyle(document.documentElement).getPropertyValue("--brown")?.trim();
  const activateCategory = (category) => {
    if (activeCategory === category) return;
    links.forEach((link) => link.style.color = "");
    Object.values(images).forEach((img) => {
      if (img) img.style.opacity = "0";
    });
    const index = categoryMap.indexOf(category);
    if (index !== -1) {
      links[index].style.color = activeColor || "#c58a46";
      if (images[category]) {
        images[category].style.opacity = "1";
      }
    }
    activeCategory = category;
  };
  activateCategory("tops");
  links.forEach((link, index) => {
    const category = categoryMap[index];
    link.addEventListener("mouseenter", () => {
      activateCategory(category);
    });
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const bar = document.querySelector(".announcementbar");
  if (!bar) return;
  setTimeout(() => {
    bar.classList.add("show");
  }, 3e3);
});
