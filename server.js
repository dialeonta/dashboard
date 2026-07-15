// ============================================================================
// Quality Dashboard 2.0 - Backend REST API
// Author: Diego Alejandro Leon Tamayo
// Collaborator: Jenniffer Arangure Bejarano
// License: MIT
// ============================================================================

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Updated paths for evaluations folder and advisors.csv
const DATA_DIR = path.join(__dirname, 'data', 'evaluations');
const MATRIX_CSV_PATH = path.join(__dirname, 'data', 'matriz_quality.csv');
const ADVISORS_CSV_PATH = path.join(__dirname, 'data', 'advisors.csv');

// --- DATABASE SERVICE ABSTRACTION ---
class JSONDatabaseService {
  constructor(dataDir) {
    this.dataDir = dataDir;
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
  }

  async saveEvaluation(evaluation) {
    const id = evaluation.id || `eval_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
    evaluation.id = id;
    evaluation.createdAt = evaluation.createdAt || new Date().toISOString();
    const filePath = path.join(this.dataDir, `${id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(evaluation, null, 2), 'utf-8');
    return evaluation;
  }

  async getEvaluations() {
    if (!fs.existsSync(this.dataDir)) return [];
    const files = fs.readdirSync(this.dataDir).filter(f => f.endsWith('.json'));
    const evaluations = [];
    for (const file of files) {
      try {
        const content = fs.readFileSync(path.join(this.dataDir, file), 'utf-8');
        evaluations.push(JSON.parse(content));
      } catch (e) {
        console.error(`Error reading file ${file}:`, e);
      }
    }
    // Sort from newest to oldest by evaluation date (fecha), then by creation date
    return evaluations.sort((a, b) => new Date(b.fecha) - new Date(a.fecha) || new Date(b.createdAt) - new Date(a.createdAt));
  }

  async getEvaluationById(id) {
    const filePath = path.join(this.dataDir, `${id}.json`);
    if (!fs.existsSync(filePath)) return null;
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  }

  async deleteEvaluation(id) {
    const filePath = path.join(this.dataDir, `${id}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  }
}

// Instantiate Database Service
const db = new JSONDatabaseService(DATA_DIR);

// --- CSV PARSING UTILITIES ---

// 1. Get quality matrix from CSV file
function getMatrixFromCSV() {
  if (!fs.existsSync(MATRIX_CSV_PATH)) {
    throw new Error(`The quality matrix file does not exist at: ${MATRIX_CSV_PATH}`);
  }

  const fileContent = fs.readFileSync(MATRIX_CSV_PATH, 'utf-8');
  const lines = fileContent.split(/\r?\n/);
  if (lines.length === 0) return [];

  // Detect separator (comma, semicolon, or tab)
  const firstLine = lines[0];
  let sep = ',';
  if (firstLine.includes(';')) sep = ';';
  else if (firstLine.includes('\t')) sep = '\t';

  const headers = firstLine.split(sep).map(h => h.trim());
  const matrix = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Split line respecting double quotes and detected separator
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

    if (parts.length >= headers.length) {
      const item = {
        tipo: parts[0] ? parts[0].trim() : '',
        item: parts[1] ? parts[1].trim() : '',
        criterio: parts[2] ? parts[2].trim() : '',
        peso: parseFloat(parts[3]) || 0,
        detonante_falla: parts[4] ? parts[4].trim() : '',
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

    // Skip parsing line if it doesn't contain indices of the mandatory fields (ignore any extra fields beyond headers length)
    if (campaignIdx >= parts.length || advisorIdx >= parts.length) {
      continue;
    }

    const campaign = parts[campaignIdx] ? parts[campaignIdx].trim().replace(/"/g, '') : '';
    const advisor = parts[advisorIdx] ? parts[advisorIdx].trim().replace(/"/g, '') : '';

    if (campaign && advisor) {
      if (!grouped[campaign]) {
        grouped[campaign] = [];
      }
      if (!grouped[campaign].includes(advisor)) {
        grouped[campaign].push(advisor);
      }
    }
  }

  // Sort advisors alphabetically under each campaign
  Object.keys(grouped).forEach(campaign => {
    grouped[campaign].sort((a, b) => a.localeCompare(b));
  });

  return grouped;
}

// --- API ENDPOINTS ---

// 1. Get quality matrix from CSV
app.get('/api/matrix', (req, res) => {
  try {
    const matrix = getMatrixFromCSV();
    res.json({ success: true, matrix });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Get advisors grouped by campaign (renamed endpoint to match advisors.csv)
app.get('/api/advisors', (req, res) => {
  try {
    const data = getAdvisorsFromCSV();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Backward compatibility redirect for old asesores endpoint
app.get('/api/asesores', (req, res) => {
  res.redirect('/api/advisors');
});

// 3. Get all saved evaluations
app.get('/api/evaluations', async (req, res) => {
  try {
    const evaluations = await db.getEvaluations();
    res.json({ success: true, evaluations });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 4. Get specific evaluation details
app.get('/api/evaluations/:id', async (req, res) => {
  try {
    const evaluation = await db.getEvaluationById(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ success: false, error: 'Evaluation not found' });
    }
    res.json({ success: true, evaluation });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 5. Save a new evaluation
app.post('/api/evaluations', async (req, res) => {
  try {
    const evaluation = req.body;
    
    // Core validation
    if (!evaluation.asesor || !evaluation.auditor || !evaluation.fecha || !evaluation.campana) {
      return res.status(400).json({ success: false, error: 'Missing required fields in the header.' });
    }

    const saved = await db.saveEvaluation(evaluation);
    res.json({ success: true, evaluation: saved });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 6. Delete evaluation
app.delete('/api/evaluations/:id', async (req, res) => {
  try {
    const deleted = await db.deleteEvaluation(req.params.id);
    if (deleted) {
      res.json({ success: true, message: 'Evaluation deleted successfully.' });
    } else {
      res.status(404).json({ success: false, error: 'Evaluation not found.' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Auto-generate public/default_data.js from raw CSV files and saved JSON evaluations on server startup
try {
  const matrix = getMatrixFromCSV();
  const data = getAdvisorsFromCSV();
  
  // Obtain all stored evaluations in JSON for offline fallback mode
  const evaluationsList = [];
  if (fs.existsSync(DATA_DIR)) {
    const files = fs.readdirSync(DATA_DIR).filter(f => f.endsWith('.json'));
    for (const file of files) {
      try {
        const content = fs.readFileSync(path.join(DATA_DIR, file), 'utf-8');
        evaluationsList.push(JSON.parse(content));
      } catch (e) {
        console.error(`Error reading file ${file} for default_data:`, e);
      }
    }
    // Sort from newest to oldest by date
    evaluationsList.sort((a, b) => new Date(b.fecha) - new Date(a.fecha) || new Date(b.createdAt) - new Date(a.createdAt));
  }
  
  // Expose both DEFAULT_ADVISORS and legacy DEFAULT_ASESORES names to maintain frontend compatibility
  const fileContent = `// DEFAULT VALUES FOR OFFLINE MODE (Auto-synchronized on server start)
const DEFAULT_MATRIX = ${JSON.stringify(matrix, null, 2)};

const DEFAULT_ADVISORS = ${JSON.stringify(data, null, 2)};
const DEFAULT_ASESORES = DEFAULT_ADVISORS;

const DEFAULT_EVALUATIONS = ${JSON.stringify(evaluationsList, null, 2)};
`;
  
  fs.writeFileSync(path.join(__dirname, 'public', 'default_data.js'), fileContent, 'utf-8');
  console.log('[SYNC] File public/default_data.js synchronized with CSV files and evaluations successfully.');
} catch (error) {
  console.error('[SYNC-ERROR] Could not synchronize public/default_data.js:', error.message);
}

// Start Server
app.listen(PORT, () => {
  console.log(`Server running locally at: http://localhost:${PORT}`);
});
