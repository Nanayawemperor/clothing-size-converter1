export function saveConversion(conversion) {
  const history = getRecentConversions();
  history.unshift(conversion);
  localStorage.setItem('recentConversions', JSON.stringify(history.slice(0, 5)));
}

export function getRecentConversions() {
  return JSON.parse(localStorage.getItem('recentConversions')) || [];
}
