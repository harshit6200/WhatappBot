const http = require('http');
const https = require('https');

// Keep-alive service to prevent Render from sleeping
class KeepAlive {
    constructor(url, interval = 14 * 60 * 1000) { // 14 minutes
        this.url = url;
        this.interval = interval;
        this.timer = null;
    }

    start() {
        if (this.timer) return;
        
        console.log(`🔄 Keep-alive started: pinging ${this.url} every ${this.interval/1000/60} minutes`);
        
        this.timer = setInterval(() => {
            this.ping();
        }, this.interval);

        // Initial ping after 1 minute
        setTimeout(() => this.ping(), 60000);
    }

    ping() {
        const protocol = this.url.startsWith('https:') ? https : http;
        
        const req = protocol.get(this.url, (res) => {
            console.log(`✅ Keep-alive ping: ${res.statusCode} at ${new Date().toISOString()}`);
        });

        req.on('error', (err) => {
            console.log(`❌ Keep-alive ping failed: ${err.message}`);
        });

        req.setTimeout(10000, () => {
            req.destroy();
            console.log('⏰ Keep-alive ping timeout');
        });
    }

    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            console.log('🛑 Keep-alive stopped');
        }
    }
}

module.exports = KeepAlive;