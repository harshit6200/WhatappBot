#!/bin/bash

# Render startup script for WhatsApp Bot
echo "🚀 Starting WhatsApp Food Ordering Bot..."

# Set environment variables for better performance
export NODE_ENV=production
export UV_THREADPOOL_SIZE=128

# Start the bot with PM2 for process management (if available)
if command -v pm2 &> /dev/null; then
    echo "📦 Using PM2 for process management"
    pm2 start bot.mjs --name "whatsapp-bot" --no-daemon
else
    echo "🔧 Starting with Node.js directly"
    node bot.mjs
fi