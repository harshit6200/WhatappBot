# WhatsApp Food Ordering Bot

A WhatsApp bot for food ordering built with Baileys library.

## Features

- Interactive menu browsing
- Shopping cart functionality
- UPI and Cash on Delivery payment options
- Location-based delivery
- Order confirmation system

## Deployment on Render

### Method 1: Using GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy on Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Use these settings:
     - **Name:** whatsapp-order-bot
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Starter (Free)

3. **Add Persistent Disk (Important):**
   - In your service settings, go to "Disks"
   - Add a new disk:
     - **Name:** auth-data
     - **Mount Path:** `/opt/render/project/src/auth_info_baileys`
     - **Size:** 1GB

### Method 2: Using Docker

1. **Build and deploy using Dockerfile:**
   - Render will automatically detect the Dockerfile
   - Follow the same steps as Method 1

### Method 3: Using render.yaml

1. **Use the included render.yaml:**
   - The repository includes a `render.yaml` file
   - Render will automatically use this configuration

## First Time Setup

1. **After deployment, check the logs:**
   - Go to your service dashboard on Render
   - Click on "Logs"
   - Look for the QR code in the logs

2. **Scan the QR code:**
   - Open WhatsApp on your phone
   - Go to Settings → Linked Devices
   - Scan the QR code from the logs

3. **Verify connection:**
   - Check the logs for "Connection opened successfully!"
   - Visit your service URL to see the health check

## Important Notes

### Authentication Persistence
- The bot uses persistent disk storage for authentication
- Your WhatsApp session will be saved between deployments
- **Never commit the `auth_info_baileys` folder to Git**

### Preventing Service Sleep
- The bot includes a health check endpoint at `/health`
- This prevents Render's free tier from sleeping
- You can also set up external monitoring services

### Troubleshooting Connection Issues

1. **Stream Conflict Error:**
   ```
   Connection closed due to: Stream Errored (conflict)
   ```
   - This happens when multiple instances try to connect with the same session
   - **Solution:** Clear auth data and restart:
     ```bash
     npm run clear-auth
     npm start
     ```
   - Make sure only one instance is running
   - Check Render logs to ensure no duplicate deployments

2. **Connection Timeout:**
   - Check your internet connection
   - Verify WhatsApp Web is accessible
   - Try restarting the service

3. **QR Code Not Appearing:**
   - Check the logs in Render dashboard
   - The QR code appears as ASCII art in the logs
   - Make sure to scan it quickly (expires in ~20 seconds)

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the bot:**
   ```bash
   npm start
   ```

3. **Scan QR code:**
   - QR code will appear in your terminal
   - Scan with WhatsApp to connect

## Configuration

Edit the bot configuration in `bot.mjs`:

```javascript
const SHOP_NAME = "Your Shop Name";
const UPI_ID = "your-upi-id@bank";
const CURRENCY = "INR";
```

## Menu Management

The menu is defined in the `menu` object in `bot.mjs`. You can:
- Add new categories
- Modify existing items
- Update prices
- Add/remove items

## Support

If you encounter issues:
1. Check the Render logs for error messages
2. Verify your authentication is working
3. Ensure persistent disk is properly configured
4. Make sure WhatsApp Web is accessible from your deployment region

## Security Notes

- Never share your authentication files
- Keep your UPI ID secure
- Monitor your bot for unusual activity
- Use environment variables for sensitive data in production