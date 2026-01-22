// diploma.js
import { createClient } from "https://esm.sh/@supabase/supabase-js";

// ------------------ Supabase Setup ------------------
const supabaseUrl = "https://knfbjpieihociajmylls.supabase.co";
const supabaseKey = "sb_publishable_ZMUVxenWZ3BGn0GCuARVBg_6gtSTkLw";
const supabase = createClient(supabaseUrl, supabaseKey);

// ------------------ DOM Elemente ------------------
const button = document.getElementById("saveBtn");
const textarea = document.getElementById("textInput");
const status = document.getElementById("status");
const container = document.querySelector(".scroll-container");

// ------------------ Text speichern ------------------
button.addEventListener("click", async () => {
  const text = textarea.value.trim();

  if (!text) {
    status.textContent = "Bitte Text eingeben.";
    return;
  }

  const { error } = await supabase.from("texts").insert([{ content: text }]);

  if (error) {
    console.error(error);
    status.textContent = error.message;
  } else {
    status.textContent = "Danke, dein Text wurde gespeichert!";
    textarea.value = "";
  }
});

// ------------------ Schnelles Snap-Scrolling ------------------
function fastScrollTo(element) {
  const targetY =
    element.offsetTop - container.offsetHeight / 2 + element.offsetHeight / 2;
  const startY = container.scrollTop;
  const distance = targetY - startY;
  const duration = 50; // Geschwindigkeit: kleiner = schneller

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
  // NICHT snappen, wenn Textarea fokussiert
  if (document.activeElement.tagName === "TEXTAREA") return;

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
