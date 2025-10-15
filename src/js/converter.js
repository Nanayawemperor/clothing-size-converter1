import { fetchSizeData, findSizeEquivalents } from './api.js';
import { getRecentConversions, saveConversion } from './storage.js';
import { renderResults, renderRecentConversions, showToast } from './ui.js';
import { translateUI, detectLanguage } from './translator.js';

document.addEventListener('DOMContentLoaded', async () => {
  const data = await fetchSizeData();
  renderRecentConversions(getRecentConversions());

  // Language selector
  const langSelect = document.getElementById('language');
  langSelect.value = detectLanguage();
  langSelect.addEventListener('change', async () => {
    const lang = langSelect.value === 'auto' ? detectLanguage() : langSelect.value;
    await translateUI(lang);
  });

  const form = document.getElementById('convert-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const gender = document.getElementById('gender').value;
    const region = document.getElementById('region-source').value;
    const size = document.getElementById('size-input').value.trim();

    const results = findSizeEquivalents(data, category, gender, region, size);
    renderResults(results);

    if (!results.error) {
      saveConversion({ category, gender, region, size });
      renderRecentConversions(getRecentConversions());
      showToast('Conversion successful!', 'success');
    } else {
      showToast(results.error, 'error');
    }
  });
});
