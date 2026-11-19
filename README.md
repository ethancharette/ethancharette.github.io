# Ethan's Desk — portfolio
(mostly just notes for myself teehee)

Plain HTML/CSS/JS, no build step.

Test locally: run `python3 -m http.server 8000` in this folder, then open http://localhost:8000

- css/style.css  all styling
- js/repos.js    live GitHub repo list
- js/site.js     lamp (light/dark) toggle + copy-email button
- assets/        icon/, img/, projects/<slug>/

## The contact form

- **Contact form:** posts to Web3Forms using the access key in `contact.html`. Messages are emailed to the address the key was created with. The key is meant to be public, so it's fine in the page source.
