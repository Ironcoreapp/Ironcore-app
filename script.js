// --- IMPORTACIÓN MODULAR DIRECTA DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- CONFIGURACIÓN DE FIREBASE ---
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
let totalCalorias = 0, totalProt = 0, totalCarb = 0, totalGrasa = 0, totalAgua = 0, userStreak = 1;
let metaCalorias = 2500, metaProt = 165, metaCarb = 275, metaGrasa = 69;

// Perfil Usuario
let userProfile = {
  perfilCompleto: false,
  nickname: "",
  genero: "M",
  edad: 25,
  peso: 75,
  altura: 175,
  metaObj: 0, 
  actividad: 1.55 
};

function getTodayKey() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function showToast(msg) { const toast = document.getElementById('toast-notif'); if(!toast) return; toast.innerHTML = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3500); }

// --- GESTIÓN DE AUTENTICACIÓN GOOGLE ---
const authScreen = document.getElementById('auth-screen');
const btnGoogleLogin = document.getElementById('btn-google-login');
const btnLogoutProfile = document.getElementById('btn-logout-profile'); // Ahora en perfil

getRedirectResult(auth).then((result) => { if (result && result.user) showToast('⚔️ ¡Acceso autorizado al Dojo!'); }).catch(console.error);

if(btnGoogleLogin) {
  btnGoogleLogin.addEventListener('click', async () => {
    showToast('🔄 Conectando con Google...');
    const provider = new GoogleAuthProvider(); provider.setCustomParameters({ prompt: 'select_account' });
    try { await signInWithPopup(auth, provider); showToast('⚔️ ¡Acceso autorizado al Dojo!');
    } catch(error) { if (error.code === 'auth/popup-blocked') await signInWithRedirect(auth, provider); }
  });
}

// Botones de salida (Header y Perfil)
document.getElementById('btn-logout')?.addEventListener('click', () => signOut(auth));
if(btnLogoutProfile) btnLogoutProfile.addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    if (authScreen) authScreen.style.display = 'none';
    
    // Setear avatar Google temporal para onboarding
    document.getElementById('ob-avatar').src = user.photoURL || 'logo.png';
    const primerNombre = (user.displayName || "Guerrero").split(' ')[0];
    document.getElementById('ob-nickname').value = primerNombre;
    
    await cargarDatosDesdeNube(user.uid);
  } else {
    currentUser = null;
    if (authScreen) authScreen.style.display = 'flex';
    document.getElementById('user-welcome-box').style.display = 'none';
  }
});

// --- LÓGICA DE ONBOARDING ---
let currentObStep = 0;
const obScreen = document.getElementById('onboarding-screen');
const obTrack = document.getElementById('ob-track');
const obBar = document.getElementById('ob-bar');

window.abrirOnboarding = function(isEdit = false) {
  obScreen.style.display = 'flex';
  currentObStep = 0; 
  obTrack.style.transform = `translateX(0%)`;
  obBar.style.width = '33.33%';
  
  if(isEdit) {
    document.getElementById('ob-title').innerText = "Editar Credencial";
    document.getElementById('ob-nickname').value = userProfile.nickname;
    seleccionarGenero(userProfile.genero);
    document.getElementById('ob-edad').value = userProfile.edad;
    document.getElementById('ob-peso').value = userProfile.peso;
    document.getElementById('ob-altura').value = userProfile.altura;
    
    document.querySelectorAll('.ob-goal-card').forEach(c => {
      c.classList.remove('active');
      if(parseInt(c.getAttribute('data-val')) === userProfile.metaObj) c.classList.add('active');
    });
  } else {
    document.getElementById('ob-title').innerText = "Ritual de Iniciación";
  }
};

window.moverOnboarding = function(dir) {
  if(dir === 1 && currentObStep === 0) {
    const nick = document.getElementById('ob-nickname').value.trim();
    if(!nick) { showToast('⚠️ Debes elegir un apodo.'); return; }
  }
  
  currentObStep += dir;
  if(currentObStep < 0) currentObStep = 0;
  if(currentObStep > 2) currentObStep = 2;
  
  obTrack.style.transform = `translateX(-${currentObStep * 33.333}%)`;
  obBar.style.width = `${(currentObStep + 1) * 33.33}%`;
};

window.seleccionarGenero = function(gen) {
  userProfile.genero = gen;
  document.querySelectorAll('.ob-gender-btn').forEach(b => {
    if(b.getAttribute('data-gen') === gen) b.classList.add('active'); else b.classList.remove('active');
  });
};

window.seleccionarMetaOb = function(elem) {
  document.querySelectorAll('.ob-goal-card').forEach(c => c.classList.remove('active'));
  elem.classList.add('active');
  userProfile.metaObj = parseInt(elem.getAttribute('data-val'));
};

window.finalizarOnboarding = async function() {
  userProfile.nickname = document.getElementById('ob-nickname').value.trim() || "Guerrero";
  userProfile.edad = parseInt(document.getElementById('ob-edad').value) || 25;
  userProfile.peso = parseFloat(document.getElementById('ob-peso').value) || 75;
  userProfile.altura = parseInt(document.getElementById('ob-altura').value) || 175;
  userProfile.actividad = parseFloat(document.getElementById('select-actividad').getAttribute('data-val')) || 1.55;
  userProfile.perfilCompleto = true;

  // Cálculo Biométrico Real (Mifflin-St Jeor)
  let tmb = 0;
  if (userProfile.genero === 'M') {
    tmb = (10 * userProfile.peso) + (6.25 * userProfile.altura) - (5 * userProfile.edad) + 5;
  } else {
    tmb = (10 * userProfile.peso) + (6.25 * userProfile.altura) - (5 * userProfile.edad) - 161;
  }
  
  let tdee = tmb * userProfile.actividad;
  metaCalorias = Math.round(tdee + userProfile.metaObj);
  
  // Macros adaptados a la meta
  metaProt = userProfile.metaObj > 0 ? Math.round(userProfile.peso * 2.0) : Math.round(userProfile.peso * 2.2); // Más proteína en déficit
  metaGrasa = Math.round((metaCalorias * 0.25) / 9); 
  metaCarb = Math.round((metaCalorias - ((metaProt * 4) + (metaGrasa * 9))) / 4);

  await guardarEstadoNube();
  actualizarUIHeader();
  actualizarUIPerfil();
  actualizarDashboard();
  actualizarGraficoProyeccion(userProfile.peso, userProfile.metaObj);
  
  obScreen.style.display = 'none';
  showToast(`✅ Credencial Actualizada<br>🔥 Metas: ${metaCalorias} kcal.`);
  document.querySelector('[data-target="page-dashboard"]').click();
};

// --- SINCRONIZACIÓN FIRESTORE ---
async function guardarEstadoNube() {
  if(!currentUser || !db) return;
  const userDocRef = doc(db, "users", currentUser.uid);
  try {
    await setDoc(userDocRef, {
      calorias: totalCalorias, proteina: totalProt, carbos: totalCarb, grasa: totalGrasa, agua: totalAgua,
      metaCal: metaCalorias, metaProt: metaProt, metaCarb: metaCarb, metaGrasa: metaGrasa,
      streak: userStreak, ultimaFecha: localStorage.getItem('ic_ultima_fecha'),
      ...userProfile // Guarda el perfil completo desglosado
    }, { merge: true });
  } catch(e) { console.error("Error guardando:", e); }
}

async function cargarDatosDesdeNube(uid) {
  if(!db) return;
  const docSnap = await getDoc(doc(db, "users", uid));
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    totalCalorias = data.calorias || 0; totalProt = data.proteina || 0; totalCarb = data.carbos || 0; totalGrasa = data.grasa || 0; totalAgua = data.agua || 0;
    metaCalorias = data.metaCal || 2500; metaProt = data.metaProt || 165; metaCarb = data.metaCarb || 275; metaGrasa = data.metaGrasa || 69;
    userStreak = data.streak || 1;
    
    userProfile.perfilCompleto = data.perfilCompleto || false;
    userProfile.nickname = data.nickname || "";
    userProfile.genero = data.genero || "M";
    userProfile.edad = data.edad || 25;
    userProfile.peso = data.peso || 75;
    userProfile.altura = data.altura || 175;
    userProfile.metaObj = data.metaObj !== undefined ? data.metaObj : 0;
    userProfile.actividad = data.actividad || 1.55;
  }
  
  if(!userProfile.perfilCompleto) {
    window.abrirOnboarding(false);
  } else {
    actualizarUIHeader();
    actualizarUIPerfil();
  }
  
  iniciarSakuraBackground();
  verificarCambioDeDia();
  actualizarDashboard();
  actualizarAguaUI();
  await cargarRegistrosDelDia(uid);
  actualizarGraficoProyeccion(userProfile.peso, userProfile.metaObj);
}

function actualizarUIHeader() {
  document.getElementById('user-display-name').innerText = userProfile.nickname.toUpperCase();
  const avatar = document.getElementById('user-avatar');
  if(currentUser && currentUser.photoURL) { avatar.src = currentUser.photoURL; avatar.style.display = 'inline-block'; }
  document.getElementById('user-welcome-box').style.display = 'flex';
}

function actualizarUIPerfil() {
  document.getElementById('profile-card-name').innerText = userProfile.nickname.toUpperCase();
  document.getElementById('profile-val-peso').innerText = `${userProfile.peso} kg`;
  document.getElementById('profile-val-altura').innerText = `${userProfile.altura} cm`;
  document.getElementById('profile-val-edad').innerText = `${userProfile.edad} años`;
  document.getElementById('profile-val-genero').innerText = userProfile.genero === 'M' ? 'Hombre' : 'Mujer';
  
  let labelMeta = "Mantenimiento";
  if(userProfile.metaObj === -500) labelMeta = "Déficit Agresivo";
  if(userProfile.metaObj === -300) labelMeta = "Definición";
  if(userProfile.metaObj === 300) labelMeta = "Volumen / Hipertrofia";
  document.getElementById('profile-card-goal').innerText = `Meta: ${labelMeta}`;
  
  const pAvatar = document.getElementById('profile-card-avatar');
  if(currentUser && currentUser.photoURL) pAvatar.src = currentUser.photoURL;
}

// Al cambiar actividad en Credencial, recalcular silenciosamente
document.querySelectorAll('.sheet-option').forEach(option => {
  option.addEventListener('click', function() {
    if(this.parentElement.id === 'sheet-actividad') {
      this.parentElement.querySelectorAll('.sheet-option').forEach(opt => opt.classList.remove('active'));
      this.classList.add('active'); 
      document.getElementById('select-actividad').innerText = this.innerText; 
      document.getElementById('select-actividad').setAttribute('data-val', this.getAttribute('data-val'));
      
      // Si el perfil está completo, guardamos de inmediato
      if(userProfile.perfilCompleto) {
        window.finalizarOnboarding();
      }
    }
  });
});

// --- PERSISTENCIA DE LISTAS (COMIDAS Y ENTRENOS) ---
async function cargarRegistrosDelDia(uid) {
  const hoyKey = getTodayKey();
  
  const listaComidas = document.getElementById('lista-comidas');
  if(listaComidas) {
    listaComidas.innerHTML = '';
    const mealsColl = collection(db, "users", uid, "days", hoyKey, "meals");
    const snapshot = await getDocs(mealsColl);
    snapshot.forEach(docSnap => {
      const item = docSnap.data();
      renderizarComidaEnUI(item.nombre, item.cal, item.prot, item.carb, item.gras, docSnap.id);
    });
  }

  const listaEntrenos = document.getElementById('lista-entrenos');
  if(listaEntrenos) {
    listaEntrenos.innerHTML = '';
    const workColl = collection(db, "users", uid, "days", hoyKey, "workouts");
    const snapshot = await getDocs(workColl);
    snapshot.forEach(docSnap => {
      const item = docSnap.data();
      renderizarEntrenoEnUI(item.nombre, item.sets, item.weight, item.rpe, docSnap.id);
    });
  }
}

function renderizarComidaEnUI(nombre, cal, prot, carb, gras, docId = null) {
  const listaComidas = document.getElementById('lista-comidas');
  if(!listaComidas) return;
  const li = document.createElement('li');
  if(docId) li.setAttribute('data-id', docId);
  li.innerHTML = `
    <span style="color:#fff; font-weight:800;">${nombre}</span>
    <button class="btn-delete-item" onclick="eliminarComidaNube('${docId}', ${cal}, ${prot}, ${carb}, ${gras}, this)">🗑️</button>
    <br> 
    <span style="color: #6b7c93; font-size: 11px; margin-top:5px; display:block;">
      🔥 ${cal} kcal &nbsp;|&nbsp; <span style="color:#ff3366;">P: ${prot}g</span> &nbsp;|&nbsp; <span style="color:#00e5ff;">C: ${carb}g</span> &nbsp;|&nbsp; <span style="color:#ffaa00;">G: ${gras}g</span>
    </span>`;
  listaComidas.appendChild(li);
}

function renderizarEntrenoEnUI(nombre, sets, weight, rpe, docId = null) {
  const listaEntrenos = document.getElementById('lista-entrenos');
  if(!listaEntrenos) return;
  const li = document.createElement('li');
  if(docId) li.setAttribute('data-id', docId);
  li.innerHTML = `
    <span style="color:#fff; font-weight:800;">${nombre.toUpperCase()}</span>
    <button class="btn-delete-item" onclick="eliminarEntrenoNube('${docId}', this)">🗑️</button>
    <br> 
    <span style="color: #6b7c93; font-size: 11px; margin-top:5px; display:block;">
      🏋️ Sets: ${sets} &nbsp;|&nbsp; <span style="color:#00e5ff;">Peso: ${weight} kg</span> &nbsp;|&nbsp; <span style="color:#ffaa00;">RPE: ${rpe}</span>
    </span>`;
  listaEntrenos.appendChild(li);
}

window.eliminarComidaNube = async function(docId, cal, prot, carb, gras, btnElement) {
  if(!confirm("¿Eliminar este alimento del registro?")) return;
  totalCalorias = Math.max(0, totalCalorias - cal); totalProt = Math.max(0, totalProt - prot); totalCarb = Math.max(0, totalCarb - carb); totalGrasa = Math.max(0, totalGrasa - gras);
  btnElement.closest('li').remove(); guardarEstadoNube(); actualizarDashboard();
  if(currentUser && db && docId) await deleteDoc(doc(db, "users", currentUser.uid, "days", getTodayKey(), "meals", docId));
};

window.eliminarEntrenoNube = async function(docId, btnElement) {
  if(!confirm("¿Eliminar esta serie de la bitácora?")) return;
  btnElement.closest('li').remove();
  if(currentUser && db && docId) await deleteDoc(doc(db, "users", currentUser.uid, "days", getTodayKey(), "workouts", docId));
};

async function registrarComidaNube(cal, prot, carb, gras, nombreDisplay) {
  totalCalorias += cal; totalProt += prot; totalCarb += carb; totalGrasa += gras;
  guardarEstadoNube(); actualizarDashboard();
  let docId = null;
  if(currentUser && db) {
    const docRef = await addDoc(collection(db, "users", currentUser.uid, "days", getTodayKey(), "meals"), { nombre: nombreDisplay, cal, prot, carb, gras, timestamp: Date.now() });
    docId = docRef.id;
  }
  renderizarComidaEnUI(nombreDisplay, cal, prot, carb, gras, docId);
  document.querySelector('[data-target="page-dashboard"]').click();
}

async function registrarEntrenoNube(nombre, sets, weight, rpe) {
  let docId = null;
  if(currentUser && db) {
    const docRef = await addDoc(collection(db, "users", currentUser.uid, "days", getTodayKey(), "workouts"), { nombre, sets, weight, rpe, timestamp: Date.now() });
    docId = docRef.id;
  }
  renderizarEntrenoEnUI(nombre, sets, weight, rpe, docId);
}

// --- UTILIDADES ---
function iniciarSakuraBackground() {
  const c = document.getElementById('sakura-bg'); if(!c) return; c.innerHTML = '';
  for(let i=0; i<15; i++) {
    const p = document.createElement('div'); p.className = 'sakura-petal'; const s = Math.random() * 8 + 4;
    p.style.width = `${s}px`; p.style.height = `${s*1.4}px`; p.style.left = `${Math.random()*100}vw`; p.style.animationDuration = `${Math.random()*10+8}s`; p.style.animationDelay = `${Math.random()*5}s`;
    c.appendChild(p);
  }
}

function verificarCambioDeDia() {
  const hoy = new Date().toDateString(); const ult = localStorage.getItem('ic_ultima_fecha');
  if (!ult) localStorage.setItem('ic_ultima_fecha', hoy);
  else if (ult !== hoy) {
    totalCalorias = 0; totalProt = 0; totalCarb = 0; totalGrasa = 0; totalAgua = 0; userStreak++;
    localStorage.setItem('ic_ultima_fecha', hoy); guardarEstadoNube(); showToast('🌙 Nuevo día. ¡Racha incrementada!');
  }
  document.getElementById('header-streak').innerText = `🔥 Racha: ${userStreak} días`;
}
window.reiniciarDiaActual = function() {
  if(confirm("¿Reiniciar contadores de hoy a 0?")) {
    totalCalorias = 0; totalProt = 0; totalCarb = 0; totalGrasa = 0; totalAgua = 0;
    guardarEstadoNube(); actualizarDashboard(); actualizarAguaUI(); document.getElementById('lista-comidas').innerHTML = ''; showToast('🔄 Balance restablecido.');
  }
};

// --- NAVEGACIÓN Y TABS ---
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
navItems.forEach(btn => {
  btn.addEventListener('click', () => {
    navItems.forEach(nav => nav.classList.remove('active')); pages.forEach(page => page.classList.remove('active'));
    btn.classList.add('active'); document.getElementById(btn.getAttribute('data-target')).classList.add('active');
  });
});
function setupTabs(btnClass, subTabClass) {
  const btns = document.querySelectorAll(`.${btnClass}`); const tabs = document.querySelectorAll(`.${subTabClass}`);
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(t => t.classList.remove('active')); tabs.forEach(s => s.style.display = 'none');
      btn.classList.add('active'); const targetTab = btn.getAttribute('data-tab'); document.getElementById(targetTab).style.display = 'block';
      if(targetTab === 'tab-leaderboard') cargarLeaderboard();
    });
  });
}
setupTabs('tab-btn-diet', 'sub-tab-diet'); setupTabs('tab-btn-train', 'sub-tab-train');

// --- AGUA Y CHAT ---
function actualizarAguaUI() { const metaAgua = 3000; let pct = Math.min(100, Math.round((totalAgua/metaAgua)*100)); document.getElementById('water-fill-bar').style.height = `${pct}%`; document.getElementById('water-text-val').innerText = `${totalAgua} / ${metaAgua} ml`; guardarEstadoNube(); }
window.agregarAgua = ml => { totalAgua += ml; actualizarAguaUI(); showToast(`💧 +${ml} ml añadidos.`); };
window.resetAgua = () => { totalAgua = 0; actualizarAguaUI(); showToast(`🔄 Hidratación reiniciada.`); };

document.getElementById('btn-send-chat')?.addEventListener('click', enviarMensajeShogun);
document.getElementById('chat-input-text')?.addEventListener('keypress', e => { if(e.key === 'Enter') enviarMensajeShogun(); });
function enviarMensajeShogun() {
  const inp = document.getElementById('chat-input-text'); const txt = inp.value.trim(); if(!txt) return;
  const box = document.getElementById('chat-messages');
  box.innerHTML += `<div class="chat-msg user">${txt}</div>`; inp.value = ''; box.scrollTop = box.scrollHeight;
  setTimeout(() => { box.innerHTML += `<div class="chat-msg ai">"La disciplina vence a la motivación. Céntrate en tus macros y el hierro hará el resto."</div>`; box.scrollTop = box.scrollHeight; }, 800);
}

// --- BOTTOM SHEETS ---
const overlay = document.getElementById('sheet-overlay'); let activeSheet = null;
function openSheet(sheetId) { activeSheet = document.getElementById(sheetId); if(overlay) overlay.style.display = 'block'; if(activeSheet) { activeSheet.classList.add('open'); setTimeout(() => activeSheet.style.bottom = '0', 10); } }
function closeSheet() { if(activeSheet) { activeSheet.style.bottom = '-100%'; setTimeout(() => { activeSheet.classList.remove('open'); if(overlay) overlay.style.display = 'none'; }, 300); } }
document.querySelectorAll('.custom-select').forEach(sel => { sel.addEventListener('click', () => { window.activeSelect = sel; openSheet(sel.id.replace('select-', 'sheet-')); }); });
document.querySelectorAll('.sheet-option').forEach(opt => { opt.addEventListener('click', function() { if(this.parentElement.id !== 'sheet-actividad') { this.parentElement.querySelectorAll('.sheet-option').forEach(o => o.classList.remove('active')); this.classList.add('active'); window.activeSelect.innerText = this.innerText; window.activeSelect.setAttribute('data-val', this.getAttribute('data-val')); closeSheet(); } else { closeSheet(); }}); });
if(overlay) overlay.addEventListener('click', closeSheet);

// --- COACH TÉCNICO ---
const focusCards = document.querySelectorAll('.focus-card');
focusCards.forEach(card => { card.addEventListener('click', () => { focusCards.forEach(c => c.classList.remove('active')); card.classList.add('active'); document.getElementById('coach-recommendation').innerHTML = `<h4>Foco: ${card.innerText}</h4><p>Prioriza la tensión mecánica y aplica sobrecarga progresiva en los levantamientos base de este grupo.</p>`; document.getElementById('coach-recommendation').style.display='block'; }); });

// --- BITÁCORA ---
document.getElementById('btn-registrar-serie')?.addEventListener('click', () => { document.getElementById('work-name').value = ''; document.getElementById('work-sets').value = ''; document.getElementById('work-weight').value = ''; openSheet('sheet-workout'); });
document.getElementById('btn-confirm-workout')?.addEventListener('click', async () => {
  const n = document.getElementById('work-name').value; const s = document.getElementById('work-sets').value; const w = document.getElementById('work-weight').value; const r = document.getElementById('work-rpe').value || '8';
  if(!n || !s || !w) { showToast('⚠️ Completa los campos.'); return; }
  await registrarEntrenoNube(n, s, w, r); closeSheet(); showToast('💪 Serie sincronizada.');
});

// --- RANGOS SAMURAI Y RANKING GLOBAL ---
const rangos = [ { nombre: "Ashigaru", minRatio: 0, color: "#6b7c93", msg: "Primer paso." }, { nombre: "Rōnin", minRatio: 1.5, color: "#ffaa00", msg: "Camino propio." }, { nombre: "Samurái", minRatio: 2.5, color: "#ff3366", msg: "Honor y disciplina." }, { nombre: "Daimyō", minRatio: 3.5, color: "#9933ff", msg: "Élite del hierro." }, { nombre: "IRON SHŌGUN", minRatio: 4.5, color: "#00e5ff", msg: "Comandante Supremo." } ];
document.getElementById('btn-calcular-rango')?.addEventListener('click', async () => {
  const bench = parseFloat(document.getElementById('rm-bench').value) || 0; const squat = parseFloat(document.getElementById('rm-squat').value) || 0; const deadlift = parseFloat(document.getElementById('rm-deadlift').value) || 0;
  if(bench === 0 && squat === 0 && deadlift === 0) { showToast('⚠️ Ingresa marcas.'); return; }
  const total = bench + squat + deadlift; const ratio = parseFloat((total / userProfile.peso).toFixed(2));
  let rango = rangos[0], prog = 0;
  for(let i=0; i<rangos.length; i++) { if(ratio >= rangos[i].minRatio) { rango = rangos[i]; prog = i < rangos.length - 1 ? ((ratio - rangos[i].minRatio) / (rangos[i+1].minRatio - rangos[i].minRatio)) * 100 : 100; } }
  
  document.getElementById('rango-titulo').innerText = rango.nombre; document.getElementById('rango-titulo').style.color = rango.color;
  document.getElementById('rango-multi').innerText = `${ratio}x`; document.getElementById('rango-total').innerText = total; document.getElementById('rango-progreso').style.width = `${prog}%`; document.getElementById('rango-progreso').style.backgroundColor = rango.color; document.getElementById('header-rank').innerHTML = `Rango: <span style="color: ${rango.color};">${rango.nombre.toUpperCase()}</span>`;
  
  if(currentUser && db) {
    try { await setDoc(doc(db, "leaderboard", currentUser.uid), { userId: currentUser.uid, nombre: userProfile.nickname, foto: currentUser.photoURL || "", multiplicador: ratio, totalKg: total, pesoCorporal: userProfile.peso, rango: rango.nombre, colorRango: rango.color, updatedAt: Date.now() }, { merge: true });
      showToast(`⚔️ ¡Ranking Actualizado!`);
    } catch(e) { console.error(e); }
  }
});

async function cargarLeaderboard() {
  const container = document.getElementById('leaderboard-list'); if(!container || !db) return;
  container.innerHTML = `<p style="font-size: 12px; color: var(--text-muted); text-align: center;">Cargando guerreros...</p>`;
  try {
    const q = query(collection(db, "leaderboard"), orderBy("multiplicador", "desc"), limit(20)); const snapshot = await getDocs(q);
    if(snapshot.empty) { container.innerHTML = `<p style="font-size: 12px; color: var(--text-muted); text-align: center;">El dojo está vacío.</p>`; return; }
    let html = "", pos = 1;
    snapshot.forEach(docSnap => {
      const data = docSnap.data(); const topClass = pos===1?"top-1":pos===2?"top-2":pos===3?"top-3":""; const medal = pos===1?"🥇":pos===2?"🥈":pos===3?"🥉":`#${pos}`;
      html += `<div class="leaderboard-item ${topClass}"><div class="lb-rank-num">${medal}</div><div class="lb-user-info"><img class="lb-avatar" src="${data.foto||'logo.png'}"><div><span class="lb-name">${data.nombre}</span><span class="lb-badge" style="color: ${data.colorRango};">${data.rango}</span></div></div><div class="lb-score"><span class="lb-multiplier">${data.multiplicador}x</span><span class="lb-kg">${data.totalKg} kg</span></div></div>`;
      pos++;
    }); container.innerHTML = html;
  } catch(e) { container.innerHTML = `<p style="font-size: 12px; color: #ff3366; text-align: center;">Error al cargar.</p>`; }
}
document.getElementById('btn-refresh-leaderboard')?.addEventListener('click', cargarLeaderboard);

// --- GRÁFICOS Y DASHBOARD ---
let macroChart = null; const ctxDonut = document.getElementById('macroChart'); if(ctxDonut) { macroChart = new Chart(ctxDonut.getContext('2d'), { type: 'doughnut', data: { labels: ['Prot', 'Carb', 'Gras'], datasets: [{ data: [0.1, 0.1, 0.1], backgroundColor: ['#ff3366', '#00e5ff', '#ffaa00'], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '82%', plugins: { legend: { display: false } } } }); }
let progressChart = null; const ctxLine = document.getElementById('progressChart'); if(ctxLine) { progressChart = new Chart(ctxLine.getContext('2d'), { type: 'line', data: { labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'], datasets: [{ label: 'Proyección (kg)', data: [75, 75, 75, 75], borderColor: '#00e5ff', backgroundColor: 'rgba(0, 229, 255, 0.1)', borderWidth: 3, fill: true, tension: 0.4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } } }); }

function actualizarGraficoProyeccion(pesoActual, variacionObj) {
  if(!progressChart) return; let vSemana = variacionObj / 1000; 
  progressChart.data.datasets[0].data = [pesoActual, pesoActual + vSemana, pesoActual + (vSemana * 2), pesoActual + (vSemana * 3)];
  progressChart.update();
}
function actualizarDashboard() {
  document.getElementById('calorias-total').innerText = `${totalCalorias} / ${metaCalorias} kcal`; document.getElementById('prot-total').innerText = `${totalProt}g / ${metaProt}g`; document.getElementById('carb-total').innerText = `${totalCarb}g`; document.getElementById('gras-total').innerText = `${totalGrasa}g`;
  document.getElementById('en-consumidas').innerText = `${totalCalorias} kcal`; document.getElementById('en-netas').innerText = `${totalCalorias - 450} kcal`;
  if(macroChart && (totalProt > 0 || totalCarb > 0 || totalGrasa > 0)) { macroChart.data.datasets[0].data = [totalProt, totalCarb, totalGrasa]; macroChart.update(); }
}

// --- BASE DE ALIMENTOS FATSECRET ---
const fatSecretDB = [ { nombre: "Pechuga de Pollo (100g)", cal: 165, prot: 31, carb: 0, gras: 3.6 }, { nombre: "Arroz Blanco Cocido (100g)", cal: 130, prot: 2.7, carb: 28, gras: 0.3 }, { nombre: "Avena (100g)", cal: 389, prot: 17, carb: 66, gras: 7 }, { nombre: "Huevo Entero (1)", cal: 72, prot: 6.3, carb: 0.4, gras: 4.8 }, { nombre: "Proteína IronCore (30g)", cal: 120, prot: 25, carb: 3, gras: 1 } ];
let selFood = null;
document.getElementById('btn-abrir-manual')?.addEventListener('click', () => { document.getElementById('food-search').value = ''; document.getElementById('food-results-list').innerHTML = ''; openSheet('sheet-add-food'); });
document.getElementById('food-search')?.addEventListener('input', (e) => {
  const q = e.target.value.trim().toLowerCase(); const c = document.getElementById('food-results-list'); c.innerHTML = ''; if(!q) return;
  const m = fatSecretDB.filter(f => f.nombre.toLowerCase().includes(q)); if(!m.length) return;
  m.forEach(i => { const d = document.createElement('div'); d.className = 'food-search-item'; d.innerHTML = `<span>${i.nombre}</span> <span style="color:var(--primary);">${i.cal} kcal</span>`; d.addEventListener('click', () => { selFood = i; document.getElementById('food-search').value = i.nombre; document.getElementById('edit-cal').value = i.cal; document.getElementById('edit-prot').value = i.prot; document.getElementById('edit-carb').value = i.carb; document.getElementById('edit-gras').value = i.gras; c.innerHTML = ''; }); c.appendChild(d); });
});
document.getElementById('edit-qty')?.addEventListener('input', (e) => { let q = parseFloat(e.target.value)||100; if(selFood) { let f = q/100; document.getElementById('edit-cal').value = Math.round(selFood.cal*f); document.getElementById('edit-prot').value = Math.round(selFood.prot*f); document.getElementById('edit-carb').value = Math.round(selFood.carb*f); document.getElementById('edit-gras').value = Math.round(selFood.gras*f); } });
document.getElementById('btn-confirm-food-final')?.addEventListener('click', async () => {
  let mt = document.getElementById('food-meal-time').value; let n = document.getElementById('food-search').value || "Alimento";
  let c = parseInt(document.getElementById('edit-cal').value)||0; let p = parseInt(document.getElementById('edit-prot').value)||0; let cb = parseInt(document.getElementById('edit-carb').value)||0; let g = parseInt(document.getElementById('edit-gras').value)||0;
  if(!c && !p) { showToast('⚠️ Ingresa calorías o proteína.'); return; }
  await registrarComidaNube(c, p, cb, g, `[${mt}] ${n}`); closeSheet(); showToast(`✅ ${n.toUpperCase()} registrado.`);
});

document.getElementById('btn-checkin')?.addEventListener('click', () => openSheet('sheet-checkin'));
document.getElementById('btn-confirm-checkin')?.addEventListener('click', () => { closeSheet(); showToast('📈 Check-in guardado.'); });
