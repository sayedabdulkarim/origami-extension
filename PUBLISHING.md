# 📦 Publishing Guide for Origami Extension

This guide documents the process for publishing updates to the VS Code Marketplace.

## Prerequisites

### 1. Install vsce (one-time setup)
```bash
npm install -g @vscode/vsce
```

### 2. Personal Access Token (PAT)
You need a Personal Access Token from Azure DevOps for publishing.

#### How to get a new token:
1. Go to https://dev.azure.com
2. Click profile icon (top right) → User Settings → Personal Access Tokens
3. Click "+ New Token"
4. Configure:
   - **Name**: `vsce-publish`
   - **Organization**: "All accessible organizations"
   - **Expiration**: 90 days (or custom)
   - **Scopes**: Custom defined → Find "Marketplace" → Check "Manage"
5. Click "Create" and **SAVE THE TOKEN** (you won't see it again!)

## Publishing Process

### Step 1: Make Your Changes
```bash
# Make code changes
# Test locally with F5 in VS Code
```

### Step 2: Update Version
Edit `package.json`:
```json
"version": "0.0.3",  // Increment version number
```

### Step 3: Update CHANGELOG
Edit `CHANGELOG.md`:
```markdown
## [0.0.3] - 2024-MM-DD

### Added
- New feature description

### Fixed
- Bug fix description

### Changed
- Update description
```

### Step 4: Update README (if needed)
- Add screenshots to `images/` folder
- Update feature descriptions
- Update installation instructions

### Step 5: Commit Changes
```bash
# Stage all changes
git add -A

# Commit with descriptive message
git commit -m "Update to v0.0.3: Brief description of changes"

# Push to GitHub (optional but recommended)
git push origin master
```

### Step 6: Publish to Marketplace

#### Option A: Using Token Directly
```bash
vsce publish -p YOUR_PERSONAL_ACCESS_TOKEN
```

#### Option B: Using vsce login (stores credentials)
```bash
# First time only
vsce login sayedabdulkarim
# Enter your PAT when prompted

# Then publish
vsce publish
```

### Step 7: Verify Publication
1. Check the marketplace page (takes 2-5 minutes to update):
   - https://marketplace.visualstudio.com/items?itemName=sayedabdulkarim.origami-vscode

2. Check the management hub:
   - https://marketplace.visualstudio.com/manage/publishers/sayedabdulkarim/extensions/origami-vscode/hub

## Quick Publish Script

Create a `publish.sh` script for convenience:
```bash
#!/bin/bash
# Save this as publish.sh and run with: ./publish.sh

echo "📦 Publishing Origami Extension..."

# Check if version was updated
echo "Current version in package.json:"
grep '"version"' package.json

read -p "Did you update the version? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Please update version in package.json first!"
    exit 1
fi

# Commit changes
git add -A
git commit -m "Publish update"

# Publish
echo "🚀 Publishing to marketplace..."
vsce publish -p YOUR_TOKEN_HERE

echo "✅ Done! Check https://marketplace.visualstudio.com/items?itemName=sayedabdulkarim.origami-vscode"
```

## Common Issues & Solutions

### Issue: "Cannot find module"
**Solution**: Run `npm install` first

### Issue: "Personal Access Token verification failed"
**Solution**: Token might be expired. Create a new one following the steps above.

### Issue: "Version already exists"
**Solution**: You forgot to increment the version in package.json

### Issue: Icon not visible in dark theme
**Solution**: Use a light/white version of the icon (icon-light.png)

## Version Numbering Guide

- **Patch** (0.0.X): Bug fixes, minor updates
- **Minor** (0.X.0): New features, significant updates
- **Major** (X.0.0): Breaking changes, major rewrites

## Files to Update for Each Release

1. ✅ `package.json` - Version number
2. ✅ `CHANGELOG.md` - Document changes
3. ✅ `README.md` - Update if features changed
4. ✅ Screenshots in `images/` - Update if UI changed

## Testing Before Publishing

1. Test locally with F5 in VS Code
2. Test all keyboard shortcuts
3. Verify status bar shows correctly
4. Check folding works for different file types
5. Ensure no console errors

---

**Publisher**: sayedabdulkarim
**Extension ID**: origami-vscode
**Marketplace URL**: https://marketplace.visualstudio.com/items?itemName=sayedabdulkarim.origami-vscode