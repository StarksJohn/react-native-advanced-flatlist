# Publishing Guide

This guide will walk you through publishing `react-native-advanced-flatlist` to npm and creating a GitHub repository.

## Prerequisites

1. **Node.js and npm**: Make sure you have Node.js installed with npm
2. **Git**: Ensure Git is installed and configured
3. **npm account**: Create an account at [npmjs.com](https://www.npmjs.com/)
4. **GitHub account**: Create an account at [github.com](https://github.com/)

## Step 1: Prepare for npm Publishing

### 1.1 Login to npm
```bash
npm login
# Enter your npm username, password, and email
```

### 1.2 Verify your login
```bash
npm whoami
# Should display your npm username
```

### 1.3 Check package name availability
```bash
npm view react-native-advanced-flatlist
# If package doesn't exist, you'll get an error (which is good!)
```

## Step 2: Final Verification

### 2.1 Test the build
```bash
npm run build
# Ensure it compiles without errors
```

### 2.2 Verify package contents
```bash
npm pack --dry-run
# Preview what will be published
```

### 2.3 Test locally (optional)
```bash
cd example
npm install
npm link ../
# Test your package locally
```

## Step 3: Publish to npm

### 3.1 Publish the package
```bash
npm publish
# Your package will be published to npm
```

### 3.2 Verify publication
```bash
npm view react-native-advanced-flatlist
# Should show your package information
```

## Step 4: Create GitHub Repository

### 4.1 Initialize Git repository
```bash
git init
git add .
git commit -m "Initial commit: React Native Advanced FlatList v1.0.0"
```

### 4.2 Create GitHub repository
1. Go to [github.com](https://github.com/)
2. Click "New repository"
3. Repository name: `react-native-advanced-flatlist`
4. Description: "A powerful React Native FlatList component with pagination, refresh, selection, and loading states"
5. Make it **Public**
6. Don't initialize with README (we already have one)
7. Click "Create repository"

### 4.3 Connect local repository to GitHub
```bash
git remote add origin https://github.com/yourusername/react-native-advanced-flatlist.git
git branch -M main
git push -u origin main
```

## Step 5: Post-Publication Tasks

### 5.1 Add repository information to package.json
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

### 5.2 Create GitHub release
1. Go to your GitHub repository
2. Click "Releases" → "Create a new release"
3. Tag version: `v1.0.0`
4. Release title: `v1.0.0 - Initial Release`
5. Description: Copy from CHANGELOG.md
6. Click "Publish release"

### 5.3 Update npm package (if needed)
```bash
npm version patch  # or minor/major
npm publish
git push --tags
```

## Step 6: Documentation and Marketing

### 6.1 Update README badges
Add these badges to your README.md:
```markdown
[![npm version](https://badge.fury.io/js/react-native-advanced-flatlist.svg)](https://badge.fury.io/js/react-native-advanced-flatlist)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
```

### 6.2 Create demo GIF/screenshots
Create visual examples of your component in action and add them to the README.

### 6.3 Share your package
- Tweet about it
- Share on Reddit (r/reactnative)
- Post on React Native community forums
- Add to awesome-react-native lists

## Troubleshooting

### Common npm publish errors:

1. **403 Forbidden**: Package name already exists
   - Solution: Change package name or contact owner

2. **402 Payment Required**: Package name is reserved
   - Solution: Choose a different name

3. **ENEEDAUTH**: Not logged in
   - Solution: Run `npm login`

### Common Git errors:

1. **Permission denied**: SSH key issues
   - Solution: Use HTTPS URL or set up SSH keys

2. **Repository not found**: Wrong URL
   - Solution: Verify repository URL

## Maintenance

### Regular updates:
1. Keep dependencies updated
2. Add new features based on user feedback
3. Fix bugs promptly
4. Maintain good documentation
5. Respond to GitHub issues

### Version management:
- **Patch** (1.0.1): Bug fixes
- **Minor** (1.1.0): New features
- **Major** (2.0.0): Breaking changes

## Success Metrics

Track your package success:
1. **npm downloads**: Check weekly/monthly downloads
2. **GitHub stars**: Monitor repository stars
3. **Issues/PRs**: Community engagement
4. **Dependents**: Other packages using yours

## Next Steps

1. Consider adding tests
2. Set up CI/CD pipeline
3. Add more examples
4. Create video tutorials
5. Write blog posts about your package

Your package is now live and ready for the React Native community to use! 