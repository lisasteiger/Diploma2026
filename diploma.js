function fastScrollTo(element) {
  const container = document.querySelector(".scroll-container");
  const targetY =
    element.offsetTop - container.offsetHeight / 2 + element.offsetHeight / 2;
  const startY = container.scrollTop;
  const distance = targetY - startY;
  const duration = 50; // <--- hier kannst du die Geschwindigkeit einstellen (ms)

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

const container = document.querySelector(".scroll-container");
container.addEventListener("scroll", () => {
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

    fastScrollTo(closest); // schnelleres Scrollen
  }, 50);
});
