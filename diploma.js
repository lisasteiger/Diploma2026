// diploma.js
import { createClient } from "https://esm.sh/@supabase/supabase-js";

// ------------------ Supabase Setup ------------------
const supabaseUrl = "https://knfbjpieihociajmylls.supabase.co";
const supabaseKey = "sb_publishable_ZMUVxenWZ3BGn0GCuARVBg_6gtSTkLw";
const supabase = createClient(supabaseUrl, supabaseKey);

// ------------------ DOM Elemente ------------------
const button = document.getElementById("saveBtn");
const status = document.getElementById("status");

const text1 = document.getElementById("text1");
const text2 = document.getElementById("text2");
const text3 = document.getElementById("text3");

const container = document.querySelector(".scroll-container");

// ------------------ Texte speichern (ALLE DREI) ------------------
button.addEventListener("click", async () => {
  const data = {
    text_1: text1.value.trim(),
    text_2: text2.value.trim(),
    text_3: text3.value.trim(),
  };

  // Mindestens ein Feld ausfüllen
  if (!data.text_1 && !data.text_2 && !data.text_3) {
    status.textContent = "Bitte mindestens ein Feld ausfüllen.";
    return;
  }

  const { data: result, error } = await supabase
    .from("responses")
    .insert([data]);

  if (error) {
    console.error("SUPABASE ERROR:", error);
    status.textContent = error.message;
  } else {
    console.log("GESPEICHERT:", result);
    status.textContent = "Danke, dein Beitrag wurde gespeichert.";
    text1.value = "";
    text2.value = "";
    text3.value = "";
  }
});

// ------------------ Schnelles Snap-Scrolling ------------------
function fastScrollTo(element) {
  const targetY =
    element.offsetTop - container.offsetHeight / 2 + element.offsetHeight / 2;
  const startY = container.scrollTop;
  const distance = targetY - startY;
  const duration = 50;

  let startTime = null;

  function step(time) {
    if (!startTime) startTime = time;
    const progress = Math.min((time - startTime) / duration, 1);
    container.scrollTop = startY + distance * progress;
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

container.addEventListener("scroll", () => {
  // ❗ Kein Snapping wenn ein Textfeld aktiv ist
  if (
    document.activeElement === text1 ||
    document.activeElement === text2 ||
    document.activeElement === text3
  ) {
    return;
  }

  clearTimeout(container.scrollTimeout);
  container.scrollTimeout = setTimeout(() => {
    const panels = document.querySelectorAll(".panel");
    let closest = panels[0];
    let closestDist = Infinity;

    panels.forEach((panel) => {
      const rect = panel.getBoundingClientRect();
      const panelCenter = rect.top + rect.height / 2;
      const containerCenter =
        container.getBoundingClientRect().top + container.offsetHeight / 2;
      const dist = Math.abs(panelCenter - containerCenter);

      if (dist < closestDist) {
        closestDist = dist;
        closest = panel;
      }
    });

    fastScrollTo(closest);
  }, 50);
});
