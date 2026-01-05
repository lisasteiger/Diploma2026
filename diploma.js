// ---- Supabase Setup ----
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// Hier deine Supabase URL und ANON KEY einfügen
const supabaseUrl = "https://knfbjpieihociajmylls.supabase.co";
const supabaseKey = "sb_publishable_ZMUVxenWZ3BGn0GCuARVBg_6gtSTkLw";
const supabase = createClient(supabaseUrl, supabaseKey);

// ---- Elemente ----
const textInput = document.getElementById("textInput");
const saveBtn = document.getElementById("saveBtn");
const textList = document.getElementById("textList");

// ---- Texte laden ----
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

// ---- Text speichern ----
async function saveText() {
  const content = textInput.value.trim();
  if (!content) return alert("Bitte Text eingeben!");

  const { data, error } = await supabase.from("texts").insert([{ content }]);

  if (error) {
    console.error(error);
    alert("Fehler beim Speichern!");
    return;
  }

  textInput.value = "";
  loadTexts();
}

// ---- Event ----
saveBtn.addEventListener("click", saveText);

// ---- Initial load ----
loadTexts();
