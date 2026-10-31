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
  user:{setup:false,name:'',level:'new',goal:10,commit:5,outfit:{scarf:'#43C0F6',hat:'none',glasses:false},owned:{},notif:true},
  topic:TOPIC,started:false,day:0,lastActive:-1,
  mastery:{},knew:{},srs:{},mistakes:[],
  xp:0,gems:50,streak:0,freezes:1,boost:false,todayXp:0,week:[0,0,0,0,0,0,0],weekIdx:0,doneToday:0,
  stats:{},conf:{sure:[0,0],unsure:[0,0]},
  quests:{claimed:{},review:0,bestCombo:0,teach:0},badges:{},chestOpen:{},
  settings:{sound:true,haptics:true,voice:true,reminders:true},
  hint:'',sess:null,events:[],vis:null,buildErr:'',pendingTopic:'',visSeen:false,afterVisual:''
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
function say(text,{force=false,onend}={}){
  const browserTTS=()=>{
  if(!('speechSynthesis' in window)||(!S.settings.voice&&!force)){mouth(true);setTimeout(()=>{mouth(false);onend&&onend()},Math.min(4000,text.length*55));return}
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);if(VOICE)u.voice=VOICE;u.rate=1.02;u.pitch=1.15;
    u.onstart=()=>mouth(true);u.onend=u.onerror=()=>{mouth(false);onend&&onend()};speechSynthesis.speak(u)}
  catch(e){mouth(false)}};
  if(typeof API!=='undefined'&&API.configuredSpeech()&&(S.settings.voice||force)){
    try{speechSynthesis.cancel()}catch(e){}
    API.speak(text,{onend}).then(ok=>{if(!ok)browserTTS()},()=>browserTTS());return}
  browserTTS()}
const hush=()=>{try{speechSynthesis.cancel()}catch(e){}try{typeof API!=='undefined'&&API.stop()}catch(e){}mouth(false)};
function listenOnce(cb,fail){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){fail&&fail('unsupported');return}
  try{const r=new SR();r.lang='en-US';r.interimResults=false;r.onresult=e=>cb(e.results[0][0].transcript);r.onerror=()=>fail&&fail('error');r.onend=()=>{};r.start();return r}catch(e){fail&&fail('error')}}

/* ---------- spaced repetition: FSRS-4.5 (difficulty D, stability S, retrievability R), target retention 0.9 ---------- */
const FSRS_W=[0.5701,1.4436,4.1386,10.9355,5.1443,1.2006,0.8627,0.0362,1.629,0.1342,1.0166,2.1174,0.0839,0.3204,1.4676,0.219,2.8237];
const FSRS_RET=0.9,FSRS_F=19/81;
const fsrsG=r=>r===0?1:r===2?4:3;                                            // app rating 0/1/2 -> FSRS again/good/easy
const clampD=d=>Math.min(10,Math.max(1,d));
const fsrsD0=g=>clampD(FSRS_W[4]-FSRS_W[5]*(g-3));
const retr=c=>Math.pow(1+FSRS_F*Math.max(0,S.day-c.last)/Math.max(.3,c.S),-.5);   // exactly 0.9 when t==S
const cardState=id=>S.srs[id];
const isDue=c=>S.day>=c.due;
const strengthDots=c=>Math.max(0,Math.min(5,Math.ceil(retr(c)*5)));
function fsrsNext(c,rating){                                                  // pure: returns {S,d,lapse}
  const W=FSRS_W,g=fsrsG(rating);
  if(!c||!(c.reps>0))return{S:W[g-1],d:fsrsD0(g),lapse:false};                // first real review
  const D=clampD(typeof c.d==='number'&&isFinite(c.d)?c.d:fsrsD0(3)),s=Math.max(.3,c.S),R=retr(c);
  const d=clampD(W[7]*fsrsD0(3)+(1-W[7])*(D-W[6]*(g-3)));
  if(g===1){const sf=W[11]*Math.pow(D,-W[12])*(Math.pow(s+1,W[13])-1)*Math.exp(W[14]*(1-R));
    return{S:Math.max(.4,Math.min(s,sf)),d,lapse:true}}
  const k=Math.exp(W[8])*(11-D)*Math.pow(s,-W[9])*(Math.exp(W[10]*(1-R))-1)*(g===4?W[16]:1);
  return{S:s*(1+k),d,lapse:false}}
const fsrsIvl=(ns,lapse)=>lapse?1:Math.max(1,Math.round(ns/FSRS_F*(Math.pow(FSRS_RET,-2)-1)));
function nextInterval(c,rating){const n=fsrsNext(c,rating);return fsrsIvl(n.S,n.lapse)}
function srsReview(id,rating){
  let c=S.srs[id];if(!c)c=S.srs[id]={S:FSRS_W[0],last:S.day,due:S.day,reps:0,lapses:0};
  const n=fsrsNext(c,rating);
  c.S=n.S;c.d=n.d;if(n.lapse)c.lapses++;c.due=S.day+fsrsIvl(n.S,n.lapse);
  c.last=S.day;c.reps++;save()}
function enrollCards(cid){C.find(c=>c.id===cid).cards.forEach(k=>{if(!S.srs[k.id])S.srs[k.id]={S:FSRS_W[0],d:fsrsD0(3),last:S.day,due:S.day+1,reps:0,lapses:0}})}
const dueCards=()=>Object.entries(S.srs).filter(([id,c])=>isDue(c)).sort((a,b)=>retr(a[1])-retr(b[1])).map(([id])=>cardById(id)).filter(Boolean);
const nextDueIn=()=>{const l=Object.values(S.srs).filter(c=>!isDue(c)).map(c=>c.due-S.day);return l.length?Math.min(...l):null};

/* ---------- analytics (persisted in S.events, capped) ---------- */
function track(name,props){if(!Array.isArray(S.events))S.events=[];S.events.push({t:Date.now(),day:S.day,name,props:props||{}});if(S.events.length>300)S.events.splice(0,S.events.length-300);save()}
function eventSummary(){const m={};
  for(const e of (S.events||[])){const p=e.props||{},k=p.kind;if(!k||typeof p.correct==='undefined')continue;
    const o=m[k]||(m[k]={kind:k,n:0,ok:0,ms:0,nms:0});o.n++;if(p.correct)o.ok++;
    const t=p.ms!=null?p.ms:p.rt;if(typeof t==='number'&&isFinite(t)){o.ms+=t;o.nms++}}
  return Object.values(m).map(o=>({kind:o.kind,n:o.n,accuracy:o.n?o.ok/o.n:0,avgMs:o.nms?Math.round(o.ms/o.nms):null}))}

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
