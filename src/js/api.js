// src/js/api.js
export async function fetchSizeData() {
  try {
    const res = await fetch('/data/sizes.json');
    if (!res.ok) throw new Error('Failed to load size data');
    return await res.json();
  } catch (err) {
    console.error('fetchSizeData error', err);
    return [];
  }
}

/**
 * Find equivalents by:
 * 1) locating the entry matching category/gender/region/size_label
 * 2) returning the base entry plus conversion_map mapped to measurement values (if available)
 */
export function findSizeEquivalents(data, category, gender, region, sizeLabel) {
  if (!data || !data.length) return { error: 'No data loaded' };

  const base = data.find(
    (d) =>
      d.category.toLowerCase() === category.toLowerCase() &&
      d.gender.toLowerCase() === gender.toLowerCase() &&
      d.region.toLowerCase() === region.toLowerCase() &&
      String(d.size_label).toLowerCase() === String(sizeLabel).toLowerCase()
  );

  if (!base) return { error: `No match found for ${category} / ${gender} / ${region} / ${sizeLabel}` };

  // Build full result list: the base + mapped conversions
  const results = [{ region: base.region, size_label: base.size_label, measurement_cm: base.measurement_cm, measurement_in: base.measurement_in, notes: base.notes }];

  for (const [targetRegion, targetLabel] of Object.entries(base.conversion_map || {})) {
    // try to find a matching entry in data for the target region
    const match = data.find(
      (d) =>
        d.category.toLowerCase() === category.toLowerCase() &&
        d.gender.toLowerCase() === gender.toLowerCase() &&
        d.region.toLowerCase() === targetRegion.toLowerCase() &&
        String(d.size_label).toLowerCase() === String(targetLabel).toLowerCase()
    );

    if (match) {
      results.push({ region: match.region, size_label: match.size_label, measurement_cm: match.measurement_cm, measurement_in: match.measurement_in, notes: match.notes });
    } else {
      // include the conversion_map entry even if measurement not found
      results.push({ region: targetRegion, size_label: targetLabel, measurement_cm: {}, measurement_in: {}, notes: 'Conversion (no measurement data available)' });
    }
  }

  return results;
}
