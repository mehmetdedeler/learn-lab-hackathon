/* =====================================================================
   LESSON ENGINE: sessions, every exercise type, feedback, finishing
   ===================================================================== */
const rr=()=>{ANIM=false;render()};
const rec=(k,ok)=>{const v=S.stats[k]||(S.stats[k]=[0,0]);v[1]++;if(ok)v[0]++};
const KIND_TITLE={mc:'Choose the answer',img:'Select the correct image',fill:'Complete the sentence',match:'Tap the matching pairs',type:'Type the answer',num:'Fill in the number',multi:'Answer all three!',slider:'Answer on the line',build:'Drag in pieces',listen:'Tap what you hear',speak:'Say it out loud',hot:'Tap the part',teach:'Teach Bruno'};

function mkItem(d){
  const it={...d,sel:null,checked:false,ok:false,val:'',txt:'',touched:false,conf:null,skipped:false};
  if(d.k==='mc'||d.k==='listen'||d.k==='img')it.opts=shuf(d.opts);
  if(d.k==='fill')it.bank=shuf(d.bank);
  if(d.k==='match'){it.left=shuf(d.pairs.map(p=>p[0]));it.right=shuf(d.pairs.map(p=>p[1]));it.dn=[];it.pl=null;it.pr=null;it.bad=null}
  if(d.k==='build'){it.tl=shuf(d.tiles).map((t,i)=>({t,i}));it.placed=[]}
  if(d.k==='multi'){it.rows=d.rows.map(r=>({...r,val:'',ok:null}));it.focus=0}
  if(d.k==='slider'){it.val=Math.round(((d.min+d.max)/2)/d.step)*d.step}
  return it}
const cardItem=(cid,card,rate)=>({k:'flash',cid,id:card.id,f:card.f,b:card.b,rate,flipped:false,checked:false});

/* pick items for a lesson: start with recognition, then vary kinds, favour the learner's weakest kind (interleaving + adaptation) */
function chooseItems(c,n){
  const p=shuf(c.pool),rc=p.filter(x=>['mc','img','listen'].includes(x.k)),first=rc[0]||p[0],wk=weakKind();
  const rest=p.filter(x=>x!==first).sort((a,b)=>(b.k===wk)-(a.k===wk)),out=[first],kinds=new Set([first.k]);
  for(const x of rest){if(out.length>=n)break;if(!kinds.has(x.k)){out.push(x);kinds.add(x.k)}}
  for(const x of rest){if(out.length>=n)break;if(!out.includes(x))out.push(x)}
  return out.map(mkItem)}
const learned=()=>C.filter(c=>mastery(c.id)>=1);
function interleave(list){const out=[],pool=[...list];let last=null;while(pool.length){let i=pool.findIndex(x=>x.cid!==last);if(i<0)i=0;const x=pool.splice(i,1)[0];out.push(x);last=x.cid}return out}

function buildSession(mode,arg){
  let items=[];
  if(mode==='diag')items=C.map(c=>mkItem(c.pool[0]));
  else if(mode==='learn'){const c=arg;items=[{k:'explain',cid:c.id},...chooseItems(c,4),cardItem(c.id,c.cards[0])]}
  else if(mode==='revisit'){const c=arg;items=[...chooseItems(c,3),cardItem(c.id,c.cards[1]||c.cards[0])]}
  else if(mode==='review'){let cs=dueCards();if(!cs.length)cs=Object.keys(S.srs).map(cardById).sort((a,b)=>retr(S.srs[a.id])-retr(S.srs[b.id])).slice(0,5);
    items=interleave(cs.slice(0,8).map(x=>cardItem(x.cid,x,true)))}
  else if(mode==='mistakes'){items=S.mistakes.slice(-6).map(id=>{const d=C.flatMap(c=>c.pool).find(p=>p.id===id);return d&&mkItem(d)}).filter(Boolean)}
  else if(mode==='mixed'){const pool=learned().flatMap(c=>shuf(c.pool).slice(0,2));items=interleave(shuf(pool).slice(0,6).map(mkItem))}
  else if(mode==='rapid'){const pool=learned().flatMap(c=>c.pool.filter(p=>p.k==='mc'||p.k==='img'));items=interleave(shuf(pool).concat(shuf(pool)).slice(0,30).map(mkItem))}
  else if(mode==='teach'){const pool=C.flatMap(c=>c.pool.filter(p=>p.k==='teach')).filter(p=>mastery(p.cid)>=1||true);items=shuf(pool).slice(0,2).map(mkItem)}
  return{mode,cid:arg&&arg.id,items,i:0,miss:0,ok:0,combo:0,best:0,start:Date.now(),before:cov(),wrong:new Set(),timed:arg==='timed',left:60,score:0}}
function startSess(mode,arg){
  const s=buildSession(mode,arg);
  if(!s.items.length){toast('Nothing to practise yet. Learn a marker first.');return}
  S.sess=s;go('lesson');if(mode==='rapid'&&s.timed)startTimer()}
const it_=()=>S.sess.items[S.sess.i];
let TICK=null;
function startTimer(){clearInterval(TICK);TICK=setInterval(()=>{const s=S.sess;if(!s||S.screen!=='lesson'){clearInterval(TICK);return}s.left--;const e=$('#clock');if(e)e.textContent=fmtT(s.left);if(s.left<=0){clearInterval(TICK);finish()}},1000)}
const fmtT=n=>Math.floor(n/60)+':'+String(n%60).padStart(2,'0');

/* ---------- evaluating answers ---------- */
function answerText(it){switch(it.k){
  case 'type':return it.answers[0];case 'num':return String(it.a);
  case 'multi':return it.rows.map(r=>r.l+' '+r.a).join(', ');
  case 'slider':return it.a+(it.unit||'');case 'build':return it.seq.join(' ');
  case 'speak':return it.say;case 'teach':return it.model;default:return it.a}}
function evaluate(it){switch(it.k){
  case 'mc':case 'img':case 'listen':{const o=it.opts[it.sel];return (it.k==='img'?o.label:o)===it.a}
  case 'fill':return it.sel===it.a;
  case 'hot':return it.sel===it.a;
  case 'type':{const t=norm(it.val);return it.answers.some(a=>{a=norm(a);return t===a||(a.length>5&&lev(t,a)<=1)})}
  case 'num':return parseFloat(it.val)===it.a;
  case 'multi':{let all=true;it.rows.forEach(r=>{r.ok=parseFloat(r.val)===r.a;if(!r.ok)all=false});return all}
  case 'slider':return Math.abs(it.val-it.a)<=it.tol;
  case 'build':{const cur=it.placed.map(i=>it.tl.find(t=>t.i===i).t);const ok=[it.seq,...(it.alts||[])];return ok.some(s=>s.join('|')===cur.join('|'))}
  case 'speak':{const t=' '+norm(it.txt)+' ';const hit=it.keys.filter(k=>t.includes(norm(k))).length;return hit>=Math.ceil(it.keys.length*.6)}
  case 'teach':{const t=norm(it.txt);const hit=it.keys.filter(g=>g.some(w=>t.includes(w))).length;return hit>=it.need}
}return false}
function ready(it){switch(it.k){
  case 'mc':case 'img':case 'listen':case 'fill':case 'hot':return it.sel!==null;
  case 'type':return it.val.trim().length>0;case 'num':return it.val!=='';
  case 'multi':return it.rows.every(r=>r.val!=='');case 'slider':return it.touched;
  case 'build':return it.placed.length===it.seq.length;
  case 'speak':return it.txt.trim().length>0;case 'teach':return it.txt.trim().length>12;
}return true}

/* ---------- rendering the lesson screen ---------- */
const speakBlock=(text,mood='idle')=>`<div class="speak">${bruno(mood)}<div class="bubble">${text}</div></div>`;
const iconBtn=(act,svg,extra='')=>`<button class="bigbtn" data-act="${act}" ${extra} aria-label="Play">${svg}</button>`;
const speakerSvg='<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z" fill="#fff"/><path d="M16 8.500a5 5 0 0 1 0 7M18.500 6a8.500 8.500 0 0 1 0 12" fill="none" stroke="#fff" stroke-width="2.200" stroke-linecap="round"/></svg>';
const micSvg='<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" fill="#fff"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3" fill="none" stroke="#fff" stroke-width="2.400" stroke-linecap="round"/></svg>';
const sureRow=it=>`<div class="sure"><span>How sure?</span>${[['guess','Guess'],['pretty','Pretty sure'],['certain','Certain']].map(([k,l])=>`<button class="sc ${it.conf===k?'on':''}" data-act="conf" data-v="${k}">${l}</button>`).join('')}</div>`;

function bodyFor(it,s){
  const lab=it.checked,mood=lab?(it.ok?'happy':'sad'):(s.mode==='rapid'?'idle':'idle');
  switch(it.k){
  case 'explain':{const c=C.find(x=>x.id===it.cid);
    return `<div class="explain">${speakBlock(`Let's do <b>${c.name}</b>.`,'idle')}<div class="art">${artFor(c)}</div><h2>${c.name}</h2><div class="ebody">${c.body}</div><button class="listenbtn" data-act="sayExplain">${speakerSvg.replace(/#fff/g,'#1899D6')} Hear Bruno say it</button></div>`}
  case 'mc':return `${speakBlock(it.q,mood)}<div class="opts">${it.opts.map((o,i)=>{let c=it.sel===i?'sel':'';if(lab){c=o===it.a?'right':it.sel===i?'wrong':''}return `<button class="opt ${c}" data-act="sel" data-i="${i}" ${lab?'disabled':''}><span class="k">${i+1}</span>${o}</button>`}).join('')}</div>${s.mode==='diag'&&!lab?`<button class="skip" data-act="dk">I haven't learned this yet</button>`:''}`;
  case 'img':return `<div class="qtitle">${KIND_TITLE.img}</div>${speakBlock(it.q,mood)}<div class="imggrid">${it.opts.map((o,i)=>{let c=it.sel===i?'sel':'';if(lab){c=o.label===it.a?'right':it.sel===i?'wrong':''}return `<button class="imgopt ${c}" data-act="sel" data-i="${i}" ${lab?'disabled':''}><div class="pic">${OPT[o.art]}</div><b>${o.label}</b></button>`}).join('')}</div>`;
  case 'listen':return `<div class="qtitle">${KIND_TITLE.listen}</div><div class="listenwrap">${iconBtn('hear',speakerSvg)}<div class="hear">${s.mode==='diag'?'':''}Tap to listen</div></div><div class="opts">${it.opts.map((o,i)=>{let c=it.sel===i?'sel':'';if(lab){c=o===it.a?'right':it.sel===i?'wrong':''}return `<button class="opt ${c}" data-act="sel" data-i="${i}" ${lab?'disabled':''}>${o}</button>`}).join('')}</div>`;
  case 'fill':{const parts=it.s.split('___');return `<div class="qtitle">${KIND_TITLE.fill}</div>${speakBlock('Fill in the blank',mood)}<div class="sentence">${parts[0]}<span class="blank ${it.sel?'':'empty'}" data-act="unfill" ${lab?`style="background:${it.ok?'var(--green-t)':'var(--red-t)'};border-color:${it.ok?'var(--green)':'var(--red)'};color:${it.ok?'var(--green-text)':'var(--red-text)'}"`:''}>${it.sel||''}</span>${parts[1]}</div><div class="bank">${it.bank.map(w=>`<button class="tile ${it.sel===w?'used':''}" data-act="sel" data-w="${w}" ${lab?'disabled':''}>${w}</button>`).join('')}</div>`}
  case 'match':return `<div class="qtitle">${KIND_TITLE.match}</div><div class="mcols"><div>${it.left.map((l,i)=>`<button class="mt ${it.dn.includes(l)?'done':''} ${it.pl===i?'sel':''} ${it.bad&&it.bad.l===i?'bad':''}" data-act="mL" data-i="${i}">${l}</button>`).join('')}</div><div>${it.right.map((r,i)=>`<button class="mt ${it.dn.some(l=>it.pairs.find(p=>p[0]===l)[1]===r)?'done':''} ${it.pr===i?'sel':''} ${it.bad&&it.bad.r===i?'bad':''}" data-act="mR" data-i="${i}">${r}</button>`).join('')}</div></div>`;
  case 'type':return `<div class="qtitle">${KIND_TITLE.type}</div>${speakBlock(it.q.replace('___','<span class="gap"></span>'),mood)}<input id="tin" class="tinput ${lab?(it.ok?'ok':'no'):''}" placeholder="Type your answer" value="${esc(it.val)}" autocomplete="off" autocapitalize="off" ${lab?'disabled':''}>`;
  case 'num':return `<div class="qtitle">${KIND_TITLE.num}</div><div class="eq">${it.q.split('___')[0]}<span class="abox ${lab?(it.ok?'ok':'no'):'foc'}">${it.val}</span>${it.q.split('___')[1]||''}</div>`;
  case 'multi':return `<div class="qtitle">${KIND_TITLE.multi}</div><div class="subq">${it.q}</div><div class="eqs">${it.rows.map((r,i)=>`<div class="eqrow"><span>${r.l} =</span><span class="abox ${lab?(r.ok?'ok':'no'):(it.focus===i?'foc':'')}" data-act="focusRow" data-i="${i}">${r.val}</span></div>`).join('')}</div>`;
  case 'slider':{const pct=(it.val-it.min)/(it.max-it.min)*100;return `<div class="qtitle">${KIND_TITLE.slider}</div><div class="subq">${it.q}</div><div class="bigval ${lab?(it.ok?'ok':'no'):''}">${it.val}<small>${it.unit||''}</small></div><div class="track ${it.spectrum?'spec':''}" id="track"><div class="fillbar" style="width:${pct}%"></div><div class="marker" id="marker" style="left:${pct}%"></div></div><div class="ticks">${it.ticks.map(t=>`<span>${t}</span>`).join('')}</div>`}
  case 'build':return `<div class="qtitle">${it.q}</div><div class="slots ${lab?(it.ok?'ok':'no'):''}">${it.seq.map((_,i)=>{const ti=it.placed[i];return ti===undefined?'<div class="slot0"></div>':`<button class="btile placed" data-act="unplace" data-i="${i}" ${lab?'disabled':''}>${it.tl.find(t=>t.i===ti).t}</button>`}).join('')}</div><div class="bank">${it.tl.map(t=>it.placed.includes(t.i)?'<div class="btile ghost">&nbsp;</div>':`<button class="btile" data-act="place" data-i="${t.i}" ${lab?'disabled':''}>${t.t}</button>`).join('')}</div>`;
  case 'speak':return `<div class="qtitle">${KIND_TITLE.speak}</div>${speakBlock(`<b>${it.say}</b>`,mood)}<div class="listenwrap">${iconBtn('mic',micSvg)}<div class="hear">${it.txt?'':'Tap to speak'}</div></div>${it.txt?`<div class="heard">“${esc(it.txt)}”</div>`:''}<input id="tin" class="tinput" placeholder="Or type it here" value="${esc(it.txt)}" autocomplete="off" ${lab?'disabled':''}><button class="skip" data-act="skipItem">Can't speak now</button>`;
  case 'hot':return `<div class="qtitle">${it.q}</div><div class="art" style="background:#fff">${cellArt(it.sel,lab)}</div><div class="subq" style="text-align:center">${it.sel?`<b>${it.sel}</b>`:'Tap a part of the cell'}</div>`;
  case 'teach':return `<div class="qtitle">${KIND_TITLE.teach}</div>${speakBlock(it.q,lab?(it.ok?'happy':'think'):'think')}<textarea id="tin" class="tinput area ${lab?(it.ok?'ok':'no'):''}" placeholder="Explain it in your own words…" ${lab?'disabled':''}>${esc(it.txt)}</textarea>`;
  case 'flash':return `<div class="qtitle" style="margin-bottom:6px">${it.rate?'Do you remember?':'Lock it in'}</div><div class="fscene"><div class="fcard ${it.flipped?'flipped':''}" id="fc" data-act="flip"><div class="face"><div class="kicker" style="position:absolute;top:16px">Term</div><div class="big">${it.f}</div><div class="hint">Tap to flip</div></div><div class="face back"><div class="kicker" style="position:absolute;top:16px;color:var(--sky-b)">Answer</div><div class="big" style="font-size:23px">${it.b}</div></div></div></div>`;
  }return ''}

const keypad=()=>`<div class="keypad">${['1','2','3','4','5','6','7','8','9','','0','del'].map(k=>k===''?'<span></span>':`<button class="key" data-act="key" data-v="${k}">${k==='del'?'<svg viewBox="0 0 24 24"><path d="M9 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-6-7z" fill="none" stroke="#777" stroke-width="2" stroke-linejoin="round"/><path d="M12 9l5 6M17 9l-5 6" stroke="#777" stroke-width="2" stroke-linecap="round"/></svg>':k}</button>`).join('')}</div>`;
const SELKINDS=['mc','img','listen','fill'];
function footFor(it,s){
  if(it.k==='explain')return `<div class="foot"><button class="btn" data-act="cont">Got it</button></div>`;
  if(it.k==='flash')return flashFoot(it,s);
  if(it.checked){
    const good=['Nice!','Awesome!','Great job!','Spot on!','Perfect!'][s.i%5],run=s.combo>=3?`<div class="run">${s.combo} IN A ROW</div>`:'';
    const sub=it.ok?'':(it.k==='match'?'':`<small>${it.k==='teach'?'Try: '+esc(answerText(it)):'Correct answer: '+esc(answerText(it))}</small>`);
    const sure=(!it.ok&&it.conf==='certain')?`<small>You were certain, so this one is worth locking in.</small>`:'';
    return `<div class="foot fb ${it.ok?'ok':'bad'}">${run}<div class="fbrow"><div class="fbico">${it.ok?tick:cross}</div><div><b>${it.ok?good:'Not quite'}</b>${sub}${sure}</div><button class="expl" data-act="explain" aria-label="Explain">${it.ok?'EXPLAIN MY ANSWER':'EXPLAIN MY MISTAKE'}</button></div><button class="btn ${it.ok?'green':'red'}" data-act="cont">${it.ok?'Continue':'Got it'}</button></div>`}
  if(it.k==='match')return `<div class="foot"><button class="btn" disabled>Check</button></div>`;
  const chk=`<button class="btn" id="chk" data-act="check" ${ready(it)?'':'disabled'}>Check</button>`;
  if(it.k==='num')return `<div class="foot tight">${chk}</div>${keypad()}`;
  if(it.k==='multi')return `<div class="foot tight">${chk}</div>${keypad()}`;
  return `<div class="foot">${SELKINDS.includes(it.k)&&S.started?sureRow(it):''}${chk}</div>`}
function flashFoot(it,s){
  if(!it.flipped)return `<div class="foot"><button class="btn" data-act="flipbtn">Show answer</button></div>`;
  if(it.rate){const c=S.srs[it.id];return `<div class="foot"><div class="row"><button class="btn warn" data-act="rate" data-r="0" style="padding:12px 4px">Again<div class="sub">${nextInterval(c,0)} day</div></button><button class="btn" data-act="rate" data-r="1" style="padding:12px 4px">Good<div class="sub">${nextInterval(c,1)} ${nextInterval(c,1)===1?"day":"days"}</div></button><button class="btn green" data-act="rate" data-r="2" style="padding:12px 4px">Easy<div class="sub">${nextInterval(c,2)} ${nextInterval(c,2)===1?"day":"days"}</div></button></div></div>`}
  return `<div class="foot"><div class="row"><button class="btn warn" data-act="rate" data-r="0">Still fuzzy</button><button class="btn green" data-act="rate" data-r="2">Got it</button></div></div>`}

VIEWS.lesson=function(){
  const s=S.sess,it=it_(),pct=Math.min(100,Math.round(s.i/s.items.length*100)),hot=s.combo>=3;
  const right=s.mode==='rapid'&&s.timed?`<span class="chip clock" id="clock">${fmtT(s.left)}</span>`:`<span class="chip xp">${bolt}${S.xp}</span>`;
  return `<div class="screen enter">${status()}<div class="topbar"><button class="x" data-act="quit" aria-label="Close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"><path d="M5 5l14 14M19 5L5 19"/></svg></button><div class="prog ${hot?'hot':''}"><i style="width:${pct}%"></i></div>${right}</div>
  ${s.combo>=2?`<div class="combo ${hot?'hot':''}">COMBO x${s.combo}</div>`:'<div class="combo none"></div>'}
  <div class="body" id="lbody">${bodyFor(it,s)}</div><div id="foot">${footFor(it,s)}</div></div>`}

/* ---------- interactions ---------- */
function selectOpt(it,idx,s){it.sel=idx;
  if(s.mode==='rapid'){doCheck();return}
  SFX.tap();$$('.opt,.imgopt').forEach((o,i)=>o.classList.toggle('sel',i===it.sel));const c=$('#chk');if(c)c.disabled=false}
function doCheck(){
  const s=S.sess,it=it_();if(!it||it.checked||!ready(it))return;
  it.checked=true;it.ok=evaluate(it);rec(it.k,it.ok);
  if(it.conf){const g=S.conf[it.conf==='certain'?'sure':'unsure'];g[1]++;if(it.ok)g[0]++}
  if(it.ok){s.ok++;s.combo++;s.best=Math.max(s.best,s.combo);S.quests.bestCombo=Math.max(S.quests.bestCombo,s.combo);SFX.ok();buzz(20);if(s.mode==='rapid')s.score++}
  else{s.miss++;s.combo=0;s.wrong.add(it.cid);SFX.bad();buzz([40,40,40]);
    if(s.mode!=='diag'&&s.mode!=='rapid'&&it.id){S.mistakes=S.mistakes.filter(x=>x!==it.id);S.mistakes.push(it.id);S.mistakes=S.mistakes.slice(-12)}
    if(s.mode!=='diag'&&s.mode!=='rapid'&&!it.rq&&it.id){const d=C.flatMap(c=>c.pool).find(p=>p.id===it.id);if(d){const n=mkItem(d);n.rq=true;s.items.push(n)}}}
  if(s.mode==='rapid'){rr();const sx=s;setTimeout(()=>{if(S.sess===sx&&S.screen==='lesson'&&sx.items[sx.i]===it)advance()},420);return}
  rr()}
function advance(){const s=S.sess;if(!s)return;s.i++;if(s.i>=s.items.length)finish();else{ANIM=false;render()}}

ACT.sel=el=>{const it=it_();if(it.checked)return;
  if(it.k==='fill'){it.sel=el.dataset.w;SFX.tap();rr();return}selectOpt(it,+el.dataset.i,S.sess)};
ACT.unfill=()=>{const it=it_();if(it.k==='fill'&&!it.checked&&it.sel){it.sel=null;rr()}};
ACT.conf=el=>{const it=it_();it.conf=it.conf===el.dataset.v?null:el.dataset.v;$$('.sc').forEach(b=>b.classList.toggle('on',b.dataset.v===it.conf))};
ACT.check=()=>doCheck();
ACT.cont=()=>{if(it_().k==='explain')hush();advance()};
ACT.dk=()=>{const s=S.sess,it=it_();it.checked=true;it.ok=false;s.wrong.add(it.cid);rec(it.k,false);s.miss++;advance()};
ACT.skipItem=()=>{const it=it_();it.skipped=true;toast('Skipped. No penalty.');advance()};
ACT.hear=()=>{const it=it_();say(it.say,{force:true});SFX.tap()};
ACT.sayExplain=()=>{const it=it_(),c=C.find(x=>x.id===it.cid);say(c.name+'. '+c.body,{force:true})};
ACT.mic=()=>{const it=it_();toast('Listening…');setMood('listen');
  listenOnce(t=>{it.txt=t;setMood('idle');rr()},()=>{setMood('idle');toast('Mic unavailable. Type it instead.');const i=$('#tin');i&&i.focus()})};
ACT.hot=el=>{const it=it_();if(it.checked)return;it.sel=el.dataset.spot;SFX.tap();rr()};
ACT.key=el=>{const it=it_();if(it.checked)return;const v=el.dataset.v;SFX.tap();
  const tgt=it.k==='multi'?it.rows[it.focus]:it;let val=tgt.val;
  if(v==='del')val=val.slice(0,-1);else if(val.length<4)val+=v;tgt.val=val;
  if(it.k==='multi'&&v!=='del'&&val.length>=String(tgt.a).length&&it.focus<it.rows.length-1)it.focus++;
  rr()};
ACT.focusRow=el=>{const it=it_();if(!it.checked){it.focus=+el.dataset.i;rr()}};
ACT.place=el=>{const it=it_();if(it.checked||it.placed.length>=it.seq.length)return;it.placed.push(+el.dataset.i);SFX.tap();rr()};
ACT.unplace=el=>{const it=it_();if(it.checked)return;it.placed.splice(+el.dataset.i,1);rr()};
ACT.mL=ACT.mR=null;
function matchTap(side,el){const it=it_(),s=S.sess;if(it.checked)return;const i=+el.dataset.i;
  if(side==='L'?it.dn.includes(it.left[i]):it.dn.some(l=>it.pairs.find(p=>p[0]===l)[1]===it.right[i]))return;
  if(side==='L')it.pl=it.pl===i?null:i;else it.pr=it.pr===i?null:i;SFX.tap();
  if(it.pl!==null&&it.pr!==null){const l=it.left[it.pl],r=it.right[it.pr],good=it.pairs.some(p=>p[0]===l&&p[1]===r);rec('match',good);
    if(good){it.dn.push(l);it.pl=it.pr=null;SFX.ok();if(it.dn.length===it.pairs.length){it.checked=true;it.ok=true;s.ok++;s.combo++;s.best=Math.max(s.best,s.combo);S.quests.bestCombo=Math.max(S.quests.bestCombo,s.combo)}}
    else{s.miss++;s.combo=0;s.wrong.add(it.cid);SFX.bad();it.bad={l:it.pl,r:it.pr};it.pl=it.pr=null;rr();setTimeout(()=>{it.bad=null;if(S.sess===s&&it_()===it&&S.screen==='lesson')rr()},420);return}}
  rr()}
ACT.mL=el=>matchTap('L',el);ACT.mR=el=>matchTap('R',el);
ACT.flip=()=>{const it=it_();if(it.flipped)return;it.flipped=true;$('#fc').classList.add('flipped');$('#foot').innerHTML=flashFoot(it,S.sess);SFX.tap()};
ACT.flipbtn=ACT.flip;
ACT.rate=el=>{const s=S.sess,it=it_(),r=+el.dataset.r;it.r=r;rec('flash',r>0);
  if(it.rate){srsReview(it.id,r);S.quests.review++}
  if(r>0){s.ok++;s.combo++;s.best=Math.max(s.best,s.combo);S.quests.bestCombo=Math.max(S.quests.bestCombo,s.combo)}else{s.miss++;s.combo=0;s.wrong.add(it.cid)}
  advance()};
ACT.explain=()=>{const it=it_();openOv('explain',{why:it.why||'',ok:it.ok,model:it.k==='teach'?it.model:''});setTimeout(()=>say((it.ok?'Nice. ':'No worries. ')+(it.why||'')),200)};
ACT.quit=()=>{clearInterval(TICK);hush();S.sess=null;go(S.started?'home':'welcome')};

/* ---------- finishing a session ---------- */
function finish(){
  clearInterval(TICK);const s=S.sess;if(!s||s.fin)return;s.fin=true;const secs=Math.max(1,Math.round((Date.now()-s.start)/1000));
  const acc=s.ok+s.miss?Math.round(s.ok/(s.ok+s.miss)*100):100;let gain=0,streakNew=false;
  s.secs=secs;s.acc=acc;
  if(s.mode==='diag'){C.forEach(c=>{const w=s.wrong.has(c.id);S.mastery[c.id]=w?0:2;S.knew[c.id]=!w;if(!w)enrollCards(c.id)});S.started=true}
  else if(s.mode==='learn'||s.mode==='revisit'){
    S.mastery[s.cid]=Math.max(mastery(s.cid),s.miss===0?2:1);enrollCards(s.cid);gain=addXp(10+s.ok*2+(s.miss===0?5:0));S.doneToday++;streakNew=touchStreak();
    unlock('first');if(s.miss===0)unlock('perfect')}
  else if(s.mode==='review'){s.items.forEach(i=>{if(i.r>=1&&mastery(i.cid)<2)S.mastery[i.cid]=2});gain=addXp(6+s.ok);streakNew=touchStreak()}
  else if(s.mode==='mistakes'||s.mode==='mixed'){if(s.mode==='mistakes')S.mistakes=S.mistakes.filter(id=>!s.items.some(i=>i.id===id&&i.ok));gain=addXp(8+s.ok);streakNew=touchStreak()}
  else if(s.mode==='teach'){gain=addXp(10+s.ok*4);S.quests.teach++;if(s.ok)unlock('teach');streakNew=touchStreak()}
  else if(s.mode==='rapid'){gain=addXp(s.score);S.rapidBest=Math.max(S.rapidBest||0,s.score);if(s.score>=10)unlock('speed');streakNew=touchStreak()}
  s.gain=gain;s.after=cov();s.streakNew=streakNew;checkBadges();SFX.win();
  go('result')}
