// src/js/api.js
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

// Match JSON structure (with unisex)
export function findSizeEquivalents(data, category, gender, region, size) {
  if (!data || !data[category] || !data[category][gender]) {
    return { error: 'No data for this category/gender.' };
  }

  const categoryData = data[category][gender];
  const match = categoryData.find(
    (item) => item.region === region && item.label.toUpperCase() === size
  );

  if (!match) {
    return { error: `No match found for size ${size} in ${region}.` };
  }

  // Merge equivalents with region/label
  const results = [];
  results.push({ region: match.region, label: match.label, measurement: match.measurement || "-",
    notes: match.notes || "-"
   });

  for (const [r, label] of Object.entries(match.equivalents)) {
    results.push({ region: r, label, measurement: match.measurement || "-",
      notes: match.notes || "-"
     });
  }

  return results;
}
