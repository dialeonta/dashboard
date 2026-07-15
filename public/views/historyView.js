// --- HISTÓRICO VIEW LOGIC ---

// Populate campaign filter options in history view
function populateFilterCampaignSelect() {
  const select = document.getElementById('filter-campana');
  if (!select) return;

  select.innerHTML = '<option value="">All campaigns</option>';
  const campaigns = Object.keys(advisorsMap).sort();
  campaigns.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    select.appendChild(opt);
  });
}

// Render the historical audits table grid
function renderHistoryTable() {
  const tableBody = document.getElementById('history-table-body');
  const emptyState = document.getElementById('history-empty-state');
  if (!tableBody || !emptyState) return;

  tableBody.innerHTML = '';
  const filtered = getFilteredEvaluations();

  if (filtered.length === 0) {
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');

  filtered.forEach(audit => {
    const supervisor = audit.supervisor || getSupervisorForAdvisor(audit.asesor) || 'Unassigned';
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${formatDate(audit.fecha)}</td>
      <td><strong>${toTitleCase(supervisor)}</strong></td>
      <td>${toTitleCase(audit.campana)}</td>
      <td>${toTitleCase(audit.auditor)}</td>
      <td><span class="score-badge-table ${audit.ecufScore === 100 ? 'score-green' : 'score-red'}">${audit.ecufScore}%</span></td>
      <td><span class="score-badge-table ${audit.ecnScore === 100 ? 'score-green' : 'score-red'}">${audit.ecnScore}%</span></td>
      <td><span class="score-badge-table ${audit.eccScore === 100 ? 'score-green' : 'score-red'}">${audit.eccScore}%</span></td>
      <td><span class="score-badge-table score-neutral">${audit.softSkillsScore.toFixed(0)}%</span></td>
      <td style="text-align: center; display: flex; justify-content: center; gap: 10px;">
        <button class="action-btn-detail" onclick="viewAuditDetails('${audit.id}')" title="View details">
          <i data-lucide="eye"></i>
        </button>
      </td>
    `;
    tableBody.appendChild(tr);
  });

  // Re-generate Lucide icons for new table rows
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Fetch list of evaluations filtered by search text, campaign, and date ranges
function getFilteredEvaluations() {
  const searchInput = document.getElementById('filter-search');
  const campaignSelect = document.getElementById('filter-campana');
  const startDateInput = document.getElementById('filter-fecha-inicio');
  const endDateInput = document.getElementById('filter-fecha-fin');

  const search = searchInput ? searchInput.value.toLowerCase().trim() : '';
  const campaign = campaignSelect ? campaignSelect.value : '';
  const startDate = startDateInput ? startDateInput.value : '';
  const endDate = endDateInput ? endDateInput.value : '';

  return evaluations.filter(audit => {
    const matchesSearch = !search || 
                          (audit.asesor && audit.asesor.toLowerCase().includes(search)) || 
                          (audit.auditor && audit.auditor.toLowerCase().includes(search));
    
    const matchesCampaign = !campaign || audit.campana === campaign;

    let matchesDates = true;
    if (startDate) {
      matchesDates = matchesDates && audit.fecha >= startDate;
    }
    if (endDate) {
      matchesDates = matchesDates && audit.fecha <= endDate;
    }

    return matchesSearch && matchesCampaign && matchesDates;
  });
}

// Apply filter input modifications
function applyFilters() {
  renderHistoryTable();
}

// Delete a local audit (Active only in static offline mode)
function deleteLocalAudit(id) {
  if (confirm('Are you sure you want to delete this evaluation from the browser? This action cannot be undone.')) {
    evaluations = evaluations.filter(e => e.id !== id);
    safeStorage.setItem('evaluations', JSON.stringify(evaluations));
    renderHistoryTable();
  }
}

// Display specific audit details in a popup modal
function viewAuditDetails(id) {
  const audit = evaluations.find(a => a.id === id);
  if (!audit) return;

  const subtitle = document.getElementById('modal-subtitle-text');
  const modalScore = document.getElementById('modal-score');
  
  if (subtitle) subtitle.textContent = `Evaluation ID: ${audit.id}`;
  if (modalScore) {
    modalScore.textContent = `${audit.globalScore.toFixed(1)}%`;
    modalScore.className = `modal-score-badge ${getScoreClass(audit.globalScore)}`;
  }

  // Populate metadata fields
  const elementsMap = {
    'det-asesor': toTitleCase(audit.asesor),
    'det-supervisor': toTitleCase(audit.supervisor || getSupervisorForAdvisor(audit.asesor) || 'Unassigned'),
    'det-campana': toTitleCase(audit.campana),
    'det-auditor': toTitleCase(audit.auditor),
    'det-celular': audit.celular || 'N/A',
    'det-fecha-llamada': formatDate(audit.fechaLlamada),
    'det-fecha': formatDate(audit.fecha),
    'det-score-soft': `${audit.softSkillsScore.toFixed(0)}%`
  };

  Object.entries(elementsMap).forEach(([id, text]) => {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  });

  // Highlight specific critical criteria notes
  const ecufEl = document.getElementById('det-score-ecuf');
  if (ecufEl) {
    ecufEl.textContent = `${audit.ecufScore}%`;
    ecufEl.className = `block-score ${audit.ecufScore === 100 ? 'text-green' : 'text-rose'}`;
  }
  const ecnEl = document.getElementById('det-score-ecn');
  if (ecnEl) {
    ecnEl.textContent = `${audit.ecnScore}%`;
    ecnEl.className = `block-score ${audit.ecnScore === 100 ? 'text-green' : 'text-rose'}`;
  }
  const eccEl = document.getElementById('det-score-ecc');
  if (eccEl) {
    eccEl.textContent = `${audit.eccScore}%`;
    eccEl.className = `block-score ${audit.eccScore === 100 ? 'text-green' : 'text-rose'}`;
  }

  // Render critical failures details list
  const failuresList = document.getElementById('det-failures-list');
  if (failuresList) {
    failuresList.innerHTML = '';
    const failedItems = audit.detalles ? audit.detalles.filter(d => d.tipo === 'critico' && d.resultado === 'NO_CUMPLE') : [];
    
    if (failedItems.length === 0) {
      failuresList.innerHTML = `<p class="text-green-success"><i data-lucide="check-circle-2" class="inline-icon"></i> No critical failures recorded in this evaluation.</p>`;
    } else {
      failedItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'failure-detail-card';
        card.innerHTML = `
          <div class="fail-title-row">
            <span class="fail-name">${item.item}</span>
            <span class="fail-criterio">${item.criterio}</span>
          </div>
          <div class="fail-subitems">
            <strong>Failing parameters:</strong>
            <ul style="margin-left: 20px; margin-top: 5px;">
              ${item.fallas.map(f => `
                <li style="margin-bottom: 6px;">
                  <span><strong>${f.subitem}</strong></span>
                  ${f.observacion ? `<div class="fail-obs">Obs: ${f.observacion}</div>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        `;
        failuresList.appendChild(card);
      });
    }
  }

  // Render soft skills breakdown list
  const softSkillsList = document.getElementById('det-soft-skills-list');
  if (softSkillsList) {
    softSkillsList.innerHTML = '';
    const softItems = audit.detalles ? audit.detalles.filter(d => d.tipo === 'blanda') : [];
    
    softItems.forEach(item => {
      const div = document.createElement('div');
      div.className = 'soft-detail-item';
      div.style.display = 'flex';
      div.style.flexDirection = 'column';
      div.style.width = '100%';
      div.style.padding = '8px 0';
      div.style.borderBottom = '1px dashed rgba(255,255,255,0.05)';
      
      const result = item.resultado || (item.puntaje > 0 ? 'SI' : 'NO');
      div.innerHTML = `
        <div style="display: flex; justify-content: space-between; width: 100%;">
          <span class="soft-det-name" style="font-weight: 500;">${item.item}</span>
          <span class="soft-det-val" style="color: ${result === 'SI' ? 'var(--color-green)' : 'var(--color-rose)'}; font-weight: 600;">${result} (${item.puntaje} / ${item.peso_max} pts)</span>
        </div>
        ${item.observacion ? `<div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 4px; padding-left: 8px; border-left: 2px solid var(--color-rose); font-style: italic;">Justification: ${item.observacion}</div>` : ''}
      `;
      softSkillsList.appendChild(div);
    });
  }

  // Populate statistical values
  if (audit.detalles) {
    const statOcupacion = audit.detalles.find(d => d.tipo === 'estadistico' && d.item === 'Ocupación de canal');
    const statPqr = audit.detalles.find(d => d.tipo === 'estadistico' && d.item === 'PQR procedentes para el cliente');

    const ocupacionVal = document.getElementById('det-stat-ocupacion');
    const pqrVal = document.getElementById('det-stat-pqr');
    
    if (ocupacionVal) ocupacionVal.textContent = statOcupacion && statOcupacion.valor ? statOcupacion.valor : 'N/A';
    if (pqrVal) pqrVal.textContent = statPqr && statPqr.valor ? statPqr.valor : 'N/A';
  }

  // Populate general notes text area
  const obsGeneral = document.getElementById('det-observaciones');
  if (obsGeneral) {
    obsGeneral.textContent = audit.observacionesGenerales || 'No general observations logged.';
  }

  // Show detailed modal popup
  const detailModal = document.getElementById('detail-modal');
  if (detailModal) {
    detailModal.classList.remove('hidden');
  }

  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Close the detailed evaluation modal popup
function closeModal(event) {
  const detailModal = document.getElementById('detail-modal');
  if (detailModal) {
    detailModal.classList.add('hidden');
  }
}

// Export history dataset to Excel compatible CSV file
function exportHistoryToExcel() {
  const filtered = getFilteredEvaluations();
  if (filtered.length === 0) {
    alert('No data to export.');
    return;
  }

  const csvHeaders = ['ID', 'Evaluation Date', 'Advisor', 'Campaign', 'Auditor', 'Phone', 'Call Date', 'ECUF Score (%)', 'ECN Score (%)', 'ECC Score (%)', 'Soft Skills Score (%)', 'Global Score (%)', 'General Observations', 'Critical Failures'];
  
  const csvRows = filtered.map(a => {
    const failedText = a.detalles
      ? a.detalles
        .filter(d => d.tipo === 'critico' && d.resultado === 'NO_CUMPLE')
        .map(d => `${d.item} (${d.fallas.map(f => f.subitem).join(' | ')})`)
        .join(' ; ')
      : '';

    return [
      a.id,
      a.fecha,
      `"${(a.asesor || '').replace(/"/g, '""')}"`,
      `"${(a.campana || '').replace(/"/g, '""')}"`,
      `"${(a.auditor || '').replace(/"/g, '""')}"`,
      `"${a.celular || ''}"`,
      a.fechaLlamada || '',
      a.ecufScore,
      a.ecnScore,
      a.eccScore,
      a.softSkillsScore,
      a.globalScore,
      `"${(a.observacionesGenerales || '').replace(/"/g, '""')}"`,
      `"${failedText.replace(/"/g, '""')}"`
    ];
  });

  const csvContent = [csvHeaders.join(','), ...csvRows.map(r => r.join(','))].join('\n');
  
  // Dynamic CSV download utilizing BOM prefix (\uFEFF) to make Excel parse UTF-8 characters correctly
  const dataUri = 'data:text/csv;charset=utf-8,\uFEFF' + encodeURIComponent(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', dataUri);
  link.setAttribute('download', `quality_report_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Download local JSON data backup (highly useful for offline runs)
function exportJSONBackup() {
  if (evaluations.length === 0) {
    alert('No evaluations data available to backup.');
    return;
  }
  const jsonContent = JSON.stringify(evaluations, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(jsonContent);
  const link = document.createElement('a');
  link.setAttribute('href', dataUri);
  link.setAttribute('download', `backup_evaluations_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Read and restore evaluations from uploaded backup JSON file
function importJSONBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onerror = function(err) {
    safeAlert(`Error reading backup file: ${reader.error || err}`);
  };

  reader.onload = async function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (!Array.isArray(imported)) {
        throw new Error('JSON backup file must contain an array of evaluations.');
      }
      
      if (imported.length > 0) {
        const item = imported[0];
        if (!item.asesor || !item.auditor || !item.fecha || !item.globalScore) {
          throw new Error('JSON structure does not match expected Quality Evaluation format.');
        }
      }

      if (isStaticMode) {
        // Local mode fallback merge and write to state
        evaluations = [...imported, ...evaluations];
        const uniqueMap = {};
        evaluations.forEach(ev => { uniqueMap[ev.id] = ev; });
        evaluations = Object.values(uniqueMap).sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        
        safeStorage.setItem('evaluations', JSON.stringify(evaluations));
        safeAlert(`Import complete! Loaded ${imported.length} evaluations.`);
        renderHistoryTable();
      } else {
        // Send and store items via Server REST API endpoints
        let count = 0;
        for (const ev of imported) {
          try {
            const res = await fetch('/api/evaluations', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(ev)
            });
            const resData = await res.json();
            if (resData.success) count++;
          } catch (err) {
            console.error('Error uploading imported evaluation:', ev.id, err);
          }
        }
        safeAlert(`Import complete! Saved ${count} of ${imported.length} evaluations on the server.`);
        await loadEvaluations();
        renderHistoryTable();
      }
    } catch (error) {
      safeAlert(`Error importing JSON backup file: ${error.message}`);
    }
  };
  reader.readAsText(file);
}
