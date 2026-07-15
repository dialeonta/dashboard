// --- NUEVA AUDITORÍA VIEW LOGIC ---

// Dynamic campaign selection population
function populateCampaignSelect() {
  const select = document.getElementById('meta-campana');
  if (!select) return;

  select.innerHTML = '<option value="" disabled selected>Select campaign...</option>';
  const campaigns = Object.keys(advisorsMap).sort();
  campaigns.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    select.appendChild(opt);
  });
}

// Campaign select change handler
function handleCampaignChange() {
  const campaign = document.getElementById('meta-campana').value;
  const selectAsesor = document.getElementById('meta-asesor');
  if (!selectAsesor) return;

  selectAsesor.innerHTML = '<option value="" disabled selected>Select advisor...</option>';
  const advisors = advisorsMap[campaign] || [];
  advisors.forEach(a => {
    const opt = document.createElement('option');
    opt.value = a;
    opt.textContent = a;
    selectAsesor.appendChild(opt);
  });
}

// Advisor select change handler
function handleAdvisorChange() {
  const name = document.getElementById('meta-asesor').value;
  const supervisor = getSupervisorForAdvisor(name);
  const supInput = document.getElementById('meta-supervisor');
  if (supInput) {
    supInput.value = supervisor;
  }
}

// Dynamic form generator for parameters matrix
function buildFormMatrix() {
  const accordion = document.getElementById('critical-accordion');
  const skillsList = document.getElementById('skills-list');
  const statsList = document.getElementById('stats-list');

  if (!accordion || !skillsList || !statsList) return;

  accordion.innerHTML = '';
  skillsList.innerHTML = '';
  statsList.innerHTML = '';

  let idxCriticos = 1;

  qualityMatrix.forEach((item, index) => {
    // 1. Critical parameters (accordion UI)
    if (item.tipo === 'critico') {
      const isMaltrato = item.item === 'MALTRATO AL CLIENTE';
      
      const itemHTML = `
        <div class="acc-item" id="acc-item-${index}">
          <div class="acc-header" onclick="toggleAccordion(${index})">
            <div class="acc-header-info">
              <i data-lucide="chevron-down" class="acc-chevron"></i>
              <span class="acc-item-title">${idxCriticos}. ${item.item}</span>
              <span class="acc-item-crit crit-${item.criterio.toLowerCase()}">${item.criterio}</span>
            </div>
            <div class="acc-header-action" onclick="event.stopPropagation()">
              <div class="eval-options">
                <input type="radio" id="rad-cumple-${index}" name="eval-${index}" value="CUMPLE" ${isMaltrato ? '' : 'checked'} class="eval-radio-input" onchange="handleCriticalChange(${index})">
                <label for="rad-cumple-${index}" class="eval-radio-label opt-cumple">${isMaltrato ? 'NO' : 'CUMPLE'}</label>
                
                <input type="radio" id="rad-nocumple-${index}" name="eval-${index}" value="NO_CUMPLE" ${isMaltrato ? 'checked' : ''} class="eval-radio-input" onchange="handleCriticalChange(${index})">
                <label for="rad-nocumple-${index}" class="eval-radio-label opt-nocumple">${isMaltrato ? 'YES' : 'NO CUMPLE'}</label>

                <input type="radio" id="rad-na-${index}" name="eval-${index}" value="N_A" class="eval-radio-input" onchange="handleCriticalChange(${index})">
                <label for="rad-na-${index}" class="eval-radio-label opt-na">N/A</label>
              </div>
            </div>
          </div>
          <div class="acc-content" id="acc-content-${index}">
            <div class="acc-content-inner">
              <div class="subitems-list">
                ${item.subitems.map((sub, sIdx) => `
                  <div class="subitem-row">
                    <div class="subitem-check-wrapper">
                      <input type="checkbox" id="check-${index}-${sIdx}" class="custom-checkbox" onchange="calculateLiveScores()" disabled>
                      <label for="check-${index}-${sIdx}" class="subitem-label">${sub}</label>
                    </div>
                    <div class="input-wrapper">
                      <i data-lucide="message-square" class="input-icon"></i>
                      <input type="text" id="obs-${index}-${sIdx}" placeholder="Specific observation for this issue..." disabled>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      `;
      accordion.insertAdjacentHTML('beforeend', itemHTML);
      idxCriticos++;
    }
    // 2. Soft skills parameters (compliance switch)
    else if (item.tipo === 'blanda') {
      const itemHTML = `
        <div class="skill-slider-group" style="padding: 12px; border-bottom: 1px solid var(--card-border); background: rgba(255,255,255,0.01); border-radius: 8px; margin-bottom: 8px; display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center; width: 100%;">
            <div class="skill-info">
              <span class="skill-name" style="font-weight: 600; font-size: 0.95rem;">${item.item}</span>
              <span class="skill-weight-badge">Weight: ${item.peso} pp</span>
            </div>
            <div class="skill-options-row">
              <span class="skill-status-text" id="skill-status-${index}" style="font-size: 0.85rem; font-weight: 600; color: var(--color-green); transition: color 0.3s ease; margin-right: 12px;">YES</span>
              <div class="eval-options">
                <input type="radio" id="skill-si-${index}" name="skill-${index}" value="SI" checked class="eval-radio-input" onchange="handleSoftSkillChange(${index})">
                <label for="skill-si-${index}" class="eval-radio-label opt-cumple">YES</label>
                
                <input type="radio" id="skill-no-${index}" name="skill-${index}" value="NO" class="eval-radio-input" onchange="handleSoftSkillChange(${index})">
                <label for="skill-no-${index}" class="eval-radio-label opt-nocumple">NO</label>
              </div>
            </div>
          </div>
          <div id="soft-obs-container-${index}" class="hidden" style="width: 100%; margin-top: 4px;">
            <div class="input-wrapper">
              <i data-lucide="message-square" class="input-icon"></i>
              <input type="text" id="soft-obs-${index}" placeholder="Justify the non-compliance for this parameter..." style="width: 100%; font-size: 0.85rem; padding-left: 36px; height: 34px;">
            </div>
          </div>
        </div>
      `;
      skillsList.insertAdjacentHTML('beforeend', itemHTML);
    }
    // 3. Statistical fields
    else if (item.tipo === 'estadistico') {
      let inputField = '';
      if (item.item === 'Ocupación de canal') {
        inputField = `
          <div class="input-wrapper">
            <i data-lucide="percent" class="input-icon"></i>
            <select id="stat-${index}">
              <option value="Sí">Sí</option>
              <option value="No">No</option>
              <option value="N/A" selected>N/A</option>
            </select>
          </div>
        `;
      } else if (item.item === 'PQR procedentes para el cliente') {
        inputField = `
          <div class="input-wrapper">
            <i data-lucide="help-circle" class="input-icon"></i>
            <select id="stat-${index}">
              <option value="No Aplica" selected>No Aplica</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
        `;
      } else {
        inputField = `
          <div class="input-wrapper">
            <i data-lucide="file-text" class="input-icon"></i>
            <input type="text" id="stat-${index}" placeholder="Value">
          </div>
        `;
      }

      const itemHTML = `
        <div class="stat-input-group">
          <label for="stat-${index}">${item.item}</label>
          ${inputField}
        </div>
      `;
      statsList.insertAdjacentHTML('beforeend', itemHTML);
    }
  });

  // Rebuild Lucide icons inside dynamic form
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // Force first setup reset
  qualityMatrix.forEach((item, index) => {
    if (item.tipo === 'critico') {
      const isMaltrato = item.item === 'MALTRATO AL CLIENTE';
      document.getElementById(`rad-cumple-${index}`).checked = !isMaltrato;
      document.getElementById(`rad-nocumple-${index}`).checked = isMaltrato;
      document.getElementById(`rad-na-${index}`).checked = false;
      handleCriticalChange(index);
    }
  });

  calculateLiveScores();
}

// Accordion expansion logic
function toggleAccordion(index) {
  const itemEl = document.getElementById(`acc-item-${index}`);
  if (!itemEl) return;
  const isExpanded = itemEl.classList.contains('expanded');

  // Collapse all accordion elements
  document.querySelectorAll('.acc-item').forEach(el => {
    el.classList.remove('expanded');
  });

  if (!isExpanded) {
    itemEl.classList.add('expanded');
  }
}

// Critical parameters radio button change handler
function handleCriticalChange(index) {
  const item = qualityMatrix[index];
  if (!item) return;

  const isFalla = document.getElementById(`rad-nocumple-${index}`).checked;
  const isNA = document.getElementById(`rad-na-${index}`).checked;
  const itemEl = document.getElementById(`acc-item-${index}`);

  item.subitems.forEach((_, sIdx) => {
    const checkbox = document.getElementById(`check-${index}-${sIdx}`);
    const obsText = document.getElementById(`obs-${index}-${sIdx}`);

    if (isFalla) {
      if (checkbox) checkbox.disabled = false;
      if (obsText) obsText.disabled = false;
    } else {
      if (checkbox) {
        checkbox.checked = false;
        checkbox.disabled = true;
      }
      if (obsText) {
        obsText.value = '';
        obsText.disabled = true;
      }
    }
  });

  if (isFalla) {
    if (itemEl) {
      itemEl.classList.add('failed');
      itemEl.classList.remove('not-applicable');
    }
    toggleAccordion(index);
  } else if (isNA) {
    if (itemEl) {
      itemEl.classList.remove('failed');
      itemEl.classList.add('not-applicable');
      itemEl.classList.remove('expanded');
    }
  } else {
    if (itemEl) {
      itemEl.classList.remove('failed');
      itemEl.classList.remove('not-applicable');
    }
  }

  calculateLiveScores();
}

// Soft skill radio button compliance switcher
function handleSoftSkillChange(index) {
  const isSi = document.getElementById(`skill-si-${index}`).checked;
  const statusText = document.getElementById(`skill-status-${index}`);
  const obsContainer = document.getElementById(`soft-obs-container-${index}`);
  const obsInput = document.getElementById(`soft-obs-${index}`);
  
  if (isSi) {
    if (statusText) {
      statusText.textContent = 'YES';
      statusText.style.color = 'var(--color-green)';
    }
    if (obsContainer) obsContainer.classList.add('hidden');
    if (obsInput) {
      obsInput.value = '';
      obsInput.required = false;
    }
  } else {
    if (statusText) {
      statusText.textContent = 'NO';
      statusText.style.color = 'var(--color-rose)';
    }
    if (obsContainer) obsContainer.classList.remove('hidden');
    if (obsInput) {
      obsInput.required = true;
    }
  }
  
  calculateLiveScores();
}

// Live calculation parameters score
function calculateLiveScores() {
  let ecufFail = false;
  let ecnFail = false;
  let eccFail = false;

  let softSkillsSum = 100;
  let softSkillsMax = 100;

  qualityMatrix.forEach((item, index) => {
    if (item.tipo === 'critico') {
      const isNoCumple = document.getElementById(`rad-nocumple-${index}`).checked;
      if (isNoCumple) {
        if (item.criterio === 'ECUF') ecufFail = true;
        if (item.criterio === 'ECN') ecnFail = true;
        if (item.criterio === 'ECC') eccFail = true;
      }
    } else if (item.tipo === 'blanda') {
      const isNo = document.getElementById(`skill-no-${index}`).checked;
      if (isNo) {
        softSkillsSum -= item.peso;
      }
    }
  });

  if (softSkillsSum < 0) softSkillsSum = 0;

  // Critical error drops the criteria score to 0%
  const ecufScore = ecufFail ? 0 : 100;
  const ecnScore = ecnFail ? 0 : 100;
  const eccScore = eccFail ? 0 : 100;
  const softSkillsScore = softSkillsSum;

  // Global weighted score: ECUF(30%) + ECN(20%) + ECC(20%) + Soft Skills(30%)
  const globalScore = (ecufScore * 0.3) + (ecnScore * 0.2) + (eccScore * 0.2) + (softSkillsScore * 0.3);

  // Update Score Card GUI elements
  const scoreBanner = document.getElementById('live-global-score');
  if (scoreBanner) {
    scoreBanner.textContent = `${globalScore.toFixed(1)}%`;
  }
  
  const liveBadge = document.querySelector('.live-score-badge');
  if (liveBadge) {
    if (globalScore >= 85) {
      liveBadge.style.background = 'linear-gradient(135deg, var(--color-green), var(--color-cyan))';
    } else if (globalScore >= 70) {
      liveBadge.style.background = 'linear-gradient(135deg, var(--color-yellow), var(--color-indigo))';
    } else {
      liveBadge.style.background = 'linear-gradient(135deg, var(--color-rose), var(--color-purple))';
    }
  }

  const softScoreHeader = document.getElementById('score-habilidades');
  if (softScoreHeader) {
    softScoreHeader.textContent = `${softSkillsSum} / ${softSkillsMax} pts`;
  }

  return {
    ecufScore,
    ecnScore,
    eccScore,
    softSkillsScore,
    globalScore: parseFloat(globalScore.toFixed(2))
  };
}

// Form save event handler
async function saveAudit(event) {
  event.preventDefault();

  const scores = calculateLiveScores();

  // Gather metadata inputs
  const meta = {
    asesor: document.getElementById('meta-asesor').value,
    campana: document.getElementById('meta-campana').value,
    supervisor: document.getElementById('meta-supervisor').value,
    auditor: document.getElementById('meta-auditor').value.trim(),
    celular: document.getElementById('meta-celular').value.trim(),
    fechaLlamada: document.getElementById('meta-fecha-llamada').value,
    fecha: document.getElementById('meta-fecha').value
  };

  if (!meta.asesor || !meta.campana || !meta.supervisor || !meta.auditor || !meta.celular || !meta.fechaLlamada) {
    alert('Please fill out all mandatory fields in the header.');
    return;
  }

  // Gather details parameter values
  const details = [];
  qualityMatrix.forEach((item, index) => {
    if (item.tipo === 'critico') {
      let result = 'CUMPLE';
      if (document.getElementById(`rad-nocumple-${index}`).checked) {
        result = 'NO_CUMPLE';
      } else if (document.getElementById(`rad-na-${index}`).checked) {
        result = 'N_A';
      }
      const fallas = [];

      if (result === 'NO_CUMPLE') {
        item.subitems.forEach((sub, sIdx) => {
          const isChecked = document.getElementById(`check-${index}-${sIdx}`).checked;
          const obsVal = document.getElementById(`obs-${index}-${sIdx}`).value.trim();
          if (isChecked || obsVal) {
            fallas.push({
              subitem: sub,
              fallo: isChecked,
              observacion: obsVal
            });
          }
        });
      }

      details.push({
        item: item.item,
        tipo: item.tipo,
        criterio: item.criterio,
        resultado: result,
        fallas
      });
    } else if (item.tipo === 'blanda') {
      const isSi = document.getElementById(`skill-si-${index}`).checked;
      const obsInput = document.getElementById(`soft-obs-${index}`);
      details.push({
        item: item.item,
        tipo: item.tipo,
        peso_max: item.peso,
        resultado: isSi ? 'SI' : 'NO',
        puntaje: isSi ? item.peso : 0,
        observacion: !isSi && obsInput ? obsInput.value.trim() : ''
      });
    } else if (item.tipo === 'estadistico') {
      const input = document.getElementById(`stat-${index}`);
      details.push({
        item: item.item,
        tipo: item.tipo,
        valor: input ? input.value : ''
      });
    }
  });

  const fullAudit = {
    ...meta,
    observacionesGenerales: document.getElementById('meta-observaciones').value.trim(),
    ...scores,
    detalles: details
  };

  if (isStaticMode) {
    // Static offline localStorage mode
    const savedLocalAudit = {
      ...fullAudit,
      id: `local_eval_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      createdAt: new Date().toISOString()
    };
    evaluations.unshift(savedLocalAudit);
    safeStorage.setItem('evaluations', JSON.stringify(evaluations));
    alert('Quality audit saved successfully in browser memory!');
    resetForm();
    switchView('history');
  } else {
    // API backend server mode
    try {
      const response = await fetch('/api/evaluations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullAudit)
      });
      const data = await response.json();
      if (data.success) {
        alert('Quality audit saved successfully on Express server!');
        resetForm();
        switchView('history');
      } else {
        alert(`Error saving on server: ${data.error}`);
      }
    } catch (error) {
      console.error('Error submitting audit to API. Falling back to local storage...', error);
      const savedLocalAudit = {
        ...fullAudit,
        id: `local_eval_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        createdAt: new Date().toISOString()
      };
      evaluations.unshift(savedLocalAudit);
      safeStorage.setItem('evaluations', JSON.stringify(evaluations));
      alert('Express Server Error! The audit was successfully saved in browser memory.');
      resetForm();
      switchView('history');
    }
  }
}

// Reset Nueva Auditoría form inputs
function resetForm() {
  const campanaSelect = document.getElementById('meta-campana');
  const asesorSelect = document.getElementById('meta-asesor');
  const supervisorInput = document.getElementById('meta-supervisor');
  const auditorInput = document.getElementById('meta-auditor');
  const celularInput = document.getElementById('meta-celular');
  const fechaLlamadaInput = document.getElementById('meta-fecha-llamada');
  const fechaInput = document.getElementById('meta-fecha');
  const observacionesTextArea = document.getElementById('meta-observaciones');

  if (campanaSelect) campanaSelect.value = '';
  if (asesorSelect) asesorSelect.innerHTML = '<option value="" disabled selected>Select campaign first</option>';
  if (supervisorInput) supervisorInput.value = '';
  if (auditorInput) auditorInput.value = safeStorage.getItem('quality_auditor_name') || '';
  if (celularInput) celularInput.value = '';
  if (fechaLlamadaInput) fechaLlamadaInput.value = '';
  if (fechaInput) fechaInput.valueAsDate = new Date();
  if (observacionesTextArea) observacionesTextArea.value = '';
  
  buildFormMatrix();
}
