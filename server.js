require('dotenv').config();
const express = require('express');
const bot = require('./src/bot');

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Webhook endpoints
app.get('/webhook', bot.verifyWebhook);
app.post('/webhook', bot.handleWebhook);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PJ Bot running on port ${PORT}`);
});
