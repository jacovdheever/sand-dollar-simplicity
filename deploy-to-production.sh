#!/bin/bash

# Sand Dollar Design - Deploy to Production Script
# This script merges Test branch to main and deploys to production

echo "🚀 Deploying Sand Dollar Design to Production..."

# Ensure we're on Test branch
echo "🔄 Ensuring we're on Test branch..."
current_branch=$(git branch --show-current)
if [ "$current_branch" != "Test" ]; then
    echo "❌ You must be on Test branch to deploy. Current branch: $current_branch"
    echo "   Run: git checkout Test"
    exit 1
fi
echo "✅ On Test branch"

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ You have uncommitted changes. Please commit them first:"
    git status --short
    exit 1
fi
echo "✅ No uncommitted changes"

# Pull latest Test branch
echo "🔄 Pulling latest Test branch..."
git pull origin Test
if [ $? -ne 0 ]; then
    echo "❌ Failed to pull Test branch"
    exit 1
fi
echo "✅ Test branch up to date"

# Switch to main branch
echo "🔄 Switching to main branch..."
git checkout main
if [ $? -ne 0 ]; then
    echo "❌ Failed to switch to main branch"
    exit 1
fi
echo "✅ On main branch"

# Pull latest main branch
echo "🔄 Pulling latest main branch..."
git pull origin main
if [ $? -ne 0 ]; then
    echo "❌ Failed to pull main branch"
    exit 1
fi
echo "✅ Main branch up to date"

# Merge Test into main
echo "🔄 Merging Test branch into main..."
git merge Test
if [ $? -ne 0 ]; then
    echo "❌ Failed to merge Test branch into main"
    echo "   Please resolve conflicts manually and try again"
    exit 1
fi
echo "✅ Test branch merged into main"

# Push to main (triggers GitHub Pages deployment)
echo "🚀 Pushing to main branch (triggers production deployment)..."
git push origin main
if [ $? -ne 0 ]; then
    echo "❌ Failed to push to main branch"
    exit 1
fi
echo "✅ Pushed to main branch"

# Switch back to Test branch
echo "🔄 Switching back to Test branch..."
git checkout Test
if [ $? -ne 0 ]; then
    echo "❌ Failed to switch back to Test branch"
    exit 1
fi
echo "✅ Back on Test branch"

echo ""
echo "🎉 Deployment Complete!"
echo "   - Production site: https://sanddollardesign.co.za"
echo "   - GitHub Pages: https://jacovdheever.github.io/sand-dollar-simplicity"
echo "   - Deployment may take 2-5 minutes to complete"
echo ""
echo "✅ You're back on Test branch for continued development"
