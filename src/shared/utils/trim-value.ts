/**
 * Converts a numeric value into a string representation with appropriate suffixes.
 *
 * - Values of 1,000,000 or more are converted to a string with an "M" suffix,
 *   rounded to one decimal place.
 * - Values of 1,000 or more but less than 1,000,000 are converted to a string
 *   with a "K" suffix, rounded to one decimal place.
 * - Values less than 1,000 are converted to a string without any suffix.
 *
 * @param value - The numeric value to be converted.
 * @returns A string representation of the numeric value with appropriate suffixes.
 */
function trimValue(value: number): string {
  if (value >= 1_000_000) {
    const millions = value / 1_000_000;
    return `${millions.toFixed(1)}M`;
  } else if (value >= 1000) {
    const thousands = value / 1000;
    return `${thousands.toFixed(1)}K`;
  } else {
    return value.toString();
  }
}

export { trimValue };
