function setMood(m){document.querySelectorAll('.bruno').forEach(b=>b.dataset.mood=m)}

/* ---------- events ---------- */
document.addEventListener('click',e=>{const b=e.target.closest('[data-act]');if(!b)return;const f=ACT[b.dataset.act];if(f)f(b,e)});
document.addEventListener('input',e=>{const t=e.target;
  if(t.id==='topic'){const g=$('#gobtn');if(g)g.classList.toggle('on',!!t.value.trim())}
  else if(t.id==='nm'){S.user.name=t.value;const b=$('#nmb');if(b)b.disabled=!t.value.trim()}
  else if(t.id==='tin'){const it=it_();if(it.k==='type')it.val=t.value;else it.txt=t.value;const c=$('#chk');if(c)c.disabled=!ready(it)}
  else if(t.id==='cq'){CARDQ=t.value;ANIM=false;render();const i=$('#cq');if(i){i.focus();i.setSelectionRange(i.value.length,i.value.length)}}});
document.addEventListener('keydown',e=>{if(e.key!=='Enter')return;const id=e.target.id;
  if(id==='topic')submitTopic(e.target.value);
  else if(id==='nm'&&e.target.value.trim())ACT.nameNext();
  else if(id==='cin')ACT.callSend();
  else if(id==='vreq')ACT.visualAsk();
  else if(id==='tin'&&S.sess&&S.screen==='lesson'&&e.target.tagName==='INPUT'){const it=it_();if(ready(it)&&!it.checked)doCheck()}});

/* ---------- boot ---------- */
load();syncOutfit();
if(['lesson','result','building','call','rapidIntro'].includes(S.screen))S.screen=S.started?'home':'splash';
if(S.started&&['splash','name','topic','level','goal','commit'].includes(S.screen))S.screen='home';
render();
