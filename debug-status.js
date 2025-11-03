// Quick debug script to check bot status
import https from 'https';

const RENDER_URL = process.env.RENDER_URL || 'https://your-app-name.onrender.com';

function checkStatus() {
    https.get(`${RENDER_URL}/health`, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
            const status = JSON.parse(data);
            console.log('🔍 Bot Status:', status);
            
            if (!status.whatsapp_connected) {
                console.log('❌ WhatsApp is disconnected!');
                console.log('💡 Check Render logs for QR code or connection errors');
            } else {
                console.log('✅ WhatsApp is connected and working');
            }
        });
    }).on('error', (err) => {
        console.log('❌ Cannot reach bot:', err.message);
    });
}

checkStatus();
setInterval(checkStatus, 30000); // Check every 30 seconds