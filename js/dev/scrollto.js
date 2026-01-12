import { e as dataMediaQueries, d as slideToggle, s as slideUp, f as bodyLockToggle, b as bodyLockStatus, c as bodyUnlock, g as gotoBlock, h as getHash } from "./common.min.js";
function spollers() {
  const spollersArray = document.querySelectorAll("[data-fls-spollers]");
  if (spollersArray.length > 0) {
    let initSpollers = function(spollersArray2, matchMedia = false) {
      spollersArray2.forEach((spollersBlock) => {
        spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
        if (matchMedia.matches || !matchMedia) {
          spollersBlock.classList.add("--spoller-init");
          initSpollerBody(spollersBlock);
        } else {
          spollersBlock.classList.remove("--spoller-init");
          initSpollerBody(spollersBlock, false);
        }
      });
    }, initSpollerBody = function(spollersBlock, hideSpollerBody = true) {
      let spollerItems = spollersBlock.querySelectorAll("details");
      if (spollerItems.length) {
        spollerItems.forEach((spollerItem) => {
          let spollerTitle = spollerItem.querySelector("summary");
          if (hideSpollerBody) {
            spollerTitle.removeAttribute("tabindex");
            if (!spollerItem.hasAttribute("data-fls-spollers-open")) {
              spollerItem.open = false;
              spollerTitle.nextElementSibling.hidden = true;
            } else {
              spollerTitle.classList.add("--spoller-active");
              spollerItem.open = true;
            }
          } else {
            spollerTitle.setAttribute("tabindex", "-1");
            spollerTitle.classList.remove("--spoller-active");
            spollerItem.open = true;
            spollerTitle.nextElementSibling.hidden = false;
          }
        });
      }
    }, setSpollerAction = function(e) {
      const el = e.target;
      if (el.closest("summary") && el.closest("[data-fls-spollers]")) {
        e.preventDefault();
        if (el.closest("[data-fls-spollers]").classList.contains("--spoller-init")) {
          const spollerTitle = el.closest("summary");
          const spollerBlock = spollerTitle.closest("details");
          const spollersBlock = spollerTitle.closest("[data-fls-spollers]");
          const oneSpoller = spollersBlock.hasAttribute("data-fls-spollers-one");
          const scrollSpoller = spollerBlock.hasAttribute("data-fls-spollers-scroll");
          const spollerSpeed = spollersBlock.dataset.flsSpollersSpeed ? parseInt(spollersBlock.dataset.flsSpollersSpeed) : 500;
          if (!spollersBlock.querySelectorAll(".--slide").length) {
            if (oneSpoller && !spollerBlock.open) {
              hideSpollersBody(spollersBlock);
            }
            !spollerBlock.open ? spollerBlock.open = true : setTimeout(() => {
              spollerBlock.open = false;
            }, spollerSpeed);
            spollerTitle.classList.toggle("--spoller-active");
            slideToggle(spollerTitle.nextElementSibling, spollerSpeed);
            if (scrollSpoller && spollerTitle.classList.contains("--spoller-active")) {
              const scrollSpollerValue = spollerBlock.dataset.flsSpollersScroll;
              const scrollSpollerOffset = +scrollSpollerValue ? +scrollSpollerValue : 0;
              const scrollSpollerNoHeader = spollerBlock.hasAttribute("data-fls-spollers-scroll-noheader") ? document.querySelector(".header").offsetHeight : 0;
              window.scrollTo(
                {
                  top: spollerBlock.offsetTop - (scrollSpollerOffset + scrollSpollerNoHeader),
                  behavior: "smooth"
                }
              );
            }
          }
        }
      }
      if (!el.closest("[data-fls-spollers]")) {
        const spollersClose = document.querySelectorAll("[data-fls-spollers-close]");
        if (spollersClose.length) {
          spollersClose.forEach((spollerClose) => {
            const spollersBlock = spollerClose.closest("[data-fls-spollers]");
            const spollerCloseBlock = spollerClose.parentNode;
            if (spollersBlock.classList.contains("--spoller-init")) {
              const spollerSpeed = spollersBlock.dataset.flsSpollersSpeed ? parseInt(spollersBlock.dataset.flsSpollersSpeed) : 500;
              spollerClose.classList.remove("--spoller-active");
              slideUp(spollerClose.nextElementSibling, spollerSpeed);
              setTimeout(() => {
                spollerCloseBlock.open = false;
              }, spollerSpeed);
            }
          });
        }
      }
    }, hideSpollersBody = function(spollersBlock) {
      const spollerActiveBlock = spollersBlock.querySelector("details[open]");
      if (spollerActiveBlock && !spollersBlock.querySelectorAll(".--slide").length) {
        const spollerActiveTitle = spollerActiveBlock.querySelector("summary");
        const spollerSpeed = spollersBlock.dataset.flsSpollersSpeed ? parseInt(spollersBlock.dataset.flsSpollersSpeed) : 500;
        spollerActiveTitle.classList.remove("--spoller-active");
        slideUp(spollerActiveTitle.nextElementSibling, spollerSpeed);
        setTimeout(() => {
          spollerActiveBlock.open = false;
        }, spollerSpeed);
      }
    };
    document.addEventListener("click", setSpollerAction);
    const spollersRegular = Array.from(spollersArray).filter(function(item, index, self) {
      return !item.dataset.flsSpollers.split(",")[0];
    });
    if (spollersRegular.length) {
      initSpollers(spollersRegular);
    }
    let mdQueriesArray = dataMediaQueries(spollersArray, "flsSpollers");
    if (mdQueriesArray && mdQueriesArray.length) {
      mdQueriesArray.forEach((mdQueriesItem) => {
        mdQueriesItem.matchMedia.addEventListener("change", function() {
          initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
        });
        initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
      });
    }
  }
}
window.addEventListener("load", spollers);
function menuInit() {
  document.addEventListener("click", function(e) {
    if (bodyLockStatus && e.target.closest("[data-fls-menu]")) {
      bodyLockToggle();
      document.documentElement.toggleAttribute("data-fls-menu-open");
    }
  });
}
document.querySelector("[data-fls-menu]") ? window.addEventListener("load", menuInit) : null;
document.addEventListener("DOMContentLoaded", () => {
  const DESKTOP_WIDTH = 992;
  const shopButton = document.querySelector(".menu__link--shop");
  const mobSublist = document.querySelector(".menu__mob-sublist");
  const categoryButtonsMob = document.querySelectorAll(".mob-sublist__sub-button[data-toggle]");
  if (shopButton && mobSublist) {
    shopButton.addEventListener("click", (e) => {
      if (window.innerWidth >= DESKTOP_WIDTH) return;
      e.preventDefault();
      mobSublist.classList.toggle("active");
    });
  }
  categoryButtonsMob.forEach((btn) => {
    const parentItem = btn.closest(".mob-sublist__subitem");
    const childList = parentItem.querySelector(".mob-sublist__child");
    const arrowIcon = btn.querySelector(".mob-sublist__subbutton--icon-arrow-right");
    const closeAllExcept = (current) => {
      categoryButtonsMob.forEach((b) => {
        if (b === current) return;
        const item = b.closest(".mob-sublist__subitem");
        const child = item.querySelector(".mob-sublist__child");
        const icon = b.querySelector(".mob-sublist__subbutton--icon-arrow-right");
        if (child) child.classList.remove("active");
        if (icon) icon.style.transform = "";
      });
    };
    btn.addEventListener("click", (e) => {
      if (window.innerWidth >= DESKTOP_WIDTH) return;
      e.preventDefault();
      closeAllExcept(btn);
      if (childList) {
        childList.classList.toggle("active");
        if (arrowIcon) {
          arrowIcon.style.transform = childList.classList.contains("active") ? "rotate(90deg)" : "";
        }
      }
    });
  });
  const submenu = document.querySelector(".submenu");
  const closeBtn = document.querySelector(".submenu__close");
  const categoryButtonsDesktop = document.querySelectorAll(".column-categories__link");
  const allGoods = document.querySelectorAll(".goods");
  const allImages = document.querySelectorAll(".column-media__image");
  let activeCategoryBtn = null;
  let activeImageKey = null;
  const hideAllImages = () => {
    allImages.forEach((img) => img.classList.remove("visible"));
    activeImageKey = null;
  };
  const showImage = (key) => {
    if (!key || activeImageKey === key) return;
    hideAllImages();
    const img = document.querySelector(`.column-media__image--${key}`);
    if (img) img.classList.add("visible");
    activeImageKey = key;
  };
  const resetGoods = () => {
    allGoods.forEach((goods) => goods.classList.remove("active"));
  };
  const showGoodsForButton = (button) => {
    resetGoods();
    if (!button) return;
    const goods = button.closest(".column-categories__item")?.querySelector(".goods");
    if (goods) {
      goods.classList.add("active");
    }
  };
  const deactivateAllCategories = () => {
    categoryButtonsDesktop.forEach((btn) => btn.classList.remove("active"));
    activeCategoryBtn = null;
    resetGoods();
    hideAllImages();
  };
  categoryButtonsDesktop.forEach((button) => {
    const imageKey = button.dataset.image;
    const activate = () => {
      if (activeCategoryBtn === button) return;
      deactivateAllCategories();
      button.classList.add("active");
      activeCategoryBtn = button;
      showGoodsForButton(button);
      showImage(imageKey);
    };
    button.addEventListener("mouseenter", () => {
      if (window.innerWidth >= DESKTOP_WIDTH) activate();
    });
    button.addEventListener("click", (e) => {
      if (window.innerWidth >= DESKTOP_WIDTH) {
        e.preventDefault();
        activate();
      }
    });
  });
  document.querySelectorAll(".goods__link").forEach((link) => {
    const imgKey = link.dataset.image;
    link.addEventListener("mouseenter", () => {
      if (window.innerWidth >= DESKTOP_WIDTH && imgKey) {
        if (activeCategoryBtn) {
          link.dataset.prevImageKey = activeCategoryBtn.dataset.image;
        }
        showImage(imgKey);
      }
    });
    link.addEventListener("mouseleave", () => {
      if (window.innerWidth >= DESKTOP_WIDTH) {
        if (activeCategoryBtn) {
          const categoryImageKey = activeCategoryBtn.dataset.image;
          showImage(categoryImageKey);
        } else {
          hideAllImages();
        }
      }
    });
  });
  allGoods.forEach((goodsBlock) => {
    goodsBlock.addEventListener("mouseleave", () => {
      if (window.innerWidth >= DESKTOP_WIDTH && activeCategoryBtn) {
        const categoryImageKey = activeCategoryBtn.dataset.image;
        showImage(categoryImageKey);
      }
    });
  });
  if (shopButton) {
    shopButton.addEventListener("click", (e) => {
      if (window.innerWidth >= DESKTOP_WIDTH) {
        e.preventDefault();
        submenu.classList.add("open");
      }
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      submenu.classList.remove("open");
      deactivateAllCategories();
    });
  }
  document.addEventListener("click", (e) => {
    if (submenu.classList.contains("open") && !e.target.closest(".menu__link--shop") && !e.target.closest(".submenu")) {
      submenu.classList.remove("open");
      deactivateAllCategories();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth >= DESKTOP_WIDTH) {
      mobSublist?.classList.remove("active");
    } else {
      submenu?.classList.remove("open");
      deactivateAllCategories();
    }
  });
});
function pageNavigation() {
  document.addEventListener("click", pageNavigationAction);
  document.addEventListener("watcherCallback", pageNavigationAction);
  function pageNavigationAction(e) {
    if (e.type === "click") {
      const targetElement = e.target;
      if (targetElement.closest("[data-fls-scrollto]")) {
        const gotoLink = targetElement.closest("[data-fls-scrollto]");
        const gotoLinkSelector = gotoLink.dataset.flsScrollto ? gotoLink.dataset.flsScrollto : "";
        const noHeader = gotoLink.hasAttribute("data-fls-scrollto-header") ? true : false;
        const gotoSpeed = gotoLink.dataset.flsScrolltoSpeed ? gotoLink.dataset.flsScrolltoSpeed : 500;
        const offsetTop = gotoLink.dataset.flsScrolltoTop ? parseInt(gotoLink.dataset.flsScrolltoTop) : 0;
        if (window.fullpage) {
          const fullpageSection = document.querySelector(`${gotoLinkSelector}`).closest("[data-fls-fullpage-section]");
          const fullpageSectionId = fullpageSection ? +fullpageSection.dataset.flsFullpageId : null;
          if (fullpageSectionId !== null) {
            window.fullpage.switchingSection(fullpageSectionId);
            if (document.documentElement.hasAttribute("data-fls-menu-open")) {
              bodyUnlock();
              document.documentElement.removeAttribute("data-fls-menu-open");
            }
          }
        } else {
          gotoBlock(gotoLinkSelector, noHeader, gotoSpeed, offsetTop);
        }
        e.preventDefault();
      }
    } else if (e.type === "watcherCallback" && e.detail) {
      const entry = e.detail.entry;
      const targetElement = entry.target;
      if (targetElement.dataset.flsWatcher === "navigator") {
        document.querySelector(`[data-fls-scrollto].--navigator-active`);
        let navigatorCurrentItem;
        if (targetElement.id && document.querySelector(`[data-fls-scrollto="#${targetElement.id}"]`)) {
          navigatorCurrentItem = document.querySelector(`[data-fls-scrollto="#${targetElement.id}"]`);
        } else if (targetElement.classList.length) {
          for (let index = 0; index < targetElement.classList.length; index++) {
            const element = targetElement.classList[index];
            if (document.querySelector(`[data-fls-scrollto=".${element}"]`)) {
              navigatorCurrentItem = document.querySelector(`[data-fls-scrollto=".${element}"]`);
              break;
            }
          }
        }
        if (entry.isIntersecting) {
          navigatorCurrentItem ? navigatorCurrentItem.classList.add("--navigator-active") : null;
        } else {
          navigatorCurrentItem ? navigatorCurrentItem.classList.remove("--navigator-active") : null;
        }
      }
    }
  }
  if (getHash()) {
    let goToHash;
    if (document.querySelector(`#${getHash()}`)) {
      goToHash = `#${getHash()}`;
    } else if (document.querySelector(`.${getHash()}`)) {
      goToHash = `.${getHash()}`;
    }
    goToHash ? gotoBlock(goToHash) : null;
  }
}
document.querySelector("[data-fls-scrollto]") ? window.addEventListener("load", pageNavigation) : null;
