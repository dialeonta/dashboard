// ============================================================================
// Quality Dashboard 2.0 - Frontend Coordinator
// Author: Diego Alejandro Leon Tamayo
// Collaborator: Jenniffer Arangure Bejarano
// License: MIT
// ============================================================================

// --- MAIN COORDINATOR & ENTRY POINT ---

// Active DOM element pointers for navigation views
const views = {
  audit: document.getElementById('view-audit'),
  history: document.getElementById('view-history'),
  dashboard: document.getElementById('view-dashboard'),
  help: document.getElementById('view-help')
};

const navButtons = {
  audit: document.getElementById('nav-btn-audit'),
  history: document.getElementById('nav-btn-history'),
  dashboard: document.getElementById('nav-btn-dashboard'),
  help: document.getElementById('nav-btn-help')
};

// Interactive Chart.js pointers
let charts = {
  supervisor: null,
  failures: null,
  campaignErrors: null,
  analystErrors: null,
  softSkills: null
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
  // Initialize Theme layout from stored preferences
  const savedTheme = safeStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcons(savedTheme);

  // Set the current date in evaluation form and lock it
  const dateInput = document.getElementById('meta-fecha');
  if (dateInput) {
    dateInput.valueAsDate = new Date();
  }

  // Probe Server API availability and load datasets
  await checkAPIConnection();
  await loadMatrix();
  await loadAsesores();
  await loadEvaluations();

  // Draw initial Lucide UI icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Initialize auditor details
  setupAuditorIdentity();
  
  // Hook help view initialization
  if (typeof initHelpView === 'function') {
    initHelpView();
  }
});

// --- AUDITOR IDENTITY MANAGEMENT ---
function setupAuditorIdentity() {
  const savedName = safeStorage.getItem('quality_auditor_name');
  if (savedName) {
    setAuditorName(savedName);
  } else {
    showAuditorModal();
  }
}

function setAuditorName(name) {
  safeStorage.setItem('quality_auditor_name', name.trim());
  const dispName = document.getElementById('display-auditor-name');
  if (dispName) {
    dispName.textContent = `Analyst: ${name.trim()}`;
  }
  const metaAuditor = document.getElementById('meta-auditor');
  if (metaAuditor) {
    metaAuditor.value = name.trim();
  }
  // Refresh historical table to apply filter
  if (typeof renderHistoryTable === 'function') {
    try { renderHistoryTable(); } catch(e) {}
  }
}

function showAuditorModal() {
  const modal = document.getElementById('auditor-modal');
  const input = document.getElementById('auditor-name-input');
  const btnSave = document.getElementById('auditor-modal-btn-save');
  
  if (!modal || !input || !btnSave) return;

  const savedName = safeStorage.getItem('quality_auditor_name') || '';
  input.value = savedName;
  modal.classList.remove('hidden');
  input.focus();

  const handleSave = () => {
    const val = input.value.trim();
    if (!val) {
      alert('Please enter your name.');
      return;
    }
    modal.classList.add('hidden');
    setAuditorName(val);
    btnSave.removeEventListener('click', handleSave);
    input.removeEventListener('keypress', handleKeyPress);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSave();
  };

  btnSave.addEventListener('click', handleSave);
  input.addEventListener('keypress', handleKeyPress);
}

function promptAuditorNameChange() {
  showAuditorModal();
}

// --- API SERVER CONNECTION CHECKS ---
async function checkAPIConnection() {
  const staticBanner = document.getElementById('static-banner');
  if (window.location.protocol === 'file:') {
    console.log('Local file:// protocol detected. Activating Static Offline Mode.');
    isStaticMode = true;
    if (staticBanner) staticBanner.classList.remove('hidden');
    return;
  }
  try {
    const response = await fetch('/api/matrix');
    if (!response.ok) throw new Error('Server API responded with error status');
    isStaticMode = false;
    if (staticBanner) staticBanner.classList.add('hidden');
  } catch (error) {
    console.warn('Server API disconnected. Activating Static Offline Mode:', error.message);
    isStaticMode = true;
    if (staticBanner) staticBanner.classList.remove('hidden');
  }
}

// --- THEME SWITCHER ---
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  safeStorage.setItem('theme', newTheme);
  updateThemeIcons(newTheme);
  
  if (activeView === 'dashboard') {
    renderDashboard();
  }
}

function updateThemeIcons(theme) {
  const sunIcon = document.getElementById('theme-icon-sun');
  const moonIcon = document.getElementById('theme-icon-moon');
  if (!sunIcon || !moonIcon) return;

  if (theme === 'light') {
    sunIcon.classList.remove('hidden');
    moonIcon.classList.add('hidden');
  } else {
    sunIcon.classList.add('hidden');
    moonIcon.classList.remove('hidden');
  }
}

// --- NAVIGATION SWITCH VIEWS ---
function switchView(viewId) {
  activeView = viewId;
  
  // Toggle nav button classes
  Object.keys(navButtons).forEach(key => {
    if (navButtons[key]) {
      if (key === viewId) {
        navButtons[key].classList.add('active');
      } else {
        navButtons[key].classList.remove('active');
      }
    }
  });

  // Toggle visible view container classes
  Object.keys(views).forEach(key => {
    if (views[key]) {
      if (key === viewId) {
        views[key].classList.add('active');
      } else {
        views[key].classList.remove('active');
      }
    }
  });

  // Perform view lifecycle operations
  if (viewId === 'history') {
    loadEvaluations().then(() => {
      renderHistoryTable();
    });
  } else if (viewId === 'dashboard') {
    loadEvaluations().then(() => {
      populateDashboardFilters();
      renderDashboard();
    });
  }
  
  // Rerender icons inside newly opened views
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// --- GLOBAL TOASTS & MODALS WRAPPER ---
function showStatusToast(message) {
  let toast = document.getElementById('status-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'status-toast';
    toast.style.position = 'fixed';
    toast.style.bottom = '25px';
    toast.style.right = '25px';
    toast.style.backgroundColor = 'rgba(22, 30, 49, 0.95)';
    toast.style.color = '#ffffff';
    toast.style.padding = '12px 24px';
    toast.style.borderRadius = '8px';
    toast.style.border = '1px solid rgba(255,255,255,0.15)';
    toast.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
    toast.style.zIndex = '999999';
    toast.style.fontFamily = 'var(--font-sans)';
    toast.style.fontSize = '0.9rem';
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.transform = 'translateY(10px)';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
  }, 4000);
}

function safeAlert(message) {
  try {
    alert(message);
  } catch (e) {
    console.log('[ALERT FALLBACK]:', message);
    showStatusToast(message);
  }
}

function safeConfirm(message, callback) {
  try {
    showCustomConfirm(message, callback);
  } catch (e) {
    console.warn('[CONFIRM FALLBACK] Error showing custom confirm modal, invoking callback directly:', message);
    Promise.resolve(callback()).catch(err => {
      console.error('Error on confirm callback (fallback):', err);
      safeAlert(`Error: ${err.message}`);
    });
  }
}

function showCustomConfirm(message, onConfirm, onCancel) {
  const modal = document.getElementById('confirm-modal');
  const messageEl = document.getElementById('confirm-modal-message');
  const btnOk = document.getElementById('confirm-modal-btn-ok');
  const btnCancel = document.getElementById('confirm-modal-btn-cancel');

  if (!modal || !messageEl || !btnOk || !btnCancel) return;

  messageEl.textContent = message;
  modal.classList.remove('hidden');

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  const cleanup = () => {
    modal.classList.add('hidden');
    btnOk.removeEventListener('click', handleOk);
    btnCancel.removeEventListener('click', handleCancel);
  };

  function handleOk() {
    cleanup();
    if (onConfirm) {
      Promise.resolve(onConfirm()).catch(err => {
        console.error('Error on confirm callback:', err);
        safeAlert(`Error: ${err.message}`);
      });
    }
  }

  function handleCancel() {
    cleanup();
    if (onCancel) onCancel();
  }

  btnOk.addEventListener('click', handleOk);
  btnCancel.addEventListener('click', handleCancel);
}
