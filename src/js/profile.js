// src/js/profile.js
import { savePrefs, loadPrefs, loadRecentConversions, renderRecent } from './storage.js';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('profile-form');
  const recentList = document.getElementById('recent-list');

  const prefs = loadPrefs();
  if (prefs) {
    if (prefs.defaultGender) document.getElementById('default-gender').value = prefs.defaultGender;
    if (prefs.defaultRegion) document.getElementById('default-region').value = prefs.defaultRegion;
  }

  renderRecent(recentList, loadRecentConversions());

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const newPrefs = {
      defaultGender: document.getElementById('default-gender').value,
      defaultRegion: document.getElementById('default-region').value
    };
    savePrefs(newPrefs);
    alert('Preferences saved!');
  });

  document.getElementById('clear-preferences')?.addEventListener('click', () => {
    savePrefs({ defaultGender: '', defaultRegion: '' });
    document.getElementById('default-gender').value = '';
    document.getElementById('default-region').value = '';
    alert('Preferences cleared');
  });
});
