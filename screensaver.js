const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let w, h;
function resizeCanvas() {
  const container = document.getElementById("aiBubble");
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Create ✦ stars
const stars = Array.from({ length: 50 }).map(() => {
  const isSupernova = Math.random() < 0.1;
  const size = isSupernova ? Math.random() * 10 + 16 : Math.random() * 6 + 6;

  // Force minimum speed
  let vx = (Math.random() - 0.5) * 1.2;
  let vy = (Math.random() - 0.5) * 1.2;
  if (Math.abs(vx) < 0.2) vx = 0.2 * Math.sign(vx || 1);
  if (Math.abs(vy) < 0.2) vy = 0.2 * Math.sign(vy || 1);

  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx,
    vy,
    size,
    colorPhase: Math.random() * 360
  };
});

function animate() {
  ctx.clearRect(0, 0, w, h);

  for (let star of stars) {
    star.x += star.vx;
    star.y += star.vy;

    const halfSize = star.size / 2;

    // Bounce with visible edges
    if (star.x - halfSize < 0 || star.x + halfSize > w) star.vx *= -1;
    if (star.y - halfSize < 0 || star.y + halfSize > h) star.vy *= -1;

    // Color change
    star.colorPhase = (star.colorPhase + 0.8) % 360;
    const color = `hsl(${star.colorPhase}, 100%, 70%)`;

    // Glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = color;

    // Draw ✦
    ctx.fillStyle = color;
    ctx.font = `${star.size}px serif`;
    ctx.fillText("✦", star.x - halfSize, star.y + halfSize);
  }

  requestAnimationFrame(animate);
}
animate();
