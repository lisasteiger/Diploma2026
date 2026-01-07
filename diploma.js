const texts = document.querySelectorAll(".text");
let index = 0;
let isScrolling = false;

window.addEventListener("wheel", (e) => {
  if (isScrolling) return;

  if (e.deltaY > 0 && index < texts.length - 1) {
    changeText(index + 1);
  } else if (e.deltaY < 0 && index > 0) {
    changeText(index - 1);
  }
});

function changeText(newIndex) {
  isScrolling = true;

  texts[index].classList.remove("active");
  texts[newIndex].classList.add("active");

  index = newIndex;

  setTimeout(() => {
    isScrolling = false;
  }, 700); // etwas länger als CSS transition
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
