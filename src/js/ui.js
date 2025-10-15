// src/js/ui.js

export function renderResults(results = []) {
  const tableBody = document.querySelector('#results-table tbody');
  tableBody.innerHTML = ''; // Clear previous

  if (!Array.isArray(results) || !results.length) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="4" data-i18n="no_results">No results found. Try again.</td>
      </tr>`;
    return;
  }

  results.forEach((item) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.region}</td>
      <td>${item.label}</td>
      <td>${item.measurement}</td>
      <td>${item.notes}</td>
    `;
    tableBody.appendChild(row);
  });
}

export function clearResults() {
  const tableBody = document.querySelector('#results-table tbody');
  tableBody.innerHTML = `
    <tr><td colspan="4" data-i18n="convert_btn">Enter values and click Convert</td></tr>`;
}

export function renderRecentConversions(conversions) {
  const container = document.getElementById('recent-list');
  if (!container) return;

  container.innerHTML = conversions.length
    ? conversions
        .map(
          (c) => `<li>${c.category} — ${c.gender} — ${c.region} — ${c.size}</li>`
        )
        .join('')
    : '<li>No recent conversions</li>';
}

export function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

export function renderRecent(recentConversions = []) {
  const recentContainer = document.querySelector('.recent-conversions');
  if (!recentContainer) return;

  if (recentConversions.length === 0) {
    recentContainer.innerHTML = '<p>No recent conversions yet.</p>';
    return;
  }

  recentContainer.innerHTML = recentConversions.map(conv => `
    <div class="recent-item">
      <p><strong>${conv.category}</strong> — ${conv.inputSize} (${conv.sourceRegion}) → ${conv.convertedSize} (${conv.targetRegion})</p>
      <p><em>${conv.measurement || ''}</em></p>
      <small>${conv.notes || ''}</small>
    </div>
  `).join('');
}


