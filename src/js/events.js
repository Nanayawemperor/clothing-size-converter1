// src/js/events.js
import { fetchSizeData, findSizeEquivalents } from './api.js';
import { renderResults } from './ui.js';
import { saveRecentConversion, loadRecentConversions, renderRecent } from './storage.js';

let SIZE_DATA = [];

export async function initializeConverter() {
  const loader = document.getElementById('loader');
  loader?.classList.remove('hidden');
  SIZE_DATA = await fetchSizeData();
  loader?.classList.add('hidden');

  // render any recent conversions
  const recent = loadRecentConversions();
  renderRecent(document.getElementById('recent-list'), recent);

  const form = document.getElementById('convert-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const category = document.getElementById('category').value;
    const gender = document.getElementById('gender').value;
    const region = document.getElementById('region-source').value;
    const size = document.getElementById('size-input').value.trim();

    const results = findSizeEquivalents(SIZE_DATA, category, gender, region, size);
    renderResults(results);
    if (!results.error) {
      saveRecentConversion({ category, gender, region, size, date: new Date().toISOString() });
      renderRecent(document.getElementById('recent-list'), loadRecentConversions());
    }
  });

  const clearBtn = document.getElementById('clear-results');
  clearBtn?.addEventListener('click', () => {
    const tbody = document.querySelector('#results-table tbody');
    if (tbody) tbody.innerHTML = `<tr><td colspan="4">Enter values and click Convert</td></tr>`;
  });
}
