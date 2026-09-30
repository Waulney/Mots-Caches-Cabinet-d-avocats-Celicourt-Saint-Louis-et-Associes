/* ==========================================================================
   MOTS CACHÉS - CABINET d'avocats CELICOURT/SAINT-LOUIS ET ASSOCIÉS
   SCRIPT PRINCIPAL (LOGIQUE DE JEU COMPLÈTE - 20 NIVEAUX)
   ========================================================================== */

// --------------------------------------------------------------------------
// 1. TEXTES MULTILINGUES ET DONNÉES DES 20 NIVEAUX
// --------------------------------------------------------------------------
const UI_TEXTS = {
  fr: {
    slogan: "Thème : Droit & Système Judiciaire",
    level: "Niveau:", found: "Trouvés:", timer: "Temps:",
    wordsTitle: "Mots à trouver :", prev: "⏮️ Précédent", next: "Suivant ⏭️",
    restart: "🔄 Recommencer", hint: "💡 Indice (-10s)", win: "Félicitations ! Niveau terminé !",
    shareText: "J'ai réussi le niveau de Mots Cachés - Cabinet d'avocats Celicourt/Saint-Louis et Associés !"
  },
  en: {
    slogan: "Theme: Law & Judicial System",
    level: "Level:", found: "Found:", timer: "Time:",
    wordsTitle: "Words to find:", prev: "⏮️ Previous", next: "Next ⏭️",
    restart: "🔄 Restart", hint: "💡 Hint (-10s)", win: "Congratulations! Level completed!",
    shareText: "I completed the Word Search level - Cabinet d'avocats Celicourt/Saint-Louis et Associés!"
  },
  es: {
    slogan: "Tema: Derecho y Sistema Judicial",
    level: "Nivel:", found: "Encontrados:", timer: "Tiempo:",
    wordsTitle: "Palabras a buscar:", prev: "⏮️ Anterior", next: "Siguiente ⏭️",
    restart: "🔄 Reiniciar", hint: "💡 Pista (-10s)", win: "¡Felicidades! ¡Nivel completado!",
    shareText: "¡Completé el nivel de Sopa de Letras - Cabinet d'avocats Celicourt/Saint-Louis et Associés!"
  }
};

const LEVELS_DATA = {
  fr: [
    { title: "Niveau 1 : Acteurs du Droit", words: ["AVOCAT", "JUGE", "NOTAIRE", "GREFFIER", "JURE", "HUISSIER", "PLAIGNANT", "TUTEUR"] },
    { title: "Niveau 2 : Juridictions & Tribunaux", words: ["TRIBUNAL", "COUR", "PALAIS", "PARQUET", "CABINET", "AUDIENCE", "INSTANCE", "CHAMBRE"] },
    { title: "Niveau 3 : Procédure Penale", words: ["PROCES", "ENQUETE", "SCELLÉ", "GARDE", "PLAIDOIRIE", "REQUISITOIRE", "INSTRUCTION", "MANDAT"] },
    { title: "Niveau 4 : Droit Civil & Contrats", words: ["CONTRAT", "CLAUSE", "BAIL", "VENTE", "ACCORD", "LITIGE", "PREUVE", "OBLIGATION"] },
    { title: "Niveau 5 : Droits Fondamentaux", words: ["JUSTICE", "LIBERTE", "EGALITE", "CARTA", "DECRET", "CHARTE", "CODE", "TRAITE"] },
    { title: "Niveau 6 : Actes & Formalités", words: ["STATUTS", "PROCES", "PROCURATION", "SIGNATURE", "REGISTRE", "DEPOT", "NOTIFICATION", "SOMMATION"] },
    { title: "Niveau 7 : Preuves & Témoignages", words: ["TEMOIN", "EXPERTISE", "INDICE", "AVEU", "DEPOSITION", "RAPPORT", "CONSTAT", "ALIBI"] },
    { title: "Niveau 8 : Droit des Affaires", words: ["SOCIETE", "FUSION", "ACTION", "CAPITAL", "FAILLITE", "STATUT", "BANQUE", "MARQUE"] },
    { title: "Niveau 9 : Droit du Travail", words: ["SALARIE", "PATRON", "SYNDICAT", "CONGE", "PREAVIS", "RUPTURE", "PRUDHOMME", "EMPLOI"] },
    { title: "Niveau 10 : Sanctions & Peines", words: ["AMENDE", "PRISON", "SURSIS", "PEINE", "SAISIE", "DOMMAGES", "INTERDICTION", "SANCION"] },
    { title: "Niveau 11 : Recours & Voies d'Attaque", words: ["APPEL", "CASSATION", "RECOURS", "REVISION", "OPPOSITION", "ANNULATION", "POURVOI", "DELAI"] },
    { title: "Niveau 12 : Droit Immobilier", words: ["Loyer", "PROPRIETE", "CADASTRE", "SYNDIC", "HYPOTHEQUE", "AGENCE", "DOMAINE", "CESSION"] },
    { title: "Niveau 13 : Droit de la Famille", words: ["DIVORCE", "MARIAGE", "HERITAGE", "PENSION", "GARDE", "ADOPTION", "SUCCESSION", "FILIATION"] },
    { title: "Niveau 14 : Institutions Judiciaires", words: ["MINISTERE", "SENAT", "ASSEMBLEE", "CONSEIL", "PREFECTURE", "BARREAU", "ORDRE", "ETAT"] },
    { title: "Niveau 15 : Propriété Intellectuelle", words: ["BREVET", "MARQUE", "AUTEUR", "COPYRIGHT", "LICENCE", "DEPOT", "IMITATION", "INVENTION"] },
    { title: "Niveau 16 : Droit International", words: ["TRAITE", "AMBASSADE", "ASILE", "FRONTIERE", "ARBITRAGE", "DIPLOMATIE", "ACCORD", "OTAN"] },
    { title: "Niveau 17 : Deontologie & Ethique", words: ["SERMENT", "SECRET", "ETHIQUE", "HONNEUR", "PROBITÉ", "RESPECT", "LIGNE", "DEVOIR"] },
    { title: "Niveau 18 : Fiscalité & Impôts", words: ["FISCAL", "IMPOT", "TAXE", "FRAUDE", "CONTROLE", "REVENUE", "DEDUCTION", "AMNESTIE"] },
    { title: "Niveau 19 : Responsabilité Civile", words: ["FAUTE", "PREJUDICE", "LIESON", "RISQUE", "GARANTIE", "SINISTRE", "CONTRAT", "REPARATION"] },
    { title: "Niveau 20 : Excellence Judiciaire", words: ["PRESTIGE", "RIGOURE", "CABINET", "CELICOURT", "ASSOCIÉS", "VICTOIRE", "EXPERT", "HONORAIRE"] }
  ],
  en: [
    { title: "Level 1: Legal Professionals", words: ["LAWYER", "JUDGE", "NOTARY", "CLERK", "JURY", "BAILIFF", "PLAINTIFF", "GUARDIAN"] },
    { title: "Level 2: Courts & Venues", words: ["COURT", "BENCH", "PALACE", "CHAMBERS", "FIRM", "HEARING", "VENUE", "DOCKET"] },
    { title: "Level 3: Criminal Procedure", words: ["TRIAL", "INQUEST", "SEAL", "CUSTODY", "PLEADING", "CHARGE", "WARRANT", "ARREST"] },
    { title: "Level 4: Civil Law & Contracts", words: ["CONTRACT", "CLAUSE", "LEASE", "SALE", "AGREEMENT", "DISPUTE", "PROOF", "BOND"] },
    { title: "Level 5: Fundamental Rights", words: ["JUSTICE", "FREEDOM", "EQUALITY", "CHARTER", "DECREE", "ACT", "CODE", "TREATY"] },
    { title: "Level 6: Legal Instruments", words: ["BYLAWS", "MINUTES", "PROXY", "SIGNATURE", "REGISTER", "FILING", "NOTICE", "SUMMONS"] },
    { title: "Level 7: Evidence & Testimony", words: ["WITNESS", "EXPERT", "CLUE", "CONFESSION", "TESTIMONY", "REPORT", "FINDING", "ALIBI"] },
    { title: "Level 8: Corporate Law", words: ["COMPANY", "MERGER", "STOCK", "CAPITAL", "BANKRUPTCY", "CHARTER", "BANK", "BRAND"] },
    { title: "Level 9: Labor Law", words: ["EMPLOYEE", "BOSS", "UNION", "LEAVE", "NOTICE", "SEVERANCE", "BOARD", "JOB"] },
    { title: "Level 10: Penalties & Fines", words: ["FINE", "PRISON", "PROBATION", "PENALTY", "SEIZURE", "DAMAGES", "BAN", "SANCTION"] },
    { title: "Level 11: Appeals & Remedies", words: ["APPEAL", "REVIEW", "REMEDY", "STAY", "MOTION", "REVERSAL", "CLAIM", "DEADLINE"] },
    { title: "Level 12: Real Estate Law", words: ["RENT", "PROPERTY", "DEED", "TRUSTEE", "MORTGAGE", "AGENCY", "ESTATE", "TRANSFER"] },
    { title: "Level 13: Family Law", words: ["DIVORCE", "MARRIAGE", "WILL", "ALIMONY", "CUSTODY", "ADOPTION", "ESTATE", "KINSHIP"] },
    { title: "Level 14: Judicial Institutions", words: ["MINISTRY", "SENATE", "ASSEMBLY", "COUNCIL", "BAR", "ORDER", "STATE", "CROWN"] },
    { title: "Level 15: Intellectual Property", words: ["PATENT", "BRAND", "AUTHOR", "COPYRIGHT", "LICENSE", "FILING", "ROYALTY", "DESIGN"] },
    { title: "Level 16: International Law", words: ["TREATY", "EMBASSY", "ASYLUM", "BORDER", "ARBITRATION", "DIPLOMACY", "PACT", "UN"] },
    { title: "Level 17: Ethics & Conduct", words: ["OATH", "SECRECY", "ETHICS", "HONOR", "INTEGRITY", "RESPECT", "DUTY", "TRUST"] },
    { title: "Level 18: Tax & Revenue", words: ["TAX", "AUDIT", "DUTY", "FRAUD", "INCOME", "DEDUCTION", "AMNESTY", "RATE"] },
    { title: "Level 19: Civil Liability", words: ["FAULT", "HARM", "INJURY", "RISK", "COVERAGE", "CLAIM", "REPAIR", "LOSS"] },
    { title: "Level 20: Judicial Excellence", words: ["PRESTIGE", "RIGOR", "FIRM", "CELICOURT", "ASSOCIATES", "VICTORY", "EXPERT", "FEE"] }
  ],
  es: [
    { title: "Nivel 1: Profesionales del Derecho", words: ["ABOGADO", "JUEZ", "NOTARIO", "ESCRIBANO", "JURADO", "ALGUACIL", "ACTOR", "TUTOR"] },
    { title: "Nivel 2: Tribunales y Cortes", words: ["TRIBUNAL", "CORTE", "PALACIO", "DESPACHO", "BUFETE", "AUDIENCIA", "SALAS", "FISCALIA"] },
    { title: "Nivel 3: Procedimiento Penal", words: ["JUICIO", "SUMARIO", "PRECINTO", "CUSTODIA", "ALEGATO", "CARGO", "ORDEN", "ARRESTO"] },
    { title: "Nivel 4: Derecho Civil y Contratos", words: ["CONTRATO", "CLAUSULA", "ALQUILER", "VENTA", "ACUERDO", "LITIGIO", "PRUEBA", "DEUDA"] },
    { title: "Nivel 5: Derechos Fundamentales", words: ["JUSTICIA", "LIBERTAD", "IGUALDAD", "CARTA", "DECRETO", "LEY", "CODIGO", "TRATADO"] },
    { title: "Nivel 6: Instrumentos Legales", words: ["ESTATUTO", "ACTA", "PODER", "FIRMA", "REGISTRO", "DEPOSITO", "NOTIFICAR", "CITACION"] },
    { title: "Nivel 7: Pruebas y Testimonios", words: ["TESTIGO", "PERITO", "PISTA", "CONFESION", "DECLARA", "INFORME", "HALLAZGO", "ALIBI"] },
    { title: "Nivel 8: Derecho Mercantil", words: ["SOCIEDAD", "FUSION", "ACCION", "CAPITAL", "QUIEBRA", "BANCO", "MARCA", "PAGO"] },
    { title: "Nivel 9: Derecho Laboral", words: ["EMPLEADO", "PATRON", "SINDICATO", "BAJA", "AVISO", "DESPIDO", "JUNTA", "EMPLEO"] },
    { title: "Nivel 10: Sanciones y Penas", words: ["MULTA", "PRISION", "CONDENA", "PENA", "EMBARGO", "DAÑOS", "VEDA", "SANCTION"] },
    { title: "Nivel 11: Recursos y Vías Legales", words: ["APELACION", "REVISION", "RECURSO", "AMPARO", "MOVIENTOS", "NULIDAD", "QUEJA", "PLAZO"] },
    { title: "Nivel 12: Derecho Inmobiliario", words: ["RENTA", "FINCA", "TITULO", "GESTOR", "HIPOTECA", "AGENCIA", "PREDIO", "CESION"] },
    { title: "Nivel 13: Derecho de Familia", words: ["DIVORCIO", "BODA", "TESTAMENTO", "PENSION", "PATRIA", "ADOPCION", "HERENCIA", "PARENTESCO"] },
    { title: "Nivel 14: Instituciones Judiciales", words: ["MINISTERIO", "SENADO", "ASAMBLEA", "CONSEJO", "COLEGIO", "ORDEN", "ESTADO", "CORONA"] },
    { title: "Nivel 15: Propiedad Intelectual", words: ["PATENTE", "MARCA", "AUTOR", "DERECHO", "LICENCIA", "REGISTRO", "REGALIA", "DISEÑO"] },
    { title: "Nivel 16: Derecho Internacional", words: ["TRATADO", "EMBAJADA", "ASILO", "FRONTERA", "ARBITRAJE", "DIPLOMACIA", "PACTO", "ONU"] },
    { title: "Nivel 17: Ética y Deontología", words: ["JURAMENTO", "SECRETO", "ETICA", "HONOR", "PROBIDAD", "RESPETO", "DEBER", "FE"] },
    { title: "Nivel 18: Derecho Fiscal", words: ["FISCAL", "IMPUESTO", "TASAS", "FRAUDE", "RENTA", "DEDUCCION", "AMNISTIA", "CUOTA"] },
    { title: "Nivel 19: Responsabilidad Civil", words: ["CULPA", "DAÑO", "LESION", "RIESGO", "COBERTURA", "SINIESTRO", "REPARAR", "PERDIDA"] },
    { title: "Nivel 20: Excelencia Judicial", words: ["PRESTIGIO", "RIGOR", "BUFETE", "CELICOURT", "ASOCIADOS", "VICTORIA", "EXPERTO", "HONORARIO"] }
  ]
};

// --------------------------------------------------------------------------
// 2. ÉTAT DU JEU
// --------------------------------------------------------------------------
const GRID_SIZE = 12; // Grille agrandie à 12x12 pour accueillir plus de mots
let currentLang = "fr";
let currentLevelIndex = 0;
let gridLetters = [];
let targetWords = [];
let foundWords = new Set();
let selectedCells = [];
let isSelecting = false;

let timerInterval = null;
let secondsElapsed = 0;
let isMuted = false;

// --------------------------------------------------------------------------
// 3. INITIALISATION DU JEU
// --------------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  // Retirer le SplashScreen après l'animation
  setTimeout(() => {
    const splash = document.getElementById("splashScreen");
    if (splash) {
      splash.style.opacity = "0";
      setTimeout(() => splash.style.display = "none", 500);
    }
  }, 1800);

  initEventListeners();
  loadLevel(currentLevelIndex);
});

function initEventListeners() {
  // Changement de langue
  document.getElementById("langSelect").addEventListener("change", (e) => {
    currentLang = e.target.value;
    updateLanguageUI();
    loadLevel(0);
  });

  // Contrôles Audio & Mode Nuit
  document.getElementById("muteBtn").addEventListener("click", toggleMute);
  document.getElementById("nightModeBtn").addEventListener("click", toggleNightMode);

  // Navigation Niveaux & Actions
  document.getElementById("prevLevelBtn").addEventListener("click", prevLevel);
  document.getElementById("nextLevelBtn").addEventListener("click", nextLevel);
  document.getElementById("restartLevelBtn").addEventListener("click", () => loadLevel(currentLevelIndex));
  document.getElementById("hintBtn").addEventListener("click", giveHint);
  document.getElementById("shareBtn").addEventListener("click", shareScore);

  // Sliders Personnalisation Couleurs
  document.getElementById("bgRed").addEventListener("input", updateCustomColors);
  document.getElementById("bgGreen").addEventListener("input", updateCustomColors);
  document.getElementById("bgBlue").addEventListener("input", updateCustomColors);
  document.getElementById("boxOpacity").addEventListener("input", updateCustomColors);

  // Événements de sélection sur la grille (Souris & Tactile)
  const gridEl = document.getElementById("wordGrid");
  
  gridEl.addEventListener("mousedown", handleStartSelection);
  gridEl.addEventListener("mouseover", handleMoveSelection);
  window.addEventListener("mouseup", handleEndSelection);

  gridEl.addEventListener("touchstart", handleTouchStart, { passive: false });
  gridEl.addEventListener("touchmove", handleTouchMove, { passive: false });
  window.addEventListener("touchend", handleEndSelection);
}

// --------------------------------------------------------------------------
// 4. GENERATION DE LA GRILLE & LOGIQUE
// --------------------------------------------------------------------------
function loadLevel(index) {
  const levels = LEVELS_DATA[currentLang] || LEVELS_DATA.fr;
  currentLevelIndex = Math.max(0, Math.min(index, levels.length - 1));
  
  const levelData = levels[currentLevelIndex];
  targetWords = levelData.words;
  foundWords.clear();
  selectedCells = [];

  // Mettre à jour l'en-tête du niveau
  document.getElementById("levelTitle").textContent = levelData.title;
  document.getElementById("levelDisplay").textContent = `${currentLevelIndex + 1} / ${levels.length}`;

  // Générer la grille et afficher la liste des mots
  generateGrid(targetWords);
  renderGrid();
  renderWordList();
  updateFoundCount();

  // Recommencer le chrono
  resetTimer();
  startTimer();
}

function generateGrid(words) {
  gridLetters = Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill(""));

  const directions = [
    [0, 1],   // Horizontale (gauche à droite)
    [1, 0],   // Verticale (haut en bas)
    [1, 1],   // Diagonale (descendante)
    [-1, 1]   // Diagonale (montante)
  ];

  words.forEach(word => {
    let placed = false;
    let attempts = 0;

    while (!placed && attempts < 150) {
      attempts++;
      const dir = directions[Math.floor(Math.random() * directions.length)];
      const [dirR, dirC] = dir;

      const startR = Math.floor(Math.random() * GRID_SIZE);
      const startC = Math.floor(Math.random() * GRID_SIZE);

      const endR = startR + dirR * (word.length - 1);
      const endC = startC + dirC * (word.length - 1);

      if (endR >= 0 && endR < GRID_SIZE && endC >= 0 && endC < GRID_SIZE) {
        let fits = true;
        for (let i = 0; i < word.length; i++) {
          const r = startR + dirR * i;
          const c = startC + dirC * i;
          if (gridLetters[r][c] !== "" && gridLetters[r][c] !== word[i]) {
            fits = false;
            break;
          }
        }

        if (fits) {
          for (let i = 0; i < word.length; i++) {
            gridLetters[startR + dirR * i][startC + dirC * i] = word[i];
          }
          placed = true;
        }
      }
    }
  });

  // Remplir les cases vides avec des lettres aléatoires
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      if (gridLetters[r][c] === "") {
        gridLetters[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }
}

// --------------------------------------------------------------------------
// 5. RENDU DE L'INTERFACE
// --------------------------------------------------------------------------
function renderGrid() {
  const gridEl = document.getElementById("wordGrid");
  gridEl.innerHTML = "";
  gridEl.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 1fr)`;

  for (let r = 0; r < GRID_SIZE; r++) {
    for (let c = 0; c < GRID_SIZE; c++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.textContent = gridLetters[r][c];
      gridEl.appendChild(cell);
    }
  }
}

function renderWordList() {
  const listEl = document.getElementById("wordList");
  listEl.innerHTML = "";

  targetWords.forEach(word => {
    const item = document.createElement("div");
    item.classList.add("word-item");
    if (foundWords.has(word)) {
      item.classList.add("found");
    }
    item.id = `word-${word}`;
    item.textContent = word;
    listEl.appendChild(item);
  });
}

function updateFoundCount() {
  document.getElementById("foundDisplay").textContent = `${foundWords.size} / ${targetWords.length}`;
}

// --------------------------------------------------------------------------
// 6. GESTION DE LA SÉLECTION DES MOTS
// --------------------------------------------------------------------------
function handleStartSelection(e) {
  if (!e.target.classList.contains("grid-cell")) return;
  isSelecting = true;
  selectedCells = [e.target];
  highlightSelected();
}

function handleMoveSelection(e) {
  if (!isSelecting || !e.target.classList.contains("grid-cell")) return;
  
  if (!selectedCells.includes(e.target)) {
    selectedCells.push(e.target);
    highlightSelected();
  }
}

function handleTouchStart(e) {
  e.preventDefault();
  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target && target.classList.contains("grid-cell")) {
    isSelecting = true;
    selectedCells = [target];
    highlightSelected();
  }
}

function handleTouchMove(e) {
  e.preventDefault();
  if (!isSelecting) return;
  const touch = e.touches[0];
  const target = document.elementFromPoint(touch.clientX, touch.clientY);
  if (target && target.classList.contains("grid-cell") && !selectedCells.includes(target)) {
    selectedCells.push(target);
    highlightSelected();
  }
}

function handleEndSelection() {
  if (!isSelecting) return;
  isSelecting = false;

  const selectedWord = selectedCells.map(cell => cell.textContent).join("");
  const reversedWord = selectedWord.split("").reverse().join("");

  let matchedWord = null;
  if (targetWords.includes(selectedWord) && !foundWords.has(selectedWord)) {
    matchedWord = selectedWord;
  } else if (targetWords.includes(reversedWord) && !foundWords.has(reversedWord)) {
    matchedWord = reversedWord;
  }

  if (matchedWord) {
    foundWords.add(matchedWord);
    selectedCells.forEach(cell => cell.classList.add("found"));
    playSound("found");

    const wordItem = document.getElementById(`word-${matchedWord}`);
    if (wordItem) wordItem.classList.add("found");

    updateFoundCount();

    if (foundWords.size === targetWords.length) {
      stopTimer();
      playSound("win");
      setTimeout(() => {
        alert(UI_TEXTS[currentLang].win);
      }, 300);
    }
  } else {
    selectedCells.forEach(cell => cell.classList.remove("selected"));
  }

  selectedCells = [];
}

function highlightSelected() {
  document.querySelectorAll(".grid-cell").forEach(cell => {
    if (!cell.classList.contains("found")) {
      cell.classList.remove("selected");
    }
  });

  selectedCells.forEach(cell => {
    if (!cell.classList.contains("found")) {
      cell.classList.add("selected");
    }
  });
}

// --------------------------------------------------------------------------
// 7. MINUTEUR ET INDICES
// --------------------------------------------------------------------------
function startTimer() {
  stopTimer();
  timerInterval = setInterval(() => {
    secondsElapsed++;
    updateTimerDisplay();
  }, 1000);
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
}

function resetTimer() {
  secondsElapsed = 0;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const mins = String(Math.floor(secondsElapsed / 60)).padStart(2, '0');
  const secs = String(secondsElapsed % 60).padStart(2, '0');
  document.getElementById("timerDisplay").textContent = `${mins}:${secs}`;
}

function giveHint() {
  const remainingWords = targetWords.filter(w => !foundWords.has(w));
  if (remainingWords.length === 0) return;

  const hintWord = remainingWords[0];
  secondsElapsed += 10;
  updateTimerDisplay();

  alert(`💡 Indice : Cherchez le mot "${hintWord[0]}..." (${hintWord.length} lettres)`);
}

// --------------------------------------------------------------------------
// 8. AUTRES FONCTIONNALITÉS (LANGUE, AUDIO, NIGHT MODE, SHARING)
// --------------------------------------------------------------------------
function updateLanguageUI() {
  const texts = UI_TEXTS[currentLang] || UI_TEXTS.fr;

  document.getElementById("appSlogan").textContent = texts.slogan;
  document.getElementById("levelLabel").textContent = texts.level;
  document.getElementById("foundLabel").textContent = texts.found;
  document.getElementById("timerLabel").textContent = texts.timer;
  document.getElementById("wordsToFindTitle").textContent = texts.wordsTitle;

  document.getElementById("prevLevelBtn").textContent = texts.prev;
  document.getElementById("nextLevelBtn").textContent = texts.next;
  document.getElementById("restartLevelBtn").textContent = texts.restart;
  document.getElementById("hintBtn").textContent = texts.hint;
}

function prevLevel() {
  if (currentLevelIndex > 0) {
    loadLevel(currentLevelIndex - 1);
  }
}

function nextLevel() {
  const levels = LEVELS_DATA[currentLang] || LEVELS_DATA.fr;
  if (currentLevelIndex < levels.length - 1) {
    loadLevel(currentLevelIndex + 1);
  }
}

function toggleMute() {
  isMuted = !isMuted;
  const btn = document.getElementById("muteBtn");
  btn.textContent = isMuted ? "🔇 Mute" : "🔊 Mute";
}

function toggleNightMode() {
  document.body.classList.toggle("night-mode");
}

function updateCustomColors() {
  const r = document.getElementById("bgRed").value;
  const g = document.getElementById("bgGreen").value;
  const b = document.getElementById("bgBlue").value;
  const opacity = document.getElementById("boxOpacity").value;

  document.documentElement.style.setProperty('--color-bg-rgb', `${r}, ${g}, ${b}`);
  document.documentElement.style.setProperty('--box-opacity', opacity);
}

function playSound(type) {
  if (isMuted) return;

  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "found") {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime);
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === "win") {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.6);
      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    }
  } catch (e) {
    // Audio non supporté
  }
}

function shareScore() {
  const text = UI_TEXTS[currentLang].shareText;
  if (navigator.share) {
    navigator.share({
      title: 'Mots Cachés - Cabinet Celicourt/Saint-Louis et Associés',
      text: text,
      url: window.location.href,
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(`${text} ${window.location.href}`);
    alert("Lien et message copiés dans le presse-papier !");
  }
}
