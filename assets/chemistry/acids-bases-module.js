(() => {
  'use strict';

  const steps = [
    { id: 'bridge', number: '01', short: 'Από το H₂O', title: 'Από τα τροχιακά στα ιόντα του νερού' },
    { id: 'roles', number: '02', short: 'Οξύ / βάση', title: 'Ποιος δίνει και ποιος δέχεται πρωτόνιο;' },
    { id: 'ph', number: '03', short: 'pH', title: 'Το pH μετρά την οξύτητα του διαλύματος' },
    { id: 'neutralization', number: '04', short: 'Εξουδετέρωση', title: 'H₃O⁺ και OH⁻ σχηματίζουν νερό' },
    { id: 'salts', number: '05', short: 'Άλατα', title: 'Τα ιόντα που απομένουν οργανώνονται σε άλατα' }
  ];

  const species = {
    water: {
      name: 'Νερό · H₂O', badge: 'ουδέτερο μόριο', charge: '0',
      formula: 'H₂O', lonePairs: 2,
      text: 'Το O έχει δύο μονήρη ζεύγη. Η πλευρά του O είναι δ− και οι πλευρές των H είναι δ+· αυτό κάνει το νερό πολικό.',
      idea: 'Το μονήρες ζεύγος μπορεί να δεχτεί ένα πρωτόνιο.'
    },
    hydronium: {
      name: 'Υδρώνιο · H₃O⁺', badge: 'όξινο σωματίδιο', charge: '+1',
      formula: 'H₃O⁺', lonePairs: 1,
      text: 'Στο νερό το H⁺ δεν περιφέρεται ως γυμνό πρωτόνιο. Προσδένεται σε μόριο H₂O και το απλό σχολικό μοντέλο το παριστάνει ως H₃O⁺.',
      idea: 'Περισσότερο H₃O⁺ σημαίνει μικρότερο pH.'
    },
    hydroxide: {
      name: 'Υδροξείδιο · OH⁻', badge: 'βασικό σωματίδιο', charge: '−1',
      formula: 'OH⁻', lonePairs: 3,
      text: 'Το OH⁻ έχει ένα επιπλέον ηλεκτρόνιο σε σχέση με το ουδέτερο σύνολο O–H και καθαρό φορτίο −1.',
      idea: 'Το OH⁻ μπορεί να δεχτεί πρωτόνιο και να γίνει H₂O.'
    }
  };

  const acids = {
    hcl: { label: 'Υδροχλωρικό οξύ', formula: 'HCl', anion: 'Cl', anionHtml: 'Cl⁻', anionCharge: 1, protons: 1, family: 'χλωριούχο' },
    hno3: { label: 'Νιτρικό οξύ', formula: 'HNO₃', anion: 'NO3', anionHtml: 'NO₃⁻', anionCharge: 1, protons: 1, family: 'νιτρικό' },
    h2so4: { label: 'Θειικό οξύ', formula: 'H₂SO₄', anion: 'SO4', anionHtml: 'SO₄²⁻', anionCharge: 2, protons: 2, family: 'θειικό' }
  };

  const bases = {
    naoh: { label: 'Υδροξείδιο του νατρίου', formula: 'NaOH', cation: 'Na', cationHtml: 'Na⁺', cationCharge: 1, hydroxides: 1, metal: 'νάτριο' },
    koh: { label: 'Υδροξείδιο του καλίου', formula: 'KOH', cation: 'K', cationHtml: 'K⁺', cationCharge: 1, hydroxides: 1, metal: 'κάλιο' },
    caoh2: { label: 'Υδροξείδιο του ασβεστίου', formula: 'Ca(OH)₂', cation: 'Ca', cationHtml: 'Ca²⁺', cationCharge: 2, hydroxides: 2, metal: 'ασβέστιο' }
  };

  function subscript(number) {
    if (number <= 1) return '';
    return `<sub>${number}</sub>`;
  }

  function coefficient(number) {
    return number === 1 ? '' : `${number}`;
  }

  function gcd(a, b) {
    while (b) [a, b] = [b, a % b];
    return a;
  }

  function lcm(a, b) {
    return a * b / gcd(a, b);
  }

  function saltFormula(acid, base) {
    const chargeLcm = lcm(acid.anionCharge, base.cationCharge);
    const cationCount = chargeLcm / base.cationCharge;
    const anionCount = chargeLcm / acid.anionCharge;
    const polyatomic = acid.anion === 'NO3' || acid.anion === 'SO4';
    const cation = `${base.cation}${subscript(cationCount)}`;
    const anionSymbol = acid.anion === 'NO3' ? 'NO₃' : acid.anion === 'SO4' ? 'SO₄' : 'Cl';
    const anion = polyatomic && anionCount > 1 ? `(${anionSymbol})${subscript(anionCount)}` : `${anionSymbol}${subscript(anionCount)}`;
    return `${cation}${anion}`;
  }

  function moleculeSvg(key) {
    const item = species[key] || species.water;
    const hydrogens = key === 'hydronium' ? [
      [110, 165, 'H'], [250, 165, 'H'], [180, 38, 'H']
    ] : key === 'hydroxide' ? [[250, 118, 'H']] : [[110, 165, 'H'], [250, 165, 'H']];
    const lonePairs = key === 'hydronium' ? [[132, 66, -1]] : key === 'hydroxide' ? [[132, 60, -1], [125, 152, -1], [180, 190, 0]] : [[132, 60, -1], [228, 60, 1]];
    const bonds = hydrogens.map(([x, y]) => `<line x1="180" y1="112" x2="${x}" y2="${y}" class="acid-molecule-bond"/>`).join('');
    const hAtoms = hydrogens.map(([x, y, label]) => `<g><circle cx="${x}" cy="${y}" r="22" class="acid-h-atom"/><text x="${x}" y="${y + 6}" text-anchor="middle" class="acid-atom-letter">${label}</text>${key === 'water' ? `<text x="${x}" y="${y + 37}" text-anchor="middle" class="acid-partial">δ+</text>` : ''}</g>`).join('');
    const pairs = lonePairs.map(([x, y, direction]) => `<g class="acid-lone-pair" transform="rotate(${direction * 24} ${x} ${y})"><circle cx="${x - 7}" cy="${y}" r="5"/><circle cx="${x + 7}" cy="${y}" r="5"/></g>`).join('');
    return `<svg viewBox="0 0 360 245" role="img" aria-label="Σχηματικό μοντέλο ${item.name}">
      <defs><radialGradient id="acidO${key}"><stop offset="0" stop-color="#d8ffff" stop-opacity=".95"/><stop offset=".4" stop-color="#50d5df" stop-opacity=".55"/><stop offset="1" stop-color="#1682bb" stop-opacity="0"/></radialGradient></defs>
      <g class="acid-density-pulse"><circle cx="180" cy="112" r="78" fill="url(#acidO${key})"/></g>
      ${bonds}${hAtoms}
      <circle cx="180" cy="112" r="36" class="acid-o-atom"/><text x="180" y="121" text-anchor="middle" class="acid-o-letter">O</text>
      ${pairs}
      ${key === 'water' ? '<text x="180" y="62" text-anchor="middle" class="acid-partial">δ−</text>' : ''}
      ${item.charge !== '0' ? `<circle cx="250" cy="55" r="19" class="acid-charge-bubble"/><text x="250" y="62" text-anchor="middle" class="acid-charge-text">${item.charge}</text>` : ''}
      <text x="180" y="226" text-anchor="middle" class="acid-svg-caption">${item.formula} · ${item.lonePairs} ${item.lonePairs === 1 ? 'μονήρες ζεύγος' : 'μονήρη ζεύγη'}</text>
    </svg>`;
  }

  function bridgeStep(state) {
    const key = species[state.species] ? state.species : 'water';
    const item = species[key];
    return `<article class="card acid-lesson-card">
      <div class="acid-card-head"><span class="acid-kicker">01 · ΣΥΝΔΕΣΗ ΜΕ ΤΑ ΤΡΟΧΙΑΚΑ</span><h2>${steps[0].title}</h2><p>Η προηγούμενη ενότητα έδειξε ότι το O έχει μονήρη ζεύγη και ότι το H₂O είναι πολικό. Τώρα χρησιμοποιούμε αυτή τη δομή για να καταλάβουμε πώς μεταφέρεται ένα πρωτόνιο μέσα στο νερό.</p></div>
      <div class="acid-species-buttons" role="group" aria-label="Επιλογή σωματιδίου">${Object.entries(species).map(([id, value]) => `<button data-acid-species="${id}" class="${id === key ? 'active' : ''}">${value.formula}<small>${value.badge}</small></button>`).join('')}</div>
      <div class="acid-dark-stage">${moleculeSvg(key)}</div>
      <div class="acid-explain-grid"><div><span>Σωματίδιο</span><b>${item.name}</b></div><div><span>Καθαρό φορτίο</span><b>${item.charge}</b></div><div><span>Μονήρη ζεύγη στο O</span><b>${item.lonePairs}</b></div></div>
      <div class="acid-concept"><b>${item.idea}</b><span>${item.text}</span></div>
      <div class="acid-model-warning"><b>Σημαντική ακρίβεια:</b> στο νερό γράφουμε συχνά H⁺ για συντομία, αλλά το πρωτόνιο είναι ενυδατωμένο. Το H₃O⁺ είναι το πρώτο, απλό μοντέλο αυτής της πραγματικότητας.</div>
    </article>`;
  }

  function transferSvg(mode, value) {
    const progress = Math.max(0, Math.min(100, Number(value) || 0)) / 100;
    const protonX = mode === 'acid' ? 112 + progress * 100 : 142 + progress * 82;
    const donorLabel = mode === 'acid' ? 'H—Cl' : 'H₃O⁺';
    const acceptorLabel = mode === 'acid' ? 'H₂O' : 'OH⁻';
    const productLeft = mode === 'acid' ? 'Cl⁻' : 'H₂O';
    const productRight = mode === 'acid' ? 'H₃O⁺' : 'H₂O';
    return `<svg viewBox="0 0 360 230" role="img" aria-label="Μεταφορά πρωτονίου από δότη σε δέκτη">
      <defs><marker id="acidTransferArrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0L8 4L0 8Z" fill="#ffda74"/></marker></defs>
      <text x="65" y="38" text-anchor="middle" class="acid-transfer-role">ΔΟΤΗΣ H⁺</text><text x="292" y="38" text-anchor="middle" class="acid-transfer-role">ΔΕΚΤΗΣ H⁺</text>
      <circle cx="70" cy="112" r="42" class="acid-transfer-donor"/><text x="70" y="119" text-anchor="middle" class="acid-transfer-label">${progress < .55 ? donorLabel : productLeft}</text>
      <circle cx="290" cy="112" r="48" class="acid-transfer-acceptor"/><text x="290" y="119" text-anchor="middle" class="acid-transfer-label">${progress < .55 ? acceptorLabel : productRight}</text>
      <line x1="120" y1="112" x2="236" y2="112" stroke="#ffda74" stroke-width="3" stroke-dasharray="6 7" marker-end="url(#acidTransferArrow)"/>
      <g class="acid-proton-moving"><circle cx="${protonX}" cy="112" r="13" class="acid-proton"/><text x="${protonX}" y="117" text-anchor="middle" class="acid-proton-letter">H⁺</text></g>
      <text x="180" y="190" text-anchor="middle" class="acid-transfer-equation">${progress < .55 ? `${donorLabel} + ${acceptorLabel}` : `${productLeft} + ${productRight}`}</text>
      <text x="180" y="213" text-anchor="middle" class="acid-svg-caption">Το πρωτόνιο αλλάζει μοριακό περιβάλλον· δεν μεταφέρεται ηλεκτρόνιο.</text>
    </svg>`;
  }

  function transferDynamic(mode, value) {
    const acidMode = mode !== 'base';
    return `<div class="acid-dark-stage acid-transfer-stage">${transferSvg(acidMode ? 'acid' : 'base', value)}</div>
      <div class="acid-equation-main">${acidMode ? 'HCl + H₂O → H₃O⁺ + Cl⁻' : 'H₃O⁺ + OH⁻ → 2H₂O'}</div>
      <div class="acid-concept"><b>${acidMode ? 'Οξύ = δότης πρωτονίου' : 'Βάση = δέκτης πρωτονίου'}</b><span>${acidMode ? 'Το HCl μεταφέρει πρωτόνιο σε μονήρες ζεύγος του νερού. Το Cl⁻ είναι η συζυγής βάση που απομένει.' : 'Το OH⁻ δέχεται πρωτόνιο από το H₃O⁺. Τα άτομα αναδιατάσσονται και σχηματίζονται δύο μόρια νερού.'}</span></div>`;
  }

  function rolesStep(state) {
    const mode = state.transferMode === 'base' ? 'base' : 'acid';
    const value = Number.isFinite(Number(state.transfer)) ? Number(state.transfer) : 0;
    return `<article class="card acid-lesson-card">
      <div class="acid-card-head"><span class="acid-kicker">02 · ΜΟΡΙΑΚΟΣ ΜΗΧΑΝΙΣΜΟΣ</span><h2>${steps[1].title}</h2><p>Οι λέξεις «οξύ» και «βάση» περιγράφουν ρόλους σε μεταφορά πρωτονίου. Το οξύ δίνει H⁺ και η βάση το δέχεται με διαθέσιμη ηλεκτρονιακή πυκνότητα.</p></div>
      <div class="acid-toggle"><button data-transfer-mode="acid" class="${mode === 'acid' ? 'active' : ''}">Οξύ: δίνει H⁺</button><button data-transfer-mode="base" class="${mode === 'base' ? 'active' : ''}">Βάση: δέχεται H⁺</button></div>
      <div class="acid-range-wrap"><div><label for="chem-proton-transfer">Μετακίνησε το πρωτόνιο</label><output id="chem-proton-value">${Math.round(value)}%</output></div><input id="chem-proton-transfer" type="range" min="0" max="100" step="1" value="${value}"></div>
      <div id="chem-transfer-dynamic" aria-live="polite">${transferDynamic(mode, value)}</div>
      <div class="acid-model-warning"><b>Όχι αποστήθιση τύπων:</b> παρατήρησε ποιο σωματίδιο χάνει το H⁺ και ποιο το αποκτά. Η ίδια λογική συνεχίζεται στην εξουδετέρωση.</div>
    </article>`;
  }

  function phColor(ph) {
    const hue = ph <= 7 ? 4 + ph * 7 : 53 + (ph - 7) * 18;
    return `hsl(${Math.min(185, hue)} 78% ${ph === 7 ? 42 : 48}%)`;
  }

  function concentrationHtml(exponent) {
    return exponent === 0 ? '1 mol/L' : `10<sup>−${Math.abs(exponent)}</sup> mol/L`;
  }

  function phDynamic(rawValue) {
    const ph = Math.max(0, Math.min(14, Number(rawValue)));
    const rounded = Math.round(ph * 10) / 10;
    const hExp = Math.round(rounded * 10) / 10;
    const ohExp = Math.round((14 - rounded) * 10) / 10;
    const state = rounded < 6.95 ? 'όξινο' : rounded > 7.05 ? 'βασικό' : 'ουδέτερο';
    const dominant = state === 'όξινο' ? 'H₃O⁺' : state === 'βασικό' ? 'OH⁻' : 'ίσα H₃O⁺ και OH⁻';
    const distance = Math.abs(rounded - 7);
    const ratio = distance < .05 ? '1 : 1' : `περίπου 10<sup>${Math.round(distance * 2 * 10) / 10}</sup> : 1`;
    const marker = rounded / 14 * 100;
    return `<div class="ph-readout"><div class="ph-number" style="--ph-color:${phColor(rounded)}"><span>pH</span><b>${rounded.toFixed(1)}</b><small>${state} διάλυμα</small></div><div class="ph-balance"><div><span>[H₃O⁺]</span><b>${concentrationHtml(hExp)}</b></div><div><span>[OH⁻]</span><b>${concentrationHtml(ohExp)}</b></div><div><span>Υπερισχύει</span><b>${dominant}</b></div></div></div>
      <div class="ph-scale" aria-label="Κλίμακα pH από 0 έως 14"><div class="ph-gradient"></div><span class="ph-marker" style="left:${marker}%"><i></i><b>${rounded.toFixed(1)}</b></span><div class="ph-scale-labels"><span>0 · όξινο</span><span>7 · ουδέτερο</span><span>14 · βασικό</span></div></div>
      <div class="acid-concept"><b>Η κλίμακα είναι λογαριθμική</b><span>Μεταβολή κατά 1 μονάδα pH αντιστοιχεί σε δεκαπλάσια μεταβολή της [H₃O⁺]. Εδώ ο λόγος του κυρίαρχου προς το άλλο ιόν είναι ${ratio}.</span></div>`;
  }

  function phStep(state) {
    const value = Number.isFinite(Number(state.ph)) ? Number(state.ph) : 7;
    return `<article class="card acid-lesson-card">
      <div class="acid-card-head"><span class="acid-kicker">03 · ΑΠΟ ΤΑ ΣΩΜΑΤΙΔΙΑ ΣΤΗ ΜΕΤΡΗΣΗ</span><h2>${steps[2].title}</h2><p>Το pH ανήκει στο διάλυμα, όχι «στο είδος του οξέος». Εξαρτάται από τη σχετική παρουσία H₃O⁺ και OH⁻ και μεταβάλλεται με την αραίωση.</p></div>
      <div class="acid-range-wrap ph-range"><div><label for="chem-ph-slider">Σύρε την τιμή pH</label><output id="chem-ph-value">${value.toFixed(1)}</output></div><input id="chem-ph-slider" type="range" min="0" max="14" step="0.1" value="${value}"></div>
      <div id="chem-ph-dynamic" aria-live="polite">${phDynamic(value)}</div>
      <div class="acid-everyday-grid"><button data-ph-preset="2.4"><span>🍋</span><b>Χυμός λεμονιού</b><small>≈ 2,4</small></button><button data-ph-preset="5.0"><span>☕</span><b>Καφές</b><small>≈ 5</small></button><button data-ph-preset="7.0"><span>💧</span><b>Καθαρό νερό</b><small>≈ 7</small></button><button data-ph-preset="9.5"><span>🧼</span><b>Σαπουνόνερο</b><small>≈ 9,5</small></button></div>
      <div class="acid-model-warning"><b>Ισχυρό ≠ πυκνό:</b> η ισχύς αφορά το πόσο ιοντίζεται ένα οξύ ή μια βάση. Η συγκέντρωση αφορά το πόση ουσία υπάρχει σε ορισμένο όγκο διαλύματος. Οι σχέσεις [H₃O⁺][OH⁻] = 10⁻¹⁴ και pH + pOH = 14 χρησιμοποιούνται εδώ στο απλό υδατικό μοντέλο κοντά στους 25°C.</div>
    </article>`;
  }

  function neutralPh(acidMl, baseMl) {
    const acidMoles = acidMl * .1 / 1000;
    const baseMoles = baseMl * .1 / 1000;
    const totalLitres = Math.max((acidMl + baseMl) / 1000, .001);
    const difference = acidMoles - baseMoles;
    if (Math.abs(difference) < 1e-10) return 7;
    if (difference > 0) return Math.max(0, -Math.log10(difference / totalLitres));
    const poh = Math.max(0, -Math.log10(-difference / totalLitres));
    return Math.min(14, 14 - poh);
  }

  function titrationCurve(acidMl, baseMl) {
    const points = [];
    for (let ml = 0; ml <= 100; ml += 2) {
      const ph = neutralPh(acidMl, ml);
      const x = 34 + ml / 100 * 292;
      const y = 184 - ph / 14 * 148;
      points.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    const markerX = 34 + baseMl / 100 * 292;
    const markerPh = neutralPh(acidMl, baseMl);
    const markerY = 184 - markerPh / 14 * 148;
    return `<svg viewBox="0 0 360 220" role="img" aria-label="Καμπύλη pH κατά την προσθήκη βάσης σε οξύ">
      <line x1="34" y1="184" x2="330" y2="184" class="titration-axis"/><line x1="34" y1="184" x2="34" y2="28" class="titration-axis"/>
      <line x1="34" y1="110" x2="330" y2="110" class="titration-neutral"/><text x="42" y="104" class="titration-label">pH 7</text>
      <polyline points="${points.join(' ')}" class="titration-line"/>
      <line x1="${markerX}" y1="184" x2="${markerX}" y2="${markerY}" class="titration-guide"/><circle cx="${markerX}" cy="${markerY}" r="7" class="titration-marker"/>
      <text x="34" y="205" class="titration-label">0</text><text x="330" y="205" text-anchor="end" class="titration-label">100 mL NaOH</text><text x="18" y="34" class="titration-label">14</text><text x="20" y="187" class="titration-label">0</text>
    </svg>`;
  }

  function particlePills(label, count, className) {
    const visible = Math.max(0, Math.min(12, Math.round(count / 8)));
    if (!visible) return '';
    return Array.from({ length: visible }, () => `<span class="acid-particle ${className}">${label}</span>`).join('');
  }

  function neutralizationDynamic(acidRaw, baseRaw) {
    const acidMl = Math.max(0, Math.min(100, Number(acidRaw) || 0));
    const baseMl = Math.max(0, Math.min(100, Number(baseRaw) || 0));
    const reacted = Math.min(acidMl, baseMl);
    const acidLeft = Math.max(0, acidMl - baseMl);
    const baseLeft = Math.max(0, baseMl - acidMl);
    const ph = neutralPh(acidMl, baseMl);
    const condition = acidLeft > .01 ? 'περίσσεια οξέος' : baseLeft > .01 ? 'περίσσεια βάσης' : acidMl + baseMl ? 'ισοδύναμες ποσότητες' : 'μόνο νερό';
    const color = phColor(ph);
    return `<div class="neutral-grid"><div class="neutral-beaker"><div class="neutral-liquid" style="--solution-color:${color}"><div class="neutral-particles">${particlePills('H₃O⁺', acidLeft, 'acidic')}${particlePills('OH⁻', baseLeft, 'basic')}${particlePills('Na⁺', baseMl, 'spectator-a')}${particlePills('Cl⁻', acidMl, 'spectator-b')}${particlePills('H₂O', reacted, 'water')}</div></div><span class="neutral-beaker-label">${condition}</span></div><div class="neutral-chart">${titrationCurve(Math.max(acidMl, 1), baseMl)}</div></div>
      <div class="neutral-result"><div><span>Υπολογιζόμενο pH</span><b style="color:${color}">${ph.toFixed(2)}</b></div><div><span>Αντέδρασαν</span><b>${reacted.toFixed(0)} σχετικές μονάδες</b></div><div><span>Παραμένει</span><b>${acidLeft > .01 ? 'H₃O⁺' : baseLeft > .01 ? 'OH⁻' : 'Na⁺ και Cl⁻'}</b></div></div>
      <div class="acid-equation-main">H₃O⁺ + OH⁻ → 2H₂O</div>
      <div class="acid-concept"><b>Τα Na⁺ και Cl⁻ είναι θεατές</b><span>Βρίσκονται στο διάλυμα πριν και μετά, ενώ H₃O⁺ και OH⁻ καταναλώνονται. Στην ισοδυναμία μένουν νερό και ενυδατωμένα ιόντα Na⁺/Cl⁻.</span></div>`;
  }

  function neutralizationStep(state) {
    const acidMl = Number.isFinite(Number(state.acidMl)) ? Number(state.acidMl) : 50;
    const baseMl = Number.isFinite(Number(state.baseMl)) ? Number(state.baseMl) : 50;
    return `<article class="card acid-lesson-card">
      <div class="acid-card-head"><span class="acid-kicker">04 · ΑΝΤΙΔΡΑΣΗ ΣΕ ΕΠΙΠΕΔΟ ΙΟΝΤΩΝ</span><h2>${steps[3].title}</h2><p>Αναμειγνύουμε HCl 0,10 M και NaOH 0,10 M. Παρατήρησε ποια ιόντα καταναλώνονται, ποια περισσεύουν και πώς αλλάζει το pH.</p></div>
      <div class="neutral-controls"><div class="acid-range-wrap"><div><label for="chem-acid-volume">HCl 0,10 M</label><output id="chem-acid-value">${acidMl} mL</output></div><input id="chem-acid-volume" type="range" min="0" max="100" step="5" value="${acidMl}"></div><div class="acid-range-wrap"><div><label for="chem-base-volume">NaOH 0,10 M</label><output id="chem-base-value">${baseMl} mL</output></div><input id="chem-base-volume" type="range" min="0" max="100" step="5" value="${baseMl}"></div></div>
      <div id="chem-neutral-dynamic" aria-live="polite">${neutralizationDynamic(acidMl, baseMl)}</div>
      <div class="acid-model-warning"><b>Εξουδετέρωση δεν σημαίνει «εξαφάνιση»:</b> είναι χημική αντίδραση και αναδιάταξη ατόμων. Αν ένα αντιδραστήριο περισσεύει, το τελικό διάλυμα δεν είναι ουδέτερο.</div>
    </article>`;
  }

  function saltEquation(acidId, baseId) {
    const acid = acids[acidId] || acids.hcl;
    const base = bases[baseId] || bases.naoh;
    const waterCount = lcm(acid.protons, base.hydroxides);
    const acidCoefficient = waterCount / acid.protons;
    const baseCoefficient = waterCount / base.hydroxides;
    const salt = saltFormula(acid, base);
    return {
      acid, base, salt,
      equation: `${coefficient(acidCoefficient)}${acid.formula} + ${coefficient(baseCoefficient)}${base.formula} → ${salt} + ${coefficient(waterCount)}H₂O`,
      name: `${acid.family} άλας με κατιόν ${base.metal}`
    };
  }

  function saltDynamic(acidId, baseId) {
    const result = saltEquation(acidId, baseId);
    const lattice = Array.from({ length: 20 }, (_, index) => `<span class="salt-ion ${index % 2 ? 'anion' : 'cation'}">${index % 2 ? result.acid.anionHtml : result.base.cationHtml}</span>`).join('');
    return `<div class="salt-result"><div class="salt-lattice" aria-label="Σχηματικό ιοντικό πλέγμα">${lattice}</div><div class="salt-summary"><span>Προϊόν</span><b>${result.salt}</b><small>${result.name}</small></div></div>
      <div class="acid-equation-main salt-equation">${result.equation}</div>
      <div class="acid-concept"><b>Το άλας είναι ηλεκτρικά ουδέτερο</b><span>Ο συνολικός θετικός και ο συνολικός αρνητικός φορτισμός ισορροπούν. Στο στερεό τα ιόντα σχηματίζουν πλέγμα· στο νερό πολλά άλατα διαχωρίζονται σε ενυδατωμένα ιόντα.</span></div>`;
  }

  function saltsStep(state) {
    const acidId = acids[state.saltAcid] ? state.saltAcid : 'hcl';
    const baseId = bases[state.saltBase] ? state.saltBase : 'naoh';
    return `<article class="card acid-lesson-card">
      <div class="acid-card-head"><span class="acid-kicker">05 · ΑΠΟ ΤΑ ΙΟΝΤΑ ΣΤΟ ΑΛΑΣ</span><h2>${steps[4].title}</h2><p>Το κατιόν της βάσης και το ανιόν του οξέος δίνουν το άλας. Διάλεξε αντιδραστήρια και έλεγξε πώς τα φορτία καθορίζουν τον τύπο του.</p></div>
      <div class="salt-builder"><div><span>Διάλεξε οξύ</span>${Object.entries(acids).map(([id, item]) => `<button data-salt-acid="${id}" class="${id === acidId ? 'active' : ''}">${item.formula}<small>${item.label}</small></button>`).join('')}</div><div><span>Διάλεξε βάση</span>${Object.entries(bases).map(([id, item]) => `<button data-salt-base="${id}" class="${id === baseId ? 'active' : ''}">${item.formula}<small>${item.label}</small></button>`).join('')}</div></div>
      <div id="chem-salt-dynamic" aria-live="polite">${saltDynamic(acidId, baseId)}</div>
      <div class="acid-model-warning"><b>Προσοχή:</b> «άλας» στη Χημεία δεν σημαίνει μόνο μαγειρικό αλάτι. Είναι μεγάλη κατηγορία ιοντικών ενώσεων. Επίσης, δεν έχουν όλα τα διαλύματα αλάτων pH ακριβώς 7.</div>
    </article>`;
  }

  function navigation(activeStep) {
    const currentIndex = Math.max(0, steps.findIndex(step => step.id === activeStep));
    const previous = steps[currentIndex - 1];
    const next = steps[currentIndex + 1];
    return `<div class="acid-step-actions">${previous ? `<button class="btn white" data-acid-step="${previous.id}">← ${previous.short}</button>` : '<span></span>'}${next ? `<button class="btn primary" data-acid-step="${next.id}">${next.short} →</button>` : '<button class="btn primary" data-chem-view="quiz">Συνέχεια στο Quiz →</button>'}</div>`;
  }

  function render(state = {}) {
    const activeStep = steps.some(step => step.id === state.step) ? state.step : 'bridge';
    const content = activeStep === 'roles' ? rolesStep(state) : activeStep === 'ph' ? phStep(state) : activeStep === 'neutralization' ? neutralizationStep(state) : activeStep === 'salts' ? saltsStep(state) : bridgeStep(state);
    return `<section class="card acid-intro"><span class="pill">Νέα ενότητα · από τη δομή στη χημική αντίδραση</span><h2>Οξέα, βάσεις, pH, εξουδετέρωση και άλατα</h2><p class="small">Ακολούθησε την αλυσίδα χωρίς άλματα: ηλεκτρονιακή πυκνότητα → πολικό νερό → μεταφορά πρωτονίου → pH → εξουδετέρωση → άλας.</p></section>
      <nav class="acid-learning-chain" aria-label="Βήματα ενότητας">${steps.map((step, index) => `<button data-acid-step="${step.id}" class="${step.id === activeStep ? 'active' : ''} ${index < steps.findIndex(item => item.id === activeStep) ? 'visited' : ''}"><span>${step.number}</span><b>${step.short}</b></button>`).join('')}</nav>
      ${content}${navigation(activeStep)}
      <p class="chem-source">Διδακτική προσέγγιση: μοντέλα σωματιδίων, σύνδεση μακροσκοπικού–μοριακού–συμβολικού επιπέδου και διαγνωστικές διακρίσεις (οξύ/βάση, ισχυρό/πυκνό, αντίδραση/αραίωση).</p>`;
  }

  window.AcidsBasesModule = {
    render,
    transferDynamic,
    phDynamic,
    neutralizationDynamic,
    saltDynamic
  };
})();
