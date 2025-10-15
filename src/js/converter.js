import { fetchSizeData, findSizeEquivalents } from './api.js';
import { getRecentConversions, saveConversion } from './storage.js';
import { renderResults, renderRecentConversions, showToast, clearResults } from './ui.js';
import { translateUI, detectLanguage } from './translator.js';

document.addEventListener('DOMContentLoaded', async () => {
  const form = document.getElementById('convert-form');
  const loader = document.getElementById('loader');
  const clearBtn = document.getElementById('clear-results');
  const langSelect = document.getElementById('language');

  // Load language and translations
  langSelect.value = detectLanguage();
  langSelect.addEventListener('change', async () => {
    const lang = langSelect.value === 'auto' ? detectLanguage() : langSelect.value;
    await translateUI(lang);
  });

  // Load size data once
  let sizeData;
  try {
    loader.classList.remove('hidden');
    sizeData = await fetchSizeData();
  } catch (error) {
    console.error('Error fetching size data:', error);
    showToast('Failed to load size data.', 'error');
  } finally {
    loader.classList.add('hidden');
  }

  // Load recent conversions
  renderRecentConversions(getRecentConversions());

  // Handle Convert
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const gender = document.getElementById('gender').value;
    const region = document.getElementById('region-source').value;
    const size = document.getElementById('size-input').value.trim().toUpperCase();

    if (!sizeData) {
      showToast('Size data not loaded. Please refresh.', 'error');
      return;
    }

    const results = findSizeEquivalents(sizeData, category, gender, region, size);

    if (results.error) {
      showToast(results.error, 'error');
      renderResults([]); // clear
      return;
    }

    renderResults(results);
    saveConversion({ category, gender, region, size });
    renderRecentConversions(getRecentConversions());
    showToast('Conversion successful!', 'success');
  });

  // Handle Clear
  clearBtn.addEventListener('click', () => {
    clearResults();
    showToast('Results cleared.', 'info');
  });
});
