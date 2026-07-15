// --- SAFE STORAGE WRAPPER (Prevents SecurityErrors in Chrome file://) ---
const safeStorage = {
  getItem(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.warn('localStorage.getItem blocked or unavailable:', e.message);
      if (!this._fallback[key]) {
        if (key === 'evaluations') {
          return JSON.stringify(getMockEvaluations());
        }
      }
      return this._fallback[key] || null;
    }
  },
  setItem(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.warn('localStorage.setItem blocked or unavailable:', e.message);
      this._fallback[key] = value;
    }
  },
  removeItem(key) {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.warn('localStorage.removeItem blocked or unavailable:', e.message);
      delete this._fallback[key];
    }
  },
  _fallback: {}
};

// --- GLOBAL STATE VARIABLES ---
let qualityMatrix = [];
let evaluations = [];
let advisorsMap = {};
let activeView = 'audit';
let isStaticMode = false;

// Safe globals getters (falling back to embedded backup values if needed)
const getGlobalMatrix = () => (typeof DEFAULT_MATRIX !== 'undefined') ? DEFAULT_MATRIX : BACKUP_MATRIX;
const getGlobalAsesores = () => (typeof DEFAULT_ASESORES !== 'undefined') ? DEFAULT_ASESORES : BACKUP_ASESORES;
const getGlobalEvaluations = () => (typeof DEFAULT_EVALUATIONS !== 'undefined') ? DEFAULT_EVALUATIONS : [];
