const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY;
const BASE_URL = 'https://translation.googleapis.com/language/translate/v2';
const cache = new Map();

export function detectLanguage() {
  const lang = navigator.language?.slice(0, 2) || 'en';
  return ['en', 'fr', 'es', 'de', 'zh'].includes(lang) ? lang : 'en';
}

export async function translateText(text, targetLang = 'en') {
  if (!text || targetLang === 'en') return text;

  const key = `${text}-${targetLang}`;
  if (cache.has(key)) return cache.get(key);

  try {
    const res = await fetch(`${BASE_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ q: text, target: targetLang }),
    });

    const data = await res.json();
    const translated = data?.data?.translations?.[0]?.translatedText || text;
    cache.set(key, translated);
    return translated;
  } catch (err) {
    console.error('Translation error:', err);
    return text;
  }
}

export async function translateUI(targetLang = 'en') {
  const elements = document.querySelectorAll('[data-i18n]');
  for (const el of elements) {
    const originalText = el.dataset.originalText || el.textContent.trim();
    if (!el.dataset.originalText) el.dataset.originalText = originalText;

    const translated = await translateText(originalText, targetLang);
    el.textContent = translated;
  }
}
