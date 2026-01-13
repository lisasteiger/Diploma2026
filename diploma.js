// SUPABASE

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://knfbjpieihociajmylls.supabase.co";
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

//

const input = document.getElementById("textInput");
const output = document.getElementById("savedText");

// gespeicherten Text laden
const saved = localStorage.getItem("userText");
if (saved) {
  output.textContent = "Gespeichert: " + saved;
}

function saveText() {
  localStorage.setItem("userText", input.value);
  output.textContent = "Gespeichert: " + input.value;
}
