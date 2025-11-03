#!/bin/bash

echo "🚀 Preparing ShiftFlowUI for Vercel deployment..."

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf client/dist
rm -rf api/dist
rm -rf dist

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the client
echo "🏗️  Building client application..."
npm run build:client

# Type check
echo "🔍 Running type check..."
npm run check

echo "✅ Build completed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Make sure your environment variables are set in Vercel:"
echo "   - DATABASE_URL"
echo "   - SESSION_SECRET"
echo "   - NODE_ENV=production"
echo ""
echo "2. Deploy to Vercel:"
echo "   vercel --prod"
echo ""
echo "🎉 Your ShiftFlowUI is ready for deployment!"
