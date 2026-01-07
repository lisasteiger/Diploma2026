const panels = document.querySelectorAll(".panel");
const story = document.getElementById("story");

let index = 0;
let isAnimating = false;

/* ---------- Panel Wechsel ---------- */
function changePanel(newIndex) {
  if (isAnimating || newIndex === index) return;
  if (newIndex < 0 || newIndex >= panels.length) return;

  isAnimating = true;

  panels[index].classList.remove("active");
  panels[newIndex].classList.add("active");
  index = newIndex;

  updateScrollLock();

  setTimeout(() => {
    isAnimating = false;
  }, 700);
}

/* ---------- Desktop Scroll ---------- */
window.addEventListener(
  "wheel",
  (e) => {
    if (panels[index].classList.contains("form-panel")) return;

    if (e.deltaY > 0) {
      changePanel(index + 1);
    } else if (e.deltaY < 0) {
      changePanel(index - 1);
    }
  },
  { passive: true }
);

/* ---------- Mobile Touch ---------- */
let startY = 0;
let endY = 0;
const swipeThreshold = 50;

window.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {
  endY = e.changedTouches[0].clientY;
  handleSwipe();
});

function handleSwipe() {
  const deltaY = startY - endY;

  if (panels[index].classList.contains("form-panel")) return;

  if (deltaY > swipeThreshold) {
    changePanel(index + 1);
  } else if (deltaY < -swipeThreshold) {
    changePanel(index - 1);
  }
}

/* ---------- Scroll Sperre ---------- */
story.addEventListener(
  "touchmove",
  (e) => {
    if (!panels[index].classList.contains("form-panel")) {
      e.preventDefault();
    }
  },
  { passive: false }
);

/* ---------- Scroll Lock Body ---------- */
function updateScrollLock() {
  if (panels[index].classList.contains("form-panel")) {
    document.body.style.overflow = "auto";
  } else {
    document.body.style.overflow = "hidden";
  }
}

/* Initial */
updateScrollLock();
