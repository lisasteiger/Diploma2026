const panels = document.querySelectorAll(".panel");
let index = 0;
let isAnimating = false;

// Initial
panels[0].classList.add("active");
document.body.style.overflow = "hidden";

function changePanel(newIndex) {
  if (isAnimating) return;
  if (newIndex < 0 || newIndex >= panels.length) return;

  isAnimating = true;

  panels[index].classList.remove("active");
  panels[newIndex].classList.add("active");
  index = newIndex;

  setTimeout(() => {
    isAnimating = false;
  }, 1200);
}

// Desktop Scroll
window.addEventListener(
  "wheel",
  (e) => {
    e.preventDefault();
    if (e.deltaY > 0) {
      changePanel(index + 1);
    } else {
      changePanel(index - 1);
    }
  },
  { passive: false }
);

// Mobile Swipe
let startY = 0;

window.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {
  const endY = e.changedTouches[0].clientY;
  const delta = startY - endY;

  if (Math.abs(delta) > 50) {
    if (delta > 0) {
      changePanel(index + 1);
    } else {
      changePanel(index - 1);
    }
  }
});
