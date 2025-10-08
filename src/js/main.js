// src/js/main.js
import { initializeConverter } from './events.js';

// initialize converter on converter.html (safe to call from index as well)
document.addEventListener('DOMContentLoaded', () => {
  initializeConverter();
});
