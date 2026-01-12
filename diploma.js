const panels = document.querySelectorAll(".panel");
let index = 0;
let isAnimating = false;

// Initial
panels[0].classList.add("active");
document.body.style.overflowY = "hidden";

function isLastPanel() {
  return index === panels.length - 1;
}

function changePanel(newIndex) {
  if (isAnimating) return;
  if (newIndex < 0 || newIndex >= panels.length) return;

  isAnimating = true;

  panels[index].classList.remove("active");
  panels[newIndex].classList.add("active");
  index = newIndex;

  // Scroll freigeben oder blockieren
  if (isLastPanel()) {
    document.body.style.overflowY = "auto";
  } else {
    document.body.style.overflowY = "hidden";
  }

  setTimeout(() => {
    isAnimating = false;
  }, 800);
}

// Desktop Scroll
window.addEventListener(
  "wheel",
  (e) => {
    // Wenn wir im letzten Panel sind → normaler Scroll
    if (isLastPanel()) return;

    // Textarea darf normal scrollen
    if (e.target.closest("textarea")) return;

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
  if (isLastPanel()) return;

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

// Dynamische Textarea-Höhe
const textarea = document.getElementById("autoTextarea");

textarea.addEventListener("input", () => {
  textarea.style.height = "auto";

  const maxHeight = window.innerHeight * 0.4;

  if (textarea.scrollHeight > maxHeight) {
    textarea.style.height = maxHeight + "px";
    textarea.style.overflowY = "auto";
  } else {
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.overflowY = "hidden";
  }
});
