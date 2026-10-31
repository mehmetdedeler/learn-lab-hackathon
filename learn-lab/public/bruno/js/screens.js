/* =====================================================================
   SCREENS
   ===================================================================== */
const status=()=>'<div class="status"></div>';
const tick=`<svg viewBox="0 0 24 24" style="width:26px;height:26px;stroke:currentColor;stroke-width:4;fill:none;stroke-linecap:round;stroke-linejoin:round"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg>`;
const cross=`<svg viewBox="0 0 24 24" style="width:24px;height:24px;stroke:currentColor;stroke-width:4;fill:none;stroke-linecap:round"><path d="M6 6l12 12M18 6L6 18"/></svg>`;
const flame=`<svg width="22" height="22" viewBox="0 0 24 24"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-4 2-7 2 1 3 2 3 4 1-3 1-6 1-9z" fill="#FF9600"/><path d="M12 22a3.500 3.500 0 0 1-3.500-3.500c0-2 2-3 3.500-5 1.500 2 3.500 3 3.500 5A3.500 3.500 0 0 1 12 22z" fill="#FFC800"/></svg>`;
const bolt=`<svg width="20" height="20" viewBox="0 0 24 24"><path d="M13 2L4 14h7l-1 8 9-12h-7z" fill="#FFC800" stroke="#D9A500" stroke-width="1.500" stroke-linejoin="round"/></svg>`;
const gemI=`<svg width="22" height="22" viewBox="0 0 24 24"><path d="M6 3h12l4 6-10 12L2 9z" fill="#43C0F6" stroke="#1A9BD7" stroke-width="1.500" stroke-linejoin="round"/><path d="M2 9h20M9 3l-2 6 5 12 5-12-2-6" stroke="#fff" stroke-opacity=".6" stroke-width="1.200" fill="none"/></svg>`;
const bookI=`<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#777" stroke-width="2.600" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM4 19a2 2 0 0 1 2-2h13"/></svg>`;
const noteI=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.400" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h4"/></svg>`;
const chestI=`<svg viewBox="0 0 40 36"><rect x="4" y="12" width="32" height="20" rx="4" fill="#D98A2B"/><path d="M4 16a8 8 0 0 1 8-8h16a8 8 0 0 1 8 8z" fill="#F2A93B"/><rect x="17" y="14" width="6" height="8" rx="2" fill="#FFE08A"/><path d="M4 22h32" stroke="#B8701C" stroke-width="2"/></svg>`;
const trophyI=`<svg viewBox="0 0 40 40"><path d="M12 6h16v10a8 8 0 0 1-16 0z" fill="currentColor"/><path d="M12 9H6a4 4 0 0 0 5 6M28 9h6a4 4 0 0 1-5 6" fill="none" stroke="currentColor" stroke-width="3"/><rect x="17" y="24" width="6" height="6" fill="currentColor"/><rect x="12" y="30" width="16" height="4" rx="2" fill="currentColor"/></svg>`;
const backI=`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.200" stroke-linecap="round" stroke-linejoin="round" width="26" height="26"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>`;
const nodeIco=(k,extra='')=>`<svg viewBox="0 0 24 24" ${extra}>${{sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',cell:'<rect x="3" y="6" width="18" height="12" rx="6"/><circle cx="9" cy="12" r="1.600" fill="#fff"/><circle cx="15" cy="12" r="1.600" fill="#fff"/>',leaf:'<path d="M5 19C5 10 10 5 20 4c0 10-5 15-14 15zM5 19l8-8"/>',drop:'<path d="M12 3s6 6.500 6 11a6 6 0 0 1-12 0c0-4.500 6-11 6-11z"/>',cube:'<path d="M12 3l8 4.500v9L12 21l-8-4.500v-9zM4 7.500l8 4.500 8-4.500M12 12v9"/>',cycle:'<path d="M20 12a8 8 0 0 1-14 5M4 12a8 8 0 0 1 14-5M18 3v4h-4M6 21v-4h4"/>',play:'<path d="M8 5l11 7-11 7z"/>'}[k]}</svg>`;
const hdr=(title,act='back',right='')=>`<div class="shead"><button class="x" data-act="${act}" aria-label="Back">${backI}</button><div class="stitle">${title}</div><div class="sright">${right}</div></div>`;
const hud=()=>`<div class="hhead"><div class="l">${bookI}${esc(S.topic)}</div><div class="r"><span class="chip fire" data-act="goStreak">${flame}${S.streak}</span><span class="chip gem" data-act="goShop">${gemI}${S.gems}</span></div></div>`;
const tabsBar=()=>{const t=(k,svg)=>`<button class="tab ${S.tab===k&&S.screen==='home'&&!S.overlay?'on':''}" data-act="tab" data-t="${k}" aria-label="${k}">${svg}</button>`;
  return `<div class="tabs">${t('learn','<svg viewBox="0 0 24 24"><path d="M4 11l8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1z"/></svg>')}${t('practice','<svg viewBox="0 0 24 24"><rect x="3" y="8" width="14" height="12" rx="3"/><path d="M8 4.500h10a3 3 0 0 1 3 3V16"/></svg>')}
  <button class="tab bru" data-act="ask" aria-label="Ask Bruno"><svg viewBox="0 0 24 24"><circle cx="5.500" cy="6" r="3"/><circle cx="18.500" cy="6" r="3"/><circle cx="12" cy="13" r="8.500"/><circle cx="9" cy="12" r="1.300" fill="#fff"/><circle cx="15" cy="12" r="1.300" fill="#fff"/><ellipse cx="12" cy="15.500" rx="2" ry="1.400" fill="#fff"/></svg></button>
  ${t('quests','<svg viewBox="0 0 24 24"><path d="M12 3l7 3v5c0 5-3 8.500-7 10-4-1.500-7-5-7-10V6z"/><path d="M9 12l2 2 4-4"/></svg>')}${t('me','<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>')}</div>`};
const goalXp=()=>({5:20,10:40,15:60,20:80}[S.user.goal]||40);
/* safe hooks into the other modules (analytics, reduced motion, clipboard) */
const trk=(n,p)=>{try{if(typeof track==='function')track(n,p||{})}catch(e){}};
const calm=()=>{try{return !!S.settings.calm||!!(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)}catch(e){return false}};
const handle=()=>(S.user.name||'learner').toLowerCase().replace(/[^a-z0-9]+/g,'')||'learner';
function inviteLink(){let base='https://bruno.app/';try{if(/^https?:$/.test(location.protocol))base=location.origin+location.pathname.replace(/index\.html$/,'')}catch(e){}return base+'?invite='+encodeURIComponent(handle())}
function copyText(t){
  const legacy=()=>{try{const a=document.createElement('textarea');a.value=t;a.setAttribute('readonly','');a.style.cssText='position:fixed;opacity:0;top:0;left:0';document.body.appendChild(a);a.select();const ok=document.execCommand&&document.execCommand('copy');a.remove();return !!ok}catch(e){return false}};
  try{if(navigator.clipboard&&navigator.clipboard.writeText)return navigator.clipboard.writeText(t).then(()=>true,()=>legacy())}catch(e){}
  return Promise.resolve(legacy())}

/* ---------------- onboarding ---------------- */
VIEWS.splash=()=>`<div class="screen center enter splash">${status()}<div class="spl-in"><div class="floaty a"></div><div class="floaty b"></div><div class="floaty c"></div>
  <div class="halo">${bruno('cheer')}</div><div class="logo">bruno</div><p>Learn anything. Know exactly when you're done.</p></div>
  <div class="spl-foot"><button class="btn ghost" data-act="start">Get started</button><button class="btn" data-act="signin" style="background:rgba(255,255,255,.18);box-shadow:0 4px 0 rgba(0,0,0,.15)">I already have an account</button></div></div>`;
ACT.start=()=>{go('topic')};
ACT.signin=()=>{if(S.started)go('home');else toast('Demo: sign-in comes with the backend')};

const stepTop=(pct,back)=>`<div class="topbar"><button class="x" data-act="${back}" aria-label="Back">${backI}</button><div class="prog"><i style="width:${pct}%"></i></div><span style="width:26px"></span></div>`;
VIEWS.name=()=>`<div class="screen enter">${status()}${stepTop(75,'noop')}<div class="onb"><div class="speak">${bruno('happy')}<div class="bubble">That's your map ready! Before we start, what should I call you?</div></div>
  <input id="nm" class="tinput big" placeholder="Your name" value="${esc(S.user.name)}" autocomplete="off"></div><div class="foot"><button class="btn" id="nmb" data-act="nameNext" ${S.user.name.trim()?'':'disabled'}>Next</button></div></div>`;
ACT.toSplash=()=>go('splash');
ACT.noop=()=>{};
ACT.nameNext=()=>{S.user.name=($('#nm').value||'').trim();go('goal')};

const hasTopics=()=>typeof TOPICS!=='undefined'&&Array.isArray(TOPICS)&&TOPICS.length>0;
function topicChips(){
  if(hasTopics())return TOPICS.slice(0,6).map(t=>`<button class="pill live" data-act="chip" data-t="${esc(t.name)}" title="${esc(t.blurb||'')}">${t.emoji?`<span class="em">${esc(t.emoji)}</span>`:''}${esc(t.name)}</button>`).join('');
  return `<button class="pill live" data-act="chip" data-t="Photosynthesis">Photosynthesis</button><button class="pill" data-act="chip" data-t="Derivatives">Derivatives<small>soon</small></button><button class="pill" data-act="chip" data-t="French basics">French basics<small>soon</small></button><button class="pill" data-act="chip" data-t="Roman Empire">Roman Empire<small>soon</small></button>`}
function composer(){return `<div class="composer" id="comp"><input id="topic" placeholder="I want to learn…" autocomplete="off" enterkeyhint="go">
  <button class="cbtn go" id="gobtn" data-act="go" aria-label="Go"><svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg></button>
  <button class="cbtn mic" data-act="micTopic" aria-label="Speak"><svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></button>
  <div class="listen"><div class="wave"><i></i><i></i><i></i><i></i><i></i></div>Listening…</div></div>
  <div class="chips">${topicChips()}</div>
  <div class="hint" id="hint">${esc(S.hint||'')}</div>`}
VIEWS.topic=()=>`<div class="screen enter">${status()}${stepTop(25,'toSplash')}<div class="onb"><div class="speak">${bruno('idle')}<div class="bubble">Hi, I'm Bruno! What do you want to learn?</div></div>${composer()}</div></div>`;
ACT.toName=()=>go('name');
function findTopic(t){if(!hasTopics())return null;const q=norm(t);if(!q)return null;
  return TOPICS.find(x=>norm(x.name)===q||norm(x.id)===q)||TOPICS.find(x=>q.length>=3&&(norm(x.name).includes(q)||q.includes(norm(x.id))||q.includes(norm(x.name))))||null}
function submitTopic(t){t=(t||'').trim();if(!t)return;
  const m=findTopic(t),legacy=/photo|plant|leaf|chloro/i.test(t);
  if(m||legacy){   // a topic Bruno already has: the design's own behaviour
    S.pendingTopic='';
    if(S.started){
      if(m&&m.name!==S.topic&&typeof useTopic==='function'){useTopic(m.id);S.vis=null;S.visSeen=false;trk('topic_switch',{id:m.id});closeOv();go('home',{tab:'learn'});toast('Switched to '+S.topic);startVisual();return}
      closeOv();go('home',{tab:'learn'});toast("We're already on "+S.topic+"!");return}
    if(m&&typeof useTopic==='function')useTopic(m.id);
    trk('topic_pick',{topic:S.topic,typed:t.slice(0,40),matched:true});
    S.overlay=null;S.hint='';S.vis=null;S.visSeen=false;go('level');return}
  // Learn Lab: any other topic is built by Claude on the "Give me a sec" screen
  S.pendingTopic=t.slice(0,120);S.topic=S.pendingTopic;S.vis=null;S.visSeen=false;S.buildErr='';S.overlay=null;S.hint='';
  trk('topic_pick',{topic:S.topic,typed:t.slice(0,40),matched:false,generated:true});
  go(S.started?'building':'level')}
ACT.go=()=>submitTopic($('#topic').value);
ACT.chip=el=>{const t=el.dataset.t;$('#topic').value=t;submitTopic(t)};
ACT.micTopic=()=>{const comp=$('#comp');comp.classList.add('live');setMood('listen');
  const fin=txt=>{comp.classList.remove('live');const ti=$('#topic');if(!ti||!document.body.contains(comp))return;ti.value=txt;setMood('idle');submitTopic(txt)};
  let fell=false;const sim=()=>{if(fell)return;fell=true;setTimeout(()=>fin('Photosynthesis'),1600)};
  const r=listenOnce(t=>{fell=true;fin(t)},sim);if(!r)sim()};

const optList=(rows,act,sel)=>`<div class="opts">${rows.map(([k,t,s])=>`<button class="opt choice ${sel===k?'sel':''}" data-act="${act}" data-v="${k}"><span class="ct"><b>${t}</b>${s?`<small>${s}</small>`:''}</span></button>`).join('')}</div>`;
VIEWS.level=()=>`<div class="screen enter">${status()}${stepTop(50,'toTopic')}<div class="onb"><div class="speak">${bruno('think')}<div class="bubble">How much do you already know about ${esc(S.topic)}?</div></div>${optList(LEVELS,'pickLevel',S.user.level)}</div></div>`;
ACT.toTopic=()=>go('topic');
ACT.pickLevel=el=>{S.user.level=el.dataset.v;go('building')};
VIEWS.goal=()=>`<div class="screen enter">${status()}${stepTop(88,'toName')}<div class="onb"><div class="speak">${bruno('idle')}<div class="bubble">What's your daily learning goal?</div></div>${optList(GOALS.map(([m,n,s])=>[m,n,s]),'pickGoal',S.user.goal)}</div></div>`;
ACT.toLevel=()=>go('level');
ACT.pickGoal=el=>{S.user.goal=+el.dataset.v;go('commit')};
VIEWS.commit=()=>`<div class="screen enter">${status()}${stepTop(100,'toGoal')}<div class="onb"><div class="speak">${bruno('happy')}<div class="bubble">You'll be <b style="color:var(--orange)">5x more likely</b> to finish if you commit to a streak!</div></div>
  <div class="opts">${[[3,'3 days','Earn 30 gems'],[5,'5 days','Earn 500 gems'],[7,'7 days','Earn 700 gems']].map(([d,t,s])=>`<button class="opt choice ${S.user.commit===d?'sel':''}" data-act="pickCommit" data-v="${d}"><span class="ct row2"><b>${t}</b><small>${s}</small></span></button>`).join('')}</div></div><div class="foot"><button class="btn" data-act="commitGo">Commit to my goal</button></div></div>`;
ACT.toGoal=()=>go('goal');
ACT.pickCommit=el=>{S.user.commit=+el.dataset.v;rr()};
ACT.commitGo=()=>openOv('notif');
OVERLAYS.notif=()=>`<div class="scrim center2"><div class="alert"><h4>"Bruno" Would Like to Send You Notifications</h4><p>Notifications may include reminders and streak alerts. You can change this in Settings.</p><div class="al"><button data-act="notifNo">Don't Allow</button><button data-act="notifYes" class="b">Allow</button></div></div></div>`;
ACT.notifNo=()=>{S.user.notif=false;S.settings.reminders=false;S.overlay=null;finishSetup()};
ACT.notifYes=()=>{S.user.notif=true;S.settings.reminders=true;S.overlay=null;finishSetup();if(notifSupported()&&Notification.permission==='default')enableReminders().catch(()=>{})};

VIEWS.building=()=>{if(S.buildErr)return `<div class="screen center enter" style="padding:0 24px 26px">${status()}<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%"><div style="width:170px;height:180px">${bruno('sad')}</div><div class="title" style="margin-top:14px">Hmm, that didn't work</div><p class="rsub" style="text-align:center">${esc(S.buildErr)}</p></div><button class="btn" data-act="retryBuild">Try again</button><button class="btn ghost" data-act="toTopic" style="margin-top:10px">Pick another topic</button></div>`;
  const st=['Mapping everything in '+S.topic,'Finding the best way to teach you','Building your path'];
  return `<div class="screen center enter" style="padding:0 28px">${status()}<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%">
  <div style="width:180px;height:190px">${bruno('think')}</div><div class="title" style="margin-top:14px">Give me a sec…</div>
  <div class="steps">${st.map((t,i)=>`<div class="stp" id="st${i}"><div class="d"><svg viewBox="0 0 24 24"><path d="M5 12.500l4.500 4.500L19 7.500"/></svg></div>${t}</div>`).join('')}</div><div class="loadnote">Synthesizing knowledge. Yum!</div></div></div>`};
const apiBase=()=>(window.BRUNO_CONFIG||{}).apiBase||'/api/bruno';
const post=(url,body)=>fetch(url,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}).then(r=>r.json()).then(j=>{if(j.error)throw new Error(j.error);return j});
let BUILDING=false;
function runBuild(){if(BUILDING||S.buildErr)return;
  const on=i=>{const e=$('#st'+i);if(e)e.className='stp on'},ok=i=>{const e=$('#st'+i);if(e)e.className='stp ok'};
  const next=ms=>{startVisual();setTimeout(()=>{if(S.screen!=='building')return;
    if(S.user.level==='new'){S.started=true;go('reveal')}
    else startSess('diag')},ms)};
  if(!S.pendingTopic){[0,1,2].forEach(i=>{setTimeout(()=>on(i),i*800+100);setTimeout(()=>ok(i),i*800+750)});next(2800);return}
  BUILDING=true;on(0);const t1=setTimeout(()=>{ok(0);on(1)},3000),t2=setTimeout(()=>{ok(1);on(2)},12000);
  const level=(LEVELS.find(l=>l[0]===S.user.level)||LEVELS[0])[1];
  post(apiBase()+'/topic',{name:S.pendingTopic,level})
   .then(j=>{BUILDING=false;clearTimeout(t1);clearTimeout(t2);addGeneratedTopic(j);useTopic(j.id);S.pendingTopic='';
     [0,1,2].forEach(ok);trk('topic_generated',{id:j.id,concepts:j.concepts.length});next(600)})
   .catch(e=>{BUILDING=false;clearTimeout(t1);clearTimeout(t2);S.buildErr=String(e.message||e);if(S.screen==='building')rr()})}
ACT.retryBuild=()=>{S.buildErr='';go('building')};

/* ---------------- Learn Lab: interactive visual, one LLM-made HTML page served from the Daytona sandbox ---------------- */
let VIS_BUSY=false;
function startVisual(request){if(VIS_BUSY)return;VIS_BUSY=true;
  const prev=S.vis||{};let sid=prev.sandboxId||'';try{sid=sid||localStorage.getItem('learn-lab-sandbox')||''}catch(e){}
  S.vis={...prev,status:'building',err:'',request:request||''};save();if(S.screen==='visual')rr();
  post('/api/visual',{topic:TOPIC,concepts:C.map(c=>c.name),request:request||'',sandboxId:sid})
   .then(j=>{VIS_BUSY=false;try{localStorage.setItem('learn-lab-sandbox',j.sandboxId)}catch(e){}
     S.vis={status:'ready',url:j.url,title:j.title,sandboxId:j.sandboxId,local:!!j.local,request:''};save();trk('visual_ready',{title:j.title});
     if(S.screen==='visual'||(S.screen==='home'&&!S.overlay))rr();else if(S.screen!=='lesson')toast('Your interactive visual is ready')})
   .catch(e=>{VIS_BUSY=false;S.vis={...(S.vis||{}),status:'error',err:String(e.message||e)};save();if(S.screen==='visual')rr()})}
// The page text comes through our server (no Daytona warning page) and goes into a locked frame
// (sandbox="allow-scripts", no own origin), so the generated page cannot touch the app.
let VIS_HTML={url:'',html:''};
function fillVisual(){const f=$('#visf'),v=S.vis;if(!f||!v||!v.url)return;
  const put=h=>{const g=$('#visf');if(g&&S.vis&&S.vis.url===v.url)g.srcdoc=h};
  if(VIS_HTML.url===v.url)return put(VIS_HTML.html);
  fetch('/api/page?u='+encodeURIComponent(v.url)).then(r=>r.text()).then(h=>{VIS_HTML={url:v.url,html:h};put(h)}).catch(()=>{})}
VIEWS.visual=function(){
  const v=S.vis||{},busy=v.status==='building'&&VIS_BUSY;let body;
  if(v.status==='ready'&&!busy)body=`<div class="visframe"><iframe id="visf" sandbox="allow-scripts" title="Interactive visual"></iframe></div>
    <div class="vishint">${v.local?'Made by Claude · running on this laptop':'Made by Claude · served from your Daytona sandbox'}</div>
    <div class="vischange"><input id="vreq" class="tinput" placeholder="Ask Bruno to change it…" autocomplete="off"><button class="pgo" data-act="visualAsk">SEND</button></div>`;
  else if(busy)body=`<div class="viswait"><div style="width:170px;height:180px">${bruno('think')}</div><div class="title">Bruno is drawing${v.request?' your change':''}…</div><p class="rsub">An interactive visual for ${esc(TOPIC)}. About 30 seconds.</p></div>`;
  else if(v.status==='error')body=`<div class="viswait"><div style="width:170px;height:180px">${bruno('sad')}</div><div class="title">The drawing failed</div><p class="rsub">${esc(v.err||'')}</p><button class="btn" data-act="visualMake" style="margin-top:12px">Try again</button></div>`;
  else body=`<div class="viswait"><div style="width:170px;height:180px">${bruno('idle')}</div><div class="title">See ${esc(TOPIC)} in action</div><p class="rsub">Bruno can draw an interactive visual for you.</p><button class="btn" data-act="visualMake" style="margin-top:12px">Draw it</button></div>`;
  const title=v.status==='ready'&&!busy&&v.title?v.title:'Explore';
  return `<div class="screen enter">${status()}${hdr(esc(title),'visualContinue')}<div class="body vbody">${body}</div><div class="foot"><button class="btn" data-act="visualContinue">Continue</button></div></div>`};
ACT.visualOpen=()=>{S.afterVisual='';go('visual')};
ACT.visualMake=()=>startVisual((S.vis&&S.vis.request)||'');
ACT.visualAsk=()=>{const i=$('#vreq');const r=i&&i.value.trim();if(r){trk('visual_change',{len:r.length});startVisual(r)}};
ACT.visualContinue=()=>{const n=S.afterVisual;S.afterVisual='';if(n==='streakx')go('streakx');else go('home',{tab:'learn'})};

/* ---------------- home: learn tab (path) ---------------- */
const OFF=[0,-46,-62,-24,34,58,40,0,-40,-56,-20,30];
function pathNodes(){
  const seq=[];C.forEach((c,i)=>{seq.push({t:'c',c});if(i===0)seq.push({t:'visual'});if(i%2===1&&i<C.length-1)seq.push({t:'chest',n:i})});seq.push({t:'review'});seq.push({t:'trophy'});return seq}
VIEWS.home=function(){
  const t=S.tab;
  const body=t==='learn'?learnTab():t==='practice'?practiceTab():t==='quests'?questsTab():meTab();
  return `<div class="screen enter">${status()}${body}${tabsBar()}</div>`};
function learnTab(){
  const c=cur(),n=C.length,m=C.filter(x=>mastery(x.id)===2).length,l=C.filter(x=>mastery(x.id)===1).length;
  const nodes=pathNodes().map((p,i)=>{const off=OFF[i%OFF.length],pos=`style="transform:translateX(${off}px)"`;
    if(p.t==='chest'){const open=S.chestOpen[p.n],ok=mastery(C[p.n-1].id)>0&&mastery(C[p.n].id)>0;
      return `<div class="nodewrap" ${pos}><button class="node chest ${open?'open':ok?'rdy':'lock'}" data-act="chest" data-n="${p.n}" aria-label="Chest">${chestI}</button><div class="cname">${open?'Claimed':ok?'Tap to open':'Reward chest'}</div></div>`}
    if(p.t==='review'){const d=dueCards().length;return `<div class="nodewrap" ${pos}>${d?'<div class="tag">REVIEW</div>':''}<button class="node ${d?'l':'t'}" data-act="review" aria-label="Review">${nodeIco('cycle')}</button><div class="cname">${d?d+' card'+(d>1?'s':'')+' due':'Review'}</div></div>`}
    if(p.t==='visual'){const st=(S.vis||{}).status,rdy=st==='ready';return `<div class="nodewrap" ${pos}>${rdy?'<div class="tag">EXPLORE</div>':''}<button class="node ${rdy?'l':'t'}" data-act="visualOpen" aria-label="Interactive visual">${nodeIco('play')}</button><div class="cname">${st==='building'&&VIS_BUSY?'Bruno is drawing…':'Interactive visual'}</div></div>`}
    if(p.t==='trophy')return `<div class="nodewrap" ${pos}><button class="node trophy ${done()?'m':'t'}" data-act="trophy" aria-label="Done">${trophyI}</button><div class="cname">${done()?'Everything covered':'100% marker'}</div></div>`;
    const x=p.c,ms=mastery(x.id),isCur=c&&c.id===x.id,cls=ms===2?'m':(ms===1||isCur)?'l':'t';
    const tag=isCur?`<div class="tag">${ms===1?'REVISIT':'START'}</div>`:'';
    const ring=ms===1?`<svg class="ring" viewBox="0 0 100 100"><circle cx="50" cy="50" r="46" fill="none" stroke="#E5E5E5" stroke-width="5"/><circle cx="50" cy="50" r="46" fill="none" stroke="#FFC800" stroke-width="5" stroke-linecap="round" stroke-dasharray="144 289"/></svg>`:'';
    const buddy=isCur?`<div class="buddy" style="${off>=0?'right:112px':'left:112px'}">${bruno('idle')}</div>`:'';
    return `<div class="nodewrap" ${pos}>${tag}${buddy}<button class="node ${cls} ${isCur?'cur':''}" data-act="node" data-c="${x.id}">${ring}${nodeIco(x.icon)}</button><div class="cname">${x.name}</div>${S.knew[x.id]?'<div class="knew">KNEW IT · SKIPPED</div>':''}</div>`}).join('');
  return `${hud()}<div class="scroll"><div class="banner"><div class="top"><div><div class="k">Your map</div><h2>${done()?'All covered!':(n-m)+' to go'}</h2></div><div class="pct">${cov()}%<small>COVERED</small></div><button class="notebtn" data-act="guide" aria-label="Guidebook">${noteI}</button></div>
   <div class="segs">${C.map(x=>`<div class="seg ${mastery(x.id)===2?'m':mastery(x.id)===1?'l':''}"></div>`).join('')}</div><div class="legend"><span>${m} known</span><span>${l} learning</span><span>${n-m-l} new</span></div></div>
  ${done()?`<div class="donecard" style="margin-top:14px">100%. Nothing left to study here. That's the whole topic.</div>`:''}
  <div class="path">${nodes}</div></div>`}
ACT.node=el=>{const c=C.find(x=>x.id===el.dataset.c),m=mastery(c.id);if(m===2){toast('You know this one. Bruno will quiz it in Review.');return}startSess(m===1?'revisit':'learn',c)};
ACT.chest=el=>{const n=+el.dataset.n;if(S.chestOpen[n])return;if(!(mastery(C[n-1].id)>0&&mastery(C[n].id)>0)){toast('Finish the two markers above to unlock');return}S.chestOpen[n]=true;S.gems+=50;SFX.coin();openOv('chest',{gems:50})};
OVERLAYS.chest=d=>`<div class="scrim center2" data-act="closeOv"><div class="alert reward" onclick="event.stopPropagation()"><div class="chestbig">${chestI}</div><h4>+${d.gems} gems!</h4><p>Spend them in the shop on streak freezes and outfits.</p><div class="al"><button class="b" data-act="closeOv">Nice</button></div></div></div>`;
ACT.closeOv=()=>closeOv();
ACT.trophy=()=>{if(done()){if(!calm())confetti(80);SFX.win();toast('You covered everything. Truly done!')}else toast('Cover every marker to unlock')};
ACT.review=()=>startSess('review');
ACT.goStreak=()=>go('streakx');
ACT.goShop=()=>go('shop');
ACT.guide=()=>go('guide');
ACT.tab=el=>{S.tab=el.dataset.t;go('home')};
ACT.back=()=>go('home');

/* ---------------- practice hub ---------------- */
function practiceTab(){
  const dc=dueCards().length,nd=nextDueIn(),mk=S.mistakes.length,ln=learned().length;
  const tile=(ic,bg,title,sub,btn,act,dis)=>`<div class="ptile ${dis?'dis':''}"><div class="pic2" style="background:${bg}">${ic}</div><div class="pt"><b>${title}</b><small>${sub}</small></div><button class="pgo" data-act="${act}" ${dis?'disabled':''}>${btn}</button></div>`;
  const I2=k=>nodeIco(k,'style="width:26px;height:26px;stroke:#fff;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"');
  return `<div class="hhead"><div class="l" style="font-size:22px;color:var(--ink)">Practice</div><div class="r"><span class="chip fire">${flame}${S.streak}</span></div></div><div class="scroll" style="padding:0 16px 20px">
  <div class="speak" style="margin:0 0 14px">${bruno(dc?'think':'happy')}<div class="bubble">${dc?`${dc} card${dc>1?'s are':' is'} about to fade. Let's catch ${dc>1?'them':'it'}.`:ln?'Nothing is fading. Nice memory!':'Learn a marker first and I will start scheduling reviews.'}</div></div>
  ${tile(I2('cycle'),'var(--sky)',"Today's review",dc?`${dc} card${dc>1?'s':''} due, scheduled by how fast you forget`:nd?`All caught up. Next due in ${nd} day${nd>1?'s':''}`:'Cards appear after your first lesson',dc?'START +'+(6+dc):'REVIEW','review',!ln)}
  ${tile(I2('leaf'),'var(--red)','Review your mistakes',mk?`${mk} question${mk>1?'s':''} to retry`:'Nothing to fix. Missed questions will land here','START +8','mistakes',!mk)}
  ${tile(I2('sun'),'var(--orange)','Rapid Review','Speed round'+(S.rapidBest?` · best ${S.rapidBest}`:''),'START','rapidIntro',!ln)}
  ${tile(I2('cube'),'var(--purple)','Mixed practice','Interleaves what you have learned: harder, lasts longer','START +8','mixed',ln<2)}
  ${tile(I2('drop'),'var(--green)','Teach Bruno','Explain a concept back to him in your own words','START +10','teach',!ln)}
  ${tile(I2('cell'),'#1CB0F6','Your cards',`${Object.keys(S.srs).length} cards with a memory strength`,'OPEN','cards',false)}
  ${tile(micWhite(),'#12304B','Talk with Bruno','Ask questions out loud','CALL','call',false)}</div>`}
const micWhite=()=>`<svg viewBox="0 0 24 24" style="width:26px;height:26px;fill:none;stroke:#fff;stroke-width:2.4;stroke-linecap:round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>`;
ACT.mistakes=()=>{if(!S.mistakes.length){toast('No mistakes to retry. Nice!');return}startSess('mistakes')};ACT.mixed=()=>startSess('mixed');ACT.teach=()=>startSess('teach');
ACT.rapidIntro=()=>go('rapidIntro');ACT.cards=()=>go('cards');ACT.call=()=>go('call');
VIEWS.rapidIntro=()=>`<div class="screen center enter" style="padding:0 24px 26px">${status()}<div class="topbar"><button class="x" data-act="back">${backI}</button><div style="flex:1"></div></div>
  <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="width:210px;height:220px">${bruno('cheer')}</div><div class="speedtitle">RAPID<br>REVIEW</div><p class="rsub" style="color:var(--orange);font-weight:800">Improve recall by going faster and faster!</p><p class="rsub">60 seconds. Answer as many as you can. Best: ${S.rapidBest||0}</p></div>
  <div class="row"><button class="btn ghost" data-act="rapidGo" data-timed="0">Untimed</button><button class="btn" data-act="rapidGo" data-timed="1">Start</button></div></div>`;
ACT.rapidGo=el=>startSess('rapid',el.dataset.timed==='1'?'timed':'free');

/* ---------------- quests tab ---------------- */
function questsTab(){
  const mq=MONTHLY(),qs=QUESTS(),gx=goalXp(),gp=Math.min(100,S.todayXp/gx*100);
  return `<div class="hhead"><div class="l" style="font-size:22px;color:var(--ink)">Quests</div><div class="r"><button class="chip" data-act="league" style="color:var(--sky-text)">${trophyI.replace('<svg','<svg width="22" height="22"')}League</button></div></div><div class="scroll" style="padding:0 16px 20px">
  <div class="mquest"><div><div class="k">EXPLORER QUEST</div><h3>${mq.desc}</h3><div class="mbar"><i style="width:${mq.val/mq.goal*100}%"></i><b>${mq.val} / ${mq.goal}</b></div></div><div class="mb">${bruno('happy')}</div></div>
  <div class="h3">Daily goal</div><div class="qcard"><div class="qrow"><b>${S.todayXp} / ${gx} XP</b><span>${S.user.goal} min a day</span></div><div class="qbar"><i style="width:${gp}%"></i></div></div>
  <div class="h3">Daily quests</div><div class="qcard">${qs.map(q=>{const d=q.val>=q.goal,cl=S.quests.claimed[q.id];return `<div class="qline"><div class="qm"><b>${q.t}</b><div class="qbar"><i style="width:${Math.min(100,q.val/q.goal*100)}%"></i><em>${Math.min(q.val,q.goal)}/${q.goal}</em></div></div><button class="qchest ${d&&!cl?'rdy':''}" data-act="claimQuest" data-id="${q.id}" ${d&&!cl?'':'disabled'}>${cl?tick.replace('style="','style="width:22px;height:22px;color:#58CC02;'):chestI}</button></div>`}).join('')}</div>
  <div class="h3">Badges <button class="link" data-act="badges">View all</button></div><div class="brow">${BADGES.slice(0,5).map(b=>badgeMedal(b)).join('')}</div></div>`}
ACT.claimQuest=el=>{const q=QUESTS().find(x=>x.id===el.dataset.id);if(!q||q.val<q.goal||S.quests.claimed[q.id])return;S.quests.claimed[q.id]=true;S.gems+=q.gems;SFX.coin();toast('+'+q.gems+' gems');rr()};
ACT.league=()=>go('league');ACT.badges=()=>go('badges');
const badgeMedal=b=>{const on=S.badges[b.id];return `<div class="medal ${on?'on':''}"><div class="mc2">${nodeIco(b.icon,'style="width:30px;height:30px;stroke:#fff;fill:none;stroke-width:2.4;stroke-linecap:round;stroke-linejoin:round"')}</div><small>${b.name}</small></div>`};

/* ---------------- me tab ---------------- */
function weekChart(){const v=[];for(let i=6;i>=0;i--)v.push(S.week[((S.weekIdx-i)%7+7)%7]||0);const mx=Math.max(40,...v),days=['S','M','T','W','T','F','S'];
  const pts=v.map((y,i)=>[20+i*50,110-(y/mx)*90]);
  return `<svg viewBox="0 0 340 140" class="chart"><g stroke="#E5E5E5" stroke-width="1">${[20,60,100].map(y=>`<path d="M10 ${y}H330"/>`).join('')}</g><polyline fill="none" stroke="#43C0F6" stroke-width="3" stroke-linejoin="round" points="${pts.map(p=>p.join(',')).join(' ')}"/>${pts.map(p=>`<circle cx="${p[0]}" cy="${p[1]}" r="4.500" fill="#fff" stroke="#43C0F6" stroke-width="3"/>`).join('')}${pts.map((p,i)=>`<text x="${p[0]}" y="132" text-anchor="middle" font-size="11" fill="#AFAFAF" font-weight="700">${days[((S.weekIdx-6+i)%7+7)%7]}</text>`).join('')}</svg>`}
/* per-exercise accuracy: eventSummary() from core.js when present (shape-tolerant), else the local stats */
function exerciseAccuracy(){
  const out=[],pct=v=>{v=+v;if(!isFinite(v))return null;return Math.max(0,Math.min(100,Math.round(v<=1?v*100:v)))};
  try{if(typeof eventSummary==='function'){let es=eventSummary();if(es&&typeof es==='object'){
    es=es.byKind||es.perExercise||es.exercises||es.kinds||es.accuracy||es;
    const ents=Array.isArray(es)?es.map(e=>[e&&(e.k||e.kind||e.type||e.name),e]):Object.entries(es);
    ents.forEach(([k,v])=>{if(!k||!KIND[k])return;let p=null;
      if(typeof v==='number')p=pct(v);
      else if(Array.isArray(v))p=v[1]>0?pct(v[0]/v[1]):null;
      else if(v&&typeof v==='object'){const t=v.total??v.n??v.count??v.attempts??v.seen,c=v.correct??v.right??v.ok??v.hits;
        if(v.acc!=null)p=pct(v.acc);else if(v.accuracy!=null)p=pct(v.accuracy);else if(v.rate!=null)p=pct(v.rate);else if(t>0&&c!=null)p=pct(c/t)}
      if(p!==null)out.push({k,p})})}}}catch(e){}
  if(out.length)return out;
  return Object.keys(KIND).filter(k=>S.stats[k]&&S.stats[k][1]>0).map(k=>({k,p:Math.round(S.stats[k][0]/S.stats[k][1]*100)}))}
function meTab(){
  const m=C.filter(x=>mastery(x.id)===2).length,ins=insights(),nb=Object.keys(S.badges).length;
  const acc=exerciseAccuracy(),rows=acc.map(a=>`<div class="br"><div class="n">${esc(KIND[a.k]||a.k)}</div><div class="t"><i style="width:${a.p}%"></i></div><div class="p">${a.p}%</div></div>`).join('');
  const cal=S.conf.sure[1]>=2?Math.round(S.conf.sure[0]/S.conf.sure[1]*100):null;
  const lnk=(act,ic,t)=>`<button class="lrow" data-act="${act}"><span class="lic">${ic}</span>${t}<svg viewBox="0 0 24 24" class="chev"><path d="M9 5l7 7-7 7"/></svg></button>`;
  return `<div class="scroll" style="padding-bottom:20px"><div class="phead"><div class="pbru">${bruno('idle')}</div><div class="pname">${esc(S.user.name||'Learner')}</div><div class="phandle">@${esc((S.user.name||'learner').toLowerCase().replace(/\s+/g,''))} · studying ${esc(S.topic)}</div></div>
  <div class="pstats"><div><b>${S.streak}</b><small>Streak</small></div><div><b>${S.xp}</b><small>Total XP</small></div><div><b>${m}/${C.length}</b><small>Known</small></div></div>
  <div class="h3 pad2">Weekly progress</div><div class="qcard" style="margin:0 16px">${weekChart()}</div>
  <div class="h3 pad2">Friends</div><div style="margin:0 16px">${friendsCard()}</div><div class="h3 pad2">How you learn</div><div class="qcard" style="margin:0 16px"><div class="bars">${rows||'<div style="color:var(--ink2);font-weight:700">Finish a lesson and Bruno will start learning how you learn.</div>'}</div>
   ${cal!==null?`<div class="note" style="margin-top:12px"><span>When you said “Certain”, you were right <b>${cal}%</b> of the time.</span></div>`:''}
   <div class="note" style="margin-top:10px"><span>${ins?`<b>${KIND[ins.strong.k]}</b> is your strong suit. Bruno leans on <b>${KIND[ins.weak.k]}</b> to shore up your weakest spot.`:'After a few rounds Bruno learns how you learn and reshapes your lessons.'}</span></div></div>
  <div class="h3 pad2">More</div><div class="lrows">${lnk('wardrobe',nodeIco('leaf','style="stroke:#43C0F6"'),'Dress Bruno')}${lnk('badges',nodeIco('cube','style="stroke:#43C0F6"'),`Badges <em>${nb}/${BADGES.length}</em>`)}${lnk('goShop',gemI,'Shop')}${lnk('guide',nodeIco('sun','style="stroke:#43C0F6"'),'Guidebook')}${lnk('plus',nodeIco('cycle','style="stroke:#43C0F6"'),'Bruno Plus')}${lnk('settings',nodeIco('drop','style="stroke:#43C0F6"'),'Settings')}</div></div>`}
ACT.wardrobe=()=>go('wardrobe');ACT.plus=()=>go('plus');ACT.settings=()=>go('settings');

/* ---------------- results / streak ---------------- */
VIEWS.result=function(){
  if(S.sess&&S.sess.mode==='diag')return VIEWS.reveal();
  const s=S.sess,c=C.find(x=>x.id===s.cid),ins=insights();let head,sub,mood='cheer',stats='',note='',btn='Claim XP';
  const known=C.filter(x=>S.knew[x.id]).length;
  const tile=(h,v,bg,bd)=>`<div class="stat" style="border-color:${bd}"><div class="h" style="background:${bg}">${h}</div><div class="v" style="color:${bg}">${v}</div></div>`;
  if(s.mode==='diag'){head=known?'You know a lot!':'Fresh start!';mood=known?'cheer':'happy';sub=known?`You already know ${known} of ${C.length}. Bruno will skip those so you never re-learn them.`:`Nothing familiar yet, so we start at the trailhead.`;
    stats=`<div class="cards">${tile('Skipped',known,'#E0A800','#FFE680')}${tile('To learn',C.length-known,'#43C0F6','#84D8FF')}</div>`;note=`<div class="note"><span><b>${C.length-known} markers</b> stand between you and 100%. That's the whole topic, nothing hidden.</span></div>`;btn='Show my path'}
  else if(s.mode==='rapid'){head=`Score: ${s.score}`;sub=s.score>=(S.rapidBest||0)&&s.score>0?'New best!':'Faster every round.';stats=`<div class="cards">${tile('Total XP','+'+s.gain,'#E0A800','#FFE680')}${tile('Best',S.rapidBest||0,'#43C0F6','#84D8FF')}</div>`;btn='Continue'}
  else{const perfect=s.miss===0;const lbl=s.acc>=100?'PERFECT':s.acc>=80?'GREAT':s.acc>=60?'GOOD':'KEEP GOING';
    head=s.mode==='review'?'Review done!':perfect?'Flawless!':'Lesson complete!';mood=perfect?'cheer':'happy';
    sub=s.mode==='learn'||s.mode==='revisit'?(perfect?`${c.name}: locked in.`:`${c.name}: Bruno will bring the shaky bits back.`):s.mode==='review'?'Strong cards move further out. Shaky ones return sooner.':'Nice work.';
    stats=`<div class="cards">${tile('Total XP','+'+s.gain,'#E0A800','#FFE680')}${tile(lbl,s.acc+'%','#58A700','#58CC02')}${tile('Blazing',fmtT(s.secs),'#43C0F6','#84D8FF')}</div>`;
    note=`<div class="note"><span>${s.mode==='learn'||s.mode==='revisit'?`Coverage <b>${s.before}% → ${s.after}%</b>. `:''}${ins?`Bruno noticed: <b>${KIND[ins.strong.k]}</b> clicks for you, <b>${KIND[ins.weak.k]}</b> doesn't yet. Next lessons shift to match.`:'Bruno is still learning how you learn.'}</span></div>`}
  if(done()){head='100% covered!';sub='Nothing left to study in '+esc(S.topic)+'. You can stop worrying about it.';mood='cheer'}
  return `<div class="screen center enter" style="padding:0 24px 26px">${status()}<div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%">
   <div style="width:200px;height:210px">${bruno(mood)}</div><div class="rtitle">${head}</div><div class="rsub">${sub}</div>${stats}${note}</div><button class="btn" data-act="claim" style="margin-top:10px">${btn}</button></div>`};

/* ---------------- "Your map" reveal: the pitch, right after placement ---------------- */
let REVEAL_SAID='';
const RING_C=2*Math.PI*54;
const revealStats=()=>{const n=C.length||1,known=C.filter(x=>mastery(x.id)===2),left=C.filter(x=>mastery(x.id)<2);
  return{n,known,left,skip:Math.round(known.length/n*100),pct:cov()}};
VIEWS.reveal=function(){
  const r=revealStats(),all=r.left.length===0,none=r.known.length===0;
  const line=all?'You already know all of '+esc(S.topic)+'.':none?'Nothing skipped. We start at the very beginning.':'Bruno skipped <b>'+r.skip+'%</b> you already know.';
  const first=r.left[0];
  return `<div class="screen center enter reveal">${status()}<div class="rv-scroll">
   <div class="rv-top"><div class="rv-bru">${bruno(all||!none?'cheer':'happy')}</div><div class="bubble rv-say">${all?"You can skip the whole thing. Nice!":none?"Fresh start. I mapped everything, so you can see the finish line.":"I skipped what you know. Only the rest is left."}</div></div>
   <div class="rv-ring"><svg viewBox="0 0 128 128" aria-hidden="true"><circle cx="64" cy="64" r="54" class="rv-track"/><circle cx="64" cy="64" r="54" class="rv-fill" id="rvfill" style="--c:${RING_C.toFixed(1)};--to:${(RING_C*(1-r.pct/100)).toFixed(1)}" transform="rotate(-90 64 64)"/></svg>
    <div class="rv-n"><b id="rvn" data-to="${r.pct}">${r.pct}</b><small>% COVERED</small></div></div>
   <h2 class="rv-h">${line}</h2>
   <div class="rv-card"><div class="rv-row"><span class="rv-k">${all?'Left to learn':r.left.length+' concept'+(r.left.length===1?'':'s')+' left'}</span><span class="rv-goal">REACH 100%</span></div>
    ${all?'<p class="rv-empty">Nothing. Bruno will keep them fresh with short reviews.</p>':`<ol class="rv-list">${r.left.map((c,i)=>`<li><span class="rv-i">${i+1}</span>${esc(c.name)}</li>`).join('')}</ol>`}
    ${r.known.length?`<div class="rv-skip"><span>${tick.replace('style="','style="width:14px;height:14px;')}Already yours</span> ${r.known.map(c=>esc(c.name)).join(' · ')}</div>`:''}</div>
   <p class="rv-promise">${all?'You are at 100%. That is the whole topic.':'Finish these '+r.left.length+' and you are done with '+esc(S.topic)+'. That is the whole topic, nothing hidden.'}</p></div>
   <div class="rv-foot"><button class="btn" data-act="revealGo">${all?'See my map':first?'Start with '+esc(first.name):'Continue'}</button></div></div>`};
function afterReveal(){const sn=S.sess&&S.sess.mode==='diag'&&S.sess.streakNew;if(sn)go('streakx');else go('home',{tab:'learn'})}
function finishSetup(){S.user.setup=true;afterReveal()}
ACT.revealGo=()=>{trk('reveal_cta',{pct:cov()});REVEAL_SAID='';if(!S.user.setup){go('name');return}afterReveal()};
function revealFx(){
  const key=S.screen+':'+cov()+':'+C.filter(x=>S.knew[x.id]).length;if(REVEAL_SAID===key)return;REVEAL_SAID=key;
  const r=revealStats();trk('reveal_view',{skipped_pct:r.skip,left:r.left.length,pct:r.pct});
  const n=$('#rvn');
  if(n&&!calm()&&r.pct>0){let v=0;n.textContent='0';const step=Math.max(1,Math.round(r.pct/22)),iv=setInterval(()=>{v=Math.min(r.pct,v+step);const e=$('#rvn');if(!e){clearInterval(iv);return}e.textContent=v;if(v>=r.pct)clearInterval(iv)},40)}
  if(!calm()&&r.pct>0)setTimeout(()=>{if(S.screen==='reveal'||S.screen==='result')confetti(26)},700);
  setTimeout(()=>{if(S.screen!=='reveal'&&S.screen!=='result')return;setMood('cheer');say(r.left.length===0?'You already know everything. Nothing left to study.':r.known.length?`I skipped ${r.skip} percent you already know. ${r.left.length} ${r.left.length===1?'concept is':'concepts are'} left, and then you're at one hundred percent.`:`I mapped ${r.n} concepts. Finish them all and you're at one hundred percent.`,{onend:()=>setMood('idle')})},500)}
ACT.claim=()=>{const s=S.sess;
  if(s&&(s.mode==='learn'||s.mode==='revisit')&&!S.visSeen&&S.vis&&(S.vis.status==='ready'||S.vis.status==='building')){S.visSeen=true;S.afterVisual=s.streakNew?'streakx':'';go('visual');return}
  if(s&&s.streakNew)go('streakx');else go('home',{tab:'learn'})};


/* ---------------- retention hooks (UI only; backend later) ---------------- */
const notifSupported=()=>{try{return typeof Notification!=='undefined'}catch(e){return false}};
const notifState=()=>notifSupported()?Notification.permission:'unsupported';
function showLocalNote(title,body){try{
  if(navigator.serviceWorker&&navigator.serviceWorker.ready&&navigator.serviceWorker.controller){navigator.serviceWorker.ready.then(r=>r.showNotification(title,{body,icon:'icon-192.png',badge:'icon-192.png',tag:'bruno-welcome'})).catch(()=>{})}
  else new Notification(title,{body,icon:'icon-192.png'})}catch(e){}}
/* permission is requested only from a user tap (settings toggle, onboarding Allow, streak card) */
const refresh=()=>{if(S.screen==='settings'||S.screen==='streakx')rr()};
function enableReminders(){
  S.settings.reminders=true;save();
  const fallback=msg=>{toast(msg);refresh();return 'fallback'};
  if(!notifSupported())return Promise.resolve(fallback('Reminders will show inside Bruno. This browser can’t send alerts.'));
  if(Notification.permission==='denied')return Promise.resolve(fallback('Alerts are blocked in your browser. Bruno will remind you in the app.'));
  if(Notification.permission==='granted'){trk('reminder_optin',{perm:'granted'});toast('Daily reminder is on');refresh();return Promise.resolve('granted')}
  let ask;try{ask=Promise.resolve(Notification.requestPermission(()=>{}))}catch(e){return Promise.resolve(fallback('Reminders will show inside Bruno.'))}
  return ask.then(p=>{trk('reminder_optin',{perm:p});
    if(p==='granted'){showLocalNote('Bruno','Reminder set. I’ll nudge you to keep your streak.');toast('Daily reminder is on');refresh();return p}
    return fallback('No problem. Bruno will remind you in the app.')}).catch(()=>fallback('Reminders will show inside Bruno.'))}
const notifSub=()=>{const p=notifState();return p==='granted'?'Daily at 5:00 PM':p==='denied'?'Blocked in browser. In-app nudges only':p==='unsupported'?'In-app nudges (alerts unsupported here)':'Daily at 5:00 PM. Asks permission when on'};
ACT.remindMe=()=>{enableReminders()};

function streakText(){return `I'm on a ${S.streak}-day streak learning ${S.topic} with Bruno, ${cov()}% covered so far.`}
function streakCanvas(){
  const cv=document.createElement('canvas');cv.width=720;cv.height=720;const g=cv.getContext&&cv.getContext('2d');if(!g)return null;
  const W=720,fam='Lexend, system-ui, sans-serif';
  const gr=g.createLinearGradient(0,0,0,W);gr.addColorStop(0,'#43C0F6');gr.addColorStop(1,'#2B8FD0');g.fillStyle=gr;g.fillRect(0,0,W,W);
  g.fillStyle='rgba(255,255,255,.14)';[[90,110,64],[620,170,44],[560,600,76]].forEach(([x,y,r])=>{g.beginPath();g.arc(x,y,r,0,7);g.fill()});
  g.save();g.translate(W/2-90,70);g.scale(7.5,7.5);
  g.fillStyle='#FF9600';g.beginPath();g.moveTo(12,2);g.bezierCurveTo(13,6,18,8,18,14);g.arc(12,14,6,0,Math.PI);g.bezierCurveTo(6,11,8,10,8,7);g.bezierCurveTo(10,8,11,9,11,11);g.bezierCurveTo(12,8,12,5,12,2);g.fill();
  g.fillStyle='#FFD84D';g.beginPath();g.arc(12,18.5,3.5,0,Math.PI*2);g.fill();g.restore();
  g.textAlign='center';g.fillStyle='#fff';g.font='900 190px '+fam;g.fillText(String(S.streak),W/2,470);
  g.font='800 44px '+fam;g.fillText('day streak',W/2,530);
  g.font='700 28px '+fam;g.globalAlpha=.92;g.fillText(S.topic+' · '+cov()+'% covered',W/2,590);g.globalAlpha=1;
  g.font='900 34px '+fam;g.fillText('bruno',W/2,670);
  return cv}
ACT.shareStreak=async()=>{
  trk('share_streak',{streak:S.streak});
  const text=streakText(),url=(()=>{try{return /^https?:$/.test(location.protocol)?location.href.split('?')[0]:undefined}catch(e){return undefined}})();
  let file=null;
  try{const cv=streakCanvas();if(cv&&cv.toBlob){const blob=await new Promise(r=>cv.toBlob(r,'image/png'));if(blob&&typeof File!=='undefined')file=new File([blob],'bruno-streak.png',{type:'image/png'})}}catch(e){}
  try{
    if(navigator.share){
      if(file&&navigator.canShare&&navigator.canShare({files:[file]})){await navigator.share({files:[file],text});return}
      await navigator.share({text,url});return}
  }catch(e){if(e&&e.name==='AbortError')return}
  const ok=await copyText(text+(url?' '+url:''));
  toast(ok?'Streak text copied. Paste it anywhere.':'Sharing isn’t available here.')};

const friendsCard=()=>`<div class="qcard fr"><div class="fr-av"><i>+</i><i></i><i></i></div><div class="fr-t"><b>Friends</b><small>Invite a friend and keep each other's streaks going. Leaderboards come with accounts.</small></div><button class="pgo" data-act="invite">INVITE</button></div>`;
ACT.invite=async()=>{const link=inviteLink();trk('invite_copy',{});const ok=await copyText(link);toast(ok?'Invite link copied':'Copy this: '+link)};

VIEWS.streakx=function(){
  const days=['S','M','T','W','T','F','S'],t=((S.weekIdx%7)+7)%7;
  const cells=days.map((d,i)=>{const back=((t-i)%7+7)%7,on=S.streak>0&&back<Math.min(S.streak,7)&&i<=t||(S.streak>0&&back<Math.min(S.streak,7)&&i>t&&false);return `<div class="dcell ${on?'on':''} ${i===t?'today':''}"><small>${days[i]}</small><i>${on?tick.replace('style="','style="width:16px;height:16px;'):''}</i></div>`}).join('');
  return `<div class="screen center enter streakx">${status()}<div class="sx-hero"><div class="bigflame"><svg viewBox="0 0 24 24"><path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-4 2-7 2 1 3 2 3 4 1-3 1-6 1-9z" fill="#FF9600"/><path d="M12 22a3.500 3.500 0 0 1-3.500-3.500c0-2 2-3 3.500-5 1.500 2 3.500 3 3.500 5A3.500 3.500 0 0 1 12 22z" fill="#FFD84D"/></svg></div><div class="sx-n">${S.streak}</div><div class="sx-t">day streak!</div></div>
  <div class="sx-card"><div class="dweek">${cells}</div><p>Learn every day to keep your streak. You have <b>${S.freezes}</b> Streak Freeze${S.freezes===1?'':'s'}.</p></div>
  <div style="flex:1"></div><div style="width:100%;padding:0 24px 26px;display:flex;flex-direction:column;gap:12px"><div class="row"><button class="btn ghost" data-act="shareStreak">Share streak</button>${S.settings.reminders&&notifState()==='granted'?'':'<button class="btn ghost" data-act="remindMe">Remind me</button>'}</div><button class="btn" data-act="back">Continue</button></div></div>`};

/* ---------------- guidebook, cards ---------------- */
VIEWS.guide=()=>`<div class="screen enter">${status()}${hdr('Guidebook')}<div class="body" style="padding-top:4px">${C.map(c=>`<div class="gcard"><div class="art">${artFor(c)}</div><h3>${c.name} <button class="mini" data-act="sayC" data-c="${c.id}" aria-label="Hear">${speakerSvg.replace(/#fff/g,'#1899D6')}</button></h3><p>${c.body}</p></div>`).join('')}</div></div>`;
ACT.sayC=el=>{const c=C.find(x=>x.id===el.dataset.c);say(c.name+'. '+c.body,{force:true})};
let CARDQ='';
VIEWS.cards=function(){
  const q=CARDQ.toLowerCase(),list=CARDS.filter(c=>!q||(c.f+c.b).toLowerCase().includes(q)).map(c=>({c,st:S.srs[c.id]})).sort((a,b)=>(a.st?retr(a.st):2)-(b.st?retr(b.st):2));
  return `<div class="screen enter">${status()}${hdr('Your cards')}<div class="body" style="padding-top:2px">${Object.keys(S.srs).length?'':`<div class="empty"><div class="em-b">${bruno('think')}</div><b>No cards yet</b><p>Finish a concept and Bruno turns it into cards, then schedules them for just before you forget.</p><button class="btn" data-act="back">Go learn</button></div>`}<input id="cq" class="tinput" placeholder="Search cards" value="${esc(CARDQ)}" autocomplete="off" style="margin-bottom:12px">
   ${list.map(({c,st})=>{const dots=st?strengthDots(st):0,due=st&&isDue(st);return `<button class="wrow ${st?'':'locked'}" data-act="cardOpen" data-id="${c.id}"><div class="wt"><b>${esc(c.f)}</b><small>${st?(due?'Due now':'Next in '+Math.max(1,st.due-S.day)+' day'+(st.due-S.day>1?'s':'')):'Not learned yet'}</small></div><div class="dots">${[1,2,3,4,5].map(i=>`<i class="${i<=dots?'on':''}"></i>`).join('')}</div></button>`}).join('')||'<div class="empty slim"><b>No cards match "'+esc(CARDQ)+'"</b><p>Try a shorter word.</p></div>'}</div></div>`};
ACT.cardOpen=el=>openOv('card',{id:el.dataset.id});
OVERLAYS.card=d=>{const c=cardById(d.id);return `<div class="scrim" data-act="closeOv"><div class="sheet" onclick="event.stopPropagation()"><div class="grab"></div><div class="fscene" style="width:100%;height:230px;flex:none;padding:6px 0 12px"><div class="fcard" id="cfc" data-act="cflip" style="max-height:220px"><div class="face"><div class="kicker" style="position:absolute;top:14px">Term</div><div class="big" style="font-size:22px">${esc(c.f)}</div><div class="hint">Tap to flip</div></div><div class="face back"><div class="kicker" style="position:absolute;top:14px;color:var(--sky-b)">Answer</div><div class="big" style="font-size:20px">${esc(c.b)}</div></div></div></div><button class="btn ghost" data-act="closeOv">Close</button></div></div>`};
ACT.cflip=()=>$('#cfc').classList.toggle('flipped');

/* ---------------- shop, wardrobe, settings ---------------- */
VIEWS.shop=function(){
  const owned=id=>S.user.owned[id],qty=id=>id==='freeze'?S.freezes:id==='boost'&&S.boost?1:0;
  return `<div class="screen enter">${status()}${hdr('Shop','back',`<span class="chip gem">${gemI}${S.gems}</span>`)}<div class="body" style="padding-top:4px">
  <div class="h3" style="margin-top:0">Power-ups</div>${SHOP.filter(i=>i.kind==='item').map(i=>`<div class="shoprow"><div class="sico">${i.id==='freeze'?'<svg viewBox="0 0 24 24" fill="none" stroke="#43C0F6" stroke-width="2.400" stroke-linecap="round"><path d="M12 2v20M4 7l16 10M20 7L4 17"/></svg>':bolt}</div><div class="st"><b>${i.name}${qty(i.id)?` <em>×${qty(i.id)}</em>`:''}</b><small>${i.desc}</small></div><button class="buy" data-act="buy" data-id="${i.id}" ${S.gems<i.price?'disabled':''}>${gemI}${i.price}</button></div>`).join('')}
  <div class="h3">Outfits for Bruno</div>${SHOP.filter(i=>i.kind==='outfit').map(i=>`<div class="shoprow"><div class="sico out">${bruno('idle')}</div><div class="st"><b>${i.name}</b><small>${i.desc}</small></div>${owned(i.id)?'<span class="own">OWNED</span>':`<button class="buy" data-act="buy" data-id="${i.id}" ${S.gems<i.price?'disabled':''}>${gemI}${i.price}</button>`}</div>`).join('')}</div></div>`};
ACT.buy=el=>{const i=SHOP.find(x=>x.id===el.dataset.id);if(!i||S.gems<i.price)return;if(i.kind==='outfit'&&S.user.owned[i.id])return;if(i.id==='boost'&&S.boost){toast('Double XP is already ready');return}S.gems-=i.price;SFX.coin();
  if(i.id==='freeze'){S.freezes++;toast('Streak Freeze added')}else if(i.id==='boost'){S.boost=true;toast('Double XP ready for your next lesson')}else{S.user.owned[i.id]=true;toast(i.name+' unlocked. Dress Bruno in your profile.')}rr()};
VIEWS.wardrobe=function(){const o=S.user.outfit,own=id=>S.user.owned[id];
  const sw=SCARVES.map(([c,n])=>`<button class="swatch ${o.scarf===c?'on':''}" style="background:${c}" data-act="scarf" data-c="${c}" aria-label="${n}"></button>`).join('')+`<button class="swatch ${o.scarf==='#FFC800'?'on':''} ${own('gold')?'':'lk'}" style="background:#FFC800" data-act="scarf" data-c="#FFC800" aria-label="Gold"></button>`;
  const hat=(v,l,id)=>`<button class="hchip ${o.hat===v?'on':''} ${v==='none'||own(id)?'':'lk'}" data-act="hat" data-v="${v}" data-id="${id||''}">${l}</button>`;
  return `<div class="screen enter">${status()}${hdr('Dress Bruno','back','<button class="done" data-act="back">DONE</button>')}<div class="wprev">${bruno('happy')}</div><div class="body" style="padding-top:6px"><div class="h3" style="margin-top:0">Scarf</div><div class="swatches">${sw}</div>
   <div class="h3">Hat</div><div class="hchips">${hat('none','None')}${hat('beanie','Honey beanie','beanie')}${hat('cap','Study cap','cap')}</div>
   <div class="h3">Glasses</div><div class="hchips"><button class="hchip ${!o.glasses?'on':''}" data-act="glasses" data-v="0">None</button><button class="hchip ${o.glasses?'on':''} ${own('glasses')?'':'lk'}" data-act="glasses" data-v="1">Round glasses</button></div><p class="rsub" style="margin-top:14px;text-align:center">Locked items are in the Shop.</p></div></div>`};
ACT.scarf=el=>{if(el.dataset.c==='#FFC800'&&!S.user.owned.gold){toast('Unlock the Golden scarf in the Shop');return}S.user.outfit.scarf=el.dataset.c;syncOutfit();rr()};
ACT.hat=el=>{const v=el.dataset.v;if(v!=='none'&&!S.user.owned[el.dataset.id]){toast('Unlock it in the Shop');return}S.user.outfit.hat=v;syncOutfit();rr()};
ACT.glasses=el=>{if(el.dataset.v==='1'&&!S.user.owned.glasses){toast('Unlock it in the Shop');return}S.user.outfit.glasses=el.dataset.v==='1';syncOutfit();rr()};

const tog=(k,l,s)=>`<div class="srow"><div><b>${l}</b>${s?`<small>${s}</small>`:''}</div><button class="sw ${S.settings[k]?'on':''}" data-act="toggle" data-k="${k}" aria-label="${l}"><i></i></button></div>`;
VIEWS.settings=()=>`<div class="screen enter">${status()}${hdr('Settings')}<div class="body" style="padding-top:2px"><div class="h3" style="margin-top:0">Daily goal</div><div class="hchips">${GOALS.map(([m])=>`<button class="hchip ${S.user.goal===m?'on':''}" data-act="setGoal" data-v="${m}">${m} min</button>`).join('')}</div>
  <div class="h3">Sound &amp; feel</div><div class="card2">${tog('sound','Sound effects')}${tog('haptics','Haptic vibrations')}${tog('voice','Bruno\'s voice','Bruno reads explanations aloud')}${tog('reminders','Practice reminders',notifSub())}${tog('calm','Reduce motion','No confetti or long animations')}</div>
  <div class="h3">Demo tools</div><div class="card2"><div class="srow"><div><b>Skip a day</b><small>Day ${S.day}. Watch cards come due and streaks react</small></div><button class="pgo" data-act="skipDay">+1 DAY</button></div><div class="srow"><div><b>Reset everything</b><small>Back to the start</small></div><button class="pgo warnb" data-act="resetAll">RESET</button></div></div></div></div>`;
ACT.toggle=el=>{const k=el.dataset.k;S.settings[k]=!S.settings[k];if(k==='voice'&&!S.settings.voice)hush();
  if(k==='reminders'&&S.settings.reminders){enableReminders();return}
  if(k==='sound'&&S.settings.sound)SFX.tap();
  rr()};
ACT.setGoal=el=>{S.user.goal=+el.dataset.v;rr()};
ACT.skipDay=()=>{advanceDay();toast('Day '+S.day+'. '+dueCards().length+' card(s) due');rr()};
ACT.resetAll=()=>{try{localStorage.removeItem(KEY)}catch(e){}S=fresh();syncOutfit();go('splash')};

/* ---------------- league (demo data) ---------------- */
VIEWS.league=function(){
  const mine=S.week.reduce((a,b)=>a+b,0),base=[260,230,200,170,150,130,110,90,70,40];
  const rows=LEAGUE_NAMES.map((n,i)=>({n,xp:base[i]+(i*7%13)})).concat([{n:(S.user.name||'You'),xp:mine,me:true}]).sort((a,b)=>b.xp-a.xp);
  return `<div class="screen enter">${status()}${hdr('Study League')}<div class="lg-hero"><div class="trophy">${trophyI}</div><h3>Bronze League</h3><small>Top 3 move up · demo data</small></div><div class="body" style="padding-top:0">${friendsCard()}<div style="height:12px"></div>${rows.map((r,i)=>`${i===3?'<div class="pz">PROMOTION ZONE ENDS</div>':''}<div class="lrank ${r.me?'me':''}"><span class="rk">${i+1}</span><span class="av">${esc(r.n[0])}</span><b>${esc(r.n)}</b><em>${r.xp} XP</em></div>`).join('')}</div></div>`};

VIEWS.badges=()=>`<div class="screen enter">${status()}${hdr('Badges')}<div class="body" style="padding-top:4px"><div class="bgrid">${BADGES.map(b=>`<div class="bcell">${badgeMedal(b)}<small class="bd">${b.desc}</small></div>`).join('')}</div></div></div>`;

/* ---------------- voice call with Bruno (demo replies) ---------------- */
const CALLQ=[];
VIEWS.call=()=>`<div class="screen center enter callscr">${status()}<div class="callhead"><button class="x" data-act="endCall" aria-label="End">${backI.replace('currentColor','#fff')}</button><div class="calltitle">Bruno <small>Demo conversation</small></div><span style="width:26px"></span></div>
  <div class="callbru">${bruno('idle')}</div><div class="callcap" id="cap">${CALLQ.length?esc(CALLQ[CALLQ.length-1]):'Hi! Ask me anything about '+esc(S.topic)+'.'}</div>
  <div class="callfoot"><button class="callmic" data-act="callMic" aria-label="Tap to speak">${micSvg}</button><div class="calltip">Tap to speak, or type below</div><div class="callin"><input id="cin" placeholder="Ask Bruno…" autocomplete="off"><button data-act="callSend">Send</button></div></div></div>`;
function brunoReply(q){q=q.toLowerCase();
  if(/green/.test(q))return 'Leaves look green because chlorophyll reflects green light and absorbs red and blue.';
  if(/oxygen|o2/.test(q))return 'Oxygen is released when the plant splits water molecules in the light reactions.';
  if(/sun|light|energy/.test(q))return 'Sunlight is the energy source. The plant stores it as chemical energy in glucose.';
  if(/quiz|test|practice/.test(q)){setTimeout(()=>{if(S.screen==='call')startSess('mixed')},1400);return "Let's do some mixed practice!"}
  if(/glucose|sugar/.test(q))return 'Glucose is the sugar the plant builds. Its formula is C six H twelve O six.';
  return 'Good question! The full version will answer anything about '+S.topic+'. For now, try asking why leaves are green.'}
function callAsk(q){q=(q||'').trim();if(!q)return;const r=brunoReply(q);CALLQ.push(r);const c=$('#cap');if(c)c.textContent=r;setMood('happy');say(r,{force:true,onend:()=>setMood('idle')})}
ACT.callSend=()=>{const i=$('#cin');callAsk(i.value);i.value=''};
ACT.callMic=()=>{setMood('listen');toast('Listening…');listenOnce(t=>{callAsk(t)},()=>{setMood('idle');toast('Mic unavailable. Type your question.')})};
ACT.endCall=()=>{hush();go('home',{tab:'practice'})};

/* ---------------- Bruno Plus (design only) ---------------- */
VIEWS.plus=()=>`<div class="screen center enter plus">${status()}<div class="callhead"><button class="x" data-act="back" aria-label="Close">${backI.replace('currentColor','#fff')}</button><div style="flex:1"></div></div>
  <div class="plusbru">${bruno('cheer')}</div><h2 class="ptitle">Bruno <span>Plus</span></h2><ul class="pben">${['Live voice calls with Bruno','Unlimited topics, built in seconds','Scan notes and past papers into your map','Offline review'].map(t=>`<li>${tick.replace('style="','style="width:18px;height:18px;')}${t}</li>`).join('')}</ul>
  <div class="plans"><div class="plan">Monthly<b>$9.99</b></div><div class="plan sel"><em>MOST POPULAR</em>Yearly<b>$59.99</b></div></div><div style="width:100%;padding:0 24px 22px"><button class="btn" data-act="plusGo" style="background:#fff;color:#12304B;box-shadow:0 4px 0 #BFD0DE">Try free for 7 days</button><button class="nothx" data-act="back">NO THANKS</button></div></div>`;
ACT.plusGo=()=>toast('Demo only. Payments come with the backend.');

/* ---------------- overlays: explain + ask sheet ---------------- */
OVERLAYS.explain=d=>`<div class="scrim" data-act="closeExplain"><div class="sheet" onclick="event.stopPropagation()"><div class="grab"></div><div class="exrow">${bruno(d.ok?'happy':'think')}<div class="bubble">${esc(d.why||'Good thinking.')}${d.model?`<br><br><b>Model answer:</b> ${esc(d.model)}`:''}</div></div><button class="btn" data-act="closeExplain">Got it</button></div></div>`;
ACT.closeExplain=()=>{hush();closeOv()};
OVERLAYS.ask=()=>`<div class="scrim" data-act="closeOv"><div class="sheet" onclick="event.stopPropagation()"><div class="grab"></div>${bruno('listen')}<h3>What do you want to learn?</h3>${composer()}<button class="btn ghost" data-act="callFromSheet" style="margin-top:14px">Talk with Bruno instead</button></div></div>`;
ACT.ask=()=>openOv('ask');
ACT.callFromSheet=()=>{S.overlay=null;go('call')};

/* ---------------- after-render hooks ---------------- */
function afterRender(){
  try{document.documentElement.classList.toggle('calm',calm())}catch(e){}
  if(S.screen==='building')runBuild();
  if(S.screen==='visual')fillVisual();
  if(S.screen==='reveal'||(S.screen==='result'&&S.sess&&S.sess.mode==='diag'))revealFx();
  if(S.screen==='lesson'){const it=it_();
    const tr=$('#track');if(tr&&!it.checked){const setV=ev=>{const r=tr.getBoundingClientRect();let p=Math.min(1,Math.max(0,(ev.clientX-r.left)/r.width));let v=it.min+p*(it.max-it.min);v=Math.round(v/it.step)*it.step;it.val=v;it.touched=true;const pp=(v-it.min)/(it.max-it.min)*100;$('#marker').style.left=pp+'%';tr.querySelector('.fillbar').style.width=pp+'%';$('.bigval').firstChild.nodeValue=v;const c=$('#chk');if(c)c.disabled=false};
      let down=false;tr.onpointerdown=e=>{down=true;tr.setPointerCapture(e.pointerId);setV(e)};tr.onpointermove=e=>{if(down)setV(e)};tr.onpointerup=()=>{down=false}}}
  if(S.screen==='result'&&S.sess&&S.sess.mode!=='diag'){const s=S.sess;if(!calm()&&(done()||((s.mode==='learn'||s.mode==='revisit')&&s.after>s.before)))confetti()}
  if(S.screen==='streakx'&&!calm())confetti(30);
  if(S.overlay==='ask'||S.screen==='topic'){const i=$('#topic');if(i&&S.overlay==='ask')i.focus()}
}
