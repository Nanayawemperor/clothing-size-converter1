// src/js/animations.js
document.addEventListener('DOMContentLoaded', () => {
  const heroText = document.querySelector('.hero-text');
  if (heroText) {
    heroText.style.opacity = 0;
    heroText.style.transition = 'opacity 900ms ease';
    setTimeout(() => (heroText.style.opacity = '1'), 300);
  }
});
