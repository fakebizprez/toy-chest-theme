# Toy Chest Theme Tools

This directory contains tools to help develop and test the Toy Chest Theme.

## Using npm Scripts

For convenience, you can use npm scripts to run the tools. First, navigate to the tools directory:

```bash
cd tools
```

Then you can run the tools using npm:

```bash
# Test the theme in VS Code
npm run test

# Package the extension
npm run package

# Check contrast ratios
npm run check-contrast
```

## Test Theme

The `test-theme.js` script helps test the Toy Chest Theme in VS Code.

### Usage

```bash
node tools/test-theme.js
```

or if you've made it executable:

```bash
./tools/test-theme.js
```

### What It Does

- Checks if VS Code is installed
- Finds sample files in the samples directory
- Launches VS Code with the extension development host
- Opens sample files for testing
- Provides instructions for testing the theme

### Requirements

- VS Code
- Node.js

## Package Extension

The `package-extension.js` script helps package the Toy Chest Theme extension for distribution.

### Usage

```bash
node tools/package-extension.js
```

or if you've made it executable:

```bash
./tools/package-extension.js
```

### What It Does

- Validates the package.json file for required fields
- Checks that the theme file exists
- Verifies the icon file (if specified)
- Installs vsce (VS Code Extension Manager) if needed
- Packages the extension into a .vsix file
- Provides guidance on testing and publishing the extension

### Requirements

- Node.js
- npm

## Contrast Checker

The `contrast-checker.js` script is a utility to verify that the theme's colors meet WCAG AA accessibility standards. It checks the contrast ratios between foreground and background colors to ensure they are readable.

### Usage

```bash
node tools/contrast-checker.js
```

### What It Checks

- **WCAG AA Standards**: Requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.
- **Background Colors**: Checks against the main background colors used in the theme.
- **Foreground Colors**: Tests all foreground colors against each background.
- **Specific Combinations**: Verifies the actual color combinations used in the theme.

### Output

The script outputs a detailed report showing:
- Each color combination tested
- The calculated contrast ratio
- Whether it passes WCAG AA standards (for normal text, large text, or fails)

### Interpreting Results

- **PASS**: Meets WCAG AA standards for normal text (4.5:1 or higher)
- **PASS (large text only)**: Meets WCAG AA standards for large text only (3:1 or higher, but less than 4.5:1)
- **FAIL**: Does not meet WCAG AA standards (less than 3:1)

### Notes

- This is a simplified check and not a complete accessibility audit.
- For a more comprehensive analysis, use dedicated tools like WebAIM Contrast Checker or Colour Contrast Analyser.
- Some color combinations that fail the check may be used for decorative purposes or in contexts where readability is not critical.
