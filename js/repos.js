/* Loads public GitHub repos into #rg on every page load.
   - Always asks GitHub for the current list (new repos show up on refresh).
   - If GitHub can't be reached (e.g. rate limit), falls back to the last list it
     loaded successfully, then to the small built-in list below. */
(function () {
  var el = document.getElementById("rg");
  if (!el) return;
  var count = parseInt(el.getAttribute("data-count"), 10) || 100;
  var USER = "ethancharette";
  var HIDE = ["ethancharette.github.io"]; // repos to leave out
  var SHOW_FORKS = false;                 // set true to include forked repos
  var KEY = "repos-cache-v1";
  var U = "https://github.com/" + USER + "/";
  var icon = '<svg class="ic" aria-hidden="true"><use href="#i-github"/></svg>';

  // Descriptions used when a repo has none set on GitHub, and the offline fallback list.
  var STATIC = [
    { name: "WildJam26-star-wrangler", language: "GDScript", description: "Game jam entry made in Godot for Wild Jam 26.", html_url: U + "WildJam26-star-wrangler", stargazers_count: 0, pushed_at: "2026-05-17" },
    { name: "MissileGame", language: "ASP.NET", description: "Personal project.", html_url: U + "MissileGame", stargazers_count: 0, pushed_at: "2025-02-08" }
  ];
  var known = {};
  STATIC.forEach(function (r) { known[r.name] = r.description; });

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function card(r) {
    return '<a class="card repo" href="' + esc(r.html_url) + '" target="_blank" rel="noopener"><div class="b"><h3>' + icon + esc(r.name) +
      '</h3><div class="tg">' + esc(r.language || "Code") + (r.stargazers_count ? " · ★ " + r.stargazers_count : "") +
      " · updated " + esc((r.pushed_at || "").slice(0, 7)) + "</div><p>" + esc(r.description || known[r.name] || "No description yet.") + "</p></div></a>";
  }
  function show(list) { el.innerHTML = list.length ? list.slice(0, count).map(card).join("") : '<p class="mute">No public repos to show yet.</p>'; }
  function note(msg) {
    var n = document.getElementById("rg-note");
    if (!n) { n = document.createElement("p"); n.id = "rg-note"; n.className = "mute"; n.style.cssText = "font:500 .8rem JetBrains Mono,monospace"; el.insertAdjacentElement("afterend", n); }
    n.textContent = msg;
  }

  function fallback(why) {
    var list = null;
    try { list = JSON.parse(localStorage.getItem(KEY)); } catch (e) {}
    show(list && list.length ? list : STATIC);
    note("Couldn’t reach GitHub just now (" + why + "), so this is a saved list. Refresh in a bit to update.");
    if (window.console) console.warn("GitHub repo load failed:", why);
  }

  el.innerHTML = '<p class="mute">Loading repos…</p>';
  fetch("https://api.github.com/users/" + USER + "/repos?per_page=100&sort=pushed&type=owner", { cache: "no-cache", headers: { Accept: "application/vnd.github+json" } })
    .then(function (r) {
      if (!r.ok) throw new Error(r.status === 403 ? "rate limit" : "HTTP " + r.status);
      return r.json();
    })
    .then(function (list) {
      list = list.filter(function (r) { return (SHOW_FORKS || !r.fork) && HIDE.indexOf(r.name) < 0; })
        .sort(function (a, b) { return a.pushed_at < b.pushed_at ? 1 : -1; });
      try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {}
      show(list);
    })
    .catch(function (e) { fallback(e && e.message ? e.message : "network error"); });
})();
