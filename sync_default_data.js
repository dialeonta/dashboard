const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data', 'evaluations');
const MATRIX_CSV_PATH = path.join(__dirname, 'data', 'matriz_quality.csv');
const ADVISORS_CSV_PATH = path.join(__dirname, 'data', 'advisors.csv');

// 1. Get quality matrix from CSV file
function getMatrixFromCSV() {
  if (!fs.existsSync(MATRIX_CSV_PATH)) {
    throw new Error(`The quality matrix file does not exist at: ${MATRIX_CSV_PATH}`);
  }

  const fileContent = fs.readFileSync(MATRIX_CSV_PATH, 'utf-8');
  const lines = fileContent.split(/\r?\n/);
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const matrix = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Split line respecting double quotes
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

// 2. Get advisors grouped by campaign (always reading the CSV file in real time)
function getAdvisorsFromCSV() {
  if (!fs.existsSync(ADVISORS_CSV_PATH)) {
    throw new Error(`The advisors file does not exist at: ${ADVISORS_CSV_PATH}`);
  }

  let content = '';
  const buffer = fs.readFileSync(ADVISORS_CSV_PATH);
  
  // Detect UTF-16LE (BOM: FF FE) vs UTF-8
  if (buffer[0] === 0xFF && buffer[1] === 0xFE) {
    content = buffer.toString('utf16le');
  } else if (buffer.toString('utf8').includes('\u0000')) {
    content = buffer.toString('utf16le');
  } else {
    content = buffer.toString('utf-8');
  }

  const lines = content.split(/\r?\n/);
  if (lines.length === 0) return {};

  // Detect separator (comma, semicolon, or tab)
  const firstLine = lines[0];
  let sep = ',';
  if (firstLine.includes(';')) sep = ';';
  else if (firstLine.includes('\t')) sep = '\t';

  // Parse headers and clean them up
  const headers = firstLine.split(sep).map(h => h.trim().toLowerCase().replace(/"/g, ''));
  
  let campaignIdx = -1;
  let advisorIdx = -1;

  // Search for the mandatory header columns
  headers.forEach((h, idx) => {
    if (h.includes('campa') || h.includes('campaign') || h.includes('camp')) {
      campaignIdx = idx;
    }
    if (h.includes('asesor') || h.includes('nombre') || h.includes('agent') || h.includes('colaborador')) {
      advisorIdx = idx;
    }
  });

  // Fallback defaults if mandatory headers are not found
  if (campaignIdx === -1) campaignIdx = 0;
  if (advisorIdx === -1) advisorIdx = headers.length > 1 ? 1 : 0;

  const grouped = {};

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Split line respecting double quotes and the detected separator
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

    // Skip parsing line if it doesn't contain indices of the mandatory fields
    if (campaignIdx >= parts.length || advisorIdx >= parts.length) {
      continue;
    }

    const campaign = parts[campaignIdx].trim().replace(/"/g, '');
    const advisor = parts[advisorIdx].trim().replace(/"/g, '');

    if (campaign && advisor) {
      if (!grouped[campaign]) {
        grouped[campaign] = [];
      }
      if (!grouped[campaign].includes(advisor)) {
        grouped[campaign].push(advisor);
      }
    }
  }

  return grouped;
}

// 3. Execution block
try {
  console.log('[SYNC] Iniciando sincronizacion offline...');
  const matrix = getMatrixFromCSV();
  const data = getAdvisorsFromCSV();
  
  const evaluationsList = [];
  if (fs.existsSync(DATA_DIR)) {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
    for (const file of files) {
      try {
        const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8');
        evaluationsList.push(JSON.parse(content));
      } catch (e) {
        console.error(`Error leyendo evaluacion ${file}:`, e.message);
      }
    }
    // Ordenar de mas reciente a mas antigua
    evaluationsList.sort((a, b) => new Date(b.fecha) - new Date(a.fecha) || new Date(b.createdAt) - new Date(a.createdAt));
  }
  
  const fileContent = `// DEFAULT VALUES FOR OFFLINE MODE (Auto-synchronized on server start)
const DEFAULT_MATRIX = ${JSON.stringify(matrix, null, 2)};

const DEFAULT_ADVISORS = ${JSON.stringify(data, null, 2)};
const DEFAULT_ASESORES = DEFAULT_ADVISORS;

const DEFAULT_EVALUATIONS = ${JSON.stringify(evaluationsList, null, 2)};
`;
  
  fs.writeFileSync(path.join(__dirname, 'public', 'default_data.js'), fileContent, 'utf-8');
  console.log('[SYNC] Sincronizacion de public/default_data.js completada con exito.');
  process.exit(0);
} catch (error) {
  console.error('[SYNC-ERROR] No se pudo sincronizar:', error.message);
  process.exit(1);
}
