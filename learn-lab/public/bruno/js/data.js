/* ------------------------------------------------------------------
   MOCK CONTENT. The backend replaces this with generated topics.
   Item kinds: mc img fill match type num multi slider build listen speak hot teach
   Every item has `why` (used by "Explain my answer").
------------------------------------------------------------------- */
let TOPIC='Photosynthesis';
const KIND={mc:'multiple choice',img:'picture choice',fill:'fill-in-the-blank',match:'matching',type:'typing',num:'number entry',multi:'multi-answer',slider:'number line',build:'build-it',listen:'listening',speak:'speaking',hot:'diagram tapping',teach:'teach-back',flash:'flashcards'};

let C=[
 {id:'sun',name:'Sunlight is the fuel',icon:'sun',art:'sun',
  body:'Plants run on sunlight. Leaves catch light and turn it into stored chemical energy, in the form of sugar.',
  cards:[{id:'sun1',f:'What powers photosynthesis?',b:'Light energy, usually from the sun'},{id:'sun2',f:'Photosynthesis turns light energy into ___ energy',b:'chemical (stored in sugar)'}],
  pool:[
   {k:'mc',q:'What energy source powers photosynthesis?',opts:['Sunlight','Soil','Wind','Sound'],a:'Sunlight',why:'Chlorophyll captures light energy from the sun. Soil gives minerals, not energy, so the sun is the fuel.'},
   {k:'img',q:'Which picture shows the energy source plants use?',opts:[{art:'sun',label:'Sun'},{art:'moon',label:'Moon'},{art:'drop',label:'Water'},{art:'bolt',label:'Lightning'}],a:'Sun',why:'Plants use light from the sun. Moonlight is far too weak, and water is an ingredient, not the energy.'},
   {k:'type',q:'Plants turn light energy into ___ energy.',answers:['chemical'],why:'The light energy ends up stored in the chemical bonds of glucose, a sugar.'},
   {k:'listen',say:'photosynthesis',opts:['photosynthesis','photography','phosphorus','photocopy'],a:'photosynthesis',why:'Photo means light and synthesis means putting together: building something using light.'},
   {k:'mc',q:'Plants turn light energy into…',opts:['Chemical energy','Only heat','Electricity','Sound'],a:'Chemical energy',why:'The energy is stored in sugar molecules. That is why eating plants gives us energy too.'}
  ]},
 {id:'cell',name:'Chloroplasts',icon:'cell',art:'chloro',
  body:'Chloroplasts are tiny green compartments inside leaf cells. This is where photosynthesis actually happens.',
  cards:[{id:'cell1',f:'Chloroplast',b:'Green compartment in plant cells where photosynthesis happens'},{id:'cell2',f:'Photosynthesis takes place in the ___',b:'chloroplast'}],
  pool:[
   {k:'mc',q:'Where in a cell does photosynthesis happen?',opts:['Chloroplast','Nucleus','Cell wall','Mitochondrion'],a:'Chloroplast',why:'Chloroplasts hold the chlorophyll and the machinery for photosynthesis. The nucleus stores DNA instead.'},
   {k:'hot',q:'Tap the chloroplast.',a:'Chloroplast',why:'Chloroplasts are the green oval parts. The purple circle is the nucleus and the blue sac is the vacuole.'},
   {k:'fill',s:'Photosynthesis takes place in the ___ .',bank:['chloroplast','nucleus','root'],a:'chloroplast',why:'The chloroplast is the site of photosynthesis.'},
   {k:'listen',say:'chloroplast',opts:['chloroplast','chlorophyll','cytoplasm','chromosome'],a:'chloroplast',why:'Chloro means green and plast means a small body, so it is a small green body in the cell.'}
  ]},
 {id:'chl',name:'Chlorophyll',icon:'leaf',art:'chlorophyll',
  body:'Chlorophyll is the pigment that grabs light, mostly red and blue. It bounces green back, which is why leaves look green.',
  cards:[{id:'chl1',f:'Chlorophyll',b:'Pigment that absorbs red & blue light and reflects green'},{id:'chl2',f:'Why are leaves green?',b:'Chlorophyll reflects green light instead of absorbing it'}],
  pool:[
   {k:'mc',q:'Why do leaves look green?',opts:['Chlorophyll reflects green light','Chlorophyll absorbs green light','They make green dye at night','Soil stains them'],a:'Chlorophyll reflects green light',why:'We see the colours that bounce back to our eyes. Chlorophyll absorbs red and blue and reflects green.'},
   {k:'fill',s:'Chlorophyll absorbs mostly red and ___ light.',bank:['blue','green','yellow'],a:'blue',why:'Chlorophyll absorbs red and blue best. Green is the colour it reflects.'},
   {k:'slider',q:'Chlorophyll absorbs red light most strongly near which wavelength?',min:400,max:700,step:5,a:680,tol:25,unit:' nm',ticks:[400,450,500,550,600,650,700],spectrum:true,why:'Red light sits around 620 to 700 nm. Chlorophyll has an absorption peak near 680 nm.'},
   {k:'speak',say:'Chlorophyll reflects green light',keys:['chlorophyll','reflect','green'],why:'Say it out loud. Producing the sentence yourself strengthens memory more than reading it.'},
   {k:'teach',q:'Bruno asks: "Why are leaves green? Explain it to me like I\'m new."',keys:[['chlorophyll','pigment'],['green'],['reflect','bounce','bounces']],need:2,model:'Leaves contain chlorophyll, a pigment that absorbs red and blue light but reflects green light, so green is what we see.',why:'Explaining it in your own words shows what you really understand.'}
  ]},
 {id:'in',name:'Water + CO₂ in',icon:'drop',art:'inputs',
  body:'Roots pull water up. Carbon dioxide slips in through tiny leaf pores called stomata.',
  cards:[{id:'in1',f:'Photosynthesis inputs',b:'Water (roots), CO₂ (stomata) and light'},{id:'in2',f:'Stomata',b:'Tiny pores on leaves that let CO₂ in and O₂ out'}],
  pool:[
   {k:'mc',q:'Which gas do plants take IN for photosynthesis?',opts:['Carbon dioxide','Oxygen','Nitrogen','Helium'],a:'Carbon dioxide',why:'CO₂ provides the carbon atoms that become glucose. Oxygen is released, not taken in, during photosynthesis.'},
   {k:'img',q:'Where does carbon dioxide enter a leaf?',opts:[{art:'pore',label:'Stomata'},{art:'root',label:'Roots'},{art:'flower',label:'Flower'},{art:'stem',label:'Stem'}],a:'Stomata',why:'Stomata are tiny pores in the leaf surface. Roots take up water, not CO₂.'},
   {k:'match',pairs:[['Water','Roots'],['CO₂','Stomata'],['Light','Chlorophyll']],why:'Water comes up through the roots, CO₂ enters through stomata, and chlorophyll captures light.'},
   {k:'num',q:'6 CO₂ + ___ H₂O → glucose + 6 O₂',a:6,why:'To balance the equation you need 6 water molecules: the 12 hydrogens end up in glucose (C₆H₁₂O₆).'}
  ]},
 {id:'out',name:'Glucose + O₂ out',icon:'cube',art:'outputs',
  body:'The plant builds glucose, a sugar, to use as food. Oxygen is released as a by-product.',
  cards:[{id:'out1',f:'Photosynthesis outputs',b:'Glucose for food, plus oxygen released'},{id:'out2',f:'Equation of photosynthesis',b:'6CO₂ + 6H₂O + light → C₆H₁₂O₆ + 6O₂'}],
  pool:[
   {k:'mc',q:'Which gas is released by photosynthesis?',opts:['Oxygen','Carbon dioxide','Methane','Nitrogen'],a:'Oxygen',why:'The oxygen atoms from split water molecules leave the leaf as O₂.'},
   {k:'fill',s:'CO₂ + H₂O + light → glucose + ___ .',bank:['oxygen','nitrogen','water'],a:'oxygen',why:'Oxygen is the by-product of splitting water.'},
   {k:'multi',q:'Count the atoms in one glucose molecule, C₆H₁₂O₆.',rows:[{l:'Carbon',a:6},{l:'Hydrogen',a:12},{l:'Oxygen',a:6}],why:'The formula C₆H₁₂O₆ tells you: 6 carbon, 12 hydrogen and 6 oxygen atoms.'},
   {k:'build',q:'Build the photosynthesis equation.',tiles:['6CO₂','+','6H₂O','→','C₆H₁₂O₆','+','6O₂','6N₂'],seq:['6CO₂','+','6H₂O','→','C₆H₁₂O₆','+','6O₂'],alts:[['6H₂O','+','6CO₂','→','C₆H₁₂O₆','+','6O₂'],['6CO₂','+','6H₂O','→','6O₂','+','C₆H₁₂O₆'],['6H₂O','+','6CO₂','→','6O₂','+','C₆H₁₂O₆']],why:'Reactants (CO₂ and water) go on the left, an arrow, then products (glucose and oxygen).'},
   {k:'type',q:'The sugar plants make is called ___ .',answers:['glucose'],why:'Glucose, C₆H₁₂O₆, is the sugar the plant uses for energy and growth.'}
  ]},
 {id:'two',name:'Two stages',icon:'cycle',art:'stages',
  body:'Stage 1, the light reactions, captures light energy. Stage 2, the Calvin cycle, spends that energy to build glucose.',
  cards:[{id:'two1',f:'Light reactions',b:'Stage 1: capture light energy and split water (releases O₂)'},{id:'two2',f:'Calvin cycle',b:'Stage 2: uses captured energy to build glucose from CO₂'}],
  pool:[
   {k:'mc',q:'Which stage actually builds glucose?',opts:['Calvin cycle','Light reactions','Respiration','Digestion'],a:'Calvin cycle',why:'The Calvin cycle uses energy from stage 1 to turn CO₂ into glucose.'},
   {k:'mc',q:'What do the light reactions do?',opts:['Capture light energy','Build sugar from CO₂','Absorb water','Release CO₂'],a:'Capture light energy',why:'Stage 1 captures light energy and stores it temporarily so stage 2 can use it.'},
   {k:'build',q:'Put the steps in order.',tiles:['Light hits chlorophyll','Water splits and O₂ is released','Energy is captured','CO₂ becomes glucose'],seq:['Light hits chlorophyll','Water splits and O₂ is released','Energy is captured','CO₂ becomes glucose'],why:'Light reactions come first (light, water splitting, energy capture), then the Calvin cycle makes glucose.'},
   {k:'teach',q:'Bruno asks: "What happens in the two stages? Explain it to me."',keys:[['light'],['energy'],['calvin','glucose','sugar']],need:2,model:'In stage 1 the light reactions capture light energy. In stage 2 the Calvin cycle uses that energy to build glucose from CO₂.',why:'Describing both stages in your own words is a strong test of understanding.'}
  ]}
];
let CARDS=[];
const cardById=id=>CARDS.find(c=>c.id===id);

/* ---------- swappable content: the backend (POST /api/course) returns {topic, concepts} ---------- */
const CONTENT_KEY='bruno.content.v1';
function setContent(json){
  TOPIC=json.topic;C=json.concepts;
  C.forEach(c=>c.pool.forEach((it,i)=>{it.id=c.id+'-'+i;it.cid=c.id}));
  CARDS=C.flatMap(c=>c.cards.map(x=>({...x,cid:c.id})));
}
function saveContent(json){try{localStorage.setItem(CONTENT_KEY,JSON.stringify(json))}catch(e){}}
function clearContent(){try{localStorage.removeItem(CONTENT_KEY)}catch(e){}}
// Use the last generated course if there is one, else the built-in Photosynthesis demo.
(function(){let j=null;try{j=JSON.parse(localStorage.getItem(CONTENT_KEY))}catch(e){}
  if(j&&j.topic&&Array.isArray(j.concepts)&&j.concepts.length)setContent(j);else setContent({topic:TOPIC,concepts:C})})();

/* ---------- gamification content ---------- */
const BADGES=[
 {id:'first',name:'First steps',desc:'Finish your first lesson',icon:'leaf'},
 {id:'perfect',name:'Flawless',desc:'Finish a lesson with no slips',icon:'cell'},
 {id:'combo5',name:'On a roll',desc:'Get 5 correct in a row',icon:'sun'},
 {id:'streak3',name:'3-day streak',desc:'Learn 3 days in a row',icon:'drop'},
 {id:'review10',name:'Memory builder',desc:'Review 10 cards',icon:'cycle'},
 {id:'cover50',name:'Halfway there',desc:'Reach 50% coverage',icon:'cube'},
 {id:'cover100',name:'Nothing left',desc:'Reach 100% coverage',icon:'cube'},
 {id:'teach',name:'Great teacher',desc:'Teach Bruno a concept',icon:'sun'},
 {id:'speed',name:'Speed demon',desc:'Score 10 in a Rapid Review',icon:'drop'}
];
const SHOP=[
 {id:'freeze',name:'Streak Freeze',desc:'Keeps your streak safe if you miss a day',price:50,kind:'item'},
 {id:'boost',name:'Double XP',desc:'2x XP on your next lesson',price:60,kind:'item'},
 {id:'glasses',name:'Round glasses',desc:'A scholarly look for Bruno',price:80,kind:'outfit',slot:'glasses'},
 {id:'cap',name:'Study cap',desc:'A navy cap for Bruno',price:90,kind:'outfit',slot:'hat',val:'cap'},
 {id:'beanie',name:'Honey beanie',desc:'A cosy trail beanie',price:70,kind:'outfit',slot:'hat',val:'beanie'},
 {id:'gold',name:'Golden scarf',desc:'A shiny scarf',price:120,kind:'outfit',slot:'scarf',val:'#FFC800'}
];
const SCARVES=[['#43C0F6','Sky'],['#FF86C8','Pink'],['#58CC02','Leaf'],['#CE82FF','Grape'],['#FF9600','Orange']];
const LEAGUE_NAMES=['Mia','Leo','Aria','Noah','Zoe','Kai','Ines','Omar','Lena','Theo'];
const GOALS=[[5,'Casual','5 min / day'],[10,'Regular','10 min / day'],[15,'Serious','15 min / day'],[20,'Intense','20 min / day']];
const LEVELS=[['new',"I'm brand new to this"],['some','I know a little'],['lots','I know a lot, find my level']];
