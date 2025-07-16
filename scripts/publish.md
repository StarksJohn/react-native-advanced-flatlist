# NPM Publishing Workflow

## 🚀 Pre-Publication Checklist

### 1. **Code Verification**
```bash
# 1. Ensure all code is committed
git status

# 2. Ensure you're on the correct branch
git branch
```

### 2. **Build and Validation** (Required)
```bash
# 3. Clean old build files
npm run clean

# 4. Rebuild the project (Required!)
npm run build

# 5. Preview package contents (Highly recommended!)
npm pack --dry-run
```

### 3. **Version Management**
```bash
# 6. Update version number (choose one)
npm version patch   # 1.0.1 -> 1.0.2 (bug fixes)
npm version minor   # 1.0.1 -> 1.1.0 (new features)
npm version major   # 1.0.1 -> 2.0.0 (breaking changes)

# Or manually edit version in package.json
```

### 4. **Publish to npm**
```bash
# 7. Ensure you're logged in to npm
npm whoami

# 8. Publish the package
npm publish

# 9. Verify successful publication
npm view react-native-advanced-flatlist
```

### 5. **Git Operations**
```bash
# 10. Push version tags to git
git push --tags

# 11. Push code changes
git push
```

## ⚠️ Important Notes

### `npm run build` - Required ✅
- **Purpose**: Compile TypeScript → JavaScript + type definitions
- **Necessity**: package.json points to `lib/index.js`, users consume compiled files
- **Result**: Generates `lib/` directory

### `npm pack --dry-run` - Highly Recommended ⭐
- **Purpose**: Preview package contents without creating actual files
- **Benefits**: 
  - Verify file list is correct
  - Check package size
  - Confirm .npmignore configuration
  - Avoid publishing incorrect content

### `npm run clean` - Recommended 💡
- **Purpose**: Delete old `lib/` directory
- **Benefits**: Ensure clean build environment

## 🔍 Key package.json Configuration

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
    "prepare": "npm run clean && npm run build"  // Auto build
  }
}
```

## 🚨 Common Mistakes

### 1. **Forgetting to Build**
```bash
# ❌ Wrong approach
npm publish  # Direct publish using old build files

# ✅ Correct approach
npm run build
npm publish
```

### 2. **Including Unnecessary Files**
```bash
# Use npm pack --dry-run to check
npm pack --dry-run

# Check for inclusion:
# ❌ node_modules/
# ❌ .git/
# ❌ test files
# ✅ lib/ (compiled files)
# ✅ README.md
# ✅ package.json
```

### 3. **Version Number Issues**
```bash
# ❌ Forgetting to update version
npm publish  # Will fail: version already exists

# ✅ Correct workflow
npm version patch
npm publish
```

## 🤖 Automation Scripts

You can add publishing workflows to package.json:

```json
{
  "scripts": {
    "prepublishOnly": "npm run clean && npm run build",
    "postpublish": "git push --tags"
  }
}
```

- `prepublishOnly`: Automatically executed before publishing
- `postpublish`: Automatically executed after publishing

## 📊 Publication Success Verification

```bash
# Check package info on npm
npm view react-native-advanced-flatlist

# Test installation
npm install react-native-advanced-flatlist

# Check download statistics (wait some time after publishing)
npm view react-native-advanced-flatlist downloads
``` 