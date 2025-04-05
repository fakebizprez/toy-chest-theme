/**
 * Toy Chest Theme - Contrast Ratio Checker
 * 
 * This script checks the contrast ratios of the theme's colors to ensure they meet
 * WCAG AA standards (at least 4.5:1 for normal text, 3:1 for large text).
 */

// Theme colors
const colors = {
  // Background colors
  'building-block-blue': '#23364a', // Deep navy blue background
  'darker-blue': '#1c2c3d', // Darker version for title bar
  'slightly-darker-blue': '#2c3f57', // Slightly darker version for activity bar
  
  // Foreground colors
  'action-figure-green': '#30cf7b', // Bright green foreground
  'light-grey': '#d4d4d4', // Light grey cursor
  'puzzle-purple': '#5f207a', // Royal purple selection
  'race-car-red': '#be2d26', // Red
  'bright-red': '#dd5943', // Bright red
  'green': '#199171', // Green
  'yellow': '#da8e26', // Yellow
  'bright-yellow': '#e7d74b', // Bright yellow
  'blue': '#325d96', // Blue
  'bright-blue': '#33a5d9', // Bright blue
  'magenta': '#8a5ddb', // Magenta
  'bright-magenta': '#ad6bdc', // Bright magenta
  'cyan': '#35a08f', // Cyan
  'bright-cyan': '#41c3ad', // Bright cyan
  'white': '#23d082', // White
  'bright-white': '#f0f0f0', // Bright white (updated for status bar)
  'bright-black': '#5a8baf', // Bright black (comments - brightened for better contrast)
};

/**
 * Convert a hex color to RGB
 * @param {string} hex - Hex color code
 * @returns {Object} RGB values
 */
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calculate the relative luminance of a color
 * @param {Object} rgb - RGB values
 * @returns {number} Relative luminance
 */
function calculateLuminance(rgb) {
  const { r, g, b } = rgb;
  
  // Convert RGB to sRGB
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;
  
  // Calculate luminance
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);
  
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/**
 * Calculate the contrast ratio between two colors
 * @param {string} color1 - First color in hex
 * @param {string} color2 - Second color in hex
 * @returns {number} Contrast ratio
 */
function calculateContrastRatio(color1, color2) {
  const lum1 = calculateLuminance(hexToRgb(color1));
  const lum2 = calculateLuminance(hexToRgb(color2));
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if a contrast ratio meets WCAG AA standards
 * @param {number} ratio - Contrast ratio
 * @param {boolean} isLargeText - Whether the text is large
 * @returns {boolean} Whether the ratio meets the standard
 */
function meetsWcagAA(ratio, isLargeText = false) {
  return isLargeText ? ratio >= 3 : ratio >= 4.5;
}

/**
 * Format a contrast ratio for display
 * @param {number} ratio - Contrast ratio
 * @returns {string} Formatted ratio
 */
function formatRatio(ratio) {
  return ratio.toFixed(2) + ':1';
}

// Check foreground colors against background colors
console.log('Toy Chest Theme - Contrast Ratio Check');
console.log('=======================================');
console.log('WCAG AA requires at least 4.5:1 for normal text, 3:1 for large text');
console.log('');

// Background colors to check against
const backgroundColors = [
  'building-block-blue',
  'darker-blue',
  'slightly-darker-blue'
];

// Foreground colors to check
const foregroundColors = [
  'action-figure-green',
  'light-grey',
  'puzzle-purple',
  'race-car-red',
  'bright-red',
  'green',
  'yellow',
  'bright-yellow',
  'blue',
  'bright-blue',
  'magenta',
  'bright-magenta',
  'cyan',
  'bright-cyan',
  'white',
  'bright-white',
  'bright-black'
];

// Check each foreground color against each background color
for (const bg of backgroundColors) {
  console.log(`\nBackground: ${bg} (${colors[bg]})`);
  console.log('-----------------------------------');
  
  for (const fg of foregroundColors) {
    const ratio = calculateContrastRatio(colors[bg], colors[fg]);
    const meetsAA = meetsWcagAA(ratio);
    const meetsAALarge = meetsWcagAA(ratio, true);
    
    const status = meetsAA ? 'PASS' : (meetsAALarge ? 'PASS (large text only)' : 'FAIL');
    
    console.log(`${fg} (${colors[fg]}): ${formatRatio(ratio)} - ${status}`);
  }
}

// Check specific combinations used in the theme
console.log('\nSpecific Theme Combinations');
console.log('---------------------------');

const combinations = [
  { name: 'Editor text', fg: 'action-figure-green', bg: 'building-block-blue' },
  { name: 'Comments', fg: 'bright-black', bg: 'building-block-blue' }, // Using brightened comment color
  { name: 'Variables', fg: 'action-figure-green', bg: 'building-block-blue' },
  { name: 'Functions', fg: 'bright-blue', bg: 'building-block-blue' },
  { name: 'Keywords', fg: 'bright-magenta', bg: 'building-block-blue' },
  { name: 'Strings', fg: 'bright-yellow', bg: 'building-block-blue' },
  { name: 'Types', fg: 'bright-cyan', bg: 'building-block-blue' },
  { name: 'Constants', fg: 'bright-red', bg: 'building-block-blue' },
  { name: 'Status bar text', fg: 'bright-white', bg: 'green' }, // Using brightened status bar text
  { name: 'Activity bar icons', fg: 'action-figure-green', bg: 'slightly-darker-blue' },
  { name: 'Tab active text', fg: 'action-figure-green', bg: 'building-block-blue' },
  { name: 'Tab inactive text', fg: 'light-grey', bg: 'slightly-darker-blue' }
];

for (const combo of combinations) {
  const ratio = calculateContrastRatio(colors[combo.bg], colors[combo.fg]);
  const meetsAA = meetsWcagAA(ratio);
  const meetsAALarge = meetsWcagAA(ratio, true);
  
  const status = meetsAA ? 'PASS' : (meetsAALarge ? 'PASS (large text only)' : 'FAIL');
  
  console.log(`${combo.name}: ${formatRatio(ratio)} - ${status}`);
}

console.log('\nNote: This is a simplified check. For a complete accessibility audit,');
console.log('use a dedicated tool like the WebAIM Contrast Checker or Colour Contrast Analyser.');
