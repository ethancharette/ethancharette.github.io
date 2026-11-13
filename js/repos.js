/* Loads your public GitHub repos into #rg every time the page loads.
   Nothing is hardcoded: if GitHub can't be reached, a message with a link is shown. */
(function () {
  var el = document.getElementById("rg");
  if (!el) return;
  var count = parseInt(el.getAttribute("data-count"), 10) || 100;
  var USER = "ethancharette";
  var HIDE = ["ethancharette.github.io"]; // repos to leave out
  var SHOW_FORKS = false;                 // set true to include forked repos
  var icon = '<svg class="ic" aria-hidden="true"><use href="#i-github"/></svg>';

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }
  function card(r) {
    var tags = (r.topics || []).slice(0, 4).map(function (t) { return "#" + esc(t); }).join(" ");
    var site = r.homepage ? '<a class="chip" href="' + esc(r.homepage) + '" target="_blank" rel="noopener">Play / visit</a>' : "";
    return '<div class="card repo"><div class="b"><h3><a href="' + esc(r.html_url) + '" target="_blank" rel="noopener">' + icon + esc(r.name) +
      '</a></h3><div class="tg">' + esc(r.language || "Code") + (r.stargazers_count ? " · ★ " + r.stargazers_count : "") +
      " · updated " + esc((r.pushed_at || "").slice(0, 7)) + "</div><p>" + esc(r.description || "No description yet.") + "</p>" +
      (tags ? '<div class="tags">' + tags + "</div>" : "") + site + "</div></div>";
  }
  function fail(why) {
    el.innerHTML = '<p class="mute">Couldn’t retrieve repositories right now. <a href="https://github.com/' + USER + '?tab=repositories" target="_blank" rel="noopener">View all on GitHub</a>.</p>';
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
      el.innerHTML = list.length
        ? list.slice(0, count).map(card).join("")
        : '<p class="mute">No public repositories yet. <a href="https://github.com/' + USER + '" target="_blank" rel="noopener">View my GitHub</a>.</p>';
    })
    .catch(function (e) { fail(e && e.message ? e.message : "network error"); });
})();
