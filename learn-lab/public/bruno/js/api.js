/* ---------- Bruno API layer ----------
 * Mock mode (BRUNO_CONFIG.mock !== false, or no apiBase): everything resolves locally.
 * Real mode (mock:false && apiBase): POST JSON to apiBase + path.
 *
 * Backend JSON contract
 *  POST {apiBase}/grade
 *    req : {question:string, rubric:{keywords:string[][], model_answer:string}, answer:string}
 *          (keywords = list of groups; a group is satisfied when ANY synonym in it appears)
 *    res : {score:number 0..1, feedback:string, matched:string[]}   // matched = hit keyword(s) per group
 *  POST {apiBase}/topic
 *    req : {name:string}
 *    res : topic object matching the schema in data.js (title/name, concepts C[] with cards, etc.) or null
 *  POST {apiBase}/map
 *    req : {name:string, priorKnowledge:any}
 *    res : {known:string[], gaps:string[], start:string}  (stub; shape may evolve)
 *  Speech: POST {apiBase}/speak {text} -> audio/mpeg (backend calls ElevenLabs; the key stays server-side, never in the app)
 *     *    API.speak resolves false when unconfigured or on failure so caller can fall back.
 * All functions are async and never throw; on network failure they fall back to mock behaviour.
 */
(function(){
  const cfg=()=>window.BRUNO_CONFIG||{};
  const real=()=>cfg().mock===false&&!!cfg().apiBase;
  async function post(path,body){
    const r=await fetch(cfg().apiBase.replace(/\/$/,'')+path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    if(!r.ok)throw new Error('HTTP '+r.status);return r.json();
  }
  const N=s=>String(s==null?'':s).toLowerCase().replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
  const L=(a,b)=>{const m=[];for(let i=0;i<=a.length;i++)m[i]=[i];for(let j=1;j<=b.length;j++)m[0][j]=j;for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)m[i][j]=Math.min(m[i-1][j]+1,m[i][j-1]+1,m[i-1][j-1]+(a[i-1]===b[j-1]?0:1));return m[a.length][b.length]};
  function hit(ans,kw){
    const k=N(kw);if(!k)return false;
    if((' '+ans+' ').includes(' '+k+' ')||ans.includes(k))return true;
    const words=ans.split(' '),kn=k.split(' ').length,tol=k.length>=8?2:k.length>=4?1:0;
    if(!tol)return false;
    for(let i=0;i+kn<=words.length;i++)if(L(words.slice(i,i+kn).join(' '),k)<=tol)return true;
    return false;
  }
  function mockGrade({rubric,answer}){
    const groups=(rubric&&rubric.keywords)||[],a=N(answer),matched=[];
    groups.forEach(g=>{const f=(Array.isArray(g)?g:[g]).find(k=>hit(a,k));if(f!==undefined)matched.push(f)});
    const score=groups.length?matched.length/groups.length:0;
    const feedback=score>=.99?'Spot on!':score>=.5?'Good, you got '+matched.length+' of '+groups.length+' key ideas. Model answer: '+((rubric&&rubric.model_answer)||''):score>0?'Partly there. Model answer: '+((rubric&&rubric.model_answer)||''):'Not quite. Model answer: '+((rubric&&rubric.model_answer)||'');
    return{score,feedback,matched};
  }
  let audio=null;
  const API={
    async gradeAnswer(req){
      if(real()){try{return await post('/grade',req)}catch(e){}}
      return mockGrade(req||{});
    },
    async generateTopic(name){
      if(real()){try{return await post('/topic',{name})}catch(e){}}
      return null;
    },
    async mapTopic(name,priorKnowledge){
      if(real()){try{return await post('/map',{name,priorKnowledge})}catch(e){}}
      return{known:[],gaps:[],start:null};
    },
    configuredSpeech(){return real()},
    stop(){try{if(audio){audio.pause();audio=null}}catch(e){}},
    async speak(text,opts={}){
      if(!real()||typeof Audio==='undefined')return false;
      try{
        const r=await fetch(cfg().apiBase+'/speak',{method:'POST',headers:{'Content-Type':'application/json',Accept:'audio/mpeg'},body:JSON.stringify({text})});
        if(!r.ok)return false;
        const url=URL.createObjectURL(await r.blob());
        API.stop();const a=audio=new Audio(url);
        const m=on=>{try{if(typeof mouth==='function')mouth(on)}catch(e){}};
        const fin=()=>{m(false);URL.revokeObjectURL(url);if(audio===a)audio=null;opts.onend&&opts.onend()};
        a.onplay=()=>m(true);a.onended=fin;a.onerror=fin;a.onpause=()=>m(false);
        await a.play();return true;
      }catch(e){try{if(typeof mouth==='function')mouth(false)}catch(_){}return false}
    }
  };
  window.API=API;
})();
