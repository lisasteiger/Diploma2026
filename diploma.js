/********************************
 * SUPABASE SETUP
 ********************************/
const supabaseUrl = "https://knfbjpieihociajmylls.supabase.co";
const supabaseKey = "sb_publishable_ZMUVxenWZ3BGn0GCuARVBg_6gtSTkLw";

const { createClient } = window.supabase;
const supabase = createClient(supabaseUrl, supabaseKey);

const saveBtn = document.getElementById("saveBtn");
const textList = document.getElementById("textList");
const textarea = document.getElementById("autoTextarea");

/********************************
 * PANEL SETUP
 ********************************/
const panels = document.querySelectorAll(".panel");
let index = 0;
let isAnimating = false;

document.body.style.overflowY = "hidden";
panels[0].classList.add("active");

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

  document.body.style.overflowY = isLastPanel() ? "auto" : "hidden";

  setTimeout(() => (isAnimating = false), 600);
}

// Wheel
window.addEventListener(
  "wheel",
  (e) => {
    if (isLastPanel()) return;
    if (e.target.closest("textarea")) return;

    e.preventDefault();

    e.deltaY > 0 ? changePanel(index + 1) : changePanel(index - 1);
  },
  { passive: false }
);

// Touch
let startY = 0;
window.addEventListener("touchstart", (e) => {
  startY = e.touches[0].clientY;
});

window.addEventListener("touchend", (e) => {
  if (isLastPanel()) return;

  const delta = startY - e.changedTouches[0].clientY;
  if (Math.abs(delta) > 50) {
    delta > 0 ? changePanel(index + 1) : changePanel(index - 1);
  }
});

/********************************
 * SUPABASE
 ********************************/
async function loadTexts() {
  const { data } = await supabase
    .from("texts")
    .select("*")
    .order("id", { ascending: true });

  textList.innerHTML = "";
  data?.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.content;
    textList.appendChild(li);
  });
}

saveBtn.addEventListener("click", async () => {
  const content = textarea.value.trim();
  if (!content) return;

  await supabase.from("texts").insert([{ content }]);
  textarea.value = "";
  loadTexts();
});

loadTexts();
