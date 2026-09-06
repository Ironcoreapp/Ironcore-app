// --- IMPORTACIÓN MODULAR DIRECTA DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithRedirect, 
  getRedirectResult, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyAK3QRT5FOqe9q-hxI3NWtTvZT2uGGLCTU",
  authDomain: "ironcoreapp-66a12.firebaseapp.com",
  projectId: "ironcoreapp-66a12",
  storageBucket: "ironcoreapp-66a12.firebasestorage.app",
  messagingSenderId: "673931910641",
  appId: "1:673931910641:web:eb3d5a830cbcd31fc6f850",
  measurementId: "G-LBZ7JX8QQ2"
};

// Inicialización directa
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let currentUser = null;

// --- ESTADO DE MÉTRICAS ---
let totalCalorias = 0, totalProt = 0, totalCarb = 0, totalGrasa = 0, totalAgua = 0, userStreak = 1;
let metaCalorias = 2500, metaProt = 165, metaCarb = 275, metaGrasa = 69, currentGoal = 300; 

function showToast(msg) {
  const toast = document.getElementById('toast-notif');
  if(!toast) return;
  toast.innerHTML = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

// --- GESTIÓN DE AUTENTICACIÓN GOOGLE ---
const authScreen = document.getElementById('auth-screen');
const btnGoogleLogin = document.getElementById('btn-google-login');
const btnLogout = document.getElementById('btn-logout');

// Captura de redirección móvil si popup falla o recarga
getRedirectResult(auth)
  .then((result) => {
    if (result && result.user) {
      showToast('⚔️ ¡Acceso autorizado al Dojo!');
    }
  })
  .catch((error) => {
    console.error("Error en redirect:", error);
  });

if(btnGoogleLogin) {
  btnGoogleLogin.addEventListener('click', async () => {
    showToast('🔄 Conectando con Google...');
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });

    try {
      await signInWithPopup(auth, provider);
      showToast('⚔️ ¡Acceso autorizado al Dojo!');
    } catch(error) {
      console.warn("Popup bloqueado o fallido, ejecutando redirección:", error);
      if (error.code === 'auth/popup-blocked' || error.code === 'auth/cancelled-popup-request') {
        showToast('🔄 Redirigiendo a Google...');
        await signInWithRedirect(auth, provider);
      } else {
        showToast(`⚠️ ${error.code || error.message}`);
      }
    }
  });
}

if(btnLogout) {
  btnLogout.addEventListener('click', async () => {
    await signOut(auth);
    if(authScreen) authScreen.style.display = 'flex';
    showToast('🚪 Sesión cerrada.');
  });
}

onAuthStateChanged(auth, async (user) => {
  const welcomeBox = document.getElementById('user-welcome-box');
  const userNameEl = document.getElementById('user-display-name');
  const userAvatarEl = document.getElementById('user-avatar');

  if (user) {
    currentUser = user;
    if (authScreen) authScreen.style.display = 'none';

    // Saludo personalizado con el primer nombre de Google
    if (userNameEl) {
      const nombreCompleto = user.displayName || "Guerrero";
      const primerNombre = nombreCompleto.split(' ')[0]; 
      userNameEl.innerText = primerNombre;
    }

    // Avatar de perfil de Google
    if (userAvatarEl && user.photoURL) {
      userAvatarEl.src = user.photoURL;
      userAvatarEl.style.display = 'inline-block';
    }

    if (welcomeBox) welcomeBox.style.display = 'flex';

    await cargarDatosDesdeNube(user.uid);
  } else {
    currentUser = null;
    if (authScreen) authScreen.style.display = 'flex';
    if (welcomeBox) welcomeBox.style.display = 'none';
  }
});

// --- SINCRONIZACIÓN FIRESTORE ---
async function guardarEstadoNube() {
  if(!currentUser || !db) return;
  const userDocRef = doc(db, "users", currentUser.uid);
  try {
    await setDoc(userDocRef, {
      calorias: totalCalorias,
      proteina: totalProt,
      carbos: totalCarb,
      grasa: totalGrasa,
      agua: totalAgua,
      metaCal: metaCalorias,
      metaProt: metaProt,
      metaCarb: metaCarb,
      metaGrasa: metaGrasa,
      goal: currentGoal,
      streak: userStreak,
      ultimaFecha: localStorage.getItem('ic_ultima_fecha')
    }, { merge: true });
  } catch(e) { console.error("Error guardando:", e); }
}

async function cargarDatosDesdeNube(uid) {
  if(!db) return;
  const userDocRef = doc(db, "users", uid);
  const docSnap = await getDoc(userDocRef);
  
  if (docSnap.exists()) {
    const data = docSnap.data();
    totalCalorias = data.calorias || 0;
    totalProt = data.proteina || 0;
    totalCarb = data.carbos || 0;
    totalGrasa = data.grasa || 0;
    totalAgua = data.agua || 0;
    metaCalorias = data.metaCal || 2500;
    currentGoal = data.goal || 300;
    userStreak = data.streak || 1;
  }
  
  iniciarSakuraBackground();
  verificarCambioDeDia();
  actualizarDashboard();
  actualizarAguaUI();
}

// --- GENERADOR SAKURA ---
function iniciarSakuraBackground() {
  const container = document.getElementById('sakura-bg');
  if(!container) return;
  container.innerHTML = '';
  for(let i = 0; i < 15; i++) {
    const petal = document.createElement('div');
    petal.className = 'sakura-petal';
    const size = Math.random() * 8 + 4;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.4}px`;
    petal.style.left = `${Math.random() * 100}vw`;
    petal.style.animationDuration = `${Math.random() * 10 + 8}s`;
    petal.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(petal);
  }
}

// --- VERIFICACIÓN DÍA ---
function verificarCambioDeDia() {
  const hoy = new Date().toDateString();
  const ultimoDiaGuardado = localStorage.getItem('ic_ultima_fecha');

  if (!ultimoDiaGuardado) {
    localStorage.setItem('ic_ultima_fecha', hoy);
  } else if (ultimoDiaGuardado !== hoy) {
    totalCalorias = 0; totalProt = 0; totalCarb = 0; totalGrasa = 0; totalAgua = 0;
    userStreak++;
    localStorage.setItem('ic_ultima_fecha', hoy);
    guardarEstadoNube();
    showToast('🌙 Nuevo día. ¡Racha incrementada!');
  }
  const streakEl = document.getElementById('header-streak');
  if(streakEl) streakEl.innerText = `🔥 Racha: ${userStreak} días`;
}

window.reiniciarDiaActual = function() {
  if(confirm("¿Reiniciar contadores de hoy a 0?")) {
    totalCalorias = 0; totalProt = 0; totalCarb = 0; totalGrasa = 0; totalAgua = 0;
    guardarEstadoNube(); actualizarDashboard(); actualizarAguaUI();
    document.getElementById('lista-comidas').innerHTML = '';
    showToast('🔄 Balance restablecido.');
  }
};

// --- HISTORIAL ---
function cargarSeccionHistorial() {
  const historialContainer = document.getElementById('historial-container');
  let historialHistorico = JSON.parse(localStorage.getItem('ic_historial_pasado')) || [];
  
  if (historialContainer) {
    if (historialHistorico.length === 0) {
      historialContainer.innerHTML = `<p style="font-size: 13px; color: var(--text-muted);">Aún no hay días archivados.</p>`;
    } else {
      let htmlLog = "";
      historialHistorico.forEach((h, index) => {
        htmlLog += `<div style="background:#141a26; padding:12px; border-radius:8px; margin-bottom:8px; border-left:3px solid var(--primary);">
          <button class="btn-delete-item" onclick="eliminarJornada(${index})">🗑️ Borrar</button>
          <b>📅 ${h.fecha}</b><br>
          <span style="font-size: 11px; color: #a0aec0; display:block; margin-top:4px;">
            🔥 ${h.calorias} kcal &nbsp;|&nbsp; 🥩 P: ${h.proteina}g &nbsp;|&nbsp; 💧 Agua: ${h.agua}ml
          </span>
        </div>`;
      });
      historialContainer.innerHTML = htmlLog;
    }
  }

  const checkinContainer = document.getElementById('checkin-history-container');
  let checkinsHistoricos = JSON.parse(localStorage.getItem('ic_checkins')) || [];

  if (checkinContainer) {
    if (checkinsHistoricos.length === 0) {
      checkinContainer.innerHTML = `<p style="font-size: 13px; color: var(--text-muted);">No hay check-ins registrados todavía.</p>`;
    } else {
      let htmlCheck = "";
      checkinsHistoricos.forEach((c, index) => {
        htmlCheck += `<div style="background:#141a26; padding:12px; border-radius:8px; margin-bottom:8px; border-left:3px solid #ff3366;">
          <button class="btn-delete-item" onclick="eliminarCheckin(${index})">🗑️ Borrar</button>
          <b>📝 Check-in del ${c.fecha}</b><br>
          <span style="font-size: 11px; color: #a0aec0; display:block; margin-top:4px;">
            ⚖️ Peso: ${c.peso} kg &nbsp;|&nbsp; 💤 Sueño: ${c.sueno} hrs &nbsp;|&nbsp; ✨ Skincare: ${c.skincare ? 'Sí' : 'No'}
          </span>
        </div>`;
      });
      checkinContainer.innerHTML = htmlCheck;
    }
  }
}

window.eliminarJornada = function(index) {
  let historial = JSON.parse(localStorage.getItem('ic_historial_pasado')) || [];
  historial.splice(index, 1);
  localStorage.setItem('ic_historial_pasado', JSON.stringify(historial));
  cargarSeccionHistorial();
  showToast('🗑️ Jornada eliminada.');
};

window.eliminarCheckin = function(index) {
  let checkins = JSON.parse(localStorage.getItem('ic_checkins')) || [];
  checkins.splice(index, 1);
  localStorage.setItem('ic_checkins', JSON.stringify(checkins));
  cargarSeccionHistorial();
  showToast('🗑️ Check-in eliminado.');
};

window.borrarTodoHistorial = function() {
  if(confirm("¿Restablecer todo el historial archivado?")) {
    localStorage.removeItem('ic_historial_pasado');
    localStorage.removeItem('ic_checkins');
    cargarSeccionHistorial();
    showToast('🧹 Historial restablecido.');
  }
};

// --- NAVEGACIÓN ---
const navItems = document.querySelectorAll('.nav-item');
const pages = document.querySelectorAll('.page');
navItems.forEach(btn => {
  btn.addEventListener('click', () => {
    navItems.forEach(nav => nav.classList.remove('active'));
    pages.forEach(page => page.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.getAttribute('data-target')).classList.add('active');
    if(btn.getAttribute('data-target') === 'page-history') cargarSeccionHistorial();
  });
});

function setupTabs(btnClass, subTabClass) {
  const btns = document.querySelectorAll(`.${btnClass}`);
  const tabs = document.querySelectorAll(`.${subTabClass}`);
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(t => t.classList.remove('active'));
      tabs.forEach(s => s.style.display = 'none');
      btn.classList.add('active');
      document.getElementById(btn.getAttribute('data-tab')).style.display = 'block';
    });
  });
}
setupTabs('tab-btn-diet', 'sub-tab-diet');
setupTabs('tab-btn-train', 'sub-tab-train');

const bindSlider = (inputId, valId, unit) => {
  const input = document.getElementById(inputId);
  const val = document.getElementById(valId);
  if(input && val) {
    input.addEventListener('input', () => val.innerText = `${input.value} ${unit}`);
  }
};
bindSlider('input-peso', 'peso-val', 'kg');
bindSlider('input-altura', 'altura-val', 'cm');
bindSlider('input-edad', 'edad-val', 'años');

// --- HIDRATACIÓN ---
function actualizarAguaUI() {
  const metaAgua = 3000;
  let porcentaje = Math.min(100, Math.round((totalAgua / metaAgua) * 100));
  const fillBar = document.getElementById('water-fill-bar');
  const textVal = document.getElementById('water-text-val');
  if(fillBar) fillBar.style.height = `${porcentaje}%`;
  if(textVal) textVal.innerText = `${totalAgua} / ${metaAgua} ml`;
  guardarEstadoNube();
}
window.agregarAgua = ml => { totalAgua += ml; actualizarAguaUI(); showToast(`💧 +${ml} ml añadidos.`); };
window.resetAgua = () => { totalAgua = 0; actualizarAguaUI(); showToast(`🔄 Hidratación reiniciada.`); };

// --- CHAT SHŌGUN AI ---
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input-text');
const btnSendChat = document.getElementById('btn-send-chat');
const shogunResponses = [
  "La fatiga es solo una ilusión temporal de la carne. Tu mente debe comandar el hierro.",
  "Para forjar un físico de clase mundial, la proteína es tu espada y el descanso tu armadura.",
  "¿Dudas de tu progreso? Revisa tu multiplicador de fuerza. Los números no mienten."
];

function enviarMensajeShogun() {
  if(!chatInput) return;
  const texto = chatInput.value.trim();
  if(!texto) return;
  const userDiv = document.createElement('div'); userDiv.className = 'chat-msg user'; userDiv.innerText = texto;
  chatMessages.appendChild(userDiv); chatInput.value = ''; chatMessages.scrollTop = chatMessages.scrollHeight;

  setTimeout(() => {
    const aiDiv = document.createElement('div'); aiDiv.className = 'chat-msg ai';
    aiDiv.innerText = `"${shogunResponses[Math.floor(Math.random() * shogunResponses.length)]}"`;
    chatMessages.appendChild(aiDiv); chatMessages.scrollTop = chatMessages.scrollHeight;
  }, 800);
}
if(btnSendChat) btnSendChat.addEventListener('click', enviarMensajeShogun);
if(chatInput) chatInput.addEventListener('keypress', e => { if(e.key === 'Enter') enviarMensajeShogun(); });

// --- BOTTOM SHEETS ---
const overlay = document.getElementById('sheet-overlay');
let activeSheet = null;
function openSheet(sheetId) { 
  activeSheet = document.getElementById(sheetId); 
  if(overlay) overlay.style.display = 'block'; 
  if(activeSheet) {
    activeSheet.classList.add('open'); 
    setTimeout(() => activeSheet.style.bottom = '0', 10); 
  }
}
function closeSheet() { 
  if(activeSheet) { 
    activeSheet.style.bottom = '-100%'; 
    setTimeout(() => { 
      activeSheet.classList.remove('open'); 
      if(overlay) overlay.style.display = 'none'; 
    }, 300); 
  } 
}

document.querySelectorAll('.custom-select').forEach(select => {
  select.addEventListener('click', () => { window.activeSelect = select; openSheet(select.id.replace('select-', 'sheet-')); });
});
document.querySelectorAll('.sheet-option').forEach(option => {
  option.addEventListener('click', function() {
    this.parentElement.querySelectorAll('.sheet-option').forEach(opt => opt.classList.remove('active'));
    this.classList.add('active'); window.activeSelect.innerText = this.innerText; window.activeSelect.setAttribute('data-val', this.getAttribute('data-val')); closeSheet();
  });
});
if(overlay) overlay.addEventListener('click', closeSheet);

// --- PERFIL Y OBJETIVOS ---
const goalCards = document.querySelectorAll('.goal-card');
goalCards.forEach(card => {
  card.addEventListener('click', () => { goalCards.forEach(c => c.classList.remove('active')); card.classList.add('active'); currentGoal = parseInt(card.getAttribute('data-val')); });
});

const btnGuardarPerfil = document.getElementById('btn-guardar-perfil');
if(btnGuardarPerfil) {
  btnGuardarPerfil.addEventListener('click', () => {
    const peso = parseFloat(document.getElementById('input-peso').value);
    const altura = parseFloat(document.getElementById('input-altura').value);
    const edad = parseInt(document.getElementById('input-edad').value);
    const actividad = parseFloat(document.getElementById('select-actividad').getAttribute('data-val'));

    const tmb = (10 * peso) + (6.25 * altura) - (5 * edad) + 5;
    metaCalorias = Math.round((tmb * actividad) + currentGoal);
    metaProt = Math.round(peso * 2.2); 
    metaGrasa = Math.round((metaCalorias * 0.25) / 9); 
    metaCarb = Math.round((metaCalorias - ((metaProt * 4) + (metaGrasa * 9))) / 4);

    guardarEstadoNube(); actualizarGraficoProyeccion(peso, currentGoal);
    showToast(`✅ Biometría Sincronizada<br>🔥 Metas: ${metaCalorias} kcal.`);
    actualizarDashboard(); document.querySelector('[data-target="page-dashboard"]').click();
  });
}

// --- COACH TÉCNICO Y BIBLIOTECA ---
const focusData = {
  "piernas": { titulo: "Estrategia: Desarrollo de Piernas", texto: "Foco en cuádriceps, glúteos e isquios.", ejercicios: [{ nombre: "Sentadilla Libre", foco: "Cuádriceps", guia: "Baja controlado y rompe la paralela." }, { nombre: "Prensa Inclinada", foco: "Global", guia: "Pies a media plataforma." }] },
  "superior": { titulo: "Estrategia: Tren Superior", texto: "Hipertrofia en pectoral y espalda.", ejercicios: [{ nombre: "Press de Banca", foco: "Pectoral", guia: "Retrae escápulas." }, { nombre: "Dominadas", foco: "Dorsal", guia: "Rango completo." }] },
  "calistenia": { titulo: "Estrategia: Tensión Mecánica", texto: "Dominio de peso corporal.", ejercicios: [{ nombre: "Muscle-Up", foco: "Explosividad", guia: "Tracción vertical." }, { nombre: "Flexiones Diamante", foco: "Tríceps", guia: "Codos pegados." }] },
  "balance": { titulo: "Estrategia: Híbrido", texto: "Fuerza y atletismo.", ejercicios: [{ nombre: "Clean & Press", foco: "Potencia", guia: "Extensión explosiva." }] }
};
const focusCards = document.querySelectorAll('.focus-card');
const coachDiv = document.getElementById('coach-recommendation');
function renderCoachSuggestion(focusKey) {
  if(!coachDiv) return;
  const data = focusData[focusKey];
  let html = `<h4>${data.titulo}</h4><p>${data.texto}</p>`;
  data.ejercicios.forEach(ex => html += `<div class="exercise-item"><b>${ex.nombre}</b><span>Foco: ${ex.foco}</span><br>💡 <em>${ex.guia}</em></div>`);
  coachDiv.innerHTML = html; coachDiv.style.display = 'block';
}
focusCards.forEach(card => {
  card.addEventListener('click', () => { focusCards.forEach(c => c.classList.remove('active')); card.classList.add('active'); renderCoachSuggestion(card.getAttribute('data-focus')); });
});
renderCoachSuggestion("piernas");

// --- BITÁCORA ---
const btnRegistrarSerie = document.getElementById('btn-registrar-serie');
if(btnRegistrarSerie) {
  btnRegistrarSerie.addEventListener('click', () => {
    document.getElementById('work-name').value = ''; document.getElementById('work-sets').value = ''; document.getElementById('work-weight').value = ''; document.getElementById('work-rpe').value = '';
    openSheet('sheet-workout');
  });
}

const btnConfirmWorkout = document.getElementById('btn-confirm-workout');
if(btnConfirmWorkout) {
  btnConfirmWorkout.addEventListener('click', () => {
    const nombre = document.getElementById('work-name').value;
    const sets = document.getElementById('work-sets').value;
    const weight = document.getElementById('work-weight').value;
    const rpe = document.getElementById('work-rpe').value || '8';
    if(!nombre || !sets || !weight) { showToast('⚠️ Completa los campos.'); return; }

    const li = document.createElement('li');
    li.innerHTML = `<span style="color:#fff; font-weight:800;">${nombre.toUpperCase()}</span> <br> 
    <span style="color: #6b7c93; font-size: 11px; margin-top:5px; display:block;">
      🏋️ Sets: ${sets} &nbsp;|&nbsp; <span style="color:#00e5ff;">Peso: ${weight} kg</span> &nbsp;|&nbsp; <span style="color:#ffaa00;">RPE: ${rpe}</span>
    </span>`;
    document.getElementById('lista-entrenos').appendChild(li); closeSheet(); showToast('💪 Serie registrada.');
  });
}

// --- RANGOS SAMURAI ---
const rangos = [
  { nombre: "Ashigaru", minRatio: 0, color: "#6b7c93", msg: "Primer paso." },
  { nombre: "Rōnin", minRatio: 1.5, color: "#ffaa00", msg: "Camino propio." },
  { nombre: "Samurái", minRatio: 2.5, color: "#ff3366", msg: "Honor y disciplina." },
  { nombre: "Daimyō", minRatio: 3.5, color: "#9933ff", msg: "Élite del hierro." },
  { nombre: "IRON SHŌGUN", minRatio: 4.5, color: "#00e5ff", msg: "Comandante Supremo." }
];

const btnCalcularRango = document.getElementById('btn-calcular-rango');
if(btnCalcularRango) {
  btnCalcularRango.addEventListener('click', () => {
    const bw = parseFloat(document.getElementById('input-peso').value) || 75;
    const bench = parseFloat(document.getElementById('rm-bench').value) || 0;
    const squat = parseFloat(document.getElementById('rm-squat').value) || 0;
    const deadlift = parseFloat(document.getElementById('rm-deadlift').value) || 0;
    if(bench === 0 && squat === 0 && deadlift === 0) { showToast('⚠️ Ingresa marcas.'); return; }
    const total = bench + squat + deadlift; const ratio = (total / bw).toFixed(2);
    let rangoActual = rangos[0], progresion = 0;
    for(let i = 0; i < rangos.length; i++) {
      if(ratio >= rangos[i].minRatio) {
        rangoActual = rangos[i];
        progresion = i < rangos.length - 1 ? ((ratio - rangos[i].minRatio) / (rangos[i+1].minRatio - rangos[i].minRatio)) * 100 : 100;
      }
    }
    document.getElementById('rango-titulo').innerText = rangoActual.nombre; document.getElementById('rango-titulo').style.color = rangoActual.color;
    document.getElementById('rango-multi').innerText = `${ratio}x`; document.getElementById('rango-total').innerText = total; document.getElementById('rango-msg').innerText = rangoActual.msg;
    const progressBar = document.getElementById('rango-progreso'); 
    if(progressBar) {
      progressBar.style.width = `${progresion}%`; 
      progressBar.style.backgroundColor = rangoActual.color;
    }
    const rankCard = document.getElementById('rank-display-card');
    if(rankCard) rankCard.style.borderColor = rangoActual.color;
    const headerRank = document.getElementById('header-rank');
    if(headerRank) headerRank.innerHTML = `Rango: <span style="color: ${rangoActual.color};">${rangoActual.nombre.toUpperCase()}</span>`;
    showToast(`⚔️ Rango: ${rangoActual.nombre.toUpperCase()}`);
  });
}

// --- GRÁFICOS ---
let macroChart = null;
const ctxDonut = document.getElementById('macroChart');
if(ctxDonut) {
  macroChart = new Chart(ctxDonut.getContext('2d'), {
      type: 'doughnut',
      data: { labels: ['Prot', 'Carb', 'Gras'], datasets: [{ data: [0.1, 0.1, 0.1], backgroundColor: ['#ff3366', '#00e5ff', '#ffaa00'], borderWidth: 0 }] },
      options: { responsive: true, maintainAspectRatio: false, cutout: '82%', plugins: { legend: { display: false } } }
  });
}

let progressChart = null;
const ctxLine = document.getElementById('progressChart');
if(ctxLine) {
  progressChart = new Chart(ctxLine.getContext('2d'), {
      type: 'line',
      data: { labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'], datasets: [{ label: 'Proyección (kg)', data: [75, 75.2, 75.5, 76], borderColor: '#00e5ff', backgroundColor: 'rgba(0, 229, 255, 0.1)', borderWidth: 3, fill: true, tension: 0.4 }] },
      options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } }
  });
}

function actualizarGraficoProyeccion(pesoActual, metaCalorica) {
  if(!progressChart) return;
  let variacionSemanal = metaCalorica / 1000; 
  progressChart.data.datasets[0].data = [pesoActual, pesoActual + variacionSemanal, pesoActual + (variacionSemanal * 2), pesoActual + (variacionSemanal * 3)];
  progressChart.update();
}

function actualizarDashboard() {
  const calTotal = document.getElementById('calorias-total');
  const protTotal = document.getElementById('prot-total');
  const carbTotal = document.getElementById('carb-total');
  const grasTotal = document.getElementById('gras-total');
  const enConsumidas = document.getElementById('en-consumidas');
  const enNetas = document.getElementById('en-netas');

  if(calTotal) calTotal.innerText = `${totalCalorias} / ${metaCalorias} kcal`;
  if(protTotal) protTotal.innerText = `${totalProt}g`;
  if(carbTotal) carbTotal.innerText = `${totalCarb}g`;
  if(grasTotal) grasTotal.innerText = `${totalGrasa}g`;
  
  if(enConsumidas) enConsumidas.innerText = `${totalCalorias} kcal`;
  let netas = totalCalorias - 450;
  if(enNetas) enNetas.innerText = `${netas} kcal`;

  if(macroChart && (totalProt > 0 || totalCarb > 0 || totalGrasa > 0)) {
      macroChart.data.datasets[0].data = [totalProt, totalCarb, totalGrasa];
      macroChart.update();
  }
}

// --- BASE DE ALIMENTOS ---
const fatSecretDB = [
  { nombre: "Pechuga de Pollo (100g)", cal: 165, prot: 31, carb: 0, gras: 3.6 },
  { nombre: "Arroz Blanco Cocido (100g)", cal: 130, prot: 2.7, carb: 28, gras: 0.3 },
  { nombre: "Avena Tradicional (100g)", cal: 389, prot: 17, carb: 66, gras: 7 },
  { nombre: "Huevo Entero (1 unidad)", cal: 72, prot: 6.3, carb: 0.4, gras: 4.8 },
  { nombre: "Proteína IronCore (1 scoop / 30g)", cal: 120, prot: 25, carb: 3, gras: 1 },
  { nombre: "Creatina Monohidrato (5g)", cal: 0, prot: 0, carb: 0, gras: 0 },
  { nombre: "Salmón a la Plancha (100g)", cal: 206, prot: 22, carb: 0, gras: 12 }
];
let selectedFoodItem = null;

const btnAbrirManual = document.getElementById('btn-abrir-manual');
if(btnAbrirManual) {
  btnAbrirManual.addEventListener('click', () => {
    document.getElementById('food-search').value = ''; document.getElementById('food-results-list').innerHTML = '';
    document.getElementById('edit-qty').value = '100'; document.getElementById('edit-cal').value = ''; document.getElementById('edit-prot').value = ''; document.getElementById('edit-carb').value = ''; document.getElementById('edit-gras').value = '';
    openSheet('sheet-add-food');
  });
}

const foodSearch = document.getElementById('food-search');
if(foodSearch) {
  foodSearch.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();
    const resultsContainer = document.getElementById('food-results-list');
    if(!resultsContainer) return;
    resultsContainer.innerHTML = '';
    if(query.length === 0) return;
    const matches = fatSecretDB.filter(f => f.nombre.toLowerCase().includes(query));
    if(matches.length === 0) { resultsContainer.innerHTML = `<div style="font-size:11px; color:var(--text-muted); padding:4px;">No encontrado. Ingresa abajo.</div>`; return; }
    matches.forEach(item => {
      const div = document.createElement('div'); div.className = 'food-search-item';
      div.innerHTML = `<span>${item.nombre}</span> <span style="color:var(--primary);">${item.cal} kcal</span>`;
      div.addEventListener('click', () => {
        selectedFoodItem = item; document.getElementById('food-search').value = item.nombre;
        document.getElementById('edit-cal').value = item.cal; document.getElementById('edit-prot').value = item.prot;
        document.getElementById('edit-carb').value = item.carb; document.getElementById('edit-gras').value = item.gras;
        resultsContainer.innerHTML = '';
      });
      resultsContainer.appendChild(div);
    });
  });
}

const editQty = document.getElementById('edit-qty');
if(editQty) {
  editQty.addEventListener('input', (e) => {
    let qty = parseFloat(e.target.value) || 100;
    if(selectedFoodItem) {
      let factor = qty / 100;
      document.getElementById('edit-cal').value = Math.round(selectedFoodItem.cal * factor);
      document.getElementById('edit-prot').value = Math.round(selectedFoodItem.prot * factor);
      document.getElementById('edit-carb').value = Math.round(selectedFoodItem.carb * factor);
      document.getElementById('edit-gras').value = Math.round(selectedFoodItem.gras * factor);
    }
  });
}

const btnConfirmFoodFinal = document.getElementById('btn-confirm-food-final');
if(btnConfirmFoodFinal) {
  btnConfirmFoodFinal.addEventListener('click', () => {
    let mealTime = document.getElementById('food-meal-time').value;
    let nombreDisp = document.getElementById('food-search').value || "Alimento Personalizado";
    let cal = parseInt(document.getElementById('edit-cal').value) || 0;
    let prot = parseInt(document.getElementById('edit-prot').value) || 0;
    let carb = parseInt(document.getElementById('edit-carb').value) || 0;
    let gras = parseInt(document.getElementById('edit-gras').value) || 0;

    if(cal === 0 && prot === 0) { showToast('⚠️ Ingresa calorías o proteína.'); return; }
    sumarMacros(cal, prot, carb, gras, `[${mealTime}] ${nombreDisp}`);
    closeSheet(); showToast(`✅ ${nombreDisp.toUpperCase()} registrado.`);
  });
}

function sumarMacros(cal, prot, carb, gras, nombreDisplay) {
  totalCalorias += cal; totalProt += prot; totalCarb += carb; totalGrasa += gras;
  guardarEstadoNube(); actualizarDashboard();
  const listaComidas = document.getElementById('lista-comidas');
  if(listaComidas) {
    const li = document.createElement('li');
    li.innerHTML = `<span style="color:#fff; font-weight:800;">${nombreDisplay}</span> <br> 
    <span style="color: #6b7c93; font-size: 11px; margin-top:5px; display:block;">
      🔥 ${cal} kcal &nbsp;|&nbsp; <span style="color:#ff3366;">P: ${prot}g</span> &nbsp;|&nbsp; <span style="color:#00e5ff;">C: ${carb}g</span> &nbsp;|&nbsp; <span style="color:#ffaa00;">G: ${gras}g</span>
    </span>`;
    listaComidas.appendChild(li);
  }
  const dashboardTab = document.querySelector('[data-target="page-dashboard"]');
  if(dashboardTab) dashboardTab.click();
}

// --- CHECK-IN ---
const btnCheckin = document.getElementById('btn-checkin');
if(btnCheckin) {
  btnCheckin.addEventListener('click', () => openSheet('sheet-checkin'));
}

const btnConfirmCheckin = document.getElementById('btn-confirm-checkin');
if(btnConfirmCheckin) {
  btnConfirmCheckin.addEventListener('click', () => {
    const peso = document.getElementById('checkin-peso').value; const sueno = document.getElementById('checkin-sueno').value; const skincare = document.getElementById('checkin-skincare').checked;
    if(!peso || !sueno) { showToast('⚠️ Completa peso y sueño.'); return; }
    if(peso) document.getElementById('input-peso').value = peso; 
    let checkinsHistoricos = JSON.parse(localStorage.getItem('ic_checkins')) || [];
    checkinsHistoricos.unshift({ fecha: new Date().toLocaleDateString(), peso, sueno, skincare });
    localStorage.setItem('ic_checkins', JSON.stringify(checkinsHistoricos));
    closeSheet(); showToast('📈 Check-in guardado.');
  });
}

const btnGenerarPlan = document.getElementById('btn-generar-plan');
if(btnGenerarPlan) {
  btnGenerarPlan.addEventListener('click', () => {
    const planRes = document.getElementById('plan-resultado');
    if(planRes) planRes.style.display = 'block';
    const polloGramos = Math.round((metaProt * 0.4) / 0.31); const arrozGramos = Math.round((metaCarb * 0.5) / 0.28); 
    const comidasPlan = document.getElementById('comidas-plan');
    if(comidasPlan) {
      comidasPlan.innerHTML = `<p><strong style="color:var(--primary)">COMIDA 1:</strong><br> 4 Huevos + ${Math.round(metaCarb * 0.2)}g Avena.</p><p><strong style="color:var(--primary)">COMIDA 2:</strong><br> ${Math.round(polloGramos * 0.5)}g Pollo + ${Math.round(arrozGramos * 0.5)}g Arroz.</p><p><strong style="color:var(--primary)">COMIDA 3:</strong><br> 1.5 Scoops <b>Proteína IronCore</b> + 5g Creatina.</p>`;
    }
    const listaCompras = document.getElementById('lista-compras');
    if(listaCompras) {
      listaCompras.innerHTML = `<li><input type="checkbox"> ${Math.round((polloGramos * 7) / 1000)} kg Pollo</li><li><input type="checkbox"> 1 kg Arroz</li><li><input type="checkbox"> 1 Bandeja Huevos</li>`;
    }
    showToast('🛒 Plan generado.');
  });
}

const tips = [
  "La tensión mecánica es clave en la calistenia; controla siempre la excéntrica.",
  "El sueño es tu mejor suplemento para recuperar el sistema nervioso central.",
  "Hidratación: una pérdida del 2% de agua reduce drásticamente tu tiempo de reacción.",
  "Consulta al Shōgun AI en su santuario ante cualquier duda de rendimiento."
];
const dailyTip = document.getElementById('daily-tip');
if(dailyTip) dailyTip.innerText = tips[Math.floor(Math.random() * tips.length)];

// --- REGISTRO SERVICE WORKER PWA ---
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js')
      .then(() => console.log('SW activo'))
      .catch((err) => console.log('SW error:', err));
  });
}

// --- INICIALIZAR VISTA ---
iniciarSakuraBackground();
