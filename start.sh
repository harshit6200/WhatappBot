#!/bin/bash

# Start both the bot and keep-alive service
echo "Starting WhatsApp Bot with 24/7 keep-alive..."

# Start the bot in background
node bot.mjs &
BOT_PID=$!

# Start keep-alive service in background  
node keep-alive.js &
KEEPALIVE_PID=$!

echo "Bot PID: $BOT_PID"
echo "Keep-alive PID: $KEEPALIVE_PID"

# Wait for both processes
wait $BOT_PID $KEEPALIVE_PID