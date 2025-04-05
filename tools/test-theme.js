#!/usr/bin/env node

/**
 * Toy Chest Theme - Theme Tester
 * 
 * This script helps test the Toy Chest Theme in VS Code.
 * It launches VS Code with the extension development host and opens sample files.
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

/**
 * Print a styled message to the console
 * @param {string} message - The message to print
 * @param {string} style - The style to apply
 */
function print(message, style = '') {
  console.log(`${style}${message}${colors.reset}`);
}

/**
 * Print a section header
 * @param {string} title - The section title
 */
function printSection(title) {
  console.log('\n' + '='.repeat(80));
  console.log(`${colors.bright}${colors.cyan}${title}${colors.reset}`);
  console.log('='.repeat(80) + '\n');
}

/**
 * Check if VS Code is installed
 * @returns {boolean} Whether VS Code is installed
 */
function checkVSCode() {
  try {
    execSync('which code', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Check if sample files exist
 * @returns {Array} Array of sample file paths
 */
function getSampleFiles() {
  const samplesDir = path.join(process.cwd(), 'samples');
  
  if (!fs.existsSync(samplesDir)) {
    print('Warning: samples directory not found', colors.yellow);
    return [];
  }
  
  const sampleFiles = [];
  
  // Check for specific sample files
  const expectedSamples = [
    'javascript.js',
    'python.py',
    'html-css.html'
  ];
  
  for (const sample of expectedSamples) {
    const samplePath = path.join(samplesDir, sample);
    
    if (fs.existsSync(samplePath)) {
      sampleFiles.push(samplePath);
    } else {
      print(`Warning: Sample file ${sample} not found`, colors.yellow);
    }
  }
  
  return sampleFiles;
}

/**
 * Launch VS Code with the extension development host
 * @param {Array} sampleFiles - Array of sample file paths to open
 */
function launchVSCode(sampleFiles) {
  const extensionPath = process.cwd();
  
  print('Launching VS Code with the extension development host...', colors.cyan);
  
  try {
    // Build the command
    let command = `code --extensionDevelopmentPath="${extensionPath}"`;
    
    // Add sample files to open
    if (sampleFiles.length > 0) {
      command += ' ' + sampleFiles.map(file => `"${file}"`).join(' ');
    }
    
    // Execute the command
    execSync(command, { stdio: 'inherit' });
    
    print('VS Code launched successfully!', colors.green);
  } catch (error) {
    print(`Error launching VS Code: ${error.message}`, colors.red);
    process.exit(1);
  }
}

/**
 * Main function
 */
function main() {
  printSection('Toy Chest Theme - Theme Tester');
  
  print('This script will launch VS Code with the Toy Chest Theme for testing.', colors.bright);
  
  // Check if VS Code is installed
  print('Checking if VS Code is installed...', colors.cyan);
  if (!checkVSCode()) {
    print('Error: VS Code not found. Please install VS Code and try again.', colors.red);
    process.exit(1);
  }
  print('VS Code is installed.', colors.green);
  
  // Get sample files
  print('\nLooking for sample files...', colors.cyan);
  const sampleFiles = getSampleFiles();
  
  if (sampleFiles.length > 0) {
    print(`Found ${sampleFiles.length} sample files:`, colors.green);
    for (const file of sampleFiles) {
      print(`- ${path.relative(process.cwd(), file)}`, colors.dim);
    }
  } else {
    print('No sample files found. VS Code will be launched without opening any files.', colors.yellow);
  }
  
  // Launch VS Code
  print('\nReady to launch VS Code.', colors.bright);
  launchVSCode(sampleFiles);
  
  // Print instructions
  printSection('Testing Instructions');
  
  print('To test the theme:', colors.bright);
  print('1. In VS Code, open the Command Palette (Ctrl+Shift+P or Cmd+Shift+P on Mac)', colors.dim);
  print('2. Type "Preferences: Color Theme" and select it', colors.dim);
  print('3. Select "Toy Chest" from the list of themes', colors.dim);
  print('4. Examine the sample files to verify syntax highlighting and colors', colors.dim);
  
  print('\nTo inspect token colors:', colors.bright);
  print('1. Place your cursor on a code element', colors.dim);
  print('2. Open the Command Palette', colors.dim);
  print('3. Type "Developer: Inspect Editor Tokens and Scopes" and select it', colors.dim);
  print('4. View the token information, including scope and applied theme colors', colors.dim);
  
  print('\nTo make changes to the theme:', colors.bright);
  print('1. Edit the theme file at themes/toy-chest-color-theme.json', colors.dim);
  print('2. Changes will be applied automatically in the extension development host', colors.dim);
}

// Run the main function
main();
