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
