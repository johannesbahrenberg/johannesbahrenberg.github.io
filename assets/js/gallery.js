// Click a photo to see the whole, uncropped picture with its caption.
// Arrow keys or the buttons go to the previous/next photo; Esc closes.
// Without JavaScript, clicking simply opens the image file.
(() => {
  const links = Array.from(document.querySelectorAll(".photo__link"));
  if (!links.length || typeof HTMLDialogElement !== "function") return;

  const icon = (d) =>
    `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;

  const dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Photo");
  dialog.innerHTML = `
    <img alt="">
    <div class="lightbox__bar">
      <div class="lightbox__caption"></div>
      <div class="lightbox__controls">
        <button class="lightbox__btn" type="button" data-step="-1" aria-label="Previous photo">${icon("M15 6l-6 6 6 6")}</button>
        <button class="lightbox__btn" type="button" data-step="1" aria-label="Next photo">${icon("M9 6l6 6-6 6")}</button>
        <button class="lightbox__btn" type="button" data-close aria-label="Close">${icon("M6 6l12 12M18 6L6 18")}</button>
      </div>
    </div>`;
  document.body.appendChild(dialog);

  const big = dialog.querySelector("img");
  const caption = dialog.querySelector(".lightbox__caption");
  let current = 0;

  if (links.length < 2) dialog.querySelectorAll("[data-step]").forEach((b) => (b.hidden = true));

  function show(i) {
    current = (i + links.length) % links.length;
    const link = links[current];
    const thumb = link.querySelector("img");
    const figcaption = link.closest("figure").querySelector("figcaption");
    big.src = link.href;
    big.alt = thumb ? thumb.alt : "";
    caption.innerHTML = figcaption ? figcaption.innerHTML : "";
  }

  links.forEach((link, i) => {
    link.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return; // new tab etc.
      event.preventDefault();
      show(i);
      dialog.showModal();
    });
  });

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {                                  // click on the dark area outside
      const r = dialog.getBoundingClientRect();
      const inside = event.clientX >= r.left && event.clientX <= r.right && event.clientY >= r.top && event.clientY <= r.bottom;
      if (!inside) dialog.close();
      return;
    }
    const step = event.target.closest("[data-step]");
    if (step) return show(current + Number(step.dataset.step));
    if (event.target.closest("[data-close]")) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });

  dialog.addEventListener("close", () => links[current].focus());
})();
