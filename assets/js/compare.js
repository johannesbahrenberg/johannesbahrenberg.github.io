// Comparison slider: two images on top of each other, divider dragged left/right.
//
// HTML: <div class="compare"> with exactly two <img> inside: first = left, second = right.
// Optional on each img: data-label="ALMA observation" (small name tag in the corner).
// Optional on the div: data-start="50" (where the divider starts, in percent).
(() => {
  const ARROWS = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/></svg>';

  document.querySelectorAll(".compare").forEach(setup);

  function setup(root) {
    const imgs = root.querySelectorAll(":scope > img");
    if (imgs.length !== 2) return;
    const [left, right] = imgs;
    const nameL = left.dataset.label || "left image";
    const nameR = right.dataset.label || "right image";

    // Build: frame > stage > images, divider, handle, labels
    const frame = document.createElement("div");
    frame.className = "compare__frame";
    const stage = document.createElement("div");
    stage.className = "compare__stage";
    left.classList.add("compare__before");
    right.classList.add("compare__after");
    stage.append(left, right);

    const divider = document.createElement("div");
    divider.className = "compare__divider";
    const handle = document.createElement("button");
    handle.type = "button";
    handle.className = "compare__handle";
    handle.innerHTML = ARROWS;
    handle.setAttribute("role", "slider");
    handle.setAttribute("aria-label", `Divider between ${nameL} and ${nameR}`);
    handle.setAttribute("aria-valuemin", "0");
    handle.setAttribute("aria-valuemax", "100");
    stage.append(divider, handle);

    const tags = [];
    [[left, "left"], [right, "right"]].forEach(([img, side]) => {
      if (!img.dataset.label) return;
      const tag = document.createElement("span");
      tag.className = `compare__label compare__label--${side}`;
      tag.textContent = img.dataset.label;
      tag.setAttribute("aria-hidden", "true");
      stage.append(tag);
      tags.push([tag, side]);
    });

    frame.append(stage);
    root.append(frame);
    root.classList.add("is-ready");

    // Position of the divider, 0-100 %
    let pos = 50;
    function set(p) {
      pos = Math.max(0, Math.min(100, p));
      stage.style.setProperty("--pos", pos + "%");
      handle.setAttribute("aria-valuenow", String(Math.round(pos)));
      handle.setAttribute("aria-valuetext", `${Math.round(pos)}% ${nameL}, ${100 - Math.round(pos)}% ${nameR}`);
      tags.forEach(([tag, side]) =>          // hide a tag when its image is almost covered
        tag.classList.toggle("is-hidden", side === "left" ? pos < 18 : pos > 82));
    }
    set(parseFloat(root.dataset.start) || 50);

    // Mouse: click or drag anywhere. Touch: swipe sideways (vertical swipes still scroll).
    let dragging = false;
    const fromPointer = (event) => {
      const r = stage.getBoundingClientRect();
      set(((event.clientX - r.left) / r.width) * 100);
    };
    stage.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragging = true;
      stage.setPointerCapture(event.pointerId);
      if (event.pointerType === "mouse") fromPointer(event);
    });
    stage.addEventListener("pointermove", (event) => { if (dragging) fromPointer(event); });
    ["pointerup", "pointercancel"].forEach((type) =>
      stage.addEventListener(type, () => (dragging = false)));

    // Keyboard on the round handle
    handle.addEventListener("keydown", (event) => {
      const step = event.shiftKey ? 10 : 2;
      const keys = {
        ArrowLeft: pos - step, ArrowDown: pos - step,
        ArrowRight: pos + step, ArrowUp: pos + step,
        PageDown: pos - 20, PageUp: pos + 20, Home: 0, End: 100,
      };
      if (event.key in keys) { event.preventDefault(); set(keys[event.key]); }
    });
  }
})();
