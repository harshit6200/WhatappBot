#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const authDir = 'auth_info_baileys';
const lockFile = 'bot.lock';

console.log('🧹 Clearing WhatsApp authentication data...');

// Remove lock file
if (fs.existsSync(lockFile)) {
    fs.unlinkSync(lockFile);
    console.log('✅ Removed lock file');
}

// Remove auth directory
if (fs.existsSync(authDir)) {
    fs.rmSync(authDir, { recursive: true, force: true });
    console.log('✅ Removed auth directory');
}

console.log('🎉 Authentication data cleared!');
console.log('💡 You can now run the bot and scan a new QR code.');