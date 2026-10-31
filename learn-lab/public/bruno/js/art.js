/* ---------- illustrations ---------- */
const ART={
sun:`<svg viewBox="0 0 240 130"><g stroke="#FFC800" stroke-width="5" stroke-linecap="round"><path d="M56 12v8M56 70v8M23 45h8M81 45h8M33 22l6 6M73 62l6 6M79 22l-6 6M39 62l-6 6"/></g><circle cx="56" cy="45" r="19" fill="#FFC800"/><path d="M86 56L148 84" stroke="#FFC800" stroke-width="4.5" stroke-dasharray="1 10" stroke-linecap="round"/><path d="M150 106C150 74 172 52 210 48c0 36-20 58-60 58z" fill="#58CC02"/><path d="M153 104l36-36" stroke="#46A302" stroke-width="4" stroke-linecap="round"/><text x="120" y="124" text-anchor="middle" font-size="12" fill="#1899D6">light in → stored energy</text></svg>`,
chloro:`<svg viewBox="0 0 240 130"><rect x="46" y="10" width="148" height="96" rx="38" fill="#fff" stroke="#84D8FF" stroke-width="4"/><g transform="rotate(-18 100 54)"><ellipse cx="100" cy="54" rx="26" ry="15" fill="#58CC02"/><path d="M84 54h32M87 48h26M87 60h26" stroke="#46A302" stroke-width="3" stroke-linecap="round"/></g><g transform="rotate(16 148 76)"><ellipse cx="148" cy="76" rx="22" ry="13" fill="#58CC02"/><path d="M134 76h28M137 71h22" stroke="#46A302" stroke-width="3" stroke-linecap="round"/></g><circle cx="86" cy="86" r="6" fill="#FFC800"/><text x="120" y="124" text-anchor="middle" font-size="12" fill="#1899D6">chloroplasts inside a leaf cell</text></svg>`,
chlorophyll:`<svg viewBox="0 0 240 130"><path d="M70 126c0-36 28-58 100-60 0 44-38 62-100 60z" fill="#58CC02"/><path d="M28 6L92 82" stroke="#FF4B4B" stroke-width="5" stroke-linecap="round"/><path d="M88 4L120 78" stroke="#1CB0F6" stroke-width="5" stroke-linecap="round"/><path d="M168 76L222 12" stroke="#58CC02" stroke-width="5" stroke-linecap="round" stroke-dasharray="1 9"/><text x="24" y="28" font-size="11" fill="#FF4B4B">red</text><text x="98" y="22" font-size="11" fill="#1899D6">blue</text><text x="134" y="24" font-size="11" fill="#46A302">green</text><text x="134" y="36" font-size="11" fill="#46A302">bounces off</text></svg>`,
inputs:`<svg viewBox="0 0 240 130"><path d="M120 24v60" stroke="#46A302" stroke-width="6" stroke-linecap="round"/><path d="M120 44c-30-2-42-22-42-30 30 0 44 12 42 30zM120 60c30-2 42-22 42-30-30 0-44 12-42 30z" fill="#58CC02"/><path d="M120 84v14M120 92l-18 12M120 92l18 12" stroke="#B07A4E" stroke-width="4" stroke-linecap="round" fill="none"/><path d="M64 98s8 9 8 15a8 8 0 0 1-16 0c0-6 8-15 8-15z" fill="#1CB0F6"/><path d="M78 108l16 0" stroke="#1CB0F6" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="1 7"/><circle cx="196" cy="40" r="17" fill="#fff" stroke="#AFAFAF" stroke-width="3"/><text x="196" y="45" text-anchor="middle" font-size="12" fill="#777">CO₂</text><path d="M178 42L164 40" stroke="#AFAFAF" stroke-width="3.5" stroke-linecap="round" stroke-dasharray="1 7"/><text x="48" y="126" font-size="11" fill="#1899D6">water</text><text x="146" y="104" font-size="11" fill="#1899D6">via roots</text></svg>`,
outputs:`<svg viewBox="0 0 240 130"><path d="M24 112c0-36 24-58 66-62 0 40-24 64-66 62z" fill="#58CC02"/><path d="M104 80h36M134 71l9 9-9 9" stroke="#AFAFAF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M182 42l28 15v30l-28 15-28-15V57z" fill="#fff" stroke="#FF9600" stroke-width="4" stroke-linejoin="round"/><path d="M154 57l28 15 28-15M182 72v30" stroke="#FF9600" stroke-width="3" fill="none"/><circle cx="46" cy="22" r="11" fill="#fff" stroke="#84D8FF" stroke-width="3"/><text x="46" y="26" text-anchor="middle" font-size="10" fill="#1899D6">O₂</text><circle cx="72" cy="12" r="7" fill="#fff" stroke="#84D8FF" stroke-width="3"/><circle cx="26" cy="40" r="6" fill="#fff" stroke="#84D8FF" stroke-width="3"/><text x="182" y="125" text-anchor="middle" font-size="11" fill="#D9A500">glucose</text></svg>`,
stages:`<svg viewBox="0 0 240 130"><rect x="10" y="22" width="98" height="78" rx="18" fill="#fff" stroke="#FFC800" stroke-width="4"/><circle cx="59" cy="48" r="10" fill="#FFC800"/><text x="59" y="76" text-anchor="middle" font-size="12" fill="#D9A500">1 Light</text><text x="59" y="90" text-anchor="middle" font-size="12" fill="#D9A500">reactions</text><path d="M114 61h14M122 53l8 8-8 8" stroke="#AFAFAF" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" fill="none"/><rect x="134" y="22" width="98" height="78" rx="18" fill="#fff" stroke="#58CC02" stroke-width="4"/><path d="M183 38l10 5v11l-10 5-10-5V43z" fill="#FF9600"/><text x="183" y="76" text-anchor="middle" font-size="12" fill="#58A700">2 Calvin</text><text x="183" y="90" text-anchor="middle" font-size="12" fill="#58A700">cycle</text></svg>`
};


/* small picture options for "select the correct image" */
const OPT={
 sun:`<svg viewBox="0 0 100 80"><g stroke="#FFC800" stroke-width="5" stroke-linecap="round"><path d="M50 6v8M50 66v8M16 40h8M76 40h8M26 16l6 6M68 58l6 6M74 16l-6 6M32 58l-6 6"/></g><circle cx="50" cy="40" r="17" fill="#FFC800"/></svg>`,
 moon:`<svg viewBox="0 0 100 80"><path d="M62 12a28 28 0 1 0 14 52A24 24 0 0 1 62 12z" fill="#B9C6D6"/></svg>`,
 drop:`<svg viewBox="0 0 100 80"><path d="M50 8s20 22 20 38a20 20 0 0 1-40 0c0-16 20-38 20-38z" fill="#1CB0F6"/></svg>`,
 bolt:`<svg viewBox="0 0 100 80"><path d="M58 4L30 44h18l-6 32 28-42H52z" fill="#FF9600"/></svg>`,
 pore:`<svg viewBox="0 0 100 80"><path d="M10 40c0-18 22-26 40-26s40 8 40 26-22 26-40 26-40-8-40-26z" fill="#58CC02"/><ellipse cx="50" cy="40" rx="14" ry="8" fill="#fff"/></svg>`,
 root:`<svg viewBox="0 0 100 80"><path d="M50 6v32M50 30L26 64M50 38v34M50 30l24 34" stroke="#B07A4E" stroke-width="6" stroke-linecap="round" fill="none"/></svg>`,
 flower:`<svg viewBox="0 0 100 80"><g fill="#FF86C8"><circle cx="50" cy="22" r="12"/><circle cx="68" cy="36" r="12"/><circle cx="32" cy="36" r="12"/><circle cx="42" cy="56" r="12"/><circle cx="58" cy="56" r="12"/></g><circle cx="50" cy="40" r="10" fill="#FFC800"/></svg>`,
 stem:`<svg viewBox="0 0 100 80"><rect x="42" y="4" width="16" height="72" rx="8" fill="#46A302"/></svg>`
};


/* ---- art for the extra topics (French Revolution, Python) ---- */
const _plate=(body,cap)=>`<svg viewBox="0 0 240 130">${body}<text x="120" y="124" text-anchor="middle" font-size="12" fill="#1899D6">${cap}</text></svg>`;
const _code=(lines,cap)=>_plate(`<rect x="30" y="8" width="180" height="94" rx="12" fill="#2B3A4A"/><g font-family="monospace" font-size="13" fill="#fff">${lines.map((l,i)=>`<text x="44" y="${32+i*22}">${l}</text>`).join('')}</g>`,cap);
const _est=(x,col,lab)=>`<rect x="${x}" y="30" width="62" height="64" rx="12" fill="#fff" stroke="${col}" stroke-width="4"/><text x="${x+31}" y="68" text-anchor="middle" font-size="12" fill="${col}">${lab}</text>`;
Object.assign(ART,{
fr_old:_plate(_est(14,'#1CB0F6','1st')+_est(89,'#CE82FF','2nd')+_est(164,'#FF9600','3rd')+'<text x="45" y="20" text-anchor="middle" font-size="10" fill="#777">clergy</text><text x="120" y="20" text-anchor="middle" font-size="10" fill="#777">nobility</text><text x="195" y="20" text-anchor="middle" font-size="10" fill="#777">commoners</text>','the three Estates'),
fr_sts:_plate('<path d="M30 100V50l22-16 22 16v50zM46 100V74h12v26" fill="#fff" stroke="#AFAFAF" stroke-width="4" stroke-linejoin="round"/><path d="M96 92l26-52 26 52z" fill="#fff" stroke="#FFC800" stroke-width="4" stroke-linejoin="round"/><circle cx="196" cy="62" r="24" fill="#fff" stroke="#FF4B4B" stroke-width="4"/><text x="196" y="67" text-anchor="middle" font-size="13" fill="#FF4B4B">14 Jul</text>','Assembly, oath, Bastille'),
fr_rights:_plate('<rect x="28" y="16" width="54" height="80" rx="4" fill="#1CB0F6"/><rect x="82" y="16" width="54" height="80" fill="#fff" stroke="#E5E5E5" stroke-width="2"/><rect x="136" y="16" width="54" height="80" rx="4" fill="#FF4B4B"/><text x="210" y="60" text-anchor="middle" font-size="22" fill="#FFC800">1789</text>','the tricolour'),
fr_fall:_plate('<path d="M70 94l8-46h44l8 46z" fill="#FFC800" stroke="#D9A500" stroke-width="3" stroke-linejoin="round"/><path d="M70 48l12 14 14-24 14 24 12-14" fill="none" stroke="#D9A500" stroke-width="3" stroke-linejoin="round"/><path d="M160 90l30-34M190 90l-30-34" stroke="#FF4B4B" stroke-width="6" stroke-linecap="round"/><text x="175" y="26" text-anchor="middle" font-size="12" fill="#777">1792-93</text>','the crown falls'),
fr_terror:_plate('<rect x="86" y="14" width="10" height="82" rx="3" fill="#B07A4E"/><rect x="144" y="14" width="10" height="82" rx="3" fill="#B07A4E"/><rect x="80" y="12" width="80" height="10" rx="3" fill="#B07A4E"/><path d="M104 34h32l-4 24h-24z" fill="#AFAFAF" stroke="#777" stroke-width="3" stroke-linejoin="round"/><rect x="70" y="94" width="100" height="8" rx="3" fill="#E5E5E5"/>','1793-94'),
fr_nap:_plate('<path d="M70 70c0-30 20-44 50-44s50 14 50 44c-14-6-26-8-50-8s-36 2-50 8z" fill="#2B3A4A"/><path d="M82 70h76v16H82z" fill="#FFC800"/><circle cx="120" cy="22" r="6" fill="#FFC800"/><text x="120" y="82" text-anchor="middle" font-size="11" fill="#2B3A4A">1804</text>','Napoleon, Emperor'),
py_var:_code(['age = 12','name = "Ada"','print(age)'],'a variable stores a value'),
py_types:_code(['5 &nbsp;&nbsp;&nbsp;&nbsp;# int','2.5 &nbsp;&nbsp;# float','"hi" &nbsp;# str','True # bool'],'four basic types'),
py_ops:_code(['10 // 3 # 3','10 % 3 &nbsp;# 1','2 ** 5 &nbsp;# 32'],'operators'),
py_for:_code(['for i in range(3):','&nbsp;&nbsp;print(i)','# 0 1 2'],'repeat with for'),
py_while:_code(['count = 0','while count != 3:','&nbsp;&nbsp;count = count + 1'],'repeat with while'),
py_acc:_code(['total = 0','for n in [3, 5, 7]:','&nbsp;&nbsp;total = total + n'],'add up as you loop')
});
const _flag=(a,b,c)=>`<svg viewBox="0 0 100 80"><rect x="12" y="14" width="25" height="52" fill="${a}"/><rect x="37" y="14" width="26" height="52" fill="${b}" stroke="#E5E5E5" stroke-width="1"/><rect x="63" y="14" width="25" height="52" fill="${c}"/></svg>`;
Object.assign(OPT,{
 flag_fr:_flag('#1F4FBF','#fff','#E03A3A'),
 flag_it:_flag('#2E9B3E','#fff','#E03A3A'),
 flag_de:_flag('#222','#E03A3A','#FFC800'),
 flag_pl:`<svg viewBox="0 0 100 80"><rect x="12" y="14" width="76" height="26" fill="#fff" stroke="#E5E5E5" stroke-width="1"/><rect x="12" y="40" width="76" height="26" fill="#E03A3A"/></svg>`
});

/* plant cell with tappable parts: used by "tap the part" exercises */
function cellArt(sel,locked){
 const hs=(n,svg)=>`<g class="hs ${sel===n?'sel':''}" data-act="hot" data-spot="${n}" ${locked?'style="pointer-events:none"':''}>${svg}</g>`;
 return `<svg viewBox="0 0 300 190" class="cellsvg">
  ${hs('Cell wall','<rect x="12" y="10" width="276" height="170" rx="44" fill="#F1FBE3" stroke="#7BC74D" stroke-width="10"/>')}
  ${hs('Vacuole','<ellipse cx="150" cy="95" rx="56" ry="40" fill="#BFE9FB" stroke="#1CB0F6" stroke-width="4"/>')}
  ${hs('Nucleus','<circle cx="232" cy="62" r="22" fill="#D9B8FF" stroke="#A66CE6" stroke-width="4"/><circle cx="232" cy="62" r="7" fill="#A66CE6"/>')}
  ${hs('Chloroplast','<g transform="rotate(-20 70 60)"><ellipse cx="70" cy="60" rx="26" ry="14" fill="#58CC02" stroke="#46A302" stroke-width="3"/><path d="M54 60h32M57 54h26M57 66h26" stroke="#46A302" stroke-width="2.5" stroke-linecap="round"/></g>')}
  ${hs('Chloroplast','<g transform="rotate(15 80 140)"><ellipse cx="80" cy="140" rx="24" ry="13" fill="#58CC02" stroke="#46A302" stroke-width="3"/><path d="M66 140h28M69 134h22" stroke="#46A302" stroke-width="2.5" stroke-linecap="round"/></g>')}
 </svg>`}

/* Learn Lab: hand-drawn art when it exists, else the concept's emoji (generated topics) */
const artFor=c=>ART[c.art]||`<div class="emoji-art">${esc(c.emoji||'💡')}</div>`;
