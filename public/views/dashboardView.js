// --- DASHBOARD VIEW LOGIC ---

// Fetch evaluations filtered by dashboard selections
function getFilteredDashboardEvaluations() {
  const campSelect = document.getElementById('dash-filter-campana');
  const supervSelect = document.getElementById('dash-filter-supervisor');
  const itemSelect = document.getElementById('dash-filter-item');

  const camp = campSelect ? campSelect.value : '';
  const superv = supervSelect ? supervSelect.value : '';
  const itemFilter = itemSelect ? itemSelect.value : '';

  return evaluations.filter(audit => {
    const matchesCamp = !camp || audit.campana === camp;
    
    // Resolve supervisor for this audit record
    const auditSuperv = audit.supervisor || getSupervisorForAdvisor(audit.asesor);
    const matchesSuperv = !superv || auditSuperv === superv;
    
    const matchesItem = !itemFilter || (audit.detalles && audit.detalles.some(d => d.item === itemFilter && (d.resultado === 'NO_CUMPLE' || d.resultado === 'NO')));
    
    return matchesCamp && matchesSuperv && matchesItem;
  });
}

// Refresh dashboard layouts when filters change
function applyDashboardFilters() {
  renderDashboard();
}

// Dynamically populate dashboard filters dropdown lists
function populateDashboardFilters() {
  const compSelect = document.getElementById('dash-filter-campana');
  const superSelect = document.getElementById('dash-filter-supervisor');
  const itemSelect = document.getElementById('dash-filter-item');
  
  if (!compSelect || !superSelect || !itemSelect) return;

  // 1. Campaigns select dropdown list
  compSelect.innerHTML = '<option value="">All campaigns</option>';
  Object.keys(advisorsMap).sort().forEach(camp => {
    compSelect.insertAdjacentHTML('beforeend', `<option value="${camp}">${camp}</option>`);
  });
  
  // 2. Supervisors select dropdown list
  superSelect.innerHTML = '<option value="">All supervisors</option>';
  const supervisors = new Set();
  
  // Populate from static advisor maps
  Object.values(STATIC_ADVISOR_SUPERVISOR_MAP).forEach(s => { if(s) supervisors.add(s); });
  // Also populate from any active loaded audits
  evaluations.forEach(a => { if (a.supervisor) supervisors.add(a.supervisor); });
  
  Array.from(supervisors).sort().forEach(sup => {
    superSelect.insertAdjacentHTML('beforeend', `<option value="${sup}">${sup}</option>`);
  });
  
  // 3. Quality evaluation parameter items select
  itemSelect.innerHTML = '<option value="">All quality parameters</option>';
  const matrix = getGlobalMatrix();
  matrix.forEach(item => {
    itemSelect.insertAdjacentHTML('beforeend', `<option value="${item.item}">${item.item} (${item.tipo.toUpperCase()})</option>`);
  });
}

// Divide advisors into performance quartiles
function calculateQuartiles(advisorsList) {
  const n = advisorsList.length;
  if (n === 0) return [];
  
  // Sort advisors by performance average score descending
  advisorsList.sort((a, b) => b.avgScore - a.avgScore);
  
  return advisorsList.map((item, index) => {
    let quartile = '';
    let quartileClass = '';
    
    const percentile = index / n;
    if (percentile < 0.25) {
      quartile = 'Q1 (Excellent)';
      quartileClass = 'quartile-q1';
    } else if (percentile < 0.50) {
      quartile = 'Q2 (Satisfactory)';
      quartileClass = 'quartile-q2';
    } else if (percentile < 0.75) {
      quartile = 'Q3 (In development)';
      quartileClass = 'quartile-q3';
    } else {
      quartile = 'Q4 (Critical)';
      quartileClass = 'quartile-q4';
    }
    
    return {
      ...item,
      quartile,
      quartileClass
    };
  });
}

// Draw the charts and segmentate cards
function renderDashboard() {
  const filteredList = getFilteredDashboardEvaluations();

  const totalKPI = document.getElementById('kpi-total');
  const promedioKPI = document.getElementById('kpi-promedio');
  const ecufKPI = document.getElementById('kpi-ecuf');
  const ecnKPI = document.getElementById('kpi-ecn');
  const tableBody = document.getElementById('quartile-table-body');

  if (filteredList.length === 0) {
    if (totalKPI) totalKPI.textContent = '0';
    if (promedioKPI) promedioKPI.textContent = '0.0%';
    if (ecufKPI) ecufKPI.textContent = '0.0%';
    if (ecnKPI) ecnKPI.textContent = '0.0%';
    if (tableBody) tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No data matches the selected filters.</td></tr>';
    
    // Clear existing chart instances
    if (charts.supervisor) charts.supervisor.destroy();
    if (charts.failures) charts.failures.destroy();
    if (charts.campaignErrors) charts.campaignErrors.destroy();
    if (charts.analystErrors) charts.analystErrors.destroy();
    if (charts.softSkills) charts.softSkills.destroy();
    return;
  }

  const total = filteredList.length;
  const avgGlobal = filteredList.reduce((acc, a) => acc + a.globalScore, 0) / total;
  const compliantEcuf = filteredList.filter(a => a.ecufScore === 100).length;
  const compliantEcn = filteredList.filter(a => a.ecnScore === 100).length;

  if (totalKPI) totalKPI.textContent = total;
  if (promedioKPI) {
    promedioKPI.textContent = `${avgGlobal.toFixed(1)}%`;
    promedioKPI.className = `kpi-value ${getScoreClass(avgGlobal).replace('score-', 'text-')}`;
  }
  if (ecufKPI) {
    ecufKPI.textContent = `${((compliantEcuf / total) * 100).toFixed(1)}%`;
    ecufKPI.className = `kpi-value ${getScoreClass(compliantEcuf/total*100).replace('score-', 'text-')}`;
  }
  if (ecnKPI) {
    ecnKPI.textContent = `${((compliantEcn / total) * 100).toFixed(1)}%`;
    ecnKPI.className = `kpi-value ${getScoreClass(compliantEcn/total*100).replace('score-', 'text-')}`;
  }

  // Draw the 5 main Chart.js elements
  buildSupervisorChart(filteredList);
  buildFailuresChart(filteredList);
  buildCampaignErrorsChart(filteredList);
  buildAnalystErrorsChart(filteredList);
  buildSoftSkillsChart(filteredList);

  // Group performance stats by advisor
  const advisorStats = {};
  filteredList.forEach(audit => {
    if (!advisorStats[audit.asesor]) {
      advisorStats[audit.asesor] = {
        name: audit.asesor,
        campana: audit.campana,
        supervisor: audit.supervisor || getSupervisorForAdvisor(audit.asesor) || 'Unassigned',
        totalAudits: 0,
        sumScore: 0
      };
    }
    advisorStats[audit.asesor].totalAudits++;
    advisorStats[audit.asesor].sumScore += audit.globalScore;
  });

  const advisors = Object.values(advisorStats).map(a => ({
    name: a.name,
    campana: a.campana,
    supervisor: a.supervisor,
    totalAudits: a.totalAudits,
    avgScore: parseFloat((a.sumScore / a.totalAudits).toFixed(1))
  }));

  const segmented = calculateQuartiles(advisors);
  
  if (tableBody) {
    tableBody.innerHTML = '';
    if (segmented.length === 0) {
      tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center;">No advisors inside selection range.</td></tr>';
    } else {
      segmented.forEach(item => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><strong>${toTitleCase(item.name)}</strong></td>
          <td>${toTitleCase(item.campana)}</td>
          <td>${toTitleCase(item.supervisor)}</td>
          <td style="text-align: center;">${item.totalAudits}</td>
          <td style="text-align: center;"><strong>${item.avgScore}%</strong></td>
          <td style="text-align: center;"><span class="quartile-badge ${item.quartileClass}">${item.quartile}</span></td>
        `;
        tableBody.appendChild(tr);
      });
    }
  }
}

// Fetch colors parameters matching theme configuration
function getThemeColors() {
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  return {
    gridColor: isLight ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)',
    textColor: isLight ? '#475569' : '#9ca3af',
    cardBorder: isLight ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'
  };
}

// Build compliance percentage bar chart by supervisor
function buildSupervisorChart(dataset = evaluations) {
  const canvas = document.getElementById('chart-supervisor');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (charts.supervisor) charts.supervisor.destroy();

  const supervData = {};
  dataset.forEach(a => {
    const supervisor = a.supervisor || getSupervisorForAdvisor(a.asesor) || 'Unassigned';
    if (!supervData[supervisor]) {
      supervData[supervisor] = { total: 0, failed: 0 };
    }
    supervData[supervisor].total++;
    const hasFail = (a.ecufScore === 0 || a.ecnScore === 0 || a.eccScore === 0);
    if (hasFail) {
      supervData[supervisor].failed++;
    }
  });

  const sortedList = Object.keys(supervData).map(name => {
    const info = supervData[name];
    const compliance = ((info.total - info.failed) / info.total) * 100;
    return { name, compliance };
  }).sort((a, b) => b.compliance - a.compliance);

  const colors = getThemeColors();

  charts.supervisor = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sortedList.map(s => toTitleCase(s.name)),
      datasets: [{
        label: 'Compliance rate %',
        data: sortedList.map(s => s.compliance.toFixed(1)),
        backgroundColor: 'rgba(99, 102, 241, 0.75)',
        borderColor: '#6366f1',
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.textColor, font: { size: 9 } } },
        y: { min: 0, max: 100, grid: { color: colors.gridColor }, ticks: { color: colors.textColor } }
      }
    }
  });
}

// Build error rate bar chart by campaign
function buildCampaignErrorsChart(dataset = evaluations) {
  const canvas = document.getElementById('chart-campaign-errors');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (charts.campaignErrors) charts.campaignErrors.destroy();

  const campaignData = {};
  dataset.forEach(a => {
    const camp = a.campana || 'Unassigned';
    if (!campaignData[camp]) {
      campaignData[camp] = { total: 0, failed: 0 };
    }
    campaignData[camp].total++;
    const hasFail = (a.ecufScore === 0 || a.ecnScore === 0 || a.eccScore === 0);
    if (hasFail) {
      campaignData[camp].failed++;
    }
  });

  const sortedList = Object.keys(campaignData).map(name => {
    const info = campaignData[name];
    const errorRate = (info.failed / info.total) * 100;
    return { name, errorRate };
  }).sort((a, b) => a.errorRate - b.errorRate);

  const colors = getThemeColors();

  charts.campaignErrors = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sortedList.map(c => toTitleCase(c.name)),
      datasets: [{
        label: 'Critical Error Rate %',
        data: sortedList.map(c => c.errorRate.toFixed(1)),
        backgroundColor: 'rgba(244, 63, 94, 0.75)',
        borderColor: '#f43f5e',
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: colors.textColor } },
        y: { min: 0, max: 100, grid: { color: colors.gridColor }, ticks: { color: colors.textColor } }
      }
    }
  });
}

// Build errors bar chart by advisor
function buildAnalystErrorsChart(dataset = evaluations) {
  const canvas = document.getElementById('chart-analyst-errors');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (charts.analystErrors) charts.analystErrors.destroy();

  const advisorErrors = {};
  dataset.forEach(a => {
    const advisorName = a.asesor || 'Unassigned';
    const failCount = a.detalles ? a.detalles.filter(d => d.tipo === 'critico' && d.resultado === 'NO_CUMPLE').length : 0;
    advisorErrors[advisorName] = (advisorErrors[advisorName] || 0) + failCount;
  });

  const sortedList = Object.keys(advisorErrors).map(name => {
    return { name, errorCount: advisorErrors[name] };
  }).sort((a, b) => b.errorCount - a.errorCount).slice(0, 6);

  const colors = getThemeColors();

  charts.analystErrors = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sortedList.map(a => {
        const t = toTitleCase(a.name);
        return t.length > 18 ? t.substring(0, 15) + '...' : t;
      }),
      datasets: [{
        label: 'Errors Committed',
        data: sortedList.map(a => a.errorCount),
        backgroundColor: 'rgba(168, 85, 247, 0.75)',
        borderColor: '#a855f7',
        borderWidth: 1,
        borderRadius: 5
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { stepSize: 1, color: colors.textColor }, grid: { color: colors.gridColor } },
        y: { grid: { display: false }, ticks: { color: colors.textColor } }
      }
    }
  });
}

// Build compliance radar chart for soft skills compliance
function buildSoftSkillsChart(dataset = evaluations) {
  const canvas = document.getElementById('chart-soft-skills');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (charts.softSkills) charts.softSkills.destroy();

  const skillScores = {};
  const skillCounts = {};

  dataset.forEach(audit => {
    if (audit.detalles) {
      audit.detalles.forEach(d => {
        if (d.tipo === 'blanda') {
          const percentage = (d.puntaje / d.peso_max) * 100;
          skillScores[d.item] = (skillScores[d.item] || 0) + percentage;
          skillCounts[d.item] = (skillCounts[d.item] || 0) + 1;
        }
      });
    }
  });

  const skills = Object.keys(skillScores);
  const dataPoints = skills.map(s => (skillScores[s] / skillCounts[s]).toFixed(1));

  const colors = getThemeColors();

  charts.softSkills = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: skills.map(toTitleCase),
      datasets: [{
        label: 'Compliance Rate %',
        data: dataPoints,
        borderColor: '#06b6d4',
        backgroundColor: 'rgba(6, 182, 212, 0.15)',
        borderWidth: 2,
        pointBackgroundColor: '#06b6d4'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        r: {
          angleLines: { color: colors.gridColor },
          grid: { color: colors.gridColor },
          pointLabels: { color: colors.textColor, font: { size: 9 } },
          ticks: { display: false },
          min: 0,
          max: 100
        }
      }
    }
  });
}

// Build compliance failure parameters count horizontal bar chart
function buildFailuresChart(dataset = evaluations) {
  const canvas = document.getElementById('chart-failures');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  if (charts.failures) charts.failures.destroy();

  const counts = {};
  dataset.forEach(audit => {
    if (audit.detalles) {
      audit.detalles.forEach(d => {
        if (d.tipo === 'critico' && d.resultado === 'NO_CUMPLE' && d.fallas) {
          d.fallas.forEach(f => {
            if (f.fallo) {
              counts[f.subitem] = (counts[f.subitem] || 0) + 1;
            }
          });
        }
      });
    }
  });

  const sorted = Object.keys(counts)
    .map(key => ({ item: key, count: counts[key] }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  const colors = getThemeColors();

  charts.failures = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: sorted.map(s => {
        const t = toTitleCase(s.item);
        return t.length > 25 ? t.substring(0, 22) + '...' : t;
      }),
      datasets: [{
        data: sorted.map(s => s.count),
        backgroundColor: 'rgba(236, 72, 153, 0.75)',
        borderRadius: 5
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        x: { ticks: { stepSize: 1, color: colors.textColor }, grid: { color: colors.gridColor } },
        y: { grid: { display: false }, ticks: { color: colors.textColor } }
      }
    }
  });
}
