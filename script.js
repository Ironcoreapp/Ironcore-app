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

let userProfile = {
  perfilCompleto: false, nickname: "", genero: "M", edad: 25, peso: 75, altura: 175, metaObj: 0, actividad: 1.55 
};

function getTodayKey() { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; }
function showToast(msg) { const toast = document.getElementById('toast-notif'); if(!toast) return; toast.innerHTML = msg; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 3500); }

// --- GESTIÓN DE AUTENTICACIÓN GOOGLE ---
const authScreen = document.getElementById('auth-screen');
getRedirectResult(auth).then((result) => { if (result && result.user) showToast('⚔️ ¡Acceso autorizado al Dojo!'); }).catch(console.error);

document.getElementById('btn-google-login')?.addEventListener('click', async () => {
  showToast('🔄 Conectando con Google...');
  const provider = new GoogleAuthProvider(); provider.setCustomParameters({ prompt: 'select_account' });
  try { 
    await signInWithPopup(auth, provider); 
    showToast('⚔️ ¡Acceso autorizado al Dojo!'); 
  } catch(error) { 
    console.warn("Fallo el Popup, forzando redirección directa:", error);
    showToast('🔄 Abriendo portal seguro...');
    await signInWithRedirect(auth, provider); 
  }
});

document.getElementById('btn-logout')?.addEventListener('click', () => signOut(auth));
document.getElementById('btn-logout-profile')?.addEventListener('click', () => signOut(auth));

onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser = user;
    if (authScreen) authScreen.style.display = 'none';
    document.getElementById('ob-avatar').src = user.photoURL || 'logo.png';
    document.getElementById('ob-nickname').value = (user.displayName || "Guerrero").split(' ')[0];
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
  obScreen.style.display = 'flex'; currentObStep = 0; obTrack.style.transform = `translateX(0%)`; obBar.style.width = '33.33%';
  if(isEdit) {
    document.getElementById('ob-title').innerText = "Editar Credencial";
    document.getElementById('ob-nickname').value = userProfile.nickname;
    window.seleccionarGenero(userProfile.genero); document.getElementById('ob-edad').value = userProfile.edad;
    document.getElementById('ob-peso').value = userProfile.peso; document.getElementById('ob-altura').value = userProfile.altura;
    document.querySelectorAll('.ob-goal-card').forEach(c => {
      c.classList.remove('active'); if(parseInt(c.getAttribute('data-val')) === userProfile.metaObj) c.classList.add('active');
    });
  } else { document.getElementById('ob-title').innerText = "Ritual de Iniciación"; }
};

window.moverOnboarding = function(dir) {
  if(dir === 1 && currentObStep === 0) { if(!document.getElementById('ob-nickname').value.trim()) { showToast('⚠️ Elige un apodo.'); return; } }
  currentObStep += dir; if(currentObStep < 0) currentObStep = 0; if(currentObStep > 2) currentObStep = 2;
  obTrack.style.transform = `translateX(-${currentObStep * 33.333}%)`; obBar.style.width = `${(currentObStep + 1) * 33.33}%`;
};

window.seleccionarGenero = function(gen) { userProfile.genero = gen; document.querySelectorAll('.ob-gender-btn').forEach(b => { if(b.getAttribute('data-gen') === gen) b.classList.add('active'); else b.classList.remove('active'); }); };
window.seleccionarMetaOb = function(elem) { document.querySelectorAll('.ob-goal-card').forEach(c => c.classList.remove('active')); elem.classList.add('active'); userProfile.metaObj = parseInt(elem.getAttribute('data-val')); };

window.finalizarOnboarding = async function() {
  userProfile.nickname = document.getElementById('ob-nickname').value.trim() || "Guerrero";
  userProfile.edad = parseInt(document.getElementById('ob-edad').value) || 25;
  userProfile.peso = parseFloat(document.getElementById('ob-peso').value) || 75;
  userProfile.altura = parseInt(document.getElementById('ob-altura').value) || 175;
  userProfile.actividad = parseFloat(document.getElementById('select-actividad').getAttribute('data-val')) || 1.55;
  userProfile.perfilCompleto = true;

  let tmb = userProfile.genero === 'M' ? (10 * userProfile.peso) + (6.25 * userProfile.altura) - (5 * userProfile.edad) + 5 : (10 * userProfile.peso) + (6.25 * userProfile.altura) - (5 * userProfile.edad) - 161;
  let tdee = tmb * userProfile.actividad; metaCalorias = Math.round(tdee + userProfile.metaObj);
  metaProt = userProfile.metaObj > 0 ? Math.round(userProfile.peso * 2.0) : Math.round(userProfile.peso * 2.2);
  metaGrasa = Math.round((metaCalorias * 0.25) / 9); metaCarb = Math.round((metaCalorias - ((metaProt * 4) + (metaGrasa * 9))) / 4);

  await guardarEstadoNube(); 
  actualizarUIHeader(); 
  actualizarUIPerfil(); 
  actualizarDashboard(); 
  actualizarGraficoProyeccion(userProfile.peso, userProfile.metaObj);
  actualizarLabelMetaIA(); 
  
  obScreen.style.display = 'none'; showToast(`✅ Credencial Sincronizada`);
  document.querySelector('[data-target="page-dashboard"]').click();
};

// --- SINCRONIZACIÓN FIRESTORE ---
async function guardarEstadoNube() {
  if(!currentUser || !db) return;
  try { await setDoc(doc(db, "users", currentUser.uid), { calorias: totalCalorias, proteina: totalProt, carbos: totalCarb, grasa: totalGrasa, agua: totalAgua, metaCal: metaCalorias, metaProt: metaProt, metaCarb: metaCarb, metaGrasa: metaGrasa, streak: userStreak, ultimaFecha: localStorage.getItem('ic_ultima_fecha'), ...userProfile }, { merge: true });
  } catch(e) { console.error(e); }
}

async function cargarDatosDesdeNube(uid) {
  if(!db) return;
  const docSnap = await getDoc(doc(db, "users", uid));
  if (docSnap.exists()) {
    const d = docSnap.data();
    totalCalorias = d.calorias || 0; totalProt = d.proteina || 0; totalCarb = d.carbos || 0; totalGrasa = d.grasa || 0; totalAgua = d.agua || 0;
    metaCalorias = d.metaCal || 2500; metaProt = d.metaProt || 165; metaCarb = d.metaCarb || 275; metaGrasa = d.metaGrasa || 69; userStreak = d.streak || 1;
    userProfile.perfilCompleto = d.perfilCompleto || false; userProfile.nickname = d.nickname || ""; userProfile.genero = d.genero || "M"; userProfile.edad = d.edad || 25; userProfile.peso = d.peso || 75; userProfile.altura = d.altura || 175; userProfile.metaObj = d.metaObj !== undefined ? d.metaObj : 0; userProfile.actividad = d.actividad || 1.55;
  }
  if(!userProfile.perfilCompleto) { window.abrirOnboarding(false); } else { actualizarUIHeader(); actualizarUIPerfil(); actualizarLabelMetaIA(); }
  iniciarSakuraBackground(); verificarCambioDeDia(); actualizarDashboard(); actualizarAguaUI(); await cargarRegistrosDelDia(uid); actualizarGraficoProyeccion(userProfile.peso, userProfile.metaObj);
}

function actualizarUIHeader() {
  document.getElementById('user-display-name').innerText = userProfile.nickname.toUpperCase();
  const avatar = document.getElementById('user-avatar'); if(currentUser && currentUser.photoURL) { avatar.src = currentUser.photoURL; avatar.style.display = 'inline-block'; }
  document.getElementById('user-welcome-box').style.display = 'flex';
}

function actualizarUIPerfil() {
  document.getElementById('profile-card-name').innerText = userProfile.nickname.toUpperCase();
  document.getElementById('profile-val-peso').innerText = `${userProfile.peso} kg`; document.getElementById('profile-val-altura').innerText = `${userProfile.altura} cm`; document.getElementById('profile-val-edad').innerText = `${userProfile.edad} años`; document.getElementById('profile-val-genero').innerText = userProfile.genero === 'M' ? 'Hombre' : 'Mujer';
  let labelMeta = "Mantenimiento"; if(userProfile.metaObj === -500) labelMeta = "Déficit Agresivo"; if(userProfile.metaObj === -300) labelMeta = "Definición"; if(userProfile.metaObj === 300) labelMeta = "Volumen";
  document.getElementById('profile-card-goal').innerText = `Meta: ${labelMeta}`;
  if(currentUser && currentUser.photoURL) document.getElementById('profile-card-avatar').src = currentUser.photoURL;
}

// --- EL ORÁCULO NUTRICIONAL (IA CLÍNICA JSON) ---
let oracleDB = []; 
async function inicializarOraculo() {
  try {
    const respuesta = await fetch('alimentos.json');
    if (!respuesta.ok) throw new Error('No se pudo cargar la base de datos nutricional.');
    oracleDB = await respuesta.json();
    console.log(`🔮 Oráculo inicializado con ${oracleDB.length} recetas desde JSON.`);
  } catch (error) { console.error("Error al cargar alimentos.json:", error); }
}
window.addEventListener('DOMContentLoaded', inicializarOraculo);

let weeklyPlan = [];
let selectedDayIndex = 0;

// CHIPS DE ALERGIAS
let activeAllergies = [];
const allergyInput = document.getElementById('oracle-allergies-input');
const allergyContainer = document.getElementById('allergy-tags-container');

if(allergyInput) {
  allergyInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = allergyInput.value.trim().toLowerCase();
      if(val && !activeAllergies.includes(val)) {
        activeAllergies.push(val); renderAllergyChips();
      }
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
  let label = "Mantenimiento"; if(userProfile.metaObj < 0) label = "Déficit Agresivo / Definición (Prioridad: Saciedad)"; if(userProfile.metaObj > 0) label = "Volumen / Hipertrofia (Prioridad: Densidad)";
  const metaLabel = document.getElementById('oracle-target-goal'); if(metaLabel) metaLabel.innerText = label;
  const calsLabel = document.getElementById('oracle-target-cals'); if(calsLabel) calsLabel.innerText = metaCalorias;
}

document.getElementById('btn-generar-plan')?.addEventListener('click', () => {
  if (oracleDB.length === 0) { showToast("⚠️ El Oráculo sigue sincronizando la base de datos JSON. Espera un segundo."); return; }
  generarPlanSemanal();
  document.getElementById('oracle-form-card').style.display = 'none'; document.getElementById('plan-resultado').style.display = 'block'; showToast('🤖 IA: Plan optimizado estructurado en 7 días.');
});
document.getElementById('oracle-day-selector')?.addEventListener('change', (e) => { selectedDayIndex = parseInt(e.target.value); renderizarDiaSeleccionado(); });

function generarPlanSemanal() {
  weeklyPlan = []; const distribution = [ { tipo: 'desayuno', cals: metaCalorias * 0.25 }, { tipo: 'almuerzo', cals: metaCalorias * 0.35 }, { tipo: 'cena', cals: metaCalorias * 0.30 }, { tipo: 'snack', cals: metaCalorias * 0.10 } ];
  for(let i=0; i<7; i++) { let dayMeals = distribution.map(slot => obtenerComidaAlgoritmo(slot.tipo, slot.cals, [])); weeklyPlan.push(dayMeals); }
  selectedDayIndex = 0; document.getElementById('oracle-day-selector').value = "0"; renderizarDiaSeleccionado();
}

function obtenerComidaAlgoritmo(tipo, targetCals, excludesId) {
  let currentDietType = document.getElementById('oracle-diet-type').value;
  let isCeliac = document.getElementById('oracle-celiac').checked;

  let candidatos = oracleDB.filter(m => {
    if(m.tipo !== tipo) return false; if(!m.dietas.includes(currentDietType)) return false; if(excludesId.includes(m.id)) return false; if(isCeliac && m.glutenFree === false) return false;
    let jsonStr = JSON.stringify(m).toLowerCase();
    for(let a of activeAllergies) { if(jsonStr.includes(a)) return false; }
    return true;
  });

  if(candidatos.length === 0) candidatos = oracleDB.filter(m => m.tipo === tipo); 
  let bestCandidates = [];
  if(userProfile.metaObj > 0) { bestCandidates = candidatos.filter(m => m.isDense === true); } else if (userProfile.metaObj < 0) { bestCandidates = candidatos.filter(m => m.isVolume === true); }
  if(bestCandidates.length > 0) candidatos = bestCandidates;
  if(candidatos.length === 0) return { id: 0, tipo: tipo, name: "Ajustar Filtros", cals: targetCals, prot: 0, carb: 0, gras: 0, ingredientes: [] };

  const selected = candidatos[Math.floor(Math.random() * candidatos.length)];
  const factor = targetCals / selected.calBase;
  
  let ingredientesAdaptados = selected.ingredientes.map(ing => {
    let qtyCalculada = ing.baseQty * factor;
    qtyCalculada = ing.unidad === 'unidades' || ing.unidad === 'scoops' || ing.unidad === 'rebanadas' || ing.unidad === 'porción' ? parseFloat(qtyCalculada.toFixed(1)) : Math.round(qtyCalculada);
    return { nombre: ing.nombre, cantidad: qtyCalculada, unidad: ing.unidad };
  });

  return { id: selected.id, tipo: selected.tipo, name: selected.name, cals: Math.round(selected.calBase * factor), prot: Math.round(selected.prot * factor), carb: Math.round(selected.carb * factor), gras: Math.round(selected.gras * factor), ingredientes: ingredientesAdaptados };
}

function renderizarDiaSeleccionado() {
  const container = document.getElementById('comidas-plan'); if(!container) return; container.innerHTML = '';
  const dayMeals = weeklyPlan[selectedDayIndex];
  dayMeals.forEach((meal, idx) => {
    let ingredientesHTML = meal.ingredientes.length > 0 ? meal.ingredientes.map(i => `• ${i.cantidad} ${i.unidad} de ${i.nombre}`).join('<br>') : `• Intenta cambiar los filtros de dieta`;
    container.innerHTML += `<div class="plan-meal-card"><div class="plan-meal-header"><span class="plan-meal-title">${meal.tipo}</span><button class="btn-swap" onclick="window.swapMealPlan(${idx})">🔄 Reemplazar</button></div><p class="plan-meal-desc"><b style="color:#fff;">${meal.name}</b><br><span style="color:#a0aec0; font-size:11px;">${ingredientesHTML}</span></p><div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px;"><span class="plan-meal-cals">🔥 ${meal.cals} kcal</span><span style="font-size:10px; color:var(--text-muted); font-weight:800;">P: ${meal.prot}g | C: ${meal.carb}g | G: ${meal.gras}g</span></div></div>`;
  });
}

window.swapMealPlan = function(mealIndex) { const oldMeal = weeklyPlan[selectedDayIndex][mealIndex]; const newMeal = obtenerComidaAlgoritmo(oldMeal.tipo, oldMeal.cals, [oldMeal.id]); weeklyPlan[selectedDayIndex][mealIndex] = newMeal; renderizarDiaSeleccionado(); showToast(`🔄 Opción recalculada.`); };
window.generarListaCompras = function() {
  const ul = document.getElementById('lista-compras-ui'); if(!ul) return; let listaConsolidada = {};
  weeklyPlan.forEach(dia => { dia.forEach(comida => { comida.ingredientes.forEach(ing => { let key = `${ing.nombre} (${ing.unidad})`; listaConsolidada[key] = (listaConsolidada[key] || 0) + ing.cantidad; }); }); });
  ul.innerHTML = '';
  for (let key in listaConsolidada) {
    let rawQty = listaConsolidada[key]; let qtyDisplay = key.includes('unidades') || key.includes('scoops') || key.includes('rebanadas') || key.includes('porción') ? rawQty.toFixed(1) : Math.round(rawQty);
    let match = key.match(/(.*) \((.*)\)/); let nombreLimpio = match ? match[1] : key; let unidadLimpia = match ? match[2] : '';
    ul.innerHTML += `<li><input type="checkbox" style="accent-color:var(--primary); width:18px; height:18px;"> <span style="flex:1;">${nombreLimpio}</span> <b style="color:var(--primary); font-size:12px;">${qtyDisplay} ${unidadLimpia}</b></li>`;
  }
  window.openSheet('sheet-compras');
};


// --- BUSCADOR GLOBAL Y BASE DE RESPALDO (ANTI-CAÍDAS) ---
let currentSearchFoodBase = null;

// Base de datos de emergencia por si el usuario no tiene internet o su navegador bloquea APIs
const fallbackDB = [
  { product_name: "Yogurt Protein Natural", brands: "Soprole", nutriments: { 'energy-kcal_100g': 55, 'proteins_100g': 8, 'carbohydrates_100g': 5, 'fat_100g': 0 } },
  { product_name: "Yogurt con Proteína", brands: "Colun", nutriments: { 'energy-kcal_100g': 60, 'proteins_100g': 9, 'carbohydrates_100g': 4, 'fat_100g': 0.5 } },
  { product_name: "Avena Tradicional", brands: "Quaker", nutriments: { 'energy-kcal_100g': 370, 'proteins_100g': 13, 'carbohydrates_100g': 60, 'fat_100g': 7 } },
  { product_name: "Avena Instantánea", brands: "Selecta", nutriments: { 'energy-kcal_100g': 365, 'proteins_100g': 12, 'carbohydrates_100g': 62, 'fat_100g': 6 } },
  { product_name: "Leche Descremada", brands: "Colun", nutriments: { 'energy-kcal_100g': 34, 'proteins_100g': 3.3, 'carbohydrates_100g': 5, 'fat_100g': 0 } },
  { product_name: "Pechuga de Pollo", brands: "SuperPollo", nutriments: { 'energy-kcal_100g': 110, 'proteins_100g': 23, 'carbohydrates_100g': 0, 'fat_100g': 1.5 } },
  { product_name: "Arroz Grano Largo", brands: "Tucapel", nutriments: { 'energy-kcal_100g': 350, 'proteins_100g': 7, 'carbohydrates_100g': 78, 'fat_100g': 1 } },
  { product_name: "Pan Integral de Molde", brands: "Castaño", nutriments: { 'energy-kcal_100g': 240, 'proteins_100g': 10, 'carbohydrates_100g': 45, 'fat_100g': 3 } },
  { product_name: "Huevo Grande", brands: "Champion", nutriments: { 'energy-kcal_100g': 143, 'proteins_100g': 12.5, 'carbohydrates_100g': 0.7, 'fat_100g': 9.5 } },
  { product_name: "Whey Protein Isolate", brands: "Genérico", nutriments: { 'energy-kcal_100g': 380, 'proteins_100g': 85, 'carbohydrates_100g': 3, 'fat_100g': 1 } }
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
    // Intento directo, limpio y oficial a la API de OpenFoodFacts
    const res = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=15`);
    const data = await res.json();
    loader.style.display = 'none';

    if(!data.products || data.products.length === 0) {
      throw new Error("Sin resultados en API"); // Forzamos ir a la base de datos de respaldo
    }
    renderizarResultadosBusqueda(data.products, c);

  } catch (error) {
    console.warn("Fallo la API externa (Red/CORS), activando Base de Datos de Respaldo Offline.", error);
    loader.style.display = 'none';
    
    // Filtrar la base de datos local de emergencia
    const resultadosLocales = fallbackDB.filter(p => p.product_name.toLowerCase().includes(query) || p.brands.toLowerCase().includes(query));
    
    if(resultadosLocales.length > 0) {
      renderizarResultadosBusqueda(resultadosLocales, c);
      showToast('⚠️ Red inestable: Mostrando productos locales.');
    } else {
      c.innerHTML = `<div style="font-size:12px; color:#ff3366; text-align:center; margin-top:10px;">❌ No se encontró en la red ni en el respaldo offline.</div>`;
    }
  }
});

function renderizarResultadosBusqueda(productos, contenedor) {
  productos.forEach(p => {
    if(!p.nutriments || p.nutriments['energy-kcal_100g'] == null) return;

    const d = document.createElement('div'); 
    d.className = 'food-search-item'; 
    let brand = p.brands ? ` (${p.brands.split(',')[0]})` : '';
    let nombre = `${p.product_name || 'Producto Desconocido'}${brand}`;
    
    let cal100 = Math.round(p.nutriments['energy-kcal_100g']);
    let prot100 = Math.round(p.nutriments['proteins_100g'] || 0);
    let carb100 = Math.round(p.nutriments['carbohydrates_100g'] || 0);
    let gras100 = Math.round(p.nutriments['fat_100g'] || 0);

    d.innerHTML = `
      <div style="display:flex; flex-direction:column;">
        <span>${nombre}</span>
        <span style="font-size:9px; color:var(--text-muted);">Por 100g: P:${prot100}g C:${carb100}g G:${gras100}g</span>
      </div>
      <span style="color:var(--primary); font-weight:800; display:flex; align-items:center;">${cal100} kcal</span>
    `;
    
    d.addEventListener('click', () => { 
      currentSearchFoodBase = { cal: cal100, prot: prot100, carb: carb100, gras: gras100 };
      document.getElementById('food-selected-name').innerText = nombre;
      document.getElementById('food-results-list').innerHTML = ''; 
      document.getElementById('edit-qty').value = '100';
      actualizarMacrosManual(100);
      document.getElementById('food-custom-section').style.display = 'block';
    }); 
    contenedor.appendChild(d); 
  });
}

document.getElementById('edit-qty')?.addEventListener('input', (e) => { 
  let q = parseFloat(e.target.value)||100; 
  actualizarMacrosManual(q);
});

function actualizarMacrosManual(gramos) {
  if(currentSearchFoodBase) { 
    let factor = gramos/100; 
    document.getElementById('edit-cal').value = Math.round(currentSearchFoodBase.cal * factor); 
    document.getElementById('edit-prot').value = Math.round(currentSearchFoodBase.prot * factor); 
    document.getElementById('edit-carb').value = Math.round(currentSearchFoodBase.carb * factor); 
    document.getElementById('edit-gras').value = Math.round(currentSearchFoodBase.gras * factor); 
  }
}

document.getElementById('btn-confirm-food-final')?.addEventListener('click', async () => {
  let mt = document.getElementById('food-meal-time').value; 
  let n = document.getElementById('food-selected-name').innerText || "Alimento"; 
  let c = parseInt(document.getElementById('edit-cal').value)||0; let p = parseInt(document.getElementById('edit-prot').value)||0; let cb = parseInt(document.getElementById('edit-carb').value)||0; let g = parseInt(document.getElementById('edit-gras').value)||0;
  if(!c && !p) { showToast('⚠️ Ingresa calorías o proteína.'); return; } 
  await registrarComidaNube(c, p, cb, g, `[${mt}] ${n}`); 
  window.closeSheet(); showToast(`✅ ${n.toUpperCase()} registrado.`);
});

// --- PERSISTENCIA DE LISTAS DIARIAS (COMIDAS Y ENTRENOS) ---
async function cargarRegistrosDelDia(uid) {
  const hoyKey = getTodayKey(); const listaComidas = document.getElementById('lista-comidas');
  if(listaComidas) { listaComidas.innerHTML = ''; const snapshot = await getDocs(collection(db, "users", uid, "days", hoyKey, "meals")); snapshot.forEach(docSnap => { const i = docSnap.data(); renderizarComidaEnUI(i.nombre, i.cal, i.prot, i.carb, i.gras, docSnap.id); }); }
  const listaEntrenos = document.getElementById('lista-entrenos');
  if(listaEntrenos) { listaEntrenos.innerHTML = ''; const snapshot = await getDocs(collection(db, "users", uid, "days", hoyKey, "workouts")); snapshot.forEach(docSnap => { const i = docSnap.data(); renderizarEntrenoEnUI(i.nombre, i.sets, i.weight, i.rpe, docSnap.id); }); }
}
function renderizarComidaEnUI(nombre, cal, prot, carb, gras, docId = null) { const l = document.getElementById('lista-comidas'); if(!l) return; const li = document.createElement('li'); if(docId) li.setAttribute('data-id', docId); li.innerHTML = `<span style="color:#fff; font-weight:800;">${nombre}</span><button class="btn-delete-item" onclick="window.eliminarComidaNube('${docId}', ${cal}, ${prot}, ${carb}, ${gras}, this)">🗑️</button><br><span style="color: #6b7c93; font-size: 11px; margin-top:5px; display:block;">🔥 ${cal} kcal &nbsp;|&nbsp; <span style="color:#ff3366;">P: ${prot}g</span> &nbsp;|&nbsp; <span style="color:#00e5ff;">C: ${carb}g</span> &nbsp;|&nbsp; <span style="color:#ffaa00;">G: ${gras}g</span></span>`; l.appendChild(li); }
function renderizarEntrenoEnUI(nombre, sets, weight, rpe, docId = null) { const l = document.getElementById('lista-entrenos'); if(!l) return; const li = document.createElement('li'); if(docId) li.setAttribute('data-id', docId); li.innerHTML = `<span style="color:#fff; font-weight:800;">${nombre.toUpperCase()}</span><button class="btn-delete-item" onclick="window.eliminarEntrenoNube('${docId}', this)">🗑️</button><br><span style="color: #6b7c93; font-size: 11px; margin-top:5px; display:block;">🏋️ Sets: ${sets} &nbsp;|&nbsp; <span style="color:#00e5ff;">Peso: ${weight} kg</span> &nbsp;|&nbsp; <span style="color:#ffaa00;">RPE: ${rpe}</span></span>`; l.appendChild(li); }
window.eliminarComidaNube = async function(docId, cal, prot, carb, gras, btnElement) { if(!confirm("¿Eliminar este alimento del registro?")) return; totalCalorias = Math.max(0, totalCalorias - cal); totalProt = Math.max(0, totalProt - prot); totalCarb = Math.max(0, totalCarb - carb); totalGrasa = Math.max(0, totalGrasa - gras); btnElement.closest('li').remove(); guardarEstadoNube(); actualizarDashboard(); if(currentUser && db && docId) await deleteDoc(doc(db, "users", currentUser.uid, "days", getTodayKey(), "meals", docId)); };
window.eliminarEntrenoNube = async function(docId, btnElement) { if(!confirm("¿Eliminar esta serie?")) return; btnElement.closest('li').remove(); if(currentUser && db && docId) await deleteDoc(doc(db, "users", currentUser.uid, "days", getTodayKey(), "workouts", docId)); };
async function registrarComidaNube(cal, prot, carb, gras, nombreDisplay) { totalCalorias += cal; totalProt += prot; totalCarb += carb; totalGrasa += gras; guardarEstadoNube(); actualizarDashboard(); let docId = null; if(currentUser && db) { const d = await addDoc(collection(db, "users", currentUser.uid, "days", getTodayKey(), "meals"), { nombre: nombreDisplay, cal, prot, carb, gras, timestamp: Date.now() }); docId = d.id; } renderizarComidaEnUI(nombreDisplay, cal, prot, carb, gras, docId); document.querySelector('[data-target="page-dashboard"]').click(); }
async function registrarEntrenoNube(nombre, sets, weight, rpe) { let docId = null; if(currentUser && db) { const d = await addDoc(collection(db, "users", currentUser.uid, "days", getTodayKey(), "workouts"), { nombre, sets, weight, rpe, timestamp: Date.now() }); docId = d.id; } renderizarEntrenoEnUI(nombre, sets, weight, rpe, docId); }

// --- GRÁFICOS Y UTILIDADES ---
function iniciarSakuraBackground() { const c = document.getElementById('sakura-bg'); if(!c) return; c.innerHTML = ''; for(let i=0; i<15; i++) { const p = document.createElement('div'); p.className = 'sakura-petal'; const s = Math.random() * 8 + 4; p.style.width = `${s}px`; p.style.height = `${s*1.4}px`; p.style.left = `${Math.random()*100}vw`; p.style.animationDuration = `${Math.random()*10+8}s`; p.style.animationDelay = `${Math.random()*5}s`; c.appendChild(p); } }
function verificarCambioDeDia() { const hoy = new Date().toDateString(); const ult = localStorage.getItem('ic_ultima_fecha'); if (!ult) localStorage.setItem('ic_ultima_fecha', hoy); else if (ult !== hoy) { totalCalorias = 0; totalProt = 0; totalCarb = 0; totalGrasa = 0; totalAgua = 0; userStreak++; localStorage.setItem('ic_ultima_fecha', hoy); guardarEstadoNube(); showToast('🌙 Nuevo día. ¡Racha incrementada!'); } const st = document.getElementById('header-streak'); if(st) st.innerText = `🔥 Racha: ${userStreak} días`; }
window.reiniciarDiaActual = function() { if(confirm("¿Reiniciar contadores de hoy a 0?")) { totalCalorias = 0; totalProt = 0; totalCarb = 0; totalGrasa = 0; totalAgua = 0; guardarEstadoNube(); actualizarDashboard(); actualizarAguaUI(); document.getElementById('lista-comidas').innerHTML = ''; showToast('🔄 Balance restablecido.'); } };
window.borrarTodoHistorial = function() { if(confirm("¿Restablecer todo el historial archivado?")) { localStorage.removeItem('ic_historial_pasado'); localStorage.removeItem('ic_checkins'); document.getElementById('historial-container').innerHTML = ''; document.getElementById('checkin-history-container').innerHTML = ''; showToast('🧹 Historial borrado.'); } };
function actualizarAguaUI() { const metaAgua = 3000; let pct = Math.min(100, Math.round((totalAgua/metaAgua)*100)); document.getElementById('water-fill-bar').style.height = `${pct}%`; document.getElementById('water-text-val').innerText = `${totalAgua} / ${metaAgua} ml`; guardarEstadoNube(); }
window.agregarAgua = ml => { totalAgua += ml; actualizarAguaUI(); showToast(`💧 +${ml} ml añadidos.`); }; window.resetAgua = () => { totalAgua = 0; actualizarAguaUI(); showToast(`🔄 Hidratación reiniciada.`); };

// --- CHAT SHOGUN ---
document.getElementById('btn-send-chat')?.addEventListener('click', enviarMensajeShogun); document.getElementById('chat-input-text')?.addEventListener('keypress', e => { if(e.key === 'Enter') enviarMensajeShogun(); });
function enviarMensajeShogun() { const inp = document.getElementById('chat-input-text'); const txt = inp.value.trim(); if(!txt) return; const box = document.getElementById('chat-messages'); box.innerHTML += `<div class="chat-msg user">${txt}</div>`; inp.value = ''; box.scrollTop = box.scrollHeight; setTimeout(() => { box.innerHTML += `<div class="chat-msg ai">"La disciplina vence a la motivación. Céntrate en tus macros y el hierro hará el resto."</div>`; box.scrollTop = box.scrollHeight; }, 800); }

// --- BOTTOM SHEETS ---
const overlay = document.getElementById('sheet-overlay'); let activeSheet = null;
window.openSheet = function(sheetId) { activeSheet = document.getElementById(sheetId); if(overlay) overlay.style.display = 'block'; if(activeSheet) { activeSheet.classList.add('open'); setTimeout(() => activeSheet.style.bottom = '0', 10); } }
window.closeSheet = function() { if(activeSheet) { activeSheet.style.bottom = '-100%'; setTimeout(() => { activeSheet.classList.remove('open'); if(overlay) overlay.style.display = 'none'; }, 300); } }
document.querySelectorAll('.custom-select').forEach(sel => { sel.addEventListener('click', () => { window.activeSelect = sel; window.openSheet(sel.id.replace('select-', 'sheet-')); }); });
document.querySelectorAll('.sheet-option').forEach(opt => { opt.addEventListener('click', function() { if(this.parentElement.id !== 'sheet-actividad') { this.parentElement.querySelectorAll('.sheet-option').forEach(o => o.classList.remove('active')); this.classList.add('active'); window.activeSelect.innerText = this.innerText; window.activeSelect.setAttribute('data-val', this.getAttribute('data-val')); window.closeSheet(); } else { window.closeSheet(); }}); });
if(overlay) overlay.addEventListener('click', window.closeSheet);

const navItems = document.querySelectorAll('.nav-item'); const pages = document.querySelectorAll('.page');
navItems.forEach(btn => { btn.addEventListener('click', () => { navItems.forEach(nav => nav.classList.remove('active')); pages.forEach(page => page.classList.remove('active')); btn.classList.add('active'); document.getElementById(btn.getAttribute('data-target')).classList.add('active'); }); });
function setupTabs(btnClass, subTabClass) { const btns = document.querySelectorAll(`.${btnClass}`); const tabs = document.querySelectorAll(`.${subTabClass}`); btns.forEach(btn => { btn.addEventListener('click', () => { btns.forEach(t => t.classList.remove('active')); tabs.forEach(s => s.style.display = 'none'); btn.classList.add('active'); const targetTab = btn.getAttribute('data-tab'); document.getElementById(targetTab).style.display = 'block'; if(targetTab === 'tab-leaderboard') cargarLeaderboard(); }); }); }
setupTabs('tab-btn-diet', 'sub-tab-diet'); setupTabs('tab-btn-train', 'sub-tab-train');

// --- LEADERBOARD Y RANGOS ---
const rangos = [ { nombre: "Ashigaru", minRatio: 0, color: "#6b7c93", msg: "Primer paso." }, { nombre: "Rōnin", minRatio: 1.5, color: "#ffaa00", msg: "Camino propio." }, { nombre: "Samurái", minRatio: 2.5, color: "#ff3366", msg: "Honor y disciplina." }, { nombre: "Daimyō", minRatio: 3.5, color: "#9933ff", msg: "Élite del hierro." }, { nombre: "IRON SHŌGUN", minRatio: 4.5, color: "#00e5ff", msg: "Comandante Supremo." } ];
document.getElementById('btn-calcular-rango')?.addEventListener('click', async () => { const bench = parseFloat(document.getElementById('rm-bench').value) || 0; const squat = parseFloat(document.getElementById('rm-squat').value) || 0; const deadlift = parseFloat(document.getElementById('rm-deadlift').value) || 0; if(bench === 0 && squat === 0 && deadlift === 0) { showToast('⚠️ Ingresa marcas.'); return; } const total = bench + squat + deadlift; const ratio = parseFloat((total / userProfile.peso).toFixed(2)); let rango = rangos[0], prog = 0; for(let i=0; i<rangos.length; i++) { if(ratio >= rangos[i].minRatio) { rango = rangos[i]; prog = i < rangos.length - 1 ? ((ratio - rangos[i].minRatio) / (rangos[i+1].minRatio - rangos[i].minRatio)) * 100 : 100; } } document.getElementById('rango-titulo').innerText = rango.nombre; document.getElementById('rango-titulo').style.color = rango.color; document.getElementById('rango-multi').innerText = `${ratio}x`; document.getElementById('rango-total').innerText = total; document.getElementById('rango-progreso').style.width = `${prog}%`; document.getElementById('rango-progreso').style.backgroundColor = rango.color; document.getElementById('header-rank').innerHTML = `Rango: <span style="color: ${rango.color};">${rango.nombre.toUpperCase()}</span>`; if(currentUser && db) { try { await setDoc(doc(db, "leaderboard", currentUser.uid), { userId: currentUser.uid, nombre: userProfile.nickname, foto: currentUser.photoURL || "", multiplicador: ratio, totalKg: total, pesoCorporal: userProfile.peso, rango: rango.nombre, colorRango: rango.color, updatedAt: Date.now() }, { merge: true }); showToast(`⚔️ ¡Ranking Actualizado!`); } catch(e) { console.error(e); } } });
async function cargarLeaderboard() { const container = document.getElementById('leaderboard-list'); if(!container || !db) return; container.innerHTML = `<p style="font-size: 12px; color: var(--text-muted); text-align: center;">Cargando guerreros...</p>`; try { const q = query(collection(db, "leaderboard"), orderBy("multiplicador", "desc"), limit(20)); const snapshot = await getDocs(q); if(snapshot.empty) { container.innerHTML = `<p style="font-size: 12px; color: var(--text-muted); text-align: center;">El dojo está vacío.</p>`; return; } let html = "", pos = 1; snapshot.forEach(docSnap => { const d = docSnap.data(); const topClass = pos===1?"top-1":pos===2?"top-2":pos===3?"top-3":""; const medal = pos===1?"🥇":pos===2?"🥈":pos===3?"🥉":`#${pos}`; html += `<div class="leaderboard-item ${topClass}"><div class="lb-rank-num">${medal}</div><div class="lb-user-info"><img class="lb-avatar" src="${d.foto||'logo.png'}"><div><span class="lb-name">${d.nombre}</span><span class="lb-badge" style="color: ${d.colorRango};">${d.rango}</span></div></div><div class="lb-score"><span class="lb-multiplier">${d.multiplicador}x</span><span class="lb-kg">${d.totalKg} kg</span></div></div>`; pos++; }); container.innerHTML = html; } catch(e) { container.innerHTML = `<p style="font-size: 12px; color: #ff3366; text-align: center;">Error al cargar.</p>`; } }
document.getElementById('btn-refresh-leaderboard')?.addEventListener('click', cargarLeaderboard);

let macroChart = null; const ctxDonut = document.getElementById('macroChart'); if(ctxDonut) { macroChart = new Chart(ctxDonut.getContext('2d'), { type: 'doughnut', data: { labels: ['Prot', 'Carb', 'Gras'], datasets: [{ data: [0.1, 0.1, 0.1], backgroundColor: ['#ff3366', '#00e5ff', '#ffaa00'], borderWidth: 0 }] }, options: { responsive: true, maintainAspectRatio: false, cutout: '82%', plugins: { legend: { display: false } } } }); }
let progressChart = null; const ctxLine = document.getElementById('progressChart'); if(ctxLine) { progressChart = new Chart(ctxLine.getContext('2d'), { type: 'line', data: { labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'], datasets: [{ label: 'Proyección (kg)', data: [75, 75, 75, 75], borderColor: '#00e5ff', backgroundColor: 'rgba(0, 229, 255, 0.1)', borderWidth: 3, fill: true, tension: 0.4 }] }, options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { grid: { color: 'rgba(255,255,255,0.05)' } }, x: { grid: { display: false } } } } }); }
function actualizarGraficoProyeccion(pesoActual, variacionObj) { if(!progressChart) return; let vSemana = variacionObj / 1000; progressChart.data.datasets[0].data = [pesoActual, pesoActual + vSemana, pesoActual + (vSemana * 2), pesoActual + (vSemana * 3)]; progressChart.update(); }
function actualizarDashboard() { document.getElementById('calorias-total').innerText = `${totalCalorias} / ${metaCalorias} kcal`; document.getElementById('prot-total').innerText = `${totalProt}g / ${metaProt}g`; document.getElementById('carb-total').innerText = `${totalCarb}g`; document.getElementById('gras-total').innerText = `${totalGrasa}g`; document.getElementById('en-consumidas').innerText = `${totalCalorias} kcal`; document.getElementById('en-netas').innerText = `${totalCalorias - 450} kcal`; if(macroChart && (totalProt > 0 || totalCarb > 0 || totalGrasa > 0)) { macroChart.data.datasets[0].data = [totalProt, totalCarb, totalGrasa]; macroChart.update(); } }

document.getElementById('btn-checkin')?.addEventListener('click', () => window.openSheet('sheet-checkin'));
document.getElementById('btn-confirm-checkin')?.addEventListener('click', () => { window.closeSheet(); showToast('📈 Check-in guardado.'); });
const focusCards = document.querySelectorAll('.focus-card'); focusCards.forEach(card => { card.addEventListener('click', () => { focusCards.forEach(c => c.classList.remove('active')); card.classList.add('active'); document.getElementById('coach-recommendation').innerHTML = `<h4>Foco: ${card.innerText}</h4><p>Prioriza la tensión mecánica y aplica sobrecarga progresiva en los levantamientos base.</p>`; document.getElementById('coach-recommendation').style.display='block'; }); });

if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('sw.js').catch(console.log); }); }
