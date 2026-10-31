/* ---------- tiny helpers ---------- */
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const pick=a=>a[Math.random()*a.length|0];
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const norm=s=>String(s).toLowerCase().replace(/[^a-z0-9₂₆₁ ]/g,' ').replace(/\s+/g,' ').trim();
function lev(a,b){const m=[];for(let i=0;i<=a.length;i++){m[i]=[i];}for(let j=1;j<=b.length;j++)m[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return m[a.length][b.length]}

/* ---------- state (persisted in localStorage when available) ---------- */
const KEY='bruno.app.v1';
const fresh=()=>({
  screen:'splash',tab:'learn',overlay:null,ov:null,
  user:{name:'',level:'new',goal:10,commit:5,outfit:{scarf:'#43C0F6',hat:'none',glasses:false},owned:{},notif:true},
  topic:TOPIC,started:false,day:0,lastActive:-1,
  mastery:{},knew:{},srs:{},mistakes:[],
  xp:0,gems:50,streak:0,freezes:1,boost:false,todayXp:0,week:[0,0,0,0,0,0,0],weekIdx:0,doneToday:0,
  stats:{},conf:{sure:[0,0],unsure:[0,0]},
  quests:{claimed:{},review:0,bestCombo:0,teach:0},badges:{},chestOpen:{},
  settings:{sound:true,haptics:true,voice:true,reminders:true},
  hint:'',sess:null,vis:null,buildErr:''
});
let S=fresh();
function load(){try{const j=JSON.parse(localStorage.getItem(KEY));if(j&&j.v===1){const f=fresh(),sv=j.s||{};for(const k in sv){const d=f[k];if(sv[k]===null||sv[k]===undefined||(d!==undefined&&(typeof d!==typeof sv[k]||Array.isArray(d)!==Array.isArray(sv[k]))))delete sv[k]}
    for(const k of ['user','quests','settings','conf'])if(sv[k]&&typeof sv[k]==='object')sv[k]={...f[k],...sv[k]};
    S={...f,...sv,sess:null,overlay:null,ov:null,hint:'',buildErr:''};}}catch(e){}}
function save(){try{const{sess,overlay,ov,hint,...rest}=S;localStorage.setItem(KEY,JSON.stringify({v:1,s:rest}))}catch(e){}}
function syncOutfit(){window.OUT={...S.user.outfit}}
syncOutfit();

/* ---------- derived values ---------- */
const mastery=id=>S.mastery[id]||0;
const cov=()=>Math.round(C.reduce((n,c)=>n+mastery(c.id),0)/(C.length*2)*100);
const cur=()=>C.find(c=>mastery(c.id)===0)||C.find(c=>mastery(c.id)===1)||null;
const done=()=>cov()===100;
const kindStat=k=>S.stats[k]||[0,0];
function insights(){const a=Object.entries(S.stats).filter(([k,v])=>v[1]>=2).map(([k,v])=>({k,r:v[0]/v[1]}));if(a.length<2)return null;a.sort((x,y)=>x.r-y.r);return{weak:a[0],strong:a[a.length-1]}}
const weakKind=()=>{const i=insights();return i&&i.weak.r<0.8?i.weak.k:null};

/* ---------- sound (WebAudio blips) + haptics ---------- */
let AC;
function tone(f,d=.12,t=0,type='sine',g=.07){if(!S.settings.sound)return;try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),v=AC.createGain();o.type=type;o.frequency.value=f;v.gain.setValueAtTime(g,AC.currentTime+t);v.gain.exponentialRampToValueAtTime(.0001,AC.currentTime+t+d);o.connect(v);v.connect(AC.destination);o.start(AC.currentTime+t);o.stop(AC.currentTime+t+d+.02)}catch(e){}}
const SFX={
  tap:()=>tone(520,.05,0,'triangle',.04),
  ok:()=>{tone(660,.1);tone(880,.16,.09)},
  bad:()=>{tone(220,.18,0,'sawtooth',.05);tone(165,.22,.12,'sawtooth',.05)},
  win:()=>[523,659,784,1047].forEach((f,i)=>tone(f,.18,i*.1)),
  coin:()=>{tone(988,.07,0,'square',.04);tone(1319,.14,.07,'square',.04)}
};
const buzz=ms=>{if(S.settings.haptics&&navigator.vibrate)try{navigator.vibrate(ms)}catch(e){}};

/* ---------- Bruno's voice: speech synthesis, mouth moves while talking ---------- */
let VOICE=null;
function pickVoice(){const vs=speechSynthesis.getVoices();VOICE=vs.find(v=>/Samantha|Google US English|Aria|Jenny|Karen|Moira/i.test(v.name))||vs.find(v=>/^en/i.test(v.lang))||null}
if('speechSynthesis' in window){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}
function mouth(on){$$('.bruno').forEach(b=>b.classList.toggle('talking',on))}
function sayBrowser(text,{onend}={}){
  if(!('speechSynthesis' in window)){mouth(true);setTimeout(()=>{mouth(false);onend&&onend()},Math.min(4000,text.length*55));return}
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);if(VOICE)u.voice=VOICE;u.rate=1.02;u.pitch=1.15;
    u.onstart=()=>mouth(true);u.onend=u.onerror=()=>{mouth(false);onend&&onend()};speechSynthesis.speak(u)}
  catch(e){mouth(false)}}
/* Bruno's real voice comes from ElevenLabs (POST /api/tts). Each sentence is fetched once and cached.
   If the voice service fails, Bruno falls back to the browser's own voice. */
let AUD=null,SAYING=null;const TTS_CACHE=new Map();
function say(text,{force=false,onend}={}){
  if(!S.settings.voice&&!force){mouth(true);setTimeout(()=>{mouth(false);onend&&onend()},Math.min(4000,text.length*55));return}
  hush();const me={};SAYING=me;
  let p=TTS_CACHE.get(text);
  if(!p){p=fetch('/api/tts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})})
    .then(r=>{if(!r.ok)throw new Error('voice');return r.blob()}).then(b=>URL.createObjectURL(b));TTS_CACHE.set(text,p)}
  p.then(u=>{if(SAYING!==me)return;AUD=new Audio(u);AUD.onplay=()=>mouth(true);AUD.onended=AUD.onerror=()=>{mouth(false);onend&&onend()};return AUD.play()})
   .catch(()=>{TTS_CACHE.delete(text);if(SAYING===me)sayBrowser(text,{onend})})}
const hush=()=>{SAYING=null;try{if(AUD){AUD.pause();AUD=null}}catch(e){}try{speechSynthesis.cancel()}catch(e){}mouth(false)};
function listenOnce(cb,fail){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){fail&&fail('unsupported');return}
  try{const r=new SR();r.lang='en-US';r.interimResults=false;r.onresult=e=>cb(e.results[0][0].transcript);r.onerror=()=>fail&&fail('error');r.onend=()=>{};r.start();return r}catch(e){fail&&fail('error')}}

/* ---------- spaced repetition (simplified FSRS-style: difficulty ignored, stability + retrievability) ---------- */
const retr=c=>Math.pow(0.9,(S.day-c.last)/Math.max(.3,c.S));               // 90% recall exactly when S days have passed
const cardState=id=>S.srs[id];
const isDue=c=>S.day>=c.due;
const strengthDots=c=>Math.max(0,Math.min(5,Math.ceil(retr(c)*5)));
function nextInterval(c,rating){const R=c?retr(c):1,s=c?c.S:.5;if(rating===0)return 1;const ns=rating===2?s*3+.5*(1-R):s*2.2+.5*(1-R);return Math.max(1,Math.round(ns))}
function srsReview(id,rating){
  let c=S.srs[id];if(!c)c=S.srs[id]={S:.5,last:S.day,due:S.day,reps:0,lapses:0};
  const R=retr(c);
  if(rating===0){c.S=Math.max(.4,c.S*.4);c.lapses++;c.due=S.day+1}
  else{c.S=rating===2?c.S*3+.5*(1-R):c.S*2.2+.5*(1-R);c.due=S.day+Math.max(1,Math.round(c.S))}
  c.last=S.day;c.reps++;save()}
function enrollCards(cid){C.find(c=>c.id===cid).cards.forEach(k=>{if(!S.srs[k.id])S.srs[k.id]={S:.5,last:S.day,due:S.day+1,reps:0,lapses:0}})}
const dueCards=()=>Object.entries(S.srs).filter(([id,c])=>isDue(c)).sort((a,b)=>retr(a[1])-retr(b[1])).map(([id])=>cardById(id)).filter(Boolean);
const nextDueIn=()=>{const l=Object.values(S.srs).filter(c=>!isDue(c)).map(c=>c.due-S.day);return l.length?Math.min(...l):null};

/* ---------- quests, badges, streak, day clock ---------- */
const QUESTS=()=>[
  {id:'xp',t:'Earn 30 XP',goal:30,val:S.todayXp,gems:20},
  {id:'review',t:'Review 5 cards',goal:5,val:S.quests.review,gems:20},
  {id:'combo',t:'Get 5 correct in a row',goal:5,val:S.quests.bestCombo,gems:30}
];
const MONTHLY=()=>({t:'Explorer quest',desc:'Cover every marker of '+TOPIC,goal:C.length*2,val:C.reduce((n,c)=>n+mastery(c.id),0)});
function unlock(id){if(S.badges[id])return;S.badges[id]=S.day+1;const b=BADGES.find(x=>x.id===id);S.gems+=10;toast('Badge unlocked: '+b.name);SFX.coin();save()}
function checkBadges(){if(cov()>=50)unlock('cover50');if(done())unlock('cover100');if(S.streak>=3)unlock('streak3');if(S.quests.review>=10)unlock('review10');if(S.quests.bestCombo>=5)unlock('combo5')}
function addXp(n){if(S.boost&&n>=10){n*=2;S.boost=false}S.xp+=n;S.todayXp+=n;S.week[S.weekIdx%7]=(S.week[S.weekIdx%7]||0)+n;return n}
function touchStreak(){if(S.lastActive===S.day)return false;const first=S.lastActive!==S.day;S.lastActive=S.day;S.streak++;checkBadges();return first}
function advanceDay(){S.day++;S.weekIdx++;S.week[S.weekIdx%7]=0;S.todayXp=0;S.quests.review=0;S.quests.bestCombo=0;S.quests.claimed={};
  if(S.streak>0&&S.lastActive!==-1&&S.lastActive<S.day-1){if(S.freezes>0){S.freezes--;toast('Streak Freeze saved your streak')}else S.streak=0}
  save()}

/* ---------- toast, confetti ---------- */
function toast(t){const p=$('#phone');if(!p)return;const e=document.createElement('div');e.className='toast';e.textContent=t;p.appendChild(e);setTimeout(()=>e.remove(),2600)}
function confetti(n=46){const cols=['#43C0F6','#FFC800','#58CC02','#FF9600','#CE82FF','#FF4B4B'],p=$('#phone');
  for(let i=0;i<n;i++){const d=document.createElement('div');d.className='conf';d.style.left=Math.random()*100+'%';d.style.background=cols[i%6];d.style.animationDuration=(1.8+Math.random()*1.6)+'s';d.style.animationDelay=Math.random()*.5+'s';p.appendChild(d);setTimeout(()=>d.remove(),4200)}}

/* ---------- navigation ---------- */
const VIEWS={},OVERLAYS={},ACT={};
let ANIM=true;
function go(screen,opts={}){hush();S.screen=screen;S.overlay=null;if(opts.tab)S.tab=opts.tab;ANIM=true;render()}
function openOv(name,data){S.overlay=name;S.ov=data||null;ANIM=false;render()}
function closeOv(){S.overlay=null;S.ov=null;ANIM=false;render()}
function render(){
  const v=VIEWS[S.screen];if(!v){S.screen='home';return render()}
  let h=v();if(!ANIM)h=h.replace(/(class="screen[^"]*?) enter/,'$1');
  const app=$('#app');app.innerHTML=h+(S.overlay?OVERLAYS[S.overlay](S.ov):'');
  ANIM=true;
  if(typeof afterRender==='function')afterRender();
  save()}
