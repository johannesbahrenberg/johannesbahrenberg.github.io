"""Prepare phone/camera photos for the website.

- shrinks them to at most 2000 px on the long side (a few hundred KB instead of several MB)
- turns them the right way up (phones store rotation separately)
- removes ALL metadata, including the GPS location of where the photo was taken

Usage:
    pip install pillow
    python3 prepare_photos.py ~/Pictures/for-website  path/to/johannes.github.io/images/other

The originals are not changed. Output files are .jpg with lowercase names.
"""
import sys
from pathlib import Path
from PIL import Image, ImageOps

MAX_SIDE = 2000
QUALITY = 82
#QUALITY = 100

src, dst = Path(sys.argv[1]).expanduser(), Path(sys.argv[2]).expanduser()
dst.mkdir(parents=True, exist_ok=True)

for f in sorted(src.iterdir()):
    if f.suffix.lower() not in {".jpg", ".jpeg", ".png", ".webp", ".tif", ".tiff"}:
        continue  # HEIC from iPhones: export as JPEG first, or `pip install pillow-heif`
    with Image.open(f) as im:
        im = ImageOps.exif_transpose(im)       # apply rotation, then drop the EXIF
        im = im.convert("RGB")
        im.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
        out = dst / (f.stem.lower().replace(" ", "-") + ".jpg")
        im.save(out, "JPEG", quality=QUALITY, optimize=True, progressive=True)  # no exif= -> no metadata
        print(f"{f.name} -> {out.name}  {im.size[0]}x{im.size[1]}  {out.stat().st_size // 1024} KB")
