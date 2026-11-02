// Info points (+) on the header image.
//
// Each <div class="hotspot" data-x="..." data-y="..."> inside <div class="hotspots">
// becomes a round + button with a small explanation box. data-x and data-y are
// positions on the WHOLE image in percent (0 = left/top, 100 = right/bottom), so the
// points stay on the right feature however the screen crops the image. Points whose
// feature is cropped away on a small screen are hidden.
//
// To find coordinates: open the page with ?hotspots at the end of the address
// (e.g. index.html?hotspots) and click on the image. The values are shown and copied.
(() => {
  const PLUS = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>';

  document.querySelectorAll(".hotspots").forEach(setup);

  function setup(layer) {
    const hero = layer.closest(".hero");
    if (!hero) return;

    let open = null;
    let geo = null;            // where the image sits inside the header right now
    let size = null;           // natural size of the image

    const items = Array.from(layer.querySelectorAll(".hotspot")).map((panel, i) => {
      panel.id = panel.id || `hotspot-${i + 1}`;
      panel.hidden = true;
      const title = panel.querySelector("h2, h3, strong");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "hotspot__btn";
      btn.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-controls", panel.id);
      btn.innerHTML = PLUS + '<span class="visually-hidden">Explain: ' +
        (title ? title.textContent : "detail " + (i + 1)) + "</span>";
      layer.insertBefore(btn, panel);
      const item = { btn, panel, fx: parseFloat(panel.dataset.x) / 100, fy: parseFloat(panel.dataset.y) / 100, x: 0, y: 0 };
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
        open === item ? close() : show(item);
      });
      panel.addEventListener("click", (event) => event.stopPropagation());
      return item;
    });
    layer.classList.add("is-ready");

    // ---- geometry: replicate "background-size: cover" ----
    function background() {
      const cs = getComputedStyle(hero);
      const url = (cs.backgroundImage.match(/url\(["']?(.*?)["']?\)/) || [])[1];
      const pos = cs.backgroundPosition.split(",")[0].trim().split(/\s+/)
        .map((v) => (v.endsWith("%") ? parseFloat(v) / 100 : 0.5));
      return { url, px: pos[0] ?? 0.5, py: pos[1] ?? 0.5 };
    }

    function layout() {
      if (!size) return;
      const bg = background();
      const W = hero.clientWidth, H = hero.clientHeight;
      const s = Math.max(W / size.w, H / size.h);
      const rw = size.w * s, rh = size.h * s;
      geo = { W, H, rw, rh, ox: (W - rw) * bg.px, oy: (H - rh) * bg.py };
      items.forEach((it) => {
        it.x = geo.ox + it.fx * rw;
        it.y = geo.oy + it.fy * rh;
        const visible = it.x > 20 && it.x < W - 20 && it.y > 20 && it.y < H - 20;
        it.btn.hidden = !visible || Number.isNaN(it.fx + it.fy);
        it.btn.style.left = it.x + "px";
        it.btn.style.top = it.y + "px";
        if (it.btn.hidden && open === it) close();
      });
      if (open) place(open);
    }

    // ---- open / close ----
    function show(item) {
      if (open) close();
      open = item;
      item.panel.hidden = false;
      item.btn.setAttribute("aria-expanded", "true");
      layer.classList.add("has-open");
      place(item);
    }

    function close(returnFocus) {
      if (!open) return;
      open.panel.hidden = true;
      open.btn.setAttribute("aria-expanded", "false");
      if (returnFocus) open.btn.focus();
      open = null;
      layer.classList.remove("has-open");
    }

    // Put the box next to its point, flipping sides so it stays inside the header
    function place(item) {
      const p = item.panel, gap = 28, m = 12;
      const W = hero.clientWidth, H = hero.clientHeight;
      const pw = p.offsetWidth, ph = p.offsetHeight;
      let left, top = item.y - 20;
      if (item.x + gap + pw <= W - m) left = item.x + gap;
      else if (item.x - gap - pw >= m) left = item.x - gap - pw;
      else {                                   // narrow screen: below (or above) the point
        left = item.x - pw / 2;
        top = item.y + gap;
        if (top + ph > H - m) top = item.y - gap - ph;
      }
      p.style.left = Math.max(m, Math.min(left, W - m - pw)) + "px";
      p.style.top = Math.max(m, Math.min(top, H - m - ph)) + "px";
    }

    document.addEventListener("click", () => close());
    document.addEventListener("keydown", (event) => { if (event.key === "Escape") close(true); });

    // ---- load the image's size, then place everything ----
    const bg = background();
    if (!bg.url) return;
    const img = new Image();
    img.onload = () => {
      size = { w: img.naturalWidth, h: img.naturalHeight };
      layout();
      if ("ResizeObserver" in window) new ResizeObserver(layout).observe(hero);
      else window.addEventListener("resize", layout);
    };
    img.src = bg.url;

    // ---- helper for finding coordinates: page.html?hotspots ----
    if (new URLSearchParams(location.search).has("hotspots")) {
      hero.classList.add("is-placing");
      const note = document.createElement("div");
      note.className = "hotspot-coords";
      note.textContent = "Click on the image to get coordinates for a point.";
      document.body.appendChild(note);
      hero.addEventListener("click", (event) => {
        if (!geo || event.target.closest("a, button, .hotspot")) return;
        const rect = hero.getBoundingClientRect();
        const fx = ((event.clientX - rect.left - geo.ox) / geo.rw) * 100;
        const fy = ((event.clientY - rect.top - geo.oy) / geo.rh) * 100;
        const text = `data-x="${fx.toFixed(1)}" data-y="${fy.toFixed(1)}"`;
        note.innerHTML = "<code></code> copied";
        note.querySelector("code").textContent = text;
        try { navigator.clipboard.writeText(text).catch(() => (note.lastChild.textContent = "")); }
        catch (e) { note.lastChild.textContent = ""; }
      });
    }
  }
})();
