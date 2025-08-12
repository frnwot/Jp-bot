const request = require('request');
const config = require('../config/config.json');

module.exports = {
  callSendAPI: (messageData) => {
    request({
      uri: 'https://graph.facebook.com/v19.0/me/messages',
      qs: { access_token: config.accessToken },
      method: 'POST',
      json: messageData
    }, (err, res, body) => {
      if (err) {
        console.error("Error sending message:", err);
      } else if (res.body.error) {
        console.error("Error:", res.body.error);
      }
    });
  }
};
