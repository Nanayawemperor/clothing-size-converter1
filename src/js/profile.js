// src/js/profile.js
import { savePrefs, loadPrefs, loadRecentConversions } from './storage.js';
import { renderRecent } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const prefs = loadPrefs();
  const recent = loadRecentConversions();

  renderRecent(recent);

  const form = document.getElementById('prefs-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const language = document.getElementById('language').value;
      const theme = document.getElementById('theme').value;
      savePrefs({ language, theme });

      alert('Preferences saved successfully!');
    });
  }
});
