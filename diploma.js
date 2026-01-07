const panels = document.querySelectorAll(".panel");
let index = 0;
let isScrolling = false;

function changePanel(newIndex) {
  if (isScrolling) return;
  isScrolling = true;

  panels[index].classList.remove("active");
  panels[newIndex].classList.add("active");
  index = newIndex;

  setTimeout(() => {
    isScrolling = false;
  }, 700);
}

window.addEventListener(
  "wheel",
  (e) => {
    if (index === texts.length - 1 && e.deltaY > 0) return;
    if (index === 0 && e.deltaY < 0) return;

    e.preventDefault();
  },
  { passive: false }
);

let startY = 0;
let endY = 0;
const swipeThreshold = 50; // Mindestdistanz

window.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {
  endY = e.changedTouches[0].clientY;
  handleSwipe();
});

function handleSwipe() {
  const deltaY = startY - endY;

  // Swipe nach oben
  if (deltaY > swipeThreshold && index < texts.length - 1) {
    changeText(index + 1);
  }

  // Swipe nach unten
  if (deltaY < -swipeThreshold && index > 0) {
    changeText(index - 1);
  }
}

const story = document.getElementById("story");

story.addEventListener(
  "touchmove",
  (e) => {
    if (index < texts.length - 1) {
      e.preventDefault();
    }
  },
  { passive: false }
);
