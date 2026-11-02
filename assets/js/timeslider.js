// Time slider: step or play through a series of images (e.g. simulation snapshots).
//
// In the HTML, list the frames as <img> tags inside <div class="timeslider">, in order.
// Any number works; the slider adapts. Optional per frame: data-label="t = 100 orbits".
// Optional on the div: data-fps="6" (playback speed, frames per second).
(() => {
  const icon = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor"><path d="${d}"/></svg>`;
  const PLAY = icon("M8 5.5v13a1 1 0 0 0 1.5.86l10.4-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z");
  const PAUSE = icon("M7 5h3.5v14H7zM13.5 5H17v14h-3.5z");

  document.querySelectorAll(".timeslider").forEach(setup);

  function setup(root) {
    const frames = Array.from(root.querySelectorAll(":scope > img"));
    const n = frames.length;
    if (n < 2) return;
    const fps = parseFloat(root.dataset.fps) || 6;

    // Stack the frames and add the controls
    const stage = document.createElement("div");
    stage.className = "timeslider__frames";
    frames.forEach((img) => stage.appendChild(img));
    root.prepend(stage);
    root.setAttribute("role", "group");
    if (!root.hasAttribute("aria-label")) root.setAttribute("aria-label", frames[0].alt || "Time series");

    const controls = document.createElement("div");
    controls.className = "timeslider__controls";
    controls.innerHTML =
      `<button type="button" class="timeslider__play" aria-label="Play">${PLAY}</button>` +
      `<input class="timeslider__range" type="range" min="0" max="${n - 1}" step="1" value="0" aria-label="Time">` +
      `<span class="timeslider__label" aria-hidden="true"></span>`;
    root.appendChild(controls);
    const button = controls.querySelector("button");
    const range = controls.querySelector("input");
    const out = controls.querySelector("span");

    let current = 0, shown = 0, timer = null, hold = 0;
    const label = (i) => frames[i].dataset.label || `Frame ${i + 1} of ${n}`;

    // Show frame i as soon as it has loaded (keeps the previous one until then: no flicker)
    function go(i) {
      current = Math.max(0, Math.min(n - 1, i));
      range.value = current;
      out.textContent = label(current);
      range.setAttribute("aria-valuetext", label(current));
      const img = frames[current], wanted = current;
      const swap = () => {
        if (wanted !== current) return;
        frames[shown].classList.remove("is-current");
        img.classList.add("is-current");
        shown = wanted;
      };
      if (img.complete && img.naturalWidth) swap();
      else { img.loading = "eager"; img.addEventListener("load", swap, { once: true }); }
    }

    let loaded = false;
    function loadAll() {                     // fetch all frames once the visitor starts using it
      if (loaded) return;
      loaded = true;
      frames.forEach((img) => (img.loading = "eager"));
    }

    function tick() {
      if (current === n - 1) {               // pause about a second on the last frame, then loop
        if (++hold < fps) return;
        hold = 0;
        return go(0);
      }
      go(current + 1);
    }
    function play() {
      loadAll();
      if (current === n - 1) go(0);
      timer = setInterval(tick, 1000 / fps);
      button.innerHTML = PAUSE;
      button.setAttribute("aria-label", "Pause");
    }
    function pause() {
      clearInterval(timer);
      timer = null;
      hold = 0;
      button.innerHTML = PLAY;
      button.setAttribute("aria-label", "Play");
    }

    button.addEventListener("click", () => (timer ? pause() : play()));
    range.addEventListener("input", () => { pause(); loadAll(); go(Number(range.value)); });
    range.addEventListener("pointerdown", loadAll);
    range.addEventListener("focus", loadAll);

    // Stop playing when the slider is scrolled out of view
    if ("IntersectionObserver" in window) {
      new IntersectionObserver((entries) => {
        if (!entries[0].isIntersecting && timer) pause();
      }).observe(root);
    }

    frames[0].classList.add("is-current");
    go(0);
  }
})();
