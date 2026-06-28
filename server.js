function SARMON_BLOCKED(isAdmin){
  // Dasturchi kontaktlarini o'qiymiz
  var dev = {};
  try { dev = JSON.parse(require('fs').readFileSync('/root/control_panel/developer.json','utf8')); } catch(e){}
  var ph  = dev.phone || '';
  var tg  = dev.telegram || '';
  var tgn = dev.telegram_nick || '';
  var ig  = dev.instagram || '';
  var ign = dev.instagram_nick || '';
  var wa  = dev.whatsapp || '';
  var wan = dev.whatsapp_num || '';

  var t  = isAdmin ? 'CHUQUR CHOYHONASI Admin panel - Vaqtinchalik yopilgan' : 'CHUQUR CHOYHONASI Choyhonasi - Menyu sayti yopilgan';
  var ic = isAdmin ? '&#128272;' : '&#129967;';
  var msg= "To'lov amalga oshirilgandan so'ng sayt avtomatik ishga tushadi.";

  // SVG ikonlar (menyudagidek)
  var SVG_PHONE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="#4CAF50"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>';
  var SVG_TG    = '<svg width="18" height="18" viewBox="0 0 24 24" fill="#29A9EA"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248-2.04 9.612c-.152.657-.548.818-1.11.509l-3.073-2.265-1.483 1.427c-.163.163-.3.3-.617.3l.22-3.11 5.672-5.123c.247-.22-.054-.341-.382-.122l-7.01 4.412-3.018-.943c-.655-.205-.669-.655.137-.97l11.775-4.543c.546-.198 1.023.133.929.816z"/></svg>';
  var SVG_IG    = '<svg width="18" height="18" viewBox="0 0 24 24"><defs><linearGradient id="ig_b" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stop-color="#f09433"/><stop offset="33%" stop-color="#dc2743"/><stop offset="100%" stop-color="#bc1888"/></linearGradient></defs><path fill="url(#ig_b)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>';
  var SVG_WA    = '<svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>';

  // Kontakt linklar (menyudagi dev-link stilida)
  var links = '';
  function lnk(href, target, svg, lbl, val){
    return '<a href="'+href+'"'+(target?' target="_blank"':'')+' style="display:flex;align-items:center;gap:8px;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:10px 14px;color:#fff;text-decoration:none;font-size:13px;font-weight:500;flex:1;min-width:130px">'
      +'<span style="display:flex;align-items:center;flex-shrink:0">'+svg+'</span>'
      +'<span style="display:flex;flex-direction:column">'
        +'<span style="font-size:10px;opacity:.5;font-weight:400">'+lbl+'</span>'
        +'<span style="font-size:12px;font-weight:600">'+val+'</span>'
      +'</span></a>';
  }
  if(ph)      links += lnk('tel:'+ph, false, SVG_PHONE, 'Telefon', ph);
  if(tg&&tgn) links += lnk(tg, true,  SVG_TG,    'Telegram',  tgn);
  if(ig&&ign) links += lnk(ig, true,  SVG_IG,    'Instagram', ign);
  if(wa){
    var wh='https://wa.me/'+wa.replace(/[^0-9]/g,'');
    links += lnk(wh, true, SVG_WA, 'WhatsApp', wan||wa);
  }

  var contactBlock = links
    ? '<div style="margin-top:20px;background:linear-gradient(135deg,#1a0a0a,#2d1010);border-radius:18px;padding:18px 16px;position:relative;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.3)">'
      +'<div style="position:absolute;top:-25px;right:-25px;width:100px;height:100px;background:radial-gradient(circle,rgba(200,146,42,.15),transparent 70%);border-radius:50%"></div>'
      +'<div style="font-size:11px;color:rgba(255,255,255,.35);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:12px">Murojaat uchun</div>'
      +'<div style="display:flex;flex-wrap:wrap;gap:8px">'+links+'</div>'
      +'</div>'
    : '';

  return '<!DOCTYPE html><html><head><meta charset=UTF-8><meta name=viewport content=width=device-width,initial-scale=1>'
    +'<title>'+t+'</title>'
    +'<style>*{margin:0;padding:0;box-sizing:border-box}body{background:#0a0505;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:sans-serif;color:#f5e8d8;text-align:center;padding:20px}.box{max-width:460px;width:100%}.ic{font-size:68px;margin-bottom:18px}.tt{font-size:22px;color:#C8922A;margin-bottom:10px;font-weight:700;line-height:1.3}.mg{font-size:14px;color:#9C7B5A;line-height:1.8;margin-bottom:4px}.sep{width:50px;height:2px;background:linear-gradient(90deg,transparent,#C8922A,transparent);margin:14px auto}</style>'
    +'</head><body><div class=box>'
    +'<div class=ic>'+ic+'</div>'
    +'<h1 class=tt>'+t+'</h1>'
    +'<div class=sep></div>'
    +'<p class=mg>'+msg+'</p>'
    +contactBlock
    +'</div></body></html>';
}

const express  = require('express');
const fs       = require('fs');
const path     = require('path');
const cors     = require('cors');
const multer   = require('multer');
const http_mod = require('http');

const app       = express();
const DIR       = __dirname;
const MENU_FILE = path.join(DIR, 'menu.json');
const CFG_FILE  = path.join(DIR, 'config.json');
const CAT_FILE  = path.join(DIR, 'categories.json');
const RAT_FILE  = path.join(DIR, 'ratings.json');
const SUB_FILE  = path.join(DIR, 'subscription.json');
const TOKEN     = 'sarmon-admin-secret-token';

app.use(cors());
app.use(express.json());

/* ─── Multer ─── */
const imgStorage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(DIR, 'uploads')),
  filename:    (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname).toLowerCase())
});
const upload = multer({ storage: imgStorage, limits: { fileSize: 10*1024*1024 },
  fileFilter: (req, file, cb) => cb(null, /^image\//.test(file.mimetype))
});

/* ─── Helpers ─── */
const readJSON  = f => JSON.parse(fs.readFileSync(f, 'utf8'));
const writeJSON = (f, d) => fs.writeFileSync(f, JSON.stringify(d, null, 2));
const auth      = (req, res, next) => {
  if (req.headers.authorization === 'Bearer ' + TOKEN) return next();
  res.status(401).json({ ok: false, msg: 'Ruxsat yoq!' });
};

/* ─── Subscription ─── */
function readSub(){
  try { return JSON.parse(fs.readFileSync(SUB_FILE,'utf8')); }
  catch(e){ return {enabled:true,startDate:'',expiryDate:'',monthsPaid:0,daysLeft:0}; }
}
function writeSub(d){ writeJSON(SUB_FILE, d); }
function calcDaysLeft(expiryDate){
  if(!expiryDate) return 0;
  const diff = new Date(expiryDate) - new Date();
  return Math.max(0, Math.ceil(diff / (1000*60*60*24)));
}

/* ─── Sayt yopilish middleware ─── */
app.use((req, res, next) => {
  const sub = readSub();
  // Muddat tugagan bo'lsa avtomatik yopamiz
  if(sub.expiryDate && new Date(sub.expiryDate) < new Date() && sub.enabled !== false){
    sub.enabled = false;
    writeSub(sub);
  }
  if(sub.enabled === false) {
    const p = req.path + req.url;
    const isAdmin = p.includes('admin.html');
    const isApi   = p.startsWith('/api/') || req.originalUrl.startsWith('/choyhona-api/');
    if(isApi) return next();
    return res.send(SARMON_BLOCKED(isAdmin));
  }
  next();
});

/* ─── LOGIN ─── */
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  const cfg = readJSON(CFG_FILE);
  // Master admin paroli
  if (password === cfg.adminPassword) {
    return res.json({ ok: true, token: TOKEN, name: cfg.restaurantName, role: 'master' });
  }
  // Qo'shimcha adminlar
  const admins = readAdmins();
  const admin = admins.find(a => a.password === password);
  if (admin) {
    return res.json({ ok: true, token: TOKEN, name: admin.name, role: 'admin' });
  }
  res.status(401).json({ ok: false, msg: 'Notogri parol!' });
});

/* ─── RASM YUKLASH ─── */
app.post('/api/upload', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ ok: false });
  res.json({ ok: true, url: '/CHUQUR_CHOYHONASI/uploads/' + req.file.filename });
});

/* ─── MENU ─── */
app.get('/api/menu',        (req, res) => res.json(readJSON(MENU_FILE)));
app.post('/api/menu', auth, (req, res) => { writeJSON(MENU_FILE, req.body); res.json({ ok: true }); });

/* ─── KATEGORIYALAR ─── */
app.get('/api/categories',        (req, res) => res.json(readJSON(CAT_FILE)));
app.post('/api/categories', auth, (req, res) => { writeJSON(CAT_FILE, req.body); res.json({ ok: true }); });

/* ─── CONFIG ─── */
app.get('/api/config', (req, res) => {
  const { adminPassword, ...safe } = readJSON(CFG_FILE);
  res.json(safe);
});
app.post('/api/config', auth, (req, res) => {
  const old = readJSON(CFG_FILE);
  const upd = { ...old, ...req.body };
  if (!req.body.adminPassword) upd.adminPassword = old.adminPassword;
  writeJSON(CFG_FILE, upd);
  res.json({ ok: true });
});

/* ─── DEVELOPER ─── */
const DEV_FILE = path.join(DIR, '../control_panel/developer.json');
function loadDev(){
  try{ return JSON.parse(fs.readFileSync(DEV_FILE,'utf8')); }
  catch(e){ return {}; }
}
app.get('/api/developer',        (req, res) => { const {adminPassword,...s}=loadDev(); res.json(s); });
app.post('/api/developer', auth, (req, res) => {
  const old = loadDev();
  const upd = {...old, ...req.body};
  writeJSON(DEV_FILE, upd);
  res.json({ ok: true });
});

/* ─── BAHOLASH ─── */
function getDeviceType(ua){
  if(!ua) return 'Noma\lum';
  const u = ua.toLowerCase();
  if(u.includes('ipad')||u.includes('tablet')) return 'Planshet';
  if(u.includes('mobile')||u.includes('android')||u.includes('iphone')) return 'Telefon';
  return 'Kompyuter';
}
function parseUA(ua){
  if(!ua) return {browser:'Noma\lum',os:'Noma\lum',device:'Kompyuter'};
  let browser='Boshqa',os='Boshqa',device='Kompyuter';
  if(/Chrome\//i.test(ua)){const m=ua.match(/Chrome\/([\d]+)/i);browser='Chrome'+(m?' '+m[1]:'');}
  else if(/Firefox\//i.test(ua)){const m=ua.match(/Firefox\/([\d]+)/i);browser='Firefox'+(m?' '+m[1]:'');}
  else if(/Safari\//i.test(ua)){browser='Safari';}
  if(/Android/i.test(ua)){const m=ua.match(/Android ([\d.]+)/i);os='Android'+(m?' '+m[1]:'');}
  else if(/iPhone/i.test(ua)){os='iPhone iOS';}
  else if(/Windows NT/i.test(ua)){os='Windows';}
  else if(/Mac OS X/i.test(ua)){os='macOS';}
  if(/iPad/i.test(ua)){device='Planshet';}
  else if(/Mobile|Android|iPhone/i.test(ua)){device='Telefon';}
  return {browser,os,device};
}
async function getGeo(ip){
  return new Promise(resolve=>{
    const local=['127.0.0.1','::1','::ffff:127.0.0.1'];
    if(!ip||local.includes(ip)||ip.startsWith('192.168')||ip.startsWith('10.')){return resolve('Mahalliy');}
    const req2=http_mod.get('http://ip-api.com/json/'+ip+'?fields=status,city,country&lang=en',res2=>{
      let d='';res2.on('data',c=>d+=c);res2.on('end',()=>{
        try{const r=JSON.parse(d);if(r.status==='success'){resolve([r.city,r.country].filter(Boolean).join(', '));}else resolve('Noma\lum');}
        catch(e){resolve('Noma\lum');}
      });
    });
    req2.on('error',()=>resolve('Noma\lum'));
    req2.setTimeout(4000,()=>{req2.destroy();resolve('Noma\lum');});
  });
}

app.get('/api/ratings', (req, res) => {
  try{ res.json(readJSON(RAT_FILE)); }catch(e){ res.json({count:0,total:0,avg:5.0,list:[]}); }
});
app.get('/api/ratings/list', auth, (req, res) => {
  try{ const d=readJSON(RAT_FILE); res.json(d.list||[]); }catch(e){ res.json([]); }
});
app.post('/api/ratings', async (req, res) => {
  const { stars, prevStars } = req.body;
  if(!stars||stars<1||stars>5) return res.status(400).json({ok:false});
  let r={count:0,total:0,avg:5.0,list:[]};
  try{ r=readJSON(RAT_FILE); }catch(e){}
  if(!r.list) r.list=[];
  if(prevStars&&prevStars>=1&&prevStars<=5){ r.total=Math.max(0,r.total-parseInt(prevStars)); }
  else{ r.count+=1; }
  r.total+=parseInt(stars);
  r.avg=r.count>0?Math.round((r.total/r.count)*10)/10:5.0;
  const now=new Date();
  const pad=n=>String(n).padStart(2,'0');
  const ua=req.headers['user-agent']||'';
  const rawIp=req.headers['x-real-ip']||req.headers['x-forwarded-for']||req.socket.remoteAddress||'?';
  const ip=rawIp.split(',')[0].trim().replace('::ffff:','');
  const uaInfo=parseUA(ua);
  const location=await getGeo(ip);
  r.list.unshift({stars:parseInt(stars),time:pad(now.getHours())+':'+pad(now.getMinutes())+':'+pad(now.getSeconds()),date:pad(now.getDate())+'.'+pad(now.getMonth()+1)+'.'+now.getFullYear(),browser:uaInfo.browser,os:uaInfo.os,device:uaInfo.device,location:location,ip:ip,changed:!!prevStars});
  if(r.list.length>200) r.list=r.list.slice(0,200);
  writeJSON(RAT_FILE,r);
  res.json({ok:true,count:r.count,total:r.total,avg:r.avg});
});
app.post('/api/ratings/clear', auth, (req, res) => {
  writeJSON(RAT_FILE,{count:0,total:0,avg:5.0,list:[]});
  res.json({ok:true});
});

/* ─── SAYT HOLATI ─── */
app.get('/api/site-status', (req, res) => {
  const sub=readSub();
  sub.daysLeft=calcDaysLeft(sub.expiryDate);
  res.json({enabled:sub.enabled,...sub});
});
app.post('/api/site-toggle', auth, (req, res) => {
  const sub=readSub();
  if(req.body&&req.body.enabled!==undefined){ sub.enabled=!!req.body.enabled; }
  else{ sub.enabled=!sub.enabled; }
  writeSub(sub);
  res.json({ok:true,enabled:sub.enabled});
});
app.post('/api/subscription/adjust', auth, (req, res) => {
  const {action,days}=req.body;
  const DAYS=parseInt(days)||31;
  const sub=readSub();
  const expiry=sub.expiryDate?new Date(sub.expiryDate):new Date();
  if(action==='add'){
    expiry.setDate(expiry.getDate()+DAYS);
    if(DAYS===31)sub.monthsPaid=(sub.monthsPaid||0)+1;
  }else if(action==='remove'){
    expiry.setDate(expiry.getDate()-DAYS);
    if(DAYS===31)sub.monthsPaid=Math.max(0,(sub.monthsPaid||0)-1);
  }
  sub.expiryDate=expiry.toISOString().split('T')[0];
  sub.daysLeft=calcDaysLeft(sub.expiryDate);
  writeSub(sub);
  res.json({ok:true,message:(action==='add'?'+':'-')+DAYS+' kun',...sub});
});

/* ─── STATIK FAYLLAR ─── */
app.use('/', express.static(path.join(DIR)));
app.use('/', express.static(path.join(DIR)));


/* ─── ADMINS ─── */
const ADMINS_FILE = path.join(DIR, 'admins.json');
function readAdmins(){ try{ return JSON.parse(fs.readFileSync(ADMINS_FILE,'utf8')); }catch(e){ return []; } }
function writeAdmins(d){ writeJSON(ADMINS_FILE, d); }

app.get('/api/admins', auth, (req, res) => res.json(readAdmins()));

app.post('/api/admins/add', auth, (req, res) => {
  const { name, password } = req.body;
  if(!name||!password) return res.status(400).json({ok:false,msg:'Ism va parol kerak'});
  const admins = readAdmins();
  if(admins.find(a=>a.name===name)) return res.status(400).json({ok:false,msg:'Bu ism allaqachon bor'});
  admins.push({name, password, createdAt: new Date().toISOString().split('T')[0]});
  writeAdmins(admins);
  res.json({ok:true});
});

app.post('/api/admins/remove', auth, (req, res) => {
  const { name } = req.body;
  const admins = readAdmins().filter(a => a.name !== name);
  writeAdmins(admins);
  res.json({ok:true});
});

/* ─── AUTO LOGIN (master key) ─── */
app.post('/api/autologin', (req, res) => {
  const { key } = req.body;
  const cfg = readJSON(CFG_FILE);
  if(key === cfg.masterKey) {
    res.json({ ok: true, token: TOKEN });
  } else {
    res.status(401).json({ ok: false });
  }
});


app.get('/api/masterkey', auth, (req, res) => {
  const cfg = readJSON(CFG_FILE);
  res.json({ key: cfg.masterKey || '' });
});
app.listen(4000, () => console.log('CHUQUR CHOYHONASI ishga tushdi: http://localhost:4000'));
