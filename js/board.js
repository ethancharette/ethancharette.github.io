(function(){
  var el=document.getElementById("board");if(!el)return;
  var posts=(window.POSTS||[]).slice().sort(function(a,b){return a.date<b.date?1:a.date>b.date?-1:0});
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
  function inline(s){return esc(s).replace(/\*\*(.+?)\*\*/g,"<b>$1</b>").replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,'<a href="$2" rel="noopener" target="_blank">$1</a>')}
  function when(d){var x=new Date(d+"T12:00:00");return isNaN(x)?d:x.toLocaleDateString("en-CA",{year:"numeric",month:"short",day:"numeric"})}
  if(!posts.length){el.innerHTML='<p class="mute">Nothing pinned up yet. Check back soon!</p>';return}
  el.innerHTML=posts.map(function(p){
    var paras=String(p.text||"").split(/\n\s*\n/).map(function(t){return"<p>"+inline(t)+"</p>"}).join("");
    var img=p.image?'<img alt="'+esc(p.alt||"")+'" loading="lazy" src="'+esc(p.image)+'"/>':"";
    var tag=p.tag?'<span class="ptag">'+esc(p.tag)+'</span>':"";
    return '<article class="post">'+img+'<div class="pmeta"><time datetime="'+esc(p.date)+'">'+esc(when(p.date))+'</time>'+tag+'</div><h2>'+esc(p.title)+'</h2>'+paras+'</article>';
  }).join("");
})();
