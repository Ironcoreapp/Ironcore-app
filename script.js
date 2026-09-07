// ============================================================================
// --- IRONCORE MAIN ENGINE (PRE-ALFA TESTNET - 100% UNIFICADO Y BLINDADO) ---
// ============================================================================

// 1. INYECCIÓN CSS BASE
const customCSS = `
  header, .top-header, #main-header { display: flex !important; flex-direction: row !important; align-items: center !important; justify-content: space-between !important; padding: 10px 20px !important; background: rgba(20, 26, 38, 0.98) !important; border-bottom: 1px solid rgba(0,229,255,0.2) !important; position: sticky; top: 0; z-index: 1000; box-shadow: 0 4px 20px rgba(0,0,0,0.5); }
  header img[src*="logo"], .top-header img[src*="logo"] { height: 40px !important; width: auto !important; margin: 0 !important; }
  #user-welcome-box { display: flex; flex-direction: row !important; align-items: center !important; gap: 10px !important; margin: 0 !important; text-align: right; }
  #user-welcome-box img#user-avatar { width: 40px !important; height: 40px !important; border-radius: 50%; border: 2px solid #ffaa00; }
  .user-badges-row { display: flex; gap: 8px; flex-direction: row; margin-top: 3px; justify-content: flex-end; }
  .user-badge-mini { background: rgba(0,0,0,0.4); border: 1px solid rgba(255,255,255,0.1); padding: 3px 6px; border-radius: 4px; font-size: 9px; font-weight: bold; }
  #dashboard-tab .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 15px; }
  .stat-panel { background: #111827; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); display: flex; flex-direction: column; justify-content: center; }
  .stat-panel-full { grid-column: span 2; }
  .stat-title { font-size: 10px; color: #9ca3af; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
  .stat-value { font-size: 24px; font-weight: 900; color: #fff; }
  .stat-value.primary { color: #00e5ff; text-shadow: 0 0 10px rgba(0,229,255,0.3); }
  .iron-btn-primary { width: 100%; padding: 14px; margin-top: 12px; background: linear-gradient(135deg, #00e5ff 0%, #007acc 100%); color: #fff; font-size: 14px; font-weight: 900; border: none; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,229,255,0.4); text-transform: uppercase; cursor: pointer; letter-spacing: 1px; transition: all 0.2s ease; }
  .iron-btn-warning { width: 100%; padding: 14px; background: linear-gradient(135deg, #ffaa00 0%, #e65c00 100%); color: #fff; font-size: 14px; font-weight: 900; border: none; border-radius: 10px; box-shadow: 0 4px 15px rgba(255,170,0,0.4); text-transform: uppercase; cursor: pointer; transition: all 0.2s ease; }
  .iron-btn-danger { width: 100%; padding: 12px; margin-top: 15px; background: rgba(255, 51, 102, 0.1); color: #ff3366; border: 1px solid #ff3366; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: all 0.2s ease; }
  .iron-input-modern { width: 100%; padding: 12px; background: rgba(0,0,0,0.4); border: 1px solid rgba(0,229,255,0.5); border-radius: 8px; color: #fff; font-weight: bold; font-size: 14px; box-sizing: border-box; transition: border 0.3s; }
  .search-results-box { max-height: 200px; overflow-y: auto; background: #1a2130; border: 1px solid #00e5ff; border-radius: 8px; margin-top: 5px; position: absolute; width: calc(100% - 40px); z-index: 100; display: none; }
  .search-item { padding: 10px 15px; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; font-size: 13px; color: #fff; display: flex; justify-content: space-between; align-items: center; }
  .history-day { background: #111827; margin-bottom: 12px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
  .history-day-header { padding: 15px; background: linear-gradient(90deg, rgba(0,229,255,0.1) 0%, transparent 100%); font-weight: 800; color: #00e5ff; display: flex; justify-content: space-between; cursor: pointer; font-size: 14px; }
  .history-day-content { padding: 15px; display: none; background: rgba(0,0,0,0.3); }
  .iron-welcome-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10, 15, 25, 0.85); z-index: 9999; display: flex; justify-content: center; align-items: center; opacity: 0; pointer-events: none; transition: opacity 0.4s ease; backdrop-filter: blur(8px); }
  .iron-welcome-overlay.active { opacity: 1; pointer-events: auto; }
  .iron-welcome-modal { background: linear-gradient(145deg, #111827, #1a2130); padding: 35px 25px; border-radius: 15px; border: 1px solid #00e5ff; box-shadow: 0 10px 40px rgba(0, 229, 255, 0.15); text-align: center; max-width: 90%; width: 380px; transform: translateY(30px); transition: transform 0.4s ease; }
  .iron-welcome-overlay.active .iron-welcome-modal { transform: translateY(0); }
  .macro-progress-container { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; margin-top: 6px; overflow: hidden; }
  .macro-progress-fill { height: 100%; border-radius: 3px; transition: width 0.6s ease-out; }
  .social-post-card { background: #111827; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
  .social-post-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .social-post-avatar { width: 35px; height: 35px; border-radius: 50%; border: 1px solid #00e5ff; }
  .social-post-body { font-size: 13px; color: #e5e7eb; line-height: 1.5; margin-bottom: 10px; }
`;
document.head.appendChild(Object.assign(document.createElement('style'), {innerHTML: customCSS}));

// 2. SISTEMA DE NAVEGACIÓN Y PESTAÑAS (CARGA INMEDIATA)
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
    btn.classList.add('active');
    const tgt = document.getElementById(btn.getAttribute('data-target'));
    if(tgt) { tgt.classList.add('active'); tgt.style.display = 'block'; }
    if(btn.getAttribute('data-target') === 'page-social' && typeof window.cargarModuloSocialCompleto === 'function') {
      window.cargarModuloSocialCompleto();
    }
  });
});

function setupTabs(btnClass, subTabClass) { 
  document.querySelectorAll(`.${btnClass}`).forEach(btn => { 
    btn.addEventListener('click', () => { 
      document.querySelectorAll(`.${btnClass}`).forEach(t => t.classList.remove('active')); 
      document.querySelectorAll(`.${subTabClass}`).forEach(s => s.style.display = 'none'); 
      btn.classList.add('active'); 
      const tgt = document.getElementById(btn.getAttribute('data-tab')); 
      if(tgt) tgt.style.display = 'block'; 
      if(btn.getAttribute('data-tab') === 'tab-leaderboard' && typeof window.cargarLeaderboard === 'function') window.cargarLeaderboard(); 
    }); 
  }); 
} 
setupTabs('tab-btn-diet', 'sub-tab-diet'); 
setupTabs('tab-btn-train', 'sub-tab-train');

// 3. BOTTOM SHEETS (MODALES)
const overlay = document.getElementById('sheet-overlay');
window.openSheet = function(sheetId) { 
  const activeSheet = document.getElementById(sheetId); 
  if(overlay) overlay.style.display = 'block'; 
  if(activeSheet) { activeSheet.classList.add('open'); setTimeout(() => activeSheet.style.bottom = '0', 10); window.currentActiveSheet = activeSheet; } 
};
window.closeSheet = function() { 
  if(window.currentActiveSheet) { window.currentActiveSheet.style.bottom = '-100%'; setTimeout(() => { window.currentActiveSheet.classList.remove('open'); if(overlay) overlay.style.display = 'none'; }, 300); } 
};
if(overlay) overlay.addEventListener('click', window.closeSheet);
document.querySelectorAll('.custom-select').forEach(sel => { sel.addEventListener('click', () => { window.activeSelect = sel; window.openSheet(sel.id.replace('select-', 'sheet-')); }); });
document.querySelectorAll('.sheet-option').forEach(opt => { opt.addEventListener('click', function() { if(this.parentElement.id !== 'sheet-actividad') { this.parentElement.querySelectorAll('.sheet-option').forEach(o => o.classList.remove('active')); this.classList.add('active'); if(window.activeSelect) { window.activeSelect.innerText = this.innerText; window.activeSelect.setAttribute('data-val', this.getAttribute('data-val')); } window.closeSheet(); } else { window.closeSheet(); } }); });

// LIMPIEZA DOM
const allElements = document.querySelectorAll('span, p, div, h1, h2, h3, h4, h5, h6');
allElements.forEach(el => { if(el.childNodes.length === 1 && el.innerText && el.innerText.toUpperCase().includes('ELITE PERFORMANCE SYSTEM')) el.style.display = 'none'; });
const rankElem = document.getElementById('header-rank'); const streakElem = document.getElementById('header-streak');
if(rankElem && streakElem) { rankElem.parentElement.classList.add('user-badges-row'); rankElem.classList.add('user-badge-mini'); streakElem.classList.add('user-badge-mini'); }
const genBtn = document.getElementById('btn-generar-rutina');
if(genBtn && !document.getElementById('check-warmup')) {
  const fasesDiv = document.createElement('div');
  fasesDiv.innerHTML = `<div style="display:flex; justify-content:space-between; margin-bottom:15px; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);"><label style="color:#ffaa00; font-size:12px; font-weight:800; display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="check-warmup" checked style="accent-color:#ffaa00; width:16px; height:16px;"> 🔥 Calentamiento</label><label style="color:#00e5ff; font-size:12px; font-weight:800; display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="check-cooldown" checked style="accent-color:#00e5ff; width:16px; height:16px;"> ❄️ Enfriamiento</label></div>`;
  genBtn.parentNode.insertBefore(fasesDiv, genBtn);
}

// 4. FIREBASE E INICIALIZACIÓN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy, limit, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = { apiKey: "AIzaSyAK3QRT5FOqe9q-hxI3NWtTvZT2uGGLCTU", authDomain: "ironcoreapp-66a12.firebaseapp.com", projectId: "ironcoreapp-66a12", storageBucket: "ironcoreapp-66a12.firebasestorage.app", messagingSenderId: "673931910641", appId: "1:673931910641:web:eb3d5a830cbcd31fc6f850" };
const app = initializeApp(firebaseConfig); const auth = getAuth(app); const db = getFirestore(app); let currentUser = null;

let totalCalorias = 0, totalProt = 0, totalCarb = 0, totalGrasa = 0, totalAgua = 0, totalQuemadas = 0, userStreak = 1;
let metaCalorias = 2500, metaProt = 165, metaCarb = 275, metaGrasa = 69;
let currentRankName = "Ashigaru";
let userProfile = { perfilCompleto: false, nickname: "", genero: "M", edad: 25, peso: 75, altura: 175, metaObj: 0, actividad: 1.55 };

function getTodayKey() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function showToast(msg) { const toast = document.getElementById('toast-notif'); if(!toast) return; toast.innerHTML = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3500); }

const ironCoreTips = [ "⚡ La creatina (5g) funciona por acumulación.", "🥩 Hipertrofia: Consume 2.0g de proteína por kilo.", "💧 Hidratación: 1 litro por cada 25kg de peso.", "💤 El músculo crece al dormir. 8 horas.", "🔥 En déficit, usa alimentos de alto volumen." ];
const dt = document.getElementById('daily-tip'); if(dt) dt.innerText = ironCoreTips[Math.floor(Math.random() * ironCoreTips.length)];

// MODAL MOTIVACIONAL
const oraculoQuotes = [ "La disciplina es el puente entre metas y logros.", "El hierro no miente.", "Cada repetición te acerca a tu mejor versión.", "La gravedad es resistencia, véncela.", "La constancia vence a la intensidad." ];
function mostrarMensajeMotivacional() {
  if (sessionStorage.getItem('ironcore_welcome_shown')) return; 
  const overlay = document.createElement('div'); overlay.className = 'iron-welcome-overlay';
  overlay.innerHTML = `<div class="iron-welcome-modal"><div class="iron-welcome-title">⚔️ LA JORNADA COMIENZA</div><div class="iron-welcome-quote">"${oraculoQuotes[Math.floor(Math.random() * oraculoQuotes.length)]}"</div><button class="iron-btn-warning" style="width: 100%; margin-top:10px;" onclick="this.parentElement.parentElement.classList.remove('active'); setTimeout(() => this.parentElement.parentElement.remove(), 400);">Entendido</button></div>`;
  document.body.appendChild(overlay); setTimeout(() => overlay.classList.add('active'), 100); sessionStorage.setItem('ironcore_welcome_shown', 'true');
}

// 5. AUTENTICACIÓN Y ONBOARDING
const authScreen = document.getElementById('auth-screen');
getRedirectResult(auth).then((result) => { if (result && result.user) showToast('⚔️ ¡Acceso autorizado!'); }).catch(console.error);
document.getElementById('btn-google-login')?.addEventListener('click', async () => { showToast('🔄 Conectando...'); const provider = new GoogleAuthProvider(); provider.setCustomParameters({ prompt: 'select_account' }); try { await signInWithPopup(auth, provider); showToast('⚔️ ¡Acceso autorizado!'); } catch(error) { await signInWithRedirect(auth, provider); } });
document.getElementById('btn-logout')?.addEventListener('click', () => { sessionStorage.removeItem('ironcore_welcome_shown'); signOut(auth); });
document.getElementById('btn-logout-profile')?.addEventListener('click', () => { sessionStorage.removeItem('ironcore_welcome_shown'); signOut(auth); });

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user; if(authScreen) authScreen.style.display = 'none'; 
    const nickElem = document.getElementById('ob-nickname'); if(nickElem) nickElem.value = (user.displayName || "Guerrero").split(' ')[0]; 
    await cargarDatosDesdeNube(user.uid); mostrarMensajeMotivacional(); iniciarNotificacionesEnVivo(user.uid);
  } else { currentUser = null; if(authScreen) authScreen.style.display = 'flex'; const wb = document.getElementById('user-welcome-box'); if(wb) wb.style.display = 'none'; }
});

function generarAvatarPorRango(nickname, rango) { let bg = "111827"; if(rango === "Rōnin") bg = "ffaa00"; if(rango === "Samurái") bg = "ff3366"; if(rango === "Daimyō") bg = "9933ff"; if(rango === "IRON SHŌGUN") bg = "00e5ff"; return `https://api.dicebear.com/7.x/bottts/svg?seed=${nickname}-${rango}&backgroundColor=${bg}`; }

const obScreen = document.getElementById('onboarding-screen'); const obTrack = document.getElementById('ob-track'); const obBar = document.getElementById('ob-bar'); let currentObStep = 0;
window.abrirOnboarding = function(isEdit = false) { 
  if(!obScreen) return; obScreen.style.display = 'flex'; currentObStep = 0; if(obTrack) obTrack.style.transform = `translateX(0%)`; if(obBar) obBar.style.width = '33.33%'; 
  if(isEdit) { document.getElementById('ob-title').innerText = "Editar Credencial"; document.getElementById('ob-nickname').value = userProfile.nickname; window.seleccionarGenero(userProfile.genero); document.getElementById('ob-edad').value = userProfile.edad; document.getElementById('ob-peso').value = userProfile.peso; document.getElementById('ob-altura').value = userProfile.altura; } 
  else { document.getElementById('ob-title').innerText = "Ritual de Iniciación"; } 
};
window.moverOnboarding = function(dir) { 
  if(dir === 1 && currentObStep === 0) { const nickVal = document.getElementById('ob-nickname')?.value.trim(); if(!nickVal) { showToast('⚠️ Elige un apodo.'); return; } } 
  currentObStep += dir; if(currentObStep < 0) currentObStep = 0; if(currentObStep > 2) currentObStep = 2; 
  if(obTrack) obTrack.style.transform = `translateX(-${currentObStep * 33.333}%)`; if(obBar) obBar.style.width = `${(currentObStep + 1) * 33.33}%`; 
};
window.seleccionarGenero = function(gen) { userProfile.genero = gen; document.querySelectorAll('.ob-gender-btn').forEach(b => { if(b.getAttribute('data-gen') === gen) b.classList.add('active'); else b.classList.remove('active'); }); };
window.seleccionarMetaOb = function(elem) { document.querySelectorAll('.ob-goal-card').forEach(c => c.classList.remove('active')); elem.classList.add('active'); userProfile.metaObj = parseInt(elem.getAttribute('data-val')); };

window.finalizarOnboarding = async function() {
  const nickInput = document.getElementById('ob-nickname'); const desiredNick = nickInput?.value.trim().toLowerCase() || "guerrero";
  if (currentUser && db) { const q = query(collection(db, "users"), where("nickname_lower", "==", desiredNick)); const snap = await getDocs(q); if (!snap.empty && snap.docs[0].id !== currentUser.uid) { showToast("⚠️ Ese apodo ya está en uso. Elige otro."); return; } }
  userProfile.nickname = nickInput?.value.trim() || "Guerrero"; userProfile.nickname_lower = desiredNick; userProfile.edad = parseInt(document.getElementById('ob-edad')?.value) || 25; userProfile.peso = parseFloat(document.getElementById('ob-peso')?.value) || 75; userProfile.altura = parseInt(document.getElementById('ob-altura')?.value) || 175; userProfile.actividad = parseFloat(document.getElementById('select-actividad')?.getAttribute('data-val')) || 1.55; userProfile.perfilCompleto = true;
  let tmb = userProfile.genero === 'M' ? (10 * userProfile.peso) + (6.25 * userProfile.altura) - (5 * userProfile.edad) + 5 : (10 * userProfile.peso) + (6.25 * userProfile.altura) - (5 * userProfile.edad) - 161; let tdee = tmb * userProfile.actividad;
  metaCalorias = Math.round(tdee + (userProfile.metaObj || 0)); metaProt = (userProfile.metaObj || 0) > 0 ? Math.round(userProfile.peso * 2.0) : Math.round(userProfile.peso * 2.2); metaGrasa = Math.round((metaCalorias * 0.25) / 9); metaCarb = Math.round((metaCalorias - ((metaProt * 4) + (metaGrasa * 9))) / 4);
  await guardarEstadoNube(); actualizarUIHeader(); actualizarUIPerfil(); window.actualizarDashboard(); if(obScreen) obScreen.style.display = 'none'; showToast(`✅ Credencial Sincronizada`); document.querySelector('[data-target="page-dashboard"]')?.click();
};

async function guardarEstadoNube() { if(!currentUser || !db) return; try { await setDoc(doc(db, "users", currentUser.uid), { calorias: totalCalorias, proteina: totalProt, carbos: totalCarb, grasa: totalGrasa, agua: totalAgua, quemadas: totalQuemadas, metaCal: metaCalorias, metaProt: metaProt, metaCarb: metaCarb, metaGrasa: metaGrasa, streak: userStreak, ultimaFecha: localStorage.getItem('ic_ultima_fecha'), currentRankName, ...userProfile }, { merge: true }); } catch(e) { console.error(e); } }
async function cargarDatosDesdeNube(uid) { 
  if(!db) return; const docSnap = await getDoc(doc(db, "users", uid)); 
  if (docSnap.exists()) { const d = docSnap.data(); totalCalorias = d.calorias || 0; totalProt = d.proteina || 0; totalCarb = d.carbos || 0; totalGrasa = d.grasa || 0; totalAgua = d.agua || 0; totalQuemadas = d.quemadas || 0; metaCalorias = d.metaCal || 2500; metaProt = d.metaProt || 165; metaCarb = d.metaCarb || 275; metaGrasa = d.metaGrasa || 69; userStreak = d.streak || 1; userProfile.perfilCompleto = d.perfilCompleto || false; userProfile.nickname = d.nickname || ""; userProfile.genero = d.genero || "M"; userProfile.edad = d.edad || 25; userProfile.peso = d.peso || 75; userProfile.altura = d.altura || 175; userProfile.metaObj = d.metaObj !== undefined ? d.metaObj : 0; userProfile.actividad = d.actividad || 1.55; currentRankName = d.currentRankName || "Ashigaru"; } 
  if(!userProfile.perfilCompleto) { window.abrirOnboarding(false); } else { actualizarUIHeader(); actualizarUIPerfil(); } 
  iniciarSakuraBackground(); verificarCambioDeDia(); window.actualizarDashboard(); actualizarAguaUI(); await window.cargarRegistrosDelDia(uid); await window.cargarHistorialYCheckins(uid); 
}

function actualizarUIHeader() { const dn = document.getElementById('user-display-name'); if(dn) dn.innerText = userProfile.nickname.toUpperCase(); const avatarHeader = document.getElementById('user-avatar'); if(avatarHeader) { avatarHeader.src = generarAvatarPorRango(userProfile.nickname, currentRankName); avatarHeader.style.display = 'inline-block'; } const wb = document.getElementById('user-welcome-box'); if(wb) wb.style.display = 'flex'; }
function actualizarUIPerfil() { const cn = document.getElementById('profile-card-name'); if(cn) cn.innerText = userProfile.nickname.toUpperCase(); const vp = document.getElementById('profile-val-peso'); if(vp) vp.innerText = `${userProfile.peso} kg`; const va = document.getElementById('profile-val-altura'); if(va) va.innerText = `${userProfile.altura} cm`; const ve = document.getElementById('profile-val-edad'); if(ve) ve.innerText = `${userProfile.edad} años`; const vg = document.getElementById('profile-val-genero'); if(vg) vg.innerText = userProfile.genero === 'M' ? 'Hombre' : 'Mujer'; let labelMeta = userProfile.metaObj === -500 ? "Déficit Agresivo" : userProfile.metaObj === -300 ? "Definición" : userProfile.metaObj === 300 ? "Volumen" : "Mantenimiento"; const cg = document.getElementById('profile-card-goal'); if(cg) cg.innerText = `Meta: ${labelMeta}`; const ca = document.getElementById('profile-card-avatar'); if(ca) ca.src = generarAvatarPorRango(userProfile.nickname, currentRankName); }

// 6. DASHBOARD GLOBAL
window.actualizarDashboard = function() { 
  const dashboardContainer = document.getElementById('dashboard-tab'); if(!dashboardContainer) return;
  let gridBox = document.getElementById('iron-stats-grid');
  if(!gridBox) {
    const oldTotals = document.querySelectorAll('.card-main, .macros'); oldTotals.forEach(el => el.style.display = 'none');
    gridBox = document.createElement('div'); gridBox.id = 'iron-stats-grid'; gridBox.className = 'stats-grid';
    dashboardContainer.insertBefore(gridBox, document.getElementById('lista-comidas')?.parentElement || dashboardContainer.children[1]);
  }
  const calNetas = Math.max(0, totalCalorias - totalQuemadas); const prPct = Math.min(100, (totalProt/metaProt)*100) || 0; const cbPct = Math.min(100, (totalCarb/metaCarb)*100) || 0; const grPct = Math.min(100, (totalGrasa/metaGrasa)*100) || 0; const calColor = calNetas > metaCalorias ? 'danger' : 'primary';
  gridBox.innerHTML = `
    <div class="stat-panel stat-panel-full" style="background: linear-gradient(135deg, #111827 0%, #1a2130 100%);">
      <div class="stat-title">Balance Energético Neto <span style="color:#00e5ff;">📊</span></div>
      <div style="display:flex; justify-content:space-between; align-items:flex-end;">
        <div><span class="stat-value ${calColor}" style="font-size:32px;">${calNetas}</span><span style="color:#9ca3af; font-size:12px;"> / ${metaCalorias} kcal</span></div>
        <div style="text-align:right;"><div style="font-size:10px; color:#9ca3af; margin-bottom:4px;">Ingesta: <span style="color:#fff; font-weight:bold;">${totalCalorias} kcal</span></div><div style="font-size:10px; color:#9ca3af;">Quemadas: <span style="color:#ffaa00; font-weight:bold;">🔥 ${totalQuemadas} kcal</span></div></div>
      </div>
      <div class="macro-progress-container" style="margin-top:12px;"><div class="macro-progress-fill" style="width:${Math.min(100, (calNetas/metaCalorias)*100)}%; background:${calColor==='danger'?'#ff3366':'#00e5ff'};"></div></div>
    </div>
    <div class="stat-panel"><div class="stat-title">Proteína</div><div class="stat-value" style="font-size:18px;">${totalProt}g <span style="font-size:10px; color:#9ca3af;">/ ${metaProt}g</span></div><div class="macro-progress-container"><div class="macro-progress-fill" style="width:${prPct}%; background:#ff3366;"></div></div></div>
    <div class="stat-panel"><div class="stat-title">Hidratación</div><div class="stat-value" style="font-size:18px; color:#00e5ff;">${totalAgua/1000}L <span style="font-size:10px; color:#9ca3af;">/ 3.0L</span></div><div class="macro-progress-container"><div class="macro-progress-fill" style="width:${Math.min(100, (totalAgua/3000)*100)}%; background:#00e5ff;"></div></div></div>
    <div class="stat-panel"><div class="stat-title">Carbohidratos</div><div class="stat-value" style="font-size:18px;">${totalCarb}g <span style="font-size:10px; color:#9ca3af;">/ ${metaCarb}g</span></div><div class="macro-progress-container"><div class="macro-progress-fill" style="width:${cbPct}%; background:#00e5ff;"></div></div></div>
    <div class="stat-panel"><div class="stat-title">Grasas</div><div class="stat-value" style="font-size:18px;">${totalGrasa}g <span style="font-size:10px; color:#9ca3af;">/ ${metaGrasa}g</span></div><div class="macro-progress-container"><div class="macro-progress-fill" style="width:${grPct}%; background:#ffaa00;"></div></div></div>
  `;
}

// 7. BASES DE DATOS (NUTRICIÓN Y EJERCICIOS)
let oracleDB = []; let exercisesDB = [];
async function inicializarBases() {
  try { const resFood = await fetch('alimentos.json?v=' + Date.now()); if (resFood.ok) oracleDB = await resFood.json(); } catch (error) { console.error("Error Alimentos JSON"); }
  try { const resEx = await fetch('ejercicios.json?v=' + Date.now()); if (!resEx.ok) throw new Error(); exercisesDB = await resEx.json(); console.log(`⚔️ Base sincronizada con ${exercisesDB.length} ejercicios.`); } catch (error) { console.error("Error ejercicios.json"); }
}
inicializarBases();

// 8. ORÁCULO DE NUTRICIÓN
let weeklyPlan = []; let selectedDayIndex = 0; let activeAllergies = [];
const allergyInput = document.getElementById('oracle-allergies-input'); const allergyContainer = document.getElementById('allergy-tags-container');
if(allergyInput) { allergyInput.addEventListener('keypress', (e) => { if(e.key === 'Enter' || e.key === ',') { e.preventDefault(); const val = allergyInput.value.trim().toLowerCase(); if(val && !activeAllergies.includes(val)) { activeAllergies.push(val); renderAllergyChips(); } allergyInput.value = ''; } }); }
function renderAllergyChips() { if(!allergyContainer) return; allergyContainer.innerHTML = ''; activeAllergies.forEach((allergy, index) => { const chip = document.createElement('div'); chip.className = 'allergy-chip'; chip.innerHTML = `<span>${allergy}</span><span class="allergy-chip-close" onclick="window.removeAllergy(${index})">×</span>`; allergyContainer.appendChild(chip); }); } 
window.removeAllergy = function(index) { activeAllergies.splice(index, 1); renderAllergyChips(); };
let dynamicDays = [];
function calcularFechasSemana() { dynamicDays = []; const date = new Date(); const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']; const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']; for(let i=0; i<7; i++) { let d = new Date(date); d.setDate(d.getDate() + i); dynamicDays.push({ index: i, shortName: dayNames[d.getDay()], fullName: `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]}` }); } }

document.getElementById('btn-generar-plan')?.addEventListener('click', () => { 
  if (oracleDB.length === 0) { showToast("⚠️ Sincronizando alimentos... Espera un segundo."); return; } 
  calcularFechasSemana(); generarPlanSemanal(); 
  document.getElementById('oracle-form-card').style.display = 'none'; document.getElementById('plan-resultado').style.display = 'block'; showToast('🤖 Plan clínico generado con éxito.'); 
});

window.seleccionarDiaPlan = function(index) { selectedDayIndex = index; document.querySelectorAll('.day-chip').forEach(btn => btn.classList.remove('active')); document.querySelector(`.day-chip[data-day="${index}"]`)?.classList.add('active'); const ph = document.getElementById('plan-date-header'); if(ph) ph.innerText = dynamicDays[index].fullName; renderizarDiaSeleccionado(); };

function generarPlanSemanal() { 
  weeklyPlan = []; const distribution = [ { tipo: 'desayuno', cals: metaCalorias * 0.25 }, { tipo: 'almuerzo', cals: metaCalorias * 0.35 }, { tipo: 'cena', cals: metaCalorias * 0.30 }, { tipo: 'snack', cals: metaCalorias * 0.10 } ]; 
  for(let i=0; i<7; i++) { let dayMeals = distribution.map(slot => obtenerComidaAlgoritmo(slot.tipo, slot.cals, [])); weeklyPlan.push(dayMeals); } 
  const scrollContainer = document.getElementById('day-selector-container'); 
  if(scrollContainer) { scrollContainer.innerHTML = ''; dynamicDays.forEach(day => { scrollContainer.innerHTML += `<button class="day-chip ${day.index === 0 ? 'active' : ''}" data-day="${day.index}" onclick="window.seleccionarDiaPlan(${day.index})">${day.shortName}</button>`; }); }
  window.seleccionarDiaPlan(0); 
}

function filtrarBaseDatos(tipo, excludesId) { 
  let currentDietType = document.getElementById('oracle-diet-type')?.value || 'normal'; let isCeliac = document.getElementById('oracle-celiac')?.checked || false; let isLactose = document.getElementById('oracle-lactose')?.checked || false; let isSibo = document.getElementById('oracle-sibo')?.checked || false; 
  let candidatos = oracleDB.filter(m => { if(m.tipo !== tipo) return false; if(m.dietas && !m.dietas.includes(currentDietType)) return false; if(excludesId && excludesId.includes(m.id)) return false; if(isCeliac && m.glutenFree === false) return false; if(isLactose && m.lactoseFree === false) return false; if(isSibo && m.siboSafe === false) return false; let jsonStr = JSON.stringify(m).toLowerCase(); for(let a of activeAllergies) { if(jsonStr.includes(a)) return false; } return true; }); 
  if(candidatos.length === 0) candidatos = oracleDB.filter(m => m.tipo === tipo); return candidatos; 
}
function calcularMacrosPorcion(comidaBase, targetCals) { 
  const factor = targetCals / (comidaBase.calBase || 1); 
  let ingredientesAdaptados = (comidaBase.ingredientes || []).map(ing => { let qtyCalculada = ing.baseQty * factor; qtyCalculada = ing.unidad === 'unidades' || ing.unidad === 'scoops' ? parseFloat(qtyCalculada.toFixed(1)) : Math.round(qtyCalculada); return { nombre: ing.nombre, cantidad: qtyCalculada, unidad: ing.unidad }; }); 
  return { id: comidaBase.id, tipo: comidaBase.tipo, name: comidaBase.name, cals: Math.round(comidaBase.calBase * factor), prot: Math.round(comidaBase.prot * factor), carb: Math.round(comidaBase.carb * factor), gras: Math.round(comidaBase.gras * factor), ingredientes: ingredientesAdaptados }; 
}
function obtenerComidaAlgoritmo(tipo, targetCals, excludesId) { const candidatos = filtrarBaseDatos(tipo, excludesId); if(candidatos.length === 0) return { id: 0, tipo: tipo, name: "Sin Opciones", cals: targetCals, prot: 0, carb: 0, gras: 0, ingredientes: [] }; const selected = candidatos[Math.floor(Math.random() * candidatos.length)]; return calcularMacrosPorcion(selected, targetCals); }
function renderizarDiaSeleccionado() { 
  const container = document.getElementById('comidas-plan'); if(!container) return; container.innerHTML = ''; const dayMeals = weeklyPlan[selectedDayIndex] || []; 
  dayMeals.forEach((meal, idx) => { let ingredientesHTML = meal.ingredientes.length > 0 ? meal.ingredientes.map(i => `<span style="display:block; margin-bottom:3px;">• ${i.cantidad} ${i.unidad} de ${i.nombre}</span>`).join('') : `• Sin ingredientes`; container.innerHTML += `<div class="plan-meal-card"><div class="plan-meal-header"><span class="plan-meal-title">${meal.tipo}</span><button class="btn-swap" onclick="window.abrirMenuReemplazo(${idx})">🔄 Cambiar</button></div><div class="plan-meal-desc"><b>${meal.name}</b>${ingredientesHTML}</div><div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;"><span class="plan-meal-cals">🔥 ${meal.cals} kcal</span><span style="font-size:11px; color:var(--text-muted); font-weight:800;">P: <span style="color:#ff3366;">${meal.prot}g</span> | C: <span style="color:#00e5ff;">${meal.carb}g</span> | G: <span style="color:#ffaa00;">${meal.gras}g</span></span></div></div>`; }); 
}

let swapTargetIndex = -1;
window.abrirMenuReemplazo = function(mealIndex) { 
  swapTargetIndex = mealIndex; const oldMeal = weeklyPlan[selectedDayIndex][mealIndex]; const targetCals = oldMeal.cals; let candidatos = filtrarBaseDatos(oldMeal.tipo, [oldMeal.id]); const listContainer = document.getElementById('sheet-swap-list'); if(!listContainer) return; listContainer.innerHTML = ''; 
  if(candidatos.length === 0) { listContainer.innerHTML = `<p style="font-size:12px; color:#ff3366;">No hay opciones.</p>`; } else { for(let i=0; i<candidatos.length; i++) { let opcionEscalada = calcularMacrosPorcion(candidatos[i], targetCals); let objData = encodeURIComponent(JSON.stringify(opcionEscalada)); listContainer.innerHTML += `<div class="swap-option-card" onclick="window.confirmarReemplazo('${objData}')" style="background:#1a2130; padding:12px; border-radius:8px; cursor:pointer; margin-bottom:8px;"><b style="display:block; color:#fff;">${opcionEscalada.name}</b><span style="font-size:11px; color:var(--primary);">🔥 ${opcionEscalada.cals} kcal | P: ${opcionEscalada.prot}g | C: ${opcionEscalada.carb}g | G: ${opcionEscalada.gras}g</span></div>`; } } window.openSheet('sheet-swap-meal'); 
};
window.confirmarReemplazo = function(encodedData) { if(swapTargetIndex > -1) { const newMeal = JSON.parse(decodeURIComponent(encodedData)); weeklyPlan[selectedDayIndex][swapTargetIndex] = newMeal; renderizarDiaSeleccionado(); window.closeSheet(); showToast(`✅ Actualizado.`); } };

// FUNCIONES GLOBALES DE LA DIETA Y ESCÁNER (AQUÍ ESTÁ LA MAGIA RECUPERADA)
window.generarListaCompras = function() {
  const ul = document.getElementById('lista-compras-ui'); if(!ul) return; let listaConsolidada = {};
  weeklyPlan.forEach(dia => { dia.forEach(comida => { comida.ingredientes.forEach(ing => { let key = `${ing.nombre} (${ing.unidad})`; listaConsolidada[key] = (listaConsolidada[key] || 0) + ing.cantidad; }); }); });
  ul.innerHTML = '';
  for (let key in listaConsolidada) { let rawQty = listaConsolidada[key]; let qtyDisplay = key.includes('unidades') || key.includes('scoops') ? rawQty.toFixed(1) : Math.round(rawQty); let match = key.match(/(.*) \((.*)\)/); let nombreLimpio = match ? match[1] : key; let unidadLimpia = match ? match[2] : ''; ul.innerHTML += `<li><input type="checkbox" style="accent-color:var(--primary); width:18px; height:18px;"> <span style="flex:1;">${nombreLimpio}</span> <b style="color:var(--primary); font-size:12px;">${qtyDisplay} ${unidadLimpia}</b></li>`; } window.openSheet('sheet-compras');
};

document.getElementById('btn-add-planned')?.addEventListener('click', () => {
  if(!weeklyPlan || weeklyPlan.length === 0) { showToast('⚠️ Genera un plan primero.'); return; }
  const listContainer = document.getElementById('sheet-planned-list'); if(!listContainer) return; listContainer.innerHTML = ''; const todaysPlan = weeklyPlan[0];
  todaysPlan.forEach(meal => { let objData = encodeURIComponent(JSON.stringify(meal)); listContainer.innerHTML += `<div class="swap-option-card" onclick="window.registrarComidaPlaneada('${objData}')" style="background:#1a2130; padding:12px; border-radius:8px; cursor:pointer; margin-bottom:8px;"><span style="font-size:10px; color:var(--primary); font-weight:800; text-transform:uppercase;">${meal.tipo}</span><b style="display:block; color:#fff; margin-top:4px;">${meal.name}</b><span>🔥 ${meal.cals} kcal | P: ${meal.prot}g | C: ${meal.carb}g | G: ${meal.gras}g</span></div>`; });
  window.openSheet('sheet-planned-meals');
});

window.registrarComidaPlaneada = async function(encodedData) {
  const meal = JSON.parse(decodeURIComponent(encodedData)); let nombreFinal = `[${meal.tipo.charAt(0).toUpperCase() + meal.tipo.slice(1)}] ${meal.name}`;
  await window.registrarComidaNube(meal.cals, meal.prot, meal.carb, meal.gras, nombreFinal); window.closeSheet(); showToast(`✅ Registrado.`);
};

let html5QrCode = null;
document.getElementById('btn-foto')?.addEventListener('click', () => { window.openSheet('sheet-scanner'); if (!html5QrCode) html5QrCode = new Html5Qrcode("qr-reader"); const config = { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 }; html5QrCode.start({ facingMode: "environment" }, config, window.onScanSuccess, () => {}).catch(err => { showToast("⚠️ Error cámara."); }); });
window.closeScanner = function() { if (html5QrCode && html5QrCode.isScanning) { html5QrCode.stop().then(() => { html5QrCode.clear(); }).catch(e => console.error(e)); } window.closeSheet(); };
window.onScanSuccess = async function(decodedText) {
  if (html5QrCode && html5QrCode.isScanning) { await html5QrCode.stop(); } window.closeScanner(); showToast(`🔍 Buscando ${decodedText}...`);
  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${decodedText}.json`); const data = await res.json();
    if (data.status === 1) {
      const p = data.product; if(!p.nutriments || !p.nutriments['energy-kcal_100g']) { showToast('⚠️ Sin info nutricional.'); return; }
      let brand = p.brands ? ` (${p.brands.split(',')[0]})` : ''; let nombre = `${p.product_name || 'Producto'}${brand}`;
      let cal100 = Math.round(p.nutriments['energy-kcal_100g']); let prot100 = Math.round(p.nutriments['proteins_100g'] || 0); let carb100 = Math.round(p.nutriments['carbohydrates_100g'] || 0); let gras100 = Math.round(p.nutriments['fat_100g'] || 0);
      window.currentSearchFoodBase = { cal: cal100, prot: prot100, carb: carb100, gras: gras100 };
      document.getElementById('food-selected-name').innerText = nombre; document.getElementById('food-results-list').innerHTML = ''; document.getElementById('edit-qty').value = '100'; document.getElementById('edit-unit').value = '1'; window.recalcularMacros(); document.getElementById('food-custom-section').style.display = 'block'; window.openSheet('sheet-add-food');
    } else { showToast('❌ No encontrado.'); }
  } catch (err) { showToast('⚠️ Error conexión.'); }
};

window.currentSearchFoodBase = null;
const fallbackDB = [ { product_name: "Yogurt Protein Natural", brands: "Soprole", nutriments: { 'energy-kcal_100g': 55, 'proteins_100g': 8, 'carbohydrates_100g': 5, 'fat_100g': 0 } }, { product_name: "Avena Tradicional", brands: "Quaker", nutriments: { 'energy-kcal_100g': 370, 'proteins_100g': 13, 'carbohydrates_100g': 60, 'fat_100g': 7 } }, { product_name: "Pechuga de Pollo", brands: "SuperPollo", nutriments: { 'energy-kcal_100g': 110, 'proteins_100g': 23, 'carbohydrates_100g': 0, 'fat_100g': 1.5 } } ];
document.getElementById('btn-abrir-manual')?.addEventListener('click', () => { document.getElementById('food-search').value = ''; document.getElementById('food-results-list').innerHTML = ''; document.getElementById('food-custom-section').style.display = 'none'; window.openSheet('sheet-add-food'); });
document.getElementById('btn-trigger-search')?.addEventListener('click', async () => {
  const queryVal = document.getElementById('food-search').value.trim().toLowerCase(); const c = document.getElementById('food-results-list'); const loader = document.getElementById('food-loading');
  if(!queryVal) return; c.innerHTML = ''; loader.style.display = 'block';
  try {
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(queryVal)}&search_simple=1&action=process&json=1&page_size=15`)}`;
    const res = await fetch(proxyUrl); if (!res.ok) throw new Error('Proxy error'); const proxyData = await res.json(); const data = JSON.parse(proxyData.contents); loader.style.display = 'none'; if(!data.products || data.products.length === 0) throw new Error("Sin resultados"); window.renderizarResultadosBusqueda(data.products, c);
  } catch (error) {
    loader.style.display = 'none'; const resultadosLocales = fallbackDB.filter(p => p.product_name.toLowerCase().includes(queryVal) || p.brands.toLowerCase().includes(queryVal));
    if(resultadosLocales.length > 0) { window.renderizarResultadosBusqueda(resultadosLocales, c); showToast('⚠️ Mostrando local.'); } else { c.innerHTML = `<div style="font-size:12px; color:#ff3366; text-align:center; margin-top:10px;">❌ No encontrado.</div>`; }
  }
});

window.renderizarResultadosBusqueda = function(productos, contenedor) {
  productos.forEach(p => {
    if(!p.nutriments || p.nutriments['energy-kcal_100g'] == null) return;
    const d = document.createElement('div'); d.className = 'search-item'; d.style.cssText = "padding:10px; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer; display:flex; justify-content:space-between; align-items:center;";
    let brand = p.brands ? ` (${p.brands.split(',')[0]})` : ''; let nombre = `${p.product_name || 'Producto'}${brand}`;
    let cal100 = Math.round(p.nutriments['energy-kcal_100g']); let prot100 = Math.round(p.nutriments['proteins_100g'] || 0); let carb100 = Math.round(p.nutriments['carbohydrates_100g'] || 0); let gras100 = Math.round(p.nutriments['fat_100g'] || 0);
    d.innerHTML = `<div style="display:flex; flex-direction:column;"><span>${nombre}</span><span style="font-size:9px; color:var(--text-muted);">P:${prot100}g C:${carb100}g G:${gras100}g</span></div><span style="color:var(--primary); font-weight:800;">${cal100} kcal</span>`;
    d.addEventListener('click', () => { window.currentSearchFoodBase = { cal: cal100, prot: prot100, carb: carb100, gras: gras100 }; document.getElementById('food-selected-name').innerText = nombre; document.getElementById('food-results-list').innerHTML = ''; document.getElementById('edit-qty').value = '100'; document.getElementById('edit-unit').value = '1'; window.recalcularMacros(); document.getElementById('food-custom-section').style.display = 'block'; }); contenedor.appendChild(d);
  });
};

document.getElementById('edit-qty')?.addEventListener('input', () => window.recalcularMacros()); document.getElementById('edit-unit')?.addEventListener('change', () => window.recalcularMacros());
window.recalcularMacros = function() {
  if(window.currentSearchFoodBase) {
    let q = parseFloat(document.getElementById('edit-qty').value) || 0; let m = parseFloat(document.getElementById('edit-unit').value) || 1; let factor = (q * m) / 100;
    document.getElementById('edit-cal').value = Math.round(window.currentSearchFoodBase.cal * factor); document.getElementById('edit-prot').value = Math.round(window.currentSearchFoodBase.prot * factor); document.getElementById('edit-carb').value = Math.round(window.currentSearchFoodBase.carb * factor); document.getElementById('edit-gras').value = Math.round(window.currentSearchFoodBase.gras * factor);
  }
};

document.getElementById('btn-confirm-food-final')?.addEventListener('click', async function() {
  if (this.disabled) return; this.disabled = true; let mt = document.getElementById('food-meal-time').value; let n = document.getElementById('food-selected-name').innerText || "Alimento"; let c = parseInt(document.getElementById('edit-cal').value)||0; let p = parseInt(document.getElementById('edit-prot').value)||0; let cb = parseInt(document.getElementById('edit-carb').value)||0; let g = parseInt(document.getElementById('edit-gras').value)||0; let qtyVal = document.getElementById('edit-qty').value; let unitSelect = document.getElementById('edit-unit'); let unitText = unitSelect.options[unitSelect.selectedIndex].text.split(' ')[0];
  if(!c && !p) { showToast('⚠️ Ingresa cantidad.'); this.disabled = false; return; }
  let nombreFinalRegistro = `${n} (${qtyVal} ${unitText})`; await window.registrarComidaNube(c, p, cb, g, `[${mt}] ${nombreFinalRegistro}`); window.closeSheet(); showToast(`✅ Registrado.`); this.disabled = false;
});


// 9. COMBATE Y ENTRENAMIENTO
let currentWorkoutRoutine = []; let activeTimers = {}; 
document.getElementById('btn-generar-rutina')?.addEventListener('click', () => {
  if(exercisesDB.length === 0) { showToast('⚠️ Sincronizando ejercicios...'); return; }
  const equip = document.getElementById('train-equip')?.value || 'gimnasio'; const focus = document.getElementById('train-focus')?.value || 'fullbody'; currentWorkoutRoutine = [];
  const checkWarm = document.getElementById('check-warmup'); if(checkWarm && checkWarm.checked) { currentWorkoutRoutine.push({ id: 'warmup', nombre: '🔥 Calentamiento', grupo: 'cardio', musculoPrincipal: 'General', equipamiento: ['corporal'], tips: '5 a 10 min de movilidad.', imagen: 'https://dummyimage.com/400x400/111827/ffaa00&text=Calentar', loggedSets: [], isPhase: true }); }
  const getRandomEx = (gReq) => { const v = exercisesDB.filter(ex => ex.grupo?.toLowerCase() === gReq.toLowerCase() && (Array.isArray(ex.equipamiento) ? ex.equipamiento.some(eq => eq.toLowerCase().includes(equip.toLowerCase())) : true)); return v.length > 0 ? v[Math.floor(Math.random() * v.length)] : (exercisesDB.filter(ex => ex.grupo?.toLowerCase() === gReq.toLowerCase())[0] || null); };
  let str = focus === "fullbody" ? ["piernas", "pecho", "espalda", "hombros", "core"] : focus === "superior" ? ["pecho", "espalda", "hombros", "brazos", "core"] : ["piernas", "piernas", "piernas", "core"];
  str.forEach(g => { let ex = getRandomEx(g); if(ex && !currentWorkoutRoutine.find(e => e.id === ex.id)) { ex.loggedSets = []; ex.estimatedCals = Math.floor(Math.random() * 20) + 35; currentWorkoutRoutine.push(ex); } });
  const checkCool = document.getElementById('check-cooldown'); if(checkCool && checkCool.checked) { currentWorkoutRoutine.push({ id: 'cooldown', nombre: '❄️ Enfriamiento', grupo: 'cardio', musculoPrincipal: 'Recup.', equipamiento: ['corporal'], tips: '10 min elongación.', imagen: 'https://dummyimage.com/400x400/111827/00e5ff&text=Enfriar', loggedSets: [], isPhase: true }); }
  if(currentWorkoutRoutine.length === 0) { showToast('⚠️ Error.'); return; }
  window.renderizarRutina(false); document.getElementById('workout-generator-card').style.display = 'none'; document.getElementById('workout-live-container').style.display = 'block'; document.getElementById('btn-start-workout').style.display = 'block'; document.getElementById('btn-finish-workout').style.display = 'none'; showToast('⚔️ Rutina generada.');
});

window.renderizarRutina = function(isLiveMode) {
  const container = document.getElementById('rutina-generada-lista'); if(!container) return; container.innerHTML = '';
  currentWorkoutRoutine.forEach((ex, idx) => {
    const displaySwap = (isLiveMode || ex.isPhase) ? 'none' : 'block'; const displayInputs = isLiveMode ? 'block' : 'none'; const imgSource = ex.imagen && ex.imagen.trim() !== "" ? ex.imagen : `https://dummyimage.com/400x400/111827/00e5ff&text=${encodeURIComponent(ex.nombre)}`; ex.loggedSets = ex.loggedSets || []; 
    let html = `<div class="plan-meal-card workout-card" data-index="${idx}" style="border: 1px solid rgba(0,229,255,0.2); box-shadow: 0 4px 10px rgba(0,0,0,0.3); padding: 15px; border-radius: 12px; margin-bottom:15px; background: #111827;"><div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span style="font-size:15px; font-weight:900; color:#fff; text-transform:uppercase;">${ex.nombre}</span><button class="btn-swap" style="display:${displaySwap}; font-size:10px; padding:4px 8px; border-radius:6px; background:rgba(0,229,255,0.1); color:#00e5ff; border:1px solid #00e5ff;" onclick="window.abrirMenuReemplazoEj(${idx})">🔄 Cambiar</button></div><div style="display:flex; gap:15px; align-items:center;"><img src="${imgSource}" onerror="this.onerror=null; this.src='https://dummyimage.com/400x400/111827/00e5ff';" style="width:75px; height:75px; border-radius:10px; object-fit:cover; border:2px solid rgba(0,229,255,0.4);"><div style="flex:1;"><p style="font-size:11px; color:#00e5ff; margin:0 0 5px 0; font-weight:800; text-transform:uppercase;">🎯 ${ex.musculoPrincipal || 'General'}</p><p style="font-size:12px; color:#9ca3af; margin:0; line-height:1.4;">💡 ${ex.tips || 'Técnica estricta.'}</p></div></div>`;
    if (isLiveMode) {
      let seriesHTML = ex.loggedSets.map((s, i) => `<li style="margin-bottom:8px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.05); font-size:13px; color:#fff;">Serie ${i+1}: <span style="color:#00e5ff; font-weight:900;">${s.reps} ${!ex.isPhase ? `reps x ${s.peso} kg` : `min`}</span></li>`).join('');
      html += `<div class="workout-inputs" style="display:${displayInputs}; background: rgba(0,0,0,0.4); padding: 15px; border-radius: 10px; margin-top:15px; border:1px solid rgba(255,255,255,0.05);"><div style="display:flex; gap:10px; margin-bottom:15px;"><div style="flex:1;"><label style="font-size:10px; color:#9ca3af; font-weight:bold; display:block; margin-bottom:4px;">${ex.isPhase?'MIN':'REPES'}</label><input type="number" id="reps-${idx}" class="neon-input" placeholder="10"></div>${!ex.isPhase ? `<div style="flex:1;"><label style="font-size:10px; color:#9ca3af; font-weight:bold; display:block; margin-bottom:4px;">PESO</label><input type="number" id="peso-${idx}" class="neon-input" placeholder="50"></div>` : ''}<div style="flex:1;"><label style="font-size:10px; color:#9ca3af; font-weight:bold; display:block; margin-bottom:4px;">DESC(s)</label><input type="number" id="descanso-${idx}" class="neon-input" value="90"></div></div><button class="btn btn-primary" style="width:100%;" onclick="window.registrarSerieIndividual(${idx})">✅ Registrar ${ex.isPhase?'Fase':'Serie'}</button><ul id="lista-series-${idx}" style="list-style:none; padding:0; margin:15px 0 0 0;">${seriesHTML}</ul><div id="timer-container-${idx}" style="display:none; text-align:center; background: #1a2130; padding:15px; border-radius:10px; border: 1px dashed #ffaa00; margin-top:15px;"><span style="font-size:24px; font-weight:900; color:#ffaa00; display:block; margin-bottom:5px;">⏱️ <span id="time-left-${idx}">0</span>s</span><button class="btn btn-secondary" style="margin-top:0; border-color:#ff3366; color:#ff3366; width:100%;" onclick="window.terminarDescanso(${idx})">⏹️ Terminar</button></div></div>`;
    }
    html += `</div>`; container.innerHTML += html;
  });
};

let workoutSwapTargetIndex = -1;
window.abrirMenuReemplazoEj = function(index) { workoutSwapTargetIndex = index; const currentEx = currentWorkoutRoutine[index]; const alternativas = exercisesDB.filter(e => e.grupo === currentEx.grupo && e.id !== currentEx.id); const listContainer = document.getElementById('sheet-swap-ex-list'); if(!listContainer) return; listContainer.innerHTML = ''; if(alternativas.length === 0) { listContainer.innerHTML = `<p style="font-size:12px; color:#ff3366;">No hay alternativas.</p>`; } else { alternativas.forEach(alt => { let objData = encodeURIComponent(JSON.stringify(alt)); listContainer.innerHTML += `<div class="swap-option-card" onclick="window.confirmarReemplazoEj('${objData}')" style="background:#1a2130; padding:12px; border-radius:8px; cursor:pointer; margin-bottom:8px;"><span style="font-size:10px; color:#00e5ff; font-weight:800; text-transform:uppercase;">${alt.musculoPrincipal}</span><b style="display:block; color:#fff; margin-top:4px;">${alt.nombre}</b></div>`; }); } window.openSheet('sheet-swap-exercise'); };
window.confirmarReemplazoEj = function(encodedData) { if(workoutSwapTargetIndex > -1) { const newEx = JSON.parse(decodeURIComponent(encodedData)); newEx.loggedSets = []; newEx.estimatedCals = Math.floor(Math.random() * 20) + 35; currentWorkoutRoutine[workoutSwapTargetIndex] = newEx; window.renderizarRutina(false); window.closeSheet(); showToast(`✅ Ejercicio reemplazado.`); } };

window.registrarSerieIndividual = function(idx) { const repsInput = document.getElementById(`reps-${idx}`); const pesoInput = document.getElementById(`peso-${idx}`); const descansoInput = document.getElementById(`descanso-${idx}`); const ex = currentWorkoutRoutine[idx]; const reps = parseInt(repsInput.value); const peso = pesoInput ? (parseFloat(pesoInput.value) || 0) : 0; const descanso = parseInt(descansoInput.value) || 90; if(!reps || reps <= 0) { showToast(`⚠️ Ingresa valor.`); return; } if(!ex.loggedSets) ex.loggedSets = []; ex.loggedSets.push({ reps, peso }); const lista = document.getElementById(`lista-series-${idx}`); lista.innerHTML += `<li style="margin-bottom:8px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.05); font-size:13px; color:#fff;">Serie ${ex.loggedSets.length}: <span style="color:#00e5ff; font-weight:900;">${reps} ${ex.isPhase?'min':`reps x ${peso} kg`}</span></li>`; repsInput.value = ''; window.iniciarDescanso(idx, descanso); };
window.iniciarDescanso = function(idx, segundos) { if(activeTimers[idx]) clearInterval(activeTimers[idx].interval); const container = document.getElementById(`timer-container-${idx}`); const textSpan = document.getElementById(`time-left-${idx}`); container.style.display = 'block'; let timeLeft = segundos; textSpan.innerText = timeLeft; activeTimers[idx] = { interval: setInterval(() => { timeLeft--; if(timeLeft <= 0) { window.terminarDescanso(idx); showToast('⏰ ¡A la batalla!'); } else { textSpan.innerText = timeLeft; } }, 1000) }; };
window.terminarDescanso = function(idx) { if(activeTimers[idx]) { clearInterval(activeTimers[idx].interval); delete activeTimers[idx]; } document.getElementById(`timer-container-${idx}`)?.style.setProperty('display', 'none'); };

document.getElementById('btn-start-workout')?.addEventListener('click', () => { window.renderizarRutina(true); document.getElementById('btn-start-workout').style.display = 'none'; document.getElementById('btn-finish-workout').style.display = 'block'; showToast('🔥 ¡En vivo!'); });
document.getElementById('btn-cancel-workout')?.addEventListener('click', () => { for (let idx in activeTimers) clearInterval(activeTimers[idx].interval); activeTimers = {}; document.getElementById('workout-live-container').style.display = 'none'; document.getElementById('workout-generator-card').style.display = 'block'; currentWorkoutRoutine = []; });
document.getElementById('btn-finish-workout')?.addEventListener('click', async function() { if (this.disabled) return; this.disabled = true; let validExercises = 0; let sessionCals = 0; for(let i = 0; i < currentWorkoutRoutine.length; i++) { const ex = currentWorkoutRoutine[i]; if(ex.loggedSets && ex.loggedSets.length > 0) { const totalSets = ex.loggedSets.length; const detalles = ex.loggedSets.map((s, idx) => `S${idx+1}: ${s.reps}${ex.isPhase?'min':`x${s.peso}kg`}`).join(' | '); const weightHighestOrLast = ex.loggedSets[ex.loggedSets.length - 1].peso; let exCals = 0; if(ex.isPhase) { let totalMins = 0; ex.loggedSets.forEach(s => totalMins += s.reps); exCals = totalMins * 8; } else { ex.loggedSets.forEach(s => { exCals += 15 + (s.peso * s.reps * 0.03); }); } exCals = Math.round(exCals); sessionCals += exCals; await window.registrarEntrenoNube(ex.nombre, `${totalSets} series (${detalles})`, weightHighestOrLast, "N/A", exCals); validExercises++; } } for (let idx in activeTimers) clearInterval(activeTimers[idx].interval); activeTimers = {}; if(validExercises > 0) { sessionCals = Math.round(sessionCals); totalQuemadas += sessionCals; await guardarEstadoNube(); window.actualizarDashboard(); showToast(`✅ Guardado. 🔥 ~${sessionCals} kcal.`); } else { showToast('⚠️ Descartado.'); } document.getElementById('workout-live-container').style.display = 'none'; document.getElementById('workout-generator-card').style.display = 'block'; document.getElementById('btn-start-workout').style.display = 'block'; document.getElementById('btn-finish-workout').style.display = 'none'; currentWorkoutRoutine = []; this.disabled = false; });

window.abrirBuscadorManual = function() {
  const container = document.getElementById('sheet-workout'); if(!container) return;
  container.innerHTML = `<div style="padding: 20px;"><h3 style="color:#00e5ff; font-weight:900; text-transform:uppercase; margin-bottom:15px; text-align:center;">Agregar Ejercicio Manual</h3><div style="position:relative;"><input type="text" id="search-manual-ex" class="neon-input" placeholder="🔍 Buscar nombre o músculo..." autocomplete="off"><div id="search-manual-results" class="search-results-box" style="position:absolute; width:100%;"></div></div><div id="manual-live-ui" style="display:none; margin-top:20px;"><div style="background:#111827; padding:15px; border-radius:10px; border:1px solid rgba(255,255,255,0.05);"><h4 id="manual-selected-name" style="color:#fff; font-weight:900; margin-bottom:15px;">Ejercicio</h4><div style="display:flex; gap:10px; margin-bottom:15px;"><div style="flex:1;"><label style="font-size:10px; color:#9ca3af;">REPES</label><input type="number" id="manual-rep" class="neon-input" style="margin-top:2px;"></div><div style="flex:1;"><label style="font-size:10px; color:#9ca3af;">PESO (KG)</label><input type="number" id="manual-peso" class="neon-input" style="margin-top:2px;"></div><div style="flex:1;"><label style="font-size:10px; color:#9ca3af;">DESC (S)</label><input type="number" id="manual-descanso" class="neon-input" value="90" style="margin-top:2px;"></div></div><button class="btn btn-primary" id="btn-add-manual-set" style="width:100%;">✅ Registrar Serie</button><ul id="manual-sets-list" style="list-style:none; padding:0; margin:15px 0 0 0;"></ul><div id="manual-timer" style="display:none; text-align:center; background:#1a2130; padding:15px; border-radius:10px; border:1px dashed #ffaa00; margin-top:15px;"><span style="font-size:24px; font-weight:900; color:#ffaa00; display:block;">⏱️ <span id="manual-time-left">0</span>s</span><button class="btn btn-secondary" onclick="document.getElementById('manual-timer').style.display='none'; clearInterval(window.manualInterval);" style="width:100%; border-color:#ff3366; color:#ff3366;">⏹️ Terminar</button></div><button class="btn btn-primary" id="btn-save-manual-workout" style="margin-top:20px; width:100%; background:linear-gradient(90deg, #ffaa00, #ff5500); display:none;">💾 GUARDAR EN BITÁCORA</button></div></div></div>`; window.openSheet('sheet-workout');
  const searchInput = document.getElementById('search-manual-ex'); const resultsBox = document.getElementById('search-manual-results'); let selectedExercise = null; let manualSets = [];
  searchInput.addEventListener('input', function() { const queryVal = this.value.toLowerCase(); resultsBox.innerHTML = ''; if(queryVal.length < 2) { resultsBox.style.display = 'none'; return; } const matches = exercisesDB.filter(ex => ex.nombre.toLowerCase().includes(queryVal) || (ex.musculoPrincipal && ex.musculoPrincipal.toLowerCase().includes(queryVal))); if(matches.length > 0) { resultsBox.style.display = 'block'; matches.slice(0, 10).forEach(match => { const div = document.createElement('div'); div.className = 'search-item'; div.innerHTML = `<span>${match.nombre}</span> <span class="search-item-muscle">${match.musculoPrincipal || 'General'}</span>`; div.onclick = () => { selectedExercise = match; manualSets = []; searchInput.value = match.nombre; resultsBox.style.display = 'none'; document.getElementById('manual-live-ui').style.display = 'block'; document.getElementById('manual-selected-name').innerText = match.nombre; document.getElementById('manual-sets-list').innerHTML = ''; document.getElementById('btn-save-manual-workout').style.display = 'none'; }; resultsBox.appendChild(div); }); } else { resultsBox.style.display = 'none'; } });
  document.getElementById('btn-add-manual-set').addEventListener('click', () => { const r = parseInt(document.getElementById('manual-rep').value); const p = parseFloat(document.getElementById('manual-peso').value) || 0; if(!r) return; manualSets.push({reps: r, peso: p}); document.getElementById('manual-sets-list').innerHTML += `<li style="margin-bottom:6px; font-size:13px; color:#fff;">Serie ${manualSets.length}: <span style="color:#00e5ff; font-weight:900;">${r} reps x ${p} kg</span></li>`; document.getElementById('manual-rep').value = ''; document.getElementById('btn-save-manual-workout').style.display = 'block'; const d = parseInt(document.getElementById('manual-descanso').value) || 90; document.getElementById('manual-timer').style.display = 'block'; let timeLeft = d; document.getElementById('manual-time-left').innerText = timeLeft; if(window.manualInterval) clearInterval(window.manualInterval); window.manualInterval = setInterval(() => { timeLeft--; document.getElementById('manual-time-left').innerText = timeLeft; if(timeLeft <= 0) { clearInterval(window.manualInterval); document.getElementById('manual-timer').style.display='none'; showToast('⏰ ¡A la batalla!'); } }, 1000); });
  document.getElementById('btn-save-manual-workout').addEventListener('click', async function() { if(this.disabled) return; this.disabled = true; if(manualSets.length === 0) return; const detalles = manualSets.map((s, idx) => `S${idx+1}: ${s.reps}x${s.peso}kg`).join(' | '); const weightHighestOrLast = manualSets[manualSets.length - 1].peso; let cals = 0; manualSets.forEach(s => { cals += 15 + (s.peso * s.reps * 0.03); }); cals = Math.round(cals); await window.registrarEntrenoNube(selectedExercise.nombre, `${manualSets.length} series (${detalles})`, weightHighestOrLast, "N/A", cals); totalQuemadas += cals; await guardarEstadoNube(); window.actualizarDashboard(); if(window.manualInterval) clearInterval(window.manualInterval); window.closeSheet(); showToast(`✅ Guardado. 🔥 ~${cals} kcal.`); this.disabled = false; });
};
document.getElementById('btn-registrar-serie')?.addEventListener('click', window.abrirBuscadorManual);

// 10. SOCIAL / COFRADÍA
window.cargarModuloSocialCompleto = function() {
  const root = document.getElementById('social-tab-content-root'); if(!root) return;
  root.innerHTML = `<div style="background: #111827; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"><h4 style="font-size: 12px; color: #00e5ff; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 12px;">👥 Reclutar Amigos</h4><div style="display:flex; gap:8px; margin-bottom:12px;"><input type="text" id="input-search-friend" class="neon-input" placeholder="Apodo exacto..." style="font-size:12px; padding:8px 12px;"><button id="btn-search-friend" class="btn btn-primary" style="width:auto; margin-top:0; padding:8px 15px; font-size:12px;">Buscar</button></div><div id="friend-search-result"></div></div><div style="background: #111827; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; margin-bottom: 20px;"><h5 style="font-size: 11px; color: #ffaa00; text-transform: uppercase; font-weight: 800; margin-bottom: 8px;">📩 Solicitudes Pendientes</h5><div id="friend-requests-list" style="font-size:12px; color:#9ca3af;">Buscando solicitudes...</div><h5 style="font-size: 11px; color: #00e5ff; text-transform: uppercase; font-weight: 800; margin: 15px 0 8px 0;">⚔️ Cofradía Conectada</h5><div id="my-friends-list" style="font-size:12px; color:#9ca3af;">No hay amigos.</div></div><div style="background: #111827; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 15px;"><h4 style="font-size: 12px; color: #ffaa00; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 10px;">📰 Muro Privado</h4><div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; margin-bottom: 15px;"><textarea id="social-post-text" class="neon-input" placeholder="Comparte tu progreso..." style="height: 60px; font-size:12px; resize:none;"></textarea><button id="btn-publish-social" class="btn btn-primary" style="padding: 8px; font-size:12px; margin-top:8px;">📢 Publicar</button></div><div id="social-feed-container">Cargando muro...</div></div>`;
  document.getElementById('btn-search-friend')?.addEventListener('click', async () => { const val = document.getElementById('input-search-friend').value.trim().toLowerCase(); const resBox = document.getElementById('friend-search-result'); if(!val) return; resBox.innerHTML = '<p style="font-size:11px; color:#9ca3af;">Rastreando...</p>'; try { const q = query(collection(db, "users"), where("nickname_lower", "==", val)); const snap = await getDocs(q); if(snap.empty) { resBox.innerHTML = '<p style="font-size:11px; color:#ff3366;">❌ No encontrado.</p>'; return; } const friendDocId = snap.docs[0].id; const friendData = snap.docs[0].data(); if(friendDocId === currentUser.uid) { resBox.innerHTML = '<p style="font-size:11px; color:#ffaa00;">⚠️ Eres tú.</p>'; return; } resBox.innerHTML = `<div style="background:rgba(0,229,255,0.05); border:1px solid rgba(0,229,255,0.2); padding:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;"><div><b style="color:#fff; font-size:13px;">${friendData.nickname}</b><br><span style="font-size:10px; color:#ffaa00;">Rango: ${friendData.currentRankName || 'Ashigaru'}</span></div><button id="btn-send-req" class="btn btn-warning" style="width:auto; padding:5px 10px; font-size:11px;">+ Enviar Solicitud</button></div>`; document.getElementById('btn-send-req').onclick = async () => { try { await addDoc(collection(db, "users", friendDocId, "friend_requests"), { fromUid: currentUser.uid, fromNickname: userProfile.nickname, status: "pendiente", timestamp: Date.now() }); showToast("✅ Solicitud enviada."); resBox.innerHTML = ''; } catch(e) { showToast("❌ Error al enviar."); } }; } catch(err) { resBox.innerHTML = '<p style="font-size:11px; color:#ff3366;">Error.</p>'; } });
  document.getElementById('btn-publish-social')?.addEventListener('click', async () => { const txt = document.getElementById('social-post-text').value.trim(); if(!txt) return; try { await addDoc(collection(db, "social_posts"), { uid: currentUser.uid, author: userProfile.nickname, rango: currentRankName, content: txt, timestamp: Date.now() }); document.getElementById('social-post-text').value = ''; showToast("📢 ¡Publicado!"); window.cargarMuroSocialPrivado(); } catch(e) { showToast("❌ Error."); } });
  window.cargarSolicitudesYAmigosSocial(); window.cargarMuroSocialPrivado();
};

window.cargarSolicitudesYAmigosSocial = async function() {
  if(!currentUser || !db) return; const reqContainer = document.getElementById('friend-requests-list'); const friendsContainer = document.getElementById('my-friends-list');
  try {
    const reqSnap = await getDocs(collection(db, "users", currentUser.uid, "friend_requests")); let reqHtml = ''; reqSnap.forEach(d => { let req = d.data(); if(req.status === 'pendiente') { reqHtml += `<div style="background:rgba(255,170,0,0.05); border:1px solid rgba(255,170,0,0.2); padding:8px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;"><span><b>${req.fromNickname}</b> quiere unirse</span><button onclick="window.aceptarSolicitud('${d.id}', '${req.fromUid}', '${req.fromNickname}')" style="background:#00e5ff; border:none; padding:4px 8px; border-radius:4px; font-weight:bold; cursor:pointer; color:#111827;">Aceptar</button></div>`; } }); if(reqContainer) reqContainer.innerHTML = reqHtml || 'No hay solicitudes pendientes.';
    const friendsSnap = await getDocs(collection(db, "users", currentUser.uid, "friends")); let friendHtml = ''; friendsSnap.forEach(d => { let f = d.data(); friendHtml += `<div style="background:rgba(0,229,255,0.05); border:1px solid rgba(0,229,255,0.2); padding:8px; border-radius:6px; margin-bottom:5px; display:flex; justify-content:space-between; align-items:center;"><span>⚔️ <b>${f.friendNickname}</b></span><div style="display:flex; gap:5px;"><button onclick="window.verPerfilAmigoCompleto('${f.friendUid}')" style="background:transparent; color:#00e5ff; border:1px solid #00e5ff; padding:3px 6px; border-radius:4px; font-size:10px; cursor:pointer;">Expediente</button><button onclick="window.eliminarAmigo('${d.id}', '${f.friendUid}')" style="background:rgba(255,51,102,0.1); color:#ff3366; border:1px solid #ff3366; padding:3px 6px; border-radius:4px; font-size:10px; cursor:pointer;">Eliminar</button></div></div>`; }); if(friendsContainer) friendsContainer.innerHTML = friendHtml || 'Aún no tienes amigos en la cofradía.';
  } catch(e) { console.error(e); }
};

window.cargarMuroSocialPrivado = async function() {
  const feedContainer = document.getElementById('social-feed-container'); if(!feedContainer || !db) return;
  try {
    const friendsSnap = await getDocs(collection(db, "users", currentUser.uid, "friends")); let allowedUids = [currentUser.uid]; friendsSnap.forEach(f => allowedUids.push(f.data().friendUid));
    const q = query(collection(db, "social_posts"), orderBy("timestamp", "desc"), limit(30)); const snaps = await getDocs(q); let html = '';
    snaps.forEach(d => { let post = d.data(); if(allowedUids.includes(post.uid)) { html += `<div class="social-post-card"><div class="social-post-header"><img class="social-post-avatar" src="${generarAvatarPorRango(post.author, post.rango || 'Ashigaru')}"><div><b style="color:#fff; font-size:13px;">${post.author}</b><br><span style="font-size:9px; color:#ffaa00;">${post.rango || 'Guerrero'} • ${new Date(post.timestamp).toLocaleDateString()}</span></div></div><div class="social-post-body">${post.content}</div></div>`; } }); feedContainer.innerHTML = html || '<p style="font-size:12px; color:#9ca3af; text-align:center;">El muro privado está silencioso. ¡Publica algo!</p>';
  } catch(e) { feedContainer.innerHTML = '<p style="font-size:12px; color:#ff3366;">Error cargando muro privado.</p>'; }
};

window.aceptarSolicitud = async function(reqDocId, fromUid, fromNickname) { const friendsRef = collection(db, "users", currentUser.uid, "friends"); const checkDup = await getDocs(query(friendsRef, where("friendUid", "==", fromUid))); if(checkDup.empty) { await addDoc(friendsRef, { friendUid: fromUid, friendNickname: fromNickname, timestamp: Date.now() }); await addDoc(collection(db, "users", fromUid, "friends"), { friendUid: currentUser.uid, friendNickname: userProfile.nickname, timestamp: Date.now() }); } await deleteDoc(doc(db, "users", currentUser.uid, "friend_requests", reqDocId)); showToast(`⚔️ ¡Ahora ${fromNickname} es de tu cofradía!`); window.cargarSolicitudesYAmigosSocial(); window.cargarMuroSocialPrivado(); };
window.eliminarAmigo = async function(friendDocId, friendUid) { if(!confirm("¿Estás seguro de eliminar a este guerrero?")) return; await deleteDoc(doc(db, "users", currentUser.uid, "friends", friendDocId)); const reciprocalQuery = query(collection(db, "users", friendUid, "friends"), where("friendUid", "==", currentUser.uid)); const recSnap = await getDocs(reciprocalQuery); recSnap.forEach(async (rDoc) => { await deleteDoc(rDoc.ref); }); showToast("🗑️ Amistad eliminada."); window.cargarSolicitudesYAmigosSocial(); window.cargarMuroSocialPrivado(); };
window.verPerfilAmigoCompleto = async function(friendUid) { const docSnap = await getDoc(doc(db, "users", friendUid)); if(!docSnap.exists()) { showToast("⚠️ No encontrado."); return; } const data = docSnap.data(); const workoutsSnap = await getDocs(query(collection(db, "users", friendUid, "history"), orderBy("timestamp", "desc"), limit(5))); let workoutsHtml = ''; workoutsSnap.forEach(w => { let item = w.data(); workoutsHtml += `<div style="font-size:11px; color:#00e5ff; margin-bottom:4px;">• ${item.nombre}: ${item.detalle} (${item.date})</div>`; }); const container = document.getElementById('sheet-workout'); if(!container) return; container.innerHTML = `<div style="padding:20px; text-align:center;"><img src="${generarAvatarPorRango(data.nickname, data.currentRankName || 'Ashigaru')}" style="width:70px; height:70px; border-radius:50%; border:2px solid #00e5ff; margin-bottom:10px;"><h3 style="color:#fff; font-weight:900; text-transform:uppercase;">${data.nickname}</h3><p style="color:#ffaa00; font-size:12px; font-weight:bold; margin-bottom:15px;">Rango: ${data.currentRankName || 'Ashigaru'}</p><div style="background:#111827; padding:12px; border-radius:8px; text-align:left; font-size:12px; color:#9ca3af; margin-bottom:15px;"><p><b>Peso Actual:</b> ${data.peso || '--'} kg</p><p><b>Altura:</b> ${data.altura || '--'} cm</p><p><b>Meta:</b> ${data.metaObj === 300 ? 'Volumen' : 'Definición / Mantenimiento'}</p></div><div style="background:#1a2130; padding:12px; border-radius:8px; text-align:left; max-height:150px; overflow-y:auto; margin-bottom:15px;"><b style="color:#ffaa00; font-size:11px; text-transform:uppercase; display:block; margin-bottom:6px;">🏋️ Últimas Actividades</b>${workoutsHtml || '<span style="font-size:11px; color:#9ca3af;">Sin actividad reciente.</span>'}</div><button class="btn btn-primary" style="width:100%;" onclick="window.closeSheet()">Cerrar Expediente</button></div>`; window.openSheet('sheet-workout'); };

// 11. REGISTROS DIARIOS GLOBALES Y LEADERBOARD
window.registrarComidaNube = async function(cal, prot, carb, gras, nombreDisplay) { totalCalorias += cal; totalProt += prot; totalCarb += carb; totalGrasa += gras; await guardarEstadoNube(); window.actualizarDashboard(); let docId = null; if(currentUser && db) { const d = await addDoc(collection(db, "users", currentUser.uid, "days", getTodayKey(), "meals"), { nombre: nombreDisplay, cal, prot, carb, gras, timestamp: Date.now() }); docId = d.id; await addDoc(collection(db, "users", currentUser.uid, "history"), { tipo: 'comida', nombre: nombreDisplay, detalle: `🔥 ${cal} kcal | P:${prot}g C:${carb}g G:${gras}g`, date: getTodayKey(), timestamp: Date.now() }); } window.cargarRegistrosDelDia(currentUser?.uid); if(currentUser) window.cargarHistorialYCheckins(currentUser.uid); document.querySelector('[data-target="page-dashboard"]')?.click(); };
window.registrarEntrenoNube = async function(nombre, sets, weight, rpe, cals = 0) { let docId = null; if(currentUser && db) { const d = await addDoc(collection(db, "users", currentUser.uid, "days", getTodayKey(), "workouts"), { nombre, sets, weight, rpe, cals, timestamp: Date.now() }); docId = d.id; await addDoc(collection(db, "users", currentUser.uid, "history"), { tipo: 'entreno', nombre: nombre.toUpperCase(), detalle: `${sets} | 🔥 ${cals} kcal`, date: getTodayKey(), timestamp: Date.now() }); } window.cargarRegistrosDelDia(currentUser?.uid); if(currentUser) window.cargarHistorialYCheckins(currentUser.uid); };

window.cargarLeaderboard = async function() { const container = document.getElementById('leaderboard-list'); if(!container || !db) return; container.innerHTML = `<p style="font-size: 12px; color: #9ca3af; text-align: center;">Cargando guerreros...</p>`; try { const q = query(collection(db, "leaderboard"), orderBy("multiplicador", "desc"), limit(20)); const snapshot = await getDocs(q); if(snapshot.empty) { container.innerHTML = `<p style="font-size: 12px; color: #9ca3af; text-align: center;">El dojo está vacío.</p>`; return; } let html = "", pos = 1; snapshot.forEach(docSnap => { const d = docSnap.data(); const topClass = pos===1?"top-1":pos===2?"top-2":pos===3?"top-3":""; const medal = pos===1?"🥇":pos===2?"🥈":pos===3?"🥉":`#${pos}`; html += `<div class="leaderboard-item ${topClass}"><div class="lb-rank-num">${medal}</div><div class="lb-user-info"><img class="lb-avatar" src="${generarAvatarPorRango(d.nombre, d.rango)}"><div><span class="lb-name">${d.nombre}</span><span class="lb-badge" style="color: ${d.colorRango};">${d.rango}</span></div></div><div class="lb-score"><span class="lb-multiplier">${d.multiplicador}x</span><span class="lb-kg">${d.totalKg} kg</span></div></div>`; pos++; }); container.innerHTML = html; } catch(e) { container.innerHTML = `<p style="font-size: 12px; color: #ff3366; text-align: center;">Error al cargar.</p>`; } };
document.getElementById('btn-refresh-leaderboard')?.addEventListener('click', window.cargarLeaderboard);

// 12. CHAT IA Y SERVICE WORKER
document.getElementById('btn-send-chat')?.addEventListener('click', enviarMensajeShogun); document.getElementById('chat-input-text')?.addEventListener('keypress', e => { if(e.key === 'Enter') enviarMensajeShogun(); });
function enviarMensajeShogun() { const inp = document.getElementById('chat-input-text'); const txt = inp?.value.trim(); if(!txt) return; const box = document.getElementById('chat-messages'); if(!box) return; box.innerHTML += `<div class="chat-msg user" style="text-align:right; margin-bottom:10px;"><span style="background:var(--primary); color:#000; padding:8px 12px; border-radius:12px; display:inline-block;">${txt}</span></div>`; inp.value = ''; box.scrollTop = box.scrollHeight; setTimeout(() => { box.innerHTML += `<div class="chat-msg ai" style="text-align:left; margin-bottom:10px;"><span style="background:rgba(0,229,255,0.1); color:#fff; padding:8px 12px; border-radius:12px; border-left:3px solid var(--primary); display:inline-block;">"La disciplina vence a la motivación. Céntrate en tus macros."</span></div>`; box.scrollTop = box.scrollHeight; }, 800); }

if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(console.log); }); }
