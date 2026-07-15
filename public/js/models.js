// --- BACKUP INTERNAL DATA (If default_data.js is blocked by CORS/security on Chrome file://) ---
const BACKUP_MATRIX = [
  { tipo: 'critico', item: 'INFORMACIÓN CORRECTA Y COMPLETA', criterio: 'ECUF', peso: 0, detonante_falla: 'NO', subitems: ['Información errada', 'Información incompleta'] },
  { tipo: 'critico', item: 'MALTRATO AL CLIENTE', criterio: 'ECUF', peso: 0, detonante_falla: 'SI', subitems: ['Cuelga la llamada', 'Uso de palabras ofensivas o despectivas', 'Tono sarcástico o intolerante'] },
  { tipo: 'critico', item: 'PROCESO', criterio: 'ECUF', peso: 0, detonante_falla: 'NO', subitems: ['Tenencia de línea para migración', 'Digitación de venta de forma correcta', 'Gestión a nombre de terceros'] },
  { tipo: 'critico', item: 'OFRECIMIENTO COMERCIAL CORRECTO', criterio: 'ECN', peso: 0, detonante_falla: 'NO', subitems: ['Perfilamiento', 'Resumen de venta', 'Cierre comercial', 'Manejo de objeciones (mínimo 3 con coherencia)'] },
  { tipo: 'critico', item: 'TIPIFICACIÓN Y REGISTRO', criterio: 'ECN', peso: 0, detonante_falla: 'NO', subitems: ['Tipificación correcta de acuerdo con la gestión', 'Registro / Plantilla de venta completo y correcto'] },
  { tipo: 'critico', item: 'CUMPLIMIENTO LEGAL Y REGULATORIO', criterio: 'ECC', peso: 0, detonante_falla: 'NO', subitems: ['Habeas Data (lectura íntegra antes de solicitar datos)', 'ATDP Digital (solicitud conforme al procedimiento notificación del medio y aceptación)', 'Contrato (lectura o envío completo sin modificaciones notificación y aceptación)', 'Validación de identidad (confirmación del titular notificación)', 'Gestión a nombre de terceros'] },
  
  { tipo: 'blanda', item: 'Escucha activa', criterio: 'N/A', peso: 10, detonante_falla: 'N/A', subitems: [] },
  { tipo: 'blanda', item: 'Empatía y personalización', criterio: 'N/A', peso: 10, detonante_falla: 'N/A', subitems: [] },
  { tipo: 'blanda', item: 'Presentación del producto', criterio: 'N/A', peso: 10, detonante_falla: 'N/A', subitems: [] },
  { tipo: 'blanda', item: 'Ortografía y redacción (canal chat)', criterio: 'N/A', peso: 15, detonante_falla: 'N/A', subitems: [] },
  { tipo: 'blanda', item: 'Generación de confianza', criterio: 'N/A', peso: 15, detonante_falla: 'N/A', subitems: [] },
  { tipo: 'blanda', item: 'Pre-cierre comercial', criterio: 'N/A', peso: 15, detonante_falla: 'N/A', subitems: [] },
  { tipo: 'blanda', item: 'Perfilamiento comercial', criterio: 'N/A', peso: 15, detonante_falla: 'N/A', subitems: [] },
  { tipo: 'blanda', item: 'Acompañamiento al cliente en tiempos de espera', criterio: 'N/A', peso: 10, detonante_falla: 'N/A', subitems: [] },
  
  { tipo: 'estadistico', item: 'Ocupación de canal', criterio: 'N/A', peso: 0, detonante_falla: 'N/A', subitems: [] },
  { tipo: 'estadistico', item: 'PQR procedentes para el cliente', criterio: 'N/A', peso: 0, detonante_falla: 'N/A', subitems: [] }
];

const BACKUP_ASESORES = {
  "DIGITAL": [
    "ANA MARIA MUSUSU CHAPARRO",
    "ANDRES FELIPE JIMENEZ CONTRERAS",
    "BRAYAN FERNANDO MORALES ZARAZA",
    "BRIAN STIVEN CORTES ESPEJO",
    "CAMILO JOSE MARTINEZ BARROS",
    "DANIEL SANTIAGO CESPEDES RAIGOZA",
    "DARLY MARCELA GARZON ATEHORTUA",
    "DAUCY MARISOL MIRANDA RIVERA",
    "DIEGO ALEJANDRO NARVAEZ FLOREZ",
    "EDUAR JOSE GARCIA CONDE",
    "FABIAN CAMILO ALVAREZ RODRIGUEZ",
    "FRANCY YOMAIRA PATALAGUA LOPEZ",
    "HARRY SANTIAGO HERRERA CASTAÑO",
    "HEIDY DALLANA HERRERA RUIZ",
    "INGRID ASTRID CRUZ RODRIGUEZ",
    "IVANNA VALENTINA GARZON PORRAS",
    "JANNIS VALENTINA LEON RIAÑO",
    "JAVIER FELIPE SERRANO FLOREZ",
    "JEISON ALEJANDRO CHAVES GARCIA",
    "JHON EMERSON ZARATE BARBOSA",
    "JIMMY ALEJANDRO BUITRAGO FERNANDEZ",
    "JONATHAN ANDRES CIFUENTES CHAPARRO",
    "JOSE ABRAHAN ESTRADA MARTINEZ",
    "JOSE LUIS CUMACO CABRERA",
    "JUAN CARLOS MARTINEZ RUMBO",
    "KAREN YULIETH LOPEZ MORA",
    "KEINYN ALEXANDER NOGUERA NOGUERA",
    "KEVIN DAVID CLAVIJO GUALTEROS",
    "KEVIN LEANDRO MARTINEZ PEDROZA",
    "KEVIN SANTIAGO SERRATO ANDRADE",
    "LAURA CORREDOR ROJAS",
    "LAURA ESTEFANY RODRIGUEZ RODRIGUEZ",
    "MAIDY MAELY MUCHICON MUCHICON",
    "MARIA FERNANDA SALINAS SALINAS",
    "MICHAEL ALEXANDER DIAZ PAMPLONA",
    "NELBERSON MONTILLA VARGAS",
    "OSIRIS MARIA BARBA SMALBACH",
    "PABLO ANDRES RAMIREZ RUBIO",
    "RICARDO ROBERTO HUAYTALLA SORIANO",
    "VICTOR JULIO PIERNAGORDA VALBUENA",
    "YIN ARLEY HERNANDEZ ALONSO"
  ],
  "OUTBOUND HOGAR": [
    "ADRIANA VELASQUEZ ROMERO",
    "ANDRES FELIPE DIAZ CARDENAS",
    "ANGELA PATRICIA GAMBOA HERNANDEZ",
    "CARLOS MANUEL RIVAS GUERRERO",
    "DANA ISABELLA GARCIA ZAMORA",
    "DANIEL FERNANDO BARRERA URIAN",
    "GUSTAVO FELIPE BELTRAN CAMPO",
    "JERSON ESTIBEN RICO MONTIEL",
    "JOHAN LEONARDO RODRIGUEZ ROZO",
    "JOHANA CAROLINA PERILLA MARTINEZ",
    "JOHN DAVID PINZON ARTUNDUAGA",
    "JONATHAN JAFET GARCIA BERNAL",
    "JUAN SEBASTIAN OSPINA JIMENEZ",
    "JULIAN ALBERTO RUIZ SARMIENTO",
    "JULIO ROBERTO DUARTE CHAMUCERO",
    "JULY ANDREA GAMBOA",
    "KAREN VALENTINA MURILLO TORRES",
    "LAURA ALEJANDRA RAMOS DIAZ",
    "LAURA CAMILA MORA CONTRERAS",
    "LUIS EDUARDO VILLAFAÑE GUZMAN",
    "MONICA BRILLID TIRIA HIGUERA",
    "ZULMA CONSTANZA LOPEZ GOMEZ"
  ],
  "OUTBOUND MOVIL": [
    "ANDRES FERNANDO QUINTERO CAVADIA",
    "BRAYAN ESTIVEN BRAVO DIAZ",
    "DANIEL STIVEN URQUIJO PORRAS",
    "DAVID SANTIAGO ZEA CASTIBLANCO",
    "DIANA PAOLA RUIZ CISNEROS",
    "EVELYN JOHANNA NUÑEZ ROZO",
    "GERALDINNE VEGA OROZCO",
    "INGRID MARISOL BARRETO REYES",
    "JADID ANDREA ARIZA BARRETO",
    "JEISON ANDRES SUAREZ PEREZ",
    "JHOAN DAVID RAIGOZA FORERO",
    "JOSE YOVANI RIVERA BURGOS",
    "JUVIETH LEAL MANRIQUE",
    "KAREN LIZETH ALVARADO LEAL",
    "KEVIN HERNAN MURCIA DAMIAN",
    "KIMBERLY TATIANA CASTELLANOS ROZO",
    "LAURA VALENTINA ASCENCIO VILLANUEVA",
    "LUZ ESTELA CALDERON COBA",
    "MARIA ALEJANDRA SALDAÑA MENDOZA",
    "SEBASTIAN GUILLERMO MONTAÑO RODRIGUEZ",
    "SHARIT DAYANNA AVILA CALDERON",
    "YENIFFER YULIANA ROJAS LOPEZ",
    "YURI MILENA SANABRIA ROZO"
  ],
  "WHATSAPP": [
    "ANDRES FELIPE CUELLAR SANABRIA",
    "ANGEL DAVID SANCHEZ BARRERA",
    "CAMILO ANDRES BRIEVA ARTEAGA",
    "CESAR STEVEN DIAZ BOLIVAR",
    "DANIELA CHIMBI AMAYA",
    "DARLY MICHELL ARANDA ESCOBAR",
    "EDGAR SANTIAGO RIVEROS BAQUERO",
    "GERMAN ALONSO SANCHEZ AYALA",
    "JESUS DAVID SAAVEDRA MARTINEZ",
    "JHOAN SEBASTIAN MAYORGA CORREDOR",
    "LEYDA LILIANA RAMIREZ HENAO",
    "LUISA FERNANDA MAYOR CASTILLO",
    "LUZ ANGELICA HERNANDEZ RICARDO",
    "NICOLAS ALEJANDRO ALVAREZ RODRIGUEZ",
    "SANDRA MILENA RONCANCIO RUIZ",
    "SERGIO DAVID MEDINA HERNANDEZ"
  ],
  "WCB HOGAR": [
    "ANDRES LAMUS PINEDO",
    "BRANDON STEVEN BELLO URREGO",
    "CRISTIAN ANDRES NEIRA DUEÑAS",
    "CRISTIAN JAVIER ORTEGA DURAN",
    "EMILY ALEXANDRA HURTADO PARRA",
    "FABIAN ANCIZAR SALAZAR HUERTAS",
    "JOSE LUIS ROA MARTINEZ",
    "LAURA VANESSA MISNAZA CARRILLO",
    "LUISA FERNANDA DUARTE DUITAMA",
    "MARIA CAMILA RAMOS MARTINEZ"
  ],
  "WCB MOVIL": [
    "AMY YULIETH FIGUEREDO MONTERO",
    "BRANDON STEVEN CHARRIA VILORIA",
    "DANIEL ESTEBAN SALAMANCA MEDINA",
    "DIANA CAROLINA DIAZ ZAMBRANO",
    "DIANA VALENTINA RODRIGUEZ SILVA",
    "EUYANIN ESTEPA RIAÑO",
    "JORGE MAGLIONE CERON CARO",
    "JUAN FERNANDO ROJAS TORRES",
    "JUAN SEBASTIAN JIMENEZ RAMIREZ",
    "JUAN SEBASTIAN RAMOS MEDINA",
    "KAROL NATALIA RODRIGUEZ REYES",
    "LUISA FERNANDA BARACALDO SANCHEZ",
    "PAULA NICOLLE ROJAS RODRIGUEZ",
    "SANTIAGO CASTRO MARCUCCI",
    "SAMANTA AGUDELO SUSA",
    "SAMUEL TOMAS QUIÑONES CORTES",
    "SANTIAGO ROMERO TAMARA"
  ]
};

const STATIC_ADVISOR_SUPERVISOR_MAP = {
  // DIGITAL
  "ANA MARIA MUSUSU CHAPARRO": "PAULO DAVID GUTIERREZ VASQUEZ",
  "ANDRES FELIPE JIMENEZ CONTRERAS": "PAULO DAVID GUTIERREZ VASQUEZ",
  "BRAYAN FERNANDO MORALES ZARAZA": "PAULO DAVID GUTIERREZ VASQUEZ",
  "BRIAN STIVEN CORTES ESPEJO": "PAULO DAVID GUTIERREZ VASQUEZ",
  "CAMILO JOSE MARTINEZ BARROS": "PAULO DAVID GUTIERREZ VASQUEZ",
  "DANIEL SANTIAGO CESPEDES RAIGOZA": "PAULO DAVID GUTIERREZ VASQUEZ",
  "DARLY MARCELA GARZON ATEHORTUA": "PAULO DAVID GUTIERREZ VASQUEZ",
  "DAUCY MARISOL MIRANDA RIVERA": "PAULO DAVID GUTIERREZ VASQUEZ",
  "DIEGO ALEJANDRO NARVAEZ FLOREZ": "PAULO DAVID GUTIERREZ VASQUEZ",
  "EDUAR JOSE GARCIA CONDE": "PAULO DAVID GUTIERREZ VASQUEZ",
  "FABIAN CAMILO ALVAREZ RODRIGUEZ": "PAULO DAVID GUTIERREZ VASQUEZ",
  "FRANCY YOMAIRA PATALAGUA LOPEZ": "PAULO DAVID GUTIERREZ VASQUEZ",
  "HARRY SANTIAGO HERRERA CASTAÑO": "PAULO DAVID GUTIERREZ VASQUEZ",
  "HEIDY DALLANA HERRERA RUIZ": "PAULO DAVID GUTIERREZ VASQUEZ",
  "INGRID ASTRID CRUZ RODRIGUEZ": "PAULO DAVID GUTIERREZ VASQUEZ",
  "IVANNA VALENTINA GARZON PORRAS": "PAULO DAVID GUTIERREZ VASQUEZ",
  "JANNIS VALENTINA LEON RIAÑO": "PAULO DAVID GUTIERREZ VASQUEZ",
  "JAVIER FELIPE SERRANO FLOREZ": "PAULO DAVID GUTIERREZ VASQUEZ",
  "JEISON ALEJANDRO CHAVES GARCIA": "PAULO DAVID GUTIERREZ VASQUEZ",
  "JHON EMERSON ZARATE BARBOSA": "PAULO DAVID GUTIERREZ VASQUEZ",
  "JIMMY ALEJANDRO BUITRAGO FERNANDEZ": "PAULO DAVID GUTIERREZ VASQUEZ",
  "JONATHAN ANDRES CIFUENTES CHAPARRO": "PAULO DAVID GUTIERREZ VASQUEZ",
  "JOSE ABRAHAN ESTRADA MARTINEZ": "PAULO DAVID GUTIERREZ VASQUEZ",
  "JOSE LUIS CUMACO CABRERA": "PAULO DAVID GUTIERREZ VASQUEZ",
  "JUAN CARLOS MARTINEZ RUMBO": "PAULO DAVID GUTIERREZ VASQUEZ",
  "KAREN YULIETH LOPEZ MORA": "PAULO DAVID GUTIERREZ VASQUEZ",
  "KEINYN ALEXANDER NOGUERA NOGUERA": "PAULO DAVID GUTIERREZ VASQUEZ",
  "KEVIN DAVID CLAVIJO GUALTEROS": "PAULO DAVID GUTIERREZ VASQUEZ",
  "KEVIN LEANDRO MARTINEZ PEDROZA": "PAULO DAVID GUTIERREZ VASQUEZ",
  "KEVIN SANTIAGO SERRATO ANDRADE": "PAULO DAVID GUTIERREZ VASQUEZ",
  "LAURA CORREDOR ROJAS": "PAULO DAVID GUTIERREZ VASQUEZ",
  "LAURA ESTEFANY RODRIGUEZ RODRIGUEZ": "PAULO DAVID GUTIERREZ VASQUEZ",
  "MAIDY MAELY MUCHICON MUCHICON": "PAULO DAVID GUTIERREZ VASQUEZ",
  "MARIA FERNANDA SALINAS SALINAS": "PAULO DAVID GUTIERREZ VASQUEZ",
  "MICHAEL ALEXANDER DIAZ PAMPLONA": "PAULO DAVID GUTIERREZ VASQUEZ",
  "NELBERSON MONTILLA VARGAS": "PAULO DAVID GUTIERREZ VASQUEZ",
  "OSIRIS MARIA BARBA SMALBACH": "PAULO DAVID GUTIERREZ VASQUEZ",
  "PABLO ANDRES RAMIREZ RUBIO": "PAULO DAVID GUTIERREZ VASQUEZ",
  "RICARDO ROBERTO HUAYTALLA SORIANO": "PAULO DAVID GUTIERREZ VASQUEZ",
  "VICTOR JULIO PIERNAGORDA VALBUENA": "PAULO DAVID GUTIERREZ VASQUEZ",
  "YIN ARLEY HERNANDEZ ALONSO": "PAULO DAVID GUTIERREZ VASQUEZ",
  // OUTBOUND HOGAR
  "ADRIANA VELASQUEZ ROMERO": "WILSON ALEXANDER DIAZ OSPINA",
  "ANDRES FELIPE DIAZ CARDENAS": "WILSON ALEXANDER DIAZ OSPINA",
  "ANGELA PATRICIA GAMBOA HERNANDEZ": "WILSON ALEXANDER DIAZ OSPINA",
  "CARLOS MANUEL RIVAS GUERRERO": "WILSON ALEXANDER DIAZ OSPINA",
  "DANA ISABELLA GARCIA ZAMORA": "WILSON ALEXANDER DIAZ OSPINA",
  "DANIEL FERNANDO BARRERA URIAN": "WILSON ALEXANDER DIAZ OSPINA",
  "GUSTAVO FELIPE BELTRAN CAMPO": "WILSON ALEXANDER DIAZ OSPINA",
  "JERSON ESTIBEN RICO MONTIEL": "WILSON ALEXANDER DIAZ OSPINA",
  "JOHAN LEONARDO RODRIGUEZ ROZO": "WILSON ALEXANDER DIAZ OSPINA",
  "JOHANA CAROLINA PERILLA MARTINEZ": "WILSON ALEXANDER DIAZ OSPINA",
  "JOHN DAVID PINZON ARTUNDUAGA": "WILSON ALEXANDER DIAZ OSPINA",
  "JONATHAN JAFET GARCIA BERNAL": "WILSON ALEXANDER DIAZ OSPINA",
  "JUAN SEBASTIAN OSPINA JIMENEZ": "WILSON ALEXANDER DIAZ OSPINA",
  "JULIAN ALBERTO RUIZ SARMIENTO": "WILSON ALEXANDER DIAZ OSPINA",
  "JULIO ROBERTO DUARTE CHAMUCERO": "WILSON ALEXANDER DIAZ OSPINA",
  "JULY ANDREA GAMBOA": "WILSON ALEXANDER DIAZ OSPINA",
  "KAREN VALENTINA MURILLO TORRES": "WILSON ALEXANDER DIAZ OSPINA",
  "LAURA ALEJANDRA RAMOS DIAZ": "WILSON ALEXANDER DIAZ OSPINA",
  "LAURA CAMILA MORA CONTRERAS": "WILSON ALEXANDER DIAZ OSPINA",
  "LUIS EDUARDO VILLAFAÑE GUZMAN": "WILSON ALEXANDER DIAZ OSPINA",
  "MONICA BRILLID TIRIA HIGUERA": "WILSON ALEXANDER DIAZ OSPINA",
  "ZULMA CONSTANZA LOPEZ GOMEZ": "WILSON ALEXANDER DIAZ OSPINA",
  // OUTBOUND MOVIL
  "ANDRES FERNANDO QUINTERO CAVADIA": "DIEGO FERNANDO RAMIREZ",
  "BRAYAN ESTIVEN BRAVO DIAZ": "DIEGO FERNANDO RAMIREZ",
  "DANIEL STIVEN URQUIJO PORRAS": "DIEGO FERNANDO RAMIREZ",
  "DAVID SANTIAGO ZEA CASTIBLANCO": "DIEGO FERNANDO RAMIREZ",
  "DIANA PAOLA RUIZ CISNEROS": "DIEGO FERNANDO RAMIREZ",
  "EVELYN JOHANNA NUÑEZ ROZO": "DIEGO FERNANDO RAMIREZ",
  "GERALDINNE VEGA OROZCO": "DIEGO FERNANDO RAMIREZ",
  "INGRID MARISOL BARRETO REYES": "DIEGO FERNANDO RAMIREZ",
  "JADID ANDREA ARIZA BARRETO": "DIEGO FERNANDO RAMIREZ",
  "JEISON ANDRES SUAREZ PEREZ": "DIEGO FERNANDO RAMIREZ",
  "JHOAN DAVID RAIGOZA FORERO": "DIEGO FERNANDO RAMIREZ",
  "JOSE YOVANI RIVERA BURGOS": "DIEGO FERNANDO RAMIREZ",
  "JUVIETH LEAL MANRIQUE": "DIEGO FERNANDO RAMIREZ",
  "KAREN LIZETH ALVARADO LEAL": "DIEGO FERNANDO RAMIREZ",
  "KEVIN HERNAN MURCIA DAMIAN": "DIEGO FERNANDO RAMIREZ",
  "KIMBERLY TATIANA CASTELLANOS ROZO": "DIEGO FERNANDO RAMIREZ",
  "LAURA VALENTINA ASCENCIO VILLANUEVA": "DIEGO FERNANDO RAMIREZ",
  "LUZ ESTELA CALDERON COBA": "DIEGO FERNANDO RAMIREZ",
  "MARIA ALEJANDRA SALDAÑA MENDOZA": "DIEGO FERNANDO RAMIREZ",
  "SEBASTIAN GUILLERMO MONTAÑO RODRIGUEZ": "DIEGO FERNANDO RAMIREZ",
  "SHARIT DAYANNA AVILA CALDERON": "DIEGO FERNANDO RAMIREZ",
  "YENIFFER YULIANA ROJAS LOPEZ": "DIEGO FERNANDO RAMIREZ",
  "YURI MILENA SANABRIA ROZO": "DIEGO FERNANDO RAMIREZ",
  // WHATSAPP
  "ANDRES FELIPE CUELLAR SANABRIA": "LEIDER ALBERTO CORREDOR GOMEZ",
  "ANGEL DAVID SANCHEZ BARRERA": "LEIDER ALBERTO CORREDOR GOMEZ",
  "CAMILO ANDRES BRIEVA ARTEAGA": "LEIDER ALBERTO CORREDOR GOMEZ",
  "CESAR STEVEN DIAZ BOLIVAR": "LEIDER ALBERTO CORREDOR GOMEZ",
  "DANIELA CHIMBI AMAYA": "LEIDER ALBERTO CORREDOR GOMEZ",
  "DARLY MICHELL ARANDA ESCOBAR": "LEIDER ALBERTO CORREDOR GOMEZ",
  "EDGAR SANTIAGO RIVEROS BAQUERO": "LEIDER ALBERTO CORREDOR GOMEZ",
  "GERMAN ALONSO SANCHEZ AYALA": "LEIDER ALBERTO CORREDOR GOMEZ",
  "JESUS DAVID SAAVEDRA MARTINEZ": "LEIDER ALBERTO CORREDOR GOMEZ",
  "JHOAN SEBASTIAN MAYORGA CORREDOR": "LEIDER ALBERTO CORREDOR GOMEZ",
  "LEYDA LILIANA RAMIREZ HENAO": "LEIDER ALBERTO CORREDOR GOMEZ",
  "LUISA FERNANDA MAYOR CASTILLO": "LEIDER ALBERTO CORREDOR GOMEZ",
  "LUZ ANGELICA HERNANDEZ RICARDO": "LEIDER ALBERTO CORREDOR GOMEZ",
  "NICOLAS ALEJANDRO ALVAREZ RODRIGUEZ": "LEIDER ALBERTO CORREDOR GOMEZ",
  "SANDRA MILENA RONCANCIO RUIZ": "LEIDER ALBERTO CORREDOR GOMEZ",
  "SERGIO DAVID MEDINA HERNANDEZ": "LEIDER ALBERTO CORREDOR GOMEZ",
  // WCB HOGAR
  "BRANDON STEVEN BELLO URREGO": "PAULO DAVID GUTIERREZ VASQUEZ",
  "ANDRES LAMUS PINEDO": "RONALDO TORDECILLA",
  "FABIAN ANCIZAR SALAZAR HUERTAS": "RONALDO TORDECILLA",
  "JOSE LUIS ROA MARTINEZ": "RONALDO TORDECILLA",
  "LUISA FERNANDA DUARTE DUITAMA": "RONALDO TORDECILLA",
  "MARIA CAMILA RAMOS MARTINEZ": "RONALDO TORDECILLA",
  // WCB MOVIL
  "AMY YULIETH FIGUEREDO MONTERO": "KAREN LISETH GARZON OLIVARES",
  "BRANDON STEVEN CHARRIA VILORIA": "KAREN LISETH GARZON OLIVARES",
  "DANIEL ESTEBAN SALAMANCA MEDINA": "KAREN LISETH GARZON OLIVARES",
  "DIANA CAROLINA DIAZ ZAMBRANO": "KAREN LISETH GARZON OLIVARES",
  "DIANA VALENTINA RODRIGUEZ SILVA": "KAREN LISETH GARZON OLIVARES",
  "EUYANIN ESTEPA RIAÑO": "KAREN LISETH GARZON OLIVARES",
  "JORGE MAGLIONE CERON CARO": "KAREN LISETH GARZON OLIVARES",
  "JUAN FERNANDO ROJAS TORRES": "KAREN LISETH GARZON OLIVARES",
  "JUAN SEBASTIAN JIMENEZ RAMIREZ": "KAREN LISETH GARZON OLIVARES",
  "JUAN SEBASTIAN RAMOS MEDINA": "KAREN LISETH GARZON OLIVARES",
  "KAROL NATALIA RODRIGUEZ REYES": "KAREN LISETH GARZON OLIVARES",
  "LUISA FERNANDA BARACALDO SANCHEZ": "KAREN LISETH GARZON OLIVARES",
  "PAULA NICOLLE ROJAS RODRIGUEZ": "KAREN LISETH GARZON OLIVARES",
  "SANTIAGO CASTRO MARCUCCI": "KAREN LISETH GARZON OLIVARES",
  "SAMANTA AGUDELO SUSA": "KAREN LISETH GARZON OLIVARES",
  "SAMUEL TOMAS QUIÑONES CORTES": "KAREN LISETH GARZON OLIVARES",
  "SANTIAGO ROMERO TAMARA": "KAREN LISETH GARZON OLIVARES",
  // TECNOLOGIA
  "ANDERSON CAMILO GODOY HERRERA": "CAMILA ANDREA GARCIA BERNAL",
  "ANDRES CAMILO BEJARANO RODRIGUEZ": "CAMILA ANDREA GARCIA BERNAL",
  "ANGIE KATERINE SUA GUAYAMBUCO": "CAMILA ANDREA GARCIA BERNAL",
  "ARLEY DANIEL HARBEY VARGAS CASTAÑEDA": "CAMILA ANDREA GARCIA BERNAL",
  "CHRISTIAN CAMILO ESCOBAR ROA": "CAMILA ANDREA GARCIA BERNAL",
  "CRISTIAN CAMILO FORERO ALAPE": "CAMILA ANDREA GARCIA BERNAL",
  "CRISTIAN DAVID NAVAS CARO": "CAMILA ANDREA GARCIA BERNAL",
  "DANIEL RICARDO GAMEZ GARCIA": "CAMILA ANDREA GARCIA BERNAL",
  "DIEGO ALEJANDRO ALVAREZ MARIN": "CAMILA ANDREA GARCIA BERNAL",
  "DONY BRAYAN MENESES QUINTERO": "CAMILA ANDREA GARCIA BERNAL",
  "JOSE DANIEL NAVAS CARO": "CAMILA ANDREA GARCIA BERNAL",
  "JUAN SEBASTIAN PINEDA MORENO": "CAMILA ANDREA GARCIA BERNAL",
  "KAREN LISETH MARTINEZ HUERTAS": "CAMILA ANDREA GARCIA BERNAL",
  "KEVIN ALFONSO NEIRA ARCINIEGAS": "CAMILA ANDREA GARCIA BERNAL",
  "LUIS CARLOS MORENO ESPINOSA": "CAMILA ANDREA GARCIA BERNAL",
  "MAIRA YINETD HOSSMA CABALLERO": "CAMILA ANDREA GARCIA BERNAL",
  "MELANIE PAOLA CASTRO ROJAS": "CAMILA ANDREA GARCIA BERNAL",
  "SHERIM NICOL GUTIERREZ CUENCA": "CAMILA ANDREA GARCIA BERNAL",
  "STEFANY ESPITIA YEPES": "CAMILA ANDREA GARCIA BERNAL"
};

// --- CORE UTILITY FUNCTIONS ---

function toTitleCase(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/(?:^|\s|-)\S/g, function(m) {
    return m.toUpperCase();
  });
}

function getSupervisorForAdvisor(advisorName) {
  if (!advisorName) return '';
  const localMapStr = safeStorage.getItem('local_supervisor_map');
  if (localMapStr) {
    try {
      const localMap = JSON.parse(localMapStr);
      if (localMap[advisorName]) return localMap[advisorName];
    } catch(e) {}
  }
  return STATIC_ADVISOR_SUPERVISOR_MAP[advisorName] || '';
}

function getScoreClass(score) {
  if (score >= 85) return 'score-green';
  if (score >= 70) return 'score-neutral';
  return 'score-red';
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`; // DD/MM/YYYY
}

// --- CSV PARSING CLIENT-SIDE HELPERS ---

function parseAsesoresCSV(content) {
  const lines = content.split(/\r?\n/);
  if (lines.length === 0) return {};

  const firstLine = lines[0];
  let sep = ',';
  if (firstLine.includes(';')) sep = ';';
  else if (firstLine.includes('\t')) sep = '\t';

  // Normalize headers
  const headers = firstLine.split(sep).map(h => h.trim().toLowerCase().replace(/"/g, ''));
  
  let campaignIdx = -1;
  let advisorIdx = -1;
  let supervisorIdx = -1;

  // Search for column indices using standard patterns
  headers.forEach((h, idx) => {
    if (h.includes('campa') || h.includes('campaign') || h.includes('camp')) {
      campaignIdx = idx;
    }
    if (h.includes('asesor') || h.includes('nombre') || h.includes('agent') || h.includes('colaborador')) {
      advisorIdx = idx;
    }
    if (h.includes('superv') || h.includes('lider') || h.includes('boss')) {
      supervisorIdx = idx;
    }
  });

  // Fallbacks if not found
  if (campaignIdx === -1) campaignIdx = 0;
  if (advisorIdx === -1) advisorIdx = headers.length > 1 ? 1 : 0;

  const grouped = {};
  const supervisorMap = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = [];
    let currentPart = '';
    let inQuotes = false;
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === sep && !inQuotes) {
        parts.push(currentPart);
        currentPart = '';
      } else {
        currentPart += char;
      }
    }
    parts.push(currentPart);

    // Skip parsing line if it doesn't contain indices of the mandatory fields (ignore any extra fields beyond headers length)
    if (campaignIdx >= parts.length || advisorIdx >= parts.length) {
      continue;
    }

    const campaign = parts[campaignIdx] ? parts[campaignIdx].trim().replace(/"/g, '') : '';
    const advisor = parts[advisorIdx] ? parts[advisorIdx].trim().replace(/"/g, '') : '';
    const supervisor = supervisorIdx !== -1 && parts[supervisorIdx] ? parts[supervisorIdx].trim().replace(/"/g, '') : '';

    if (campaign && advisor) {
      if (!grouped[campaign]) {
        grouped[campaign] = [];
      }
      if (!grouped[campaign].includes(advisor)) {
        grouped[campaign].push(advisor);
      }
      if (supervisor) {
        supervisorMap[advisor] = supervisor;
      }
    }
  }

  // Cache supervisor mapping dynamically in local storage
  safeStorage.setItem('local_supervisor_map', JSON.stringify(supervisorMap));

  Object.keys(grouped).forEach(campaign => {
    grouped[campaign].sort((a, b) => a.localeCompare(b));
  });

  return grouped;
}

function parseMatrixCSV(content) {
  const lines = content.split(/\r?\n/);
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const matrix = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const parts = [];
    let currentPart = '';
    let inQuotes = false;
    for (let c = 0; c < line.length; c++) {
      const char = line[c];
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        parts.push(currentPart);
        currentPart = '';
      } else {
        currentPart += char;
      }
    }
    parts.push(currentPart);

    if (parts.length >= headers.length) {
      const item = {
        tipo: parts[0].trim(),
        item: parts[1].trim(),
        criterio: parts[2].trim(),
        peso: parseFloat(parts[3]) || 0,
        detonante_falla: parts[4].trim(),
        subitems: parts[5] ? parts[5].split(';').map(s => s.trim()).filter(Boolean) : []
      };
      matrix.push(item);
    }
  }
  return matrix;
}

// --- DATA INITIALIZATION & LOADING ---

async function loadAsesores() {
  const savedLocalAdvisors = safeStorage.getItem('local_asesores');
  if (savedLocalAdvisors) {
    try {
      advisorsMap = JSON.parse(savedLocalAdvisors);
      console.log('Advisors loaded from localStorage cache.');
      populateCampaignSelect();
      populateFilterCampaignSelect();
      return;
    } catch (e) {
      console.error('Error parsing local_asesores:', e);
    }
  }

  if (isStaticMode || window.location.protocol === 'file:') {
    if (window.location.protocol === 'file:') {
      console.log('Bypassing fetch in local file:// mode for advisors.csv. Using fallback values.');
      advisorsMap = getGlobalAsesores();
    } else {
      try {
        const response = await fetch('data/advisors.csv');
        if (!response.ok) throw new Error('Could not read advisors file');
        
        const arrayBuffer = await response.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        let text = '';
        
        // Handle UTF-16LE or UTF-8 decoding
        if (uint8Array[0] === 0xFF && uint8Array[1] === 0xFE) {
          text = new TextDecoder('utf-16le').decode(uint8Array.slice(2));
        } else {
          const tempStr = new TextDecoder('utf-8').decode(uint8Array);
          if (tempStr.includes('\u0000')) {
            text = new TextDecoder('utf-16le').decode(uint8Array);
          } else {
            text = tempStr;
          }
        }
        
        advisorsMap = parseAsesoresCSV(text);
        console.log('Advisors loaded dynamically from data/advisors.csv on client side.');
      } catch (error) {
        console.warn('CORS or read error loading data/advisors.csv directly. Using DEFAULT_ASESORES:', error.message);
        advisorsMap = getGlobalAsesores();
      }
    }
  } else {
    try {
      const response = await fetch('/api/advisors');
      const data = await response.json();
      if (data.success) {
        advisorsMap = data.data;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error loading advisors from API, using fallback data:', error);
      advisorsMap = getGlobalAsesores();
    }
  }
  populateCampaignSelect();
  populateFilterCampaignSelect();
}

async function loadMatrix() {
  const savedLocalMatrix = safeStorage.getItem('local_matrix');
  if (savedLocalMatrix) {
    try {
      qualityMatrix = JSON.parse(savedLocalMatrix);
      console.log('Quality matrix loaded from localStorage cache.');
      buildFormMatrix();
      return;
    } catch (e) {
      console.error('Error parsing local_matrix:', e);
    }
  }

  if (isStaticMode || window.location.protocol === 'file:') {
    if (window.location.protocol === 'file:') {
      console.log('Bypassing fetch in local file:// mode for matriz_quality.csv. Using fallback values.');
      qualityMatrix = getGlobalMatrix();
    } else {
      try {
        const response = await fetch('data/matriz_quality.csv');
        if (!response.ok) throw new Error('Could not read quality matrix file');
        const text = await response.text();
        qualityMatrix = parseMatrixCSV(text);
        console.log('Quality matrix loaded dynamically from data/matriz_quality.csv.');
      } catch (error) {
        console.warn('CORS or read error loading data/matriz_quality.csv. Using DEFAULT_MATRIX:', error.message);
        qualityMatrix = getGlobalMatrix();
      }
    }
  } else {
    try {
      const response = await fetch('/api/matrix');
      const data = await response.json();
      if (data.success) {
        qualityMatrix = data.matrix;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error loading matrix from API, using fallback data:', error);
      qualityMatrix = getGlobalMatrix();
    }
  }
  buildFormMatrix();
}

async function loadEvaluations() {
  if (isStaticMode || window.location.protocol === 'file:') {
    const localData = safeStorage.getItem('evaluations');
    let localEvals = [];
    if (localData) {
      try {
        localEvals = JSON.parse(localData);
      } catch (e) {
        console.error('Error parsing local evaluations:', e);
      }
    }

    const globalEvals = getGlobalEvaluations();
    const mergedMap = {};

    if (Array.isArray(globalEvals)) {
      globalEvals.forEach(e => {
        if (e && e.id) mergedMap[e.id] = e;
      });
    }

    if (Array.isArray(localEvals)) {
      localEvals.forEach(e => {
        if (e && e.id) mergedMap[e.id] = e;
      });
    }

    evaluations = Object.values(mergedMap).sort((a, b) => new Date(b.fecha) - new Date(a.fecha) || new Date(b.createdAt) - new Date(a.createdAt));

    if (evaluations.length === 0) {
      evaluations = getMockEvaluations();
    }
    safeStorage.setItem('evaluations', JSON.stringify(evaluations));
  } else {
    try {
      const response = await fetch('/api/evaluations');
      const data = await response.json();
      if (data.success) {
        evaluations = data.evaluations;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error loading evaluations from API, using localStorage fallback:', error);
      const localData = safeStorage.getItem('evaluations');
      evaluations = localData ? JSON.parse(localData) : getMockEvaluations();
    }
  }
}

// --- MOCK EVALUATIONS DATA ---
function getMockEvaluations() {
  return [
    {
      id: "eval_demo_001",
      asesor: "Jenniffer Arangure",
      auditor: "Juan Pérez",
      celular: "3104567890",
      fechaLlamada: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      fecha: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      campana: "Ventas Masivas",
      ecufScore: 100,
      ecnScore: 100,
      eccScore: 100,
      softSkillsScore: 90,
      globalScore: 97.0,
      observacionesGenerales: "The advisor demonstrates excellent empathy and sales profile. Successful closing of the mobile sales protocol.",
      detalles: [
        { item: "INFORMACIÓN CORRECTA Y COMPLETA", tipo: "critico", criterio: "ECUF", resultado: "CUMPLE", fallas: [] },
        { item: "MALTRATO AL CLIENTE", tipo: "critico", criterio: "ECUF", resultado: "CUMPLE", fallas: [] },
        { item: "PROCESO", tipo: "critico", criterio: "ECUF", resultado: "CUMPLE", fallas: [] },
        { item: "OFRECIMIENTO COMERCIAL CORRECTO", tipo: "critico", criterio: "ECN", resultado: "CUMPLE", fallas: [] },
        { item: "TIPIFICACIÓN Y REGISTRO", tipo: "critico", criterio: "ECN", resultado: "CUMPLE", fallas: [] },
        { item: "CUMPLIMIENTO LEGAL Y REGULATORIO", tipo: "critico", criterio: "ECC", resultado: "CUMPLE", fallas: [] },
        
        { item: "Escucha activa", tipo: "blanda", peso_max: 10, resultado: "SI", puntaje: 10 },
        { item: "Empatía y personalización", tipo: "blanda", peso_max: 10, resultado: "SI", puntaje: 10 },
        { item: "Presentación del producto", tipo: "blanda", peso_max: 10, resultado: "SI", puntaje: 10 },
        { item: "Ortografía y redacción (canal chat)", tipo: "blanda", peso_max: 15, resultado: "SI", puntaje: 15 },
        { item: "Generación de confianza", tipo: "blanda", peso_max: 15, resultado: "SI", puntaje: 15 },
        { item: "Pre-cierre comercial", tipo: "blanda", peso_max: 15, resultado: "NO", puntaje: 0 },
        { item: "Perfilamiento comercial", tipo: "blanda", peso_max: 15, resultado: "SI", puntaje: 15 },
        { item: "Acompañamiento al cliente en tiempos de espera", tipo: "blanda", peso_max: 10, resultado: "SI", puntaje: 10 },
        
        { item: "Ocupación de canal", tipo: "estadistico", valor: "Sí" },
        { item: "PQR procedentes para el cliente", tipo: "estadistico", valor: "No" }
      ]
    },
    {
      id: "eval_demo_002",
      asesor: "Carlos Gómez",
      auditor: "Ana Belén",
      celular: "3009876543",
      fechaLlamada: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      fecha: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      campana: "Atención al Cliente",
      ecufScore: 0,
      ecnScore: 100,
      eccScore: 100,
      softSkillsScore: 80,
      globalScore: 54.0,
      observacionesGenerales: "Unfortunately, client abuse was detected. The advisor hangs up the call abruptly while the client was complaining.",
      detalles: [
        { item: "INFORMACIÓN CORRECTA Y COMPLETA", tipo: "critico", criterio: "ECUF", resultado: "CUMPLE", fallas: [] },
        { 
          item: "MALTRATO AL CLIENTE", 
          tipo: "critico", 
          criterio: "ECUF", 
          resultado: "NO_CUMPLE", 
          fallas: [{ subitem: "Cuelga la llamada", fallo: true, observacion: "Call hung up intentionally by advisor during customer complaint." }] 
        },
        { item: "PROCESO", tipo: "critico", criterio: "ECUF", resultado: "CUMPLE", fallas: [] },
        { item: "OFRECIMIENTO COMERCIAL CORRECTO", tipo: "critico", criterio: "ECN", resultado: "CUMPLE", fallas: [] },
        { item: "TIPIFICACIÓN Y REGISTRO", tipo: "critico", criterio: "ECN", resultado: "CUMPLE", fallas: [] },
        { item: "CUMPLIMIENTO LEGAL Y REGULATORIO", tipo: "critico", criterio: "ECC", resultado: "CUMPLE", fallas: [] },
        
        { item: "Escucha activa", tipo: "blanda", peso_max: 10, resultado: "SI", puntaje: 10 },
        { item: "Empatía y personalización", tipo: "blanda", peso_max: 10, resultado: "NO", puntaje: 0 },
        { item: "Presentación del producto", tipo: "blanda", peso_max: 10, resultado: "SI", puntaje: 10 },
        { item: "Ortografía y redacción (canal chat)", tipo: "blanda", peso_max: 15, resultado: "SI", puntaje: 15 },
        { item: "Generación de confianza", tipo: "blanda", peso_max: 15, resultado: "NO", puntaje: 0 },
        { item: "Pre-cierre comercial", tipo: "blanda", peso_max: 15, resultado: "SI", puntaje: 15 },
        { item: "Perfilamiento comercial", tipo: "blanda", peso_max: 15, resultado: "SI", puntaje: 15 },
        { item: "Acompañamiento al cliente en tiempos de espera", tipo: "blanda", peso_max: 10, resultado: "SI", puntaje: 10 },
        
        { item: "Ocupación de canal", tipo: "estadistico", valor: "No" },
        { item: "PQR procedentes para el cliente", tipo: "estadistico", valor: "Sí" }
      ]
    },
    {
      id: "eval_demo_003",
      asesor: "Laura Beltrán",
      auditor: "Juan Pérez",
      celular: "3151234567",
      fechaLlamada: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      fecha: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      campana: "Retenciones",
      ecufScore: 100,
      ecnScore: 100,
      eccScore: 100,
      softSkillsScore: 90,
      globalScore: 97.0,
      observacionesGenerales: "Excellent customer retention management, handling objections logically and keeping a respectful tone.",
      detalles: [
        { item: "INFORMACIÓN CORRECTA Y COMPLETA", tipo: "critico", criterio: "ECUF", resultado: "CUMPLE", fallas: [] },
        { item: "MALTRATO AL CLIENTE", tipo: "critico", criterio: "ECUF", resultado: "CUMPLE", fallas: [] },
        { item: "PROCESO", tipo: "critico", criterio: "ECUF", resultado: "CUMPLE", fallas: [] },
        { item: "OFRECIMIENTO COMERCIAL CORRECTO", tipo: "critico", criterio: "ECN", resultado: "CUMPLE", fallas: [] },
        { item: "TIPIFICACIÓN Y REGISTRO", tipo: "critico", criterio: "ECN", resultado: "CUMPLE", fallas: [] },
        { item: "CUMPLIMIENTO LEGAL Y REGULATORIO", tipo: "critico", criterio: "ECC", resultado: "CUMPLE", fallas: [] },
        
        { item: "Escucha activa", tipo: "blanda", peso_max: 10, resultado: "SI", puntaje: 10 },
        { item: "Empatía y personalización", tipo: "blanda", peso_max: 10, resultado: "SI", puntaje: 10 },
        { item: "Presentación del producto", tipo: "blanda", peso_max: 10, resultado: "SI", puntaje: 10 },
        { item: "Ortografía y redacción (canal chat)", tipo: "blanda", peso_max: 15, resultado: "SI", puntaje: 15 },
        { item: "Generación de confianza", tipo: "blanda", peso_max: 15, resultado: "SI", puntaje: 15 },
        { item: "Pre-cierre comercial", tipo: "blanda", peso_max: 15, resultado: "SI", puntaje: 15 },
        { item: "Perfilamiento comercial", tipo: "blanda", peso_max: 15, resultado: "NO", puntaje: 0 },
        { item: "Acompañamiento al cliente en tiempos de espera", tipo: "blanda", peso_max: 10, resultado: "SI", puntaje: 10 },
        
        { item: "Ocupación de canal", tipo: "estadistico", valor: "N/A" },
        { item: "PQR procedentes para el cliente", tipo: "estadistico", valor: "No" }
      ]
    }
  ];
}

// --- IMPORT CSV MANUALLY IN OFFLINE MODE (Prevents CORS Errors) ---
function handleCSVUpload(event, type) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const arrayBuffer = e.target.result;
      const uint8Array = new Uint8Array(arrayBuffer);
      let text = '';
      
      if (type === 'advisors' || type === 'asesores') {
        // Decode UTF-16LE vs UTF-8
        if (uint8Array[0] === 0xFF && uint8Array[1] === 0xFE) {
          text = new TextDecoder('utf-16le').decode(uint8Array.slice(2));
        } else {
          const tempStr = new TextDecoder('utf-8').decode(uint8Array);
          if (tempStr.includes('\u0000')) {
            text = new TextDecoder('utf-16le').decode(uint8Array);
          } else {
            text = tempStr;
          }
        }
        const parsed = parseAsesoresCSV(text);
        if (Object.keys(parsed).length === 0) {
          throw new Error('No valid campaigns or advisors detected in the file.');
        }
        
        safeStorage.setItem('local_asesores', JSON.stringify(parsed));
        advisorsMap = parsed;
        populateCampaignSelect();
        populateFilterCampaignSelect();
        alert('Campaigns and advisors successfully synchronized from the CSV and cached in your browser!');
      } else if (type === 'matrix') {
        const tempStr = new TextDecoder('utf-8').decode(uint8Array);
        const parsed = parseMatrixCSV(tempStr);
        if (parsed.length === 0) {
          throw new Error('No valid items found in the quality matrix.');
        }
        
        safeStorage.setItem('local_matrix', JSON.stringify(parsed));
        qualityMatrix = parsed;
        buildFormMatrix();
        alert('Quality matrix successfully synchronized from the CSV and cached in your browser!');
      }
    } catch (err) {
      alert(`Error processing CSV file: ${err.message}`);
    }
    // Reset file input value
    event.target.value = '';
  };
  reader.readAsArrayBuffer(file);
}

function clearLocalCSVCache() {
  if (confirm('Do you want to reset the quality matrix and advisors list to the default values? Browser CSV cache will be cleared.')) {
    safeStorage.removeItem('local_asesores');
    safeStorage.removeItem('local_matrix');
    alert('Local cache cleared. Page will now reload to apply changes.');
    window.location.reload();
  }
}

