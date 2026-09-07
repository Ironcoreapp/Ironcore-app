// ============================================================================
// --- IRONCORE MAIN ENGINE (PRE-ALFA TESTNET - HIGH-END UI & BLINDADO) ---
// ============================================================================

// 1. INYECCIÓN CSS AVANZADA (GLASSMORPHISM, NEON & LOGO FIX)
const customCSS = `
  /* Fix del Logo Negro */
  .logo-img, img[src*="logo"] { mix-blend-mode: screen; filter: drop-shadow(0 0 8px rgba(0, 229, 255, 0.4)); }

  /* Estética Glassmorphism Premium */
  header, .top-header, #main-header { display: flex !important; flex-direction: row !important; align-items: center !important; justify-content: space-between !important; padding: 10px 20px !important; background: rgba(10, 15, 25, 0.85) !important; backdrop-filter: blur(12px) !important; border-bottom: 1px solid rgba(0,229,255,0.2) !important; position: sticky; top: 0; z-index: 1000; box-shadow: 0 4px 30px rgba(0,0,0,0.8); }
  header img[src*="logo"], .top-header img[src*="logo"] { height: 40px !important; width: auto !important; margin: 0 !important; }
  
  .card, .stat-panel, .plan-meal-card, .workout-card, .social-post-card, .history-day, .bottom-sheet { 
    background: rgba(17, 24, 39, 0.7) !important; 
    backdrop-filter: blur(16px) !important; 
    -webkit-backdrop-filter: blur(16px) !important;
    border: 1px solid rgba(0, 229, 255, 0.15) !important; 
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37) !important; 
    border-radius: 16px !important; 
  }
  
  #user-welcome-box { display: flex; flex-direction: row !important; align-items: center !important; gap: 10px !important; margin: 0 !important; text-align: right; }
  #user-welcome-box img#user-avatar { width: 40px !important; height: 40px !important; border-radius: 50%; border: 2px solid #00e5ff; background:#1a2130; object-fit:cover; box-shadow: 0 0 10px rgba(0,229,255,0.5); }
  .user-badges-row { display: flex; gap: 8px; flex-direction: row; margin-top: 3px; justify-content: flex-end; }
  .user-badge-mini { background: rgba(0,0,0,0.5); border: 1px solid rgba(0,229,255,0.2); padding: 3px 6px; border-radius: 6px; font-size: 9px; font-weight: bold; color: #fff; }

  #dashboard-tab .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 15px; }
  .stat-panel-full { grid-column: span 2; }
  .stat-title { font-size: 10px; color: #9ca3af; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
  .stat-value { font-size: 24px; font-weight: 900; color: #fff; }
  
  /* Botones High-End */
  .iron-btn-primary { width: 100%; padding: 14px; margin-top: 12px; background: linear-gradient(135deg, #00e5ff 0%, #007acc 100%); color: #fff; font-size: 14px; font-weight: 900; border: none; border-radius: 10px; box-shadow: 0 4px 20px rgba(0,229,255,0.4); text-transform: uppercase; cursor: pointer; letter-spacing: 1px; transition: all 0.3s ease; }
  .iron-btn-primary:active { transform: scale(0.96); box-shadow: 0 2px 10px rgba(0,229,255,0.3); }
  .iron-btn-warning { width: 100%; padding: 14px; background: linear-gradient(135deg, #ffaa00 0%, #e65c00 100%); color: #fff; font-size: 14px; font-weight: 900; border: none; border-radius: 10px; box-shadow: 0 4px 20px rgba(255,170,0,0.4); text-transform: uppercase; cursor: pointer; transition: all 0.3s ease; }
  .iron-btn-danger { width: 100%; padding: 12px; margin-top: 15px; background: rgba(255, 51, 102, 0.1); color: #ff3366; border: 1px solid #ff3366; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: all 0.3s ease; }
  
  .iron-input-modern { width: 100%; padding: 12px; background: rgba(0,0,0,0.5); border: 1px solid rgba(0,229,255,0.3); border-radius: 8px; color: #fff; font-weight: bold; font-size: 14px; box-sizing: border-box; transition: all 0.3s; color-scheme: dark; }
  .iron-input-modern:focus { outline: none; border-color: #00e5ff; box-shadow: 0 0 12px rgba(0,229,255,0.5); background: rgba(0,0,0,0.7); }
  
  .search-results-box { max-height: 200px; overflow-y: auto; background: rgba(17,24,39,0.95); backdrop-filter:blur(10px); border: 1px solid #00e5ff; border-radius: 8px; margin-top: 5px; position: absolute; width: calc(100% - 40px); z-index: 100; display: none; box-shadow: 0 10px 30px rgba(0,0,0,0.8); }
  .search-item { padding: 12px 15px; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; font-size: 13px; color: #fff; display: flex; justify-content: space-between; align-items: center; transition: background 0.2s; }
  .search-item:hover { background: rgba(0,229,255,0.15); }

  .history-day-header { padding: 15px; background: linear-gradient(90deg, rgba(0,229,255,0.15) 0%, transparent 100%); font-weight: 800; color: #00e5ff; display: flex; justify-content: space-between; cursor: pointer; font-size: 14px; border-radius:16px 16px 0 0; }
  
  .iron-welcome-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10, 15, 25, 0.85); z-index: 9999; display: flex; justify-content: center; align-items: center; opacity: 0; pointer-events: none; transition: opacity 0.4s ease; backdrop-filter: blur(10px); }
  .iron-welcome-overlay.active { opacity: 1; pointer-events: auto; }
  .iron-welcome-modal { background: linear-gradient(145deg, rgba(17,24,39,0.9), rgba(26,33,48,0.9)); border: 1px solid #00e5ff; box-shadow: 0 10px 50px rgba(0, 229, 255, 0.2); padding: 35px 25px; border-radius: 20px; text-align: center; max-width: 90%; width: 380px; transform: translateY(30px); transition: transform 0.4s ease; }
  .iron-welcome-overlay.active .iron-welcome-modal { transform: translateY(0); }
  
  .macro-progress-container { width: 100%; height: 8px; background: rgba(0,0,0,0.5); border-radius: 4px; margin-top: 8px; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.5); }
  .macro-progress-fill { height: 100%; border-radius: 4px; transition: width 0.8s cubic-bezier(0.1, 1, 0.1, 1); }

  .social-post-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
  .social-post-avatar { width: 40px; height: 40px; border-radius: 50%; border: 2px solid #00e5ff; background:#1a2130; box-shadow: 0 0 10px rgba(0,229,255,0.3);}
  .social-post-body { font-size: 13.5px; color: #f3f4f6; line-height: 1.6; margin-bottom: 10px; padding: 10px; background: rgba(0,0,0,0.2); border-radius:8px; }
  
  .energy-ring { width: 170px; height: 170px; border-radius: 50%; background: conic-gradient(var(--primary) var(--pct), rgba(255,255,255,0.05) 0deg); display: flex; align-items: center; justify-content: center; margin: 0 auto 25px auto; position: relative; box-shadow: 0 0 30px rgba(0,229,255,0.15); }
  .energy-ring::before { content: ""; position: absolute; width: 146px; height: 146px; background: #111827; border-radius: 50%; box-shadow: inset 0 6px 15px rgba(0,0,0,0.8); }
  .energy-ring-content { position: relative; z-index: 1; text-align: center; }
`;
document.head.appendChild(Object.assign(document.createElement('style'), {innerHTML: customCSS}));

// --- NAVEGACIÓN ---
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.page').forEach(p => { p.classList.remove('active'); p.style.display = 'none'; });
    btn.classList.add('active');
    const tgt = document.getElementById(btn.getAttribute('data-target'));
    if(tgt) { tgt.classList.add('active'); tgt.style.display = 'block'; }
    if(btn.getAttribute('data-target') === 'page-social' && typeof window.cargarModuloSocialCompleto === 'function') window.cargarModuloSocialCompleto();
  });
});

function setupTabs(btnClass, subTabClass) { 
  document.querySelectorAll(`.${btnClass}`).forEach(btn => { 
    btn.addEventListener('click', () => { 
      document.querySelectorAll(`.${btnClass}`).forEach(t => t.classList.remove('active')); 
      document.querySelectorAll(`.${subTabClass}`).forEach(s => s.style.display = 'none'); 
      btn.classList.add('active'); const tgt = document.getElementById(btn.getAttribute('data-tab')); 
      if(tgt) tgt.style.display = 'block'; 
      if(btn.getAttribute('data-tab') === 'tab-leaderboard' && typeof window.cargarLeaderboard === 'function') window.cargarLeaderboard(); 
    }); 
  }); 
} 
setupTabs('tab-btn-diet', 'sub-tab-diet'); setupTabs('tab-btn-train', 'sub-tab-train');

const overlay = document.getElementById('sheet-overlay');
window.openSheet = function(sheetId) { const activeSheet = document.getElementById(sheetId); if(overlay) overlay.style.display = 'block'; if(activeSheet) { activeSheet.classList.add('open'); setTimeout(() => activeSheet.style.bottom = '0', 10); window.currentActiveSheet = activeSheet; } };
window.closeSheet = function() { if(window.currentActiveSheet) { window.currentActiveSheet.style.bottom = '-100%'; setTimeout(() => { window.currentActiveSheet.classList.remove('open'); if(overlay) overlay.style.display = 'none'; }, 300); } };
if(overlay) overlay.addEventListener('click', window.closeSheet);
document.querySelectorAll('.custom-select').forEach(sel => { sel.addEventListener('click', () => { window.activeSelect = sel; window.openSheet(sel.id.replace('select-', 'sheet-')); }); });
document.querySelectorAll('.sheet-option').forEach(opt => { opt.addEventListener('click', function() { if(this.parentElement.id !== 'sheet-actividad') { this.parentElement.querySelectorAll('.sheet-option').forEach(o => o.classList.remove('active')); this.classList.add('active'); if(window.activeSelect) { window.activeSelect.innerText = this.innerText; window.activeSelect.setAttribute('data-val', this.getAttribute('data-val')); } window.closeSheet(); } else { window.closeSheet(); } }); });

// LIMPIEZA Y PRE-ALFA
document.querySelectorAll('span, p, div, h1, h2, h3, h4, h5, h6').forEach(el => { if(el.childNodes.length === 1 && el.innerText && el.innerText.toUpperCase().includes('ELITE PERFORMANCE SYSTEM')) el.style.display = 'none'; });
const rankElem = document.getElementById('header-rank'); const streakElem = document.getElementById('header-streak');
if(rankElem && streakElem) { rankElem.parentElement.classList.add('user-badges-row'); rankElem.classList.add('user-badge-mini'); streakElem.classList.add('user-badge-mini'); }
const genBtn = document.getElementById('btn-generar-rutina');
if(genBtn && !document.getElementById('check-warmup')) {
  const fasesDiv = document.createElement('div');
  fasesDiv.innerHTML = `<div style="display:flex; justify-content:space-between; margin-bottom:15px; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);"><label style="color:#ffaa00; font-size:12px; font-weight:800; display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="check-warmup" checked style="accent-color:#ffaa00; width:16px; height:16px;"> 🔥 Calentamiento</label><label style="color:#00e5ff; font-size:12px; font-weight:800; display:flex; align-items:center; gap:8px; cursor:pointer;"><input type="checkbox" id="check-cooldown" checked style="accent-color:#00e5ff; width:16px; height:16px;"> ❄️ Enfriamiento</label></div>`;
  genBtn.parentNode.insertBefore(fasesDiv, genBtn);
}

// --- FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy, limit, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = { apiKey: "AIzaSyAK3QRT5FOqe9q-hxI3NWtTvZT2uGGLCTU", authDomain: "ironcoreapp-66a12.firebaseapp.com", projectId: "ironcoreapp-66a12", storageBucket: "ironcoreapp-66a12.firebasestorage.app", messagingSenderId: "673931910641", appId: "1:673931910641:web:eb3d5a830cbcd31fc6f850" };
const app = initializeApp(firebaseConfig); const auth = getAuth(app); const db = getFirestore(app); let currentUser = null;

let totalCalorias = 0, totalProt = 0, totalCarb = 0, totalGrasa = 0, totalAgua = 0, totalQuemadas = 0, userStreak = 1;
let metaCalorias = 2500, metaProt = 165, metaCarb = 275, metaGrasa = 69;
let currentRankName = "Ashigaru";
let userProfile = { perfilCompleto: false, nickname: "", genero: "M", edad: 25, peso: 75, altura: 175, metaObj: 0, actividad: 1.55, avatarStyle: "bottts" };

window.getTodayKey = function() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };
window.showToast = function(msg) { const toast = document.getElementById('toast-notif'); if(!toast) return; toast.innerHTML = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3500); };

// CITAS REALES MOTIVACIONALES
const oraculoQuotes = [
  "No te detengas cuando estés cansado, detente cuando hayas terminado. - David Goggins",
  "La fuerza no viene de la capacidad física. Viene de una voluntad indomable. - Mahatma Gandhi",
  "El dolor que sientes hoy será la fuerza que sentirás mañana. - Arnold Schwarzenegger",
  "No hay nada fuera de ti que pueda hacerte más fuerte. Todo está dentro. - Miyamoto Musashi",
  "El guerrero victorioso gana primero y luego va a la guerra. - Sun Tzu",
  "El éxito no es definitivo, el fracaso no es fatal: es el valor de continuar lo que cuenta. - Winston Churchill"
];
function mostrarMensajeMotivacional() {
  if (sessionStorage.getItem('ironcore_welcome_shown')) return; 
  const overlay = document.createElement('div'); overlay.className = 'iron-welcome-overlay';
  overlay.innerHTML = `<div class="iron-welcome-modal"><div style="font-size: 18px; font-weight: 900; color: #fff; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px;">⚔️ LA JORNADA COMIENZA</div><div style="font-size: 14px; color: #00e5ff; font-style: italic; margin-bottom: 25px; line-height: 1.6; font-weight:bold;">"${oraculoQuotes[Math.floor(Math.random() * oraculoQuotes.length)]}"</div><button class="iron-btn-warning" style="width: 100%; margin-top:10px;" onclick="this.parentElement.parentElement.classList.remove('active'); setTimeout(() => this.parentElement.parentElement.remove(), 400);">Entendido</button></div>`;
  document.body.appendChild(overlay); setTimeout(() => overlay.classList.add('active'), 100); sessionStorage.setItem('ironcore_welcome_shown', 'true');
}

// Autenticación
const authScreen = document.getElementById('auth-screen');
getRedirectResult(auth).then((result) => { if (result && result.user) window.showToast('⚔️ ¡Acceso autorizado!'); }).catch(console.error);
document.getElementById('btn-google-login')?.addEventListener('click', async () => { window.showToast('🔄 Conectando...'); const provider = new GoogleAuthProvider(); provider.setCustomParameters({ prompt: 'select_account' }); try { await signInWithPopup(auth, provider); window.showToast('⚔️ ¡Acceso autorizado!'); } catch(error) { await signInWithRedirect(auth, provider); } });
window.cerrarSesionApp = function() { sessionStorage.removeItem('ironcore_welcome_shown'); signOut(auth); };
document.getElementById('btn-logout')?.addEventListener('click', window.cerrarSesionApp);

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user; if(authScreen) authScreen.style.display = 'none'; 
    const nickElem = document.getElementById('ob-nickname'); if(nickElem) nickElem.value = (user.displayName || "Guerrero").split(' ')[0]; 
    await window.cargarDatosDesdeNube(user.uid); mostrarMensajeMotivacional(); window.iniciarNotificacionesEnVivo(user.uid);
  } else { currentUser = null; if(authScreen) authScreen.style.display = 'flex'; const wb = document.getElementById('user-welcome-box'); if(wb) wb.style.display = 'none'; }
});

const avatarStylesList = ['bottts', 'avataaars', 'adventurer', 'micah', 'pixel-art'];
window.generarAvatarPorRango = function(nickname, rango, style="bottts") { let bg = "111827"; if(rango === "Rōnin") bg = "ffaa00"; if(rango === "Samurái") bg = "ff3366"; if(rango === "Daimyō") bg = "9933ff"; if(rango === "IRON SHŌGUN") bg = "00e5ff"; return `https://api.dicebear.com/7.x/${style}/svg?seed=${nickname}-${rango}&backgroundColor=${bg}`; };
window.cambiarEstiloAvatar = async function() {
  let idx = avatarStylesList.indexOf(userProfile.avatarStyle || 'bottts'); userProfile.avatarStyle = avatarStylesList[(idx + 1) % avatarStylesList.length];
  await window.guardarEstadoNube(); window.actualizarUIHeader(); window.actualizarUIPerfil(); window.showToast("🎲 Estilo de Avatar actualizado.");
};

// --- ONBOARDING ---
window.abrirOnboarding = function(isEdit = false) { 
  const obScreen = document.getElementById('onboarding-screen'); const obTrack = document.getElementById('ob-track'); const obBar = document.getElementById('ob-bar');
  if(!obScreen) return; obScreen.style.display = 'flex'; window.currentObStep = 0; if(obTrack) obTrack.style.transform = `translateX(0%)`; if(obBar) obBar.style.width = '33.33%'; 
  if(isEdit) { document.getElementById('ob-title').innerText = "Editar Credencial"; document.getElementById('ob-nickname').value = userProfile.nickname; window.seleccionarGenero(userProfile.genero); document.getElementById('ob-edad').value = userProfile.edad; document.getElementById('ob-peso').value = userProfile.peso; document.getElementById('ob-altura').value = userProfile.altura; } 
  else { document.getElementById('ob-title').innerText = "Ritual de Iniciación"; } 
};
window.moverOnboarding = function(dir) { 
  const obTrack = document.getElementById('ob-track'); const obBar = document.getElementById('ob-bar');
  if(dir === 1 && window.currentObStep === 0) { const nickVal = document.getElementById('ob-nickname')?.value.trim(); if(!nickVal) { window.showToast('⚠️ Elige un apodo.'); return; } } 
  window.currentObStep += dir; if(window.currentObStep < 0) window.currentObStep = 0; if(window.currentObStep > 2) window.currentObStep = 2; 
  if(obTrack) obTrack.style.transform = `translateX(-${window.currentObStep * 33.333}%)`; if(obBar) obBar.style.width = `${(window.currentObStep + 1) * 33.33}%`; 
};
window.seleccionarGenero = function(gen) { userProfile.genero = gen; document.querySelectorAll('.ob-gender-btn').forEach(b => { if(b.getAttribute('data-gen') === gen) b.classList.add('active'); else b.classList.remove('active'); }); };
window.seleccionarMetaOb = function(elem) { document.querySelectorAll('.ob-goal-card').forEach(c => c.classList.remove('active')); elem.classList.add('active'); userProfile.metaObj = parseInt(elem.getAttribute('data-val')); };
window.finalizarOnboarding = async function() {
  const nickInput = document.getElementById('ob-nickname'); const desiredNick = nickInput?.value.trim().toLowerCase() || "guerrero";
  if (currentUser && db) { const q = query(collection(db, "users"), where("nickname_lower", "==", desiredNick)); const snap = await getDocs(q); if (!snap.empty && snap.docs[0].id !== currentUser.uid) { window.showToast("⚠️ Ese apodo ya está en uso. Elige otro."); return; } }
  userProfile.nickname = nickInput?.value.trim() || "Guerrero"; userProfile.nickname_lower = desiredNick; userProfile.edad = parseInt(document.getElementById('ob-edad')?.value) || 25; userProfile.peso = parseFloat(document.getElementById('ob-peso')?.value) || 75; userProfile.altura = parseInt(document.getElementById('ob-altura')?.value) || 175; userProfile.actividad = parseFloat(document.getElementById('select-actividad')?.getAttribute('data-val')) || 1.55; userProfile.perfilCompleto = true;
  let tmb = userProfile.genero === 'M' ? (10 * userProfile.peso) + (6.25 * userProfile.altura) - (5 * userProfile.edad) + 5 : (10 * userProfile.peso) + (6.25 * userProfile.altura) - (5 * userProfile.edad) - 161; let tdee = tmb * userProfile.actividad;
  metaCalorias = Math.round(tdee + (userProfile.metaObj || 0)); metaProt = (userProfile.metaObj || 0) > 0 ? Math.round(userProfile.peso * 2.0) : Math.round(userProfile.peso * 2.2); metaGrasa = Math.round((metaCalorias * 0.25) / 9); metaCarb = Math.round((metaCalorias - ((metaProt * 4) + (metaGrasa * 9))) / 4);
  await window.guardarEstadoNube(); window.actualizarUIHeader(); window.actualizarUIPerfil(); window.actualizarDashboard(); const obScreen = document.getElementById('onboarding-screen'); if(obScreen) obScreen.style.display = 'none'; window.showToast(`✅ Credencial Sincronizada`); document.querySelector('[data-target="page-dashboard"]')?.click();
};

window.guardarEstadoNube = async function() { if(!currentUser || !db) return; try { await setDoc(doc(db, "users", currentUser.uid), { calorias: totalCalorias, proteina: totalProt, carbos: totalCarb, grasa: totalGrasa, agua: totalAgua, quemadas: totalQuemadas, metaCal: metaCalorias, metaProt: metaProt, metaCarb: metaCarb, metaGrasa: metaGrasa, streak: userStreak, ultimaFecha: localStorage.getItem('ic_ultima_fecha'), currentRankName, ...userProfile }, { merge: true }); } catch(e) { console.error(e); } };
window.cargarDatosDesdeNube = async function(uid) { 
  if(!db) return; const docSnap = await getDoc(doc(db, "users", uid)); 
  if (docSnap.exists()) { const d = docSnap.data(); totalCalorias = d.calorias || 0; totalProt = d.proteina || 0; totalCarb = d.carbos || 0; totalGrasa = d.grasa || 0; totalAgua = d.agua || 0; totalQuemadas = d.quemadas || 0; metaCalorias = d.metaCal || 2500; metaProt = d.metaProt || 165; metaCarb = d.metaCarb || 275; metaGrasa = d.metaGrasa || 69; userStreak = d.streak || 1; userProfile.perfilCompleto = d.perfilCompleto || false; userProfile.nickname = d.nickname || ""; userProfile.genero = d.genero || "M"; userProfile.edad = d.edad || 25; userProfile.peso = d.peso || 75; userProfile.altura = d.altura || 175; userProfile.metaObj = d.metaObj !== undefined ? d.metaObj : 0; userProfile.actividad = d.actividad || 1.55; currentRankName = d.currentRankName || "Ashigaru"; userProfile.avatarStyle = d.avatarStyle || "bottts"; if(!d.nickname_lower && userProfile.nickname) { userProfile.nickname_lower = userProfile.nickname.toLowerCase(); window.guardarEstadoNube(); } } 
  if(!userProfile.perfilCompleto) { window.abrirOnboarding(false); } else { window.actualizarUIHeader(); window.actualizarUIPerfil(); } 
  window.verificarCambioDeDia(); window.actualizarDashboard(); window.actualizarAguaUI(); await window.cargarRegistrosDelDia(uid); await window.cargarHistorialYCheckins(uid); 
};

window.actualizarUIHeader = function() { const dn = document.getElementById('user-display-name'); if(dn) dn.innerText = userProfile.nickname.toUpperCase(); const avatarHeader = document.getElementById('user-avatar'); if(avatarHeader) { avatarHeader.src = window.generarAvatarPorRango(userProfile.nickname, currentRankName, userProfile.avatarStyle); avatarHeader.style.display = 'inline-block'; } const wb = document.getElementById('user-welcome-box'); if(wb) wb.style.display = 'flex'; };

// --- MEJORA DEL PERFIL ---
window.actualizarUIPerfil = function() { 
  const cn = document.getElementById('profile-card-name'); if(cn) cn.innerText = userProfile.nickname.toUpperCase(); 
  const vp = document.getElementById('profile-val-peso'); if(vp) vp.innerText = `${userProfile.peso} kg`; 
  const va = document.getElementById('profile-val-altura'); if(va) va.innerText = `${userProfile.altura} cm`; 
  const ve = document.getElementById('profile-val-edad'); if(ve) ve.innerText = `${userProfile.edad} años`; 
  const vg = document.getElementById('profile-val-genero'); if(vg) vg.innerText = userProfile.genero === 'M' ? 'Hombre' : 'Mujer'; 
  
  let labelMeta = userProfile.metaObj === -500 ? "Déficit Agresivo" : userProfile.metaObj === -300 ? "Definición" : userProfile.metaObj === 300 ? "Volumen" : "Mantenimiento"; 
  const cg = document.getElementById('profile-card-goal'); if(cg) cg.innerText = `Meta: ${labelMeta}`; 
  const ca = document.getElementById('profile-card-avatar'); if(ca) ca.src = window.generarAvatarPorRango(userProfile.nickname, currentRankName, userProfile.avatarStyle); 

  // Botón Avatar
  if(ca && !document.getElementById('btn-change-avatar')) {
    const btn = document.createElement('button'); btn.id = 'btn-change-avatar'; btn.innerHTML = '🎲';
    btn.style.cssText = 'position:absolute; margin-left:-25px; margin-top:50px; background:var(--primary); color:#000; border:none; border-radius:50%; width:30px; height:30px; font-size:16px; cursor:pointer; box-shadow:0 2px 5px rgba(0,0,0,0.5); z-index:10;';
    btn.onclick = window.cambiarEstiloAvatar; ca.parentNode.insertBefore(btn, ca.nextSibling);
  }
};

document.getElementById('btn-edit-profile')?.addEventListener('click', () => { window.abrirOnboarding(true); });

// --- GRÁFICO EVOLUCIÓN AVANZADO ---
let profileChartInstance = null;
window.dibujarGraficoPerfil = function(historialPesos) {
  const profPage = document.getElementById('page-profile'); if(!profPage) return;
  let canvasWrapper = document.getElementById('wrapper-profile-chart-inj');
  if(!canvasWrapper) { canvasWrapper = document.createElement('div'); canvasWrapper.id = 'wrapper-profile-chart-inj'; profPage.appendChild(canvasWrapper); }
  canvasWrapper.innerHTML = `<div class="card"><h4 style="font-size: 12px; color: #00e5ff; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 15px;">📊 Proyección y Evolución</h4><div style="height: 250px; width: 100%;"><canvas id="profile-chart-canvas-inj"></canvas></div></div>`;
  
  const ctx = document.getElementById('profile-chart-canvas-inj'); if(!ctx) return;
  if(profileChartInstance) profileChartInstance.destroy();
  
  const labels = historialPesos.map(item => item.fecha.split('-').slice(1).join('/')).reverse(); 
  const realData = historialPesos.map(item => item.peso).reverse();
  
  let projectionData = [];
  if(realData.length > 0) {
    let startWeight = realData[0];
    let dailyChange = userProfile.metaObj === -500 ? -0.08 : userProfile.metaObj === -300 ? -0.04 : userProfile.metaObj === 300 ? 0.05 : 0;
    projectionData = labels.map((_, i) => parseFloat((startWeight + (dailyChange * i * 7)).toFixed(1))); 
  }

  profileChartInstance = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        { label: 'Peso Real', data: realData, borderColor: '#00e5ff', backgroundColor: 'rgba(0, 229, 255, 0.15)', borderWidth: 4, fill: true, tension: 0.3, pointBackgroundColor: '#fff', pointRadius: 5, pointBorderColor: '#00e5ff', pointBorderWidth: 2 },
        { label: 'Proyección Ideal', data: projectionData, borderColor: 'rgba(255, 170, 0, 0.8)', borderDash: [6, 6], borderWidth: 2, fill: false, pointRadius: 0 }
      ]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: true, labels: { color: '#fff', font:{size:11, family:'Montserrat'} } } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks:{color:'#9ca3af'} }, x: { grid: { display: false }, ticks:{color:'#9ca3af'} } } }
  });
};

// --- MEJORA DEL DASHBOARD ---
window.actualizarDashboard = function() { 
  const dashboardContainer = document.getElementById('page-dashboard'); if(!dashboardContainer) return;
  let dashUI = document.getElementById('iron-dash-ui-advanced');
  if(!dashUI) {
    document.querySelectorAll('.card-main, .macros, .water-card, .coach-tip, #btn-checkin, #calorias-total, .energy-breakdown, .chart-container').forEach(el => el.style.display = 'none');
    dashUI = document.createElement('div'); dashUI.id = 'iron-dash-ui-advanced'; dashboardContainer.insertBefore(dashUI, dashboardContainer.firstChild);
  }

  const calNetas = Math.max(0, totalCalorias - totalQuemadas);
  const calPct = Math.min(100, (calNetas / metaCalorias) * 100) || 0;
  const prPct = Math.min(100, (totalProt/metaProt)*100) || 0; const cbPct = Math.min(100, (totalCarb/metaCarb)*100) || 0; const grPct = Math.min(100, (totalGrasa/metaGrasa)*100) || 0;
  const calColor = calNetas > metaCalorias ? 'var(--danger)' : 'var(--primary)';

  dashUI.innerHTML = `
    <button id="btn-checkin-new" class="iron-btn-warning" style="margin-bottom: 20px; font-size:12px; box-shadow: 0 0 20px rgba(255,170,0,0.3);" onclick="window.openSheet('sheet-checkin')">📈 Registrar Check-in Diario</button>
    <div class="card" style="padding:25px 20px;">
      <div style="display:flex; justify-content:space-between; margin-bottom:25px;">
        <h3 style="margin:0; font-size:15px; color:#fff; text-transform:uppercase; letter-spacing:1px;">Monitor de Energía</h3>
        <button class="btn-clear-history" style="font-size:11px; color:var(--primary); border:1px solid var(--primary); background:rgba(0,229,255,0.1);" onclick="window.reiniciarDiaActual()">🔄 Reiniciar</button>
      </div>
      
      <div class="energy-ring" style="--pct: ${calPct}%; --primary: ${calColor};">
        <div class="energy-ring-content">
          <span style="font-size:36px; font-weight:900; color:${calColor}; text-shadow:0 0 15px rgba(0,229,255,0.5); display:block; line-height:1;">${calNetas}</span>
          <span style="font-size:10px; color:#9ca3af; text-transform:uppercase; font-weight:800; letter-spacing:1px;">Kcal Netas</span>
        </div>
      </div>

      <div style="display:flex; justify-content:space-around; text-align:center; margin-bottom:25px; border-top:1px dashed rgba(255,255,255,0.1); padding-top:20px;">
        <div><span style="font-size:10px; color:#9ca3af; font-weight:800; display:block;">CONSUMIDAS</span><b style="color:#00e5ff; font-size:16px;">+${totalCalorias}</b></div>
        <div><span style="font-size:10px; color:#9ca3af; font-weight:800; display:block;">QUEMADAS</span><b style="color:#ffaa00; font-size:16px;">🔥-${totalQuemadas}</b></div>
        <div><span style="font-size:10px; color:#9ca3af; font-weight:800; display:block;">META DÍA</span><b style="color:#fff; font-size:16px;">${metaCalorias}</b></div>
      </div>

      <div class="stats-grid" style="margin-top:0;">
        <div class="stat-panel"><div class="stat-title">Proteína</div><div class="stat-value" style="font-size:16px;">${totalProt}g <span style="font-size:10px; color:#9ca3af;">/ ${metaProt}g</span></div><div class="macro-progress-container"><div class="macro-progress-fill" style="width:${prPct}%; background:#ff3366; box-shadow: 0 0 8px #ff3366;"></div></div></div>
        <div class="stat-panel"><div class="stat-title">Carbohidratos</div><div class="stat-value" style="font-size:16px;">${totalCarb}g <span style="font-size:10px; color:#9ca3af;">/ ${metaCarb}g</span></div><div class="macro-progress-container"><div class="macro-progress-fill" style="width:${cbPct}%; background:#00e5ff; box-shadow: 0 0 8px #00e5ff;"></div></div></div>
        <div class="stat-panel stat-panel-full"><div class="stat-title">Grasas</div><div class="stat-value" style="font-size:16px;">${totalGrasa}g <span style="font-size:10px; color:#9ca3af;">/ ${metaGrasa}g</span></div><div class="macro-progress-container"><div class="macro-progress-fill" style="width:${grPct}%; background:#ffaa00; box-shadow: 0 0 8px #ffaa00;"></div></div></div>
      </div>
    </div>
    
    <div class="card" style="padding:20px; margin-top:20px;">
      <div style="display:flex; justify-content:space-between; margin-bottom:15px;"><h3 style="margin:0; font-size:14px; color:#fff; text-transform:uppercase; letter-spacing:1px;">💧 Hidratación</h3><button style="background:rgba(0,229,255,0.1); border:1px solid #00e5ff; border-radius:6px; color:#00e5ff; font-size:11px; font-weight:bold; cursor:pointer; padding:4px 8px;" onclick="window.resetAgua()">Reset</button></div>
      <div style="display:flex; align-items:center; gap:15px;">
        <div style="flex:1;"><div class="stat-value" style="font-size:18px; color:#00e5ff;">${totalAgua/1000}L <span style="font-size:10px; color:#9ca3af;">/ 3.0L</span></div><div class="macro-progress-container" style="height:10px;"><div class="macro-progress-fill" id="water-fill-bar" style="width:${Math.min(100, (totalAgua/3000)*100)}%; background:#00e5ff; box-shadow: 0 0 8px #00e5ff;"></div></div></div>
        <button class="iron-btn-primary" style="width:auto; margin:0; padding:12px 18px; font-size:13px;" onclick="window.agregarAgua(500)">+ 500ml</button>
      </div>
    </div>
  `;
};

window.actualizarAguaUI = function() { const metaAgua = 3000; let pct = Math.min(100, Math.round((totalAgua/metaAgua)*100)); const wb = document.getElementById('water-fill-bar'); if(wb) wb.style.width = `${pct}%`; window.actualizarDashboard(); window.guardarEstadoNube(); };
window.agregarAgua = ml => { totalAgua += ml; window.actualizarAguaUI(); window.showToast(`💧 +${ml} ml añadidos.`); }; window.resetAgua = () => { totalAgua = 0; window.actualizarAguaUI(); window.showToast(`🔄 Hidratación reiniciada.`); };

// --- BASES DE DATOS ---
let oracleDB = []; let exercisesDB = [];
async function inicializarBases() {
  try { const resFood = await fetch('alimentos.json?v=' + Date.now()); if (resFood.ok) oracleDB = await resFood.json(); } catch (e) {}
  try { const resEx = await fetch('ejercicios.json?v=' + Date.now()); if (!resEx.ok) throw new Error(); exercisesDB = await resEx.json(); console.log(`⚔️ Base sincronizada.`); } catch (e) {}
}
inicializarBases();

// --- ORÁCULO DE NUTRICIÓN ---
let weeklyPlan = []; let selectedDayIndex = 0; let activeAllergies = [];
const allergyInput = document.getElementById('oracle-allergies-input'); const allergyContainer = document.getElementById('allergy-tags-container');
if(allergyInput) { allergyInput.addEventListener('keypress', (e) => { if(e.key === 'Enter' || e.key === ',') { e.preventDefault(); const val = allergyInput.value.trim().toLowerCase(); if(val && !activeAllergies.includes(val)) { activeAllergies.push(val); window.renderAllergyChips(); } allergyInput.value = ''; } }); }
window.renderAllergyChips = function() { if(!allergyContainer) return; allergyContainer.innerHTML = ''; activeAllergies.forEach((allergy, index) => { const chip = document.createElement('div'); chip.className = 'allergy-chip'; chip.innerHTML = `<span>${allergy}</span><span class="allergy-chip-close" onclick="window.removeAllergy(${index})">×</span>`; allergyContainer.appendChild(chip); }); };
window.removeAllergy = function(index) { activeAllergies.splice(index, 1); window.renderAllergyChips(); };

let dynamicDays = [];
window.calcularFechasSemana = function() { dynamicDays = []; const date = new Date(); const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']; const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']; for(let i=0; i<7; i++) { let d = new Date(date); d.setDate(d.getDate() + i); dynamicDays.push({ index: i, shortName: dayNames[d.getDay()], fullName: `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]}` }); } };

document.getElementById('btn-generar-plan')?.addEventListener('click', () => { 
  if (oracleDB.length === 0) { window.showToast("⚠️ Sincronizando alimentos..."); return; } 
  window.calcularFechasSemana(); window.generarPlanSemanal(); 
  document.getElementById('oracle-form-card').style.display = 'none'; document.getElementById('plan-resultado').style.display = 'block'; window.showToast('🤖 Plan clínico generado.'); 
});

window.seleccionarDiaPlan = function(index) { selectedDayIndex = index; document.querySelectorAll('.day-chip').forEach(btn => btn.classList.remove('active')); document.querySelector(`.day-chip[data-day="${index}"]`)?.classList.add('active'); const ph = document.getElementById('plan-date-header'); if(ph) ph.innerText = dynamicDays[index].fullName; window.renderizarDiaSeleccionado(); };

window.generarPlanSemanal = function() { 
  weeklyPlan = []; const distribution = [ { tipo: 'desayuno', cals: metaCalorias * 0.25 }, { tipo: 'almuerzo', cals: metaCalorias * 0.35 }, { tipo: 'cena', cals: metaCalorias * 0.30 }, { tipo: 'snack', cals: metaCalorias * 0.10 } ]; 
  for(let i=0; i<7; i++) { let dayMeals = distribution.map(slot => window.obtenerComidaAlgoritmo(slot.tipo, slot.cals, [])); weeklyPlan.push(dayMeals); } 
  const scrollContainer = document.getElementById('day-selector-container'); 
  if(scrollContainer) { scrollContainer.innerHTML = ''; dynamicDays.forEach(day => { scrollContainer.innerHTML += `<button class="day-chip ${day.index === 0 ? 'active' : ''}" data-day="${day.index}" onclick="window.seleccionarDiaPlan(${day.index})">${day.shortName}</button>`; }); }
  window.seleccionarDiaPlan(0); 
};

window.filtrarBaseDatos = function(tipo, excludesId) { let currentDietType = document.getElementById('oracle-diet-type')?.value || 'normal'; let isCeliac = document.getElementById('oracle-celiac')?.checked || false; let isLactose = document.getElementById('oracle-lactose')?.checked || false; let isSibo = document.getElementById('oracle-sibo')?.checked || false; let candidatos = oracleDB.filter(m => { if(m.tipo !== tipo) return false; if(m.dietas && !m.dietas.includes(currentDietType)) return false; if(excludesId && excludesId.includes(m.id)) return false; if(isCeliac && m.glutenFree === false) return false; if(isLactose && m.lactoseFree === false) return false; if(isSibo && m.siboSafe === false) return false; let jsonStr = JSON.stringify(m).toLowerCase(); for(let a of activeAllergies) { if(jsonStr.includes(a)) return false; } return true; }); if(candidatos.length === 0) candidatos = oracleDB.filter(m => m.tipo === tipo); return candidatos; };
window.calcularMacrosPorcion = function(comidaBase, targetCals) { const factor = targetCals / (comidaBase.calBase || 1); let ingredientesAdaptados = (comidaBase.ingredientes || []).map(ing => { let qtyCalculada = ing.baseQty * factor; qtyCalculada = ing.unidad === 'unidades' || ing.unidad === 'scoops' ? parseFloat(qtyCalculada.toFixed(1)) : Math.round(qtyCalculada); return { nombre: ing.nombre, cantidad: qtyCalculada, unidad: ing.unidad }; }); return { id: comidaBase.id, tipo: comidaBase.tipo, name: comidaBase.name, cals: Math.round(comidaBase.calBase * factor), prot: Math.round(comidaBase.prot * factor), carb: Math.round(comidaBase.carb * factor), gras: Math.round(comidaBase.gras * factor), ingredientes: ingredientesAdaptados }; };
window.obtenerComidaAlgoritmo = function(tipo, targetCals, excludesId) { const candidatos = window.filtrarBaseDatos(tipo, excludesId); if(candidatos.length === 0) return { id: 0, tipo: tipo, name: "Sin Opciones", cals: targetCals, prot: 0, carb: 0, gras: 0, ingredientes: [] }; const selected = candidatos[Math.floor(Math.random() * candidatos.length)]; return window.calcularMacrosPorcion(selected, targetCals); };

window.renderizarDiaSeleccionado = function() { 
  const container = document.getElementById('comidas-plan'); if(!container) return; container.innerHTML = ''; const dayMeals = weeklyPlan[selectedDayIndex] || []; 
  dayMeals.forEach((meal, idx) => { let ingredientesHTML = meal.ingredientes.length > 0 ? meal.ingredientes.map(i => `<span style="display:block; margin-bottom:3px;">• ${i.cantidad} ${i.unidad} de ${i.nombre}</span>`).join('') : `• Sin ingredientes`; container.innerHTML += `<div class="plan-meal-card"><div class="plan-meal-header"><span class="plan-meal-title">${meal.tipo}</span><button class="btn-swap" onclick="window.abrirMenuReemplazo(${idx})">🔄 Cambiar</button></div><div class="plan-meal-desc"><b>${meal.name}</b>${ingredientesHTML}</div><div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;"><span class="plan-meal-cals">🔥 ${meal.cals} kcal</span><span style="font-size:11px; color:var(--text-muted); font-weight:800;">P: <span style="color:#ff3366;">${meal.prot}g</span> | C: <span style="color:#00e5ff;">${meal.carb}g</span> | G: <span style="color:#ffaa00;">${meal.gras}g</span></span></div></div>`; }); 
};

let swapTargetIndex = -1;
window.abrirMenuReemplazo = function(mealIndex) { swapTargetIndex = mealIndex; const oldMeal = weeklyPlan[selectedDayIndex][mealIndex]; const targetCals = oldMeal.cals; let candidatos = window.filtrarBaseDatos(oldMeal.tipo, [oldMeal.id]); const listContainer = document.getElementById('sheet-swap-list'); if(!listContainer) return; listContainer.innerHTML = ''; if(candidatos.length === 0) { listContainer.innerHTML = `<p style="font-size:12px; color:#ff3366;">No hay opciones.</p>`; } else { for(let i=0; i<candidatos.length; i++) { let opcionEscalada = window.calcularMacrosPorcion(candidatos[i], targetCals); let objData = encodeURIComponent(JSON.stringify(opcionEscalada)); listContainer.innerHTML += `<div class="swap-option-card" onclick="window.confirmarReemplazo('${objData}')" style="background:#1a2130; padding:12px; border-radius:8px; cursor:pointer; margin-bottom:8px;"><b style="display:block; color:#fff;">${opcionEscalada.name}</b><span style="font-size:11px; color:var(--primary);">🔥 ${opcionEscalada.cals} kcal | P: ${opcionEscalada.prot}g | C: ${opcionEscalada.carb}g | G: ${opcionEscalada.gras}g</span></div>`; } } window.openSheet('sheet-swap-meal'); };
window.confirmarReemplazo = function(encodedData) { if(swapTargetIndex > -1) { const newMeal = JSON.parse(decodeURIComponent(encodedData)); weeklyPlan[selectedDayIndex][swapTargetIndex] = newMeal; window.renderizarDiaSeleccionado(); window.closeSheet(); window.showToast(`✅ Actualizado.`); } };

// FUNCIONES ESCÁNER Y COMPRAS 
window.generarListaCompras = function() {
  const ul = document.getElementById('lista-compras-ui'); if(!ul) return; let listaConsolidada = {};
  weeklyPlan.forEach(dia => { dia.forEach(comida => { comida.ingredientes.forEach(ing => { let key = `${ing.nombre} (${ing.unidad})`; listaConsolidada[key] = (listaConsolidada[key] || 0) + ing.cantidad; }); }); });
  ul.innerHTML = '';
  for (let key in listaConsolidada) { let rawQty = listaConsolidada[key]; let qtyDisplay = key.includes('unidades') || key.includes('scoops') ? rawQty.toFixed(1) : Math.round(rawQty); let match = key.match(/(.*) \((.*)\)/); let nombreLimpio = match ? match[1] : key; let unidadLimpia = match ? match[2] : ''; ul.innerHTML += `<li><input type="checkbox" style="accent-color:var(--primary); width:18px; height:18px;"> <span style="flex:1;">${nombreLimpio}</span> <b style="color:var(--primary); font-size:12px;">${qtyDisplay} ${unidadLimpia}</b></li>`; } window.openSheet('sheet-compras');
};

document.getElementById('btn-add-planned')?.addEventListener('click', () => {
  if(!weeklyPlan || weeklyPlan.length === 0) { window.showToast('⚠️ Genera un plan primero.'); return; }
  const listContainer = document.getElementById('sheet-planned-list'); if(!listContainer) return; listContainer.innerHTML = ''; const todaysPlan = weeklyPlan[0];
  todaysPlan.forEach(meal => { let objData = encodeURIComponent(JSON.stringify(meal)); listContainer.innerHTML += `<div class="swap-option-card" onclick="window.registrarComidaPlaneada('${objData}')" style="background:#1a2130; padding:12px; border-radius:8px; cursor:pointer; margin-bottom:8px;"><span style="font-size:10px; color:var(--primary); font-weight:800; text-transform:uppercase;">${meal.tipo}</span><b style="display:block; color:#fff; margin-top:4px;">${meal.name}</b><span>🔥 ${meal.cals} kcal | P: ${meal.prot}g | C: ${meal.carb}g | G: ${meal.gras}g</span></div>`; });
  window.openSheet('sheet-planned-meals');
});

window.registrarComidaPlaneada = async function(encodedData) {
  const meal = JSON.parse(decodeURIComponent(encodedData)); let nombreFinal = `[${meal.tipo.charAt(0).toUpperCase() + meal.tipo.slice(1)}] ${meal.name}`;
  await window.registrarComidaNube(meal.cals, meal.prot, meal.carb, meal.gras, nombreFinal); window.closeSheet(); window.showToast(`✅ Registrado al instante.`);
};

let html5QrCode = null;
document.getElementById('btn-foto')?.addEventListener('click', () => { window.openSheet('sheet-scanner'); if (!html5QrCode) html5QrCode = new Html5Qrcode("qr-reader"); const config = { fps: 10, qrbox: { width: 250, height: 250 }, aspectRatio: 1.0 }; html5QrCode.start({ facingMode: "environment" }, config, window.onScanSuccess, () => {}).catch(err => { window.showToast("⚠️ Error cámara."); }); });
window.closeScanner = function() { if (html5QrCode && html5QrCode.isScanning) { html5QrCode.stop().then(() => { html5QrCode.clear(); }).catch(e => console.error(e)); } window.closeSheet(); };
window.onScanSuccess = async function(decodedText) {
  if (html5QrCode && html5QrCode.isScanning) { await html5QrCode.stop(); } window.closeScanner(); window.showToast(`🔍 Buscando ${decodedText}...`);
  try {
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${decodedText}.json`); const data = await res.json();
    if (data.status === 1) {
      const p = data.product; if(!p.nutriments || !p.nutriments['energy-kcal_100g']) { window.showToast('⚠️ Sin info nutricional.'); return; }
      let brand = p.brands ? ` (${p.brands.split(',')[0]})` : ''; let nombre = `${p.product_name || 'Producto'}${brand}`;
      let cal100 = Math.round(p.nutriments['energy-kcal_100g']); let prot100 = Math.round(p.nutriments['proteins_100g'] || 0); let carb100 = Math.round(p.nutriments['carbohydrates_100g'] || 0); let gras100 = Math.round(p.nutriments['fat_100g'] || 0);
      window.currentSearchFoodBase = { cal: cal100, prot: prot100, carb: carb100, gras: gras100 };
      document.getElementById('food-selected-name').innerText = nombre; document.getElementById('food-results-list').innerHTML = ''; document.getElementById('edit-qty').value = '100'; document.getElementById('edit-unit').value = '1'; window.recalcularMacros(); document.getElementById('food-custom-section').style.display = 'block'; window.openSheet('sheet-add-food');
    } else { window.showToast('❌ Producto no encontrado.'); }
  } catch (err) { window.showToast('⚠️ Error conexión con OpenFoodFacts.'); }
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
    if(resultadosLocales.length > 0) { window.renderizarResultadosBusqueda(resultadosLocales, c); window.showToast('⚠️ Mostrando local.'); } else { c.innerHTML = `<div style="font-size:12px; color:#ff3366; text-align:center; margin-top:10px;">❌ No encontrado.</div>`; }
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
  if(!c && !p) { window.showToast('⚠️ Ingresa cantidad.'); this.disabled = false; return; }
  let nombreFinalRegistro = `${n} (${qtyVal} ${unitText})`; await window.registrarComidaNube(c, p, cb, g, `[${mt}] ${nombreFinalRegistro}`); window.closeSheet(); window.showToast(`✅ Alimento registrado.`); this.disabled = false;
});

// --- SOCIAL / COFRADÍA (CON BORRADO CORRECTO Y SOLICITUDES ENVIADAS) ---
window.cargarModuloSocialCompleto = function() {
  const root = document.getElementById('social-tab-content-root'); if(!root) return;
  root.innerHTML = `
    <div class="card" style="margin-bottom: 20px;">
      <h4 style="font-size: 12px; color: #00e5ff; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 12px;">👥 Reclutar Amigos</h4>
      <div style="display:flex; gap:8px; margin-bottom:12px;">
        <input type="text" id="input-search-friend" class="iron-input-modern" placeholder="Apodo exacto..." style="font-size:12px; padding:8px 12px;">
        <button id="btn-search-friend" class="iron-btn-primary" style="width:auto; margin-top:0; padding:8px 15px; font-size:12px;">Buscar</button>
      </div>
      <div id="friend-search-result"></div>
    </div>
    <div class="card" style="margin-bottom: 20px;">
      <h5 style="font-size: 11px; color: #ffaa00; text-transform: uppercase; font-weight: 800; margin-bottom: 8px;">📩 Solicitudes Entrantes</h5>
      <div id="friend-requests-list" style="font-size:12px; color:#9ca3af; margin-bottom:15px;">Buscando solicitudes...</div>
      
      <h5 style="font-size: 11px; color: #ff3366; text-transform: uppercase; font-weight: 800; margin-bottom: 8px;">🚀 Solicitudes Enviadas</h5>
      <div id="friend-sent-list" style="font-size:12px; color:#9ca3af; margin-bottom:15px;">No has enviado solicitudes.</div>

      <h5 style="font-size: 11px; color: #00e5ff; text-transform: uppercase; font-weight: 800; margin: 15px 0 8px 0;">⚔️ Cofradía Conectada</h5>
      <div id="my-friends-list" style="font-size:12px; color:#9ca3af;">No hay amigos.</div>
    </div>
    <div class="card">
      <h4 style="font-size: 12px; color: #ffaa00; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 10px;">📰 Muro Privado</h4>
      <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; margin-bottom: 15px;">
        <textarea id="social-post-text" class="iron-input-modern" placeholder="Comparte tu progreso..." style="height: 60px; font-size:12px; resize:none;"></textarea>
        <button id="btn-publish-social" class="iron-btn-primary" style="padding: 8px; font-size:12px; margin-top:8px;">📢 Publicar</button>
      </div>
      <div id="social-feed-container">Cargando muro...</div>
    </div>
  `;

  document.getElementById('btn-search-friend')?.addEventListener('click', async () => { 
    const val = document.getElementById('input-search-friend').value.trim().toLowerCase(); const resBox = document.getElementById('friend-search-result'); if(!val) return; resBox.innerHTML = '<p style="font-size:11px; color:#9ca3af;">Rastreando...</p>'; 
    try { 
      const q = query(collection(db, "users"), where("nickname_lower", "==", val)); const snap = await getDocs(q); 
      if(snap.empty) { resBox.innerHTML = '<p style="font-size:11px; color:#ff3366;">❌ No encontrado.</p>'; return; } 
      const friendDocId = snap.docs[0].id; const friendData = snap.docs[0].data(); 
      if(friendDocId === currentUser.uid) { resBox.innerHTML = '<p style="font-size:11px; color:#ffaa00;">⚠️ Eres tú.</p>'; return; } 
      resBox.innerHTML = `<div style="background:rgba(0,229,255,0.05); border:1px solid rgba(0,229,255,0.2); padding:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;"><div><b style="color:#fff; font-size:13px;">${friendData.nickname}</b><br><span style="font-size:10px; color:#ffaa00;">Rango: ${friendData.currentRankName || 'Ashigaru'}</span></div><button id="btn-send-req" class="iron-btn-warning" style="width:auto; margin-top:0; padding:5px 10px; font-size:11px;">+ Enviar Solicitud</button></div>`; 
      document.getElementById('btn-send-req').onclick = async () => { 
        try { 
          await addDoc(collection(db, "users", friendDocId, "friend_requests"), { fromUid: currentUser.uid, fromNickname: userProfile.nickname, status: "pendiente", timestamp: Date.now() }); 
          await setDoc(doc(db, "users", currentUser.uid, "sent_requests", friendDocId), { toUid: friendDocId, toNickname: friendData.nickname, status: "pendiente", timestamp: Date.now() });
          window.showToast("✅ Solicitud enviada."); resBox.innerHTML = ''; window.cargarSolicitudesYAmigosSocial();
        } catch(e) { window.showToast("❌ Error al enviar."); } 
      }; 
    } catch(err) { resBox.innerHTML = '<p style="font-size:11px; color:#ff3366;">Error.</p>'; } 
  });

  document.getElementById('btn-publish-social')?.addEventListener('click', async () => { 
    const txt = document.getElementById('social-post-text').value.trim(); if(!txt) return; 
    try { await addDoc(collection(db, "social_posts"), { uid: currentUser.uid, author: userProfile.nickname, rango: currentRankName, avatarStyle: userProfile.avatarStyle, content: txt, timestamp: Date.now() }); document.getElementById('social-post-text').value = ''; window.showToast("📢 ¡Publicado!"); window.cargarMuroSocialPrivado(); } catch(e) { window.showToast("❌ Error."); } 
  });

  window.cargarSolicitudesYAmigosSocial(); window.cargarMuroSocialPrivado();
};

window.borrarPostSocial = async function(postId) { if(!confirm('¿Borrar publicación del muro?')) return; await deleteDoc(doc(db, "social_posts", postId)); window.showToast('🗑️ Eliminada'); window.cargarMuroSocialPrivado(); };

window.cargarSolicitudesYAmigosSocial = async function() {
  if(!currentUser || !db) return; const reqContainer = document.getElementById('friend-requests-list'); const sentContainer = document.getElementById('friend-sent-list'); const friendsContainer = document.getElementById('my-friends-list');
  try {
    const reqSnap = await getDocs(collection(db, "users", currentUser.uid, "friend_requests")); let reqHtml = ''; reqSnap.forEach(d => { let req = d.data(); if(req.status === 'pendiente') { reqHtml += `<div style="background:rgba(255,170,0,0.05); border:1px solid rgba(255,170,0,0.2); padding:8px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;"><span><b>${req.fromNickname}</b> quiere unirse</span><button onclick="window.aceptarSolicitud('${d.id}', '${req.fromUid}', '${req.fromNickname}')" style="background:#00e5ff; border:none; padding:4px 8px; border-radius:4px; font-weight:bold; cursor:pointer; color:#111827;">Aceptar</button></div>`; } }); if(reqContainer) reqContainer.innerHTML = reqHtml || 'No hay solicitudes entrantes.';
    const sentSnap = await getDocs(collection(db, "users", currentUser.uid, "sent_requests")); let sentHtml = ''; sentSnap.forEach(d => { let sent = d.data(); sentHtml += `<div style="background:rgba(255,51,102,0.05); border:1px solid rgba(255,51,102,0.2); padding:8px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;"><span style="color:#9ca3af;">A: <b>${sent.toNickname}</b></span><span style="color:#ffaa00; font-size:10px; font-weight:bold; text-transform:uppercase;">⏳ ${sent.status}</span></div>`; }); if(sentContainer) sentContainer.innerHTML = sentHtml || 'No has enviado invitaciones.';
    const friendsSnap = await getDocs(collection(db, "users", currentUser.uid, "friends")); let friendHtml = ''; friendsSnap.forEach(d => { let f = d.data(); friendHtml += `<div style="background:rgba(0,229,255,0.05); border:1px solid rgba(0,229,255,0.2); padding:8px; border-radius:6px; margin-bottom:5px; display:flex; justify-content:space-between; align-items:center;"><span>⚔️ <b>${f.friendNickname}</b></span><div style="display:flex; gap:5px;"><button onclick="window.verPerfilAmigoCompleto('${f.friendUid}')" style="background:transparent; color:#00e5ff; border:1px solid #00e5ff; padding:3px 6px; border-radius:4px; font-size:10px; cursor:pointer;">Expediente</button><button onclick="window.eliminarAmigo('${d.id}', '${f.friendUid}')" style="background:rgba(255,51,102,0.1); color:#ff3366; border:1px solid #ff3366; padding:3px 6px; border-radius:4px; font-size:10px; cursor:pointer;">Eliminar</button></div></div>`; }); if(friendsContainer) friendsContainer.innerHTML = friendHtml || 'Aún no tienes amigos en la cofradía.';
  } catch(e) { console.error(e); }
};

window.cargarMuroSocialPrivado = async function() {
  const feedContainer = document.getElementById('social-feed-container'); if(!feedContainer || !db) return;
  try {
    const friendsSnap = await getDocs(collection(db, "users", currentUser.uid, "friends")); let allowedUids = [currentUser.uid]; friendsSnap.forEach(f => allowedUids.push(f.data().friendUid));
    const q = query(collection(db, "social_posts"), orderBy("timestamp", "desc"), limit(30)); const snaps = await getDocs(q); let html = '';
    snaps.forEach(d => { let post = d.data(); if(allowedUids.includes(post.uid)) { const delBtn = post.uid === currentUser.uid ? `<button onclick="window.borrarPostSocial('${d.id}')" style="background:none; border:none; cursor:pointer; font-size:14px; position:absolute; right:15px; top:15px;">🗑️</button>` : ''; html += `<div class="social-post-card">${delBtn}<div class="social-post-header"><img class="social-post-avatar" src="${window.generarAvatarPorRango(post.author, post.rango || 'Ashigaru', post.avatarStyle || 'bottts')}"><div><b style="color:#fff; font-size:13px;">${post.author}</b><br><span style="font-size:9px; color:#ffaa00;">${post.rango || 'Guerrero'} • ${new Date(post.timestamp).toLocaleDateString()}</span></div></div><div class="social-post-body">${post.content}</div></div>`; } }); feedContainer.innerHTML = html || '<p style="font-size:12px; color:#9ca3af; text-align:center;">El muro privado está silencioso. ¡Publica algo para tu cofradía!</p>';
  } catch(e) { feedContainer.innerHTML = '<p style="font-size:12px; color:#ff3366;">Error cargando muro privado.</p>'; }
};

window.aceptarSolicitud = async function(reqDocId, fromUid, fromNickname) { 
  const friendsRef = collection(db, "users", currentUser.uid, "friends"); const checkDup = await getDocs(query(friendsRef, where("friendUid", "==", fromUid))); 
  if(checkDup.empty) { await addDoc(friendsRef, { friendUid: fromUid, friendNickname: fromNickname, timestamp: Date.now() }); await addDoc(collection(db, "users", fromUid, "friends"), { friendUid: currentUser.uid, friendNickname: userProfile.nickname, timestamp: Date.now() }); } 
  await deleteDoc(doc(db, "users", currentUser.uid, "friend_requests", reqDocId));
  // Actualizar la solicitud enviada del amigo a "aceptado" (opcional limpieza)
  const sentQ = query(collection(db, "users", fromUid, "sent_requests"), where("toUid", "==", currentUser.uid)); const sentSnap = await getDocs(sentQ); sentSnap.forEach(async (d) => await deleteDoc(d.ref));
  window.showToast(`⚔️ ¡Ahora ${fromNickname} es de tu cofradía!`); window.cargarSolicitudesYAmigosSocial(); window.cargarMuroSocialPrivado(); 
};

window.eliminarAmigo = async function(friendDocId, friendUid) { if(!confirm("¿Seguro de eliminar?")) return; await deleteDoc(doc(db, "users", currentUser.uid, "friends", friendDocId)); const reciprocalQuery = query(collection(db, "users", friendUid, "friends"), where("friendUid", "==", currentUser.uid)); const recSnap = await getDocs(reciprocalQuery); recSnap.forEach(async (rDoc) => { await deleteDoc(rDoc.ref); }); window.showToast("🗑️ Eliminada."); window.cargarSolicitudesYAmigosSocial(); window.cargarMuroSocialPrivado(); };

window.verPerfilAmigoCompleto = async function(friendUid) { const docSnap = await getDoc(doc(db, "users", friendUid)); if(!docSnap.exists()) { window.showToast("⚠️ No encontrado."); return; } const data = docSnap.data(); const workoutsSnap = await getDocs(query(collection(db, "users", friendUid, "history"), orderBy("timestamp", "desc"), limit(5))); let workoutsHtml = ''; workoutsSnap.forEach(w => { let item = w.data(); workoutsHtml += `<div style="font-size:11px; color:#00e5ff; margin-bottom:4px;">• ${item.nombre}: ${item.detalle} (${item.date})</div>`; }); const container = document.getElementById('sheet-workout'); if(!container) return; container.innerHTML = `<div style="padding:20px; text-align:center;"><img src="${window.generarAvatarPorRango(data.nickname, data.currentRankName || 'Ashigaru', data.avatarStyle || 'bottts')}" style="width:70px; height:70px; border-radius:50%; border:2px solid #00e5ff; margin-bottom:10px; background:#1a2130;"><h3 style="color:#fff; font-weight:900; text-transform:uppercase;">${data.nickname}</h3><p style="color:#ffaa00; font-size:12px; font-weight:bold; margin-bottom:15px;">Rango: ${data.currentRankName || 'Ashigaru'}</p><div style="background:#111827; padding:12px; border-radius:8px; text-align:left; font-size:12px; color:#9ca3af; margin-bottom:15px;"><p><b>Peso Actual:</b> ${data.peso || '--'} kg</p><p><b>Altura:</b> ${data.altura || '--'} cm</p><p><b>Meta:</b> ${data.metaObj === 300 ? 'Volumen' : 'Definición / Mantenimiento'}</p></div><div style="background:#1a2130; padding:12px; border-radius:8px; text-align:left; max-height:150px; overflow-y:auto; margin-bottom:15px;"><b style="color:#ffaa00; font-size:11px; text-transform:uppercase; display:block; margin-bottom:6px;">🏋️ Últimas Actividades</b>${workoutsHtml || '<span style="font-size:11px; color:#9ca3af;">Sin actividad reciente.</span>'}</div><button class="iron-btn-primary" style="margin-top:0;" onclick="window.closeSheet()">Cerrar Expediente</button></div>`; window.openSheet('sheet-workout'); };

window.iniciarNotificacionesEnVivo = function(uid) { if(window.notifInterval) clearInterval(window.notifInterval); window.notifInterval = setInterval(async () => { if(!db || !currentUser) return; try { const reqSnap = await getDocs(collection(db, "users", uid, "friend_requests")); let pendientes = 0; reqSnap.forEach(d => { if(d.data().status === 'pendiente') pendientes++; }); if(pendientes > (window.lastPendientesCount || 0) && window.lastPendientesCount !== undefined) { window.showToast("🔔 ¡Nueva solicitud en la Cofradía!"); } window.lastPendientesCount = pendientes; } catch(e) {} }, 15000); };

// --- REGISTROS, ELIMINACIÓN Y ACTUALIZACIÓN EN VIVO (CON BORRADO DEL HISTORIAL REAL) ---
window.renderizarComidaEnUI = function(nombre, cal, prot, carb, gras, docId = null) { const l = document.getElementById('lista-comidas'); if(!l) return; const li = document.createElement('li'); if(docId) li.setAttribute('data-id', docId); li.innerHTML = `<span style="color:#fff; font-weight:800;">${nombre}</span><button class="btn-delete-item" style="background:none; border:none; color:var(--danger); font-size:14px; cursor:pointer; float:right;" onclick="window.eliminarComidaNube('${docId}', ${cal}, ${prot}, ${carb}, ${gras}, '${nombre.replace(/'/g, "\\'")}', this)">🗑️</button><br><span style="color: #9ca3af; font-size: 11px; margin-top:5px; display:block;">🔥 ${cal} kcal &nbsp;|&nbsp; <span style="color:#ff3366;">P: ${prot}g</span> &nbsp;|&nbsp; <span style="color:#00e5ff;">C: ${carb}g</span> &nbsp;|&nbsp; <span style="color:#ffaa00;">G: ${gras}g</span></span>`; l.appendChild(li); };
window.renderizarEntrenoEnUI = function(nombre, sets, weight, rpe, cals = 0, docId = null) { const l = document.getElementById('lista-entrenos'); if(!l) return; const li = document.createElement('li'); if(docId) li.setAttribute('data-id', docId); li.innerHTML = `<span style="color:#fff; font-weight:800;">${nombre.toUpperCase()}</span><button class="btn-delete-item" style="background:none; border:none; color:var(--danger); font-size:14px; cursor:pointer; float:right;" onclick="window.eliminarEntrenoNube('${docId}', ${cals}, '${nombre.replace(/'/g, "\\'")}', this)">🗑️</button><br><span style="color: #9ca3af; font-size: 11px; margin-top:5px; display:flex; gap:10px; align-items:center;"><span>🏋️ ${sets}</span><span>Peso Máx: ${weight} kg</span><span style="color:#ffaa00; font-weight:800;">🔥 ~${cals} kcal</span></span>`; l.appendChild(li); };

window.eliminarComidaNube = async function(docId, cal, prot, carb, gras, nombre, btnElement) { 
  if(!confirm("¿Eliminar de tu bitácora e historial?")) return; 
  totalCalorias = Math.max(0, totalCalorias - cal); totalProt = Math.max(0, totalProt - prot); totalCarb = Math.max(0, totalCarb - carb); totalGrasa = Math.max(0, totalGrasa - gras); btnElement.closest('li')?.remove(); window.actualizarDashboard(); window.guardarEstadoNube(); 
  if(currentUser && db && docId) {
    await deleteDoc(doc(db, "users", currentUser.uid, "days", window.getTodayKey(), "meals", docId)); 
    const q = query(collection(db, "users", currentUser.uid, "history"), where("date", "==", window.getTodayKey()), where("nombre", "==", nombre), where("tipo", "==", "comida"));
    const snaps = await getDocs(q); snaps.forEach(async (d) => await deleteDoc(d.ref));
    window.cargarHistorialYCheckins(currentUser.uid);
  } 
};
window.eliminarEntrenoNube = async function(docId, cals, nombre, btnElement) { 
  if(!confirm("¿Eliminar de tu bitácora e historial?")) return; 
  totalQuemadas = Math.max(0, totalQuemadas - cals); btnElement.closest('li')?.remove(); window.actualizarDashboard(); window.guardarEstadoNube(); 
  if(currentUser && db && docId) {
    await deleteDoc(doc(db, "users", currentUser.uid, "days", window.getTodayKey(), "workouts", docId));
    const q = query(collection(db, "users", currentUser.uid, "history"), where("date", "==", window.getTodayKey()), where("nombre", "==", nombre.toUpperCase()), where("tipo", "==", "entreno"));
    const snaps = await getDocs(q); snaps.forEach(async (d) => await deleteDoc(d.ref));
    window.cargarHistorialYCheckins(currentUser.uid);
  } 
};

window.registrarComidaNube = async function(cal, prot, carb, gras, nombreDisplay) { 
  totalCalorias += cal; totalProt += prot; totalCarb += carb; totalGrasa += gras; await window.guardarEstadoNube(); window.actualizarDashboard(); let docId = null; 
  if(currentUser && db) { const d = await addDoc(collection(db, "users", currentUser.uid, "days", window.getTodayKey(), "meals"), { nombre: nombreDisplay, cal, prot, carb, gras, timestamp: Date.now() }); docId = d.id; await addDoc(collection(db, "users", currentUser.uid, "history"), { tipo: 'comida', nombre: nombreDisplay, detalle: `🔥 ${cal} kcal | P:${prot}g C:${carb}g G:${gras}g`, date: window.getTodayKey(), timestamp: Date.now() }); } 
  window.renderizarComidaEnUI(nombreDisplay, cal, prot, carb, gras, docId); document.querySelector('[data-target="page-dashboard"]')?.click(); if(currentUser) window.cargarHistorialYCheckins(currentUser.uid);
};

window.registrarEntrenoNube = async function(nombre, sets, weight, rpe, cals = 0) { 
  totalQuemadas += cals; await window.guardarEstadoNube(); window.actualizarDashboard(); let docId = null; 
  if(currentUser && db) { const d = await addDoc(collection(db, "users", currentUser.uid, "days", window.getTodayKey(), "workouts"), { nombre, sets, weight, rpe, cals, timestamp: Date.now() }); docId = d.id; await addDoc(collection(db, "users", currentUser.uid, "history"), { tipo: 'entreno', nombre: nombre.toUpperCase(), detalle: `${sets} | 🔥 ${cals} kcal`, date: window.getTodayKey(), timestamp: Date.now() }); } 
  window.renderizarEntrenoEnUI(nombre, sets, weight, rpe, cals, docId); if(currentUser) window.cargarHistorialYCheckins(currentUser.uid);
};

// --- ORÁCULO DE ENTRENAMIENTO ---
let currentWorkoutRoutine = []; let activeTimers = {}; 
document.getElementById('btn-generar-rutina')?.addEventListener('click', () => {
  if(exercisesDB.length === 0) { window.showToast('⚠️ Sincronizando ejercicios... Espera un segundo.'); return; }
  const equip = document.getElementById('train-equip')?.value || 'gimnasio'; const focus = document.getElementById('train-focus')?.value || 'fullbody'; currentWorkoutRoutine = [];
  const checkWarm = document.getElementById('check-warmup'); if(checkWarm && checkWarm.checked) { currentWorkoutRoutine.push({ id: 'warmup', nombre: '🔥 Calentamiento Articular', grupo: 'cardio', musculoPrincipal: 'Todo el cuerpo', equipamiento: ['corporal'], tips: '5 a 10 min de movilidad.', imagen: 'https://dummyimage.com/400x400/111827/ffaa00&text=Calentamiento', loggedSets: [], isPhase: true }); }
  const getRandomEx = (gReq) => { const v = exercisesDB.filter(ex => ex.grupo?.toLowerCase() === gReq.toLowerCase() && (Array.isArray(ex.equipamiento) ? ex.equipamiento.some(eq => eq.toLowerCase().includes(equip.toLowerCase())) : true)); return v.length > 0 ? v[Math.floor(Math.random() * v.length)] : (exercisesDB.filter(ex => ex.grupo?.toLowerCase() === gReq.toLowerCase())[0] || null); };
  let str = focus === "fullbody" ? ["piernas", "pecho", "espalda", "hombros", "core"] : focus === "superior" ? ["pecho", "espalda", "hombros", "brazos", "core"] : ["piernas", "piernas", "piernas", "core"];
  str.forEach(g => { let ex = getRandomEx(g); if(ex && !currentWorkoutRoutine.find(e => e.id === ex.id)) { ex.loggedSets = []; ex.estimatedCals = Math.floor(Math.random() * 20) + 35; currentWorkoutRoutine.push(ex); } });
  const checkCool = document.getElementById('check-cooldown'); if(checkCool && checkCool.checked) { currentWorkoutRoutine.push({ id: 'cooldown', nombre: '❄️ Enfriamiento', grupo: 'cardio', musculoPrincipal: 'Recup.', equipamiento: ['corporal'], tips: '10 min zona 2 y elongación.', imagen: 'https://dummyimage.com/400x400/111827/00e5ff&text=Enfriamiento', loggedSets: [], isPhase: true }); }
  if(currentWorkoutRoutine.length === 0) { window.showToast('⚠️ No hay ejercicios para este filtro.'); return; }
  window.renderizarRutina(false); document.getElementById('workout-generator-card').style.display = 'none'; document.getElementById('workout-live-container').style.display = 'block'; document.getElementById('btn-start-workout').style.display = 'block'; document.getElementById('btn-finish-workout').style.display = 'none'; window.showToast('⚔️ Rutina táctica generada.');
});

window.renderizarRutina = function(isLiveMode) {
  const container = document.getElementById('rutina-generada-lista'); if(!container) return; container.innerHTML = '';
  currentWorkoutRoutine.forEach((ex, idx) => {
    const displaySwap = (isLiveMode || ex.isPhase) ? 'none' : 'block'; const displayInputs = isLiveMode ? 'block' : 'none'; const fallbackNeon = `https://dummyimage.com/400x400/111827/00e5ff&text=${encodeURIComponent(ex.nombre)}`; const imgSource = ex.imagen && ex.imagen.trim() !== "" ? ex.imagen : fallbackNeon; ex.loggedSets = ex.loggedSets || []; 
    let html = `<div class="plan-meal-card workout-card" data-index="${idx}" style="border: 1px solid rgba(0,229,255,0.2); box-shadow: 0 4px 10px rgba(0,0,0,0.3); padding: 15px; border-radius: 12px; margin-bottom:15px; background: #111827;"><div style="display:flex; justify-content:space-between; margin-bottom:10px;"><span style="font-size:15px; font-weight:900; color:#fff; text-transform:uppercase;">${ex.nombre}</span><button class="btn-swap" style="display:${displaySwap}; font-size:10px; padding:4px 8px; border-radius:6px; background:rgba(0,229,255,0.1); color:#00e5ff; border:1px solid #00e5ff;" onclick="window.abrirMenuReemplazoEj(${idx})">🔄 Cambiar</button></div><div style="display:flex; gap:15px; align-items:center;"><img src="${imgSource}" onerror="this.onerror=null; this.src='${fallbackNeon}';" style="width:75px; height:75px; border-radius:10px; object-fit:cover; border:2px solid rgba(0,229,255,0.4);"><div style="flex:1;"><p style="font-size:11px; color:#00e5ff; margin:0 0 5px 0; font-weight:800; text-transform:uppercase;">🎯 ${ex.musculoPrincipal || 'General'}</p><p style="font-size:12px; color:#9ca3af; margin:0; line-height:1.4;">💡 ${ex.tips || 'Mantén la técnica estricta.'}</p></div></div>`;
    if (isLiveMode) {
      let seriesHTML = ex.loggedSets.map((s, i) => `<li style="margin-bottom:8px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.05); font-size:13px; color:#fff;">Serie ${i+1}: <span style="color:#00e5ff; font-weight:900;">${s.reps} ${!ex.isPhase ? `reps x ${s.peso} kg` : `min`}</span></li>`).join('');
      html += `<div class="workout-inputs" style="display:${displayInputs}; background: rgba(0,0,0,0.4); padding: 15px; border-radius: 10px; margin-top:15px; border:1px solid rgba(255,255,255,0.05);"><div style="display:flex; gap:10px; margin-bottom:15px;"><div style="flex:1;"><label style="font-size:10px; color:#9ca3af; font-weight:bold; display:block; margin-bottom:4px;">${ex.isPhase?'MIN':'REPES'}</label><input type="number" id="reps-${idx}" class="iron-input-modern" placeholder="10"></div>${!ex.isPhase ? `<div style="flex:1;"><label style="font-size:10px; color:#9ca3af; font-weight:bold; display:block; margin-bottom:4px;">PESO</label><input type="number" id="peso-${idx}" class="iron-input-modern" placeholder="50"></div>` : ''}<div style="flex:1;"><label style="font-size:10px; color:#9ca3af; font-weight:bold; display:block; margin-bottom:4px;">DESC(s)</label><input type="number" id="descanso-${idx}" class="iron-input-modern" value="90"></div></div><button class="iron-btn-primary" style="width:100%; margin-top:0;" onclick="window.registrarSerieIndividual(${idx})">✅ Registrar ${ex.isPhase?'Fase':'Serie'}</button><ul id="lista-series-${idx}" style="list-style:none; padding:0; margin:15px 0 0 0;">${seriesHTML}</ul><div id="timer-container-${idx}" style="display:none; text-align:center; background: #1a2130; padding:15px; border-radius:10px; border: 1px dashed #ffaa00; margin-top:15px;"><span style="font-size:24px; font-weight:900; color:#ffaa00; display:block; margin-bottom:5px;">⏱️ <span id="time-left-${idx}">0</span>s</span><button class="iron-btn-danger" style="margin-top:0; width:100%;" onclick="window.terminarDescanso(${idx})">⏹️ Terminar</button></div></div>`;
    }
    html += `</div>`; container.innerHTML += html;
  });
};

window.abrirMenuReemplazoEj = function(index) { workoutSwapTargetIndex = index; const currentEx = currentWorkoutRoutine[index]; const alternativas = exercisesDB.filter(e => e.grupo === currentEx.grupo && e.id !== currentEx.id); const listContainer = document.getElementById('sheet-swap-ex-list'); if(!listContainer) return; listContainer.innerHTML = ''; if(alternativas.length === 0) { listContainer.innerHTML = `<p style="font-size:12px; color:#ff3366;">No hay alternativas de este grupo muscular.</p>`; } else { alternativas.forEach(alt => { let objData = encodeURIComponent(JSON.stringify(alt)); listContainer.innerHTML += `<div class="swap-option-card" onclick="window.confirmarReemplazoEj('${objData}')" style="background:#1a2130; padding:12px; border-radius:8px; cursor:pointer; margin-bottom:8px;"><span style="font-size:10px; color:#00e5ff; font-weight:800; text-transform:uppercase;">${alt.musculoPrincipal}</span><b style="display:block; color:#fff; margin-top:4px;">${alt.nombre}</b></div>`; }); } window.openSheet('sheet-swap-exercise'); };
window.confirmarReemplazoEj = function(encodedData) { if(workoutSwapTargetIndex > -1) { const newEx = JSON.parse(decodeURIComponent(encodedData)); newEx.loggedSets = []; newEx.estimatedCals = Math.floor(Math.random() * 20) + 35; currentWorkoutRoutine[workoutSwapTargetIndex] = newEx; window.renderizarRutina(false); window.closeSheet(); window.showToast(`✅ Ejercicio reemplazado.`); } };

window.registrarSerieIndividual = function(idx) { const repsInput = document.getElementById(`reps-${idx}`); const pesoInput = document.getElementById(`peso-${idx}`); const descansoInput = document.getElementById(`descanso-${idx}`); const ex = currentWorkoutRoutine[idx]; const reps = parseInt(repsInput.value); const peso = pesoInput ? (parseFloat(pesoInput.value) || 0) : 0; const descanso = parseInt(descansoInput.value) || 90; if(!reps || reps <= 0) { window.showToast(`⚠️ Ingresa valor válido.`); return; } if(!ex.loggedSets) ex.loggedSets = []; ex.loggedSets.push({ reps, peso }); const lista = document.getElementById(`lista-series-${idx}`); lista.innerHTML += `<li style="margin-bottom:8px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.05); font-size:13px; color:#fff;">Serie ${ex.loggedSets.length}: <span style="color:#00e5ff; font-weight:900;">${reps} ${ex.isPhase?'min':`reps x ${peso} kg`}</span></li>`; repsInput.value = ''; window.iniciarDescanso(idx, descanso); };
window.iniciarDescanso = function(idx, segundos) { if(activeTimers[idx]) clearInterval(activeTimers[idx].interval); const container = document.getElementById(`timer-container-${idx}`); const textSpan = document.getElementById(`time-left-${idx}`); container.style.display = 'block'; let timeLeft = segundos; textSpan.innerText = timeLeft; activeTimers[idx] = { interval: setInterval(() => { timeLeft--; if(timeLeft <= 0) { window.terminarDescanso(idx); window.showToast('⏰ ¡A la batalla!'); } else { textSpan.innerText = timeLeft; } }, 1000) }; };
window.terminarDescanso = function(idx) { if(activeTimers[idx]) { clearInterval(activeTimers[idx].interval); delete activeTimers[idx]; } document.getElementById(`timer-container-${idx}`)?.style.setProperty('display', 'none'); };

document.getElementById('btn-start-workout')?.addEventListener('click', () => { window.renderizarRutina(true); document.getElementById('btn-start-workout').style.display = 'none'; document.getElementById('btn-finish-workout').style.display = 'block'; window.showToast('🔥 ¡Modo en vivo activado!'); });
document.getElementById('btn-cancel-workout')?.addEventListener('click', () => { for (let idx in activeTimers) clearInterval(activeTimers[idx].interval); activeTimers = {}; document.getElementById('workout-live-container').style.display = 'none'; document.getElementById('workout-generator-card').style.display = 'block'; currentWorkoutRoutine = []; });
document.getElementById('btn-finish-workout')?.addEventListener('click', async function() { if (this.disabled) return; this.disabled = true; let validExercises = 0; let sessionCals = 0; for(let i = 0; i < currentWorkoutRoutine.length; i++) { const ex = currentWorkoutRoutine[i]; if(ex.loggedSets && ex.loggedSets.length > 0) { const totalSets = ex.loggedSets.length; const detalles = ex.loggedSets.map((s, idx) => `S${idx+1}: ${s.reps}${ex.isPhase?'min':`x${s.peso}kg`}`).join(' | '); const weightHighestOrLast = ex.loggedSets[ex.loggedSets.length - 1].peso; let exCals = 0; if(ex.isPhase) { let totalMins = 0; ex.loggedSets.forEach(s => totalMins += s.reps); exCals = totalMins * 8; } else { ex.loggedSets.forEach(s => { exCals += 15 + (s.peso * s.reps * 0.03); }); } exCals = Math.round(exCals); sessionCals += exCals; await window.registrarEntrenoNube(ex.nombre, `${totalSets} series (${detalles})`, weightHighestOrLast, "N/A", exCals); validExercises++; } } for (let idx in activeTimers) clearInterval(activeTimers[idx].interval); activeTimers = {}; if(validExercises > 0) { window.showToast(`✅ Entrenamiento finalizado. 🔥 ~${Math.round(sessionCals)} kcal.`); } else { window.showToast('⚠️ Sin series registradas.'); } document.getElementById('workout-live-container').style.display = 'none'; document.getElementById('workout-generator-card').style.display = 'block'; document.getElementById('btn-start-workout').style.display = 'block'; document.getElementById('btn-finish-workout').style.display = 'none'; currentWorkoutRoutine = []; this.disabled = false; });

window.abrirBuscadorManual = function() {
  const container = document.getElementById('sheet-workout'); if(!container) return;
  container.innerHTML = `<div style="padding: 20px;"><h3 style="color:#00e5ff; font-weight:900; text-transform:uppercase; margin-bottom:15px; text-align:center;">Agregar Ejercicio Manual</h3><div style="position:relative;"><input type="text" id="search-manual-ex" class="iron-input-modern" placeholder="🔍 Buscar nombre o músculo..." autocomplete="off"><div id="search-manual-results" class="search-results-box" style="position:absolute; width:100%;"></div></div><div id="manual-live-ui" style="display:none; margin-top:20px;"><div style="background:#111827; padding:15px; border-radius:10px; border:1px solid rgba(255,255,255,0.05);"><h4 id="manual-selected-name" style="color:#fff; font-weight:900; margin-bottom:15px;">Ejercicio</h4><div style="display:flex; gap:10px; margin-bottom:15px;"><div style="flex:1;"><label style="font-size:10px; color:#9ca3af;">REPES</label><input type="number" id="manual-rep" class="iron-input-modern" style="margin-top:2px;"></div><div style="flex:1;"><label style="font-size:10px; color:#9ca3af;">PESO (KG)</label><input type="number" id="manual-peso" class="iron-input-modern" style="margin-top:2px;"></div><div style="flex:1;"><label style="font-size:10px; color:#9ca3af;">DESC (S)</label><input type="number" id="manual-descanso" class="iron-input-modern" value="90" style="margin-top:2px;"></div></div><button class="iron-btn-primary" id="btn-add-manual-set" style="width:100%; margin-top:0;">✅ Registrar Serie</button><ul id="manual-sets-list" style="list-style:none; padding:0; margin:15px 0 0 0;"></ul><div id="manual-timer" style="display:none; text-align:center; background:#1a2130; padding:15px; border-radius:10px; border:1px dashed #ffaa00; margin-top:15px;"><span style="font-size:24px; font-weight:900; color:#ffaa00; display:block;">⏱️ <span id="manual-time-left">0</span>s</span><button class="iron-btn-danger" onclick="document.getElementById('manual-timer').style.display='none'; clearInterval(window.manualInterval);" style="width:100%; margin-top:0;">⏹️ Terminar</button></div><button class="iron-btn-warning" id="btn-save-manual-workout" style="margin-top:20px; width:100%; display:none;">💾 GUARDAR EN BITÁCORA</button></div></div></div>`; window.openSheet('sheet-workout');
  const searchInput = document.getElementById('search-manual-ex'); const resultsBox = document.getElementById('search-manual-results'); let selectedExercise = null; let manualSets = [];
  searchInput.addEventListener('input', function() { const queryVal = this.value.toLowerCase(); resultsBox.innerHTML = ''; if(queryVal.length < 2) { resultsBox.style.display = 'none'; return; } const matches = exercisesDB.filter(ex => ex.nombre.toLowerCase().includes(queryVal) || (ex.musculoPrincipal && ex.musculoPrincipal.toLowerCase().includes(queryVal))); if(matches.length > 0) { resultsBox.style.display = 'block'; matches.slice(0, 10).forEach(match => { const div = document.createElement('div'); div.className = 'search-item'; div.innerHTML = `<span>${match.nombre}</span> <span class="search-item-muscle" style="font-size:10px; color:#ffaa00;">${match.musculoPrincipal || 'General'}</span>`; div.onclick = () => { selectedExercise = match; manualSets = []; searchInput.value = match.nombre; resultsBox.style.display = 'none'; document.getElementById('manual-live-ui').style.display = 'block'; document.getElementById('manual-selected-name').innerText = match.nombre; document.getElementById('manual-sets-list').innerHTML = ''; document.getElementById('btn-save-manual-workout').style.display = 'none'; }; resultsBox.appendChild(div); }); } else { resultsBox.style.display = 'none'; } });
  document.getElementById('btn-add-manual-set').addEventListener('click', () => { const r = parseInt(document.getElementById('manual-rep').value); const p = parseFloat(document.getElementById('manual-peso').value) || 0; if(!r) return; manualSets.push({reps: r, peso: p}); document.getElementById('manual-sets-list').innerHTML += `<li style="margin-bottom:6px; font-size:13px; color:#fff;">Serie ${manualSets.length}: <span style="color:#00e5ff; font-weight:900;">${r} reps x ${p} kg</span></li>`; document.getElementById('manual-rep').value = ''; document.getElementById('btn-save-manual-workout').style.display = 'block'; const d = parseInt(document.getElementById('manual-descanso').value) || 90; document.getElementById('manual-timer').style.display = 'block'; let timeLeft = d; document.getElementById('manual-time-left').innerText = timeLeft; if(window.manualInterval) clearInterval(window.manualInterval); window.manualInterval = setInterval(() => { timeLeft--; document.getElementById('manual-time-left').innerText = timeLeft; if(timeLeft <= 0) { clearInterval(window.manualInterval); document.getElementById('manual-timer').style.display='none'; window.showToast('⏰ ¡A la batalla!'); } }, 1000); });
  document.getElementById('btn-save-manual-workout').addEventListener('click', async function() { if(this.disabled) return; this.disabled = true; if(manualSets.length === 0) return; const detalles = manualSets.map((s, idx) => `S${idx+1}: ${s.reps}x${s.peso}kg`).join(' | '); const weightHighestOrLast = manualSets[manualSets.length - 1].peso; let cals = 0; manualSets.forEach(s => { cals += 15 + (s.peso * s.reps * 0.03); }); cals = Math.round(cals); await window.registrarEntrenoNube(selectedExercise.nombre, `${manualSets.length} series (${detalles})`, weightHighestOrLast, "N/A", cals); if(window.manualInterval) clearInterval(window.manualInterval); window.closeSheet(); window.showToast(`✅ Ejercicio Guardado.`); this.disabled = false; });
};
document.getElementById('btn-registrar-serie')?.addEventListener('click', window.abrirBuscadorManual);

if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(console.log); }); }
