/* Contact form -> Web3Forms (emails the message to Ethan). Works without JS too (plain form post). */
(function(){
  var f=document.getElementById("contact-form");if(!f)return;
  var s=document.getElementById("form-status"),b=f.querySelector("button[type=submit]");
  function say(t,cls){s.textContent=t;s.className="status "+(cls||"")}
  f.addEventListener("submit",function(e){
    e.preventDefault();
    if(f.botcheck&&f.botcheck.checked)return; // bots tick the hidden box
    say("Sending...");b.disabled=true;
    var data={};new FormData(f).forEach(function(v,k){data[k]=v});
    fetch(f.action,{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify(data)})
      .then(function(r){return r.json().then(function(j){return r.ok&&j.success})})
      .then(function(ok){
        if(ok){f.reset();say("Sent! Thanks for the message, I'll get back to you soon.","ok")}
        else throw new Error("failed");
      })
      .catch(function(){say("Couldn't send that. You can email me directly at ethan.william.charette@outlook.com.","err")})
      .then(function(){b.disabled=false});
  });
})();
