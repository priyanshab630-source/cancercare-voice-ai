/* =========================================================================
   CancerCare Voice AI — demo data layer
   All records are SYNTHETIC and clearly labelled. Nothing here is clinical.
   ========================================================================= */
const LANGS = [
  {code:'en-IN', label:'English', hi:'Welcome'},
  {code:'hi-IN', label:'हिन्दी (Hindi)', hi:'स्वागत है'},
  {code:'ta-IN', label:'தமிழ் (Tamil)', hi:'வரவேற்கிறோம்'},
  {code:'pa-IN', label:'ਪੰਜਾਬੀ (Punjabi)', hi:'ਜੀ ਆਇਆਂ ਨੂੰ'},
  {code:'gu-IN', label:'ગુજરાતી (Gujarati)', hi:'સ્વાગત છે'},
  {code:'ur-IN', label:'اردو (Urdu)', hi:'خوش آمدید'}
];

/* Knowledge base — source-attributed education snippets (illustrative excerpts,
   paraphrased for the demo; real deployments index licensed/verified content). */
const KB = [
  {id:'kb-breast-er',cat:'breast',title:'Understanding ER, PR and HER2 in a breast pathology report',
   text:'Breast cancer cells are often tested for hormone receptors (ER, PR) and the HER2 protein. A pathologist reports these as positive or negative. These markers help the care team discuss which broad treatment categories — such as endocrine (hormone) therapy or HER2-targeted therapy — may be relevant. Your oncologist interprets them together with stage and other findings.',
   src:'National Cancer Institute — Breast Cancer', date:'Reviewed 2024'},
  {id:'kb-chem-fatigue',cat:'general',title:'Fatigue after chemotherapy',
   text:'Fatigue is one of the most commonly described effects of cancer treatment. It can be different from ordinary tiredness and may not fully improve with rest. Tell your care team if fatigue is severe, sudden, or comes with shortness of breath, fever, dizziness or chest pain — those need urgent assessment.',
   src:'NHS — Cancer fatigue', date:'Reviewed 2023'},
  {id:'kb-lung-nsclc',cat:'lung',title:'NSCLC and SCLC: the two main lung cancer groups',
   text:'Lung cancer is grouped mainly into non-small-cell (NSCLC) and small-cell (SCLC) types, based on how cells look under a microscope. Molecular testing may look for changes such as EGFR, ALK or ROS1 in NSCLC, which can guide whether a targeted therapy is an option. Staging describes how far the cancer has spread.',
   src:'National Cancer Institute — Lung Cancer', date:'Reviewed 2024'},
  {id:'kb-colorectal',cat:'colorectal',title:'Colorectal cancer: staging and treatment categories',
   text:'Colorectal cancer is staged from 0 to IV based on how deeply it has grown and whether it has spread. Treatment categories may include surgery, chemotherapy, radiation and targeted therapy. Digestive symptoms during treatment are common; report persistent or severe ones to your team.',
   src:'National Cancer Institute — Colorectal Cancer', date:'Reviewed 2024'},
  {id:'kb-fever-neutropenia',cat:'safety',title:'Fever during cancer treatment — do not self-assess',
   text:'Some cancer treatments lower the white-cell count, which can make infections harder to fight. A fever may be a sign of a serious complication and should be assessed urgently. Do not use a single universal temperature threshold — follow the specific instructions your oncology team has given you, and contact them or emergency services promptly.',
   src:'Clinical safety guidance (reviewed protocol)', date:'Reviewed 2024'},
  {id:'kb-endocrine',cat:'medication',title:'What endocrine (hormone) therapy is used for',
   text:'In hormone-receptor-positive breast cancer, endocrine therapy is a category of treatment that lowers or blocks the effect of hormones that can help certain cancers grow. It is prescribed only by your oncology team, and the specific medicine, dose and duration depend on your situation. Do not start, stop or change it on your own.',
   src:'National Cancer Institute — Hormone Therapy', date:'Reviewed 2024'},
  {id:'kb-bleed',cat:'safety',title:'Bleeding, bruising and low platelets',
   text:'Some treatments reduce platelets, the cells that help blood clot. Unusual bleeding, bruising, blood in stool or urine, or a nosebleed that will not stop should be reported urgently.',
   src:'NHS — Cancer treatment side effects', date:'Reviewed 2023'},
  {id:'kb-neuropathy',cat:'safety',title:'Peripheral neuropathy (numbness or tingling)',
   text:'Some chemotherapy medicines can cause tingling, numbness or weakness in the hands and feet (peripheral neuropathy). Tell your team early — it is a monitoring concern that may need review, and it should not be managed by adjusting doses on your own.',
   src:'National Cancer Institute — Peripheral Neuropathy', date:'Reviewed 2024'},
  {id:'kb-immunotherapy',cat:'general',title:'Immunotherapy — what it broadly does',
   text:'Immunotherapy is a category of treatment that helps the immune system recognise and act against cancer cells. It can cause immune-related effects in various organs, so monitoring is important. Whether it is suitable for you is a clinical decision for your oncologist.',
   src:'National Cancer Institute — Immunotherapy', date:'Reviewed 2024'}
];

/* Body regions for the SVG map */
const BODY_REGIONS = {
  brain:{name:'Brain & nervous system', systems:['Brain and central nervous system']},
  head_neck:{name:'Mouth, throat & thyroid', systems:['Head and neck','Thyroid']},
  chest:{name:'Lungs & heart', systems:['Lung','Cardiovascular']},
  breast:{name:'Breast region', systems:['Breast']},
  liver:{name:'Liver & gallbladder', systems:['Liver','Biliary']},
  stomach:{name:'Stomach', systems:['Gastric']},
  intestines:{name:'Intestines', systems:['Colorectal']},
  pancreas:{name:'Pancreas', systems:['Pancreatic']},
  kidney:{name:'Kidneys & urinary tract', systems:['Kidney','Bladder']},
  pelvis:{name:'Pelvic / reproductive organs', systems:['Ovarian','Cervical','Endometrial','Prostate','Testicular']},
  marrow:{name:'Bone marrow & blood-forming system', systems:['Leukemia','Lymphoma','Myeloma']},
  skin:{name:'Skin & soft tissues', systems:['Skin','Melanoma','Sarcoma']},
  bones:{name:'Bones & joints', systems:['Bone']}
};

/* ------------------------------------------------------------------ */
/* Synthetic patients                                                   */
/* ------------------------------------------------------------------ */
function baseReg(over){return Object.assign({
  address_form:'', dob:'', contact:'', emergency:'', diagnosis_date:'', stage:'', histology:'',
  biomarkers:'', allergies:'', history:'', hospital:'', oncologist:'', next_appt:'', consent_storage:true, consent_ai:true
}, over||{});}

const SEED = [
 { id:'DEMO-1001', name:'Ananya Sharma', address:'Ananya ji', age:48, lang:'hi-IN', langLabel:'Hindi',
   cancerType:'Breast cancer', group:'breast', agent:'Breast Cancer Support Agent',
   stage:'Not documented', site:'Breast (left)', regStatus:100, synthetic:true,
   reg:baseReg({dob:'1977', diagnosis_date:'2026-03', histology:'Invasive ductal carcinoma (synthetic)', biomarkers:'ER positive · PR positive · HER2 negative (illustrative only)', allergies:'None reported', hospital:'City Cancer Centre (fictional)', oncologist:'Dr. R. Menon (fictional)', next_appt:'2026-11-04'}),
   reports:[{id:'doc-a1',type:'Pathology summary',date:'2026-03-18',synthetic:true,verified:true,
     fields:[['Specimen','Left breast core biopsy (synthetic)'],['Histology','Invasive ductal carcinoma'],['Grade','Not specified in demo record'],['ER','Positive'],['PR','Positive'],['HER2','Negative'],['Note','Illustrative values only']]}],
   meds:[{name:'Endocrine therapy (illustrative)',brand:'—',status:'active',source:'Clinician-recorded (synthetic)',verified:true,dose:'Unspecified in demo',route:'Oral',freq:'Unspecified',start:'2026-04',reason:'Hormone-receptor-positive breast cancer (illustrative)',effects:['Joint aches','Hot flushes','Fatigue'],warn:['Unusual bleeding','Severe bone pain'],monitor:'Follow-up as advised by your oncology team',systems:['bones','skin']}],
   symptoms:[{name:'Fatigue after chemotherapy',sev:'Moderate',onset:'2 weeks',ref:'patient-reported'}],
   bodyHighlights:{breast:'disease', marrow:'treatment', bones:'effect', skin:'effect'},
   timeline:[['2026-03','Diagnosis reported (breast)'],['2026-03','Pathology summary uploaded'],['2026-04','Endocrine therapy recorded (illustrative)'],['2026-11','Next appointment scheduled']],
   appt:{when:'2026-11-04',with:'Dr. R. Menon (fictional)',where:'City Cancer Centre (fictional)'} },

 { id:'DEMO-1002', name:'Ravi Verma', address:'Ravi ji', age:62, lang:'hi-IN', langLabel:'Hindi / Hinglish',
   cancerType:'Lung cancer', group:'lung', agent:'Lung Cancer Support Agent',
   stage:'Unknown', site:'Lung (right)', regStatus:80, synthetic:true,
   reg:baseReg({dob:'1964', diagnosis_date:'2026-05', histology:'Not documented', biomarkers:'Molecular testing pending (illustrative)', allergies:'Penicillin (reported)', hospital:'City Cancer Centre (fictional)', oncologist:'Dr. S. Kulkarni (fictional)', next_appt:'2026-11-10'}),
   reports:[{id:'doc-b1',type:'Imaging summary',date:'2026-05-02',synthetic:true,verified:false,
     fields:[['Study','CT chest (synthetic)'],['Finding','Right-sided lung lesion described'],['Staging','Not documented in demo record'],['Note','Illustrative values only']]},
    {id:'doc-b2',type:'Pathology record',date:'2026-05-20',synthetic:true,verified:false,
     fields:[['Type','Non-small-cell (as reported)'],['Molecular testing','Pending'],['Note','No stage inferred by this demo']]}],
   meds:[],
   symptoms:[{name:'Shortness of breath on exertion',sev:'Mild',onset:'1 month',ref:'patient-reported'}],
   bodyHighlights:{chest:'disease', chest2:'symptom'},
   timeline:[['2026-05','Diagnosis reported (lung)'],['2026-05','Imaging + pathology uploaded (unverified)'],['2026-11','Next appointment scheduled']],
   appt:{when:'2026-11-10',with:'Dr. S. Kulkarni (fictional)',where:'City Cancer Centre (fictional)'} },

 { id:'DEMO-1003', name:'Meera Iyer', address:'Meera', age:54, lang:'ta-IN', langLabel:'Tamil',
   cancerType:'Colorectal cancer', group:'gi', agent:'Gastrointestinal Cancer Support Agent',
   stage:'Not documented', site:'Colon', regStatus:90, synthetic:true,
   reg:baseReg({dob:'1972', diagnosis_date:'2026-02', histology:'Adenocarcinoma (synthetic)', biomarkers:'MSI status pending', allergies:'None reported', hospital:'City Cancer Centre (fictional)', oncologist:'Dr. L. Raman (fictional)', next_appt:'2026-11-02'}),
   reports:[{id:'doc-c1',type:'Pathology + laboratory summary',date:'2026-02-25',synthetic:true,verified:true,
     fields:[['Histology','Adenocarcinoma'],['Site','Colon'],['Haemoglobin','11.2 g/dL (synthetic)'],['Note','Reference ranges vary by lab']]}],
   meds:[{name:'Medication education record (illustrative)',brand:'—',status:'education',source:'Educational only — no prescription',verified:false,dose:'—',route:'—',freq:'—',start:'—',reason:'Explains a treatment category; not prescribed in this record',effects:['Nausea','Diarrhoea','Low blood counts'],warn:['Fever','Persistent vomiting'],monitor:'Ask your oncologist which monitoring applies to you',systems:['intestines','marrow']}],
   symptoms:[{name:'Change in bowel habit',sev:'Moderate',onset:'3 weeks',ref:'patient-reported'}],
   bodyHighlights:{intestines:'disease', liver:'treatment', marrow:'effect'},
   timeline:[['2026-02','Diagnosis reported (colorectal)'],['2026-02','Pathology + lab summary uploaded'],['2026-11','Next appointment scheduled']],
   appt:{when:'2026-11-02',with:'Dr. L. Raman (fictional)',where:'City Cancer Centre (fictional)'} },

 { id:'DEMO-1004', name:'Arjun Singh', address:'Arjun', age:35, lang:'pa-IN', langLabel:'Punjabi',
   cancerType:'Hodgkin lymphoma', group:'heme', agent:'Hematologic Cancer Support Agent',
   stage:'Not documented', site:'Lymphatic system', regStatus:70, synthetic:true,
   reg:baseReg({dob:'1991', diagnosis_date:'2026-06', histology:'Classical Hodgkin lymphoma (synthetic)', biomarkers:'Not documented', allergies:'None reported', hospital:'City Cancer Centre (fictional)', oncologist:'Dr. P. Grewal (fictional)', next_appt:'2026-11-15'}),
   reports:[{id:'doc-d1',type:'Blood count + pathology summary',date:'2026-06-12',synthetic:true,verified:false,
     fields:[['White cell count','Elevated (synthetic)'],['Histology','Classical Hodgkin lymphoma'],['Note','Illustrative values only']]}],
   meds:[],
   symptoms:[{name:'Painless neck swelling',sev:'Mild',onset:'6 weeks',ref:'patient-reported'}],
   bodyHighlights:{marrow:'disease', head_neck:'symptom'},
   timeline:[['2026-06','Diagnosis reported (Hodgkin lymphoma)'],['2026-06','Blood + pathology uploaded (unverified)'],['2026-11','Next appointment scheduled']],
   appt:{when:'2026-11-15',with:'Dr. P. Grewal (fictional)',where:'City Cancer Centre (fictional)'} },

 { id:'DEMO-1005', name:'Fatima Khan', address:'Fatima', age:59, lang:'ur-IN', langLabel:'Urdu / English',
   cancerType:'Ovarian cancer', group:'gyn', agent:'Gynecologic Cancer Support Agent',
   stage:'Not documented', site:'Ovary', regStatus:85, synthetic:true,
   reg:baseReg({dob:'1967', diagnosis_date:'2026-01', histology:'Epithelial ovarian cancer (synthetic)', biomarkers:'CA-125 recorded (illustrative)', allergies:'None reported', hospital:'City Cancer Centre (fictional)', oncologist:'Dr. N. Sheikh (fictional)', next_appt:'2026-11-08'}),
   reports:[{id:'doc-e1',type:'Clinical + laboratory summary',date:'2026-01-30',synthetic:true,verified:true,
     fields:[['CA-125','Recorded (synthetic)'],['Site','Ovary'],['Note','Illustrative values only']]}],
   meds:[{name:'Clinician-recorded therapy (illustrative)',brand:'—',status:'active',source:'Clinician-verified (synthetic source)',verified:true,dose:'Unspecified in demo',route:'Intravenous (as recorded)',freq:'As scheduled',start:'2026-02',reason:'Ovarian cancer (illustrative, synthetic)',effects:['Nausea','Fatigue','Low blood counts','Tingling in hands/feet'],warn:['Fever','Numbness that worsens'],monitor:'Blood counts before each cycle, as advised',systems:['pelvis','marrow','skin']}],
   symptoms:[{name:'Bloating',sev:'Moderate',onset:'1 month',ref:'patient-reported'}],
   bodyHighlights:{pelvis:'disease', marrow:'effect', skin:'effect'},
   timeline:[['2026-01','Diagnosis reported (ovarian)'],['2026-01','Clinical + lab summary uploaded'],['2026-02','Therapy recorded (illustrative)'],['2026-11','Next appointment scheduled']],
   appt:{when:'2026-11-08',with:'Dr. N. Sheikh (fictional)',where:'City Cancer Centre (fictional)'} },

 { id:'DEMO-1006', name:'Dev Patel', address:'Dev', age:16, lang:'gu-IN', langLabel:'Gujarati',
   cancerType:'Acute lymphoblastic leukemia (ALL)', group:'pediatric', agent:'Pediatric Oncology Support Agent',
   stage:'Not applicable / not documented', site:'Bone marrow', regStatus:60, synthetic:true,
   pediatric:true,
   reg:baseReg({dob:'2010', diagnosis_date:'2026-07', histology:'B-ALL (synthetic)', biomarkers:'Cytogenetics pending', allergies:'None reported', hospital:'City Cancer Centre (fictional)', oncologist:'Dr. K. Desai (fictional)', next_appt:'2026-11-06', consent_guardian:true}),
   reports:[{id:'doc-f1',type:'Blood count + hematology summary',date:'2026-07-04',synthetic:true,verified:false,
     fields:[['Blast cells','Present (synthetic)'],['Type','B-ALL'],['Note','Pediatric workflow; guardian consent required']]}],
   meds:[],
   symptoms:[{name:'Recurrent fever',sev:'Moderate',onset:'3 weeks',ref:'patient-reported'}],
   bodyHighlights:{marrow:'disease', skin:'symptom'},
   timeline:[['2026-07','Diagnosis reported (ALL)'],['2026-07','Hematology summary uploaded (unverified)'],['2026-11','Next appointment scheduled']],
   appt:{when:'2026-11-06',with:'Dr. K. Desai (fictional)',where:'City Cancer Centre (fictional)'} }
];

/* Cancer categories (all 39 from the spec) mapped to the 12 agents */
const CATEGORIES = [
 ['breast','Breast cancer','Breast Cancer Support Agent'],
 ['lung','Lung cancer (NSCLC & SCLC)','Lung Cancer Support Agent'],
 ['colorectal','Colorectal cancer (colon & rectal)','Gastrointestinal Cancer Support Agent'],
 ['prostate','Prostate cancer','Genitourinary Cancer Support Agent'],
 ['cervical','Cervical cancer','Gynecologic Cancer Support Agent'],
 ['ovarian','Ovarian cancer','Gynecologic Cancer Support Agent'],
 ['endometrial','Endometrial & uterine cancer','Gynecologic Cancer Support Agent'],
 ['pancreatic','Pancreatic cancer','Gastrointestinal Cancer Support Agent'],
 ['liver','Liver cancer','Gastrointestinal Cancer Support Agent'],
 ['gastric','Stomach & gastric cancer','Gastrointestinal Cancer Support Agent'],
 ['esophageal','Esophageal cancer','Gastrointestinal Cancer Support Agent'],
 ['kidney','Kidney & renal cancer','Genitourinary Cancer Support Agent'],
 ['bladder','Bladder cancer','Genitourinary Cancer Support Agent'],
 ['thyroid','Thyroid cancer','Brain, Bone, Skin, H&N & Rare Agent'],
 ['brain','Brain & CNS tumors','Brain, Bone, Skin, H&N & Rare Agent'],
 ['headneck','Head & neck (incl. oral)','Brain, Bone, Skin, H&N & Rare Agent'],
 ['skin','Skin cancers (incl. melanoma)','Brain, Bone, Skin, H&N & Rare Agent'],
 ['bone','Bone cancer','Brain, Bone, Skin, H&N & Rare Agent'],
 ['sarcoma','Soft-tissue sarcomas','Brain, Bone, Skin, H&N & Rare Agent'],
 ['testicular','Testicular cancer','Genitourinary Cancer Support Agent'],
 ['vaginal','Vaginal & vulvar cancers','Gynecologic Cancer Support Agent'],
 ['gallbladder','Gallbladder & bile duct','Gastrointestinal Cancer Support Agent'],
 ['net','Neuroendocrine tumors','Gastrointestinal Cancer Support Agent'],
 ['adrenal','Adrenal cancers','Genitourinary Cancer Support Agent'],
 ['rare','Other rare & site-specific solid tumors','Brain, Bone, Skin, H&N & Rare Agent'],
 ['all','Acute lymphoblastic leukemia (ALL)','Hematologic Cancer Support Agent'],
 ['aml','Acute myeloid leukemia (AML)','Hematologic Cancer Support Agent'],
 ['cll','Chronic lymphocytic leukemia (CLL)','Hematologic Cancer Support Agent'],
 ['cml','Chronic myeloid leukemia (CML)','Hematologic Cancer Support Agent'],
 ['hl','Hodgkin lymphoma','Hematologic Cancer Support Agent'],
 ['nhl','Non-Hodgkin lymphoma','Hematologic Cancer Support Agent'],
 ['mm','Multiple myeloma','Hematologic Cancer Support Agent'],
 ['mds','Myelodysplastic syndromes','Hematologic Cancer Support Agent'],
 ['mpn','Myeloproliferative neoplasms','Hematologic Cancer Support Agent'],
 ['pediatric','Pediatric cancers','Pediatric Oncology Support Agent'],
 ['cup','Cancer of unknown primary','Fallback / clarification agent'],
 ['metastatic','Recurrent or metastatic cancer','Specialist by primary site'],
 ['multiple','Multiple primary cancers','Specialist by primary site'],
 ['unspecified','Other / unspecified / not-yet-confirmed','Fallback / clarification agent']
];

/* =========================================================================
   CancerCare Voice AI — demo application logic
   Runs entirely in the browser. Demo-mode adapter stands in for:
     - Sarvam speech-to-text / text-to-speech  (browser Web Speech API used)
     - Sarvam translation                     (canned multilingual greetings)
     - LangGraph supervisor + 12 agents        (rule-based intent + cancer routing)
     - FastAPI + PostgreSQL + pgvector RAG     (in-memory data + localStorage)
   ========================================================================= */

const $ = (s,r=document)=>r.querySelector(s);
const $$ = (s,r=document)=>[...r.querySelectorAll(s)];
const esc = s => String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

const state = {
  role:'patient', patientId:'DEMO-1001', lang:'hi-IN',
  view:'dashboard', session:[], regIndex:0, bodyView:'front',
  layers:{disease:true,symptom:true,treatment:true,effect:true},
  selectedRegion:null, clinicianPatient:'DEMO-1001'
};

/* ---------------- persistence ---------------- */
const STORE_KEY='cancercare_demo_v1';
let DB = load();
function load(){
  try{ const raw=localStorage.getItem(STORE_KEY); if(raw) return JSON.parse(raw); }catch(e){}
  return {patients: JSON.parse(JSON.stringify(SEED)), audit:[]};
}
function save(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(DB)); }catch(e){} }
function patient(id){ return DB.patients.find(p=>p.id===(id||state.patientId)); }
function audit(action, detail){
  DB.audit.unshift({t:new Date().toLocaleString('en-IN'), actor:state.role+' · '+state.patientId, action, detail:detail||''});
  DB.audit = DB.audit.slice(0,120); save();
}

/* ---------------- helpers ---------------- */
function toast(msg){ const t=$('#toast'); t.textContent=msg; t.classList.add('show'); clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove('show'),2200); }
function langHi(){ const l=LANGS.find(l=>l.code===state.lang); return l?l.hi:'Welcome'; }
function pick(o){ return o[Math.floor(Math.random()*o.length)]; }

/* =========================================================================
   LOGIN
   ========================================================================= */
function buildLogin(){
  const rp=$('#rolePick');
  const roles=[['patient','Patient','Register, review records, track medicines'],['caregiver','Caregiver','Help manage with patient authorization'],['doctor','Doctor / Oncologist','Review records, verify, approve'],['admin','Administrator','Config, demo data, monitoring']];
  rp.innerHTML = roles.map((r,i)=>`<button class="role ${i===0?'sel':''}" data-role="${r[0]}" onclick="pickRole('${r[0]}',this)"><b>${r[1]}</b><span class="tiny muted">${r[2]}</span></button>`).join('');
  const lp=$('#loginPatient'); lp.innerHTML = DB.patients.map(p=>`<option value="${p.id}">${esc(p.name)} · ${esc(p.cancerType)}</option>`).join('');
  const ls=$('#loginLang'); ls.innerHTML = LANGS.map(l=>`<option value="${l.code}">${esc(l.label)}</option>`).join('');
  ls.value='hi-IN';
}
function pickRole(role,el){ state.role=role; $$('#rolePick .role').forEach(b=>b.classList.remove('sel')); el.classList.add('sel'); $('#patientPickWrap').style.display = (role==='admin')?'none':'block'; }
function doLogin(){
  state.patientId = $('#loginPatient').value || 'DEMO-1001';
  state.lang = $('#loginLang').value || 'hi-IN';
  audit('login', 'role='+state.role);
  $('#login').style.display='none'; $('#app').style.display='block';
  buildNav(); setLang(state.lang); renderAll(); go(state.role==='doctor'?'clinician':state.role==='admin'?'clinician':'dashboard');
}
function logout(){ audit('logout'); $('#app').style.display='none'; $('#login').style.display='grid'; state.session=[]; }

/* =========================================================================
   NAV / VIEWS
   ========================================================================= */
const NAV=[
 ['dashboard','Dashboard','&#127968;','patient caregiver'],
 ['voice','Voice consultation','&#127908;','patient caregiver'],
 ['registration','Registration','&#9997;','patient caregiver'],
 ['info','Cancer information','&#128218;','patient caregiver doctor admin'],
 ['bodymap','Body map','&#129728;','patient caregiver doctor'],
 ['medications','Medications','&#128138;','patient caregiver doctor'],
 ['records','Medical records','&#128193;','patient caregiver doctor'],
 ['reports','Patient report','&#128196;','patient caregiver doctor'],
 ['clinician','Clinician dashboard','&#129658;','doctor admin'],
 ['settings','Settings & privacy','&#9881;','patient caregiver doctor admin']
];
function buildNav(){
  $('#sidebar').innerHTML = NAV.filter(n=>n[3].includes(state.role))
    .map(n=>`<button data-view="${n[0]}" onclick="go('${n[0]}')">${n[2]} ${n[1]}</button>`).join('');
}
function go(view){
  state.view=view;
  $$('.view').forEach(v=>v.classList.remove('active'));
  const el=$('#view-'+view); if(el) el.classList.add('active');
  $$('#sidebar button').forEach(b=>b.classList.toggle('active', b.dataset.view===view));
  if(view==='bodymap') renderBodyMap();
  if(view==='clinician') renderClinician();
  if(view==='reports') renderReport();
  if(view==='voice') renderTranscript();
  if(view==='registration') renderReg();
  if(view==='info') renderInfo();
  if(view==='medications') renderMeds();
  if(view==='records') renderDocs();
  window.scrollTo(0,0);
}
function renderAll(){ renderDash(); renderMeds(); renderDocs(); renderReport(); renderSettings(); renderReg(); renderInfo(); renderTranscript(); }

/* =========================================================================
   LANGUAGE
   ========================================================================= */
function setLang(code){
  state.lang=code;
  ['#langSel','#setLang','#loginLang'].forEach(s=>{ const e=$(s); if(e) e.value=code; });
  const p=patient(); if(p){ p.lang=code; p.langLabel=(LANGS.find(l=>l.code===code)||{}).label||''; save(); }
  renderDash(); renderTranscript();
}
function buildLangSelects(){
  const opts=LANGS.map(l=>`<option value="${l.code}">${esc(l.label)}</option>`).join('');
  ['#langSel','#setLang'].forEach(s=>{ const e=$(s); if(e) e.innerHTML=opts; });
}

/* =========================================================================
   DASHBOARD
   ========================================================================= */
function renderDash(){
  const p=patient(); if(!p) return;
  $('#whoami').textContent = state.role.charAt(0).toUpperCase()+state.role.slice(1)+' · '+p.name;
  $('#connState').textContent = 'Demo mode';
  $('#dashHead').innerHTML = `
    <h2 style="margin-bottom:.1rem">${langHi()}, ${esc(p.address||p.name)}</h2>
    <p class="muted small">${esc(p.cancerType)} · ${esc(p.site)} · ${p.synthetic?'<span class="pill pill-coral">Synthetic record</span>':''}</p>`;
  $('#dashStats').innerHTML = [
    ['Diagnosis', esc(p.cancerType)],
    ['Stage', p.stage && p.stage.toLowerCase().includes('documented')||p.stage==='Unknown' ? `<span class="unknown">${esc(p.stage)}</span>` : esc(p.stage)],
    ['Active medicines', p.meds.filter(m=>m.status==='active').length],
    ['Documents', p.reports.length],
    ['Symptoms logged', p.symptoms.length]
  ].map(([k,v])=>`<div class="card"><div class="tiny muted" style="font-weight:700;text-transform:uppercase;letter-spacing:.03em">${k}</div><div style="font-size:1.15rem;font-weight:650;margin-top:.2em">${v}</div></div>`).join('');

  $('#regStatusCard').innerHTML = `
    <h3>Registration</h3>
    <div class="progress"><i style="width:${p.regStatus}%"></i></div>
    <div class="row" style="justify-content:space-between"><span class="small"><b>${p.regStatus}%</b> complete</span><button class="btn-sm btn-ghost" onclick="go('registration')">Continue</button></div>
    <p class="tiny muted" style="margin-top:.6rem">Missing: ${missingFields(p).slice(0,3).map(f=>esc(f.label)).join(', ')||'none — great!'}</p>`;

  $('#dashMeds').innerHTML = `<h3>Medicines</h3>` + (p.meds.length? p.meds.slice(0,3).map(m=>`
      <div class="fieldbox" style="margin-bottom:.5rem">
        <div class="row" style="justify-content:space-between;align-items:center"><b>${esc(m.name)}</b>${medStatusPill(m)}</div>
        <div class="tiny muted">${esc(m.reason)}</div>
      </div>`).join('') : `<p class="muted small">No medication is prescribed in this demo record. The assistant can still explain treatment categories and what to ask your oncologist.</p>`) + `<button class="btn-sm btn-ghost" onclick="go('medications')">Open medication dashboard</button>`;

  $('#dashBody').innerHTML = `<h3>Body map</h3><p class="muted small">Highlighted for this record: ${Object.keys(p.bodyHighlights||{}).map(r=>esc((BODY_REGIONS[r]||{}).name||r)).join(', ')||'—'}</p><button class="btn-sm btn-ghost" onclick="go('bodymap')">Open body map</button>`;

  $('#dashAppt').innerHTML = `<h3>Upcoming appointment</h3>` + (p.appt? `<div class="kv"><span class="k">When</span><span class="v">${esc(p.appt.when)}</span></div><div class="kv"><span class="k">With</span><span class="v">${esc(p.appt.with)}</span></div><div class="kv"><span class="k">Where</span><span class="v">${esc(p.appt.where)}</span></div>`:'<p class="muted small">None recorded.</p>');

  $('#dashSymp').innerHTML = `<h3>Symptom tracker</h3>` + (p.symptoms.length? p.symptoms.map(s=>`<div class="kv"><span class="k">${esc(s.name)}</span><span class="v">${esc(s.sev)} · ${esc(s.onset)} <span class="tag" style="background:var(--amber-soft);color:var(--amber)">patient-reported</span></span></div>`).join(''):'<p class="muted small">None logged.</p>') + `<div style="height:.5rem"></div><button class="btn-sm btn-ghost" onclick="logSymptom()">Log a symptom</button>`;
}
function medStatusPill(m){
  const map={active:['pill-green','Active prescription'],historical:['pill','Historical'],patient:['pill-amber','Patient-reported'],education:['pill-teal','Education only'],review:['pill-coral','Awaiting clinician review']};
  const [c,l]=map[m.status]||['pill','Recorded'];
  return `<span class="pill ${c}">${l}</span>`;
}
function missingFields(p){
  const labels={dob:'Date of birth',diagnosis_date:'Diagnosis date',stage:'Cancer stage (only if documented)',histology:'Histology',biomarkers:'Biomarker results',allergies:'Allergies',hospital:'Treating hospital',oncologist:'Oncologist',next_appt:'Next appointment',emergency:'Emergency contact',contact:'Contact'};
  return Object.keys(labels).filter(k=>!p.reg[k]).map(k=>({key:k,label:labels[k]}));
}
function logSymptom(){
  const p=patient(); const n=prompt('Describe the symptom (patient-reported):'); if(!n) return;
  const sev=prompt('Severity (Mild / Moderate / Severe):','Moderate')||'Moderate';
  p.symptoms.push({name:n,sev:sev,onset:'just now',ref:'patient-reported'}); save(); audit('symptom logged',n);
  renderDash(); toast('Symptom recorded as patient-reported');
}
function quickAsk(q){ go('voice'); setTimeout(()=>ask(q),150); }

/* =========================================================================
   VOICE CONSULTATION
   ========================================================================= */
function renderTranscript(){
  const box=$('#transcript'); if(!box) return;
  box.innerHTML = state.session.length? state.session.map(m=>{
    if(m.role==='sys') return `<div class="msg sys">${esc(m.text)}</div>`;
    return `<div class="msg ${m.role} ${m.escalate?'escalate':''}">${esc(m.text)}${m.sources&&m.sources.length?`<span class="src">Sources: ${m.sources.map(esc).join(' · ')}</span>`:''}${m.agent?`<span class="src">Agent: ${esc(m.agent)}</span>`:''}</div>`;
  }).join('') : `<p class="muted small">Your conversation will appear here. Try one of the example questions.</p>`;
  box.scrollTop=box.scrollHeight;
  const chips=['Explain my latest report in simple language','What are my medicines and why were they given?','मेरी chemotherapy के बाद थकान हो रही है','What questions should I ask my oncologist?','I want to register my medical history','I have chest pain and cannot breathe'];
  const c=$('#voiceChips'); if(c) c.innerHTML = chips.map(x=>`<span class="chip" onclick="ask(${JSON.stringify(x).replace(/"/g,'&quot;')})">${esc(x)}</span>`).join('');
}
function clearSession(){ state.session=[]; renderTranscript(); toast('Session transcripts cleared'); }

let recog=null, recording=false;
function toggleMic(){
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(!SR){ $('#micStatus').textContent='Speech recognition unavailable here'; $('#micHint').textContent='Your browser does not expose the Web Speech API (try Chrome). Type your question below instead.'; return; }
  if(recording){ recog && recog.stop(); return; }
  recog = new SR(); recog.lang = state.lang; recog.interimResults=false; recog.maxAlternatives=1;
  recording=true; $('#micBtn').classList.add('rec'); $('#micStatus').textContent='Listening… speak now';
  $('#micHint').textContent='Tap again to stop.';
  recog.onresult = e => { const t=e.results[0][0].transcript; recording=false; $('#micBtn').classList.remove('rec'); $('#micStatus').textContent='Heard: '+t; ask(t); };
  recog.onerror = e => { recording=false; $('#micBtn').classList.remove('rec'); $('#micStatus').textContent='Could not hear that'; $('#micHint').textContent='Error: '+e.error+'. Please type instead.'; };
  recog.onend = () => { recording=false; $('#micBtn').classList.remove('rec'); };
  try{ recog.start(); }catch(e){ recording=false; $('#micBtn').classList.remove('rec'); }
}
function askTyped(){ const v=$('#typedAsk').value.trim(); if(!v) return; $('#typedAsk').value=''; ask(v); }

function speak(text){
  if(!('speechSynthesis' in window)) return;
  try{ const u=new SpeechSynthesisUtterance(text); u.lang=state.lang; u.rate=.98; speechSynthesis.cancel(); speechSynthesis.speak(u); }catch(e){}
}
function addMsg(role,text,extra){ state.session.push(Object.assign({role,text},extra||{})); renderTranscript(); }

function ask(text){
  const p=patient();
  addMsg('patient', text);
  const r = respond(p, text);
  setTimeout(()=>{ addMsg('assistant', r.text, {sources:r.sources, agent:r.agent, escalate:r.escalation}); speak(r.text); audit('voice query', r.agent+' | '+text.slice(0,60)); }, 420);
}

/* --- Emergency / safety keywords (multi-lingual, plain substring match) --- */
const EMERGENCY = [
 ['chest pain','heart'],['severe breathing','breath'],['cannot breathe','breath'],['can\'t breathe','breath'],
 ['shortness of breath','breath'],['saans','breath'],['सांस','breath'],['दम','breath'],
 ['uncontrolled bleeding','bleed'],['bleeding','bleed'],['खून','bleed'],
 ['seizure','seizure'],['fits','seizure'],['confusion','confusion'],['confused','confusion'],
 ['severe allergic','allergy'],['swelling of face','allergy'],['anaphyla','allergy'],
 ['high fever','fever'],['बुखार','fever'],['fever','fever'],['bukhar','fever']
];
const MED_SELECT = ['which medicine should i take','which medicine should i','what medicine should i take','should i take for my cancer','konsi dawa','कौन सी दवा','which chemo','should i stop','should i change my dose','increase my dose'];

function detectEmergency(t){ const s=t.toLowerCase(); for(const [k,tag] of EMERGENCY){ if(s.includes(k)) return tag; } return null; }

/* --- Intent + cancer-type routing (stands in for the LangGraph supervisor) --- */
function respond(p, text){
  const s=text.toLowerCase();

  // 1) Emergency escalation — takes precedence over everything.
  const emg = detectEmergency(s);
  if(emg){
    return { agent:'Symptom & Triage Agent', escalation:true,
      text:`This may need urgent medical attention. I cannot assess how serious it is — please do not wait on this app. Contact your oncology team's emergency number or your local emergency services (in India, 108 / 112) now. If you have been given specific fever instructions by your oncology team, follow those. I have stopped normal conversation until you have been assessed.`,
      sources:['Clinically reviewed escalation protocol (demo)'] };
  }

  // 2) Medication selection request — never prescribe.
  if(MED_SELECT.some(k=>s.includes(k))){
    return { agent:'Medication Information Agent',
      text:`I can't choose a medicine for you, and I won't suggest starting, stopping or changing any cancer treatment — that decision depends on your exact diagnosis and clinical evaluation, and only your oncologist can make it. What I can do is explain the broad treatment categories that exist for ${esc(p.cancerType)}, and help you prepare questions for your team. Would you like that?`,
      sources:['CancerCare safety policy'] };
  }

  // 3) Intent classification
  if(/register|registration|my (medical )?history|भर्ती|पंजीकरण/.test(s)){
    go('registration');
    return { agent:'Registration flow', text:`Sure — let's register your medical history together, one question at a time. I've opened the registration wizard. Nothing is saved unless you confirm it.`, sources:[] };
  }
  if(/appointment|questions|ask (my|the) (doctor|oncologist)|next visit|डॉक्टर/.test(s)){
    return { agent:'Patient Education & Emotional Support Agent',
      text:`Good preparation helps. For your next appointment with ${esc((p.appt&&p.appt.with)||'your oncologist')}, consider asking:\n1. What do my latest reports show, in plain language?\n2. What is my documented diagnosis and stage, and what does it mean?\n3. What is the goal of the treatment you've recommended?\n4. What side effects should I watch for, and which need urgent attention?\n5. Are there tests or documents I'm missing?\nI've saved these to your report too.`,
      sources:['CancerCare appointment-prep guidance'] };
  }
  if(/report|scan|pathology|blood|lab|x-?ray|ct|mri|biopsy|रिपोर्ट|रिपोट/.test(s)){
    const r=p.reports[0];
    if(!r) return { agent:'Medical Document Agent', text:`I don't see an uploaded report in your record yet. Upload a report under Medical records and I'll extract its text for you to confirm — I'll keep its source and page reference, and I won't treat OCR text as verified truth.`, sources:[] };
    const fields=r.fields.map(f=>`• ${f[0]}: ${f[1]}`).join('\n');
    return { agent:'Medical Document Agent',
      text:`Here is what your ${esc(r.type)} (dated ${esc(r.date)}) contains, in plain language. These are extracted fields for you to confirm with your clinician — not my interpretation of your disease:\n${fields}\nRemember, a pathology report is read together with stage and other findings by your oncologist.`,
      sources:[r.synthetic?'Synthetic demo document (illustrative)':r.type] };
  }
  if(/medicine|medication|dawa|दवा|dawaai|side effect|दुष्प्रभाव/.test(s)){
    if(!p.meds.length) return { agent:'Medication Information Agent', text:`No medicine is prescribed in this record, so there's nothing for me to explain as a prescription. I can explain treatment categories for ${esc(p.cancerType)} in general terms, and I'll always tell you when something is educational rather than a real prescription.`, sources:['CancerCare safety policy'] };
    const m=p.meds[0];
    return { agent:'Medication Information Agent',
      text:`Your record lists: ${esc(m.name)} — ${esc(m.status)}. Source: ${esc(m.source)}.\nRecorded purpose: ${esc(m.reason)}.\nCommonly described effects: ${m.effects.join(', ')}.\nMonitoring: ${esc(m.monitor)}.\nThis is educational information about a documented record. Never change a dose on your own — any change must come from your clinician.`,
      sources:['Documented prescription (synthetic demo)','NCI medication information'] };
  }
  if(/tired|fatigue|थकान|nausea|vomit|pain|symptom|swelling|bleed|numb|tingl/.test(s)){
    return { agent:'Symptom & Triage Agent',
      text:`Thank you for telling me. Fatigue and other symptoms are common during cancer treatment, but severity matters. Could you tell me: when did it start, how severe is it (mild / moderate / severe), and does it come with fever, shortness of breath, chest pain or dizziness? If any of those are present, please seek urgent assessment now rather than waiting.`,
      sources:['NHS — Cancer fatigue','Clinically reviewed escalation protocol (demo)'] };
  }
  if(/scared|afraid|worried|anxious|depress|alone|help me cope|डर|चिंता/.test(s)){
    return { agent:'Patient Education & Emotional Support Agent',
      text:`I hear you, and it's completely understandable to feel this way. You're not alone in this. I can't replace the people who care for you, but I can explain things in your language, help you prepare questions, and point you to support. Would it help to talk through what's worrying you most right now, or to go over what your reports mean?`,
      sources:['CancerCare supportive-care guidance'] };
  }
  if(/what is|what are|what does|explain|tell me about|meaning of|kya hai|क्या है|information about/.test(s)){
    const kb = KB.find(k=>k.cat===p.group) || KB.find(k=>k.cat==='general');
    if(kb) return { agent:p.agent, text: kb.text, sources:[kb.src+' ('+kb.date+')'] };
  }
  // fallback agent
  return { agent:'Fallback / clarification agent',
    text:`I want to be careful here and not guess. I'm not sure exactly what you'd like help with — could you tell me whether your question is about your reports, your medicines, a symptom you're feeling, or preparing for an appointment? I won't invent a diagnosis to fill the gap.`,
    sources:[] };
}

/* =========================================================================
   REGISTRATION WIZARD
   ========================================================================= */
const REG_STEPS=[
 {key:'name', q:'What name would you like to use for your medical record?', chip:'My name is Ananya Sharma', set:(p,v)=>{ if(!p.reg._named){ p.name=v.replace(/^my name is\s*/i,'').trim()||p.name; p.address=p.name.split(' ')[0]; p.reg._named=true; } }},
 {key:'langLabel', q:'Which language would you prefer for our conversations?', chip:'Hindi', set:(p,v)=>{ const l=LANGS.find(l=>v.toLowerCase().includes(l.label.split(' ')[0].toLowerCase())||v.toLowerCase().includes(l.code.split('-')[0])); if(l){p.lang=l.code;p.langLabel=l.label;} else p.langLabel=v; }},
 {key:'dob', q:'What is your date of birth or age?', chip:'48', set:(p,v)=>{ const m=v.match(/\d{4}/); if(m)p.reg.dob=m[0]; else { const a=v.match(/\d+/); if(a){p.age=+a[0];p.reg.dob=(2026-(+a[0]))+'';} } }},
 {key:'diagnosis', q:'Have you received a cancer diagnosis from a healthcare professional? If so, which type?', chip:'Yes, breast cancer', set:(p,v)=>{ if(!p.reg._diag){ p.cancerType=v.replace(/^(yes[,\s]*)/i,'').trim()||p.cancerType; p.reg._diag=true; } }},
 {key:'diagnosis_date', q:'When were you diagnosed, if you know? (It is fine to say you don\u2019t know.)', chip:'March 2026', set:(p,v)=>{ if(/don.?t know|unknown|not sure|पता नहीं/i.test(v)){p.reg.diagnosis_date='';p.reg._ddk=true;} else p.reg.diagnosis_date=v; }},
 {key:'stage', q:'Has a stage been documented for you? I will only record it if it has been.', chip:'Not documented', set:(p,v)=>{ p.reg.stage=/not|unknown|don.?t know|नहीं/i.test(v)?'':v; p.stage=p.reg.stage||'Not documented'; }},
 {key:'histology', q:'Do you have histology or biopsy details from a report?', chip:'Invasive ductal carcinoma', set:(p,v)=>{ p.reg.histology=/no|don.?t know|नहीं/i.test(v)?'':v; }},
 {key:'biomarkers', q:'Any biomarker results you know of, such as ER, PR or HER2?', chip:'ER positive, HER2 negative', set:(p,v)=>{ p.reg.biomarkers=/no|don.?t know|नहीं/i.test(v)?'':v; }},
 {key:'allergies', q:'Do you have any allergies or bad reactions to medicines?', chip:'None', set:(p,v)=>{ p.reg.allergies=v; }},
 {key:'hospital', q:'Which hospital or centre is treating you?', chip:'City Cancer Centre', set:(p,v)=>{ p.reg.hospital=v; }},
 {key:'oncologist', q:'Who is your oncologist or treating doctor?', chip:'Dr. R. Menon', set:(p,v)=>{ p.reg.oncologist=v; }},
 {key:'next_appt', q:'When is your next appointment, if you have one?', chip:'4 November 2026', set:(p,v)=>{ p.reg.next_appt=v; }},
 {key:'consent', q:'Finally: do you consent to us storing this record and using AI to help explain it?', chip:'Yes, I consent', set:(p,v)=>{ const yes=/yes|haan|हाँ|consent|agree/i.test(v); p.reg.consent_storage=yes; p.reg.consent_ai=yes; }}
];
function regProgress(p){ return Math.min(100, Math.round((REG_STEPS.filter(st=>fieldDone(p,st)).length/REG_STEPS.length)*100)); }
function fieldDone(p,st){
  if(st.key==='name') return !!p.reg._named;
  if(st.key==='langLabel') return !!p.langLabel;
  if(st.key==='diagnosis') return !!p.reg._diag;
  if(st.key==='consent') return p.reg.consent_storage && p.reg.consent_ai;
  return p.reg[st.key]!==undefined && p.reg[st.key]!=='' && p.reg[st.key]!==null;
}
function renderReg(){
  const p=patient(); if(!p||!$('#regSteps')) return;
  const done=REG_STEPS.filter(st=>fieldDone(p,st)).length;
  const pct=Math.round(done/REG_STEPS.length*100);
  p.regStatus=pct; save();
  $('#regBar').style.width=pct+'%';
  $('#regSteps').innerHTML=REG_STEPS.map((st,i)=>{
    const d=fieldDone(p,st); const now=(i===state.regIndex);
    return `<div class="step ${d?'done':''} ${now&&!d?'now':''}">${d?'&#10003; ':''}${esc(st.q.split('?')[0]).slice(0,26)}…</div>`;
  }).join('');
  const st=REG_STEPS[state.regIndex];
  const chat=$('#regChat');
  chat.innerHTML = `<div class="msg assistant">${esc(st.q)}</div>` + (fieldDone(p,st)?`<div class="msg sys">Saved ✓</div>`:'');
  const c=$('#regChips'); c.innerHTML=`<span class="chip" onclick="regPrefill()">${esc(st.chip)}</span><span class="chip" onclick="regSkip()">Skip / not known</span><span class="chip" onclick="regBack()">Back</span>`;
  // saved fields panel
  $('#regFields').innerHTML = REG_STEPS.map(st2=>{
    const d=fieldDone(p,st2);
    let val = st2.key==='name'?p.name : st2.key==='langLabel'?p.langLabel : st2.key==='diagnosis'?p.cancerType : st2.key==='consent'?(p.reg.consent_storage?'Consent given':'Not given') : p.reg[st2.key];
    return `<div class="kv"><span class="k">${esc(st2.key.replace(/_/g,' '))}</span><span class="v">${d?esc(val):'<span class="unknown">unknown</span>'} ${d?'<span class="savedflag">saved</span>':''}</span></div>`;
  }).join('');
}
function regPrefill(){ const st=REG_STEPS[state.regIndex]; $('#regInput').value=st.chip; regAnswer(); }
function regSkip(){ const st=REG_STEPS[state.regIndex]; st.set(patient(),'not known'); advanceReg(); }
function regBack(){ state.regIndex=Math.max(0,state.regIndex-1); renderReg(); }
function regAnswer(){
  const st=REG_STEPS[state.regIndex]; const v=$('#regInput').value.trim(); if(!v) return;
  st.set(patient(),v); save(); audit('registration field', st.key+' = '+v.slice(0,40));
  $('#regInput').value=''; advanceReg();
}
function advanceReg(){ state.regIndex=Math.min(REG_STEPS.length, state.regIndex+1); renderReg(); renderDash(); if(state.regIndex>=REG_STEPS.length){ toast('Registration complete — generating your report'); go('reports'); } }

/* =========================================================================
   CANCER INFORMATION CENTER
   ========================================================================= */
function renderInfo(){
  const q=($('#infoSearch')&&$('#infoSearch').value||'').toLowerCase();
  const items=CATEGORIES.filter(c=>!q||c[1].toLowerCase().includes(q)||c[2].toLowerCase().includes(q));
  $('#infoGrid').innerHTML = items.map(c=>{
    const kb=KB.find(k=>k.cat===c[0]);
    return `<div class="card"><h4>${esc(c[1])}</h4><div class="tiny muted">${esc(c[2])}</div><hr><p class="small">${kb?esc(kb.text):'Plain-language education for this category is retrieved from the source-grounded knowledge collection in a live deployment.'}</p><div class="tiny muted">Source: ${kb?esc(kb.src)+' ('+esc(kb.date)+')':'NCI / NHS / WHO'}</div></div>`;
  }).join('') || '<p class="muted">No category matched.</p>';
}

/* =========================================================================
   BODY MAP
   ========================================================================= */
const SHAPES = {
 front:[
  ['brain','<circle cx="130" cy="50" r="30"/>'],
  ['head_neck','<ellipse cx="130" cy="88" rx="17" ry="13"/>'],
  ['chest','<path d="M92 108 Q130 96 168 108 L164 190 Q130 198 96 190 Z"/>'],
  ['breast','<ellipse cx="112" cy="168" rx="17" ry="14"/><ellipse cx="148" cy="168" rx="17" ry="14"/>'],
  ['liver','<ellipse cx="110" cy="214" rx="20" ry="13"/>'],
  ['stomach','<ellipse cx="150" cy="212" rx="16" ry="12"/>'],
  ['pancreas','<ellipse cx="134" cy="224" rx="13" ry="6"/>'],
  ['intestines','<rect x="100" y="232" width="60" height="40" rx="14"/>'],
  ['kidney','<ellipse cx="99" cy="236" rx="9" ry="13"/><ellipse cx="161" cy="236" rx="9" ry="13"/>'],
  ['pelvis','<path d="M100 280 Q130 274 160 280 L156 320 Q130 330 104 320 Z"/>'],
  ['marrow','<ellipse cx="112" cy="316" rx="10" ry="14"/><ellipse cx="148" cy="316" rx="10" ry="14"/><ellipse cx="116" cy="380" rx="8" ry="26"/><ellipse cx="144" cy="380" rx="8" ry="26"/>'],
  ['bones','<rect x="58" y="112" width="24" height="150" rx="12"/><rect x="178" y="112" width="24" height="150" rx="12"/><rect x="104" y="322" width="22" height="190" rx="11"/><rect x="134" y="322" width="22" height="190" rx="11"/>'],
  ['skin','<ellipse cx="70" cy="272" rx="11" ry="14"/><ellipse cx="190" cy="272" rx="11" ry="14"/><ellipse cx="115" cy="500" rx="10" ry="13"/><ellipse cx="145" cy="500" rx="10" ry="13"/>']
 ],
 back:[
  ['brain','<circle cx="130" cy="50" r="30"/>'],
  ['head_neck','<ellipse cx="130" cy="88" rx="17" ry="13"/>'],
  ['chest','<path d="M92 108 Q130 96 168 108 L164 190 Q130 198 96 190 Z"/>'],
  ['kidney','<ellipse cx="108" cy="228" rx="12" ry="16"/><ellipse cx="152" cy="228" rx="12" ry="16"/>'],
  ['marrow','<rect x="120" y="120" width="20" height="150" rx="10"/><ellipse cx="112" cy="316" rx="10" ry="14"/><ellipse cx="148" cy="316" rx="10" ry="14"/>'],
  ['bones','<rect x="58" y="112" width="24" height="150" rx="12"/><rect x="178" y="112" width="24" height="150" rx="12"/><rect x="104" y="322" width="22" height="190" rx="11"/><rect x="134" y="322" width="22" height="190" rx="11"/>'],
  ['skin','<ellipse cx="70" cy="272" rx="11" ry="14"/><ellipse cx="190" cy="272" rx="11" ry="14"/><ellipse cx="115" cy="500" rx="10" ry="13"/><ellipse cx="145" cy="500" rx="10" ry="13"/>'],
  ['pelvis','<path d="M100 280 Q130 274 160 280 L156 320 Q130 330 104 320 Z"/>']
 ]
};
const LAYERS=[['disease','Disease location','var(--coral)'],['symptom','Patient-reported symptom','var(--amber)'],['treatment','Treatment target','var(--teal)'],['effect','Possible medication effect','#7C6BB0']];
function setBodyView(v){ state.bodyView=v; renderBodyMap(); }
function toggleLayer(l){ state.layers[l]=!state.layers[l]; renderBodyMap(); }
function renderBodyMap(){
  if(!$('#svgHost')) return;
  const p=patient();
  $('#layerToggle').innerHTML = LAYERS.map(l=>`<button class="${state.layers[l[0]]?'':'off'}" onclick="toggleLayer('${l[0]}')"><span class="swatch" style="background:${l[2]};display:inline-block;margin-right:.3em"></span>${l[1]}</button>`).join('');
  $('#viewFront').className='btn-sm '+(state.bodyView==='front'?'btn-primary':'btn-ghost');
  $('#viewBack').className='btn-sm '+(state.bodyView==='back'?'btn-primary':'btn-ghost');
  const hl=p.bodyHighlights||{};
  const shapes=SHAPES[state.bodyView].map(([region,svg])=>{
    let cls='region';
    const layer=hl[region];
    if(layer && state.layers[layer]) cls+=' on-'+layer;
    if(state.selectedRegion===region) cls+=' selected';
    return `<g class="${cls}" data-region="${region}" onclick="selectRegion('${region}')">${svg}</g>`;
  }).join('');
  $('#svgHost').innerHTML = `<svg viewBox="0 0 260 540" width="260" height="470" role="img" aria-label="Human body ${state.bodyView} view">${shapes}</svg>`;
  $('#bodyLegend').innerHTML = LAYERS.map(l=>`<span><i class="swatch" style="background:${l[2]}"></i>${l[1]}</span>`).join('') + `<span class="tiny muted" style="margin-top:.3rem">Grey = no annotation in this record</span>`;
}
function selectRegion(region){
  state.selectedRegion=region; renderBodyMap();
  const p=patient(); const info=BODY_REGIONS[region]||{name:region,systems:[]};
  const layer=(p.bodyHighlights||{})[region];
  const layerLabel={disease:'Documented condition / disease location',symptom:'Patient-reported symptom',treatment:'Documented treatment target',effect:'Possible medication-related effect'}[layer];
  const kb = KB.find(k=>k.cat===p.group)||KB[0];
  $('#bodyDetail').innerHTML = `
    <h3>${esc(info.name)}</h3>
    <div class="kv"><span class="k">Why it is highlighted</span><span class="v">${layer?esc(layerLabel):'Not annotated in this record'}</span></div>
    <div class="kv"><span class="k">Related cancer systems</span><span class="v">${info.systems.map(esc).join(', ')||'—'}</span></div>
    <p class="small" style="margin-top:.7rem"><b>Plain language:</b> ${layer==='disease'?`This is where the documented ${esc(p.cancerType)} is located in this record.`:
      layer==='symptom'?`You reported a symptom here. This is your own report, not a clinical finding.`:
      layer==='treatment'?`A documented treatment may act in this region. This shows a treatment target, not damage.`:
      layer==='effect'?`A documented medicine has <b>possible</b> effects in this region. This is <b>not</b> evidence that the medicine has affected you — it is a known monitoring concern to discuss with your team.`:
      `No annotation for this region in the current record.`}</p>
    ${layer==='effect'?`<div class="notice" style="margin:.6rem 0">Possible adverse effect — not a confirmed finding. A medicine name alone never implies organ damage.</div>`:''}
    ${p.symptoms.filter(s=>info.systems.some(x=>s.name.toLowerCase().includes(x.toLowerCase().split(' ')[0]))).map(s=>`<div class="tiny">Patient-reported: ${esc(s.name)} (${esc(s.sev)})</div>`).join('')}
    <hr>
    <div class="tiny muted">Warning signs: seek urgent assessment for severe breathing difficulty, chest pain, confusion, uncontrolled bleeding, new seizures, or fever per your oncology team's instructions.</div>
    <div class="tiny muted" style="margin-top:.4rem">Source: ${esc(kb.src)} (${esc(kb.date)}) · Last verified: ${esc(kb.date)} · Educational only</div>`;
}

/* =========================================================================
   MEDICATIONS
   ========================================================================= */
function renderMeds(){
  const p=patient(); if(!$('#medSections')) return;
  const groups=[['active','Active clinician-prescribed'],['historical','Historical medicines'],['patient','Patient-reported use'],['education','AI medication education'],['review','Awaiting clinician review']];
  $('#medSections').innerHTML = groups.map(([st,label])=>{
    const list=p.meds.filter(m=>m.status===st);
    if(!list.length && st!=='education') return '';
    return `<div class="card" style="margin-bottom:1rem"><h3>${label}</h3>` + (list.length? list.map(m=>medCard(m)).join('') : `<p class="muted small">None recorded. The assistant can still explain treatment categories for ${esc(p.cancerType)} and help you prepare questions.</p>`) + `</div>`;
  }).join('') + `<div class="notice danger">CancerCare never selects, prescribes, or changes cancer treatment. Any change must be made by an authorized clinician.</div>`;
}
function medCard(m){
  return `<div class="fieldbox" style="margin-bottom:.7rem">
    <div class="row" style="justify-content:space-between;align-items:center"><b>${esc(m.name)}</b><div>${medStatusPill(m)} ${m.verified?'<span class="pill pill-green">Verified</span>':'<span class="pill pill-amber">Unverified</span>'}</div></div>
    <div class="grid grid-2" style="margin-top:.5rem">
      <div><div class="kv"><span class="k">Generic / brand</span><span class="v">${esc(m.name)}${m.brand&&m.brand!=='—'?' / '+esc(m.brand):''}</span></div>
      <div class="kv"><span class="k">Dose &amp; route</span><span class="v">${esc(m.dose)} · ${esc(m.route)}</span></div>
      <div class="kv"><span class="k">Frequency</span><span class="v">${esc(m.freq)}</span></div>
      <div class="kv"><span class="k">Start</span><span class="v">${esc(m.start)}</span></div></div>
      <div><div class="kv"><span class="k">Documented reason</span><span class="v">${esc(m.reason)}</span></div>
      <div class="kv"><span class="k">Common effects</span><span class="v">${m.effects.map(esc).join(', ')}</span></div>
      <div class="kv"><span class="k">Serious warning signs</span><span class="v">${m.warn.map(esc).join(', ')}</span></div>
      <div class="kv"><span class="k">Monitoring</span><span class="v">${esc(m.monitor)}</span></div></div>
    </div>
    <div class="tiny muted" style="margin-top:.4rem">Source: ${esc(m.source)} · Body systems: ${m.systems.map(s=>esc((BODY_REGIONS[s]||{}).name||s)).join(', ')}</div>
    <div style="margin-top:.4rem"><button class="btn-sm btn-ghost" onclick="requestReview('${esc(m.name)}')">Ask my clinician about this</button></div>
  </div>`;
}
function requestReview(med){ const p=patient(); audit('clinician review requested',med); toast('Review request sent to your clinician (demo)'); if(state.role==='doctor') renderClinician(); }

/* =========================================================================
   MEDICAL RECORDS
   ========================================================================= */
function renderDocs(){
  const p=patient(); if(!$('#docList')) return;
  $('#docList').innerHTML = p.reports.length? p.reports.map(d=>`
    <div class="fieldbox" style="margin-bottom:.6rem">
      <div class="row" style="justify-content:space-between;align-items:center"><b>${esc(d.type)}</b><span class="pill ${d.verified?'pill-green':'pill-amber'}">${d.verified?'Verified':'Unverified'}</span></div>
      <div class="tiny muted">Dated ${esc(d.date)} · ${d.synthetic?'Synthetic demo document':'Uploaded'} · source ref ${esc(d.id)}</div>
      <div style="margin-top:.4rem">${d.fields.map(f=>`<div class="kv"><span class="k">${esc(f[0])}</span><span class="v">${esc(f[1])}</span></div>`).join('')}</div>
    </div>`).join('') : '<p class="muted small">No documents on file.</p>';
}
function handleUpload(e){
  const f=e.target.files[0]; if(!f) return;
  const p=patient();
  $('#uploadOut').innerHTML = `<div class="notice info">Extracting text from <b>${esc(f.name)}</b>…</div>`;
  setTimeout(()=>{
    const d={id:'doc-'+Math.random().toString(36).slice(2,6),type:'Uploaded document (demo extraction)',date:new Date().toISOString().slice(0,10),synthetic:true,verified:false,
      fields:[['File',f.name],['Detected type','Prescription / report (demo classifier)'],['Extracted text','Synthetic extraction — OCR text is not verified clinical truth'],['Note','Confirm each field before saving']]};
    p.reports.push(d); save(); audit('document uploaded',f.name);
    $('#uploadOut').innerHTML = `<div class="notice">Extracted fields for <b>${esc(f.name)}</b> — please confirm before saving. Ambiguous names, dates, units and doses are flagged, never auto-applied.</div>
      <div style="margin-top:.5rem">${d.fields.map(fl=>`<div class="kv"><span class="k">${esc(fl[0])}</span><span class="v">${esc(fl[1])}</span></div>`).join('')}</div>
      <div style="margin-top:.6rem"><button class="btn-primary btn-sm" onclick="confirmDoc('${d.id}')">Confirm &amp; save to my record</button> <button class="btn-ghost btn-sm" onclick="discardDoc('${d.id}')">Discard</button></div>`;
    renderDocs();
  }, 700);
}
function confirmDoc(id){ const p=patient(); const d=p.reports.find(r=>r.id===id); if(d){d.verified=true;save();audit('document confirmed',id);toast('Saved to record (marked verified by you)');renderDocs();renderDash();} }
function discardDoc(id){ const p=patient(); p.reports=p.reports.filter(r=>r.id!==id); save(); $('#uploadOut').innerHTML=''; renderDocs(); toast('Discarded'); }

/* =========================================================================
   PATIENT REPORT
   ========================================================================= */
function generateReport(){ toast('Report regenerated'); renderReport(); }
function renderReport(){
  const p=patient(); if(!$('#reportBody')) return;
  const kb=KB.find(k=>k.cat===p.group)||KB[0];
  const missing=missingFields(p);
  $('#reportBody').innerHTML = `
  <div class="card" style="margin-bottom:1rem">
    <div class="row" style="justify-content:space-between"><h3>Patient summary</h3><span class="pill pill-coral">Synthetic demo record</span></div>
    <div class="kv"><span class="k">Patient ID</span><span class="v">${esc(p.id)}</span></div>
    <div class="kv"><span class="k">Preferred language</span><span class="v">${esc(p.langLabel||p.lang)}</span></div>
    <div class="kv"><span class="k">Reported / documented diagnosis</span><span class="v">${esc(p.cancerType)} · ${esc(p.site)}</span></div>
    <div class="kv"><span class="k">Stage</span><span class="v">${p.stage&&/documented|unknown/i.test(p.stage)?`<span class="unknown">${esc(p.stage)}</span>`:esc(p.stage)}</span></div>
    <div class="kv"><span class="k">Active medicines (verified)</span><span class="v">${p.meds.filter(m=>m.status==='active'&&m.verified).map(m=>esc(m.name)).join(', ')||'None verified'}</span></div>
    <div class="kv"><span class="k">Allergies</span><span class="v">${esc(p.reg.allergies||'Not recorded')}</span></div>
    <div class="kv"><span class="k">Reported symptoms</span><span class="v">${p.symptoms.map(s=>esc(s.name)).join(', ')||'None'}</span></div>
    <div class="kv"><span class="k">Upcoming appointment</span><span class="v">${p.appt?esc(p.appt.when)+' · '+esc(p.appt.with):'Not recorded'}</span></div>
  </div>

  <div class="card" style="margin-bottom:1rem">
    <h3>Clinical information overview</h3>
    ${p.reports.map(d=>`<div style="margin-bottom:.6rem"><b>${esc(d.type)}</b> <span class="tiny muted">(${esc(d.date)}, ${d.verified?'verified':'unverified'}, source ${esc(d.id)})</span>${d.fields.map(f=>`<div class="kv"><span class="k">${esc(f[0])}</span><span class="v">${esc(f[1])}</span></div>`).join('')}</div>`).join('')||'<p class="muted small">No reports on file.</p>'}
    <hr>
    <h4>Missing / incomplete information</h4>
    ${missing.length?`<ul class="small">${missing.map(f=>`<li>${esc(f.label)}</li>`).join('')}</ul>`:'<p class="small">None — registration is complete.</p>'}
    <h4>Timeline</h4>
    <ul class="small">${(p.timeline||[]).map(t=>`<li><b>${esc(t[0])}</b> — ${esc(t[1])}</li>`).join('')}</ul>
  </div>

  <div class="card" style="margin-bottom:1rem">
    <h3>Medication education</h3>
    ${p.meds.length? p.meds.map(m=>`<div class="fieldbox" style="margin-bottom:.5rem"><b>${esc(m.name)}</b> <span class="tiny muted">(source: ${esc(m.source)})</span><div class="small">Purpose: ${esc(m.reason)}. Common effects: ${m.effects.map(esc).join(', ')}. Monitoring: ${esc(m.monitor)}. Body systems: ${m.systems.map(s=>esc((BODY_REGIONS[s]||{}).name||s)).join(', ')}.</div></div>`).join('') : '<p class="muted small">No medication in this record.</p>'}
    <h4>Questions to ask your oncologist</h4>
    <ul class="small"><li>What do my latest reports show in plain language?</li><li>What is the goal of the treatment you've recommended?</li><li>Which side effects need urgent attention?</li><li>Is anything in my record still missing or unverified?</li></ul>
  </div>

  <div class="card" style="margin-bottom:1rem">
    <h3>Body-map summary</h3>
    <p class="small">${Object.keys(p.bodyHighlights||{}).map(r=>{const l=p.bodyHighlights[r];return `<b>${esc((BODY_REGIONS[r]||{}).name||r)}</b> (${esc({disease:'documented condition',symptom:'patient-reported symptom',treatment:'treatment target',effect:'possible medication effect'}[l]||l)})`;}).join('; ')||'No annotations.'}</p>
    <p class="tiny muted">Possible medication effects are monitoring concerns, not confirmed findings. A medicine name alone never implies organ damage.</p>
  </div>

  <div class="card">
    <h3>Suggested next steps</h3>
    <ul class="small">
      <li>Bring this summary to your next appointment (${esc((p.appt&&p.appt.when)||'date to confirm')}).</li>
      <li>${missing.length?'Confirm the missing items listed above with your care team.':'Your registration is complete — keep records updated.'}</li>
      <li>Watch for urgent warning signs: severe breathing difficulty, chest pain, confusion, uncontrolled bleeding, new seizures, or fever per your oncology team's instructions.</li>
    </ul>
    <div class="tiny muted">Source: ${esc(kb.src)} (${esc(kb.date)}) · Generated ${esc(new Date().toLocaleString('en-IN'))} · Patient education summary — not a diagnosis or treatment plan.</div>
  </div>`;
}

/* =========================================================================
   CLINICIAN DASHBOARD
   ========================================================================= */
function renderClinician(){
  if(!$('#clinStats')) return;
  const pending = DB.patients.reduce((n,p)=>n+p.reports.filter(r=>!r.verified).length,0);
  const symp = DB.patients.reduce((n,p)=>n+p.symptoms.length,0);
  $('#clinStats').innerHTML=[['Authorized patients',DB.patients.length],['Pending verification',pending],['Patient-reported symptoms',symp],['Review requests',DB.audit.filter(a=>a.action==='clinician review requested').length]]
    .map(([k,v])=>`<div class="card"><div class="tiny muted" style="font-weight:700;text-transform:uppercase">${k}</div><div style="font-size:1.3rem;font-weight:650">${v}</div></div>`).join('');
  $('#clinPatients').innerHTML=`<table><tr><th>Patient</th><th>Diagnosis</th><th>Stage</th><th>Docs</th><th>Meds</th><th>Reg.</th><th></th></tr>`+
    DB.patients.map(p=>`<tr><td><b>${esc(p.name)}</b><div class="tiny muted">${esc(p.id)} · ${esc(p.langLabel)}</div></td><td>${esc(p.cancerType)}</td><td>${esc(p.stage)}</td><td>${p.reports.length}${p.reports.some(r=>!r.verified)?' <span class="pill pill-amber">unverified</span>':''}</td><td>${p.meds.length}</td><td>${p.regStatus}%</td><td><button class="btn-sm btn-ghost" onclick="clinOpen('${p.id}')">Review</button></td></tr>`).join('')+`</table>`;
  const reviews=DB.audit.filter(a=>a.action==='clinician review requested');
  $('#clinReviews').innerHTML = reviews.length? reviews.map(r=>`<div class="fieldbox" style="margin-bottom:.4rem"><b>${esc(r.detail)}</b><div class="tiny muted">${esc(r.t)} · ${esc(r.actor)}</div><div style="margin-top:.4rem"><button class="btn-sm btn-primary" onclick="toast('Approved (demo)')">Approve</button> <button class="btn-sm btn-ghost" onclick="toast('More info requested (demo)')">Request info</button></div></div>`).join('') : '<p class="muted small">No pending review requests.</p>';
  $('#clinAudit').innerHTML = DB.audit.length? DB.audit.slice(0,40).map(a=>`<div class="kv"><span class="k">${esc(a.t)}<br><span class="tiny">${esc(a.actor)}</span></span><span class="v">${esc(a.action)}<br><span class="tiny muted">${esc(a.detail)}</span></span></div>`).join('') : '<p class="muted small">No audit entries yet.</p>';
}
function clinOpen(id){ state.clinicianPatient=id; state.patientId=id; renderAll(); go('dashboard'); toast('Viewing '+patient().name+' (authorized clinician access — logged)'); audit('clinician opened record', id); }

/* =========================================================================
   SETTINGS
   ========================================================================= */
function renderSettings(){
  const p=patient(); if(!$('#consentList')) return;
  const consents=[['consent_storage','Data storage'],['consent_ai','AI processing'],['consent_integrations','Optional health-platform integrations'],['consent_caregiver','Caregiver access'],['consent_guardian','Guardian consent (pediatric)']];
  $('#consentList').innerHTML=consents.map(([k,label])=>`<label style="display:flex;align-items:center;gap:.5rem;font-weight:600;color:var(--ink);margin-bottom:.5rem"><input type="checkbox" style="width:auto" ${p.reg[k]?'checked':''} onchange="setConsent('${k}',this.checked)"> ${esc(label)}</label>`).join('');
}
function setConsent(k,v){ const p=patient(); p.reg[k]=v; save(); audit('consent changed', k+'='+v); toast('Consent updated'); }
function exportData(){ const blob=new Blob([JSON.stringify(patient(),null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='cancercare-'+patient().id+'.json'; a.click(); toast('Data exported'); }
function resetDemo(){ if(!confirm('Reset all demo data to the original synthetic seed?')) return; DB=load0(); save(); state.regIndex=0; renderAll(); toast('Demo data reset'); }
function load0(){ return {patients:JSON.parse(JSON.stringify(SEED)),audit:[]}; }

/* =========================================================================
   BOOT
   ========================================================================= */
buildLogin(); buildLangSelects(); renderTranscript();
window.addEventListener('keydown',e=>{ if(e.key==='Escape'){ const s=$('#sidebar'); if(s) s.classList.remove('open'); }});
