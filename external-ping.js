// External ping service - run this on a different free service like Vercel/Netlify
const https = require('https');

const RENDER_URL = process.env.RENDER_URL || 'https://your-app-name.onrender.com';

function pingService() {
    const url = `${RENDER_URL}/health`;
    
    https.get(url, (res) => {
        console.log(`✅ Ping successful: ${res.statusCode} at ${new Date().toISOString()}`);
    }).on('error', (err) => {
        console.log(`❌ Ping failed: ${err.message}`);
    });
}

// Ping every 10 minutes
setInterval(pingService, 10 * 60 * 1000);
pingService(); // Initial ping

console.log('🔄 External ping service started');