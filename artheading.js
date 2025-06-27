const titles = ["AI Art Showcase", "Visual Gallery"];
let idx = 0;
const el = document.getElementById("typewriter-text");

function typeWriterEffect(text, i = 0) {
  if (i === 0) el.textContent = "";
  if (i < text.length) {
    el.textContent += text.charAt(i);
    setTimeout(() => typeWriterEffect(text, i + 1), 100); // adjust typing speed here
  } else {
    setTimeout(() => runTypewriter(), 4000); // wait then show next title
  }
}

function runTypewriter() {
  typeWriterEffect(titles[idx]);
  idx = (idx + 1) % titles.length;
}


runTypewriter();
