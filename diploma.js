// 🔑 HIER DEINE DATEN EINSETZEN

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://knfbjpieihociajmylls.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const button = document.getElementById("submitBtn");
const textarea = document.getElementById("textInput");
const status = document.getElementById("status");

button.addEventListener("click", async () => {
  const text = textarea.value.trim();

  if (!text) {
    status.textContent = "Bitte Text eingeben.";
    return;
  }

  const { error } = await supabase.from("texts").insert([{ content: text }]);

  if (error) {
    status.textContent = "Fehler beim Speichern.";
    console.error(error);
  } else {
    status.textContent = "Text gespeichert ✔";
    textarea.value = "";
  }
});
