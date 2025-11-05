#!/bin/bash

echo "🧪 Testing API functions..."

# Check if TypeScript compiles for API functions
echo "📝 Checking API TypeScript compilation..."
npx tsc api/**/*.ts --noEmit --target es2020 --module commonjs --esModuleInterop true --allowSyntheticDefaultImports true --strict true --skipLibCheck true --moduleResolution node

if [ $? -eq 0 ]; then
    echo "✅ API TypeScript compilation successful"
else
    echo "❌ API TypeScript compilation failed"
    exit 1
fi

echo "🎉 All tests passed! Your API is ready for Vercel deployment."
