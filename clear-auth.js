#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

const authDir = path.join(process.cwd(), 'auth_info_baileys');

console.log('🧹 Clearing WhatsApp authentication data...');

try {
    if (fs.existsSync(authDir)) {
        fs.rmSync(authDir, { recursive: true, force: true });
        console.log('✅ Authentication data cleared successfully!');
        console.log('📱 You can now restart the bot and scan a fresh QR code.');
    } else {
        console.log('ℹ️ No authentication data found to clear.');
    }
} catch (error) {
    console.error('❌ Error clearing auth data:', error.message);
    process.exit(1);
}