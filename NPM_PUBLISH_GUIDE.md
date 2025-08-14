# NPM Publishing Guide for react-native-advanced-flatlist

This comprehensive guide provides both manual and automated approaches for publishing this React Native component to npm, including an advanced automated release system for streamlined publishing workflows.

## Table of Contents

- [Prerequisites](#prerequisites)
- [🚀 Automated Release System (Recommended)](#-automated-release-system-recommended)
- [Manual Publishing Steps](#manual-publishing-steps)
- [GitHub Repository Setup](#github-repository-setup)
- [Version Management](#version-management)
- [Troubleshooting](#troubleshooting)
- [Best Practices](#best-practices)
- [Security Considerations](#security-considerations)
- [Post-Publication Tasks](#post-publication-tasks)
- [Documentation and Marketing](#documentation-and-marketing)
- [Maintenance](#maintenance)

## Prerequisites

1. **Node.js and npm**: Make sure you have Node.js installed (version 14 or higher)
2. **npm account**: Create an account at [npmjs.com](https://npmjs.com)
3. **Git**: For version control and repository management
4. **Git remote repository**: Properly configured with push permissions

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

---

## 🚀 Automated Release System (Recommended)

This project includes a comprehensive automated release script that handles version management, building, testing, Git operations, and NPM publishing with advanced error handling and rollback capabilities.

### ✨ Features

- 🚀 **Interactive version selection** - Choose between patch, minor, or major releases
- ✅ **Comprehensive pre-flight checks** - Git status, NPM auth, dependencies, network connectivity
- 🔨 **Automated building and testing** - Clean, compile, lint, type-check, and test
- 📦 **Package verification** - Ensures package integrity before publishing
- 🔄 **Git operations** - Automatic commits, tagging, and pushing
- 📤 **NPM publishing** - Publishes to registry with verification
- 🎯 **Error handling** - Rollback capabilities on failure
- 📝 **Detailed logging** - Complete audit trail of release process
- 🧪 **Dry run mode** - Test the process without making changes

### Quick Start

#### Interactive Release (Recommended)
```bash
npm run release
```

This will:
1. Run all pre-flight checks
2. Build and test the project
3. Prompt you to select version type (patch/minor/major)
4. Show you the version change and ask for confirmation
5. Handle all Git operations
6. Publish to NPM
7. Verify the publication

#### Automated Release Commands

```bash
# Dry run mode (no actual changes)
npm run release:dry

# Direct version releases
npm run release:patch-auto    # Patch version (1.0.0 → 1.0.1)
npm run release:minor-auto    # Minor version (1.0.0 → 1.1.0)
npm run release:major-auto    # Major version (1.0.0 → 2.0.0)

# Legacy simple commands
npm run release patch         # Patch release - Bug fixes
npm run release minor         # Minor release - New features
npm run release major         # Major release - Breaking changes
```

#### Advanced Options

```bash
# Direct script execution with options
node scripts/release.js [options]

Options:
  --dry-run, -d     Run in dry mode (no actual changes)
  --version, -v     Specify version type (patch|minor|major)
  --skip-tests, -s  Skip test execution
  --help, -h        Show help information
```

#### Examples

```bash
# Interactive release with dry run
node scripts/release.js --dry-run

# Automated patch release
node scripts/release.js --version patch

# Skip tests and do minor release
node scripts/release.js --version minor --skip-tests

# Dry run with major version and skip tests
node scripts/release.js -d -v major -s
```

### Process Overview

#### 1. Pre-flight Checks
- ✅ Git working tree status (warns about uncommitted changes)
- ✅ Current Git branch validation (recommends main/master)
- ✅ NPM authentication status
- ✅ Dependencies installation and health
- ✅ Network connectivity to NPM registry

#### 2. Build and Test
- 🧹 Clean previous build artifacts
- 🔍 TypeScript type checking
- 📋 ESLint code quality (with auto-fix attempt)
- 🔨 Project compilation
- 🧪 Test execution (if not skipped)
- 📦 Package integrity verification

#### 3. Version Management
- 📊 Display current version
- 🎯 Interactive or automated version type selection
- 📈 Calculate and preview new version
- ✅ User confirmation for version update
- 📝 Update package.json

#### 4. Git Operations
- 💾 Commit version changes
- 🏷️ Create version tag (v1.0.0 format)
- ⬆️ Push commits and tags to remote

#### 5. NPM Publishing
- 📤 Publish package to NPM registry
- ⏳ Wait for registry propagation
- ✅ Verify successful publication

### Error Handling and Rollback

The automated script includes comprehensive error handling:

- **Automatic rollback** on failure (when possible)
- **Version rollback** - Reverts package.json changes
- **Git rollback** - Removes commits and tags
- **Detailed error logging** - Full audit trail in `release.log`
- **Graceful failure** - Clean exit with helpful error messages

### Logging

All release operations are logged to `release.log` with:
- Timestamps for all operations
- Step-by-step execution details
- Error messages and stack traces
- Release duration and summary

---

## Manual Publishing Steps

For those who prefer manual control or need to understand the underlying process, here's the step-by-step manual approach.

### Pre-Publishing Checklist

#### 1. Verify Package Configuration

Check your `package.json` file:

```json
{
  "name": "react-native-advanced-flatlist",
  "version": "1.0.0",
  "main": "lib/index.js",
  "types": "lib/index.d.ts",
  "files": [
    "lib/",
    "src/",
    "README.md",
    "LICENSE"
  ]
}
```

#### 2. Code Verification
```bash
# Ensure all code is committed
git status

# Ensure you're on the correct branch (preferably main/master)
git branch

# Verify you're logged into npm
npm whoami
```

#### 3. Build and Validation (Required ✅)
```bash
# Clean old build files (recommended)
npm run clean

# Rebuild the project (REQUIRED!)
npm run build
# This compiles TypeScript → JavaScript + type definitions
```

#### 4. Package Content Verification (Highly Recommended ⭐)
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

#### 5. Local Testing (Optional)
```bash
cd example
npm install
npm link ../
# Test your package locally before publishing
```

### Publishing Steps

#### Step 1: Version Management

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

#### Step 2: Publish to npm

```bash
# Double-check you're logged in
npm whoami

# Ensure latest build
npm run build

# Publish the package
npm publish
# Your package will be published to npm
```

#### Step 3: Post-publish verification
```bash
# Verify successful publication
npm view react-native-advanced-flatlist

# Test installation
npm install react-native-advanced-flatlist
```

#### Step 4: Git Operations

```bash
# Push version tags to git
git push --tags

# Push code changes
git push
```

---

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

---

## Version Management

### Semantic Versioning (SemVer)

Follow semantic versioning:
- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features, backward compatible
- **Patch** (1.0.0 → 1.0.1): Bug fixes, backward compatible

### Available Scripts

Current package.json scripts for version management:

```json
{
  "scripts": {
    "release": "node scripts/release.js",
    "release:dry": "node scripts/release.js --dry-run",
    "release:patch-auto": "node scripts/release.js --version patch",
    "release:minor-auto": "node scripts/release.js --version minor",
    "release:major-auto": "node scripts/release.js --version major",
    "release:patch": "npm version patch && npm publish",
    "release:minor": "npm version minor && npm publish",
    "release:major": "npm version major && npm publish"
  }
}
```

---

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

### Package Validation Commands

```bash
# Check download statistics (after publishing)
npm view react-native-advanced-flatlist downloads

# Check package dependencies
npm view react-native-advanced-flatlist dependencies

# Check who depends on your package
npm view react-native-advanced-flatlist dependents
```

### Getting Help

For automated release script:
```bash
node scripts/release.js --help
```

Check detailed logs:
```bash
cat release.log
```

---

## Best Practices

### Development Workflow
1. **Always test first** - Use `npm run release:dry` to verify the process
2. **Clean working tree** - Commit changes before releasing  
3. **Review changes** - Check what will be published with `npm run pack-test`
4. **Monitor publication** - Verify package appears on npmjs.com
5. **Keep logs** - Review `release.log` for any warnings or issues

### Version Management
6. **Use semantic versioning** - Follow semver guidelines for version selection
7. **Tag releases** - Use Git tags for version management
8. **Update documentation** - Keep README and CHANGELOG current

### Testing and Quality
9. **Always test before publishing** - Use `npm pack` and test locally
10. **Keep .npmignore updated** - Don't publish unnecessary files
11. **Write good commit messages** - For version tracking
12. **Monitor downloads** - Check npm stats regularly

### Automation
13. **Prefer automated releases** - Use `npm run release` for consistency
14. **Use dry-run mode** - Test releases before executing
15. **Review automation logs** - Check `release.log` for issues

---

## Security Considerations

### Account Security
1. **Enable 2FA** - Protect your npm account with two-factor authentication
2. **Use automation tokens** - For CI/CD pipelines instead of passwords
3. **Scope packages** - Consider using scoped packages (@yourname/package)

### Code Security  
4. **Review dependencies** - Regularly audit dependencies for vulnerabilities
5. **Never expose credentials** - Script never exposes NPM credentials
6. **Use dry-run for validation** - All operations can be reviewed in dry-run mode

### Release Security
7. **Rollback capabilities** - Minimize risk of partial releases
8. **Comprehensive logging** - Provides audit trail for all operations
9. **Repository permissions** - Git operations require proper permissions

---

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

---

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

---

## Maintenance

### Regular Tasks

1. **Update dependencies** - Keep dependencies current
2. **Monitor issues** - Respond to GitHub issues and npm feedback
3. **Security updates** - Address security vulnerabilities promptly
4. **Documentation** - Keep documentation updated with new features
5. **Review automation** - Periodically check release script performance

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

### Deprecation Process

If you need to deprecate a version:

```bash
# Deprecate a specific version
npm deprecate react-native-advanced-flatlist@1.0.0 "This version has a security vulnerability"

# Deprecate all versions
npm deprecate react-native-advanced-flatlist "Package no longer maintained"
```

---

## Success Checklist

- [ ] Package builds successfully (`npm run build`)
- [ ] All files included in build (`npm run pack-test`)
- [ ] README is comprehensive
- [ ] Version number is correct
- [ ] Git repository is clean and tagged
- [ ] npm login successful (`npm whoami`)
- [ ] Package published successfully
- [ ] Installation test passed (`npm install package-name`)
- [ ] Documentation links work
- [ ] GitHub release created (if applicable)
- [ ] Automation script tested (`npm run release:dry`)

---

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

---

## Quick Reference

### Most Common Commands

```bash
# Automated release (recommended)
npm run release

# Test release process
npm run release:dry

# Quick patch release
npm run release:patch-auto

# Manual release
npm version patch
npm publish

# Get help
node scripts/release.js --help
```

---

**Good luck with your package publication!** 🚀

*For questions or issues with the automated release system, check the `release.log` file or run with `--dry-run` to troubleshoot.*

## Next Steps

1. Consider adding comprehensive tests
2. Set up CI/CD pipeline (GitHub Actions)
3. Add more usage examples
4. Create video tutorials
5. Write technical blog posts
6. Contribute to React Native community discussions

Your package is now live and ready for the React Native community to use! 🚀

---

**Quick Start for Future Releases:**

```bash
# Make your changes
git add .
git commit -m "Your changes"

# Release (choose appropriate version type)
npm run release
```

The automated script handles everything else!