import "./main.min2.js";
import "./announcementbar.min.js";
import "./slider.min.js";
/* empty css          */
import "./common.min.js";
const hero = document.querySelector(".main__hero");
const header = document.querySelector(".header");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        header.style.position = "fixed";
        header.style.top = "0";
        header.style.zIndex = "10";
      } else {
        header.style.position = "absolute";
        header.style.zIndex = "1";
      }
    });
  },
  { threshold: 0 }
);
observer.observe(hero);
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
function preloader() {
  const preloaderImages = document.querySelectorAll("img");
  const htmlDocument = document.documentElement;
  const isPreloaded = localStorage.getItem(location.href) && document.querySelector('[data-fls-preloader="true"]');
  if (preloaderImages.length && !isPreloaded) {
    let setValueProgress = function(progress2) {
      showPecentLoad ? showPecentLoad.innerText = `${progress2}%` : null;
      showLineLoad ? showLineLoad.style.width = `${progress2}%` : null;
    }, imageLoaded = function() {
      imagesLoadedCount++;
      progress = Math.round(100 / preloaderImages.length * imagesLoadedCount);
      const intervalId = setInterval(() => {
        counter >= progress ? clearInterval(intervalId) : setValueProgress(++counter);
        counter >= 100 ? setTimeout(addLoadedClass, 2500) : null;
      }, 10);
    };
    const preloaderTemplate = `
			<div class="fls-preloader">
				<div class="fls-preloader__body">
					<div class="fls-preloader__text">
            <span class="fls-preloader__char">T</span>
            <span class="fls-preloader__char">r</span>
            <span class="fls-preloader__char">e</span>
            <span class="fls-preloader__char">e</span>
            <span class="fls-preloader__char">H</span>
            <span class="fls-preloader__char">o</span>
            <span class="fls-preloader__char">u</span>
            <span class="fls-preloader__char">s</span>
            <span class="fls-preloader__char">e</span>
          </div>
				</div>
			</div>`;
    document.body.insertAdjacentHTML("beforeend", preloaderTemplate);
    document.querySelector(".fls-preloader");
    const showPecentLoad = document.querySelector(".fls-preloader__counter"), showLineLoad = document.querySelector(".fls-preloader__line span");
    let imagesLoadedCount = 0;
    let counter = 0;
    let progress = 0;
    htmlDocument.setAttribute("data-fls-preloader-loading", "");
    htmlDocument.setAttribute("data-fls-scrolllock", "");
    preloaderImages.forEach((preloaderImage) => {
      const imgClone = document.createElement("img");
      if (imgClone) {
        imgClone.onload = imageLoaded;
        imgClone.onerror = imageLoaded;
        preloaderImage.dataset.src ? imgClone.src = preloaderImage.dataset.src : imgClone.src = preloaderImage.src;
      }
    });
    setValueProgress(progress);
    const preloaderOnce = () => localStorage.setItem(location.href, "preloaded");
    document.querySelector('[data-fls-preloader="true"]') ? preloaderOnce() : null;
  } else {
    setTimeout(addLoadedClass, 2500);
  }
  function addLoadedClass() {
    htmlDocument.setAttribute("data-fls-preloader-loaded", "");
    htmlDocument.removeAttribute("data-fls-preloader-loading");
    htmlDocument.removeAttribute("data-fls-scrolllock");
  }
}
document.addEventListener("DOMContentLoaded", preloader);
