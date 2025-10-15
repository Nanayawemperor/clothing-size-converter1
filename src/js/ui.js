export function renderResults(results) {
  const tbody = document.querySelector('#results-table tbody');
  tbody.innerHTML = '';

  if (results.error) {
    tbody.innerHTML = `<tr><td colspan="4">${results.error}</td></tr>`;
    return;
  }

  for (const [region, label] of Object.entries(results)) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${region}</td>
      <td>${label}</td>
      <td>—</td>
      <td>Equivalent size</td>
    `;
    tbody.appendChild(row);
  }
}

export function renderRecentConversions(conversions) {
  console.log('Recent conversions:', conversions);
}

export function showToast(message, type = 'info') {
  alert(message);
}
