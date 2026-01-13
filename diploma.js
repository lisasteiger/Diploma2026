import { createClient } from "https://esm.sh/@supabase/supabase-js";

const supabaseUrl = "https://knfbjpieihociajmylls.supabase.co";
const supabaseKey = "sb_publishable_ZMUVxenWZ3BGn0GCuARVBg_6gtSTkLw";

const supabase = createClient(supabaseUrl, supabaseKey);

const button = document.getElementById("saveBtn");
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
    console.error(error);
    status.textContent = error.message;
  } else {
    status.textContent = "danke";
    textarea.value = "";
  }
});
