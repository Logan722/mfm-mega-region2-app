import { useState, useEffect } from "react";

// ─── THEME ──────────────────────────────────────────────────────
const T = {
  bg: '#0D0A14', surface: '#161224', surfaceAlt: '#1E1834',
  border: '#2A2240', borderLight: '#362E52',
  purple: '#6A0DAD', purpleLight: '#9B4DCA', purpleSoft: '#6A0DAD22',
  fire: '#E8530E', fireLight: '#FF7A3D', fireSoft: '#E8530E18',
  gold: '#D4A017', goldSoft: '#D4A01718',
  white: '#F0ECF8', muted: '#9E8FB0', dim: '#6B5C7B',
  success: '#34D399', successBg: '#34D39918',
  danger: '#EF4444', dangerBg: '#EF444418',
  warn: '#FBBF24',
};

const font = `'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif`;

// ─── MOCK DATABASE (simulates Firestore) ────────────────────────
const createDB = () => {
  const initial = {
    announcements: [
      { id: 'a1', title: '2026 Prophetic Declaration', body: '"My Year of Great Deliverance and Fresh Glory" — Genesis 45:7.', date: '2026-01-01', priority: 'high', author: 'Dr. D.K. Olukoya', createdAt: Date.now() },
      { id: 'a2', title: 'Foundational Class Open', body: 'New members: class begins April 13th at all branches.', date: '2026-03-15', priority: 'medium', author: 'Mega Region 2 Admin', createdAt: Date.now() },
    ],
    events: [
      { id: 'e1', title: 'Power Must Change Hands', date: '2026-04-04', time: '8:00 AM - 12:00 PM', description: 'Flagship monthly spiritual warfare program.', location: 'All Branches', color: '#E8530E', isGlobal: true, type: 'pmch' },
      { id: 'e2', title: 'Mega Region 2 Revival', date: '2026-04-18', time: '6:00 PM - 9:00 PM', description: 'Regional revival.', location: 'MFM Prayer City, Houston', color: '#6A0DAD', isGlobal: false, type: 'revival' },
      { id: 'e3', title: 'Youth Convention', date: '2026-05-09', time: '10:00 AM - 4:00 PM', description: 'Annual youth gathering.', location: 'MFM Prayer City', color: '#FF7A3D', isGlobal: false, type: 'youth' },
    ],
    devotionals: [
      { id: 'd1', date: '2026-03-20', title: 'Breaking Chains of Limitation', bibleReading: 'Isaiah 43:18-21', verseOfDay: '"Behold, I will do a new thing" — Isaiah 43:19', reflection: 'Every chain of limitation is broken today in Jesus name.', prayerPoints: ['O Lord, break every chain of limitation, in Jesus name.', 'Every stagnating power, be destroyed by fire.', 'I receive fresh fire for my destiny.'], category: 'deliverance' },
    ],
    branches: [
      { id: 'b1', name: 'MFM Prayer City (HQ)', city: 'Houston', state: 'TX', phone: '(346) 414-5880', address: '6910 N Eldridge Pkwy, Houston TX 77041', email: 'prayercity@mfmmegaregion2.org', isHQ: true },
      { id: 'b2', name: 'MFM Dallas', city: 'Dallas', state: 'TX', phone: '(469) 353-3712', address: '306 N Greenville Ave, Richardson TX 75081', email: 'mfmdallatexas@gmail.com', isHQ: false },
      { id: 'b3', name: 'MFM Tampa', city: 'Tampa', state: 'FL', phone: '(813) 555-0201', address: 'Tampa, FL', email: '', isHQ: false },
    ],
    prayerRequests: [
      { id: 'p1', request: "Pray for my daughter's visa interview.", date: '2026-03-19', prayerCount: 24, category: 'favor', flagged: false },
      { id: 'p2', request: 'Healing from chronic illness. 3 years.', date: '2026-03-18', prayerCount: 47, category: 'healing', flagged: false },
      { id: 'p3', request: 'Job breakthrough. God is faithful.', date: '2026-03-17', prayerCount: 35, category: 'breakthrough', flagged: false },
      { id: 'p4', request: 'Marriage restoration. God is able!', date: '2026-03-16', prayerCount: 52, category: 'family', flagged: false },
      { id: 'p5', request: 'Household wickedness. Fire answer!', date: '2026-03-15', prayerCount: 41, category: 'deliverance', flagged: true },
    ],
  };
  return initial;
};

// ─── ICON COMPONENT ─────────────────────────────────────────────
const Ic = ({n, s=18, c=T.muted}) => {
  const p = {
    home: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    megaphone: "M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z",
    cal: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    book: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    loc: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z",
    shield: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
    flame: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z",
    plus: "M12 4v16m8-8H4",
    edit: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
    trash: "M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16",
    flag: "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9",
    check: "M5 13l4 4L19 7",
    x: "M6 18L18 6M6 6l12 12",
    logout: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1",
    search: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
    eye: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z",
  };
  return <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"><path d={p[n]}/></svg>;
};

// ─── REUSABLE COMPONENTS ────────────────────────────────────────
const Btn = ({children, onClick, variant='primary', small, disabled, style={}}) => {
  const v = {
    primary: { bg: T.purple, color: T.white, hbg: T.purpleLight },
    danger: { bg: T.danger, color: T.white },
    ghost: { bg: 'transparent', color: T.muted, border: T.border },
    success: { bg: T.success, color: T.bg },
  };
  const st = v[variant];
  return <button disabled={disabled} onClick={onClick} style={{
    padding: small ? '6px 12px' : '10px 18px', borderRadius: 8,
    backgroundColor: disabled ? T.border : st.bg, color: st.color,
    border: st.border ? `1px solid ${st.border}` : 'none',
    fontSize: small ? 12 : 14, fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: font,
    transition: 'all 0.15s', opacity: disabled ? 0.5 : 1, ...style,
  }}>{children}</button>;
};

const Input = ({label, value, onChange, type='text', placeholder, textarea, required}) => (
  <div style={{marginBottom: 16}}>
    {label && <label style={{display:'block', fontSize:12, fontWeight:600, color:T.muted, marginBottom:6, letterSpacing:0.5, textTransform:'uppercase'}}>{label}{required && <span style={{color:T.fire}}>*</span>}</label>}
    {textarea ? (
      <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={4}
        style={{width:'100%', padding:12, backgroundColor:T.bg, border:`1px solid ${T.border}`, borderRadius:8, color:T.white, fontSize:14, fontFamily:font, resize:'vertical', outline:'none', boxSizing:'border-box'}} />
    ) : (
      <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder}
        style={{width:'100%', padding:12, backgroundColor:T.bg, border:`1px solid ${T.border}`, borderRadius:8, color:T.white, fontSize:14, fontFamily:font, outline:'none', boxSizing:'border-box'}} />
    )}
  </div>
);

const Select = ({label, value, onChange, options}) => (
  <div style={{marginBottom: 16}}>
    <label style={{display:'block', fontSize:12, fontWeight:600, color:T.muted, marginBottom:6, letterSpacing:0.5, textTransform:'uppercase'}}>{label}</label>
    <select value={value} onChange={e=>onChange(e.target.value)}
      style={{width:'100%', padding:12, backgroundColor:T.bg, border:`1px solid ${T.border}`, borderRadius:8, color:T.white, fontSize:14, fontFamily:font, outline:'none'}}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const Modal = ({open, onClose, title, children}) => {
  if(!open) return null;
  return <div style={{position:'fixed', inset:0, zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center'}}>
    <div onClick={onClose} style={{position:'absolute', inset:0, backgroundColor:'rgba(0,0,0,0.7)', backdropFilter:'blur(4px)'}} />
    <div style={{position:'relative', backgroundColor:T.surface, borderRadius:16, padding:28, width:'90%', maxWidth:560, maxHeight:'85vh', overflowY:'auto', border:`1px solid ${T.border}`, boxShadow:'0 24px 80px rgba(0,0,0,0.5)'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20}}>
        <h3 style={{margin:0, fontSize:20, fontWeight:700, color:T.white}}>{title}</h3>
        <button onClick={onClose} style={{background:'none', border:'none', cursor:'pointer', padding:4}}><Ic n="x" c={T.muted}/></button>
      </div>
      {children}
    </div>
  </div>;
};

const Badge = ({text, color=T.purple}) => (
  <span style={{fontSize:10, fontWeight:700, color, backgroundColor:color+'20', padding:'3px 8px', borderRadius:20, textTransform:'uppercase', letterSpacing:0.5}}>{text}</span>
);

const StatCard = ({label, value, icon, color=T.purple}) => (
  <div style={{backgroundColor:T.surface, borderRadius:12, padding:20, border:`1px solid ${T.border}`, flex:1, minWidth:140}}>
    <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:8}}>
      <span style={{fontSize:12, color:T.dim, fontWeight:600, textTransform:'uppercase', letterSpacing:0.5}}>{label}</span>
      <div style={{width:32, height:32, borderRadius:8, backgroundColor:color+'18', display:'flex', alignItems:'center', justifyContent:'center'}}><Ic n={icon} s={16} c={color}/></div>
    </div>
    <div style={{fontSize:28, fontWeight:800, color:T.white}}>{value}</div>
  </div>
);

// ─── MAIN APP ───────────────────────────────────────────────────
export default function AdminPanel() {
  const [db, setDb] = useState(createDB());
  const [page, setPage] = useState('dashboard');
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loginError, setLoginError] = useState('');
  const [modal, setModal] = useState(null);
  const [editItem, setEditItem] = useState(null);
  const [toast, setToast] = useState(null);
  const [search, setSearch] = useState('');

  const showToast = (msg, type='success') => {
    setToast({msg, type});
    setTimeout(()=>setToast(null), 3000);
  };

  const handleLogin = () => {
    if(email && pass) { setLoggedIn(true); setLoginError(''); }
    else setLoginError('Enter email and password');
  };

  const addItem = (collection, item) => {
    const id = collection[0] + Date.now();
    setDb(prev => ({...prev, [collection]: [{id, ...item, createdAt: Date.now()}, ...prev[collection]]}));
    showToast(`${collection.slice(0,-1)} created`);
    setModal(null);
    setEditItem(null);
  };

  const updateItem = (collection, id, updates) => {
    setDb(prev => ({...prev, [collection]: prev[collection].map(i => i.id === id ? {...i, ...updates} : i)}));
    showToast(`Updated successfully`);
    setModal(null);
    setEditItem(null);
  };

  const deleteItem = (collection, id) => {
    if(!confirm('Are you sure? This cannot be undone.')) return;
    setDb(prev => ({...prev, [collection]: prev[collection].filter(i => i.id !== id)}));
    showToast(`Deleted`, 'danger');
  };

  // ─── LOGIN SCREEN ────────────────────────────────────────────
  if(!loggedIn) return (
    <div style={{minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:T.bg, fontFamily:font}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      <div style={{width:380, padding:40, backgroundColor:T.surface, borderRadius:20, border:`1px solid ${T.border}`, textAlign:'center'}}>
        <div style={{width:64, height:64, borderRadius:32, backgroundColor:T.purpleSoft, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 16px'}}><Ic n="flame" s={28} c={T.fire}/></div>
        <h1 style={{margin:0, fontSize:22, fontWeight:800, color:T.white}}>MFM Admin</h1>
        <p style={{color:T.dim, fontSize:13, marginBottom:28}}>Mega Region 2 USA</p>
        {loginError && <div style={{backgroundColor:T.dangerBg, color:T.danger, padding:10, borderRadius:8, fontSize:13, marginBottom:16}}>{loginError}</div>}
        <Input label="Email" value={email} onChange={setEmail} placeholder="admin@mfm.org" type="email"/>
        <Input label="Password" value={pass} onChange={setPass} placeholder="••••••••" type="password"/>
        <Btn onClick={handleLogin} style={{width:'100%', justifyContent:'center', marginTop:8}}>Sign In</Btn>
        <p style={{color:T.dim, fontSize:11, marginTop:20}}>Demo: enter any email + password</p>
      </div>
    </div>
  );

  // ─── NAV ITEMS ───────────────────────────────────────────────
  const nav = [
    {id:'dashboard', label:'Dashboard', icon:'home'},
    {id:'announcements', label:'Announcements', icon:'megaphone'},
    {id:'events', label:'Events', icon:'cal'},
    {id:'devotionals', label:'Devotionals', icon:'book'},
    {id:'branches', label:'Branches', icon:'loc'},
    {id:'prayer', label:'Prayer Wall', icon:'shield'},
  ];

  // ─── FORM STATES ─────────────────────────────────────────────
  const [formData, setFormData] = useState({});
  const setField = (k,v) => setFormData(prev => ({...prev, [k]: v}));

  const openCreateModal = (type) => {
    setEditItem(null);
    setFormData({});
    setModal(type);
  };

  const openEditModal = (type, item) => {
    setEditItem(item);
    setFormData({...item});
    setModal(type);
  };

  // ─── RENDER ──────────────────────────────────────────────────
  return (
    <div style={{display:'flex', minHeight:'100vh', backgroundColor:T.bg, fontFamily:font, color:T.white}}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>

      {/* Toast */}
      {toast && <div style={{position:'fixed', top:20, right:20, zIndex:2000, padding:'12px 20px', borderRadius:10, backgroundColor:toast.type==='danger'?T.danger:T.success, color:T.white, fontSize:14, fontWeight:600, boxShadow:'0 8px 32px rgba(0,0,0,0.3)', animation:'slideIn 0.3s ease'}}>
        {toast.msg}
      </div>}
      <style>{`@keyframes slideIn{from{transform:translateX(100px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>

      {/* Sidebar */}
      <div style={{width:240, backgroundColor:T.surface, borderRight:`1px solid ${T.border}`, padding:'24px 0', display:'flex', flexDirection:'column', flexShrink:0}}>
        <div style={{padding:'0 20px 24px', borderBottom:`1px solid ${T.border}`}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}>
            <div style={{width:36, height:36, borderRadius:10, background:`linear-gradient(135deg, ${T.purple}, ${T.fire})`, display:'flex', alignItems:'center', justifyContent:'center'}}><Ic n="flame" s={18} c={T.white}/></div>
            <div>
              <div style={{fontSize:14, fontWeight:800, color:T.white}}>MFM Admin</div>
              <div style={{fontSize:10, color:T.dim}}>Mega Region 2</div>
            </div>
          </div>
        </div>

        <nav style={{flex:1, padding:'12px 8px'}}>
          {nav.map(item => (
            <button key={item.id} onClick={()=>{setPage(item.id); setSearch('');}}
              style={{width:'100%', display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:8, border:'none', cursor:'pointer', marginBottom:2, fontFamily:font,
                backgroundColor: page===item.id ? T.purpleSoft : 'transparent',
                color: page===item.id ? T.purpleLight : T.muted, fontSize:13, fontWeight:600, textAlign:'left',
                transition:'all 0.15s'
              }}>
              <Ic n={item.icon} s={18} c={page===item.id ? T.purpleLight : T.dim}/>
              {item.label}
              {item.id === 'prayer' && db.prayerRequests.filter(p=>p.flagged).length > 0 && (
                <span style={{marginLeft:'auto', backgroundColor:T.danger, color:T.white, fontSize:9, fontWeight:800, padding:'2px 6px', borderRadius:10, minWidth:16, textAlign:'center'}}>
                  {db.prayerRequests.filter(p=>p.flagged).length}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div style={{padding:'16px 20px', borderTop:`1px solid ${T.border}`}}>
          <button onClick={()=>setLoggedIn(false)} style={{display:'flex', alignItems:'center', gap:8, background:'none', border:'none', color:T.dim, cursor:'pointer', fontSize:13, fontFamily:font}}>
            <Ic n="logout" s={16} c={T.dim}/> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{flex:1, padding:32, overflowY:'auto', maxHeight:'100vh'}}>

        {/* ═══ DASHBOARD ═══ */}
        {page === 'dashboard' && <>
          <h1 style={{margin:'0 0 8px', fontSize:28, fontWeight:800}}>Dashboard</h1>
          <p style={{color:T.dim, margin:'0 0 28px'}}>MFM Mega Region 2 USA — Admin Overview</p>
          <div style={{display:'flex', gap:16, flexWrap:'wrap', marginBottom:32}}>
            <StatCard label="Announcements" value={db.announcements.length} icon="megaphone" color={T.fire}/>
            <StatCard label="Events" value={db.events.length} icon="cal" color={T.gold}/>
            <StatCard label="Devotionals" value={db.devotionals.length} icon="book" color={T.purple}/>
            <StatCard label="Branches" value={db.branches.length} icon="loc" color={T.success}/>
            <StatCard label="Prayer Requests" value={db.prayerRequests.length} icon="shield" color={T.purpleLight}/>
            <StatCard label="Flagged" value={db.prayerRequests.filter(p=>p.flagged).length} icon="flag" color={T.danger}/>
          </div>
          <div style={{backgroundColor:T.surface, borderRadius:12, padding:24, border:`1px solid ${T.border}`}}>
            <h3 style={{margin:'0 0 16px', fontSize:16, fontWeight:700}}>Recent Announcements</h3>
            {db.announcements.slice(0,3).map(a=>(
              <div key={a.id} style={{display:'flex', alignItems:'center', gap:12, padding:'12px 0', borderBottom:`1px solid ${T.border}`}}>
                <Badge text={a.priority} color={a.priority==='high'?T.fire:a.priority==='medium'?T.gold:T.dim}/>
                <span style={{flex:1, fontWeight:600, fontSize:14}}>{a.title}</span>
                <span style={{fontSize:12, color:T.dim}}>{a.date}</span>
              </div>
            ))}
          </div>
        </>}

        {/* ═══ ANNOUNCEMENTS ═══ */}
        {page === 'announcements' && <>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24}}>
            <div><h1 style={{margin:0, fontSize:24, fontWeight:800}}>Announcements</h1><p style={{color:T.dim, margin:'4px 0 0', fontSize:13}}>{db.announcements.length} total</p></div>
            <Btn onClick={()=>openCreateModal('announcement')}><Ic n="plus" s={16} c={T.white}/> New Announcement</Btn>
          </div>
          {db.announcements.map(a=>(
            <div key={a.id} style={{backgroundColor:T.surface, borderRadius:12, padding:18, marginBottom:10, border:`1px solid ${T.border}`, display:'flex', alignItems:'center', gap:14}}>
              <Badge text={a.priority} color={a.priority==='high'?T.fire:a.priority==='medium'?T.gold:T.dim}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:700, fontSize:15}}>{a.title}</div>
                <div style={{color:T.dim, fontSize:12, marginTop:2}}>{a.body.slice(0,80)}...</div>
                <div style={{color:T.dim, fontSize:11, marginTop:4}}>{a.author} • {a.date}</div>
              </div>
              <Btn small variant="ghost" onClick={()=>openEditModal('announcement', a)}><Ic n="edit" s={14} c={T.muted}/></Btn>
              <Btn small variant="ghost" onClick={()=>deleteItem('announcements', a.id)}><Ic n="trash" s={14} c={T.danger}/></Btn>
            </div>
          ))}
        </>}

        {/* ═══ EVENTS ═══ */}
        {page === 'events' && <>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24}}>
            <div><h1 style={{margin:0, fontSize:24, fontWeight:800}}>Events</h1><p style={{color:T.dim, margin:'4px 0 0', fontSize:13}}>{db.events.length} events</p></div>
            <Btn onClick={()=>openCreateModal('event')}><Ic n="plus" s={16} c={T.white}/> New Event</Btn>
          </div>
          {db.events.map(e=>(
            <div key={e.id} style={{backgroundColor:T.surface, borderRadius:12, padding:18, marginBottom:10, border:`1px solid ${T.border}`, display:'flex', alignItems:'center', gap:14, borderLeft:`4px solid ${e.color||T.purple}`}}>
              <div style={{textAlign:'center', minWidth:50}}>
                <div style={{fontSize:20, fontWeight:800, color:T.white}}>{new Date(e.date+'T00:00:00').getDate()}</div>
                <div style={{fontSize:10, fontWeight:700, color:T.dim}}>{new Date(e.date+'T00:00:00').toLocaleDateString('en-US',{month:'short'}).toUpperCase()}</div>
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700, fontSize:15, display:'flex', alignItems:'center', gap:8}}>{e.title} {e.isGlobal && <Badge text="Global" color={T.purple}/>}</div>
                <div style={{color:T.dim, fontSize:12, marginTop:2}}>{e.time} • {e.location}</div>
              </div>
              <Btn small variant="ghost" onClick={()=>openEditModal('event', e)}><Ic n="edit" s={14} c={T.muted}/></Btn>
              <Btn small variant="ghost" onClick={()=>deleteItem('events', e.id)}><Ic n="trash" s={14} c={T.danger}/></Btn>
            </div>
          ))}
        </>}

        {/* ═══ DEVOTIONALS ═══ */}
        {page === 'devotionals' && <>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24}}>
            <div><h1 style={{margin:0, fontSize:24, fontWeight:800}}>Devotionals</h1><p style={{color:T.dim, margin:'4px 0 0', fontSize:13}}>{db.devotionals.length} devotionals</p></div>
            <Btn onClick={()=>openCreateModal('devotional')}><Ic n="plus" s={16} c={T.white}/> New Devotional</Btn>
          </div>
          {db.devotionals.map(d=>(
            <div key={d.id} style={{backgroundColor:T.surface, borderRadius:12, padding:18, marginBottom:10, border:`1px solid ${T.border}`, display:'flex', alignItems:'center', gap:14}}>
              <div style={{width:44, height:44, borderRadius:10, backgroundColor:T.fireSoft, display:'flex', alignItems:'center', justifyContent:'center'}}><Ic n="flame" s={20} c={T.fire}/></div>
              <div style={{flex:1}}>
                <div style={{fontWeight:700, fontSize:15}}>{d.title}</div>
                <div style={{color:T.dim, fontSize:12, marginTop:2}}>{d.bibleReading} • {d.prayerPoints?.length||0} prayer points</div>
                <div style={{display:'flex', gap:8, marginTop:4}}><Badge text={d.category} color={T.fire}/><span style={{fontSize:11, color:T.dim}}>{d.date}</span></div>
              </div>
              <Btn small variant="ghost" onClick={()=>openEditModal('devotional', d)}><Ic n="edit" s={14} c={T.muted}/></Btn>
              <Btn small variant="ghost" onClick={()=>deleteItem('devotionals', d.id)}><Ic n="trash" s={14} c={T.danger}/></Btn>
            </div>
          ))}
        </>}

        {/* ═══ BRANCHES ═══ */}
        {page === 'branches' && <>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24}}>
            <div><h1 style={{margin:0, fontSize:24, fontWeight:800}}>Branches</h1><p style={{color:T.dim, margin:'4px 0 0', fontSize:13}}>{db.branches.length} branches</p></div>
            <Btn onClick={()=>openCreateModal('branch')}><Ic n="plus" s={16} c={T.white}/> New Branch</Btn>
          </div>
          {db.branches.map(b=>(
            <div key={b.id} style={{backgroundColor:T.surface, borderRadius:12, padding:18, marginBottom:10, border:`1px solid ${T.border}`, display:'flex', alignItems:'center', gap:14}}>
              <div style={{width:10, height:10, borderRadius:5, backgroundColor:b.isHQ?T.fire:T.purple, flexShrink:0}}/>
              <div style={{flex:1}}>
                <div style={{fontWeight:700, fontSize:15, display:'flex', alignItems:'center', gap:8}}>{b.name} {b.isHQ && <Badge text="HQ" color={T.fire}/>}</div>
                <div style={{color:T.dim, fontSize:12, marginTop:2}}>{b.address}</div>
                <div style={{color:T.dim, fontSize:12, marginTop:1}}>{b.phone} {b.email && `• ${b.email}`}</div>
              </div>
              <Btn small variant="ghost" onClick={()=>openEditModal('branch', b)}><Ic n="edit" s={14} c={T.muted}/></Btn>
              <Btn small variant="ghost" onClick={()=>deleteItem('branches', b.id)}><Ic n="trash" s={14} c={T.danger}/></Btn>
            </div>
          ))}
        </>}

        {/* ═══ PRAYER WALL MODERATION ═══ */}
        {page === 'prayer' && <>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24}}>
            <div><h1 style={{margin:0, fontSize:24, fontWeight:800}}>Prayer Wall</h1>
            <p style={{color:T.dim, margin:'4px 0 0', fontSize:13}}>{db.prayerRequests.length} requests • {db.prayerRequests.filter(p=>p.flagged).length} flagged</p></div>
          </div>
          <div style={{backgroundColor:T.surface, borderRadius:12, padding:16, marginBottom:16, border:`1px solid ${T.border}`}}>
            <div style={{display:'flex', alignItems:'center', gap:8}}>
              <Ic n="shield" s={18} c={T.purple}/>
              <span style={{fontSize:13, color:T.muted}}>All requests are anonymous. You can moderate content and remove inappropriate submissions.</span>
            </div>
          </div>
          {db.prayerRequests.map(p=>(
            <div key={p.id} style={{backgroundColor:T.surface, borderRadius:12, padding:18, marginBottom:10, border:`1px solid ${p.flagged?T.danger+'60':T.border}`, position:'relative'}}>
              {p.flagged && <div style={{position:'absolute', top:8, right:12}}><Badge text="Flagged" color={T.danger}/></div>}
              <div style={{color:T.white, fontSize:14, lineHeight:1.6, marginBottom:10, paddingRight: p.flagged ? 80 : 0}}>{p.request}</div>
              <div style={{display:'flex', alignItems:'center', gap:12}}>
                <Badge text={p.category} color={T.purple}/>
                <span style={{fontSize:11, color:T.dim}}>{p.date}</span>
                <span style={{fontSize:11, color:T.dim}}>🙏 {p.prayerCount} praying</span>
                <div style={{marginLeft:'auto', display:'flex', gap:6}}>
                  {p.flagged ? (
                    <Btn small variant="success" onClick={()=>updateItem('prayerRequests', p.id, {flagged:false})}><Ic n="check" s={14} c={T.bg}/> Approve</Btn>
                  ) : (
                    <Btn small variant="ghost" onClick={()=>updateItem('prayerRequests', p.id, {flagged:true})}><Ic n="flag" s={14} c={T.warn}/></Btn>
                  )}
                  <Btn small variant="ghost" onClick={()=>deleteItem('prayerRequests', p.id)}><Ic n="trash" s={14} c={T.danger}/></Btn>
                </div>
              </div>
            </div>
          ))}
        </>}
      </div>

      {/* ═══ MODALS ═══ */}

      {/* Announcement Modal */}
      <Modal open={modal==='announcement'} onClose={()=>{setModal(null);setEditItem(null);}} title={editItem ? 'Edit Announcement' : 'New Announcement'}>
        <Input label="Title" value={formData.title||''} onChange={v=>setField('title',v)} placeholder="Easter Special Service" required/>
        <Input label="Body" value={formData.body||''} onChange={v=>setField('body',v)} placeholder="Details of the announcement..." textarea required/>
        <div style={{display:'flex', gap:12}}>
          <div style={{flex:1}}><Select label="Priority" value={formData.priority||'medium'} onChange={v=>setField('priority',v)} options={[{value:'high',label:'High'},{value:'medium',label:'Medium'},{value:'low',label:'Low'}]}/></div>
          <div style={{flex:1}}><Input label="Date" value={formData.date||new Date().toISOString().split('T')[0]} onChange={v=>setField('date',v)} type="date"/></div>
        </div>
        <Input label="Author" value={formData.author||''} onChange={v=>setField('author',v)} placeholder="Mega Region 2 Admin"/>
        <div style={{display:'flex', gap:12, justifyContent:'flex-end', marginTop:8}}>
          <Btn variant="ghost" onClick={()=>{setModal(null);setEditItem(null);}}>Cancel</Btn>
          <Btn onClick={()=>{ if(!formData.title||!formData.body) return; editItem ? updateItem('announcements', editItem.id, formData) : addItem('announcements', {...formData, priority: formData.priority||'medium', author: formData.author||'Admin'}); }}>
            {editItem ? 'Save Changes' : 'Create Announcement'}
          </Btn>
        </div>
      </Modal>

      {/* Event Modal */}
      <Modal open={modal==='event'} onClose={()=>{setModal(null);setEditItem(null);}} title={editItem ? 'Edit Event' : 'New Event'}>
        <Input label="Title" value={formData.title||''} onChange={v=>setField('title',v)} placeholder="Power Must Change Hands" required/>
        <div style={{display:'flex', gap:12}}>
          <div style={{flex:1}}><Input label="Date" value={formData.date||''} onChange={v=>setField('date',v)} type="date" required/></div>
          <div style={{flex:1}}><Input label="Time" value={formData.time||''} onChange={v=>setField('time',v)} placeholder="8:00 AM - 12:00 PM"/></div>
        </div>
        <Input label="Description" value={formData.description||''} onChange={v=>setField('description',v)} textarea/>
        <Input label="Location" value={formData.location||''} onChange={v=>setField('location',v)} placeholder="MFM Prayer City, Houston"/>
        <div style={{display:'flex', gap:12}}>
          <div style={{flex:1}}><Input label="Color" value={formData.color||'#6A0DAD'} onChange={v=>setField('color',v)} type="color"/></div>
          <div style={{flex:1}}><Select label="Global?" value={formData.isGlobal?'true':'false'} onChange={v=>setField('isGlobal',v==='true')} options={[{value:'false',label:'Branch Only'},{value:'true',label:'All Branches'}]}/></div>
        </div>
        <div style={{display:'flex', gap:12, justifyContent:'flex-end', marginTop:8}}>
          <Btn variant="ghost" onClick={()=>{setModal(null);setEditItem(null);}}>Cancel</Btn>
          <Btn onClick={()=>{ if(!formData.title||!formData.date) return; editItem ? updateItem('events', editItem.id, formData) : addItem('events', formData); }}>
            {editItem ? 'Save Changes' : 'Create Event'}
          </Btn>
        </div>
      </Modal>

      {/* Devotional Modal */}
      <Modal open={modal==='devotional'} onClose={()=>{setModal(null);setEditItem(null);}} title={editItem ? 'Edit Devotional' : 'New Devotional'}>
        <Input label="Title" value={formData.title||''} onChange={v=>setField('title',v)} placeholder="Breaking Chains of Limitation" required/>
        <div style={{display:'flex', gap:12}}>
          <div style={{flex:1}}><Input label="Date" value={formData.date||''} onChange={v=>setField('date',v)} type="date" required/></div>
          <div style={{flex:1}}><Select label="Category" value={formData.category||'deliverance'} onChange={v=>setField('category',v)} options={[{value:'deliverance',label:'Deliverance'},{value:'spiritual_warfare',label:'Spiritual Warfare'},{value:'destiny',label:'Destiny'},{value:'healing',label:'Healing'}]}/></div>
        </div>
        <Input label="Bible Reading" value={formData.bibleReading||''} onChange={v=>setField('bibleReading',v)} placeholder="Isaiah 43:18-21"/>
        <Input label="Verse of the Day" value={formData.verseOfDay||''} onChange={v=>setField('verseOfDay',v)} textarea placeholder='"Behold, I will do a new thing" — Isaiah 43:19'/>
        <Input label="Reflection" value={formData.reflection||''} onChange={v=>setField('reflection',v)} textarea/>
        <Input label="Prayer Points (one per line)" value={(formData.prayerPoints||[]).join('\n')} onChange={v=>setField('prayerPoints',v.split('\n').filter(l=>l.trim()))} textarea placeholder="O Lord, break every chain...&#10;Every power assigned..."/>
        <div style={{display:'flex', gap:12, justifyContent:'flex-end', marginTop:8}}>
          <Btn variant="ghost" onClick={()=>{setModal(null);setEditItem(null);}}>Cancel</Btn>
          <Btn onClick={()=>{ if(!formData.title||!formData.date) return; editItem ? updateItem('devotionals', editItem.id, formData) : addItem('devotionals', formData); }}>
            {editItem ? 'Save Changes' : 'Create Devotional'}
          </Btn>
        </div>
      </Modal>

      {/* Branch Modal */}
      <Modal open={modal==='branch'} onClose={()=>{setModal(null);setEditItem(null);}} title={editItem ? 'Edit Branch' : 'New Branch'}>
        <Input label="Branch Name" value={formData.name||''} onChange={v=>setField('name',v)} placeholder="MFM Sugar Land" required/>
        <Input label="Address" value={formData.address||''} onChange={v=>setField('address',v)} placeholder="123 Main St, Sugar Land TX 77478" required/>
        <div style={{display:'flex', gap:12}}>
          <div style={{flex:1}}><Input label="City" value={formData.city||''} onChange={v=>setField('city',v)} placeholder="Sugar Land"/></div>
          <div style={{flex:1}}><Select label="State" value={formData.state||'TX'} onChange={v=>setField('state',v)} options={[{value:'TX',label:'Texas'},{value:'FL',label:'Florida'}]}/></div>
        </div>
        <div style={{display:'flex', gap:12}}>
          <div style={{flex:1}}><Input label="Phone" value={formData.phone||''} onChange={v=>setField('phone',v)} placeholder="(281) 555-0107"/></div>
          <div style={{flex:1}}><Input label="Email" value={formData.email||''} onChange={v=>setField('email',v)} placeholder="branch@mfm.org" type="email"/></div>
        </div>
        <div style={{display:'flex', gap:12, justifyContent:'flex-end', marginTop:8}}>
          <Btn variant="ghost" onClick={()=>{setModal(null);setEditItem(null);}}>Cancel</Btn>
          <Btn onClick={()=>{ if(!formData.name||!formData.address) return; editItem ? updateItem('branches', editItem.id, formData) : addItem('branches', {...formData, isHQ: false}); }}>
            {editItem ? 'Save Changes' : 'Add Branch'}
          </Btn>
        </div>
      </Modal>
    </div>
  );
}
