/********************************
 * SUPABASE SETUP
 ********************************/
const supabaseUrl = "https://knfbjpieihociajmylls.supabase.co";
const supabaseKey = "sb_publishable_ZMUVxenWZ3BGn0GCuARVBg_6gtSTkLw";

const supabase = supabaseJs.createClient(supabaseUrl, supabaseKey);

const saveBtn = document.getElementById("saveBtn");
const textList = document.getElementById("textList");
const textarea = document.getElementById("autoTextarea");

/********************************
 * SUPABASE FUNKTIONEN
 ********************************/
async function loadTexts() {
  const { data, error } = await supabase
    .from("texts")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    return;
  }

  textList.innerHTML = "";
  data.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.content;
    textList.appendChild(li);
  });
}

async function saveText() {
  const content = textarea.value.trim();
  if (!content) return alert("Bitte Text eingeben");

  const { error } = await supabase.from("texts").insert([{ content }]);

  if (error) {
    console.error(error);
    alert("Fehler beim Speichern");
    return;
  }

  textarea.value = "";
  loadTexts();
}

saveBtn.addEventListener("click", saveText);

/********************************
 * PANEL SCROLL LOGIK
 ********************************/
const panels = document.querySelectorAll(".panel");
let index = 0;
let isAnimating = false;

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

  // Scroll freigeben erst nach letztem Panel
  document.body.style.overflowY = isLastPanel() ? "auto" : "hidden";

  setTimeout(() => {
    isAnimating = false;
  }, 700);
}

// Desktop Scroll
window.addEventListener(
  "wheel",
  (e) => {
    if (isLastPanel()) return;
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

  const delta = startY - e.changedTouches[0].clientY;

  if (Math.abs(delta) > 50) {
    delta > 0 ? changePanel(index + 1) : changePanel(index - 1);
  }
});

/********************************
 * TEXTAREA AUTO-HÖHE
 ********************************/
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

/********************************
 * INITIAL LOAD
 ********************************/
loadTexts();
