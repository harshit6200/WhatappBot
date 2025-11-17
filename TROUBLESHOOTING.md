# WhatsApp Bot Troubleshooting Guide

## "Unable to connect, try again" after QR scan

This is the most common issue. Here are the solutions:

### Solution 1: Clear Auth Data (Most Effective)
```bash
npm run clear-auth
npm start
```

### Solution 2: Check for Multiple Instances
- Make sure only ONE instance of the bot is running
- Check Render dashboard for duplicate deployments
- Stop any local instances if running on cloud

### Solution 3: Restart Service
1. Go to Render dashboard
2. Click on your service
3. Click "Manual Deploy" → "Clear build cache & deploy"

### Solution 4: Check Logs
1. Go to Render dashboard → Logs
2. Look for specific error messages:
   - `Stream Errored (conflict)` → Multiple instances running
   - `401 Unauthorized` → Auth data corrupted
   - `Connection timeout` → Network issues

## QR Code Not Appearing

### Check Logs
- QR code appears as ASCII art in Render logs
- Look for the bordered QR code section

### If QR Still Missing
```bash
npm run clear-auth
npm start
```

## Connection Keeps Dropping

### Check Internet Connection
- Verify WhatsApp Web works in browser
- Test from same network/region as deployment

### Persistent Issues
1. Clear auth data
2. Redeploy service
3. Scan fresh QR code

## Bot Not Responding to Messages

### Verify Connection
- Check `/health` endpoint shows `whatsapp_connected: true`
- Look for "WhatsApp connected successfully!" in logs

### Test Commands
- Send "hi" or "menu" to trigger response
- Check logs for message processing

## Emergency Reset

If nothing works:
1. `npm run clear-auth`
2. Delete and redeploy service on Render
3. Scan fresh QR code

## Prevention Tips

1. **Never run multiple instances** - causes stream conflicts
2. **Don't commit auth_info_baileys folder** - causes auth issues
3. **Use persistent disk** - prevents auth loss on restarts
4. **Monitor logs regularly** - catch issues early

## Getting Help

Include these details when asking for help:
- Error message from logs
- Steps you've already tried
- Whether it worked before
- Any recent changes made