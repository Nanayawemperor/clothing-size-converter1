// src/js/storage.js
const RECENT_KEY = 'csc_recent_conversions';
const PREF_KEY = 'csc_user_prefs';

export function saveRecentConversion(item) {
  const arr = loadRecentConversions();
  arr.unshift(item);
  const trimmed = arr.slice(0, 5);
  localStorage.setItem(RECENT_KEY, JSON.stringify(trimmed));
}

export function loadRecentConversions() {
  const raw = localStorage.getItem(RECENT_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function renderRecent(listEl, arr) {
  if (!listEl) return;
  if (!arr || arr.length === 0) {
    listEl.innerHTML = '<li>No recent conversions</li>';
    return;
  }
  listEl.innerHTML = arr.map(a => `<li>${new Date(a.date).toLocaleString()}: ${a.category} / ${a.gender} / ${a.region} / ${a.size}</li>`).join('');
}

export function savePrefs(prefs) {
  localStorage.setItem(PREF_KEY, JSON.stringify(prefs));
}

export function loadPrefs() {
  const raw = localStorage.getItem(PREF_KEY);
  return raw ? JSON.parse(raw) : null;
}
