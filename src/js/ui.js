// src/js/ui.js
export function renderResults(results) {
  const tbody = document.querySelector('#results-table tbody') || createResultsBody();
  if (!results) {
    tbody.innerHTML = `<tr><td colspan="4">No results</td></tr>`;
    return;
  }

  if (results.error) {
    tbody.innerHTML = `<tr><td colspan="4" style="color:#d9534f;">${results.error}</td></tr>`;
    return;
  }

  tbody.innerHTML = results
    .map((r) => {
      const measurement = r.measurement_cm?.chest || r.measurement_cm?.length || '-';
      const measurementIn = r.measurement_in?.chest || r.measurement_in?.length || '-';
      return `<tr>
        <td>${r.region}</td>
        <td>${r.size_label}</td>
        <td>${measurement} cm / ${measurementIn} in</td>
        <td>${r.notes || ''}</td>
      </tr>`;
    })
    .join('');
}

function createResultsBody() {
  const table = document.getElementById('results-table');
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  return tbody;
}
