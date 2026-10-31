/* ------------------------------------------------------------------
   MOCK CONTENT. The backend replaces this with generated topics.
   Item kinds: mc img fill match type num multi slider build listen speak hot teach
   Every item has `why` (used by "Explain my answer").
------------------------------------------------------------------- */
let TOPIC='Photosynthesis'; // current topic name (reassigned by useTopic)
const KIND={mc:'multiple choice',img:'picture choice',fill:'fill-in-the-blank',match:'matching',type:'typing',num:'number entry',multi:'multi-answer',slider:'number line',build:'build-it',listen:'listening',speak:'speaking',hot:'diagram tapping',teach:'teach-back',flash:'flashcards'};

const C_PHOTO=[
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
/* ---------- topic registry ----------
   Each topic: {id,name,emoji,blurb,C,CARDS}. Concept ids (and card ids) of non-default topics are
   prefixed (fr_, py_) so S.mastery / S.srs for different topics coexist in one saved state. */
function finalizeTopic(id,name,emoji,blurb,concepts){
  concepts.forEach(c=>c.pool.forEach((it,i)=>{it.id=c.id+'-'+i;it.cid=c.id}));
  return{id,name,emoji,blurb,C:concepts,CARDS:concepts.flatMap(c=>c.cards.map(x=>({...x,cid:c.id})))}}

const C_FRENCH=[
 {id:'fr_old',name:'The Old Regime',icon:'cube',art:'fr_old',
  body:'Before 1789 French society was split into three Estates: the clergy, the nobility, and everyone else. The king, Louis XVI, ruled with huge debts, and the Third Estate carried most of the tax burden.',
  cards:[{id:'fr_old1',f:'The three Estates',b:'1st: clergy, 2nd: nobility, 3rd: everyone else (commoners)'},{id:'fr_old2',f:'Which Estate paid most taxes?',b:'The Third Estate; clergy and nobility had many exemptions'},{id:'fr_old3',f:'King of France in 1789',b:'Louis XVI'}],
  pool:[
   {k:'mc',q:'In the Old Regime, who made up the Second Estate?',opts:['The nobility','The clergy','Commoners','Foreign merchants'],a:'The nobility',why:'The First Estate was the clergy, the Second the nobility, and the Third everybody else.'},
   {k:'match',pairs:[['First Estate','Clergy'],['Second Estate','Nobility'],['Third Estate','Commoners']],why:'The order is clergy, nobility, then commoners, who were the large majority of the population.'},
   {k:'mc',q:'Which Estate carried most of the tax burden?',opts:['The Third Estate','The First Estate','The Second Estate','The king alone'],a:'The Third Estate',why:'The clergy and nobility had many tax exemptions, so commoners paid most of the taxes.'},
   {k:'type',q:'France\'s king at the start of the Revolution was Louis ___ (Roman numeral).',answers:['XVI','16','sixteen'],why:'Louis XVI (sixteen) reigned from 1774 and was king when the Revolution broke out in 1789.'},
   {k:'mc',q:'Which problem helped trigger the crisis of 1789?',opts:['Huge royal debt and high bread prices','Too much gold from the colonies','A nationwide plague','A Spanish invasion'],a:'Huge royal debt and high bread prices',why:'Costly wars left the crown deeply in debt, and poor harvests pushed bread prices up, which angered ordinary people.'}
  ]},
 {id:'fr_sts',name:'1789: Assembly and Bastille',icon:'cycle',art:'fr_sts',
  body:'In May 1789 the Estates-General met at Versailles. The Third Estate broke away and called itself the National Assembly, swore the Tennis Court Oath, and on 14 July Parisians stormed the Bastille.',
  cards:[{id:'fr_sts1',f:'National Assembly',b:'Name the Third Estate deputies took on 17 June 1789'},{id:'fr_sts2',f:'Tennis Court Oath',b:'20 June 1789: deputies swore not to separate until France had a constitution'},{id:'fr_sts3',f:'14 July 1789',b:'Parisians storm the Bastille, a royal fortress and prison'}],
  pool:[
   {k:'mc',q:'What did the Third Estate deputies call themselves on 17 June 1789?',opts:['The National Assembly','The Committee of Public Safety','The Directory','The Senate'],a:'The National Assembly',why:'They claimed to speak for the whole nation, so they declared themselves the National Assembly.'},
   {k:'fill',s:'In the Tennis Court Oath, deputies swore not to ___ until France had a constitution.',bank:['separate','surrender','vote'],a:'separate',why:'They promised to keep meeting together until a constitution was written.'},
   {k:'mc',q:'What did Parisians storm on 14 July 1789?',opts:['The Bastille','The Louvre','Notre-Dame','The Palace of Versailles'],a:'The Bastille',why:'The Bastille was a royal fortress and prison. Its fall became the symbol of the Revolution.'},
   {k:'multi',q:'Date the Bastille was stormed: day, month number, year.',rows:[{l:'Day',a:14},{l:'Month',a:7},{l:'Year',a:1789}],why:'14 July 1789. France still celebrates 14 July as its national day.'},
   {k:'slider',q:'In which year did the French Revolution begin?',min:1770,max:1810,step:1,a:1789,tol:0,ticks:[1770,1780,1790,1800,1810],why:'The Revolution is dated from 1789, the year of the Estates-General, the Tennis Court Oath and the Bastille.'},
   {k:'build',q:'Put the 1789 events in order.',tiles:['Estates-General meets','Tennis Court Oath','Bastille stormed','Rights of Man declared'],seq:['Estates-General meets','Tennis Court Oath','Bastille stormed','Rights of Man declared'],why:'May: Estates-General. 20 June: Tennis Court Oath. 14 July: Bastille. 26 August: Declaration of the Rights of Man.'}
  ]},
 {id:'fr_rights',name:'Rights and reforms',icon:'leaf',art:'fr_rights',
  body:'In August 1789 the Assembly ended feudal privileges and issued the Declaration of the Rights of Man and of the Citizen. The motto became Liberty, Equality, Fraternity, and the tricolour flag its symbol.',
  cards:[{id:'fr_rights1',f:'Declaration of the Rights of Man and of the Citizen',b:'August 1789 charter: men are born free and equal in rights'},{id:'fr_rights2',f:'Motto of the Revolution',b:'Liberty, Equality, Fraternity'},{id:'fr_rights3',f:'Colours of the tricolour',b:'Blue, white and red'}],
  pool:[
   {k:'img',q:'Which flag has the colours of the French tricolour?',opts:[{art:'flag_fr',label:'Blue, white, red'},{art:'flag_it',label:'Green, white, red'},{art:'flag_de',label:'Black, red, gold'},{art:'flag_pl',label:'White over red'}],a:'Blue, white, red',why:'The tricolour is blue, white and red in vertical stripes. Green, white, red is the Italian flag.'},
   {k:'fill',s:'The 1789 Declaration says men are born and remain ___ and equal in rights.',bank:['free','wealthy','noble'],a:'free',why:'The first article says men are born free and equal in rights.'},
   {k:'type',q:'Liberty, Equality, ___',answers:['fraternity','brotherhood'],why:'The motto ends with Fraternity, meaning brotherhood and solidarity.'},
   {k:'mc',q:'What did the Assembly abolish on 4 August 1789?',opts:['Feudal privileges','The monarchy','The Catholic Church','Paris'],a:'Feudal privileges',why:'In one night the nobles gave up feudal rights, ending the legal privileges of the old order.'},
   {k:'mc',q:'In October 1789 thousands of Parisians, many of them women, marched to Versailles. What did they demand?',opts:['Bread','A new king','War with Britain','Lower rents'],a:'Bread',why:'Bread was scarce and expensive. The march ended with the royal family being brought to Paris.'}
  ]},
 {id:'fr_fall',name:'The fall of the monarchy',icon:'drop',art:'fr_fall',
  body:'Louis XVI tried to flee in June 1791 but was caught at Varennes. War with Austria began in 1792, the monarchy was abolished and a republic declared, and in January 1793 the king was executed.',
  cards:[{id:'fr_fall1',f:'Flight to Varennes',b:'June 1791: Louis XVI tried to escape France but was caught'},{id:'fr_fall2',f:'First French Republic',b:'Declared in September 1792 after the monarchy was abolished'},{id:'fr_fall3',f:'Execution of Louis XVI',b:'21 January 1793, by guillotine'}],
  pool:[
   {k:'mc',q:'What did Louis XVI attempt in June 1791?',opts:['To flee France','To dissolve the Assembly','To invade Austria','To abdicate for his son'],a:'To flee France',why:'The royal family tried to escape but was recognised and stopped at Varennes. People then distrusted the king.'},
   {k:'fill',s:'In April 1792 France declared war on ___ .',bank:['Austria','Spain','Russia'],a:'Austria',why:'The Assembly declared war on Habsburg Austria in April 1792, which deepened the radicalisation.'},
   {k:'num',q:'France became a republic in ___',a:1792,why:'The monarchy was abolished and the republic proclaimed in September 1792.'},
   {k:'slider',q:'In which year was Louis XVI executed?',min:1785,max:1800,step:1,a:1793,tol:0,ticks:[1785,1790,1795,1800],why:'Louis XVI was executed on 21 January 1793.'},
   {k:'mc',q:'How was Louis XVI executed?',opts:['By guillotine','By firing squad','By hanging','By sword'],a:'By guillotine',why:'The guillotine was adopted as an equal, quick method of execution and used for the king in 1793.'}
  ]},
 {id:'fr_terror',name:'The Terror',icon:'cell',art:'fr_terror',
  body:'In 1793 and 1794 the Committee of Public Safety, led in practice by Robespierre, used the guillotine against suspected enemies. The Terror ended when Robespierre himself was overthrown and executed in July 1794.',
  cards:[{id:'fr_terror1',f:'Committee of Public Safety',b:'Powerful committee that ran France during the Terror (1793-94)'},{id:'fr_terror2',f:'Robespierre',b:'Leading Jacobin; executed in July 1794'},{id:'fr_terror3',f:'Why the Terror?',b:'Leaders feared foreign invasion and internal enemies'}],
  pool:[
   {k:'mc',q:'Which leader is most closely linked with the Reign of Terror?',opts:['Robespierre','Lafayette','Talleyrand','Necker'],a:'Robespierre',why:'Maximilien Robespierre was the most influential member of the Committee of Public Safety.'},
   {k:'mc',q:'Which body ran France during the Terror?',opts:['Committee of Public Safety','Estates-General','The Directory','The Senate'],a:'Committee of Public Safety',why:'The Committee of Public Safety held emergency powers from 1793 to 1794.'},
   {k:'type',q:'In July 1794 Robespierre himself was sent to the ___ .',answers:['guillotine'],why:'He was arrested on 27 July 1794 and executed the next day, which ended the worst of the Terror.'},
   {k:'listen',say:'guillotine',opts:['guillotine','gelatine','gladiator','gullible'],a:'guillotine',why:'The guillotine is named after Dr Joseph-Ignace Guillotin, who urged a quicker, less cruel method of execution.'},
   {k:'teach',q:'Bruno asks: "Why did the Revolution turn violent in 1793? Explain it to me."',keys:[['war','invasion','enemies','threat','foreign'],['fear','suspect','traitor','traitors','enemy'],['committee','robespierre','terror','guillotine']],need:2,model:'France was at war and under threat from enemies, so the Committee of Public Safety under Robespierre used terror and the guillotine against suspected traitors.',why:'Linking the war, the fear of enemies and the Committee shows you understand the causes.'}
  ]},
 {id:'fr_nap',name:'Napoleon takes over',icon:'sun',art:'fr_nap',
  body:'The Directory (1795 to 1799) was weak. In 1799 General Napoleon Bonaparte seized power in a coup, crowned himself Emperor in 1804, and issued the Napoleonic Code. He was finally beaten at Waterloo in 1815.',
  cards:[{id:'fr_nap1',f:'Coup of 18 Brumaire',b:'November 1799: Napoleon seizes power and becomes First Consul'},{id:'fr_nap2',f:'Napoleonic Code',b:'1804 civil law code: equality before the law, kept in many countries'},{id:'fr_nap3',f:'Battle of Waterloo',b:'18 June 1815: Napoleon\'s final defeat'}],
  pool:[
   {k:'num',q:'Napoleon crowned himself Emperor in ___',a:1804,why:'Napoleon became Emperor of the French in December 1804.'},
   {k:'mc',q:'Which battle ended Napoleon\'s rule in 1815?',opts:['Waterloo','Trafalgar','Austerlitz','Verdun'],a:'Waterloo',why:'He lost to British and Prussian forces at Waterloo on 18 June 1815. Austerlitz (1805) was one of his victories.'},
   {k:'type',q:'The Napoleonic ___ of 1804 made French civil law uniform.',answers:['code'],why:'The Napoleonic Code set out equality before the law and property rights, and it influenced many other countries.'},
   {k:'mc',q:'How did Napoleon take power in 1799?',opts:['By a coup','By winning a royal election','By inheriting the throne','By a foreign invasion'],a:'By a coup',why:'The coup of 18 Brumaire overthrew the Directory and made him First Consul.'},
   {k:'build',q:'Put these events in order.',tiles:['Bastille stormed','Louis XVI executed','Napoleon crowned emperor','Waterloo'],seq:['Bastille stormed','Louis XVI executed','Napoleon crowned emperor','Waterloo'],why:'1789, 1793, 1804, 1815.'},
   {k:'speak',say:'Liberty, equality, fraternity',keys:['liberty','equality','fraternity'],why:'Saying the motto aloud helps lock in the Revolution\'s core ideals.'}
  ]}
];

const C_PYTHON=[
 {id:'py_var',name:'Variables',icon:'cube',art:'py_var',
  body:'A variable is a name that stores a value. In Python you create one with the assignment operator: age = 12. Names can use letters, digits and underscores, but cannot start with a digit or contain spaces.',
  cards:[{id:'py_var1',f:'Variable',b:'A name that stores a value so you can use it later'},{id:'py_var2',f:'What does x = 5 do?',b:'Assignment: stores 5 in the name x'},{id:'py_var3',f:'Valid variable names',b:'Letters, digits, underscores; no spaces; cannot start with a digit'}],
  pool:[
   {k:'mc',q:'What does age = 12 do?',opts:['Stores 12 in a variable called age','Compares age to 12','Prints 12','Deletes age'],a:'Stores 12 in a variable called age',why:'A single = is assignment: the value on the right is stored under the name on the left. Comparing uses ==.'},
   {k:'mc',q:'Which is a valid variable name?',opts:['total_score','2fast','my score','for'],a:'total_score',why:'Names cannot start with a digit, cannot contain spaces, and cannot be Python keywords like for.'},
   {k:'num',q:'x = 4, then x = x + 3. print(x) shows ___',a:7,why:'The right side is worked out first: 4 + 3 = 7, and then 7 is stored back in x.'},
   {k:'type',q:'In x = 5, the = sign is the ___ operator.',answers:['assignment'],why:'The = sign is the assignment operator, not a statement of equality.'},
   {k:'fill',s:'To show a value on the screen, call ___(x).',bank:['print','input','len'],a:'print',why:'print() displays values. input() reads from the user and len() counts items.'},
   {k:'build',q:'Build a program that stores a name, then shows it.',tiles:['name = "Bruno"','print(name)','name == Bruno'],seq:['name = "Bruno"','print(name)'],why:'A variable must be assigned before you use it. == compares and does not store.'}
  ]},
 {id:'py_types',name:'Data types',icon:'cell',art:'py_types',
  body:'Every value has a type. Whole numbers are int, decimals are float, text is str, and True or False is bool. The type() function tells you which one you have.',
  cards:[{id:'py_types1',f:'int, float, str, bool',b:'Whole number, decimal number, text, True/False'},{id:'py_types2',f:'type(x)',b:'Built-in function that returns the data type of x'},{id:'py_types3',f:'"7" + "2"',b:'"72": strings are joined, not added'}],
  pool:[
   {k:'mc',q:'What is the type of 3.14?',opts:['float','int','str','bool'],a:'float',why:'A number with a decimal point is a float.'},
   {k:'mc',q:'What is the type of "42" (with quotes)?',opts:['str','int','float','bool'],a:'str',why:'Anything inside quotes is text (a string), even if it looks like a number.'},
   {k:'match',pairs:[['5','int'],['2.5','float'],['"hi"','str'],['True','bool']],why:'int is whole numbers, float has decimals, str is text in quotes, bool is True or False.'},
   {k:'type',q:'The built-in function ___(x) tells you the data type of x.',answers:['type'],why:'type(5) returns int, and type("a") returns str.'},
   {k:'mc',q:'What does print("7" + "2") show?',opts:['72','9','"72"','An error'],a:'72',why:'With strings, + joins them, so "7" + "2" becomes 72. The quotes are not printed.'},
   {k:'fill',s:'The values True and False have type ___ .',bank:['bool','str','int'],a:'bool',why:'bool is short for Boolean.'},
   {k:'listen',say:'boolean',opts:['boolean','bullion','bolivian','bowling'],a:'boolean',why:'Boolean is named after the mathematician George Boole, who studied true and false logic.'}
  ]},
 {id:'py_ops',name:'Operators and strings',icon:'leaf',art:'py_ops',
  body:'Python does maths with + - * / and also // (whole-number division), % (remainder) and ** (power). Strings can be joined with +, counted with len(), and mixed into text with f-strings.',
  cards:[{id:'py_ops1',f:'// and %',b:'// gives the whole-number quotient, % gives the remainder'},{id:'py_ops2',f:'**',b:'The power operator: 2 ** 3 is 8'},{id:'py_ops3',f:'f"Hi {name}"',b:'An f-string: puts the value of name inside the text'}],
  pool:[
   {k:'num',q:'10 // 3 = ___',a:3,why:'// divides and drops the remainder: 10 divided by 3 is 3 remainder 1.'},
   {k:'num',q:'10 % 3 = ___',a:1,why:'% gives the remainder after division: 10 = 3 x 3 + 1.'},
   {k:'num',q:'2 ** 5 = ___',a:32,why:'** is the power: 2 x 2 x 2 x 2 x 2 = 32.'},
   {k:'multi',q:'With a = 7 and b = 2, work these out.',rows:[{l:'a // b',a:3},{l:'a % b',a:1},{l:'a * b',a:14}],why:'7 // 2 = 3, 7 % 2 = 1 and 7 * 2 = 14.'},
   {k:'mc',q:'If name = "Ada", what does f"Hi {name}" give?',opts:['Hi Ada','Hi name','Hi {name}','An error'],a:'Hi Ada',why:'In an f-string, the braces are replaced by the value of the variable.'},
   {k:'type',q:'Joining two strings with + is called ___ .',answers:['concatenation'],why:'Concatenation means joining end to end: "ab" + "cd" gives "abcd".'},
   {k:'num',q:'len("hello") = ___',a:5,why:'len() counts the characters in a string, and hello has 5.'}
  ]},
 {id:'py_for',name:'For loops',icon:'cycle',art:'py_for',
  body:'A for loop repeats code once for each item in a sequence. for i in range(3): runs the body with i = 0, 1, 2. range(n) starts at 0 and stops before n. The loop body must be indented.',
  cards:[{id:'py_for1',f:'range(3)',b:'The numbers 0, 1, 2 (starts at 0, stops before 3)'},{id:'py_for2',f:'range(2, 6)',b:'2, 3, 4, 5 (start included, stop excluded)'},{id:'py_for3',f:'The loop body',b:'The indented lines after the colon'}],
  pool:[
   {k:'mc',q:'What does for i in range(3): print(i) show?',opts:['0 1 2','1 2 3','0 1 2 3','3 3 3'],a:'0 1 2',why:'range(3) gives 0, 1, 2: it starts at 0 and stops before 3.'},
   {k:'num',q:'for i in range(5) runs its body ___ times.',a:5,why:'range(5) produces 5 values (0 to 4), so the body runs 5 times.'},
   {k:'num',q:'range(2, 6) produces ___ numbers.',a:4,why:'It produces 2, 3, 4, 5. The start is included and the stop is not.'},
   {k:'slider',q:'In for i in range(10), what is the largest value i takes?',min:0,max:12,step:1,a:9,tol:0,ticks:[0,3,6,9,12],why:'range(10) stops before 10, so the last value is 9.'},
   {k:'fill',s:'for i in ___(3):',bank:['range','len','print'],a:'range',why:'range() generates the sequence of numbers to loop over.'},
   {k:'mc',q:'What must follow the colon in a for line?',opts:['An indented block of code','A semicolon','Nothing at all','A closing brace'],a:'An indented block of code',why:'Python uses indentation, not braces, to mark which lines belong to the loop.'},
   {k:'build',q:'Build a loop that prints 0, 1, 2.',tiles:['for i in range(3):','print(i)','while i:'],seq:['for i in range(3):','print(i)'],why:'The for line comes first, then the indented body.'}
  ]},
 {id:'py_while',name:'While loops',icon:'drop',art:'py_while',
  body:'A while loop keeps repeating as long as its condition is true. You must change something inside the loop so the condition eventually becomes false. Use break to exit early.',
  cards:[{id:'py_while1',f:'while loop',b:'Repeats its body as long as the condition is true'},{id:'py_while2',f:'break',b:'Exits the loop immediately'},{id:'py_while3',f:'Infinite loop',b:'A loop whose condition never becomes false'}],
  pool:[
   {k:'mc',q:'How long does a while loop keep running?',opts:['As long as its condition is true','Exactly 10 times','Until the program is saved','Once per variable'],a:'As long as its condition is true',why:'A while loop checks its condition before each repeat.'},
   {k:'num',q:'count = 0. while count != 3: count = count + 1. At the end count = ___',a:3,why:'count goes 0, 1, 2, 3, and then the condition count != 3 is false.'},
   {k:'num',q:'n = 10. While n is above 7, n = n - 1. The body runs ___ times.',a:3,why:'It runs when n is 10, 9 and 8. After n becomes 7 the condition is false.'},
   {k:'mc',q:'Which keyword leaves a loop immediately?',opts:['break','stop','exit','end'],a:'break',why:'break ends the nearest loop at once.'},
   {k:'type',q:'A loop that never ends is called an ___ loop.',answers:['infinite'],why:'For example, while True: with no break repeats forever.'},
   {k:'build',q:'Order the lines (indentation is implied).',tiles:['count = 0','while count != 3:','count = count + 1','print(count)','count = count - 1'],seq:['count = 0','while count != 3:','count = count + 1','print(count)'],why:'Set up the variable, start the loop, update the variable inside, then print after the loop.'},
   {k:'teach',q:'Bruno asks: "What is the difference between a for loop and a while loop?"',keys:[['for'],['while'],['condition','true','until','as long']],need:2,model:'A for loop repeats once per item or a set number of times, while a while loop keeps going as long as its condition is true.',why:'Contrasting the two loops in your own words shows you know when to use each.'}
  ]},
 {id:'py_acc',name:'Loops that add up',icon:'leaf',art:'py_acc',
  body:'A common pattern is the accumulator: start total at 0, then add to it on every pass of the loop. Loops can also walk through a list: for n in [3, 5, 7]. len(list) tells you how many items it holds.',
  cards:[{id:'py_acc1',f:'Accumulator pattern',b:'total = 0, then total = total + n inside the loop'},{id:'py_acc2',f:'len([4, 8, 15])',b:'3: the number of items in the list'},{id:'py_acc3',f:'for n in [3, 5, 7]',b:'Runs the body once for each item in the list'}],
  pool:[
   {k:'num',q:'total = 0, then for i in range(1, 5): total = total + i. total = ___',a:10,why:'1 + 2 + 3 + 4 = 10, since range(1, 5) stops before 5.'},
   {k:'fill',s:'To add up numbers, start the total at ___ .',bank:['0','1','100'],a:'0',why:'0 is the neutral starting point for addition.'},
   {k:'type',q:'The built-in function ___ counts the items in a list.',answers:['len'],why:'len([4, 8, 15]) is 3.'},
   {k:'mc',q:'What does for x in [2, 4, 6]: print(x * 10) show?',opts:['20 40 60','2 4 6','20','60'],a:'20 40 60',why:'x takes each item in turn, 2, 4 and 6, and each is multiplied by 10.'},
   {k:'multi',q:'For nums = [3, 5, 7], find these.',rows:[{l:'Sum',a:15},{l:'Length',a:3},{l:'Largest',a:7}],why:'3 + 5 + 7 = 15, there are 3 items, and the largest is 7.'},
   {k:'build',q:'Build a program that adds up 1, 2 and 3.',tiles:['total = 0','for n in [1, 2, 3]:','total = total + n','print(total)','total = n'],seq:['total = 0','for n in [1, 2, 3]:','total = total + n','print(total)'],why:'Start the total, loop, accumulate inside the loop, then print the result.'},
   {k:'speak',say:'A loop repeats code',keys:['loop','repeats','code'],why:'Saying the idea out loud strengthens memory more than reading it.'}
  ]}
];

const TOPICS=[
 finalizeTopic('photosynthesis','Photosynthesis','🌱','How plants turn sunlight, water and CO₂ into sugar and oxygen.',C_PHOTO),
 finalizeTopic('french-revolution','The French Revolution','⚜️','From the Estates-General of 1789 to Napoleon: how France overturned its old order.',C_FRENCH),
 finalizeTopic('python-basics','Intro to Python Variables & Loops','🐍','Store values in variables and repeat code with for and while loops.',C_PYTHON)
];

/* globals the rest of the app reads: TOPIC (name), C, CARDS. Default topic is Photosynthesis. */
let C=TOPICS[0].C, CARDS=TOPICS[0].CARDS;
const cardById=id=>CARDS.find(c=>c.id===id);
const topicById=id=>TOPICS.find(t=>t.id===id);
let TOPIC_ID='photosynthesis';
/* Learn Lab: topics that Claude generates (POST /api/bruno/topic) are added here and saved, so they
   survive a reload. The last used topic is restored at start. */
const GEN_KEY='bruno.gen.v1',TOPIC_KEY='bruno.topicId';
function addGeneratedTopic(j){j.id=j.id||('gen-'+Date.now().toString(36));j.name=j.name||j.topic||'My topic';const t=finalizeTopic(j.id,j.name,j.emoji||'📘',j.blurb||'',j.concepts);t.generated=true;
  const i=TOPICS.findIndex(x=>x.id===t.id);if(i>=0)TOPICS[i]=t;else TOPICS.push(t);
  try{const l=JSON.parse(localStorage.getItem(GEN_KEY)||'[]').filter(x=>x.id!==j.id);l.push(j);localStorage.setItem(GEN_KEY,JSON.stringify(l.slice(-6)))}catch(e){}
  return t}
function useTopic(id){
  const t=typeof id==='string'?topicById(id):id;if(!t)return false;
  TOPIC_ID=t.id;TOPIC=t.name;C=t.C;CARDS=t.CARDS;
  if(typeof S!=='undefined'&&S)S.topic=t.name;
  try{localStorage.setItem(TOPIC_KEY,t.id)}catch(e){}   // progress (S.mastery / S.srs) is keyed by prefixed ids, so nothing is wiped
  return true}

(function(){try{JSON.parse(localStorage.getItem(GEN_KEY)||'[]').filter(j=>j&&j.id&&j.name&&Array.isArray(j.concepts)).forEach(j=>{const t=finalizeTopic(j.id,j.name,j.emoji||'📘',j.blurb||'',j.concepts);t.generated=true;TOPICS.push(t)})}catch(e){}
  try{const id=localStorage.getItem(TOPIC_KEY);if(id&&topicById(id))useTopic(id)}catch(e){}})();

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
