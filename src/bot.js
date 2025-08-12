const { handleMessage } = require('./commandHandler');
const config = require('../config/config.json');

module.exports = {
  verifyWebhook: (req, res) => {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === config.verifyToken) {
      console.log("Webhook verified");
      res.status(200).send(req.query['hub.challenge']);
    } else {
      console.error("Failed verification");
      res.sendStatus(403);
    }
  },

  handleWebhook: (req, res) => {
    if (req.body.object === 'page') {
      req.body.entry.forEach(entry => {
        entry.messaging.forEach(event => {
          if (event.message) handleMessage(event);
        });
      });
      res.status(200).end();
    }
  }
};
