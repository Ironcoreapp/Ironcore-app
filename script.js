// ============================================================================
// --- INYECCIÓN DINÁMICA DE ESTILOS PREMIUM, DASHBOARD Y RED SOCIAL ---
// ============================================================================
const customCSS = `
  header, .top-header, #main-header {
    display: flex !important; flex-direction: row !important; align-items: center !important; justify-content: space-between !important;
    padding: 10px 20px !important; background: rgba(20, 26, 38, 0.98) !important; border-bottom: 1px solid rgba(0,229,255,0.2) !important;
    position: sticky; top: 0; z-index: 1000; box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  }
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
  .stat-value.warning { color: #ffaa00; }
  .stat-value.danger { color: #ff3366; }

  .iron-btn-primary { width: 100%; padding: 14px; margin-top: 12px; background: linear-gradient(135deg, #00e5ff 0%, #007acc 100%); color: #fff; font-size: 14px; font-weight: 900; border: none; border-radius: 10px; box-shadow: 0 4px 15px rgba(0,229,255,0.4); text-transform: uppercase; cursor: pointer; letter-spacing: 1px; transition: all 0.2s ease; }
  .iron-btn-primary:active { transform: scale(0.98); }
  .iron-btn-warning { width: 100%; padding: 14px; background: linear-gradient(135deg, #ffaa00 0%, #e65c00 100%); color: #fff; font-size: 14px; font-weight: 900; border: none; border-radius: 10px; box-shadow: 0 4px 15px rgba(255,170,0,0.4); text-transform: uppercase; cursor: pointer; transition: all 0.2s ease; }
  .iron-btn-danger { width: 100%; padding: 12px; margin-top: 15px; background: rgba(255, 51, 102, 0.1); color: #ff3366; border: 1px solid #ff3366; border-radius: 10px; font-size: 13px; font-weight: 800; cursor: pointer; text-transform: uppercase; letter-spacing: 1px; transition: all 0.2s ease; }
  
  .iron-input-modern { width: 100%; padding: 12px; background: rgba(0,0,0,0.4); border: 1px solid rgba(0,229,255,0.5); border-radius: 8px; color: #fff; font-weight: bold; font-size: 14px; box-sizing: border-box; transition: border 0.3s; }
  .iron-input-modern:focus { outline: none; border-color: #00e5ff; box-shadow: 0 0 8px rgba(0,229,255,0.5); }
  .search-results-box { max-height: 200px; overflow-y: auto; background: #1a2130; border: 1px solid #00e5ff; border-radius: 8px; margin-top: 5px; position: absolute; width: calc(100% - 40px); z-index: 100; display: none; }
  .search-item { padding: 10px 15px; border-bottom: 1px solid rgba(255,255,255,0.05); cursor: pointer; font-size: 13px; color: #fff; display: flex; justify-content: space-between; align-items: center; }
  .search-item:hover { background: rgba(0,229,255,0.1); }
  .search-item-muscle { font-size: 10px; color: #ffaa00; font-weight: 800; text-transform: uppercase; }

  .history-day { background: #111827; margin-bottom: 12px; border-radius: 10px; overflow: hidden; border: 1px solid rgba(255,255,255,0.05); }
  .history-day-header { padding: 15px; background: linear-gradient(90deg, rgba(0,229,255,0.1) 0%, transparent 100%); font-weight: 800; color: #00e5ff; display: flex; justify-content: space-between; cursor: pointer; font-size: 14px; }
  .history-day-content { padding: 15px; display: none; background: rgba(0,0,0,0.3); }

  .iron-welcome-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(10, 15, 25, 0.85); z-index: 9999; display: flex; justify-content: center; align-items: center; opacity: 0; pointer-events: none; transition: opacity 0.4s ease; backdrop-filter: blur(8px); }
  .iron-welcome-overlay.active { opacity: 1; pointer-events: auto; }
  .iron-welcome-modal { background: linear-gradient(145deg, #111827, #1a2130); padding: 35px 25px; border-radius: 15px; border: 1px solid #00e5ff; box-shadow: 0 10px 40px rgba(0, 229, 255, 0.15); text-align: center; max-width: 90%; width: 380px; transform: translateY(30px); transition: transform 0.4s ease; }
  .iron-welcome-overlay.active .iron-welcome-modal { transform: translateY(0); }
  .iron-welcome-title { font-size: 18px; font-weight: 900; color: #fff; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px; }
  .iron-welcome-quote { font-size: 14px; color: #9ca3af; font-style: italic; margin-bottom: 25px; line-height: 1.6; }
  
  .macro-progress-container { width: 100%; height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; margin-top: 6px; overflow: hidden; }
  .macro-progress-fill { height: 100%; border-radius: 3px; transition: width 0.6s ease-out; }

  /* Estilos del Muro Social */
  .social-post-card { background: #111827; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
  .social-post-header { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .social-post-avatar { width: 35px; height: 35px; border-radius: 50%; border: 1px solid #00e5ff; }
  .social-post-body { font-size: 13px; color: #e5e7eb; line-height: 1.5; margin-bottom: 10px; }
  .social-post-img { width: 100%; max-height: 250px; object-fit: cover; border-radius: 8px; margin-top: 8px; border: 1px solid rgba(255,255,255,0.1); }
`;
const styleEl = document.createElement('style'); styleEl.innerHTML = customCSS; document.head.appendChild(styleEl);

document.addEventListener('DOMContentLoaded', () => {
  const allElements = document.querySelectorAll('span, p, div, h1, h2, h3, h4, h5, h6');
  allElements.forEach(el => {
    if(el.childNodes.length === 1 && el.innerText && el.innerText.toUpperCase().includes('ELITE PERFORMANCE SYSTEM')) { el.style.display = 'none'; }
  });
  
  const rankElem = document.getElementById('header-rank'); const streakElem = document.getElementById('header-streak');
  if(rankElem && streakElem) {
    const parent = rankElem.parentElement; parent.classList.add('user-badges-row');
    rankElem.classList.add('user-badge-mini'); streakElem.classList.add('user-badge-mini');
  }

  const genBtn = document.getElementById('btn-generar-rutina');
  if(genBtn && !document.getElementById('check-warmup')) {
    const fasesDiv = document.createElement('div');
    fasesDiv.innerHTML = `
      <div style="display:flex; justify-content:space-between; margin-bottom:15px; background: rgba(0,0,0,0.3); padding: 12px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.1);">
        <label style="color:#ffaa00; font-size:12px; font-weight:800; display:flex; align-items:center; gap:8px; cursor:pointer;">
          <input type="checkbox" id="check-warmup" checked style="accent-color:#ffaa00; width:16px; height:16px;"> 🔥 Calentamiento
        </label>
        <label style="color:#00e5ff; font-size:12px; font-weight:800; display:flex; align-items:center; gap:8px; cursor:pointer;">
          <input type="checkbox" id="check-cooldown" checked style="accent-color:#00e5ff; width:16px; height:16px;"> ❄️ Enfriamiento
        </label>
      </div>
    `;
    genBtn.parentNode.insertBefore(fasesDiv, genBtn);
  }
});

// --- IMPORTACIÓN FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy, limit, where } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAK3QRT5FOqe9q-hxI3NWtTvZT2uGGLCTU",
  authDomain: "ironcoreapp-66a12.firebaseapp.com",
  projectId: "ironcoreapp-66a12",
  storageBucket: "ironcoreapp-66a12.firebasestorage.app",
  messagingSenderId: "673931910641",
  appId: "1:673931910641:web:eb3d5a830cbcd31fc6f850"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
let currentUser = null;

// --- ESTADO Y BIOMETRÍA ---
let totalCalorias = 0, totalProt = 0, totalCarb = 0, totalGrasa = 0, totalAgua = 0, totalQuemadas = 0, userStreak = 1;
let metaCalorias = 2500, metaProt = 165, metaCarb = 275, metaGrasa = 69;
let currentRankName = "Ashigaru";
let userProfile = { perfilCompleto: false, nickname: "", genero: "M", edad: 25, peso: 75, altura: 175, metaObj: 0, actividad: 1.55 };

function getTodayKey() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function showToast(msg) { const toast = document.getElementById('toast-notif'); if(!toast) return; toast.innerHTML = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3500); }

// --- TIPS Y MODAL MOTIVACIONAL ---
const ironCoreTips = [
  "⚡ La creatina (5g) funciona por acumulación. Tómatela a diario.",
  "🥩 Hipertrofia: Consume entre 1.8g y 2.2g de proteína por kilo.",
  "💧 Hidratación: Toma 1 litro por cada 25kg de peso corporal.",
  "💤 El músculo crece mientras duermes. Busca 7-8 horas de descanso.",
  "🔥 En déficit, prioriza alimentos voluminosos para engañar la saciedad."
];
function setDailyTip() { const dt = document.getElementById('daily-tip'); if(dt) dt.innerText = ironCoreTips[Math.floor(Math.random() * ironCoreTips.length)]; }
if(document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', setDailyTip); } else { setDailyTip(); }

const oraculoQuotes = [
  "La disciplina es el puente entre tus metas y tus logros.", "El hierro no miente. Te da exactamente lo que le pones.", "Cada repetición es un paso más hacia tu mejor versión.", 
  "Controla tu cuerpo en el espacio. La gravedad es solo otra resistencia a vencer.", "El dolor de hoy es la victoria del mañana.", "La constancia siempre vence a la intensidad esporádica.", 
  "Tu mente se rendirá mil veces antes de que tu cuerpo realmente falle.", "El crecimiento está al otro lado de la incomodidad.", "La verdadera maestría es dominar lo básico repetidamente.", 
  "Las excusas no queman calorías.", "Convierte la presión operativa en potencia de empuje."
];

function mostrarMensajeMotivacional() {
  if (sessionStorage.getItem('ironcore_welcome_shown')) return; 
  const overlay = document.createElement('div');
  overlay.className = 'iron-welcome-overlay';
  overlay.innerHTML = `
    <div class="iron-welcome-modal">
      <div class="iron-welcome-title">⚔️ LA JORNADA COMIENZA</div>
      <div class="iron-welcome-quote">"${oraculoQuotes[Math.floor(Math.random() * oraculoQuotes.length)]}"</div>
      <button class="iron-btn-warning" style="width: 100%; margin-top:10px;" onclick="this.parentElement.parentElement.classList.remove('active'); setTimeout(() => this.parentElement.parentElement.remove(), 400);">Entendido</button>
    </div>
  `;
  document.body.appendChild(overlay);
  setTimeout(() => { overlay.classList.add('active'); }, 100);
  sessionStorage.setItem('ironcore_welcome_shown', 'true');
}

// --- AUTENTICACIÓN GOOGLE ---
const authScreen = document.getElementById('auth-screen');
getRedirectResult(auth).then((result) => { if (result && result.user) showToast('⚔️ ¡Acceso autorizado!'); }).catch(console.error);
document.getElementById('btn-google-login')?.addEventListener('click', async () => {
  showToast('🔄 Conectando...'); const provider = new GoogleAuthProvider(); provider.setCustomParameters({ prompt: 'select_account' });
  try { await signInWithPopup(auth, provider); showToast('⚔️ ¡Acceso autorizado!'); } catch(error) { await signInWithRedirect(auth, provider); }
});
document.getElementById('btn-logout')?.addEventListener('click', () => { sessionStorage.removeItem('ironcore_welcome_shown'); signOut(auth); });
document.getElementById('btn-logout-profile')?.addEventListener('click', () => { sessionStorage.removeItem('ironcore_welcome_shown'); signOut(auth); });

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user; if(authScreen) authScreen.style.display = 'none'; 
    const nickElem = document.getElementById('ob-nickname'); if(nickElem) nickElem.value = (user.displayName || "Guerrero").split(' ')[0]; 
    await cargarDatosDesdeNube(user.uid);
    mostrarMensajeMotivacional(); 
  } else { 
    currentUser = null; if(authScreen) authScreen.style.display = 'flex'; 
    const wb = document.getElementById('user-welcome-box'); if(wb) wb.style.display = 'none'; 
  }
});

function generarAvatarPorRango(nickname, rango) {
  let bg = "111827"; if(rango === "Rōnin") bg = "ffaa00"; if(rango === "Samurái") bg = "ff3366"; if(rango === "Daimyō") bg = "9933ff"; if(rango === "IRON SHŌGUN") bg = "00e5ff";
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${nickname}-${rango}&backgroundColor=${bg}`;
}

// --- ONBOARDING Y FIREBASE ---
const obScreen = document.getElementById('onboarding-screen'); const obTrack = document.getElementById('ob-track'); const obBar = document.getElementById('ob-bar'); let currentObStep = 0;
window.abrirOnboarding = function(isEdit = false) { 
  if(!obScreen) return; obScreen.style.display = 'flex'; currentObStep = 0; if(obTrack) obTrack.style.transform = `translateX(0%)`; if(obBar) obBar.style.width = '33.33%'; 
  if(isEdit) { 
    const t = document.getElementById('ob-title'); if(t) t.innerText = "Editar Credencial"; 
    const nick = document.getElementById('ob-nickname'); if(nick) nick.value = userProfile.nickname; 
    window.seleccionarGenero(userProfile.genero); 
    const ed = document.getElementById('ob-edad'); if(ed) ed.value = userProfile.edad; 
    const pe = document.getElementById('ob-peso'); if(pe) pe.value = userProfile.peso; 
    const al = document.getElementById('ob-altura'); if(al) al.value = userProfile.altura;
  } else { const t = document.getElementById('ob-title'); if(t) t.innerText = "Ritual de Iniciación"; } 
};
window.moverOnboarding = function(dir) { 
  if(dir === 1 && currentObStep === 0) { const nickVal = document.getElementById('ob-nickname')?.value.trim(); if(!nickVal) { showToast('⚠️ Elige un apodo.'); return; } } 
  currentObStep += dir; if(currentObStep < 0) currentObStep = 0; if(currentObStep > 2) currentObStep = 2; 
  if(obTrack) obTrack.style.transform = `translateX(-${currentObStep * 33.333}%)`; if(obBar) obBar.style.width = `${(currentObStep + 1) * 33.33}%`; 
};
window.seleccionarGenero = function(gen) { userProfile.genero = gen; document.querySelectorAll('.ob-gender-btn').forEach(b => { if(b.getAttribute('data-gen') === gen) b.classList.add('active'); else b.classList.remove('active'); }); };
window.seleccionarMetaOb = function(elem) { document.querySelectorAll('.ob-goal-card').forEach(c => c.classList.remove('active')); elem.classList.add('active'); userProfile.metaObj = parseInt(elem.getAttribute('data-val')); };

window.finalizarOnboarding = async function() {
  const nickInput = document.getElementById('ob-nickname'); 
  const desiredNick = nickInput?.value.trim().toLowerCase() || "guerrero";
  
  if (currentUser && db) {
    const q = query(collection(db, "users"), where("nickname_lower", "==", desiredNick));
    const snap = await getDocs(q);
    if (!snap.empty && snap.docs[0].id !== currentUser.uid) {
      showToast("⚠️ Ese apodo ya está en uso. Elige otro.");
      return;
    }
  }

  userProfile.nickname = nickInput?.value.trim() || "Guerrero"; 
  userProfile.nickname_lower = desiredNick;
  userProfile.edad = parseInt(document.getElementById('ob-edad')?.value) || 25; 
  userProfile.peso = parseFloat(document.getElementById('ob-peso')?.value) || 75; 
  userProfile.altura = parseInt(document.getElementById('ob-altura')?.value) || 175;
  userProfile.actividad = parseFloat(document.getElementById('select-actividad')?.getAttribute('data-val')) || 1.55;
  userProfile.perfilCompleto = true;
  
  let tmb = userProfile.genero === 'M' ? (10 * userProfile.peso) + (6.25 * userProfile.altura) - (5 * userProfile.edad) + 5 : (10 * userProfile.peso) + (6.25 * userProfile.altura) - (5 * userProfile.edad) - 161;
  let tdee = tmb * userProfile.actividad;
  metaCalorias = Math.round(tdee + (userProfile.metaObj || 0));
  metaProt = (userProfile.metaObj || 0) > 0 ? Math.round(userProfile.peso * 2.0) : Math.round(userProfile.peso * 2.2);
  metaGrasa = Math.round((metaCalorias * 0.25) / 9);
  metaCarb = Math.round((metaCalorias - ((metaProt * 4) + (metaGrasa * 9))) / 4);

  await guardarEstadoNube(); actualizarUIHeader(); actualizarUIPerfil(); actualizarDashboard(); 
  if(obScreen) obScreen.style.display = 'none';
  showToast(`✅ Credencial Sincronizada`); document.querySelector('[data-target="page-dashboard"]')?.click();
};

async function guardarEstadoNube() { 
  if(!currentUser || !db) return; 
  try { await setDoc(doc(db, "users", currentUser.uid), { calorias: totalCalorias, proteina: totalProt, carbos: totalCarb, grasa: totalGrasa, agua: totalAgua, quemadas: totalQuemadas, metaCal: metaCalorias, metaProt: metaProt, metaCarb: metaCarb, metaGrasa: metaGrasa, streak: userStreak, ultimaFecha: localStorage.getItem('ic_ultima_fecha'), currentRankName, ...userProfile }, { merge: true }); } catch(e) { console.error(e); } 
}

async function cargarDatosDesdeNube(uid) { 
  if(!db) return; const docSnap = await getDoc(doc(db, "users", uid)); 
  if (docSnap.exists()) { 
    const d = docSnap.data(); 
    totalCalorias = d.calorias || 0; totalProt = d.proteina || 0; totalCarb = d.carbos || 0; totalGrasa = d.grasa || 0; totalAgua = d.agua || 0; totalQuemadas = d.quemadas || 0;
    metaCalorias = d.metaCal || 2500; metaProt = d.metaProt || 165; metaCarb = d.metaCarb || 275; metaGrasa = d.metaGrasa || 69; userStreak = d.streak || 1;
    userProfile.perfilCompleto = d.perfilCompleto || false; userProfile.nickname = d.nickname || ""; userProfile.genero = d.genero || "M"; userProfile.edad = d.edad || 25; userProfile.peso = d.peso || 75; userProfile.altura = d.altura || 175; userProfile.metaObj = d.metaObj !== undefined ? d.metaObj : 0; userProfile.actividad = d.actividad || 1.55; currentRankName = d.currentRankName || "Ashigaru"; 
  } 
  if(!userProfile.perfilCompleto) { window.abrirOnboarding(false); } else { actualizarUIHeader(); actualizarUIPerfil(); } 
  iniciarSakuraBackground(); verificarCambioDeDia(); actualizarDashboard(); actualizarAguaUI(); await cargarRegistrosDelDia(uid); await cargarHistorialYCheckins(uid); 
}

function actualizarUIHeader() { 
  const dn = document.getElementById('user-display-name'); if(dn) dn.innerText = userProfile.nickname.toUpperCase(); 
  const avatarHeader = document.getElementById('user-avatar'); 
  if(avatarHeader) { avatarHeader.src = generarAvatarPorRango(userProfile.nickname, currentRankName); avatarHeader.style.display = 'inline-block'; }
  const wb = document.getElementById('user-welcome-box'); if(wb) wb.style.display = 'flex'; 
}

function actualizarUIPerfil() { 
  const cn = document.getElementById('profile-card-name'); if(cn) cn.innerText = userProfile.nickname.toUpperCase(); 
  const vp = document.getElementById('profile-val-peso'); if(vp) vp.innerText = `${userProfile.peso} kg`; 
  const va = document.getElementById('profile-val-altura'); if(va) va.innerText = `${userProfile.altura} cm`; 
  const ve = document.getElementById('profile-val-edad'); if(ve) ve.innerText = `${userProfile.edad} años`; 
  const vg = document.getElementById('profile-val-genero'); if(vg) vg.innerText = userProfile.genero === 'M' ? 'Hombre' : 'Mujer'; 
  
  let labelMeta = "Mantenimiento"; 
  if(userProfile.metaObj === -500) labelMeta = "Déficit Agresivo"; 
  if(userProfile.metaObj === -300) labelMeta = "Definición"; 
  if(userProfile.metaObj === 300) labelMeta = "Volumen"; 
  const cg = document.getElementById('profile-card-goal'); if(cg) cg.innerText = `Meta: ${labelMeta}`; 
  const ca = document.getElementById('profile-card-avatar'); if(ca) ca.src = generarAvatarPorRango(userProfile.nickname, currentRankName); 
}

// --- BASES DE DATOS EXTERNAS ---
let exercisesDB = [];
async function inicializarBases() {
  try { const resEx = await fetch('ejercicios.json?v=' + Date.now()); if (!resEx.ok) throw new Error('No se pudo cargar ejercicios.json'); exercisesDB = await resEx.json(); console.log(`⚔️ Base sincronizada con ${exercisesDB.length} ejercicios.`); } catch (error) { console.error("Error cargando ejercicios.json:", error); }
}
inicializarBases();

// --- GRÁFICO DE PERFIL ---
let profileChartInstance = null;
function dibujarGraficoPerfil(historialPesos) {
  const tabProfile = document.getElementById('page-profile');
  if(!tabProfile) return;

  let canvasWrapper = document.getElementById('wrapper-profile-chart');
  if(!canvasWrapper) {
    canvasWrapper = document.createElement('div');
    canvasWrapper.id = 'wrapper-profile-chart';
    canvasWrapper.innerHTML = `
      <div style="background: #111827; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; margin-top: 20px; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
        <h4 style="font-size: 12px; color: #9ca3af; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 15px;">📊 Evolución de Masa Corporal</h4>
        <div style="height: 200px; width: 100%;"><canvas id="profile-chart-canvas"></canvas></div>
      </div>
    `;
    tabProfile.appendChild(canvasWrapper);
  }

  const ctx = document.getElementById('profile-chart-canvas');
  if(!ctx) return;
  if(profileChartInstance) profileChartInstance.destroy();

  const labels = historialPesos.map(item => item.fecha.split('-').slice(1).join('/')); 
  const data = historialPesos.map(item => item.peso);

  profileChartInstance = new Chart(ctx.getContext('2d'), {
    type: 'line',
    data: {
      labels: labels.reverse(),
      datasets: [{
        label: 'Peso (kg)',
        data: data.reverse(),
        borderColor: '#00e5ff',
        backgroundColor: 'rgba(0, 229, 255, 0.1)',
        borderWidth: 3, fill: true, tension: 0.4, pointBackgroundColor: '#ffaa00', pointRadius: 4
      }]
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } }
  });
}

// --- LEADERBOARD ---
const rangos = [ 
  { nombre: "Ashigaru", minRatio: 0, color: "#6b7c93" }, 
  { nombre: "Rōnin", minRatio: 1.5, color: "#ffaa00" }, 
  { nombre: "Samurái", minRatio: 2.5, color: "#ff3366" }, 
  { nombre: "Daimyō", minRatio: 3.5, color: "#9933ff" }, 
  { nombre: "IRON SHŌGUN", minRatio: 4.5, color: "#00e5ff" } 
];

document.getElementById('btn-calcular-rango')?.addEventListener('click', async () => { 
  const bench = parseFloat(document.getElementById('rm-bench')?.value) || 0; 
  const squat = parseFloat(document.getElementById('rm-squat')?.value) || 0; 
  const deadlift = parseFloat(document.getElementById('rm-deadlift')?.value) || 0; 
  if(bench === 0 && squat === 0 && deadlift === 0) { showToast('⚠️ Ingresa marcas.'); return; } 
  const total = bench + squat + deadlift; 
  const ratio = parseFloat((total / userProfile.peso).toFixed(2)); 
  let rango = rangos[0], prog = 0; 
  for(let i=0; i<rangos.length; i++) { 
    if(ratio >= rangos[i].minRatio) { 
      rango = rangos[i]; 
      prog = i < rangos.length - 1 ? ((ratio - rangos[i].minRatio) / (rangos[i+1].minRatio - rangos[i].minRatio)) * 100 : 100; 
    } 
  } 
  const rt = document.getElementById('rango-titulo'); if(rt) { rt.innerText = rango.nombre; rt.style.color = rango.color; }
  const rm = document.getElementById('rango-multi'); if(rm) rm.innerText = `${ratio}x`; 
  const rtot = document.getElementById('rango-total'); if(rtot) rtot.innerText = total; 
  const rp = document.getElementById('rango-progreso'); if(rp) { rp.style.width = `${prog}%`; rp.style.backgroundColor = rango.color; }
  const hr = document.getElementById('header-rank'); if(hr) hr.innerHTML = `<span style="color: ${rango.color};">${rango.nombre.toUpperCase()}</span>`; 
  currentRankName = rango.nombre; 
  actualizarUIHeader(); actualizarUIPerfil(); 
  if(currentUser && db) { 
    try { 
      await setDoc(doc(db, "leaderboard", currentUser.uid), { 
        userId: currentUser.uid, nombre: userProfile.nickname, foto: currentUser.photoURL || "", 
        multiplicador: ratio, totalKg: total, pesoCorporal: userProfile.peso, rango: rango.nombre, 
        colorRango: rango.color, updatedAt: Date.now() 
      }, { merge: true }); 
      showToast(`⚔️ ¡Ranking Actualizado!`); 
      await guardarEstadoNube(); 
      cargarLeaderboard();
    } catch(e) { console.error(e); } 
  } 
});

async function cargarLeaderboard() { 
  const container = document.getElementById('leaderboard-list'); 
  if(!container || !db) return; 
  container.innerHTML = `<p style="font-size: 12px; color: #9ca3af; text-align: center;">Cargando guerreros...</p>`; 
  try { 
    const q = query(collection(db, "leaderboard"), orderBy("multiplicador", "desc"), limit(20)); 
    const snapshot = await getDocs(q); 
    if(snapshot.empty) { 
      container.innerHTML = `<p style="font-size: 12px; color: #9ca3af; text-align: center;">El dojo está vacío.</p>"; 
      return; 
    } 
    let html = "", pos = 1; 
    snapshot.forEach(docSnap => { 
      const d = docSnap.data(); 
      const topClass = pos===1?"top-1":pos===2?"top-2":pos===3?"top-3":""; 
      const medal = pos===1?"🥇":pos===2?"🥈":pos===3?"🥉":`#${pos}`; 
      html += `<div class="leaderboard-item ${topClass}"><div class="lb-rank-num">${medal}</div><div class="lb-user-info"><img class="lb-avatar" src="${generarAvatarPorRango(d.nombre, d.rango)}"><div><span class="lb-name">${d.nombre}</span><span class="lb-badge" style="color: ${d.colorRango};">${d.rango}</span></div></div><div class="lb-score"><span class="lb-multiplier">${d.multiplicador}x</span><span class="lb-kg">${d.totalKg} kg</span></div></div>`; 
      pos++; 
    }); 
    container.innerHTML = html; 
  } catch(e) { 
    container.innerHTML = `<p style="font-size: 12px; color: #ff3366; text-align: center;">Error al cargar.</p>`; 
  } 
}
document.getElementById('btn-refresh-leaderboard')?.addEventListener('click', cargarLeaderboard);

// --- MÓDULO SOCIAL, AMIGOS Y MURO (FEED) PRIVADO ---
function inyectarModuloSocial() {
  const tabProfile = document.getElementById('page-profile');
  if(!tabProfile || document.getElementById('social-friends-card')) return;

  const socialCard = document.createElement('div');
  socialCard.id = 'social-friends-card';
  socialCard.innerHTML = `
    <div style="background: #111827; border: 1px solid rgba(255,255,255,0.05); border-radius: 12px; padding: 15px; margin-top: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);">
      <h4 style="font-size: 12px; color: #00e5ff; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 12px;">👥 Cofradía de Amigos (Social)</h4>
      <div style="display:flex; gap:8px; margin-bottom:12px;">
        <input type="text" id="input-search-friend" class="iron-input-modern" placeholder="Apodo exacto del amigo..." style="font-size:12px; padding:8px 12px;">
        <button id="btn-search-friend" class="iron-btn-primary" style="width:auto; margin-top:0; padding:8px 15px; font-size:12px;">Buscar</button>
      </div>
      <div id="friend-search-result" style="margin-bottom:15px;"></div>
      
      <h5 style="font-size: 11px; color: #ffaa00; text-transform: uppercase; font-weight: 800; margin-bottom: 8px;">📩 Solicitudes Pendientes</h5>
      <div id="friend-requests-list" style="font-size:12px; color:#9ca3af;">Buscando solicitudes...</div>
      
      <h5 style="font-size: 11px; color: #00e5ff; text-transform: uppercase; font-weight: 800; margin: 15px 0 8px 0;">⚔️ Tus Amigos Conectados</h5>
      <div id="my-friends-list" style="font-size:12px; color:#9ca3af;">No hay amigos en la cofradía aún.</div>

      <!-- MURO SOCIAL (FEED) -->
      <div style="margin-top: 25px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
        <h4 style="font-size: 12px; color: #ffaa00; text-transform: uppercase; font-weight: 800; letter-spacing: 1px; margin-bottom: 10px;">📰 Muro de la Cofradía</h4>
        <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 8px; margin-bottom: 15px;">
          <textarea id="social-post-text" class="iron-input-modern" placeholder="Comparte tu progreso o rutina con la cofradía..." style="height: 60px; font-size:12px; resize:none;"></textarea>
          <button id="btn-publish-social" class="iron-btn-primary" style="padding: 8px; font-size:12px; margin-top:8px;">📢 Publicar en el Muro</button>
        </div>
        <div id="social-feed-container">Cargando muro...</div>
      </div>
    </div>
  `;
  tabProfile.appendChild(socialCard);

  document.getElementById('btn-search-friend')?.addEventListener('click', async () => {
    const val = document.getElementById('input-search-friend').value.trim().toLowerCase();
    const resBox = document.getElementById('friend-search-result');
    if(!val) return;
    resBox.innerHTML = '<p style="font-size:11px; color:#9ca3af;">Rastreando guerrero...</p>';

    try {
      const q = query(collection(db, "users"), where("nickname_lower", "==", val));
      const snap = await getDocs(q);
      if(snap.empty) {
        resBox.innerHTML = '<p style="font-size:11px; color:#ff3366;">❌ No se encontró ningún guerrero.</p>';
        return;
      }
      const friendDocId = snap.docs[0].id;
      const friendData = snap.docs[0].data();

      if(friendDocId === currentUser.uid) {
        resBox.innerHTML = '<p style="font-size:11px; color:#ffaa00;">⚠️ ¡Ese eres tú mismo!</p>';
        return;
      }

      resBox.innerHTML = `
        <div style="background:rgba(0,229,255,0.05); border:1px solid rgba(0,229,255,0.2); padding:10px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
          <div>
            <b style="color:#fff; font-size:13px;">${friendData.nickname}</b><br>
            <span style="font-size:10px; color:#ffaa00;">Rango: ${friendData.currentRankName || 'Ashigaru'}</span>
          </div>
          <button id="btn-send-req" class="iron-btn-warning" style="width:auto; padding:5px 10px; font-size:11px;">+ Enviar Solicitud</button>
        </div>
      `;

      document.getElementById('btn-send-req').onclick = async () => {
        try {
          await addDoc(collection(db, "users", friendDocId, "friend_requests"), {
            fromUid: currentUser.uid,
            fromNickname: userProfile.nickname,
            status: "pendiente",
            timestamp: Date.now()
          });
          showToast("✅ Solicitud enviada con éxito.");
          resBox.innerHTML = '';
        } catch(e) {
          showToast("❌ Error al enviar solicitud. Revisa permisos.");
        }
      };

    } catch(err) {
      resBox.innerHTML = '<p style="font-size:11px; color:#ff3366;">Error de conexión.</p>';
    }
  });

  document.getElementById('btn-publish-social')?.addEventListener('click', async () => {
    const txt = document.getElementById('social-post-text').value.trim();
    if(!txt) return;
    try {
      await addDoc(collection(db, "social_posts"), {
        uid: currentUser.uid,
        author: userProfile.nickname,
        rango: currentRankName,
        content: txt,
        timestamp: Date.now()
      });
      document.getElementById('social-post-text').value = '';
      showToast("📢 ¡Publicado en el muro!");
      cargarMuroSocial();
    } catch(e) {
      showToast("❌ Error al publicar.");
    }
  });

  cargarSolicitudesYAmigos();
  cargarMuroSocial();
}

async function cargarSolicitudesYAmigos() {
  if(!currentUser || !db) return;
  const reqContainer = document.getElementById('friend-requests-list');
  const friendsContainer = document.getElementById('my-friends-list');

  try {
    const reqSnap = await getDocs(collection(db, "users", currentUser.uid, "friend_requests"));
    let reqHtml = '';
    reqSnap.forEach(d => {
      let req = d.data();
      if(req.status === 'pendiente') {
        reqHtml += `
          <div style="background:rgba(255,170,0,0.05); border:1px solid rgba(255,170,0,0.2); padding:8px; border-radius:6px; display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
            <span><b>${req.fromNickname}</b> quiere unirse a tu cofradía</span>
            <button onclick="window.aceptarSolicitud('${d.id}', '${req.fromUid}', '${req.fromNickname}')" style="background:#00e5ff; border:none; padding:4px 8px; border-radius:4px; font-weight:bold; cursor:pointer; color:#111827;">Aceptar</button>
          </div>
        `;
      }
    });
    if(reqContainer) reqContainer.innerHTML = reqHtml || 'No hay solicitudes pendientes.';

    const friendsSnap = await getDocs(collection(db, "users", currentUser.uid, "friends"));
    let friendHtml = '';
    friendsSnap.forEach(d => {
      let f = d.data();
      friendHtml += `
        <div style="background:rgba(0,229,255,0.05); border:1px solid rgba(0,229,255,0.2); padding:8px; border-radius:6px; margin-bottom:5px; display:flex; justify-content:space-between; align-items:center;">
          <span>⚔️ <b>${f.friendNickname}</b></span>
          <button onclick="window.verPerfilAmigo('${f.friendUid}')" style="background:transparent; color:#00e5ff; border:1px solid #00e5ff; padding:3px 8px; border-radius:4px; font-size:10px; cursor:pointer;">Ver Expediente</button>
        </div>
      `;
    });
    if(friendsContainer) friendsContainer.innerHTML = friendHtml || 'Aún no tienes amigos en la cofradía.';
  } catch(e) { console.error(e); }
}

async function cargarMuroSocial() {
  const feedContainer = document.getElementById('social-feed-container');
  if(!feedContainer || !db) return;
  try {
    const q = query(collection(db, "social_posts"), orderBy("timestamp", "desc"), limit(20));
    const snaps = await getDocs(q);
    let html = '';
    snaps.forEach(d => {
      let post = d.data();
      html += `
        <div class="social-post-card">
          <div class="social-post-header">
            <img class="social-post-avatar" src="${generarAvatarPorRango(post.author, post.rango || 'Ashigaru')}">
            <div>
              <b style="color:#fff; font-size:13px;">${post.author}</b><br>
              <span style="font-size:9px; color:#ffaa00;">${post.rango || 'Guerrero'} • ${new Date(post.timestamp).toLocaleDateString()}</span>
            </div>
          </div>
          <div class="social-post-body">${post.content}</div>
        </div>
      `;
    });
    feedContainer.innerHTML = html || '<p style="font-size:12px; color:#9ca3af; text-align:center;">El muro está silencioso. ¡Sé el primero en publicar!</p>';
  } catch(e) {
    feedContainer.innerHTML = '<p style="font-size:12px; color:#ff3366;">Error cargando muro social.</p>';
  }
}

window.aceptarSolicitud = async function(reqDocId, fromUid, fromNickname) {
  await addDoc(collection(db, "users", currentUser.uid, "friends"), { friendUid: fromUid, friendNickname: fromNickname, timestamp: Date.now() });
  await addDoc(collection(db, "users", fromUid, "friends"), { friendUid: currentUser.uid, friendNickname: userProfile.nickname, timestamp: Date.now() });
  await deleteDoc(doc(db, "users", currentUser.uid, "friend_requests", reqDocId));
  showToast(`⚔️ ¡Ahora ${fromNickname} es parte de tu cofradía!`);
  cargarHistorialYCheckins(currentUser.uid);
};

window.verPerfilAmigo = async function(friendUid) {
  const docSnap = await getDoc(doc(db, "users", friendUid));
  if(!docSnap.exists()) { showToast("⚠️ No se encontró al usuario."); return; }
  const data = docSnap.data();

  const container = document.getElementById('sheet-workout');
  if(!container) return;
  container.innerHTML = `
    <div style="padding:20px; text-align:center;">
      <img src="${generarAvatarPorRango(data.nickname, data.currentRankName || 'Ashigaru')}" style="width:70px; height:70px; border-radius:50%; border:2px solid #00e5ff; margin-bottom:10px;">
      <h3 style="color:#fff; font-weight:900; text-transform:uppercase;">${data.nickname}</h3>
      <p style="color:#ffaa00; font-size:12px; font-weight:bold; margin-bottom:15px;">Rango: ${data.currentRankName || 'Ashigaru'}</p>
      <div style="background:#111827; padding:12px; border-radius:8px; text-align:left; font-size:12px; color:#9ca3af; margin-bottom:15px;">
        <p><b>Peso Actual:</b> ${data.peso || '--'} kg</p>
        <p><b>Altura:</b> ${data.altura || '--'} cm</p>
        <p><b>Meta:</b> ${data.metaObj === 300 ? 'Volumen' : 'Definición / Mantenimiento'}</p>
      </div>
      <button class="iron-btn-primary" onclick="window.closeSheet()">Cerrar Expediente</button>
    </div>
  `;
  window.openSheet('sheet-workout');
};

// --- MODO ENTRENAMIENTO EN VIVO ---
let currentWorkoutRoutine = [];
let activeTimers = {}; 

document.getElementById('btn-generar-rutina')?.addEventListener('click', () => {
  if(exercisesDB.length === 0) { showToast('⚠️ Espera, sincronizando ejercicios...'); return; }
  const equip = document.getElementById('train-equip')?.value || 'gimnasio'; const focus = document.getElementById('train-focus')?.value || 'fullbody';
  currentWorkoutRoutine = [];
  const checkWarm = document.getElementById('check-warmup');
  if(checkWarm && checkWarm.checked) { currentWorkoutRoutine.push({ id: 'warmup', nombre: '🔥 Calentamiento Articular', grupo: 'cardio', musculoPrincipal: 'Todo el cuerpo', equipamiento: ['corporal'], tips: '5 a 10 min de movilidad.', imagen: 'https://dummyimage.com/400x400/111827/ffaa00&text=Calentamiento', loggedSets: [], isPhase: true }); }
  const getRandomEx = (grupoReq) => {
    const valid = exercisesDB.filter(ex => { const matchGrupo = ex.grupo?.toLowerCase() === grupoReq.toLowerCase(); const matchEquip = Array.isArray(ex.equipamiento) ? ex.equipamiento.some(eq => eq.toLowerCase().includes(equip.toLowerCase())) : true; return matchGrupo && matchEquip; });
    if(valid.length === 0) { const fallbackGrupo = exercisesDB.filter(ex => ex.grupo?.toLowerCase() === grupoReq.toLowerCase()); return fallbackGrupo.length > 0 ? fallbackGrupo[Math.floor(Math.random() * fallbackGrupo.length)] : null; }
    return valid[Math.floor(Math.random() * valid.length)];
  };
  let structure = [];
  if(focus === "fullbody") structure = ["piernas", "pecho", "espalda", "hombros", "core"];
  if(focus === "superior") structure = ["pecho", "espalda", "hombros", "brazos", "core"];
  if(focus === "piernas") structure = ["piernas", "piernas", "piernas", "core"];
  structure.forEach(g => { let ex = getRandomEx(g); if(ex && !currentWorkoutRoutine.find(e => e.id === ex.id)) { ex.loggedSets = []; ex.estimatedCals = Math.floor(Math.random() * 20) + 35; currentWorkoutRoutine.push(ex); } });
  const checkCool = document.getElementById('check-cooldown');
  if(checkCool && checkCool.checked) { currentWorkoutRoutine.push({ id: 'cooldown', nombre: '❄️ Enfriamiento', grupo: 'cardio', musculoPrincipal: 'Recuperación', equipamiento: ['corporal'], tips: '10 min zona 2 y elongación.', imagen: 'https://dummyimage.com/400x400/111827/00e5ff&text=Enfriamiento', loggedSets: [], isPhase: true }); }
  if(currentWorkoutRoutine.length === 0) { showToast('⚠️ No hay ejercicios en base de datos.'); return; }
  renderizarRutina(false); document.getElementById('workout-generator-card').style.display = 'none'; document.getElementById('workout-live-container').style.display = 'block'; showToast('⚔️ Rutina generada.');
});

function renderizarRutina(isLiveMode) {
  const container = document.getElementById('rutina-generada-lista'); if(!container) return; container.innerHTML = '';
  currentWorkoutRoutine.forEach((ex, idx) => {
    const displayInputs = isLiveMode ? 'block' : 'none';
    const imgSource = ex.imagen && ex.imagen.trim() !== "" ? ex.imagen : `https://dummyimage.com/400x400/111827/00e5ff&text=${encodeURIComponent(ex.nombre)}`;
    ex.loggedSets = ex.loggedSets || []; 

    let html = `
      <div class="plan-meal-card workout-card" style="border: 1px solid rgba(0,229,255,0.2); box-shadow: 0 4px 10px rgba(0,0,0,0.3); padding: 15px; border-radius: 12px; margin-bottom:15px; background: #111827;">
        <div style="margin-bottom:10px;"><span style="font-size:15px; font-weight:900; color:#fff; text-transform:uppercase;">${ex.nombre}</span></div>
        <div style="display:flex; gap:15px; align-items:center;">
          <img src="${imgSource}" style="width:75px; height:75px; border-radius:10px; object-fit:cover; border:2px solid rgba(0,229,255,0.4);">
          <div style="flex:1;">
            <p style="font-size:11px; color:#00e5ff; margin:0 0 5px 0; font-weight:800; text-transform:uppercase;">🎯 ${ex.musculoPrincipal || 'General'}</p>
            <p style="font-size:12px; color:#9ca3af; margin:0; line-height:1.4;">💡 ${ex.tips || 'Mantén la técnica estricta.'}</p>
          </div>
        </div>
    `;

    if (isLiveMode) {
      let seriesHTML = ex.loggedSets.map((s, i) => `<li style="margin-bottom:8px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.05); font-size:13px; color:#fff;">Serie ${i+1}: <span style="color:#00e5ff; font-weight:900;">${s.reps} ${!ex.isPhase ? `reps x ${s.peso} kg` : `min`}</span></li>`).join('');
      html += `
        <div class="workout-inputs" style="display:${displayInputs}; background: rgba(0,0,0,0.4); padding: 15px; border-radius: 10px; margin-top:15px; border:1px solid rgba(255,255,255,0.05);">
          <div style="display:flex; gap:10px; margin-bottom:15px;">
            <div style="flex:1;"><label style="font-size:10px; color:#9ca3af; font-weight:bold; display:block; margin-bottom:4px;">${ex.isPhase?'MIN':'REPES'}</label><input type="number" id="reps-${idx}" class="iron-input-modern" placeholder="10"></div>
            ${!ex.isPhase ? `<div style="flex:1;"><label style="font-size:10px; color:#9ca3af; font-weight:bold; display:block; margin-bottom:4px;">PESO</label><input type="number" id="peso-${idx}" class="iron-input-modern" placeholder="50"></div>` : ''}
            <div style="flex:1;"><label style="font-size:10px; color:#9ca3af; font-weight:bold; display:block; margin-bottom:4px;">DESC(s)</label><input type="number" id="descanso-${idx}" class="iron-input-modern" value="90"></div>
          </div>
          <button class="iron-btn-primary" onclick="window.registrarSerieIndividual(${idx})">✅ Registrar ${ex.isPhase?'Fase':'Serie'}</button>
          <ul id="lista-series-${idx}" style="list-style:none; padding:0; margin:15px 0 0 0;">${seriesHTML}</ul>
          <div id="timer-container-${idx}" style="display:none; text-align:center; background: #1a2130; padding:15px; border-radius:10px; border: 1px dashed #ffaa00; margin-top:15px;">
            <span style="font-size:24px; font-weight:900; color:#ffaa00; display:block; margin-bottom:5px;">⏱️ <span id="time-left-${idx}">0</span>s</span>
            <button class="iron-btn-danger" style="margin-top:0;" onclick="window.terminarDescanso(${idx})">⏹️ Terminar Descanso</button>
          </div>
        </div>
      `;
    }
    html += `</div>`; container.innerHTML += html;
  });
}

window.registrarSerieIndividual = function(idx) {
  const repsInput = document.getElementById(`reps-${idx}`); const pesoInput = document.getElementById(`peso-${idx}`); const descansoInput = document.getElementById(`descanso-${idx}`);
  const ex = currentWorkoutRoutine[idx]; const reps = parseInt(repsInput.value); const peso = pesoInput ? (parseFloat(pesoInput.value) || 0) : 0; const descanso = parseInt(descansoInput.value) || 90;
  if(!reps || reps <= 0) { showToast(`⚠️ Ingresa valor válido.`); return; }
  if(!ex.loggedSets) ex.loggedSets = []; ex.loggedSets.push({ reps, peso });
  const lista = document.getElementById(`lista-series-${idx}`);
  lista.innerHTML += `<li style="margin-bottom:8px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.05); font-size:13px; color:#fff;">Serie ${ex.loggedSets.length}: <span style="color:#00e5ff; font-weight:900;">${reps} ${ex.isPhase?'min':`reps x ${peso} kg`}</span></li>`;
  repsInput.value = ''; window.iniciarDescanso(idx, descanso);
};

window.iniciarDescanso = function(idx, segundos) {
  if(activeTimers[idx]) clearInterval(activeTimers[idx].interval);
  const container = document.getElementById(`timer-container-${idx}`); const textSpan = document.getElementById(`time-left-${idx}`);
  container.style.display = 'block'; let timeLeft = segundos; textSpan.innerText = timeLeft;
  activeTimers[idx] = { interval: setInterval(() => { timeLeft--; if(timeLeft <= 0) { window.terminarDescanso(idx); showToast('⏰ ¡A la batalla!'); } else { textSpan.innerText = timeLeft; } }, 1000) };
};
window.terminarDescanso = function(idx) { if(activeTimers[idx]) { clearInterval(activeTimers[idx].interval); delete activeTimers[idx]; } document.getElementById(`timer-container-${idx}`)?.style.setProperty('display', 'none'); };

document.getElementById('btn-start-workout')?.addEventListener('click', () => { renderizarRutina(true); document.getElementById('btn-start-workout').style.display = 'none'; document.getElementById('btn-finish-workout').style.display = 'block'; showToast('🔥 ¡A darlo todo!'); });

document.getElementById('btn-cancel-workout')?.addEventListener('click', () => {
  for (let idx in activeTimers) clearInterval(activeTimers[idx].interval); activeTimers = {};
  document.getElementById('workout-live-container').style.display = 'none'; document.getElementById('workout-generator-card').style.display = 'block';
  document.getElementById('btn-start-workout').style.display = 'block'; document.getElementById('btn-finish-workout').style.display = 'none'; currentWorkoutRoutine = [];
});

document.getElementById('btn-finish-workout')?.addEventListener('click', async function() {
  if (this.disabled) return; this.disabled = true; 
  let validExercises = 0; let sessionCals = 0;
  for(let i = 0; i < currentWorkoutRoutine.length; i++) {
    const ex = currentWorkoutRoutine[i];
    if(ex.loggedSets && ex.loggedSets.length > 0) {
      const totalSets = ex.loggedSets.length; const detalles = ex.loggedSets.map((s, idx) => `S${idx+1}: ${s.reps}${ex.isPhase?'min':`x${s.peso}kg`}`).join(' | ');
      const weightHighestOrLast = ex.loggedSets[ex.loggedSets.length - 1].peso; 
      let exCals = 0;
      if(ex.isPhase) { let totalMins = 0; ex.loggedSets.forEach(s => totalMins += s.reps); exCals = totalMins * 8; } 
      else { ex.loggedSets.forEach(s => { exCals += 15 + (s.peso * s.reps * 0.03); }); }
      exCals = Math.round(exCals); sessionCals += exCals;
      await registrarEntrenoNube(ex.nombre, `${totalSets} series (${detalles})`, weightHighestOrLast, "N/A", exCals); validExercises++;
    }
  }
  for (let idx in activeTimers) clearInterval(activeTimers[idx].interval); activeTimers = {};
  if(validExercises > 0) { sessionCals = Math.round(sessionCals); totalQuemadas += sessionCals; await guardarEstadoNube(); actualizarDashboard(); showToast(`✅ Entrenamiento finalizado. 🔥 ~${sessionCals} kcal quemadas.`); } 
  else { showToast('⚠️ Entrenamiento descartado.'); }
  document.getElementById('workout-live-container').style.display = 'none'; document.getElementById('workout-generator-card').style.display = 'block';
  document.getElementById('btn-start-workout').style.display = 'block'; document.getElementById('btn-finish-workout').style.display = 'none';
  currentWorkoutRoutine = []; this.disabled = false; 
});

// --- BUSCADOR INTELIGENTE PARA SERIES MANUALES ---
window.abrirBuscadorManual = function() {
  const container = document.getElementById('sheet-workout');
  if(!container) return;
  
  container.innerHTML = `
    <div style="padding: 20px;">
      <h3 style="color:#00e5ff; font-weight:900; text-transform:uppercase; margin-bottom:15px; text-align:center;">Agregar Ejercicio Manual</h3>
      <div style="position:relative;">
        <input type="text" id="search-manual-ex" class="iron-input-modern" placeholder="🔍 Buscar por nombre o músculo..." autocomplete="off">
        <div id="search-manual-results" class="search-results-box"></div>
      </div>
      
      <div id="manual-live-ui" style="display:none; margin-top:20px;">
        <div style="background:#111827; padding:15px; border-radius:10px; border:1px solid rgba(255,255,255,0.05);">
          <h4 id="manual-selected-name" style="color:#fff; font-weight:900; margin-bottom:15px;">Ejercicio Seleccionado</h4>
          <div style="display:flex; gap:10px; margin-bottom:15px;">
            <div style="flex:1;"><label style="font-size:10px; color:#9ca3af; font-weight:bold;">REPES</label><input type="number" id="manual-rep" class="iron-input-modern"></div>
            <div style="flex:1;"><label style="font-size:10px; color:#9ca3af; font-weight:bold;">PESO (KG)</label><input type="number" id="manual-peso" class="iron-input-modern"></div>
            <div style="flex:1;"><label style="font-size:10px; color:#9ca3af; font-weight:bold;">DESC (S)</label><input type="number" id="manual-descanso" class="iron-input-modern" value="90"></div>
          </div>
          <button class="iron-btn-primary" id="btn-add-manual-set">✅ Registrar Serie</button>
          
          <ul id="manual-sets-list" style="list-style:none; padding:0; margin:15px 0 0 0;"></ul>
          
          <div id="manual-timer" style="display:none; text-align:center; background:#1a2130; padding:15px; border-radius:10px; border:1px dashed #ffaa00; margin-top:15px;">
            <span style="font-size:24px; font-weight:900; color:#ffaa00; display:block;">⏱️ <span id="manual-time-left">0</span>s</span>
            <button class="iron-btn-danger" onclick="document.getElementById('manual-timer').style.display='none'; clearInterval(window.manualInterval);">⏹️ Terminar</button>
          </div>
          
          <button class="iron-btn-warning" id="btn-save-manual-workout" style="margin-top:20px; display:none;">💾 GUARDAR EN BITÁCORA</button>
        </div>
      </div>
    </div>
  `;
  window.openSheet('sheet-workout');
  
  const searchInput = document.getElementById('search-manual-ex');
  const resultsBox = document.getElementById('search-manual-results');
  let selectedExercise = null;
  let manualSets = [];

  searchInput.addEventListener('input', function() {
    const queryVal = this.value.toLowerCase();
    resultsBox.innerHTML = '';
    if(queryVal.length < 2) { resultsBox.style.display = 'none'; return; }
    
    const matches = exercisesDB.filter(ex => ex.nombre.toLowerCase().includes(queryVal) || (ex.musculoPrincipal && ex.musculoPrincipal.toLowerCase().includes(queryVal)));
    if(matches.length > 0) {
      resultsBox.style.display = 'block';
      matches.slice(0, 10).forEach(match => {
        const div = document.createElement('div'); div.className = 'search-item';
        div.innerHTML = `<span>${match.nombre}</span> <span class="search-item-muscle">${match.musculoPrincipal || 'General'}</span>`;
        div.onclick = () => {
          selectedExercise = match; manualSets = [];
          searchInput.value = match.nombre; resultsBox.style.display = 'none';
          document.getElementById('manual-live-ui').style.display = 'block';
          document.getElementById('manual-selected-name').innerText = match.nombre;
          document.getElementById('manual-sets-list').innerHTML = '';
          document.getElementById('btn-save-manual-workout').style.display = 'none';
        };
        resultsBox.appendChild(div);
      });
    } else { resultsBox.style.display = 'none'; }
  });

  document.getElementById('btn-add-manual-set').addEventListener('click', () => {
    const r = parseInt(document.getElementById('manual-rep').value); const p = parseFloat(document.getElementById('manual-peso').value) || 0;
    if(!r) return;
    manualSets.push({reps: r, peso: p});
    document.getElementById('manual-sets-list').innerHTML += `<li style="margin-bottom:8px; padding-bottom:8px; border-bottom:1px solid rgba(255,255,255,0.05); font-size:13px; color:#fff;">Serie ${manualSets.length}: <span style="color:#00e5ff; font-weight:900;">${r} reps x ${p} kg</span></li>`;
    document.getElementById('manual-rep').value = ''; document.getElementById('btn-save-manual-workout').style.display = 'block';
    
    const d = parseInt(document.getElementById('manual-descanso').value) || 90;
    document.getElementById('manual-timer').style.display = 'block';
    let timeLeft = d; document.getElementById('manual-time-left').innerText = timeLeft;
    if(window.manualInterval) clearInterval(window.manualInterval);
    window.manualInterval = setInterval(() => {
      timeLeft--; document.getElementById('manual-time-left').innerText = timeLeft;
      if(timeLeft <= 0) { clearInterval(window.manualInterval); document.getElementById('manual-timer').style.display='none'; showToast('⏰ ¡A la batalla!'); }
    }, 1000);
  });

  document.getElementById('btn-save-manual-workout').addEventListener('click', async function() {
    if(this.disabled) return; this.disabled = true;
    if(manualSets.length === 0) return;
    const detalles = manualSets.map((s, idx) => `S${idx+1}: ${s.reps}x${s.peso}kg`).join(' | ');
    const weightHighestOrLast = manualSets[manualSets.length - 1].peso;
    let cals = 0; manualSets.forEach(s => { cals += 15 + (s.peso * s.reps * 0.03); }); cals = Math.round(cals);
    
    await registrarEntrenoNube(selectedExercise.nombre, `${manualSets.length} series (${detalles})`, weightHighestOrLast, "N/A", cals);
    totalQuemadas += cals; await guardarEstadoNube(); actualizarDashboard();
    
    if(window.manualInterval) clearInterval(window.manualInterval);
    window.closeSheet(); showToast(`✅ Ejercicio Guardado. 🔥 ~${cals} kcal.`);
    this.disabled = false;
  });
};

document.getElementById('btn-registrar-serie')?.addEventListener('click', window.abrirBuscadorManual);

// --- DASHBOARD GRID ---
function actualizarDashboard() { 
  const dashboardContainer = document.getElementById('dashboard-tab');
  if(!dashboardContainer) return;

  let gridBox = document.getElementById('iron-stats-grid');
  if(!gridBox) {
    const oldTotals = document.querySelectorAll('.cal-card, .macro-card-container');
    oldTotals.forEach(el => el.style.display = 'none');

    gridBox = document.createElement('div');
    gridBox.id = 'iron-stats-grid';
    gridBox.className = 'stats-grid';
    dashboardContainer.insertBefore(gridBox, document.getElementById('lista-comidas')?.parentElement || dashboardContainer.children[1]);
  }

  const calNetas = Math.max(0, totalCalorias - totalQuemadas);
  const prPct = Math.min(100, (totalProt/metaProt)*100) || 0;
  const cbPct = Math.min(100, (totalCarb/metaCarb)*100) || 0;
  const grPct = Math.min(100, (totalGrasa/metaGrasa)*100) || 0;
  const calColor = calNetas > metaCalorias ? 'danger' : 'primary';

  gridBox.innerHTML = `
    <div class="stat-panel stat-panel-full" style="background: linear-gradient(135deg, #111827 0%, #1a2130 100%);">
      <div class="stat-title">Balance Energético Neto <span style="color:#00e5ff;">📊</span></div>
      <div style="display:flex; justify-content:space-between; align-items:flex-end;">
        <div>
          <span class="stat-value ${calColor}" style="font-size:32px;">${calNetas}</span>
          <span style="color:#9ca3af; font-size:12px;"> / ${metaCalorias} kcal</span>
        </div>
        <div style="text-align:right;">
          <div style="font-size:10px; color:#9ca3af; margin-bottom:4px;">Ingesta: <span style="color:#fff; font-weight:bold;">${totalCalorias} kcal</span></div>
          <div style="font-size:10px; color:#9ca3af;">Quemadas: <span style="color:#ffaa00; font-weight:bold;">🔥 ${totalQuemadas} kcal</span></div>
        </div>
      </div>
      <div class="macro-progress-container" style="margin-top:12px;"><div class="macro-progress-fill" style="width:${Math.min(100, (calNetas/metaCalorias)*100)}%; background:${calColor==='danger'?'#ff3366':'#00e5ff'};"></div></div>
    </div>

    <div class="stat-panel">
      <div class="stat-title">Proteína</div>
      <div class="stat-value" style="font-size:18px;">${totalProt}g <span style="font-size:10px; color:#9ca3af;">/ ${metaProt}g</span></div>
      <div class="macro-progress-container"><div class="macro-progress-fill" style="width:${prPct}%; background:#ff3366;"></div></div>
    </div>

    <div class="stat-panel">
      <div class="stat-title">Hidratación</div>
      <div class="stat-value" style="font-size:18px; color:#00e5ff;">${totalAgua/1000}L <span style="font-size:10px; color:#9ca3af;">/ 3.0L</span></div>
      <div class="macro-progress-container"><div class="macro-progress-fill" style="width:${Math.min(100, (totalAgua/3000)*100)}%; background:#00e5ff;"></div></div>
    </div>

    <div class="stat-panel">
      <div class="stat-title">Carbohidratos</div>
      <div class="stat-value" style="font-size:18px;">${totalCarb}g <span style="font-size:10px; color:#9ca3af;">/ ${metaCarb}g</span></div>
      <div class="macro-progress-container"><div class="macro-progress-fill" style="width:${cbPct}%; background:#00e5ff;"></div></div>
    </div>

    <div class="stat-panel">
      <div class="stat-title">Grasas</div>
      <div class="stat-value" style="font-size:18px;">${totalGrasa}g <span style="font-size:10px; color:#9ca3af;">/ ${metaGrasa}g</span></div>
      <div class="macro-progress-container"><div class="macro-progress-fill" style="width:${grPct}%; background:#ffaa00;"></div></div>
    </div>
  `;
}

// --- HISTORIAL Y CHECKINS ---
async function cargarRegistrosDelDia(uid) {
  const hoyKey = getTodayKey(); const listaComidas = document.getElementById('lista-comidas');
  if(listaComidas) { listaComidas.innerHTML = ''; const snapshot = await getDocs(collection(db, "users", uid, "days", hoyKey, "meals")); snapshot.forEach(docSnap => { const i = docSnap.data(); renderizarComidaEnUI(i.nombre, i.cal, i.prot, i.carb, i.gras, docSnap.id); }); }
  const listaEntrenos = document.getElementById('lista-entrenos');
  if(listaEntrenos) { listaEntrenos.innerHTML = ''; const snapshot = await getDocs(collection(db, "users", uid, "days", hoyKey, "workouts")); snapshot.forEach(docSnap => { const i = docSnap.data(); renderizarEntrenoEnUI(i.nombre, i.sets, i.weight, i.rpe, i.cals || 0, docSnap.id); }); }
}

async function cargarHistorialYCheckins(uid) {
  const histContainer = document.getElementById('historial-container'); const chkContainer = document.getElementById('checkin-history-container');
  if(chkContainer && db) {
    chkContainer.innerHTML = '<p style="text-align:center; font-size:12px; color:#9ca3af;">Cargando check-ins...</p>';
    const q = query(collection(db, "users", uid, "checkins"), orderBy("timestamp", "desc"), limit(15)); const snaps = await getDocs(q); let html = ''; let historialPesos = [];
    snaps.forEach(d => { let data = d.data(); historialPesos.push(data); html += `<div style="background:#111827; padding:12px; margin-bottom:10px; border-radius:8px; border-left:3px solid #ffaa00; display:flex; justify-content:space-between; align-items:center; box-shadow: 0 4px 6px rgba(0,0,0,0.2);"><span style="color:#00e5ff; font-weight:800; font-size:12px;">📅 ${data.fecha}</span><span style="color:#fff; font-weight:900; font-size:14px;">⚖️ ${data.peso} kg</span></div>`; });
    chkContainer.innerHTML = html || '<p style="text-align:center; font-size:12px; color:#9ca3af;">No hay check-ins registrados.</p>';
    if(historialPesos.length > 0) dibujarGraficoPerfil(historialPesos);
  }
  if(histContainer && db) {
    histContainer.innerHTML = '<p style="text-align:center; font-size:12px; color:#9ca3af;">Cargando historial...</p>';
    const q2 = query(collection(db, "users", uid, "history"), orderBy("timestamp", "desc"), limit(60)); const snaps2 = await getDocs(q2);
    let agrupado = {}; snaps2.forEach(d => { let data = d.data(); if(!agrupado[data.date]) agrupado[data.date] = []; agrupado[data.date].push(data); });
    let html2 = '';
    for(const [fecha, items] of Object.entries(agrupado)) {
      let itemsHtml = items.map(i => `<div style="margin-top:10px; padding-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.05);"><b style="color:${i.tipo === 'entreno' ? '#00e5ff' : '#ff3366'}; font-size:13px;">${i.tipo === 'entreno' ? '🏋️' : '🍏'} ${i.nombre}</b><br><span style="font-size:11px; color:#9ca3af; display:block; margin-top:4px;">${i.detalle}</span></div>`).join('');
      html2 += `<div class="history-day"><div class="history-day-header" onclick="const content = this.nextElementSibling; content.style.display = content.style.display === 'block' ? 'none' : 'block';"><span>📅 Jornada: ${fecha}</span> <span style="color:#fff;">▼</span></div><div class="history-day-content">${itemsHtml}</div></div>`;
    }
    histContainer.innerHTML = html2 || '<p style="text-align:center; font-size:12px; color:#9ca3af;">Aún no hay historial de jornadas registradas.</p>';
  }
  inyectarModuloSocial();
}

function renderizarComidaEnUI(nombre, cal, prot, carb, gras, docId = null) { const l = document.getElementById('lista-comidas'); if(!l) return; const li = document.createElement('li'); if(docId) li.setAttribute('data-id', docId); li.innerHTML = `<span style="color:#fff; font-weight:800;">${nombre}</span><button class="btn-delete-item" onclick="window.eliminarComidaNube('${docId}', ${cal}, ${prot}, ${carb}, ${gras}, this)">🗑️</button><br><span style="color: #9ca3af; font-size: 11px; margin-top:5px; display:block;">🔥 ${cal} kcal &nbsp;|&nbsp; <span style="color:#ff3366;">P: ${prot}g</span> &nbsp;|&nbsp; <span style="color:#00e5ff;">C: ${carb}g</span> &nbsp;|&nbsp; <span style="color:#ffaa00;">G: ${gras}g</span></span>`; l.appendChild(li); }
function renderizarEntrenoEnUI(nombre, sets, weight, rpe, cals = 0, docId = null) { const l = document.getElementById('lista-entrenos'); if(!l) return; const li = document.createElement('li'); if(docId) li.setAttribute('data-id', docId); li.innerHTML = `<span style="color:#fff; font-weight:800;">${nombre.toUpperCase()}</span><button class="btn-delete-item" onclick="window.eliminarEntrenoNube('${docId}', this)">🗑️</button><br><span style="color: #9ca3af; font-size: 11px; margin-top:5px; display:flex; gap:10px; align-items:center;"><span>🏋️ ${sets}</span><span>Peso Máx: ${weight} kg</span><span style="color:#ffaa00; font-weight:800;">🔥 ~${cals} kcal</span></span>`; l.appendChild(li); }
window.eliminarComidaNube = async function(docId, cal, prot, carb, gras, btnElement) { if(!confirm("¿Eliminar?")) return; totalCalorias = Math.max(0, totalCalorias - cal); totalProt = Math.max(0, totalProt - prot); totalCarb = Math.max(0, totalCarb - carb); totalGrasa = Math.max(0, totalGrasa - gras); btnElement.closest('li')?.remove(); guardarEstadoNube(); actualizarDashboard(); if(currentUser && db && docId) await deleteDoc(doc(db, "users", currentUser.uid, "days", getTodayKey(), "meals", docId)); };
window.eliminarEntrenoNube = async function(docId, btnElement) { if(!confirm("¿Eliminar?")) return; btnElement.closest('li')?.remove(); if(currentUser && db && docId) await deleteDoc(doc(db, "users", currentUser.uid, "days", getTodayKey(), "workouts", docId)); };

async function registrarComidaNube(cal, prot, carb, gras, nombreDisplay) { 
  totalCalorias += cal; totalProt += prot; totalCarb += carb; totalGrasa += gras; guardarEstadoNube(); actualizarDashboard(); let docId = null; 
  if(currentUser && db) { const d = await addDoc(collection(db, "users", currentUser.uid, "days", getTodayKey(), "meals"), { nombre: nombreDisplay, cal, prot, carb, gras, timestamp: Date.now() }); docId = d.id; await addDoc(collection(db, "users", currentUser.uid, "history"), { tipo: 'comida', nombre: nombreDisplay, detalle: `🔥 ${cal} kcal | P:${prot}g C:${carb}g G:${gras}g`, date: getTodayKey(), timestamp: Date.now() }); } 
  renderizarComidaEnUI(nombreDisplay, cal, prot, carb, gras, docId); document.querySelector('[data-target="page-dashboard"]')?.click(); if(currentUser) cargarHistorialYCheckins(currentUser.uid);
}

async function registrarEntrenoNube(nombre, sets, weight, rpe, cals = 0) { 
  let docId = null; if(currentUser && db) { const d = await addDoc(collection(db, "users", currentUser.uid, "days", getTodayKey(), "workouts"), { nombre, sets, weight, rpe, cals, timestamp: Date.now() }); docId = d.id; await addDoc(collection(db, "users", currentUser.uid, "history"), { tipo: 'entreno', nombre: nombre.toUpperCase(), detalle: `${sets} | 🔥 ${cals} kcal`, date: getTodayKey(), timestamp: Date.now() }); } 
  renderizarEntrenoEnUI(nombre, sets, weight, rpe, cals, docId); if(currentUser) cargarHistorialYCheckins(currentUser.uid);
}

function iniciarSakuraBackground() { const c = document.getElementById('sakura-bg'); if(!c) return; c.innerHTML = ''; for(let i=0; i<15; i++) { const p = document.createElement('div'); p.className = 'sakura-petal'; const s = Math.random() * 8 + 4; p.style.width = `${s}px`; p.style.height = `${s*1.4}px`; p.style.left = `${Math.random()*100}vw`; p.style.animationDuration = `${Math.random()*10+8}s`; p.style.animationDelay = `${Math.random()*5}s`; c.appendChild(p); } }
function verificarCambioDeDia() { const hoy = new Date().toDateString(); const ult = localStorage.getItem('ic_ultima_fecha'); if (!ult) localStorage.setItem('ic_ultima_fecha', hoy); else if (ult !== hoy) { totalCalorias = 0; totalProt = 0; totalCarb = 0; totalGrasa = 0; totalAgua = 0; totalQuemadas = 0; userStreak++; localStorage.setItem('ic_ultima_fecha', hoy); guardarEstadoNube(); showToast('🌙 Nuevo día. ¡Racha incrementada!'); } const st = document.getElementById('header-streak'); if(st) st.innerText = `🔥 Racha: ${userStreak} días`; }
window.reiniciarDiaActual = function() { if(confirm("¿Reiniciar balance?")) { totalCalorias = 0; totalProt = 0; totalCarb = 0; totalGrasa = 0; totalAgua = 0; totalQuemadas = 0; guardarEstadoNube(); actualizarDashboard(); actualizarAguaUI(); const lc = document.getElementById('lista-comidas'); if(lc) lc.innerHTML = ''; showToast('🔄 Restablecido.'); } };
window.borrarTodoHistorial = function() { if(confirm("¿Restablecer historial archivado?")) { localStorage.removeItem('ic_historial_pasado'); localStorage.removeItem('ic_checkins'); const hc = document.getElementById('historial-container'); if(hc) hc.innerHTML = ''; const chc = document.getElementById('checkin-history-container'); if(chc) chc.innerHTML = ''; showToast('🧹 Borrado.'); } };

function actualizarAguaUI() { const metaAgua = 3000; let pct = Math.min(100, Math.round((totalAgua/metaAgua)*100)); const wb = document.getElementById('water-fill-bar'); if(wb) wb.style.height = `${pct}%`; const wt = document.getElementById('water-text-val'); if(wt) wt.innerText = `${totalAgua} / ${metaAgua} ml`; guardarEstadoNube(); }
window.agregarAgua = ml => { totalAgua += ml; actualizarAguaUI(); showToast(`💧 +${ml} ml añadidos.`); }; window.resetAgua = () => { totalAgua = 0; actualizarAguaUI(); showToast(`🔄 Hidratación reiniciada.`); };

const overlay = document.getElementById('sheet-overlay'); let activeSheet = null;
window.openSheet = function(sheetId) { activeSheet = document.getElementById(sheetId); if(overlay) overlay.style.display = 'block'; if(activeSheet) { activeSheet.classList.add('open'); setTimeout(() => activeSheet.style.bottom = '0', 10); } };
window.closeSheet = function() { if(activeSheet) { activeSheet.style.bottom = '-100%'; setTimeout(() => { activeSheet.classList.remove('open'); if(overlay) overlay.style.display = 'none'; }, 300); } };
document.querySelectorAll('.custom-select').forEach(sel => { sel.addEventListener('click', () => { window.activeSelect = sel; window.openSheet(sel.id.replace('select-', 'sheet-')); }); });
document.querySelectorAll('.sheet-option').forEach(opt => { opt.addEventListener('click', function() { if(this.parentElement.id !== 'sheet-actividad') { this.parentElement.querySelectorAll('.sheet-option').forEach(o => o.classList.remove('active')); this.classList.add('active'); if(window.activeSelect) { window.activeSelect.innerText = this.innerText; window.activeSelect.setAttribute('data-val', this.getAttribute('data-val')); } window.closeSheet(); } else { window.closeSheet(); } }); });
if(overlay) overlay.addEventListener('click', window.closeSheet);

const navItems = document.querySelectorAll('.nav-item'); const pages = document.querySelectorAll('.page');
navItems.forEach(btn => { btn.addEventListener('click', () => { navItems.forEach(nav => nav.classList.remove('active')); pages.forEach(page => page.classList.remove('active')); btn.classList.add('active'); const tgt = document.getElementById(btn.getAttribute('data-target')); if(tgt) tgt.classList.add('active'); }); });

function setupTabs(btnClass, subTabClass) { 
  const btns = document.querySelectorAll(`.${btnClass}`); const tabs = document.querySelectorAll(`.${subTabClass}`); 
  btns.forEach(btn => { 
    btn.addEventListener('click', () => { 
      btns.forEach(t => t.classList.remove('active')); tabs.forEach(s => s.style.display = 'none'); 
      btn.classList.add('active'); 
      const targetTab = btn.getAttribute('data-tab'); const elem = document.getElementById(targetTab); 
      if(elem) elem.style.display = 'block'; 
      if(targetTab === 'tab-leaderboard') cargarLeaderboard(); 
    }); 
  }); 
} 
setupTabs('tab-btn-diet', 'sub-tab-diet'); setupTabs('tab-btn-train', 'sub-tab-train');

document.getElementById('btn-checkin')?.addEventListener('click', () => window.openSheet('sheet-checkin'));
document.getElementById('btn-confirm-checkin')?.addEventListener('click', async function() { 
  if (this.disabled) return; this.disabled = true;
  const pesoInp = document.getElementById('checkin-peso'); const pesoVal = pesoInp ? parseFloat(pesoInp.value) : 0;
  if(!pesoVal) { showToast('⚠️ Por favor ingresa tu peso.'); this.disabled = false; return; }
  if(currentUser && db) {
    await addDoc(collection(db, "users", currentUser.uid, "checkins"), { peso: pesoVal, fecha: getTodayKey(), timestamp: Date.now() });
    userProfile.peso = pesoVal; await guardarEstadoNube(); actualizarUIPerfil(); cargarHistorialYCheckins(currentUser.uid); 
  }
  window.closeSheet(); if(pesoInp) pesoInp.value = ''; showToast('📈 Check-in guardado.'); this.disabled = false;
});

if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(console.log); }); }
