const panels = document.querySelectorAll(".panel");
let index = 0;
let isAnimating = false;

// Panels initial setzen
panels[0].classList.add("active");

// Body-Overflow initial nur blocken, solange Panels aktiv sind
document.body.style.overflowY = "hidden";

function changePanel(newIndex) {
  if (isAnimating) return;
  if (newIndex < 0 || newIndex >= panels.length) return;

  isAnimating = true;

  panels[index].classList.remove("active");
  panels[newIndex].classList.add("active");
  index = newIndex;

  // Body-Scroll nur freigeben, wenn wir am letzten Panel angekommen sind
  if (index === panels.length - 1) {
    document.body.style.overflowY = "auto";
  } else {
    document.body.style.overflowY = "hidden";
  }

  setTimeout(() => {
    isAnimating = false;
  }, 1200);
}

// Desktop Scroll
window.addEventListener(
  "wheel",
  (e) => {
    // Wenn im Textarea, NICHT Panel wechseln
    if (e.target.closest("textarea")) return;

    if (isAnimating) return;

    if (e.deltaY > 0) {
      changePanel(index + 1);
    } else if (e.deltaY < 0) {
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

// Textarea dynamische Höhe
const textarea = document.getElementById("autoTextarea");

textarea.addEventListener("input", () => {
  textarea.style.height = "auto";

  const maxHeight = window.innerHeight * 0.4; // max Höhe 40% des Viewports

  if (textarea.scrollHeight > maxHeight) {
    textarea.style.height = maxHeight + "px";
    textarea.style.overflowY = "auto";
  } else {
    textarea.style.height = textarea.scrollHeight + "px";
    textarea.style.overflowY = "hidden";
  }
});
