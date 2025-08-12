# pajeet Bot - Messenger Voice Bot 🤖🎤

A Facebook Messenger bot that sends custom voice messages via commands, with GitHub integration for voice management.

![pajeet Bot Demo](https://example.com/pj-bot-demo.gif) *(Replace with actual demo image)*

## Features ✨

- Send custom voice messages via Messenger commands
- Add new voices directly from GitHub
- Simple command interface
- Automated deployment via GitHub Actions
- Voice library management

## Prerequisites 📋

- Node.js 20.x
- Facebook Developer Account
- Server with SSH access (for deployment)
- GitHub account

## Setup Guide 🛠️

### 1. Facebook App Configuration

1. Create a new app at [Facebook Developers](https://developers.facebook.com/)
2. Add "Messenger" product
3. Generate Page Access Token
4. Set up webhook with these values:
   - Callback URL: `https://yourdomain.com/webhook`
   - Verify Token: `your_verify_token` (match with config.json)
   - Subscribe to: `messages`

### 2. Server Configuration

```bash
# On your server
mkdir -p /var/www/pj-bot
cd /var/www/pj-bot
git clone https://github.com/yourusername/pj-bot.git .
npm install
npm install -g pm2
pm2 start server.js --name "pj-bot"
pm2 save
pm2 startup
```

### 3. GitHub Repository Setup

1. Add these secrets in your GitHub repo (Settings > Secrets > Actions):
   - `SSH_HOST` - Your server IP/hostname
   - `SSH_USER` - SSH username
   - `SSH_KEY` - Private SSH key
   - `SSH_PORT` - SSH port (usually 22)
   - `FB_PAGE_TOKEN` - From Facebook App
   - `FB_VERIFY_TOKEN` - Your verification token
   - `DEPLOY_DOMAIN` - Your domain name

### 4. Environment Configuration

Create `.env` file:
```env
PORT=3000
SERVER_URL=https://yourdomain.com
FB_PAGE_TOKEN=your_page_token
FB_VERIFY_TOKEN=your_verify_token
```

## Command Reference 💬

| Command | Description | Example |
|---------|-------------|---------|
| `!voice [name]` | Send specific voice | `!voice greeting` |
| `!voices` | List available voices | `!voices` |
| `!addvoice [name] [url]` | Add new voice (admin) | `!addvoice laugh https://.../laugh.mp3` |

## Voice Management 🎶

1. Add new voices:
   - Upload MP3 files to `public/voices/`
   - Add entry in `config/voices.json`
   ```json
   {
     "newvoice": "newvoice.mp3"
   }
   ```

2. Via GitHub:
   - Commit new voice files
   - The bot will auto-update on deployment

## Deployment Workflow 🚀

1. Push to `main` branch triggers:
   - Automated tests
   - SSH deployment to server
   - PM2 process restart

## Troubleshooting 🐛

**Webhook verification fails:**
- Verify tokens match in Facebook App and config.json
- Check server logs with `pm2 logs pj-bot`

**Voice not found:**
- Confirm file exists in `public/voices/`
- Check `voices.json` has correct mapping

## Contributing 🤝

1. Fork the repository
2. Create feature branch
3. Submit a pull request

## License 📄

MIT License - See [LICENSE](LICENSE) for details

---

