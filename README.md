# Personal academic website

Plain HTML and CSS, no build step. Works on GitHub Pages as is.

## Put it online

1. On GitHub, create a public repository named exactly `your-username.github.io`.
2. Upload everything in this folder (or `git clone` the repo, copy the files in, then `git add . && git commit -m "First version" && git push`).
3. In the repository, go to Settings → Pages and set the source to "Deploy from a branch", branch `main`, folder `/ (root)`.
4. After a minute or two the site is live at `https://your-username.github.io`.

To preview locally, open `index.html` in a browser, or run `python3 -m http.server` in this folder and go to http://localhost:8000.

## What to edit

| File | What it is |
| --- | --- |
| `index.html` | Home: name, role, about text, profile links, recent news |
| `research.html` | One block per project, each with a figure and a short description |
| `publications.html` | Paper list, grouped by year |
| `CV.pdf` | Replace with your own CV (keep the file name) |
| `images/hero.jpg` | Background of the header (placeholder star field) |
| `images/portrait.svg` | Replace with your photo, e.g. `images/portrait.jpg`, and update the `src` in `index.html` |
| `images/research/` | Your figures |
| `assets/css/style.css` | All styling; colours are at the top in `:root` |

Everything in `[square brackets]` is placeholder text. Search for `Your Name`, `your-username`, `your.name@` and `0000-0000` to find the rest.

The navigation is repeated at the top of each page. If you add a page, copy an existing one and add the link to the menu in every file.

## Adding a project

In `research.html`, copy one whole `<article class="project"> … </article>` block and paste it where it belongs (newest first). Change the title, the line below it, the image path, the caption, the alt text and the paragraphs. The layout alternates left/right by itself, and figures are numbered automatically.

## Figures for the web

- Save at about 1200–1600 px wide: in Matplotlib, `fig.savefig("name.png", dpi=150)` with a figure around 8–10 inches wide.
- Use larger fonts than in papers (`plt.rcParams["font.size"] = 15`); many people will read on a phone.
- Keep each file under about 300 KB. For photos and images with noise, JPEG or WebP is much smaller than PNG.
- Update the `width` and `height` attributes on the `<img>` tag to the real pixel size of your file, so the page doesn't jump while loading.
- Write `alt` text that says what the figure shows, for screen readers.
- Telescope images: NASA, ESA and ESO images can usually be reused with a credit line. Check the source's terms and put the credit in the caption (or in `.hero__credit` for the header image).

## Header image

Any wide image works (at least 2000 px wide, darker in the lower left where your name sits). Save it as `images/hero.jpg`, or change the file name near the top of `.hero` in `style.css`. Update the credit line in `index.html`.

## Fonts and privacy

Fonts (Spectral and Instrument Sans, both under the SIL Open Font License) are stored in `assets/fonts/`, so the site makes no requests to Google or other third parties. If you add analytics or embedded content later, check what data it sends; in Germany and the EU this can create GDPR obligations. If you are in Germany, also check whether you need an Impressum (legal notice) page.

## Custom domain (optional)

Buy a domain, add a file named `CNAME` containing just the domain (e.g. `yourname.com`), and follow GitHub's "Managing a custom domain" guide for the DNS settings.
