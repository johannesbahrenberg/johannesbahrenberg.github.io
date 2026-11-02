"""Turn a folder of simulation snapshots into frames for the website's time slider,
and print the HTML to paste into research.html.

Works with any number of snapshots. Typical use:

    python3 make_slider.py ~/sim/plots  path/to/johannes.github.io/images/research/disc-evolution \
        --label "t = {n} orbits" --every 2

Arguments
    SNAPSHOTS     folder with your images (png/jpg), e.g. snap_0000.png, snap_0020.png, ...
    DESTINATION   folder inside your site where the web frames go (created if needed)

Options
    --label TEXT  text shown next to the slider for each frame. {n} = the number in the
                  file name (snap_0150.png -> 150), {i} = frame position 1, 2, 3, ...
                  Default: "Frame {i}".
    --scale X     multiply {n} by X, e.g. if snapshot 7 means 7 x 50 orbits, use --scale 50.
    --every K     use only every K-th snapshot (300 snapshots with --every 15 -> 20 frames).
    --width W     width of the web frames in pixels (default 1200).
    --alt TEXT    description of the figure for screen readers.

Needs Pillow:  pip install pillow
"""
import argparse
import re
from pathlib import Path
from PIL import Image

p = argparse.ArgumentParser(description="Make frames and HTML for the time slider.")
p.add_argument("snapshots")
p.add_argument("destination")
p.add_argument("--label", default="Frame {i}")
p.add_argument("--scale", type=float, default=1.0)
p.add_argument("--every", type=int, default=1)
p.add_argument("--width", type=int, default=1200)
p.add_argument("--alt", default="Simulation snapshots; use the slider to step through time.")
args = p.parse_args()

src = Path(args.snapshots).expanduser()
dst = Path(args.destination).expanduser()
dst.mkdir(parents=True, exist_ok=True)


def number(path):
    nums = re.findall(r"\d+", path.stem)
    return int(nums[-1]) if nums else None


files = [f for f in src.iterdir() if f.suffix.lower() in {".png", ".jpg", ".jpeg", ".webp", ".tif", ".tiff"}]
files.sort(key=lambda f: (number(f) is None, number(f) or 0, f.name))
files = files[:: max(args.every, 1)]
if not files:
    raise SystemExit(f"No images found in {src}")

# path the website uses: everything from "images/" onwards
parts = dst.resolve().parts
web_dir = "/".join(parts[parts.index("images"):]) if "images" in parts else dst.name

for old in dst.glob("frame-*.jpg"):          # start clean, so removed snapshots disappear
    old.unlink()

lines = []
for i, f in enumerate(files, start=1):
    with Image.open(f) as im:
        if im.mode in ("RGBA", "LA", "P"):
            im = im.convert("RGBA")
            white = Image.new("RGB", im.size, (255, 255, 255))
            white.paste(im, mask=im.split()[-1])
            im = white
        else:
            im = im.convert("RGB")
        if im.width > args.width:
            im = im.resize((args.width, round(im.height * args.width / im.width)), Image.LANCZOS)
        name = f"frame-{i:03d}.jpg"
        im.save(dst / name, "JPEG", quality=86, optimize=True, progressive=True)
        w, h = im.size

    n = number(f)
    value = (n if n is not None else i) * args.scale
    value = int(value) if float(value).is_integer() else round(value, 3)
    label = args.label.replace("{n}", str(value)).replace("{i}", str(i))
    alt = args.alt if i == 1 else ""
    lines.append(f'  <img src="{web_dir}/{name}" alt="{alt}" data-label="{label}" '
                 f'width="{w}" height="{h}" loading="lazy">')

size = sum(f.stat().st_size for f in dst.glob("frame-*.jpg")) / 1e6
print(f"<!-- {len(files)} frames, {size:.1f} MB in total -->")
print('<div class="timeslider" data-fps="6">')
print("\n".join(lines))
print("</div>")
