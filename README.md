# Ethan's Desk — portfolio

Plain HTML/CSS/JS. No build step. GitHub Pages serves it as-is.

## Test locally

Open a terminal in this folder and run:

    python3 -m http.server 8000

Then visit http://localhost:8000 . (Use a local server rather than double-clicking
the files: YouTube embeds refuse to play from `file://` addresses.)

## Structure

    index.html            home
    about.html
    contact.html
    code.html             GitHub repos (js/repos.js)
    projects/
      index.html          portfolio grid
      maid-mayhem.html    one file per project
      hardly-workin.html
      mind-over-matter.html
      flicker.html
      tanks.html
      <slug>/index.html   tiny redirects so old Hugo URLs keep working (safe to delete)
    about/ contact/       same: old-URL redirects
    css/style.css         all styling, shared by every page
    js/repos.js           repo list (edit descriptions at the top)
    assets/               icon/ (favicons), img/ (icon, headshot, resume), projects/<slug>/
    site.webmanifest
    404.html
    .nojekyll

## Images

The big originals were resized and saved as .webp (about 35 MB down to 3 MB), so
pages load fast. Pages reference the .webp files. The old large .png/.jpg versions
are no longer used and can be removed from the repo (keep the originals elsewhere
if you want them).

## Adding a project

1. Copy any `projects/*.html` to `projects/<new-slug>.html` and edit the content.
2. Put its images in `assets/projects/<new-slug>/` (resize to ~1800px wide, save as .webp).
3. Add a card for it in `index.html` and `projects/index.html`.

## Header / footer

Each page has its own copy. To add a nav link, edit the `<nav>` in every page.
