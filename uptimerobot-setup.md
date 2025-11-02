# External Monitoring Setup (CRITICAL for 24/7 uptime)

## UptimeRobot Setup (FREE - RECOMMENDED)

1. **Sign up at**: https://uptimerobot.com/
2. **Add New Monitor**:
   - Monitor Type: HTTP(s)
   - Friendly Name: WhatsApp Food Bot
   - URL: `https://your-app-name.onrender.com/health`
   - Monitoring Interval: 5 minutes
   - Monitor Timeout: 30 seconds

3. **Alert Contacts** (Optional):
   - Add your email for downtime alerts

## Alternative Free Services:

### 1. Pingdom (Free Plan)
- URL: https://www.pingdom.com/
- 1 monitor free
- 1-minute intervals

### 2. StatusCake (Free Plan)  
- URL: https://www.statuscake.com/
- 10 monitors free
- 5-minute intervals

### 3. Freshping (Free Plan)
- URL: https://www.freshworks.com/website-monitoring/
- 50 monitors free
- 1-minute intervals

## Setup Instructions:

1. Deploy your bot to Render first
2. Get your Render URL (e.g., `https://whatsapp-food-bot-xyz.onrender.com`)
3. Add `/health` to the end: `https://whatsapp-food-bot-xyz.onrender.com/health`
4. Set up monitoring with any of the above services
5. Set interval to 5-10 minutes (don't go below 5 minutes)

## Why This Works:
- External services ping your bot every few minutes
- Prevents Render from detecting "inactivity"
- Keeps your bot alive 24/7 even when no WhatsApp messages come
- Free tier limitations are bypassed

## IMPORTANT:
Without external monitoring, Render's free tier WILL put your service to sleep after 15 minutes of no HTTP requests, regardless of internal keep-alive mechanisms.