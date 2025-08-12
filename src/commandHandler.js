const voiceHandler = require('./voiceHandler');
const { callSendAPI } = require('./utils');

function handleMessage(event) {
  const senderId = event.sender.id;
  const message = event.message.text.toLowerCase().trim();

  if (message.startsWith('!voice ')) {
    const voiceName = message.split(' ')[1];
    const voice = voiceHandler.getVoice(voiceName);
    
    if (voice) {
      callSendAPI({
        recipient: { id: senderId },
        message: {
          attachment: {
            type: "audio",
            payload: {
              url: voice.url,
              is_reusable: true
            }
          }
        }
      });
    } else {
      callSendAPI({
        recipient: { id: senderId },
        message: { text: `Voice "${voiceName}" not found. Use !voices to list available voices.` }
      });
    }
  }
  else if (message === '!voices') {
    const voiceList = voiceHandler.listVoices().join('\n• ');
    callSendAPI({
      recipient: { id: senderId },
      message: { text: `Available voices:\n• ${voiceList}` }
    });
  }
}

module.exports = { handleMessage };
