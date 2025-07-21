#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'cyan') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function error(message) {
  console.error(`${colors.red}❌ ${message}${colors.reset}`);
  process.exit(1);
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function exec(command, options = {}) {
  try {
    const result = execSync(command, { 
      stdio: options.silent ? 'pipe' : 'inherit',
      encoding: 'utf8',
      ...options 
    });
    return result;
  } catch (err) {
    if (!options.ignoreError) {
      error(`Failed to execute: ${command}\n${err.message}`);
    }
    throw err;
  }
}

function checkGitStatus() {
  info('Checking git status...');
  
  try {
    // Check if we're in a git repository
    exec('git rev-parse --git-dir', { silent: true });
  } catch {
    error('Not in a git repository. Please initialize git first.');
  }

  try {
    // Check for uncommitted changes
    const status = exec('git status --porcelain', { silent: true });
    if (status.trim()) {
      error('Working directory is not clean. Please commit or stash your changes first.');
    }
  } catch {
    error('Failed to check git status.');
  }

  try {
    // Check if we're on main/master branch
    const branch = exec('git rev-parse --abbrev-ref HEAD', { silent: true }).trim();
    if (branch !== 'main' && branch !== 'master') {
      warning(`You're on branch '${branch}'. Consider releasing from main/master branch.`);
    }
  } catch {
    warning('Could not determine current branch.');
  }

  success('Git status check passed');
}

function runTests() {
  info('Running tests...');
  
  // Check if tests are properly configured first
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (packageJson.scripts.test && packageJson.scripts.test.includes('no test specified')) {
    warning('No tests specified, skipping test step');
    return;
  }
  
  try {
    exec('npm test');
    success('Tests passed');
  } catch {
    error('Tests failed. Please fix tests before releasing.');
  }
}

function buildProject() {
  info('Cleaning and building project...');
  
  try {
    exec('npm run clean');
    success('Project cleaned');
    
    exec('npm run build');
    success('Project built successfully');
    
    // Verify build output exists
    if (!fs.existsSync('lib')) {
      error('Build output directory (lib) not found');
    }
    
    const requiredFiles = ['lib/index.js', 'lib/index.d.ts'];
    for (const file of requiredFiles) {
      if (!fs.existsSync(file)) {
        error(`Required build file missing: ${file}`);
      }
    }
    
    success('Build verification passed');
  } catch {
    error('Build failed');
  }
}

function checkPackage() {
  info('Checking package contents...');
  try {
    exec('npm run publish:check');
    success('Package check passed');
  } catch {
    error('Package check failed');
  }
}

function publishPackage(versionType) {
  info(`Publishing with version type: ${versionType}`);
  
  try {
    // Update version
    const versionOutput = exec(`npm version ${versionType}`, { silent: true });
    const newVersion = versionOutput.match(/v(\d+\.\d+\.\d+)/)?.[1];
    
    if (!newVersion) {
      error('Failed to parse new version');
    }
    
    success(`Version updated to ${newVersion}`);
    
    // Publish to npm
    exec('npm publish');
    success(`Package published successfully as v${newVersion}`);
    
    return newVersion;
  } catch {
    error('Failed to publish package');
  }
}

function pushToGit(version) {
  info('Pushing to git repository...');
  
  try {
    // Push commits and tags
    exec('git push');
    exec('git push --tags');
    success(`Changes and tag v${version} pushed to repository`);
  } catch {
    warning('Failed to push to git. Please push manually.');
  }
}

function main() {
  const args = process.argv.slice(2);
  const versionType = args[0];
  
  if (!versionType || !['patch', 'minor', 'major'].includes(versionType)) {
    error(`
Usage: npm run release <version-type>

Version types:
  patch - Bug fixes (1.0.0 -> 1.0.1)
  minor - New features (1.0.0 -> 1.1.0)  
  major - Breaking changes (1.0.0 -> 2.0.0)

Example: npm run release patch
    `);
  }

  log(`\n🚀 Starting release process for ${versionType} version...\n`);

  // Step 1: Check git status
  checkGitStatus();

  // Step 2: Run tests
  runTests();

  // Step 3: Build project
  buildProject();

  // Step 4: Check package contents
  checkPackage();

  // Step 5: Publish package
  const newVersion = publishPackage(versionType);

  // Step 6: Push to git
  pushToGit(newVersion);

  log(`\n🎉 Release completed successfully!`);
  log(`📦 Package v${newVersion} is now available on npm`);
  log(`🔗 Check it out: https://www.npmjs.com/package/react-native-advanced-flatlist\n`);
}

// Run the script
main();