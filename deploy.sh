#!/bin/bash

# WhatsApp Bot Deployment Script for Render

echo "🚀 Preparing WhatsApp Bot for deployment..."

# Check if required files exist
if [ ! -f "package.json" ]; then
    echo "❌ package.json not found!"
    exit 1
fi

if [ ! -f "bot.mjs" ]; then
    echo "❌ bot.mjs not found!"
    exit 1
fi

echo "✅ Required files found"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Test the bot (dry run)
echo "🧪 Testing bot configuration..."
timeout 10s npm start &
PID=$!
sleep 5

if ps -p $PID > /dev/null; then
    echo "✅ Bot starts successfully"
    kill $PID 2>/dev/null
else
    echo "❌ Bot failed to start"
    exit 1
fi

echo ""
echo "🎉 Bot is ready for deployment!"
echo ""
echo "📋 Next steps:"
echo "1. Push your code to GitHub"
echo "2. Connect your GitHub repo to Render"
echo "3. Use these settings:"
echo "   - Build Command: npm install"
echo "   - Start Command: npm start"
echo "   - Add persistent disk for auth_info_baileys"
echo "4. Check logs for QR code after deployment"
echo "5. Scan QR code with WhatsApp"
echo ""
echo "🔗 Health check will be available at: https://your-app.onrender.com/health"