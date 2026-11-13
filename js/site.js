(function(){
  var root=document.documentElement,btn=document.querySelector(".lamp");
  function dark(){return root.dataset.theme?root.dataset.theme==="dark":matchMedia("(prefers-color-scheme:dark)").matches}
  function label(){if(btn)btn.setAttribute("title",dark()?"Turn the lamp off (light mode)":"Turn the lamp on (dark mode)")}
  label();
  if(btn)btn.addEventListener("click",function(){var n=dark()?"light":"dark";root.dataset.theme=n;try{localStorage.setItem("theme",n)}catch(e){}label()});
  document.addEventListener("click",function(e){var b=e.target.closest("[data-copy]");if(!b)return;
    var t=b.getAttribute("data-copy"),o=b.getAttribute("data-label")||b.textContent;b.setAttribute("data-label",o);
    var done=function(){b.textContent="Copied!";setTimeout(function(){b.textContent=o},1600)};
    if(navigator.clipboard)navigator.clipboard.writeText(t).then(done,function(){});else done()});
})();
/* YouTube embeds need the page to send a Referer (otherwise: Error 153).
   - Served over http(s): tell the player which page it is on.
   - Opened as a local file (file://): browsers send no Referer, so show a clickable thumbnail instead. */
(function(){
  var frames=document.querySelectorAll('iframe[src*="youtube.com/embed/"]');
  Array.prototype.forEach.call(frames,function(f){
    var m=f.src.match(/embed\/([\w-]+)/); if(!m)return;
    if(location.protocol==="file:"){
      var a=document.createElement("a");a.className="ytfallback";a.target="_blank";a.rel="noopener";
      a.href="https://www.youtube.com/watch?v="+m[1];
      a.innerHTML='<img src="https://img.youtube.com/vi/'+m[1]+'/hqdefault.jpg" alt=""><span>▶ Watch on YouTube<small>Embedded videos only play when the site is served from a web address (see README)</small></span>';
      f.replaceWith(a);
    }else if(/^https?:$/.test(location.protocol)){
      var u=new URL(f.src);u.searchParams.set("origin",location.origin);u.searchParams.set("widget_referrer",location.href);
      if(u.href!==f.src)f.src=u.href;
    }
  });
})();
