// --- IMPORTACIÓN MODULAR DE FIREBASE ---
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, getDocs, deleteDoc, query, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

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
let currentRankName = "Ashigaru";
let userProfile = { perfilCompleto: false, nickname: "", genero: "M", edad: 25, peso: 75, altura: 175, metaObj: 0, actividad: 1.55 };

function getTodayKey() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function showToast(msg) { const toast = document.getElementById('toast-notif'); if(!toast) return; toast.innerHTML = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3500); }

// --- TIPS DEL COACH ---
const ironCoreTips = [
  "⚡ La creatina (5g) funciona por acumulación. Tómala a cualquier hora, idealmente con carbohidratos.",
  "🥩 Hipertrofia: Consume entre 1.8g y 2.2g de proteína por cada kilo de tu peso corporal.",
  "💧 La hidratación lubrica tus articulaciones. Intenta tomar 1 litro por cada 25kg de peso.",
  "💤 El descanso es vital: duerme 8 horas para reparar tu Sistema Nervioso Central.",
  "🔥 En déficit agresivo, prioriza alimentos voluminosos como verduras para engañar la saciedad."
];
window.addEventListener('DOMContentLoaded', () => { 
  const dt = document.getElementById('daily-tip');
  if(dt) dt.innerText = ironCoreTips[Math.floor(Math.random() * ironCoreTips.length)]; 
});

// --- AUTENTICACIÓN GOOGLE ---
const authScreen = document.getElementById('auth-screen');
getRedirectResult(auth).then((result) => { if (result && result.user) showToast('⚔️ ¡Acceso autorizado al Dojo!'); }).catch(console.error);

document.getElementById('btn-google-login')?.addEventListener('click', async () => {
  showToast('🔄 Conectando...'); const provider = new GoogleAuthProvider(); provider.setCustomParameters({ prompt: 'select_account' });
  try { await signInWithPopup(auth, provider); showToast('⚔️ ¡Acceso autorizado!'); } catch(error) { await signInWithRedirect(auth, provider); }
});

document.getElementById('btn-logout')?.addEventListener('click', () => signOut(auth));
document.getElementById('btn-logout-profile')?.addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user; 
    if(authScreen) authScreen.style.display = 'none'; 
    const nickElem = document.getElementById('ob-nickname');
    if(nickElem) nickElem.value = (user.displayName || "Guerrero").split(' ')[0]; 
    await cargarDatosDesdeNube(user.uid);
  } else { 
    currentUser = null; 
    if(authScreen) authScreen.style.display = 'flex'; 
    const wb = document.getElementById('user-welcome-box');
    if(wb) wb.style.display = 'none'; 
  }
});

function generarAvatarPorRango(nickname, rango) {
  let bg = "1a2130"; if(rango === "Rōnin") bg = "ffaa00"; if(rango === "Samurái") bg = "ff3366"; if(rango === "Daimyō") bg = "9933ff"; if(rango === "IRON SHŌGUN") bg = "00e5ff";
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${nickname}-${rango}&backgroundColor=${bg}`;
}

// --- ONBOARDING Y FIREBASE ---
const obScreen = document.getElementById('onboarding-screen'); const obTrack = document.getElementById('ob-track'); const obBar = document.getElementById('ob-bar'); let currentObStep = 0;
window.abrirOnboarding = function(isEdit = false) { 
  if(!obScreen) return;
  obScreen.style.display = 'flex'; 
  currentObStep = 0; 
  if(obTrack) obTrack.style.transform = `translateX(0%)`; 
  if(obBar) obBar.style.width = '33.33%'; 
  if(isEdit) { 
    const t = document.getElementById('ob-title'); if(t) t.innerText = "Editar Credencial"; 
    const nick = document.getElementById('ob-nickname'); if(nick) nick.value = userProfile.nickname; 
    window.seleccionarGenero(userProfile.genero); 
    const ed = document.getElementById('ob-edad'); if(ed) ed.value = userProfile.edad; 
    const pe = document.getElementById('ob-peso'); if(pe) pe.value = userProfile.peso; 
    const al = document.getElementById('ob-altura'); if(al) al.value = userProfile.altura; 
    document.querySelectorAll('.ob-goal-card').forEach(c => { 
      c.classList.remove('active'); 
      if(parseInt(c.getAttribute('data-val')) === userProfile.metaObj) c.classList.add('active'); 
    }); 
  } else { 
    const t = document.getElementById('ob-title'); if(t) t.innerText = "Ritual de Iniciación"; 
  } 
};

window.moverOnboarding = function(dir) { 
  if(dir === 1 && currentObStep === 0) { 
    const nickVal = document.getElementById('ob-nickname')?.value.trim();
    if(!nickVal) { showToast('⚠️ Elige un apodo.'); return; } 
  } 
  currentObStep += dir; 
  if(currentObStep < 0) currentObStep = 0; 
  if(currentObStep > 2) currentObStep = 2; 
  if(obTrack) obTrack.style.transform = `translateX(-${currentObStep * 33.333}%)`; 
  if(obBar) obBar.style.width = `${(currentObStep + 1) * 33.33}%`; 
};

window.seleccionarGenero = function(gen) { 
  userProfile.genero = gen; 
  document.querySelectorAll('.ob-gender-btn').forEach(b => { 
    if(b.getAttribute('data-gen') === gen) b.classList.add('active'); 
    else b.classList.remove('active'); 
  }); 
};

window.seleccionarMetaOb = function(elem) { 
  document.querySelectorAll('.ob-goal-card').forEach(c => c.classList.remove('active')); 
  elem.classList.add('active'); 
  userProfile.metaObj = parseInt(elem.getAttribute('data-val')); 
};

// FINALIZAR ONBOARDING CON LECTURA PROTEGIDA (CORRIGE EL ERROR DE "SELLAR RITUAL")
window.finalizarOnboarding = async function() {
  const nickInput = document.getElementById('ob-nickname');
  const edadInput = document.getElementById('ob-edad');
  const pesoInput = document.getElementById('ob-peso');
  const alturaInput = document.getElementById('ob-altura');
  const actSelect = document.getElementById('select-actividad');

  userProfile.nickname = nickInput?.value.trim() || "Guerrero";
  userProfile.edad = parseInt(edadInput?.value) || 25;
  userProfile.peso = parseFloat(pesoInput?.value) || 75;
  userProfile.altura = parseInt(alturaInput?.value) || 175;
  userProfile.actividad = actSelect && actSelect.getAttribute('data-val') ? parseFloat(actSelect.getAttribute('data-val')) : (userProfile.actividad || 1.55);
  userProfile.perfilCompleto = true;

  let tmb = userProfile.genero === 'M' 
    ? (10 * userProfile.peso) + (6.25 * userProfile.altura) - (5 * userProfile.edad) + 5 
    : (10 * userProfile.peso) + (6.25 * userProfile.altura) - (5 * userProfile.edad) - 161;
  let tdee = tmb * userProfile.actividad;

  metaCalorias = Math.round(tdee + (userProfile.metaObj || 0));
  metaProt = (userProfile.metaObj || 0) > 0 ? Math.round(userProfile.peso * 2.0) : Math.round(userProfile.peso * 2.2);
  metaGrasa = Math.round((metaCalorias * 0.25) / 9);
  metaCarb = Math.round((metaCalorias - ((metaProt * 4) + (metaGrasa * 9))) / 4);

  await guardarEstadoNube();
  actualizarUIHeader();
  actualizarUIPerfil();
  actualizarDashboard();
  actualizarGraficoProyeccion(userProfile.peso, userProfile.metaObj);
  actualizarLabelMetaIA();

  if(obScreen) obScreen.style.display = 'none';
  showToast(`✅ Credencial Sincronizada`);
  document.querySelector('[data-target="page-dashboard"]')?.click();
};

async function guardarEstadoNube() { 
  if(!currentUser || !db) return; 
  try { 
    await setDoc(doc(db, "users", currentUser.uid), { 
      calorias: totalCalorias, proteina: totalProt, carbos: totalCarb, grasa: totalGrasa, agua: totalAgua, 
      metaCal: metaCalorias, metaProt: metaProt, metaCarb: metaCarb, metaGrasa: metaGrasa, 
      streak: userStreak, ultimaFecha: localStorage.getItem('ic_ultima_fecha'), 
      currentRankName, ...userProfile 
    }, { merge: true }); 
  } catch(e) { console.error(e); } 
}

async function cargarDatosDesdeNube(uid) { 
  if(!db) return; 
  const docSnap = await getDoc(doc(db, "users", uid)); 
  if (docSnap.exists()) { 
    const d = docSnap.data(); 
    totalCalorias = d.calorias || 0; 
    totalProt = d.proteina || 0; 
    totalCarb = d.carbos || 0; 
    totalGrasa = d.grasa || 0; 
    totalAgua = d.agua || 0; 
    metaCalorias = d.metaCal || 2500; 
    metaProt = d.metaProt || 165; 
    metaCarb = d.metaCarb || 275; 
    metaGrasa = d.metaGrasa || 69; 
    userStreak = d.streak || 1; 
    userProfile.perfilCompleto = d.perfilCompleto || false; 
    userProfile.nickname = d.nickname || ""; 
    userProfile.genero = d.genero || "M"; 
    userProfile.edad = d.edad || 25; 
    userProfile.peso = d.peso || 75; 
    userProfile.altura = d.altura || 175; 
    userProfile.metaObj = d.metaObj !== undefined ? d.metaObj : 0; 
    userProfile.actividad = d.actividad || 1.55; 
    currentRankName = d.currentRankName || "Ashigaru"; 
  } 
  if(!userProfile.perfilCompleto) { 
    window.abrirOnboarding(false); 
  } else { 
    actualizarUIHeader(); 
    actualizarUIPerfil(); 
    actualizarLabelMetaIA(); 
  } 
  iniciarSakuraBackground(); 
  verificarCambioDeDia(); 
  actualizarDashboard(); 
  actualizarAguaUI(); 
  await cargarRegistrosDelDia(uid); 
  actualizarGraficoProyeccion(userProfile.peso, userProfile.metaObj); 
}

function actualizarUIHeader() { 
  const dn = document.getElementById('user-display-name'); if(dn) dn.innerText = userProfile.nickname.toUpperCase(); 
  const avatarHeader = document.getElementById('user-avatar'); 
  if(avatarHeader) {
    avatarHeader.src = generarAvatarPorRango(userProfile.nickname, currentRankName); 
    avatarHeader.style.display = 'inline-block'; 
  }
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

// --- BASES DE DATOS EXTERNAS (ALIMENTOS JSON Y EJERCICIOS JSON DIRECTO EN ESPAÑOL) ---
let oracleDB = []; 
let exercisesDB = [];

async function inicializarBases() {
  // 1. Cargar Alimentos JSON
  try {
    const resFood = await fetch('alimentos.json?v=' + Date.now());
    if (resFood.ok) oracleDB = await resFood.json();
  } catch (error) { console.error("Error Alimentos JSON:", error); }
  
  // 2. Cargar Ejercicios JSON (Apuntando a ejercicios.json con bypass de caché)
  try {
    const resEx = await fetch('ejercicios.json?v=' + Date.now());
    if (!resEx.ok) throw new Error('No se pudo cargar ejercicios.json (HTTP ' + resEx.status + ')');
    exercisesDB = await resEx.json();
    console.log(`⚔️ Base de Combate sincronizada con ${exercisesDB.length} ejercicios desde ejercicios.json.`);
  } catch (error) { 
    console.error("Error cargando ejercicios.json:", error);
    showToast("⚠️ Error al cargar el catálogo de ejercicios en español.");
  }
}
window.addEventListener('DOMContentLoaded', inicializarBases);

// --- ORÁCULO DE NUTRICIÓN ---
let weeklyPlan = []; let selectedDayIndex = 0; let activeAllergies = [];
const allergyInput = document.getElementById('oracle-allergies-input'); const allergyContainer = document.getElementById('allergy-tags-container');
if(allergyInput) { 
  allergyInput.addEventListener('keypress', (e) => { 
    if(e.key === 'Enter' || e.key === ',') { 
      e.preventDefault(); 
      const val = allergyInput.value.trim().toLowerCase(); 
      if(val && !activeAllergies.includes(val)) { activeAllergies.push(val); renderAllergyChips(); } 
      allergyInput.value = ''; 
    } 
  }); 
}

function renderAllergyChips() { 
  if(!allergyContainer) return; 
  allergyContainer.innerHTML = ''; 
  activeAllergies.forEach((allergy, index) => { 
    const chip = document.createElement('div'); 
    chip.className = 'allergy-chip'; 
    chip.innerHTML = `<span>${allergy}</span><span class="allergy-chip-close" onclick="window.removeAllergy(${index})">×</span>`; 
    allergyContainer.appendChild(chip); 
  }); 
} 
window.removeAllergy = function(index) { activeAllergies.splice(index, 1); renderAllergyChips(); };

function actualizarLabelMetaIA() { 
  let label = "Mantenimiento"; 
  if(userProfile.metaObj < 0) label = "Déficit Agresivo (Prioridad: Volumen)"; 
  if(userProfile.metaObj > 0) label = "Volumen (Prioridad: Densidad)"; 
  const metaLabel = document.getElementById('oracle-target-goal'); if(metaLabel) metaLabel.innerText = label; 
  const calsLabel = document.getElementById('oracle-target-cals'); if(calsLabel) calsLabel.innerText = metaCalorias; 
}

let dynamicDays = [];
function calcularFechasSemana() { 
  dynamicDays = []; 
  const date = new Date(); 
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']; 
  const monthNames = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']; 
  for(let i=0; i<7; i++) { 
    let d = new Date(date); 
    d.setDate(d.getDate() + i); 
    dynamicDays.push({ index: i, shortName: dayNames[d.getDay()], fullName: `${dayNames[d.getDay()]}, ${d.getDate()} ${monthNames[d.getMonth()]}` }); 
  } 
}

document.getElementById('btn-generar-plan')?.addEventListener('click', () => { 
  if (oracleDB.length === 0) { showToast("⚠️ Sincronizando... Espera."); return; } 
  calcularFechasSemana(); 
  generarPlanSemanal(); 
  document.getElementById('oracle-form-card').style.display = 'none'; 
  document.getElementById('plan-resultado').style.display = 'block'; 
  showToast('🤖 Plan clínico generado.'); 
});

window.seleccionarDiaPlan = function(index) { 
  selectedDayIndex = index; 
  document.querySelectorAll('.day-chip').forEach(btn => btn.classList.remove('active')); 
  document.querySelector(`.day-chip[data-day="${index}"]`)?.classList.add('active'); 
  const ph = document.getElementById('plan-date-header'); if(ph) ph.innerText = dynamicDays[index].fullName; 
  renderizarDiaSeleccionado(); 
};

function generarPlanSemanal() { 
  weeklyPlan = []; 
  const distribution = [ 
    { tipo: 'desayuno', cals: metaCalorias * 0.25 }, 
    { tipo: 'almuerzo', cals: metaCalorias * 0.35 }, 
    { tipo: 'cena', cals: metaCalorias * 0.30 }, 
    { tipo: 'snack', cals: metaCalorias * 0.10 } 
  ]; 
  for(let i=0; i<7; i++) { 
    let dayMeals = distribution.map(slot => obtenerComidaAlgoritmo(slot.tipo, slot.cals, [])); 
    weeklyPlan.push(dayMeals); 
  } 
  const scrollContainer = document.getElementById('day-selector-container'); 
  if(scrollContainer) {
    scrollContainer.innerHTML = ''; 
    dynamicDays.forEach(day => { 
      scrollContainer.innerHTML += `<button class="day-chip ${day.index === 0 ? 'active' : ''}" data-day="${day.index}" onclick="window.seleccionarDiaPlan(${day.index})">${day.shortName}</button>`; 
    }); 
  }
  window.seleccionarDiaPlan(0); 
}

function filtrarBaseDatos(tipo, excludesId) { 
  let currentDietType = document.getElementById('oracle-diet-type')?.value || 'todo'; 
  let isCeliac = document.getElementById('oracle-celiac')?.checked || false; 
  let isLactose = document.getElementById('oracle-lactose')?.checked || false; 
  let isSibo = document.getElementById('oracle-sibo')?.checked || false; 
  let candidatos = oracleDB.filter(m => { 
    if(m.tipo !== tipo) return false; 
    if(m.dietas && !m.dietas.includes(currentDietType)) return false; 
    if(excludesId && excludesId.includes(m.id)) return false; 
    if(isCeliac && m.glutenFree === false) return false; 
    if(isLactose && m.lactoseFree === false) return false; 
    if(isSibo && m.siboSafe === false) return false; 
    let jsonStr = JSON.stringify(m).toLowerCase(); 
    for(let a of activeAllergies) { if(jsonStr.includes(a)) return false; } 
    return true; 
  }); 
  if(candidatos.length === 0) candidatos = oracleDB.filter(m => m.tipo === tipo); 
  let bestCandidates = []; 
  if(userProfile.metaObj > 0) { bestCandidates = candidatos.filter(m => m.isDense === true); } 
  else if (userProfile.metaObj < 0) { bestCandidates = candidatos.filter(m => m.isVolume === true); } 
  if(bestCandidates.length > 0) candidatos = bestCandidates; 
  return candidatos; 
}

function calcularMacrosPorcion(comidaBase, targetCals) { 
  const factor = targetCals / (comidaBase.calBase || 1); 
  let ingredientesAdaptados = (comidaBase.ingredientes || []).map(ing => { 
    let qtyCalculada = ing.baseQty * factor; 
    qtyCalculada = ing.unidad === 'unidades' || ing.unidad === 'scoops' || ing.unidad === 'rebanadas' || ing.unidad === 'porción' ? parseFloat(qtyCalculada.toFixed(1)) : Math.round(qtyCalculada); 
    return { nombre: ing.nombre, cantidad: qtyCalculada, unidad: ing.unidad }; 
  }); 
  return { 
    id: comidaBase.id, 
    tipo: comidaBase.tipo, 
    name: comidaBase.name, 
    cals: Math.round(comidaBase.calBase * factor), 
    prot: Math.round(comidaBase.prot * factor), 
    carb: Math.round(comidaBase.carb * factor), 
    gras: Math.round(comidaBase.gras * factor), 
    ingredientes: ingredientesAdaptados 
  }; 
}

function obtenerComidaAlgoritmo(tipo, targetCals, excludesId) { 
  const candidatos = filtrarBaseDatos(tipo, excludesId); 
  if(candidatos.length === 0) return { id: 0, tipo: tipo, name: "Sin Opciones", cals: targetCals, prot: 0, carb: 0, gras: 0, ingredientes: [] }; 
  const selected = candidatos[Math.floor(Math.random() * candidatos.length)]; 
  return calcularMacrosPorcion(selected, targetCals); 
}

function renderizarDiaSeleccionado() { 
  const container = document.getElementById('comidas-plan'); 
  if(!container) return; 
  container.innerHTML = ''; 
  const dayMeals = weeklyPlan[selectedDayIndex] || []; 
  dayMeals.forEach((meal, idx) => { 
    let ingredientesHTML = meal.ingredientes.length > 0 ? meal.ingredientes.map(i => `<span style="display:block; margin-bottom:3px;">• ${i.cantidad} ${i.unidad} de ${i.nombre}</span>`).join('') : `• Intenta cambiar filtros`; 
    container.innerHTML += `<div class="plan-meal-card"><div class="plan-meal-header"><span class="plan-meal-title">${meal.tipo}</span><button class="btn-swap" onclick="window.abrirMenuReemplazo(${idx})">🔄 Cambiar</button></div><div class="plan-meal-desc"><b>${meal.name}</b>${ingredientesHTML}</div><div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;"><span class="plan-meal-cals">🔥 ${meal.cals} kcal</span><span style="font-size:11px; color:var(--text-muted); font-weight:800;">P: <span style="color:#ff3366;">${meal.prot}g</span> | C: <span style="color:#00e5ff;">${meal.carb}g</span> | G: <span style="color:#ffaa00;">${meal.gras}g</span></span></div></div>`; 
  }); 
}

let swapTargetIndex = -1;
window.abrirMenuReemplazo = function(mealIndex) { 
  swapTargetIndex = mealIndex; 
  const oldMeal = weeklyPlan[selectedDayIndex][mealIndex]; 
  const targetCals = oldMeal.cals; 
  let candidatos = filtrarBaseDatos(oldMeal.tipo, [oldMeal.id]); 
  const listContainer = document.getElementById('sheet-swap-list'); 
  if(!listContainer) return;
  listContainer.innerHTML = ''; 
  if(candidatos.length === 0) { 
    listContainer.innerHTML = `<p style="font-size:12px; color:#ff3366;">No hay más opciones para tus filtros.</p>`; 
  } else { 
    for(let i=0; i<candidatos.length; i++) { 
      let opcionEscalada = calcularMacrosPorcion(candidatos[i], targetCals); 
      let objData = encodeURIComponent(JSON.stringify(opcionEscalada)); 
      listContainer.innerHTML += `<div class="swap-option-card" onclick="window.confirmarReemplazo('${objData}')"><b>${opcionEscalada.name}</b><span>🔥 ${opcionEscalada.cals} kcal | P: ${opcionEscalada.prot}g | C: ${opcionEscalada.carb}g | G: ${opcionEscalada.gras}g</span></div>`; 
    } 
  } 
  window.openSheet('sheet-swap-meal'); 
};

window.confirmarReemplazo = function(encodedData) { 
  if(swapTargetIndex > -1) { 
    const newMeal = JSON.parse(decodeURIComponent(encodedData)); 
    weeklyPlan[selectedDayIndex][swapTargetIndex] = newMeal; 
    renderizarDiaSeleccionado(); 
    window.closeSheet(); 
    showToast(`✅ Actualizado.`); 
  } 
};

window.generarListaCompras = function() { 
  const ul = document.getElementById('lista-compras-ui'); 
  if(!ul) return; 
  let listaConsolidada = {}; 
  weeklyPlan.forEach(dia => { 
    dia.forEach(comida => { 
      comida.ingredientes.forEach(ing => { 
        let key = `${ing.nombre} (${ing.unidad})`; 
        listaConsolidada[key] = (listaConsolidada[key] || 0) + ing.cantidad; 
      }); 
    }); 
  }); 
  ul.innerHTML = ''; 
  for (let key in listaConsolidada) { 
    let rawQty = listaConsolidada[key]; 
    let qtyDisplay = key.includes('unidades') || key.includes('scoops') || key.includes('rebanadas') || key.includes('porción') ? rawQty.toFixed(1) : Math.round(rawQty); 
    let match = key.match(/(.*) \((.*)\)/); 
    let nombreLimpio = match ? match[1] : key; 
    let unidadLimpia = match ? match[2] : ''; 
    ul.innerHTML += `<li><input type="checkbox" style="accent-color:var(--primary); width:18px; height:18px;"> <span style="flex:1;">${nombreLimpio}</span> <b style="color:var(--primary); font-size:12px;">${qtyDisplay} ${unidadLimpia}</b></li>`; 
  } 
  window.openSheet('sheet-compras'); 
};

document.getElementById('btn-add-planned')?.addEventListener('click', () => { 
  if(!weeklyPlan || weeklyPlan.length === 0) { showToast('⚠️ Primero genera un Plan Semanal.'); return; } 
  const listContainer = document.getElementById('sheet-planned-list'); 
  if(!listContainer) return;
  listContainer.innerHTML = ''; 
  const todaysPlan = weeklyPlan[0]; 
  todaysPlan.forEach(meal => { 
    let objData = encodeURIComponent(JSON.stringify(meal)); 
    listContainer.innerHTML += `<div class="swap-option-card" onclick="window.registrarComidaPlaneada('${objData}')"><span style="font-size:10px; color:var(--primary); font-weight:800; text-transform:uppercase;">${meal.tipo}</span><b style="margin-top:2px;">${meal.name}</b><span>🔥 ${meal.cals} kcal | P: ${meal.prot}g | C: ${meal.carb}g | G: ${meal.gras}g</span></div>`; 
  }); 
  window.openSheet('sheet-planned-meals'); 
});

window.registrarComidaPlaneada = async function(encodedData) { 
  const meal = JSON.parse(decodeURIComponent(encodedData)); 
  let nombreFinal = `[${meal.tipo.charAt(0).toUpperCase() + meal.tipo.slice(1)}] ${meal.name}`; 
  await registrarComidaNube(meal.cals, meal.prot, meal.carb, meal.gras, nombreFinal); 
  window.closeSheet(); 
  showToast(`✅ Registrado al instante.`); 
};

// --- LECTOR BARRAS Y BUSCADOR OPENFOODFACTS ---
let html5QrcodeScanner = null;
document.getElementById('btn-foto')?.addEventListener('click', () => { 
  window.openSheet('sheet-scanner'); 
  if (!html5QrcodeScanner) { 
    html5QrcodeScanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: {width: 250, height: 250}, aspectRatio: 1.0 }, false); 
    html5QrcodeScanner.render(onScanSuccess, onScanFailure); 
  } 
});

window.closeScanner = function() { 
  if(html5QrcodeScanner) { 
    html5QrcodeScanner.clear().catch(e => console.error(e)); 
    html5QrcodeScanner = null; 
  } 
  window.closeSheet(); 
};

async function onScanSuccess(decodedText, decodedResult) { 
  window.closeScanner(); 
  showToast(`🔍 Buscando ${decodedText}...`); 
  try { 
    const res = await fetch(`https://world.openfoodfacts.org/api/v0/product/${decodedText}.json`); 
    const data = await res.json(); 
    if (data.status === 1) { 
      const p = data.product; 
      if(!p.nutriments || !p.nutriments['energy-kcal_100g']) { showToast('⚠️ Sin info nutricional.'); return; } 
      let brand = p.brands ? ` (${p.brands.split(',')[0]})` : ''; 
      let nombre = `${p.product_name || 'Producto Escaneado'}${brand}`; 
      let cal100 = Math.round(p.nutriments['energy-kcal_100g']); 
      let prot100 = Math.round(p.nutriments['proteins_100g'] || 0); 
      let carb100 = Math.round(p.nutriments['carbohydrates_100g'] || 0); 
      let gras100 = Math.round(p.nutriments['fat_100g'] || 0); 
      currentSearchFoodBase = { cal: cal100, prot: prot100, carb: carb100, gras: gras100 }; 
      document.getElementById('food-selected-name').innerText = nombre; 
      document.getElementById('food-results-list').innerHTML = ''; 
      document.getElementById('edit-qty').value = '100'; 
      document.getElementById('edit-unit').value = '1'; 
      recalcularMacros(); 
      document.getElementById('food-custom-section').style.display = 'block'; 
      window.openSheet('sheet-add-food'); 
    } else { 
      showToast('❌ No encontrado.'); 
    } 
  } catch (err) { showToast('⚠️ Error de conexión.'); } 
}
function onScanFailure(error) { }

let currentSearchFoodBase = null;
const fallbackDB = [ 
  { product_name: "Yogurt Protein Natural", brands: "Soprole", nutriments: { 'energy-kcal_100g': 55, 'proteins_100g': 8, 'carbohydrates_100g': 5, 'fat_100g': 0 } }, 
  { product_name: "Avena Tradicional", brands: "Quaker", nutriments: { 'energy-kcal_100g': 370, 'proteins_100g': 13, 'carbohydrates_100g': 60, 'fat_100g': 7 } }, 
  { product_name: "Pechuga de Pollo", brands: "SuperPollo", nutriments: { 'energy-kcal_100g': 110, 'proteins_100g': 23, 'carbohydrates_100g': 0, 'fat_100g': 1.5 } } 
];

document.getElementById('btn-abrir-manual')?.addEventListener('click', () => { 
  document.getElementById('food-search').value = ''; 
  document.getElementById('food-results-list').innerHTML = ''; 
  document.getElementById('food-custom-section').style.display = 'none'; 
  window.openSheet('sheet-add-food'); 
});

document.getElementById('btn-trigger-search')?.addEventListener('click', async () => { 
  const query = document.getElementById('food-search').value.trim().toLowerCase(); 
  const c = document.getElementById('food-results-list'); 
  const loader = document.getElementById('food-loading'); 
  if(!query) return; 
  c.innerHTML = ''; 
  loader.style.display = 'block'; 
  try { 
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=15`)}`; 
    const res = await fetch(proxyUrl); 
    if (!res.ok) throw new Error('Proxy error'); 
    const proxyData = await res.json(); 
    const data = JSON.parse(proxyData.contents); 
    loader.style.display = 'none'; 
    if(!data.products || data.products.length === 0) throw new Error("Sin resultados"); 
    renderizarResultadosBusqueda(data.products, c); 
  } catch (error) { 
    loader.style.display = 'none'; 
    const resultadosLocales = fallbackDB.filter(p => p.product_name.toLowerCase().includes(query) || p.brands.toLowerCase().includes(query)); 
    if(resultadosLocales.length > 0) { 
      renderizarResultadosBusqueda(resultadosLocales, c); 
      showToast('⚠️ Mostrando base local.'); 
    } else { 
      c.innerHTML = `<div style="font-size:12px; color:#ff3366; text-align:center; margin-top:10px;">❌ No encontrado.</div>`; 
    } 
  } 
});

function renderizarResultadosBusqueda(productos, contenedor) { 
  productos.forEach(p => { 
    if(!p.nutriments || p.nutriments['energy-kcal_100g'] == null) return; 
    const d = document.createElement('div'); 
    d.className = 'food-search-item'; 
    let brand = p.brands ? ` (${p.brands.split(',')[0]})` : ''; 
    let nombre = `${p.product_name || 'Producto'}${brand}`; 
    let cal100 = Math.round(p.nutriments['energy-kcal_100g']); 
    let prot100 = Math.round(p.nutriments['proteins_100g'] || 0); 
    let carb100 = Math.round(p.nutriments['carbohydrates_100g'] || 0); 
    let gras100 = Math.round(p.nutriments['fat_100g'] || 0); 
    d.innerHTML = `<div style="display:flex; flex-direction:column;"><span>${nombre}</span><span style="font-size:9px; color:var(--text-muted);">Por 100g: P:${prot100}g C:${carb100}g G:${gras100}g</span></div><span style="color:var(--primary); font-weight:800; display:flex; align-items:center;">${cal100} kcal</span>`; 
    d.addEventListener('click', () => { 
      currentSearchFoodBase = { cal: cal100, prot: prot100, carb: carb100, gras: gras100 }; 
      document.getElementById('food-selected-name').innerText = nombre; 
      document.getElementById('food-results-list').innerHTML = ''; 
      document.getElementById('edit-qty').value = '100'; 
      document.getElementById('edit-unit').value = '1'; 
      recalcularMacros(); 
      document.getElementById('food-custom-section').style.display = 'block'; 
    }); 
    contenedor.appendChild(d); 
  }); 
}

document.getElementById('edit-qty')?.addEventListener('input', recalcularMacros); 
document.getElementById('edit-unit')?.addEventListener('change', recalcularMacros);

function recalcularMacros() { 
  if(currentSearchFoodBase) { 
    let q = parseFloat(document.getElementById('edit-qty').value) || 0; 
    let m = parseFloat(document.getElementById('edit-unit').value) || 1; 
    let factor = (q * m) / 100; 
    document.getElementById('edit-cal').value = Math.round(currentSearchFoodBase.cal * factor); 
    document.getElementById('edit-prot').value = Math.round(currentSearchFoodBase.prot * factor); 
    document.getElementById('edit-carb').value = Math.round(currentSearchFoodBase.carb * factor); 
    document.getElementById('edit-gras').value = Math.round(currentSearchFoodBase.gras * factor); 
  } 
}

document.getElementById('btn-confirm-food-final')?.addEventListener('click', async () => { 
  let mt = document.getElementById('food-meal-time').value; 
  let n = document.getElementById('food-selected-name').innerText || "Alimento"; 
  let c = parseInt(document.getElementById('edit-cal').value)||0; 
  let p = parseInt(document.getElementById('edit-prot').value)||0; 
  let cb = parseInt(document.getElementById('edit-carb').value)||0; 
  let g = parseInt(document.getElementById('edit-gras').value)||0; 
  let qtyVal = document.getElementById('edit-qty').value; 
  let unitSelect = document.getElementById('edit-unit'); 
  let unitText = unitSelect.options[unitSelect.selectedIndex].text.split(' ')[0]; 
  if(!c && !p) { showToast('⚠️ Ingresa cantidad.'); return; } 
  let nombreFinalRegistro = `${n} (${qtyVal} ${unitText})`; 
  await registrarComidaNube(c, p, cb, g, `[${mt}] ${nombreFinalRegistro}`); 
  window.closeSheet(); 
  showToast(`✅ Registrado.`); 
});

// ============================================================================
// --- ORÁCULO DE COMBATE Y MODO ENTRENAMIENTO EN VIVO ---
// ============================================================================
let currentWorkoutRoutine = [];
let workoutSwapTargetIndex = -1;

document.getElementById('btn-generar-rutina')?.addEventListener('click', () => {
  if(exercisesDB.length === 0) { showToast('⚠️ Espera, sincronizando ejercicios...'); return; }
  
  const equip = document.getElementById('train-equip')?.value || 'gimnasio';
  const focus = document.getElementById('train-focus')?.value || 'fullbody';
  currentWorkoutRoutine = [];

  const getRandomEx = (grupoReq) => {
    const valid = exercisesDB.filter(ex => {
      const matchGrupo = ex.grupo?.toLowerCase() === grupoReq.toLowerCase();
      const matchEquip = Array.isArray(ex.equipamiento) 
        ? ex.equipamiento.some(eq => eq.toLowerCase().includes(equip.toLowerCase()))
        : true;
      return matchGrupo && matchEquip;
    });
    if(valid.length === 0) {
      // Si no encuentra por equipamiento estricto, busca solo por grupo para evitar vacíos
      const fallbackGrupo = exercisesDB.filter(ex => ex.grupo?.toLowerCase() === grupoReq.toLowerCase());
      return fallbackGrupo.length > 0 ? fallbackGrupo[Math.floor(Math.random() * fallbackGrupo.length)] : null;
    }
    return valid[Math.floor(Math.random() * valid.length)];
  };

  let structure = [];
  if(focus === "fullbody") structure = ["piernas", "pecho", "espalda", "hombros", "core"];
  if(focus === "superior") structure = ["pecho", "espalda", "hombros", "brazos", "core"];
  if(focus === "piernas") structure = ["piernas", "piernas", "piernas", "core"];

  structure.forEach(g => {
    let ex = getRandomEx(g);
    if(ex && !currentWorkoutRoutine.find(e => e.id === ex.id)) {
      currentWorkoutRoutine.push(ex);
    }
  });

  if(currentWorkoutRoutine.length === 0) {
    showToast('⚠️ No hay ejercicios para este filtro en tu base de datos.'); return;
  }

  renderizarRutina(false);
  document.getElementById('workout-generator-card').style.display = 'none';
  document.getElementById('workout-live-container').style.display = 'block';
  showToast('⚔️ Rutina táctica generada.');
});

function renderizarRutina(isLiveMode) {
  const container = document.getElementById('rutina-generada-lista');
  if(!container) return;
  container.innerHTML = '';
  
  currentWorkoutRoutine.forEach((ex, idx) => {
    const displaySwap = isLiveMode ? 'none' : 'block';
    const displayInputs = isLiveMode ? 'grid' : 'none';
    
    // Si la imagen falla o está vacía, genera una tarjeta con el nombre del ejercicio
    const fallbackNeon = `https://dummyimage.com/400x400/141a26/00e5ff&text=${encodeURIComponent(ex.nombre)}`;
    const imgSource = ex.imagen && ex.imagen.trim() !== "" ? ex.imagen : fallbackNeon;

    container.innerHTML += `
      <div class="plan-meal-card workout-card" data-index="${idx}" data-name="${ex.nombre}">
        <div class="plan-meal-header">
          <span class="plan-meal-title">${ex.nombre}</span>
          <button class="btn-swap" style="display:${displaySwap};" onclick="window.abrirMenuReemplazoEj(${idx})">🔄 Cambiar</button>
        </div>
        <div style="display:flex; gap:12px; align-items:center;">
          <img src="${imgSource}" onerror="this.onerror=null; this.src='${fallbackNeon}';" style="width:70px; height:70px; border-radius:10px; object-fit:cover; border:1px solid rgba(0,229,255,0.3);">
          <div>
            <p style="font-size:11px; color:var(--primary); margin:0 0 5px 0; font-weight:800; text-transform:uppercase;">🎯 ${ex.musculoPrincipal || 'General'}</p>
            <p style="font-size:11px; color:#a0aec0; margin:0; line-height:1.4;">💡 ${ex.tips || 'Mantén la técnica estricta.'}</p>
          </div>
        </div>
        <div class="workout-inputs" style="display:${displayInputs};">
          <div><label style="font-size:9px;">Series (Sets)</label><input type="number" class="neon-input ex-sets" placeholder="Ej: 4"></div>
          <div><label style="font-size:9px;">Repes</label><input type="number" class="neon-input ex-reps" placeholder="Ej: 10"></div>
          <div><label style="font-size:9px;">Peso (Kg)</label><input type="number" class="neon-input ex-weight" placeholder="Ej: 80"></div>
        </div>
      </div>
    `;
  });
}

window.abrirMenuReemplazoEj = function(index) {
  workoutSwapTargetIndex = index;
  const currentEx = currentWorkoutRoutine[index];
  const equip = document.getElementById('train-equip')?.value || 'gimnasio';
  
  const alternativas = exercisesDB.filter(e => e.grupo === currentEx.grupo && e.id !== currentEx.id);
  const listContainer = document.getElementById('sheet-swap-ex-list');
  if(!listContainer) return;
  listContainer.innerHTML = '';
  
  if(alternativas.length === 0) {
    listContainer.innerHTML = `<p style="font-size:12px; color:#ff3366;">No hay más alternativas de ${currentEx.grupo} para tu equipamiento.</p>`;
  } else {
    alternativas.forEach(alt => {
      let objData = encodeURIComponent(JSON.stringify(alt));
      listContainer.innerHTML += `
        <div class="swap-option-card" onclick="window.confirmarReemplazoEj('${objData}')">
          <span style="font-size:10px; color:var(--primary); font-weight:800; text-transform:uppercase;">${alt.musculoPrincipal}</span>
          <b style="margin-top:4px;">${alt.nombre}</b>
        </div>
      `;
    });
  }
  window.openSheet('sheet-swap-exercise');
};

window.confirmarReemplazoEj = function(encodedData) {
  if(workoutSwapTargetIndex > -1) {
    const newEx = JSON.parse(decodeURIComponent(encodedData));
    currentWorkoutRoutine[workoutSwapTargetIndex] = newEx;
    renderizarRutina(false);
    window.closeSheet();
    showToast(`✅ Ejercicio reemplazado.`);
  }
};

document.getElementById('btn-start-workout')?.addEventListener('click', () => {
  renderizarRutina(true);
  document.getElementById('btn-start-workout').style.display = 'none';
  document.getElementById('btn-finish-workout').style.display = 'block';
  showToast('🔥 ¡A darlo todo, Guerrero!');
});

document.getElementById('btn-cancel-workout')?.addEventListener('click', () => {
  document.getElementById('workout-live-container').style.display = 'none';
  document.getElementById('workout-generator-card').style.display = 'block';
  document.getElementById('btn-start-workout').style.display = 'block';
  document.getElementById('btn-finish-workout').style.display = 'none';
  currentWorkoutRoutine = [];
});

document.getElementById('btn-finish-workout')?.addEventListener('click', async () => {
  const cards = document.querySelectorAll('.workout-card');
  let validExercises = 0;

  for(let card of cards) {
    const name = card.getAttribute('data-name');
    const sets = card.querySelector('.ex-sets')?.value;
    const reps = card.querySelector('.ex-reps')?.value;
    const weight = card.querySelector('.ex-weight')?.value;

    if(sets && sets > 0) {
      let setsStr = `${sets} x ${reps || 'Max'}`;
      await registrarEntrenoNube(name, setsStr, weight || 0, "N/A");
      validExercises++;
    }
  }

  if(validExercises > 0) {
    showToast(`✅ Entrenamiento finalizado. ${validExercises} ejercicios guardados.`);
  } else {
    showToast('⚠️ No registraste series. Entrenamiento descartado.');
  }

  document.getElementById('workout-live-container').style.display = 'none';
  document.getElementById('workout-generator-card').style.display = 'block';
  document.getElementById('btn-start-workout').style.display = 'block';
  document.getElementById('btn-finish-workout').style.display = 'none';
  currentWorkoutRoutine = [];
});

document.getElementById('btn-registrar-serie')?.addEventListener('click', () => { 
  document.getElementById('work-name').value = ''; 
  document.getElementById('work-sets').value = ''; 
  document.getElementById('work-weight').value = ''; 
  window.openSheet('sheet-workout'); 
});

document.getElementById('btn-confirm-workout')?.addEventListener('click', async () => { 
  const n = document.getElementById('work-name').value; 
  const s = document.getElementById('work-sets').value; 
  const w = document.getElementById('work-weight').value; 
  const r = document.getElementById('work-rpe').value || '8'; 
  if(!n || !s) { showToast('⚠️ Completa los campos.'); return; } 
  await registrarEntrenoNube(n, s, w || 0, r); 
  window.closeSheet(); 
  showToast('💪 Ejercicio guardado.'); 
});

// --- PERSISTENCIA Y DASHBOARD ---
async function cargarRegistrosDelDia(uid) {
  const hoyKey = getTodayKey(); 
  const listaComidas = document.getElementById('lista-comidas');
  if(listaComidas) { 
    listaComidas.innerHTML = ''; 
    const snapshot = await getDocs(collection(db, "users", uid, "days", hoyKey, "meals")); 
    snapshot.forEach(docSnap => { 
      const i = docSnap.data(); 
      renderizarComidaEnUI(i.nombre, i.cal, i.prot, i.carb, i.gras, docSnap.id); 
    }); 
  }
  const listaEntrenos = document.getElementById('lista-entrenos');
  if(listaEntrenos) { 
    listaEntrenos.innerHTML = ''; 
    const snapshot = await getDocs(collection(db, "users", uid, "days", hoyKey, "workouts")); 
    snapshot.forEach(docSnap => { 
      const i = docSnap.data(); 
      renderizarEntrenoEnUI(i.nombre, i.sets, i.weight, i.rpe, docSnap.id); 
    }); 
  }
}

function renderizarComidaEnUI(nombre, cal, prot, carb, gras, docId = null) { 
  const l = document.getElementById('lista-comidas'); 
  if(!l) return; 
  const li = document.createElement('li'); 
  if(docId) li.setAttribute('data-id', docId); 
  li.innerHTML = `<span style="color:#fff; font-weight:800;">${nombre}</span><button class="btn-delete-item" onclick="window.eliminarComidaNube('${docId}', ${cal}, ${prot}, ${carb}, ${gras}, this)">🗑️</button><br><span style="color: #6b7c93; font-size: 11px; margin-top:5px; display:block;">🔥 ${cal} kcal &nbsp;|&nbsp; <span style="color:#ff3366;">P: ${prot}g</span> &nbsp;|&nbsp; <span style="color:#00e5ff;">C: ${carb}g</span> &nbsp;|&nbsp; <span style="color:#ffaa00;">G: ${gras}g</span></span>`; 
  l.appendChild(li); 
}

function renderizarEntrenoEnUI(nombre, sets, weight, rpe, docId = null) { 
  const l = document.getElementById('lista-entrenos'); 
  if(!l) return; 
  const li = document.createElement('li'); 
  if(docId) li.setAttribute('data-id', docId); 
  li.innerHTML = `<span style="color:#fff; font-weight:800;">${nombre.toUpperCase()}</span><button class="btn-delete-item" onclick="window.eliminarEntrenoNube('${docId}', this)">🗑️</button><br><span style="color: #6b7c93; font-size: 11px; margin-top:5px; display:block;">🏋️ Series: ${sets} &nbsp;|&nbsp; <span style="color:#00e5ff;">Peso: ${weight} kg</span></span>`; 
  l.appendChild(li); 
}

window.eliminarComidaNube = async function(docId, cal, prot, carb, gras, btnElement) { 
  if(!confirm("¿Eliminar?")) return; 
  totalCalorias = Math.max(0, totalCalorias - cal); 
  totalProt = Math.max(0, totalProt - prot); 
  totalCarb = Math.max(0, totalCarb - carb); 
  totalGrasa = Math.max(0, totalGrasa - gras); 
  btnElement.closest('li')?.remove(); 
  guardarEstadoNube(); 
  actualizarDashboard(); 
  if(currentUser && db && docId) await deleteDoc(doc(db, "users", currentUser.uid, "days", getTodayKey(), "meals", docId)); 
};

window.eliminarEntrenoNube = async function(docId, btnElement) { 
  if(!confirm("¿Eliminar?")) return; 
  btnElement.closest('li')?.remove(); 
  if(currentUser && db && docId) await deleteDoc(doc(db, "users", currentUser.uid, "days", getTodayKey(), "workouts", docId)); 
};

async function registrarComidaNube(cal, prot, carb, gras, nombreDisplay) { 
  totalCalorias += cal; 
  totalProt += prot; 
  totalCarb += carb; 
  totalGrasa += gras; 
  guardarEstadoNube(); 
  actualizarDashboard(); 
  let docId = null; 
  if(currentUser && db) { 
    const d = await addDoc(collection(db, "users", currentUser.uid, "days", getTodayKey(), "meals"), { nombre: nombreDisplay, cal, prot, carb, gras, timestamp: Date.now() }); 
    docId = d.id; 
  } 
  renderizarComidaEnUI(nombreDisplay, cal, prot, carb, gras, docId); 
  document.querySelector('[data-target="page-dashboard"]')?.click(); 
}

async function registrarEntrenoNube(nombre, sets, weight, rpe) { 
  let docId = null; 
  if(currentUser && db) { 
    const d = await addDoc(collection(db, "users", currentUser.uid, "days", getTodayKey(), "workouts"), { nombre, sets, weight, rpe, timestamp: Date.now() }); 
    docId = d.id; 
  } 
  renderizarEntrenoEnUI(nombre, sets, weight, rpe, docId); 
}

// --- UTILIDADES GLOBALES ---
function iniciarSakuraBackground() { 
  const c = document.getElementById('sakura-bg'); 
  if(!c) return; 
  c.innerHTML = ''; 
  for(let i=0; i<15; i++) { 
    const p = document.createElement('div'); 
    p.className = 'sakura-petal'; 
    const s = Math.random() * 8 + 4; 
    p.style.width = `${s}px`; 
    p.style.height = `${s*1.4}px`; 
    p.style.left = `${Math.random()*100}vw`; 
    p.style.animationDuration = `${Math.random()*10+8}s`; 
    p.style.animationDelay = `${Math.random()*5}s`; 
    c.appendChild(p); 
  } 
}

function verificarCambioDeDia() { 
  const hoy = new Date().toDateString(); 
  const ult = localStorage.getItem('ic_ultima_fecha'); 
  if (!ult) localStorage.setItem('ic_ultima_fecha', hoy); 
  else if (ult !== hoy) { 
    totalCalorias = 0; 
    totalProt = 0; 
    totalCarb = 0; 
    totalGrasa = 0; 
    totalAgua = 0; 
    userStreak++; 
    localStorage.setItem('ic_ultima_fecha', hoy); 
    guardarEstadoNube(); 
    showToast('🌙 Nuevo día. ¡Racha incrementada!'); 
  } 
  const st = document.getElementById('header-streak'); 
  if(st) st.innerText = `🔥 Racha: ${userStreak} días`; 
}

window.reiniciarDiaActual = function() { 
  if(confirm("¿Reiniciar balance?")) { 
    totalCalorias = 0; 
    totalProt = 0; 
    totalCarb = 0; 
    totalGrasa = 0; 
    totalAgua = 0; 
    guardarEstadoNube(); 
    actualizarDashboard(); 
    actualizarAguaUI(); 
    const lc = document.getElementById('lista-comidas'); if(lc) lc.innerHTML = ''; 
    showToast('🔄 Restablecido.'); 
  } 
};

window.borrarTodoHistorial = function() { 
  if(confirm("¿Restablecer historial archivado?")) { 
    localStorage.removeItem('ic_historial_pasado'); 
    localStorage.removeItem('ic_checkins'); 
    const hc = document.getElementById('historial-container'); if(hc) hc.innerHTML = ''; 
    const chc = document.getElementById('checkin-history-container'); if(chc) chc.innerHTML = ''; 
    showToast('🧹 Borrado.'); 
  } 
};

function actualizarAguaUI() { 
  const metaAgua = 3000; 
  let pct = Math.min(100, Math.round((totalAgua/metaAgua)*100)); 
  const wb = document.getElementById('water-fill-bar'); if(wb) wb.style.height = `${pct}%`; 
  const wt = document.getElementById('water-text-val'); if(wt) wt.innerText = `${totalAgua} / ${metaAgua} ml`; 
  guardarEstadoNube(); 
}

window.agregarAgua = ml => { totalAgua += ml; actualizarAguaUI(); showToast(`💧 +${ml} ml añadidos.`); }; 
window.resetAgua = () => { totalAgua = 0; actualizarAguaUI(); showToast(`🔄 Hidratación reiniciada.`); };

// --- CHAT SHOGUN ---
document.getElementById('btn-send-chat')?.addEventListener('click', enviarMensajeShogun); 
document.getElementById('chat-input-text')?.addEventListener('keypress', e => { if(e.key === 'Enter') enviarMensajeShogun(); });

function enviarMensajeShogun() { 
  const inp = document.getElementById('chat-input-text'); 
  const txt = inp?.value.trim(); 
  if(!txt) return; 
  const box = document.getElementById('chat-messages'); 
  if(!box) return;
  box.innerHTML += `<div class="chat-msg user">${txt}</div>`; 
  inp.value = ''; 
  box.scrollTop = box.scrollHeight; 
  setTimeout(() => { 
    box.innerHTML += `<div class="chat-msg ai">"La disciplina vence a la motivación. Céntrate en tus macros y el hierro hará el resto."</div>`; 
    box.scrollTop = box.scrollHeight; 
  }, 800); 
}

// --- BOTTOM SHEETS Y TABS ---
const overlay = document.getElementById('sheet-overlay'); let activeSheet = null;
window.openSheet = function(sheetId) { 
  activeSheet = document.getElementById(sheetId); 
  if(overlay) overlay.style.display = 'block'; 
  if(activeSheet) { 
    activeSheet.classList.add('open'); 
    setTimeout(() => activeSheet.style.bottom = '0', 10); 
  } 
};

window.closeSheet = function() { 
  if(activeSheet) { 
    activeSheet.style.bottom = '-100%'; 
    setTimeout(() => { 
      activeSheet.classList.remove('open'); 
      if(overlay) overlay.style.display = 'none'; 
    }, 300); 
  } 
};

document.querySelectorAll('.custom-select').forEach(sel => { 
  sel.addEventListener('click', () => { 
    window.activeSelect = sel; 
    window.openSheet(sel.id.replace('select-', 'sheet-')); 
  }); 
});

document.querySelectorAll('.sheet-option').forEach(opt => { 
  opt.addEventListener('click', function() { 
    if(this.parentElement.id !== 'sheet-actividad') { 
      this.parentElement.querySelectorAll('.sheet-option').forEach(o => o.classList.remove('active')); 
      this.classList.add('active'); 
      if(window.activeSelect) {
        window.activeSelect.innerText = this.innerText; 
        window.activeSelect.setAttribute('data-val', this.getAttribute('data-val')); 
      }
      window.closeSheet(); 
    } else { 
      window.closeSheet(); 
    }
  }); 
});

if(overlay) overlay.addEventListener('click', window.closeSheet);

const navItems = document.querySelectorAll('.nav-item'); const pages = document.querySelectorAll('.page');
navItems.forEach(btn => { 
  btn.addEventListener('click', () => { 
    navItems.forEach(nav => nav.classList.remove('active')); 
    pages.forEach(page => page.classList.remove('active')); 
    btn.classList.add('active'); 
    const tgt = document.getElementById(btn.getAttribute('data-target'));
    if(tgt) tgt.classList.add('active'); 
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
      const targetTab = btn.getAttribute('data-tab'); 
      const elem = document.getElementById(targetTab);
      if(elem) elem.style.display = 'block'; 
      if(targetTab === 'tab-leaderboard') cargarLeaderboard(); 
    }); 
  }); 
}
setupTabs('tab-btn-diet', 'sub-tab-diet'); 
setupTabs('tab-btn-train', 'sub-tab-train');

// --- LEADERBOARD Y RANGOS ---
const rangos = [ 
  { nombre: "Ashigaru", minRatio: 0, color: "#6b7c93", msg: "Primer paso." }, 
  { nombre: "Rōnin", minRatio: 1.5, color: "#ffaa00", msg: "Camino propio." }, 
  { nombre: "Samurái", minRatio: 2.5, color: "#ff3366", msg: "Honor y disciplina." }, 
  { nombre: "Daimyō", minRatio: 3.5, color: "#9933ff", msg: "Élite del hierro." }, 
  { nombre: "IRON SHŌGUN", minRatio: 4.5, color: "#00e5ff", msg: "Comandante Supremo." } 
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
  const hr = document.getElementById('header-rank'); if(hr) hr.innerHTML = `Rango: <span style="color: ${rango.color};">${rango.nombre.toUpperCase()}</span>`; 
  currentRankName = rango.nombre; 
  actualizarUIHeader(); 
  actualizarUIPerfil(); 
  if(currentUser && db) { 
    try { 
      await setDoc(doc(db, "leaderboard", currentUser.uid), { 
        userId: currentUser.uid, 
        nombre: userProfile.nickname, 
        foto: currentUser.photoURL || "", 
        multiplicador: ratio, 
        totalKg: total, 
        pesoCorporal: userProfile.peso, 
        rango: rango.nombre, 
        colorRango: rango.color, 
        updatedAt: Date.now() 
      }, { merge: true }); 
      showToast(`⚔️ ¡Ranking Actualizado!`); 
      await guardarEstadoNube(); 
    } catch(e) { console.error(e); } 
  } 
});

async function cargarLeaderboard() { 
  const container = document.getElementById('leaderboard-list'); 
  if(!container || !db) return; 
  container.innerHTML = `<p style="font-size: 12px; color: var(--text-muted); text-align: center;">Cargando guerreros...</p>`; 
  try { 
    const q = query(collection(db, "leaderboard"), orderBy("multiplicador", "desc"), limit(20)); 
    const snapshot = await getDocs(q); 
    if(snapshot.empty) { 
      container.innerHTML = `<p style="font-size: 12px; color: var(--text-muted); text-align: center;">El dojo está vacío.</p>`; 
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

let macroChart = null; 
const ctxDonut = document.getElementById('macroChart'); 
if(ctxDonut) { 
  macroChart = new Chart(ctxDonut.getContext('2d'), { 
    type: 'doughnut', 
    data: { 
      labels: ['Prot', 'Carb', 'Gras'], 
      datasets: [{ data: [0.1, 0.1, 0.1], backgroundColor: ['#ff3366', '#00e5ff', '#ffaa00'], borderWidth: 0 }] 
    }, 
    options: { responsive: true, maintainAspectRatio: false, cutout: '82%', plugins: { legend: { display: false } } } 
  }); 
}

let progressChart = null; 
const ctxLine = document.getElementById('progressChart'); 
if(ctxLine) { 
  progressChart = new Chart(ctxLine.getContext('2d'), { 
    type: 'line', 
    data: { 
      labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'], 
      datasets: [{ label: 'Proyección (kg)', data: [75, 75, 75, 75], borderColor: '#00e5ff', backgroundColor: 'rgba(0, 229, 255, 0.1)', borderWidth: 3, fill: true, tension: 0.4 }] 
    }, 
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } } 
  }); 
}

function actualizarGraficoProyeccion(pesoActual, variacionObj) { 
  if(!progressChart) return; 
  let vSemana = variacionObj / 1000; 
  progressChart.data.datasets[0].data = [pesoActual, pesoActual + vSemana, pesoActual + (vSemana * 2), pesoActual + (vSemana * 3)]; 
  progressChart.update(); 
}

function actualizarDashboard() { 
  const calT = document.getElementById('calorias-total'); if(calT) calT.innerText = `${totalCalorias} / ${metaCalorias} kcal`; 
  const prT = document.getElementById('prot-total'); if(prT) prT.innerText = `${totalProt}g / ${metaProt}g`; 
  const cbT = document.getElementById('carb-total'); if(cbT) cbT.innerText = `${totalCarb}g`; 
  const grT = document.getElementById('gras-total'); if(grT) grT.innerText = `${totalGrasa}g`; 
  const ec = document.getElementById('en-consumidas'); if(ec) ec.innerText = `${totalCalorias} kcal`; 
  const en = document.getElementById('en-netas'); if(en) en.innerText = `${totalCalorias - 450} kcal`; 
  if(macroChart && (totalProt > 0 || totalCarb > 0 || totalGrasa > 0)) { 
    macroChart.data.datasets[0].data = [totalProt, totalCarb, totalGrasa]; 
    macroChart.update(); 
  } 
}

document.getElementById('btn-checkin')?.addEventListener('click', () => window.openSheet('sheet-checkin'));
document.getElementById('btn-confirm-checkin')?.addEventListener('click', () => { window.closeSheet(); showToast('📈 Check-in guardado.'); });

if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(console.log); }); }
