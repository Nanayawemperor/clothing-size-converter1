// src/js/ui.js

// Render conversion results table
export function renderResults(results) {
  const table = document.getElementById('results-table');
  if (!table) return;

  if (results.error) {
    table.innerHTML = `<tr><td colspan="4">${results.error}</td></tr>`;
    return;
  }

  table.innerHTML = `
    <tr>
      <th>Region</th>
      <th>Label</th>
      <th>Measurement (cm/in)</th>
      <th>Notes</th>
    </tr>
    ${results
      .map(
        (r) => `
      <tr>
        <td>${r.region}</td>
        <td>${r.size_label}</td>
        <td>${r.measurement_cm.chest || r.measurement_cm.length} cm / ${
          r.measurement_in.chest || r.measurement_in.length
        } in</td>
        <td>${r.notes}</td>
      </tr>`
      )
      .join('')}
  `;
}

// Render recent conversions (for both converter + profile pages)
export function renderRecentConversions(conversions) {
  const container = document.getElementById('recent-list');
  if (!container) return;

  container.innerHTML = conversions.length
    ? conversions
        .map(
          (c) =>
            `<li>${c.category} — ${c.gender} — ${c.region} — ${c.size}</li>`
        )
        .join('')
    : '<li>No recent conversions</li>';
}

// Short alias for profile page (optional)
export const renderRecent = renderRecentConversions;

// Toast notification system
export function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;

  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
