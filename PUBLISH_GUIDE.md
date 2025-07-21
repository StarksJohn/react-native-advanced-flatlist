# Publishing Guide

This comprehensive guide will walk you through publishing `react-native-advanced-flatlist` to npm and creating a GitHub repository.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Automated Release Process](#automated-release-process)
3. [Manual Publishing Steps](#manual-publishing-steps)
4. [GitHub Repository Setup](#github-repository-setup)
5. [Post-Publication Tasks](#post-publication-tasks)
6. [Documentation and Marketing](#documentation-and-marketing)
7. [Troubleshooting](#troubleshooting)
8. [Maintenance](#maintenance)

## Prerequisites

Before publishing your package, ensure you have:

1. **Node.js and npm**: Make sure you have Node.js installed with npm
2. **Git**: Ensure Git is installed and configured
3. **npm account**: Create an account at [npmjs.com](https://www.npmjs.com/)
4. **GitHub account**: Create an account at [github.com](https://github.com/)

### Initial Setup

#### 1. Login to npm
```bash
npm login
# Enter your npm username, password, and email
```

#### 2. Verify your login
```bash
npm whoami
# Should display your npm username
```

#### 3. Check package name availability
```bash
npm view react-native-advanced-flatlist
# If package doesn't exist, you'll get an error (which is good!)
```

## Automated Release Process

We've created an automated release script that handles all publishing steps. This is the **recommended approach**.

### Available Release Commands

```bash
# Patch release - Bug fixes (1.0.1 → 1.0.2)
npm run release patch

# Minor release - New features (1.0.1 → 1.1.0)  
npm run release minor

# Major release - Breaking changes (1.0.1 → 2.0.0)
npm run release major
```

### What the Automated Process Does

The release script (`scripts/release.js`) automatically performs these steps:

1. **Git Status Check** - Ensures working directory is clean with no uncommitted changes
2. **Run Tests** - Executes `npm test` (if tests are configured)
3. **Clean Build** - Runs `npm run clean && npm run build`
4. **Build Verification** - Checks that build output files exist
5. **Package Validation** - Runs `npm run publish:check` to verify package contents
6. **Version Update** - Automatically updates package.json version number
7. **Publish to NPM** - Executes `npm publish`
8. **Git Push** - Pushes code and version tags to remote repository

### Safety Features

- Pre-publish git working directory validation
- Build output integrity verification
- Colored output with detailed progress information
- Clear error messages on failure
- Warning when publishing from non-main/master branches

### Usage Example

```bash
# For a bug fix release
npm run release patch
```

## Manual Publishing Steps

If you prefer manual control or need to troubleshoot, follow this comprehensive checklist:

### Step 1: Pre-Publication Checklist

#### 1.1 Code Verification
```bash
# Ensure all code is committed
git status

# Ensure you're on the correct branch (preferably main/master)
git branch

# Verify you're logged into npm
npm whoami
```

#### 1.2 Build and Validation (Required ✅)
```bash
# Clean old build files (recommended)
npm run clean

# Rebuild the project (REQUIRED!)
npm run build
# This compiles TypeScript → JavaScript + type definitions
```

#### 1.3 Package Content Verification (Highly Recommended ⭐)
```bash
# Preview what will be published without creating actual files
npm run publish:check
# or
npm pack --dry-run

# This helps you:
# - Verify file list is correct
# - Check package size
# - Confirm .npmignore configuration
# - Avoid publishing incorrect content
```

#### 1.4 Local Testing (Optional)
```bash
cd example
npm install
npm link ../
# Test your package locally before publishing
```

### Step 2: Version Management

Choose the appropriate version update:

```bash
# For bug fixes (1.0.1 → 1.0.2)
npm version patch

# For new features (1.0.1 → 1.1.0)
npm version minor

# For breaking changes (1.0.1 → 2.0.0)
npm version major

# Or manually edit version in package.json
```

### Step 3: Publish to npm

#### 3.1 Final verification
```bash
# Double-check you're logged in
npm whoami

# Ensure latest build
npm run build
```

#### 3.2 Publish the package
```bash
npm publish
# Your package will be published to npm
```

#### 3.3 Post-publish verification
```bash
# Verify successful publication
npm view react-native-advanced-flatlist

# Test installation
npm install react-native-advanced-flatlist
```

### Step 4: Git Operations

```bash
# Push version tags to git
git push --tags

# Push code changes
git push
```

## GitHub Repository Setup

### Step 1: Initialize Git Repository

```bash
git init
git add .
git commit -m "Initial commit: React Native Advanced FlatList v1.0.0"
```

### Step 2: Create GitHub Repository

1. Go to [github.com](https://github.com/)
2. Click "New repository"
3. Repository name: `react-native-advanced-flatlist`
4. Description: "A powerful React Native FlatList component with pagination, refresh, selection, and loading states"
5. Make it **Public**
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### Step 3: Connect Local Repository to GitHub

```bash
git remote add origin https://github.com/yourusername/react-native-advanced-flatlist.git
git branch -M main
git push -u origin main
```

## Post-Publication Tasks

### Update Package Information

Update your `package.json` with the correct GitHub URL:

```json
{
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/react-native-advanced-flatlist.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/react-native-advanced-flatlist/issues"
  },
  "homepage": "https://github.com/yourusername/react-native-advanced-flatlist#readme"
}
```

### Create GitHub Release

1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `v1.0.0 - Initial Release`
5. Description: Copy from CHANGELOG.md
6. Click "Publish release"

## Documentation and Marketing

### Add README Badges

Add these badges to your README.md:

```markdown
[![npm version](https://badge.fury.io/js/react-native-advanced-flatlist.svg)](https://badge.fury.io/js/react-native-advanced-flatlist)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
```

### Create Visual Documentation

- Create demo GIF/screenshots
- Add visual examples of your component in action
- Include code examples in the README

### Promote Your Package

- Tweet about it
- Share on Reddit (r/reactnative)
- Post on React Native community forums
- Add to awesome-react-native lists
- Write blog posts about your package

## Troubleshooting

### Common npm Publish Errors

**403 Forbidden**: Package name already exists
- Solution: Change package name or contact owner

**402 Payment Required**: Package name is reserved
- Solution: Choose a different name

**ENEEDAUTH**: Not logged in
- Solution: Run `npm login`

### Common Git Errors

**Permission denied**: SSH key issues
- Solution: Use HTTPS URL or set up SSH keys

**Repository not found**: Wrong URL
- Solution: Verify repository URL

### Automated Release Script Issues

**Working directory not clean**: Uncommitted changes
- Solution: Commit or stash your changes

**Build failed**: TypeScript compilation errors
- Solution: Fix TypeScript errors before publishing

**Tests failed**: Test suite failures
- Solution: Fix failing tests or update test configuration

### Common Publishing Mistakes

#### 1. Forgetting to Build
```bash
# ❌ Wrong approach - using old build files
npm publish

# ✅ Correct approach - fresh build
npm run build
npm publish
```

#### 2. Including Unnecessary Files
```bash
# Use npm pack --dry-run to check file inclusion
npm pack --dry-run

# Should NOT include:
# ❌ node_modules/
# ❌ .git/
# ❌ test files
# ❌ .env files

# Should include:
# ✅ lib/ (compiled files)
# ✅ src/ (source files)
# ✅ README.md
# ✅ package.json
```

#### 3. Version Number Issues
```bash
# ❌ Forgetting to update version
npm publish  # Will fail: version already exists

# ✅ Correct workflow
npm version patch
npm publish
```

#### 4. Build Configuration Issues
Check your `package.json` configuration:

```json
{
  "main": "lib/index.js",        // Points to compiled files
  "types": "lib/index.d.ts",     // TypeScript type definitions
  "files": [                     // Files included in package
    "lib/**/*",
    "src/**/*",
    "README.md"
  ],
  "scripts": {
    "build": "tsc",              // Build command
    "clean": "rimraf lib",       // Clean command
    "prepare": "npm run clean && npm run build",  // Auto build on install
    "prepublishOnly": "npm run clean && npm run build"  // Auto build before publish
  }
}
```

### Package Validation Commands

```bash
# Check download statistics (after publishing)
npm view react-native-advanced-flatlist downloads

# Check package dependencies
npm view react-native-advanced-flatlist dependencies

# Check who depends on your package
npm view react-native-advanced-flatlist dependents
```

## Maintenance

### Regular Updates

1. Keep dependencies updated
2. Add new features based on user feedback
3. Fix bugs promptly
4. Maintain good documentation
5. Respond to GitHub issues

### Version Management

- **Patch** (1.0.1): Bug fixes, backwards compatible
- **Minor** (1.1.0): New features, backwards compatible
- **Major** (2.0.0): Breaking changes

### Success Metrics

Track your package success:

1. **npm downloads**: Check weekly/monthly downloads
2. **GitHub stars**: Monitor repository stars
3. **Issues/PRs**: Community engagement
4. **Dependents**: Other packages using yours

## Next Steps

1. Consider adding comprehensive tests
2. Set up CI/CD pipeline (GitHub Actions)
3. Add more usage examples
4. Create video tutorials
5. Write technical blog posts
6. Contribute to React Native community discussions

## File Structure Reference

Your published package will include:

```
react-native-advanced-flatlist/
├── lib/                    # Compiled JavaScript and TypeScript definitions
│   ├── index.js
│   ├── index.d.ts
│   ├── AdvancedFlatList.js
│   └── AdvancedFlatList.d.ts
├── src/                    # Source TypeScript files
│   ├── index.ts
│   └── AdvancedFlatList.tsx
├── scripts/                # Release automation
│   └── release.js
├── package.json
├── README.md
├── CHANGELOG.md
└── LICENSE
```

Your package is now live and ready for the React Native community to use! 🚀

---

**Quick Start for Future Releases:**

```bash
# Make your changes
git add .
git commit -m "Your changes"

# Release (choose appropriate version type)
npm run release patch
```

The automated script handles everything else!
