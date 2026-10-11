'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  Activity, AlertTriangle, ArrowLeft, Bell, CalendarDays, Camera, Check,
  ChevronRight, CircleUserRound, ClipboardCheck, FileText, FlaskConical,
  Home, Image as ImageIcon, LayoutDashboard, Menu, MessageCircle, Mic,
  Search, Settings, ShieldCheck, Sparkles, Stethoscope, Syringe, UserRound,
  UsersRound, X, Clock3, ScanLine, BadgeCheck, HeartPulse, ClipboardList, LockKeyhole, UserCog, BarChart3, PhoneCall, BookOpenCheck
} from 'lucide-react';

type Screen = { id: string; label: string; group: string };
const screens: Screen[] = [
  {id:'login', label:'1. Login', group:'Access'},
  {id:'roles', label:'2. Role Selection', group:'Access'},
  {id:'dashboard', label:'3. Doctor Dashboard', group:'Core'},
  {id:'patients', label:'4. Patients List & Search', group:'Core'},
  {id:'case', label:'5. Patient Case Overview', group:'Patient Case'},
  {id:'journey', label:'6. Patient Journey Timeline', group:'Patient Case'},
  {id:'media', label:'7. Clinical Media', group:'Patient Case'},
  {id:'smile-facial', label:'8. Smile Design — Facial', group:'Smile Design'},
  {id:'smile-smile', label:'9. Smile Design — Smile', group:'Smile Design'},
  {id:'smile-profile', label:'10. Smile Design — Profile', group:'Smile Design'},
  {id:'design-decision', label:'11. Doctor Design Decision', group:'Smile Design'},
  {id:'treatment', label:'12. Treatment Plan — Dental Chart', group:'Treatment'},
  {id:'tooth', label:'13. Tooth Detail', group:'Treatment'},
  {id:'pretreatment', label:'14. Pre-Treatment Gate', group:'Treatment'},
  {id:'execution', label:'15. Clinical Execution', group:'Clinical'},
  {id:'deviation', label:'16. Plan Deviation', group:'Clinical'},
  {id:'lab-sheet', label:'17. Digital Lab Case Sheet', group:'Lab'},
  {id:'lab-tracking', label:'18. Lab Tracking', group:'Lab'},
  {id:'final-gate', label:'19. Final Gate', group:'Clinical'},
  {id:'ai', label:'20. AI Case Assistant', group:'AI'},
  {id:'voice', label:'21. Voice / AI Update', group:'AI'},
  {id:'followup', label:'22. Smart Follow-Up', group:'Follow-Up'},
  {id:'concerns', label:'23. Patient Concerns', group:'Follow-Up'},
  {id:'notifications', label:'24. Notifications Center', group:'Control'},
  {id:'md-dashboard', label:'25. Medical Director Dashboard', group:'Management'},
  {id:'ceo', label:'26. CEO / Dr. Abdallah Decision Layer', group:'Management'},
  {id:'outcomes', label:'27. Outcomes & Classification', group:'Management'},
  {id:'audit', label:'28. Audit Trail', group:'Administration'},
  {id:'users', label:'29. Users & Roles', group:'Administration'},
  {id:'permissions', label:'30. Permissions', group:'Administration'},
  {id:'p-login', label:'P1. Patient Login', group:'Patient App'},
  {id:'p-home', label:'P2. Patient Home', group:'Patient App'},
  {id:'p-journey', label:'P3. My Treatment Journey', group:'Patient App'},
  {id:'p-media', label:'P4. My Photos & X-Rays', group:'Patient App'},
  {id:'p-smile', label:'P5. My Smile Design', group:'Patient App'},
  {id:'p-progress', label:'P6. Treatment Progress', group:'Patient App'},
  {id:'p-appointments', label:'P7. Appointments', group:'Patient App'},
  {id:'p-aftercare', label:'P8. Aftercare', group:'Patient App'},
  {id:'p-ai', label:'P9. Dr. Abdallah AI Companion', group:'Patient App'},
  {id:'p-concern', label:'P10. Raise a Concern', group:'Patient App'},
  {id:'p-before-after', label:'P11. Before / After', group:'Patient App'},
  {id:'p-consent', label:'P12. Consent & Preferences', group:'Patient App'},
];

const patients = [
  ['Sarah Ahmed Mohamed','BR-2048','Preparation','AMBER'],
  ['Omar Hassan','BR-2047','Final Scan','GREEN'],
  ['Mona Adel','BR-2046','Treatment Plan','GREEN'],
  ['Ahmed Khaled','BR-2045','Lab','AMBER'],
  ['Salma Tarek','BR-2044','Follow-Up','GREEN'],
  ['Karim Mostafa','BR-2043','Try-in','GREEN']
];

function Brand({compact=false}:{compact?:boolean}) {
  return <div className={'brand '+(compact?'compact':'')}>
    <div className="brandmark">
      <img src="/brighty-logo.png" alt="Brighty Dental Clinic logo" />
    </div>
    <div className="brandText"><b>BRIGHTY</b><small>DENTAL CLINIC</small></div>
  </div>
}

function Pill({children,tone='gold'}:{children:ReactNode;tone?:'gold'|'green'|'amber'|'red'|'gray'}) {
  return <span className={'pill '+tone}>{children}</span>
}

function Avatar({name='SA',big=false}:{name?:string;big?:boolean}) {
  return <div className={'avatar '+(big?'big':'')}><span>{name}</span></div>
}

function TopBar({title,back=false}:{title:string;back?:boolean}) {
  return <div className="mobileTop">
    <button className="iconbtn">{back?<ArrowLeft size={20}/>:<Menu size={20}/>}</button>
    <b>{title}</b>
    <button className="iconbtn"><Bell size={19}/><i>3</i></button>
  </div>
}

function BottomNav({active='home'}:{active?:string}) {
  const items = [
    ['home','Home',Home],['patients','Patients',UsersRound],['lab','Lab',FlaskConical],['notifications','Alerts',Bell]
  ] as const;
  return <div className="bottomNav">{items.map(([id,label,Icon])=><button key={id} className={active===id?'active':''}><Icon size={18}/><span>{label}</span></button>)}</div>
}

function Login() {
  return <div className="loginScreen">
    <Brand/>
    <div className="loginCenter">
      <div className="brandHalo"><img src="/brighty-logo.png" alt="Brighty logo" /></div>
      <h1>Welcome Back</h1><p>Sign in to your account</p>
      <label>Email<input placeholder="doctor@brighty.com" /></label>
      <label>Password<input type="password" placeholder="••••••••" /></label>
      <div className="loginMeta"><span>☑ Remember me</span><a>Forgot password?</a></div>
      <button className="primary wide">Sign In</button>
    </div>
    <small className="tagline">Excellence In Every Smile</small>
  </div>
}

function Roles() {
  const roles = [
    ['Doctor','Clinical cases & treatment',Stethoscope],['Medical Director','Supervision & case control',ShieldCheck],
    ['CEO / Dr. Abdallah','Strategic overview',LayoutDashboard],['Lab Team','Lab cases & tracking',FlaskConical],
    ['Reception / Operations','Appointments & admin',CalendarDays],['Follow-Up Team','Patient follow-up',MessageCircle]
  ] as const;
  return <div><TopBar title="Choose Your Role" back/><div className="content"><Brand compact/><p className="muted">Select your role to continue</p><div className="stack">{roles.map(([r,s,I])=><button className="roleCard" key={r}><span className="roundIcon"><I size={20}/></span><span><b>{r}</b><small>{s}</small></span><ChevronRight size={18}/></button>)}</div></div></div>
}

function Dashboard() {
  return <div><TopBar title="Dashboard"/><div className="content"><div className="hello"><div><small>Good Morning</small><h2>Dr. Mohamed Ali</h2><p>Mon, 14 Oct 2024</p></div><Avatar name="MA"/></div>
    <div className="statGrid"><Stat icon={<CalendarDays/>} n="12" label="Today's Appointments"/><Stat icon={<UsersRound/>} n="6" label="Active Cases" green/><Stat icon={<FlaskConical/>} n="3" label="Lab At Risk" amber/><Stat icon={<MessageCircle/>} n="5" label="Follow-Ups"/></div>
    <SectionTitle title="Today's Schedule" action="View All"/>
    <div className="stack">{[['10:00 AM','Ahmed Khaled','Consultation'],['11:30 AM','Sarah Ahmed','Preparation Review'],['01:00 PM','Mona Adel','Try-in']].map(x=><div className="schedule" key={x[0]}><b>{x[0]}</b><Avatar name={x[1].split(' ').map(y=>y[0]).join('').slice(0,2)}/><span><strong>{x[1]}</strong><small>{x[2]}</small></span><ChevronRight size={17}/></div>)}</div>
  </div><BottomNav/></div>
}

function Stat({icon,n,label,green,amber}:{icon:ReactNode;n:string;label:string;green?:boolean;amber?:boolean}) {return <div className="stat"><span className="roundIcon">{icon}</span><b>{n}</b><small>{label}</small>{green&&<i className="greenText">controlled</i>}{amber&&<i className="amberText">at risk</i>}</div>}
function SectionTitle({title,action}:{title:string;action?:string}){return <div className="sectionTitle"><h3>{title}</h3>{action&&<a>{action}</a>}</div>}

function Patients(){return <div><TopBar title="Patients"/><div className="content"><div className="search"><Search size={18}/><input placeholder="Search by name, ID or phone..."/></div><div className="chips"><Pill>All</Pill><Pill tone="gray">Active</Pill><Pill tone="gray">At Risk</Pill><Pill tone="gray">Pending Lab</Pill></div><div className="stack">{patients.map((p,i)=><div className="patientRow" key={p[1]}><Avatar name={p[0].split(' ').map(x=>x[0]).join('').slice(0,2)}/><span><b>{p[0]}</b><small>{p[1]}</small></span><Pill tone={p[3]==='AMBER'?'amber':'green'}>{p[2]}</Pill><ChevronRight size={16}/></div>)}</div></div><BottomNav active="patients"/></div>}

function PatientHeader(){return <><div className="patientHero"><Avatar name="SA" big/><div className="patientMini"><Avatar name="SA"/><Avatar name="RP"/><Avatar name="SM"/></div></div><h2>Sarah Ahmed Mohamed</h2><p className="muted">BR-2048 • 28 years • New Cairo Branch</p><div className="split"><div className="statusCard"><span className="dot greenDot"></span><small>Active Case</small><b>Preparation Stage</b></div><div className="riskCard"><small>Risk</small><Pill tone="amber">AMBER</Pill><span>1 pending</span></div></div><div className="actionRow"><Action icon={<MessageCircle/>} label="Message"/><Action icon={<Camera/>} label="Add Photo"/><Action icon={<FileText/>} label="Note"/><Action icon={<Menu/>} label="More"/></div><div className="appointmentCard"><CalendarDays/><span><small>Next Appointment</small><b>14 Oct 2024 • 6:30 PM</b><em>Preparation Review</em></span><ChevronRight/></div></>}
function Action({icon,label}:{icon:ReactNode;label:string}){return <button><span>{icon}</span><small>{label}</small></button>}

function CaseOverview(){return <div><TopBar title="Patient Case" back/><div className="content"><PatientHeader/><div className="tabs"><b>Overview</b><span>Smile Design</span><span>Treatment</span></div><SectionTitle title="Case Control"/><div className="infoList"><Info label="Next Action" value="Complete Endodontic treatment (Tooth 11)"/><Info label="Owner" value="Dr. Mohamed Ali"/><Info label="Due Date" value="12 Oct 2024"/><Info label="Pending Requirements" value="1 item"/></div></div><BottomNav active="patients"/></div>}
function Info({label,value}:{label:string;value:string}){return <div><small>{label}</small><b>{value}</b></div>}

const stages=[['Consultation','10 Sep 2024','done'],['Smile Design','15 Sep 2024','done'],['Treatment Plan','18 Sep 2024','done'],['Preparation','In Progress','now'],['Final Scan','Pending','wait'],['Lab','Pending','wait'],['Try-in','Pending','wait'],['Delivery','Pending','wait'],['Follow-Up','Pending','wait']];
function Journey(){return <div><TopBar title="Patient Journey" back/><div className="content"><div className="timeline">{stages.map(([a,b,s],i)=><div className={'timeStep '+s} key={a}><div className="timeIcon">{s==='done'?<Check/>:s==='now'?<Activity/>:<Clock3/>}</div><span><b>{a}</b><small>{b}</small></span></div>)}</div></div><BottomNav active="patients"/></div>}

function Media(){return <div><TopBar title="Clinical Photos & Media" back/><div className="content"><div className="chips"><Pill>All</Pill><Pill tone="gray">Photos</Pill><Pill tone="gray">X-Rays</Pill><Pill tone="gray">Scans</Pill></div><MediaSection title="Facial Photos" items={['Frontal Smile','Right Profile']}/><MediaSection title="Intraoral Photos" items={['Occlusal','Left Bite']}/><MediaSection title="Radiographs & Scans" items={['Panoramic X-Ray','CBCT Scan']}/></div><BottomNav/></div>}
function MediaSection({title,items}:{title:string;items:string[]}){return <><SectionTitle title={title}/><div className="mediaGrid">{items.map((x,i)=><div className="mediaCard" key={x}><div className={'fakeImage '+(i%2?'profile':'smile')}><ImageIcon/></div><b>{x}</b><small>12 Sep 2024</small></div>)}</div></>}

function SmileDesign({mode}:{mode:'Facial'|'Smile'|'Profile'}){const opts=mode==='Facial'?['Facial Midline','Interpupillary Line','Smile Plane','Lip Line']:mode==='Smile'?['Midline','Smile Curve','Incisal Arc','Gingival Levels']:['Facial Profile','Lip Support','Chin Position','Incisal Inclination'];return <div><TopBar title="Smile Design" back/><div className="content"><div className="seg"><span className={mode==='Facial'?'on':''}>Facial</span><span className={mode==='Smile'?'on':''}>Smile</span><span className={mode==='Profile'?'on':''}>Profile</span></div><div className={'analysisImage '+mode.toLowerCase()}><Avatar name="SA" big/><div className="guide g1"></div><div className="guide g2"></div></div><SectionTitle title={mode+' Analysis'}/><div className="toggleList">{opts.map(x=><label key={x}><span>☑</span>{x}<i></i></label>)}</div></div><BottomNav active="patients"/></div>}

function DesignDecision(){return <div><TopBar title="Design Decision" back/><div className="content"><div className="teethBanner">SMILE DESIGN PREVIEW</div><FormRow label="Midline Alignment"><Pill>Centered</Pill></FormRow><FormRow label="Target Central Length"><input value="10.5 mm" readOnly/></FormRow><FormRow label="Tooth Shape"><div className="chips"><Pill tone="gray">Square</Pill><Pill>Oval</Pill><Pill tone="gray">Triangular</Pill></div></FormRow><FormRow label="Smile Arc"><div className="chips"><Pill tone="gray">Flat</Pill><Pill>Normal</Pill><Pill tone="gray">Curved</Pill></div></FormRow><FormRow label="Number of Units"><input value="8 units" readOnly/></FormRow><FormRow label="Special Design Notes"><textarea defaultValue="Maintain natural look and clear emergence."/></FormRow><button className="primary wide">Save Design</button></div></div>}
function FormRow({label,children}:{label:string;children:ReactNode}){return <label className="formRow"><b>{label}</b>{children}</label>}

function DentalChart(){const teeth=Array.from({length:28},(_,i)=>i+1);return <div><TopBar title="Treatment Plan" back/><div className="content"><div className="legend"><span><i className="blue"></i>Planned</span><span><i className="amberDot"></i>In Progress</span><span><i className="greenDot"></i>Completed</span></div><div className="chart">{teeth.map(n=><button className={(n===11?'selected ': '')+(n===14?'warn':'')} key={n}>{n}</button>)}</div><div className="seg"><span className="on">Upper</span><span>Lower</span></div><SectionTitle title="Selected Tooth"/><div className="toothSelect"><Avatar name="11"/><span><b>Tooth 11</b><small>Endodontic + Crown</small></span><ChevronRight/></div></div><BottomNav active="patients"/></div>}

function ToothDetail(){return <div><TopBar title="Tooth 11" back/><div className="content"><div className="patientRow"><Avatar name="11"/><span><b>Tooth 11</b><small>Pending</small></span><Pill tone="amber">Pending</Pill></div><InfoBlock title="Existing Condition" text="Deep caries, previous restoration"/><InfoBlock title="Clinical Decision" text="Endodontic treatment + Crown"/><InfoBlock title="Gingival Requirement" text="Gingivectomy (if needed)"/><InfoBlock title="Restorative Plan" text="Material: Zirconia • Shade: A1"/><InfoBlock title="Preparation" text="Full crown"/><button className="primary wide">Save & Update</button></div></div>}
function InfoBlock({title,text}:{title:string;text:string}){return <div className="infoBlock"><small>{title}</small><b>{text}</b></div>}

function Gate({final=false}:{final?:boolean}){const req=final?['All planned treatments completed','No unresolved deviations','Final scan / impression available','Final photos captured','Lab case received','Try-in approved']:['Treatment plan completed','Smile design approved','Required X-rays available','Initial photos captured','Pending issues resolved'];return <div><TopBar title={final?'Final Gate Checklist':'Pre-Treatment Gate'} back/><div className="content"><div className="checkList">{req.map(x=><div key={x}><span><Check/></span><b>{x}</b></div>)}</div>{final?<><div className="gate green"><BadgeCheck/><span><b>READY FOR FINAL</b><small>All requirements completed.</small></span></div><div className="gate gray"><X/><span><b>Cannot Take Final</b><small>Some requirements missing.</small></span></div></>:<><div className="gate green"><BadgeCheck/><span><b>GREEN — READY</b><small>All requirements completed.</small></span></div><div className="gate amber"><AlertTriangle/><span><b>AMBER — CONDITIONAL</b><small>Some requirements pending.</small></span></div><div className="gate red"><X/><span><b>RED — NOT READY</b><small>Critical requirements missing.</small></span></div></>}</div></div>}

function Execution(){const steps=['Anesthesia','Isolation','Caries Removal','Endodontic Treatment','Build-Up','Preparation','Impression / Scan','Provisional'];return <div><TopBar title="Clinical Execution" back/><div className="content"><div className="patientRow"><Avatar name="11"/><span><b>14 Oct 2024</b><small>Tooth 11</small></span></div><div className="checkForm">{steps.map((x,i)=><label key={x}><input type="checkbox" defaultChecked={i===3}/><span>{x}</span></label>)}</div><FormRow label="Notes"><textarea defaultValue="Procedure completed successfully."/></FormRow><button className="primary wide">Save Procedure</button></div></div>}

function Deviation(){return <div><TopBar title="Plan Deviation" back/><div className="content"><div className="patientRow"><Avatar name="11"/><span><b>Tooth 11</b><small>Deviation record</small></span></div><InfoBlock title="Planned" text="Endodontic + Crown"/><InfoBlock title="Actual" text="Endodontic only (postponed crown)"/><InfoBlock title="When Discovered" text="During preparation"/><InfoBlock title="Reason" text="Insufficient remaining structure"/><InfoBlock title="Action Taken" text="Post build-up, reschedule crown"/><InfoBlock title="Approved By" text="Dr. Mohamed Ali"/><button className="primary wide">Save Deviation</button></div></div>}

function LabSheet(){return <div><TopBar title="Digital Lab Case Sheet" back/><div className="content"><div className="seg"><span className="on">Case Details</span><span>Design</span><span>Scans</span></div><FormRow label="Teeth"><div className="chips"><Pill>11</Pill><Pill>12</Pill><Pill>21</Pill><Pill>22</Pill></div></FormRow><FormRow label="Restoration Type"><input value="Zirconia Crown" readOnly/></FormRow><FormRow label="Shade"><input value="A1" readOnly/></FormRow><FormRow label="Design Notes"><textarea defaultValue="Match natural shape as per approved design."/></FormRow><FormRow label="Attachments"><div className="attachmentRow"><span><ScanLine/>Scan</span><span><ImageIcon/>Photos</span><span><FileText/>Design</span></div></FormRow><button className="primary wide">Send to Lab</button></div></div>}

function LabTracking(){const events=[['Case Sent to Lab','12 Oct 10:40 AM','done'],['Lab Accepted','12 Oct 02:15 PM','done'],['In Production','In Progress','now'],['Ready for Delivery','Pending','wait'],['Delivered to Branch','Pending','wait'],['Received at Clinic','Pending','wait']];return <div><TopBar title="Lab Tracking" back/><div className="content"><div className="timeline">{events.map(([a,b,s])=><div className={'timeStep '+s} key={a}><div className="timeIcon">{s==='done'?<Check/>:s==='now'?<Activity/>:<Clock3/>}</div><span><b>{a}</b><small>{b}</small></span></div>)}</div><div className="appointmentCard"><Clock3/><span><small>Expected Ready Date</small><b>17 Oct 2024</b></span></div><button className="secondary wide">View Lab Notes</button></div></div>}

function AI(){return <div><TopBar title="AI Case Assistant" back/><div className="content"><div className="seg"><span className="on">Case Summary</span><span>Missing (2)</span><span>Suggestions</span></div><div className="aiSummary"><Sparkles/><p>This is a 28-year-old female (BR-2048) in Preparation stage.</p><b>Completed:</b><ul><li>Consultation</li><li>Smile design approved</li><li>Treatment plan set</li></ul><b className="amberText">Missing Requirements:</b><ul className="amberText"><li>Endodontic treatment for tooth 11</li><li>Final scan after preparation</li><li>Update shade selection</li></ul><div className="riskAlert"><AlertTriangle/><span><b>Risk Status: AMBER</b><small>Final cannot be taken until endodontic treatment is completed.</small></span></div></div><div className="chatInput"><input placeholder="Ask anything about this case..."/><button><ChevronRight/></button></div></div></div>}

function Voice(){return <div><TopBar title="Voice Update" back/><div className="content voicePage"><div className="wave">{Array.from({length:24},(_,i)=><i style={{height:(12+(i%7)*7)+'px'}} key={i}></i>)}</div><b>00:08</b><button className="mic"><Mic/></button><h3>Listening...</h3><p className="muted">AI is processing your update and will show a structured summary before saving.</p><button className="secondary wide">Cancel</button></div></div>}


function SimpleListScreen({title,items,badge}:{title:string;items:string[];badge?:string}){return <div><TopBar title={title} back/><div className="content">{badge&&<div className="gate amber"><AlertTriangle/><span><b>{badge}</b><small>Requires attention</small></span></div>}<div className="stack">{items.map((x,i)=><div className="patientRow" key={x}><span className="roundIcon">{i+1}</span><span><b>{x}</b><small>Open details</small></span><ChevronRight size={16}/></div>)}</div></div></div>}

function FollowUp(){return <SimpleListScreen title="Smart Follow-Up" items={['Sarah Ahmed — 2 day post-preparation check-in','Omar Hassan — final delivery follow-up','Mona Adel — missed follow-up','Karim Mostafa — aftercare confirmation']}/>}
function Concerns(){return <SimpleListScreen title="Patient Concerns" badge="2 priority concerns" items={['Sarah Ahmed — pain reported','Omar Hassan — bite feels high','Mona Adel — swelling reported','Karim Mostafa — general question']}/>}
function Notifications(){return <SimpleListScreen title="Notifications" badge="8 unread" items={['Overdue action — BR-2048','Lab delivery risk — BR-2045','Patient concern — Sarah Ahmed','Final gate incomplete — BR-2044','Follow-up overdue — Mona Adel']}/>}
function MDDashboard(){return <div><TopBar title="Medical Director"/><div className="content"><div className="statGrid"><Stat icon={<AlertTriangle/>} n="4" label="RED Cases" amber/><Stat icon={<Activity/>} n="9" label="AMBER Cases"/><Stat icon={<Clock3/>} n="7" label="Overdue Actions"/><Stat icon={<FlaskConical/>} n="3" label="Lab Risks"/></div><SectionTitle title="AI Daily Priority Brief"/><div className="aiSummary"><Sparkles/><p><b>1.</b> BR-2048 needs Endodontic treatment before Final Scan.</p><p><b>2.</b> BR-2045 has lab timing conflict with next appointment.</p><p><b>3.</b> Two patient concerns require clinical review.</p></div><SectionTitle title="Exceptions"/><div className="stack">{patients.slice(0,4).map(p=><div className="patientRow" key={p[1]}><Avatar name={p[0].split(' ').map(x=>x[0]).join('').slice(0,2)}/><span><b>{p[0]}</b><small>{p[1]} • {p[2]}</small></span><Pill tone="amber">Review</Pill></div>)}</div></div></div>}
function CEO(){return <div><TopBar title="CEO Decision Layer"/><div className="content"><SectionTitle title="Decision Required"/><div className="infoBlock"><small>CASE</small><b>BR-2048 — Sarah Ahmed Mohamed</b></div><InfoBlock title="ISSUE" text="Endodontic treatment pending before Final Scan"/><InfoBlock title="RISK" text="Patient appointment may be impacted"/><InfoBlock title="ACTION ALREADY TAKEN" text="Case flagged AMBER and owner assigned"/><InfoBlock title="RECOMMENDATION" text="Complete Endo and reschedule final scan within 3 days"/><InfoBlock title="DECISION NEEDED" text="Approve priority Endo slot"/><button className="primary wide">Record Decision</button></div></div>}
function Outcomes(){return <SimpleListScreen title="Outcomes" items={['Successful / Stable — 74 cases','Minor Issue — Resolved — 11 cases','Modification — 7 cases','Partial Remake — 3 cases','Full Remake — 1 case','Clinical Complication — 2 cases','Ongoing Follow-Up — 18 cases']}/>}
function Audit(){return <SimpleListScreen title="Audit Trail" items={['14:22 — AI proposed stage update — awaiting confirmation','14:18 — Dr. Mohamed added clinical note','13:50 — Lab accepted complete case','12:40 — Risk changed GREEN → AMBER','11:20 — Treatment plan approved']}/>}
function Users(){return <SimpleListScreen title="Users & Roles" items={['Dr. Mohamed Ali — Treating Doctor','Dr. Hany Mostafa — Medical Director','Dr. Abdallah — CEO','Mona Samir — Lab Team','Nour Ahmed — Follow-Up Team','Ahmed Samy — Reception / Operations']}/>}
function Permissions(){return <SimpleListScreen title="Role Permissions" items={['CEO — command center, analytics, selected case review','Medical Director — full clinical control and exceptions','Treating Doctor — assigned cases and treatment plan','Lab Team — authorized lab case data only','Reception — scheduling and operational status','Patient — own approved patient-facing record only']}/>}

function PatientLogin(){return <div className="patientLogin"><div className="content"><Brand compact/><div style={{height:40}}/><h1>Welcome</h1><p className="muted">Access your treatment journey</p><FormRow label="Phone or Email"><input placeholder="+20 10 1234 5678"/></FormRow><FormRow label="Password"><input type="password" placeholder="••••••••"/></FormRow><button className="primary wide">Sign In</button><div style={{height:10}}/><button className="secondary wide">Continue with OTP</button></div></div>}
function PatientHome(){return <div><TopBar title="Brighty"/><div className="content"><div className="hello"><div><small>Good Morning</small><h2>Sarah Ahmed</h2></div><Avatar name="SA"/></div><div className="patientHero" style={{marginTop:12}}><Avatar name="SA" big/></div><div className="statusCard" style={{marginTop:10}}><small>Your Journey</small><b>Preparation Stage — 4/8</b></div><div className="appointmentCard"><CalendarDays/><span><small>Next Appointment</small><b>14 Oct 2024 • 6:30 PM</b><em>Preparation Review</em></span></div><div className="quickGrid"><Action icon={<ImageIcon/>} label="My Photos"/><Action icon={<ClipboardList/>} label="My Plan"/><Action icon={<CalendarDays/>} label="Appointments"/><Action icon={<Sparkles/>} label="AI Companion"/><Action icon={<HeartPulse/>} label="Aftercare"/><Action icon={<PhoneCall/>} label="Contact Us"/></div></div><BottomNav/></div>}
function PatientJourney(){return <Journey/>}
function PatientMedia(){return <Media/>}
function PatientSmile(){return <div><TopBar title="My Smile Design" back/><div className="content"><div className="seg"><span className="on">Front View</span><span>Profile</span><span>3D View</span></div><div className="beforeAfter"><div>BEFORE</div><div>AFTER</div></div><SectionTitle title="Approved Design"/><div className="infoBlock"><small>Status</small><b>Approved by Dr. Mohamed Ali</b></div><button className="secondary wide">View Design Details</button></div></div>}
function PatientProgress(){return <SimpleListScreen title="Treatment Progress" items={['Consultation — completed','Smile Design — completed','Treatment Plan — completed','Preparation — in progress','Final Scan — pending','Lab — pending','Try-in — pending','Delivery — pending','Follow-Up — pending']}/>}
function PatientAppointments(){return <SimpleListScreen title="Appointments" items={['14 Oct 2024 • 6:30 PM — Preparation Review','28 Oct 2024 • 6:00 PM — Final Scan','12 Nov 2024 • 6:00 PM — Try-in']}/>}
function Aftercare(){return <div><TopBar title="Aftercare" back/><div className="content"><SectionTitle title="Preparation Aftercare"/><div className="aiSummary"><BookOpenCheck/><p>Follow the instructions approved for the procedure actually performed.</p><ul><li>Avoid very hard foods on the treated area.</li><li>Maintain normal oral hygiene unless your doctor advised otherwise.</li><li>Use only prescribed medication as directed by your clinical team.</li><li>Report significant pain, swelling, bleeding, or bite problems.</li></ul></div></div></div>}
function PatientAI(){return <div><TopBar title="Dr. Abdallah AI Companion" back/><div className="content"><div className="aiSummary"><div className="hello"><Avatar name="DA"/><b>Hello Sarah 👋</b></div><p>I can explain your approved treatment plan, current stage, next steps, appointments, and approved aftercare.</p></div><div className="stack" style={{marginTop:10}}>{['What is my current stage?','What will happen at my next appointment?','What has been completed?','I have a concern'].map(x=><button className="roleCard" key={x}><span><b>{x}</b></span><ChevronRight size={16}/></button>)}</div><div className="chatInput"><input placeholder="Type your message..."/><button><ChevronRight/></button></div></div></div>}
function PatientConcern(){return <div><TopBar title="Raise a Concern" back/><div className="content"><p className="muted">Choose what best describes your concern. It will be routed to the Brighty clinical team.</p><div className="stack">{['Significant pain','Swelling','Bleeding','Bite problem','Other concern'].map(x=><button className="roleCard" key={x}><span className="roundIcon"><HeartPulse size={18}/></span><span><b>{x}</b><small>Create structured patient concern</small></span><ChevronRight/></button>)}</div><FormRow label="Tell us more"><textarea placeholder="Describe what you are feeling..."/></FormRow><button className="primary wide">Send to Clinical Team</button></div></div>}
function BeforeAfter(){return <div><TopBar title="Before / After" back/><div className="content"><div className="beforeAfter"><div>BEFORE</div><div>AFTER</div></div><p className="muted">Final presentation is shown after approved clinical completion.</p></div></div>}
function Consent(){return <div><TopBar title="Consent & Preferences" back/><div className="content"><div className="toggleList"><label><span>✓</span>Appointment reminders<i></i></label><label><span>✓</span>Follow-up messages<i></i></label><label><span>✓</span>AI companion<i></i></label><label><span>✓</span>Clinical photo access<i></i></label></div><div className="infoBlock"><small>Marketing / Smile Story publication</small><b>Separate consent required</b></div></div></div>}

function Prototype({screen}:{screen:string}){switch(screen){case'login':return <Login/>;case'roles':return <Roles/>;case'dashboard':return <Dashboard/>;case'patients':return <Patients/>;case'case':return <CaseOverview/>;case'journey':return <Journey/>;case'media':return <Media/>;case'smile-facial':return <SmileDesign mode="Facial"/>;case'smile-smile':return <SmileDesign mode="Smile"/>;case'smile-profile':return <SmileDesign mode="Profile"/>;case'design-decision':return <DesignDecision/>;case'treatment':return <DentalChart/>;case'tooth':return <ToothDetail/>;case'pretreatment':return <Gate/>;case'execution':return <Execution/>;case'deviation':return <Deviation/>;case'lab-sheet':return <LabSheet/>;case'lab-tracking':return <LabTracking/>;case'final-gate':return <Gate final/>;case'ai':return <AI/>;case'voice':return <Voice/>;case'followup':return <FollowUp/>;case'concerns':return <Concerns/>;case'notifications':return <Notifications/>;case'md-dashboard':return <MDDashboard/>;case'ceo':return <CEO/>;case'outcomes':return <Outcomes/>;case'audit':return <Audit/>;case'users':return <Users/>;case'permissions':return <Permissions/>;case'p-login':return <PatientLogin/>;case'p-home':return <PatientHome/>;case'p-journey':return <PatientJourney/>;case'p-media':return <PatientMedia/>;case'p-smile':return <PatientSmile/>;case'p-progress':return <PatientProgress/>;case'p-appointments':return <PatientAppointments/>;case'p-aftercare':return <Aftercare/>;case'p-ai':return <PatientAI/>;case'p-concern':return <PatientConcern/>;case'p-before-after':return <BeforeAfter/>;case'p-consent':return <Consent/>;default:return <Dashboard/>}}

export default function Page(){
  const [screen,setScreen]=useState('dashboard');
  const [mobileNavOpen,setMobileNavOpen]=useState(false);
  const groups=useMemo(()=>Array.from(new Set(screens.map(s=>s.group))),[]);
  const current=screens.find(s=>s.id===screen);
  const chooseScreen=(id:string)=>{setScreen(id);setMobileNavOpen(false);window.scrollTo({top:0,behavior:'smooth'});};
  return <main className="studio">
    <aside className="navigator">
      <Brand/><h2>Mobile Prototype</h2><p>Brighty Clinical OS AI</p>
      {groups.map(g=><div className="navGroup" key={g}><small>{g}</small>{screens.filter(s=>s.group===g).map(s=><button key={s.id} onClick={()=>chooseScreen(s.id)} className={screen===s.id?'active':''}>{s.label}</button>)}</div>)}
      <a className="reference" href="/reference.png" target="_blank">Open visual reference ↗</a>
    </aside>

    <button className="mobileScreenButton" onClick={()=>setMobileNavOpen(true)} aria-label="Open screen navigator">
      <Menu size={18}/><span>All Screens</span>
    </button>

    {mobileNavOpen&&<div className="mobileNavOverlay" onClick={()=>setMobileNavOpen(false)}>
      <div className="mobileNavDrawer" onClick={e=>e.stopPropagation()}>
        <div className="mobileNavHead"><Brand/><button onClick={()=>setMobileNavOpen(false)} aria-label="Close navigator"><X size={20}/></button></div>
        <div className="mobileCurrentScreen"><small>Current screen</small><b>{current?.label}</b></div>
        <div className="mobileNavScroll">
          {groups.map(g=><div className="mobileNavGroup" key={g}><small>{g}</small>{screens.filter(s=>s.group===g).map(s=><button key={s.id} onClick={()=>chooseScreen(s.id)} className={screen===s.id?'active':''}><span>{s.label}</span><ChevronRight size={16}/></button>)}</div>)}
        </div>
      </div>
    </div>}

    <section className="previewArea">
      <div className="previewHeader"><div><b>{current?.label}</b><small>Interactive Next.js screen</small></div><span>390 × 844 mobile viewport</span></div>
      <div className="phone"><div className="notch"></div><div className="phoneScreen"><Prototype screen={screen}/></div></div>
    </section>
  </main>
}
