#!/usr/bin/env node

/**
 * Toy Chest Theme - Extension Packager
 * 
 * This script helps package the Toy Chest Theme extension for distribution.
 * It checks for required dependencies and guides the user through the packaging process.
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
 * Check if a command is available
 * @param {string} command - The command to check
 * @returns {boolean} Whether the command is available
 */
function commandExists(command) {
  try {
    execSync(`which ${command}`, { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Check if the package.json file exists and has required fields
 * @returns {boolean} Whether the package.json is valid
 */
function validatePackageJson() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    print('Error: package.json not found', colors.red);
    return false;
  }
  
  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const requiredFields = ['name', 'displayName', 'version', 'publisher', 'engines', 'contributes'];
    
    for (const field of requiredFields) {
      if (!packageJson[field]) {
        print(`Error: Missing required field '${field}' in package.json`, colors.red);
        return false;
      }
    }
    
    if (!packageJson.contributes.themes || !packageJson.contributes.themes.length) {
      print('Error: No themes defined in package.json', colors.red);
      return false;
    }
    
    return true;
  } catch (error) {
    print(`Error parsing package.json: ${error.message}`, colors.red);
    return false;
  }
}

/**
 * Check if the theme file exists
 * @returns {boolean} Whether the theme file exists
 */
function validateThemeFile() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  const themePath = packageJson.contributes.themes[0].path;
  const themeFilePath = path.join(process.cwd(), themePath);
  
  if (!fs.existsSync(themeFilePath)) {
    print(`Error: Theme file not found at ${themePath}`, colors.red);
    return false;
  }
  
  return true;
}

/**
 * Check if the icon file exists
 * @returns {boolean} Whether the icon file exists
 */
function validateIconFile() {
  const packageJsonPath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  if (packageJson.icon) {
    const iconPath = path.join(process.cwd(), packageJson.icon);
    
    if (!fs.existsSync(iconPath)) {
      print(`Warning: Icon file not found at ${packageJson.icon}`, colors.yellow);
      print('The extension will be packaged without an icon.', colors.yellow);
      return false;
    }
  } else {
    print('Warning: No icon specified in package.json', colors.yellow);
    print('The extension will be packaged without an icon.', colors.yellow);
    return false;
  }
  
  return true;
}

/**
 * Install vsce if it's not already installed
 */
function installVsce() {
  if (!commandExists('vsce')) {
    print('Installing vsce...', colors.cyan);
    
    try {
      execSync('npm install -g @vscode/vsce', { stdio: 'inherit' });
      print('vsce installed successfully!', colors.green);
    } catch (error) {
      print('Error installing vsce. Please install it manually:', colors.red);
      print('npm install -g @vscode/vsce', colors.yellow);
      process.exit(1);
    }
  } else {
    print('vsce is already installed.', colors.green);
  }
}

/**
 * Package the extension
 */
function packageExtension() {
  print('Packaging extension...', colors.cyan);
  
  try {
    const output = execSync('vsce package', { encoding: 'utf8' });
    print(output, colors.dim);
    
    // Extract the .vsix filename from the output
    const match = output.match(/Created: ([^\s]+\.vsix)/);
    if (match && match[1]) {
      const vsixFile = match[1];
      print(`Extension packaged successfully: ${vsixFile}`, colors.green);
      return vsixFile;
    } else {
      print('Extension packaged successfully!', colors.green);
      return null;
    }
  } catch (error) {
    print(`Error packaging extension: ${error.message}`, colors.red);
    process.exit(1);
  }
}

/**
 * Main function
 */
function main() {
  printSection('Toy Chest Theme - Extension Packager');
  
  print('This script will package the Toy Chest Theme extension for distribution.', colors.bright);
  print('Make sure you have updated the version number in package.json before packaging.\n');
  
  // Validate package.json
  print('Validating package.json...', colors.cyan);
  if (!validatePackageJson()) {
    process.exit(1);
  }
  print('package.json is valid.', colors.green);
  
  // Validate theme file
  print('\nValidating theme file...', colors.cyan);
  if (!validateThemeFile()) {
    process.exit(1);
  }
  print('Theme file is valid.', colors.green);
  
  // Validate icon file
  print('\nChecking icon file...', colors.cyan);
  validateIconFile();
  
  // Install vsce if needed
  print('\nChecking for vsce...', colors.cyan);
  installVsce();
  
  // Package the extension
  print('\nReady to package the extension.', colors.bright);
  const vsixFile = packageExtension();
  
  // Print next steps
  printSection('Next Steps');
  
  print('To test the extension in VS Code:', colors.bright);
  print('1. Open VS Code', colors.dim);
  print('2. Go to Extensions (Ctrl+Shift+X)', colors.dim);
  print('3. Click the "..." menu and select "Install from VSIX..."', colors.dim);
  if (vsixFile) {
    print(`4. Select the ${vsixFile} file`, colors.dim);
  } else {
    print('4. Select the .vsix file that was created', colors.dim);
  }
  
  print('\nTo test the extension in Cursor:', colors.bright);
  print('1. Open Cursor', colors.dim);
  print('2. Go to Extensions (Ctrl+Shift+X)', colors.dim);
  print('3. Click the "..." menu and select "Install from VSIX..."', colors.dim);
  if (vsixFile) {
    print(`4. Select the ${vsixFile} file`, colors.dim);
  } else {
    print('4. Select the .vsix file that was created', colors.dim);
  }
  
  print('\nTo publish the extension to the VS Code Marketplace:', colors.bright);
  print('1. Create a publisher account at https://marketplace.visualstudio.com/manage', colors.dim);
  print('2. Get a Personal Access Token', colors.dim);
  print('3. Run: vsce login <publisher>', colors.dim);
  print('4. Run: vsce publish', colors.dim);
  
  print('\nFor more information, see:', colors.bright);
  print('https://code.visualstudio.com/api/working-with-extensions/publishing-extension', colors.dim);
}

// Run the main function
main();
