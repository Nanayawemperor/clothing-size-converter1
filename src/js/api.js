
export async function fetchSizeData() {
  try {
    const response = await fetch('/data/sizes.json');
    if (!response.ok) throw new Error('Failed to load size data');
    return await response.json();
  } catch (err) {
    console.error('Error fetching size data:', err);
    return null;
  }
}

export function findSizeEquivalents(data, category, gender, region, size) {
  if (!data || !data[category] || !data[category][gender]) {
    return { error: 'Size data not available. Please try again later.' };
  }

  const regionSizes = data[category][gender][region];
  if (!regionSizes) return { error: 'Region not found.' };

  const index = regionSizes.indexOf(size);
  if (index === -1) {
    return { error: `Size "${size}" not found in ${region} for ${gender}.` };
  }

  const equivalents = {};
  for (const [key, values] of Object.entries(data[category][gender])) {
    equivalents[key] = values[index] || '—';
  }
  return equivalents;
}
