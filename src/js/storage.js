// src/js/storage.js
const STORAGE_KEYS = {
  PREFS: 'converter_prefs',
  RECENT: 'recent_conversions',
};

// Save user preferences (e.g. language, theme)
export function savePrefs(prefs) {
  localStorage.setItem(STORAGE_KEYS.PREFS, JSON.stringify(prefs));
}

// Load user preferences
export function loadPrefs() {
  const data = localStorage.getItem(STORAGE_KEYS.PREFS);
  return data ? JSON.parse(data) : { language: 'en', theme: 'light' };
}

// Save a recent conversion
export function saveConversion(conversion) {
  const existing = getRecentConversions();
  existing.unshift(conversion);
  localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(existing.slice(0, 5)));
}

// Load recent conversions
export function getRecentConversions() {
  const data = localStorage.getItem(STORAGE_KEYS.RECENT);
  return data ? JSON.parse(data) : [];
}

// For profile page (list recent conversions)
export function loadRecentConversions() {
  return getRecentConversions();
}
