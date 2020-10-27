const burger = document.querySelector(".burger");
const burgerOpen = document.querySelector(".burgerOpen");
const burgerBlank = document.querySelector(".burgerBlank");
const logo = document.querySelector(".logo");
const line1 = document.querySelector(".line1");
const line2 = document.querySelector(".line2");
const line3 = document.querySelector(".line3");

burger.addEventListener("click", burgerMenu);
burgerBlank.addEventListener("click", burgerMenu);

burgerOpen.classList.remove("fade");

function burgerMenu() {
  burgerOpen.classList.toggle("fade");
  line1.classList.toggle("fade");
  line2.classList.toggle("fade");
  line3.classList.toggle("fade");
  burgerBlank.classList.toggle("fade");
}

// SMOOTH SCROLL

const navbarMenu = document.querySelector("div.h2");
const navbarLinks = document.querySelectorAll(".h2 h2 a");
const burgerMenuLinks = document.querySelectorAll(".burgerOpen h2 a");
const arrow1 = document.querySelectorAll("img.arrow a");

for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", navbarLinkClick);
}
for (let i = 0; i < burgerMenuLinks.length; i++) {
  burgerMenuLinks[i].addEventListener("click", navbarLinkClick);
  burgerOpen.classList.toggle("fade");
}
for (let i = 0; i < arrow1.length; i++) {
  arrow1[i].addEventListener("click", navbarLinkClick);
}

function navbarLinkClick(event) {
  smoothScroll(event);
}
function smoothScroll(event) {
  event.preventDefault();
  const targetId =
    event.currentTarget.getAttribute("href") === "."
      ? "header"
      : event.currentTarget.getAttribute("href");
  const targetPosition = document.querySelector(targetId).offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  const duration = 1000;
  let start = null;

  window.requestAnimationFrame(step);

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    window.scrollTo(
      0,
      easeInOutCubic(progress, startPosition, distance, duration)
    );
    if (progress < duration) window.requestAnimationFrame(step);
  }
}

// Easing Functions

function linear(t, b, c, d) {
  return (c * t) / d + b;
}

function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
}

function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
}

// ANIMATE FADE IN ON SCROLL

const AnimateOnScroll = function ({ offset } = { offset: 10 }) {
  const windowTop = (offset * window.innerHeight) / 100;
  const windowBottom = window.innerHeight - windowTop;
  const windowLeft = 0;
  const windowRight = window.innerWidth;

  this.start = (element) => {
    window.requestAnimationFrame(() => {
      element.style.animationDelay = element.dataset.animationDelay;
      element.style.animationDuration = element.dataset.animationDuration;

      element.classList.add(element.dataset.animation);

      element.dataset.animated = "true";
    });
  };

  this.inViewport = (element) => {
    const elementRect = element.getBoundingClientRect();
    const elementTop =
      elementRect.top + parseInt(element.dataset.animationOffset) ||
      elementRect.top;
    const elementBottom =
      elementRect.bottom - parseInt(element.dataset.animationOffset) ||
      elementRect.bottom;
    const elementLeft = elementRect.left;
    const elementRight = elementRect.right;

    return (
      elementTop <= windowBottom &&
      elementBottom >= windowTop &&
      elementLeft <= windowRight &&
      elementRight >= windowLeft
    );
  };

  this.verifyElementsInViewport = (els = elements) => {
    for (let i = 0, len = els.length; i < len; i++) {
      if (els[i].dataset.animated) continue;

      this.inViewport(els[i]) && this.start(els[i]);
    }
  };

  this.getElements = () =>
    document.querySelectorAll("[data-animation]:not([data-animated])");

  this.update = () => {
    elements = this.getElements();
    elements && this.verifyElementsInViewport(elements);
  };

  window.addEventListener("load", this.update, false);
  window.addEventListener(
    "scroll",
    () => this.verifyElementsInViewport(elements),
    { passive: true }
  );
  window.addEventListener(
    "resize",
    () => this.verifyElementsInViewport(elements),
    { passive: true }
  );
};

const options = {
  offset: 15,
};

const animation = new AnimateOnScroll(options);

// MOUSE CURSOR

let mouseCursor = document.querySelector(".cursor");

window.addEventListener("mousemove", cursor);
window.addEventListener("mousewheel", disappear);

function cursor(e) {
  mouseCursor.style.top = e.pageY + "px";
  mouseCursor.style.left = e.pageX + "px";
  let w = window.innerWidth;
  let h = window.innerHeight;
  if (0.96 < e.pageX / w || 0.04 > e.pageX / w) {
    mouseCursor.classList.add("cursorOFF1");
  } else {
    mouseCursor.classList.remove("cursorOFF1");
  }
  if (4.1 < e.pageY / h || 0.02 > e.pageY / h) {
    mouseCursor.classList.add("cursorOFF2");
  } else {
    mouseCursor.classList.remove("cursorOFF2");
  }
}

logo.addEventListener("mouseover", grow);
logo.addEventListener("mouseleave", shrink);
burger.addEventListener("mouseover", grow);
burger.addEventListener("mouseleave", shrink);
const img1 = document.querySelector(".intropic");
img1.addEventListener("mouseover", grayscaleAdd);
img1.addEventListener("mouseleave", grayscaleRemove);
const img2 = document.querySelector(".image2");
img2.addEventListener("mouseover", grayscaleAdd);
img2.addEventListener("mouseleave", grayscaleRemove);
const img3 = document.querySelector(".box2");
img3.addEventListener("mouseover", grayscaleAdd);
img3.addEventListener("mouseleave", grayscaleRemove);
const img7 = document.querySelector(".boxsubtitle2");
img7.addEventListener("mouseover", grow);
img7.addEventListener("mouseleave", shrink);
const img4 = document.querySelector(".page4 img");
img4.addEventListener("mouseover", grayscaleAdd);
img4.addEventListener("mouseleave", grayscaleRemove);
const img5 = document.querySelector(".linkedinbox");
img5.addEventListener("mouseover", grow);
img5.addEventListener("mouseleave", shrink);
const img6 = document.querySelector(".emailbox");
img6.addEventListener("mouseover", grow);
img6.addEventListener("mouseleave", shrink);
const img8 = document.querySelector(".gitBox");
img8.addEventListener("mouseover", grow);
img8.addEventListener("mouseleave", shrink);

navbarLinks.forEach((link) => {
  link.addEventListener("mouseover", grow);
});
burgerMenuLinks.forEach((link) => {
  link.addEventListener("mouseover", grow);
});
navbarLinks.forEach((link) => {
  link.addEventListener("click", disappear);
});
burgerMenuLinks.forEach((link) => {
  link.addEventListener("click", disappear);
});
navbarLinks.forEach((link) => {
  link.addEventListener("mouseleave", shrink);
});
burgerMenuLinks.forEach((link) => {
  link.addEventListener("mouseleave", shrink);
});

function grow() {
  mouseCursor.classList.add("linkGrow");
}
function shrink() {
  mouseCursor.classList.remove("linkGrow");
}
function disappear() {
  mouseCursor.classList.add("cursorDisappear");
  window.addEventListener("mousemove", appear);
}
function appear() {
  mouseCursor.classList.remove("cursorDisappear");
}
function grayscaleAdd() {
  mouseCursor.classList.add("grayscale");
}
function grayscaleRemove() {
  mouseCursor.classList.remove("grayscale");
}
 