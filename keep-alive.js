// Keep-alive service to prevent Render from sleeping
const http = require('http');

const RENDER_URL = process.env.RENDER_EXTERNAL_URL || 'http://localhost:3000';

function pingService() {
    const url = `${RENDER_URL}/health`;
    
    http.get(url, (res) => {
        console.log(`Keep-alive ping: ${res.statusCode} at ${new Date().toISOString()}`);
    }).on('error', (err) => {
        console.log('Keep-alive ping failed:', err.message);
    });
}

// Ping every 14 minutes (Render free tier sleeps after 15 minutes of inactivity)
setInterval(pingService, 14 * 60 * 1000);

console.log('Keep-alive service started - pinging every 14 minutes');