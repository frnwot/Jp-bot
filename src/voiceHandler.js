const fs = require('fs');
const path = require('path');
const voices = require('../../config/voices.json');

module.exports = {
  getVoice: (voiceName) => {
    const voiceFile = voices[voiceName];
    if (!voiceFile) return null;
    
    const voicePath = path.join(__dirname, '../../public/voices', voiceFile);
    if (!fs.existsSync(voicePath)) return null;
    
    return {
      path: voicePath,
      url: `${process.env.SERVER_URL}/voices/${voiceFile}`
    };
  },

  listVoices: () => Object.keys(voices),

  addVoice: (voiceName, fileBuffer) => {
    const fileName = `${voiceName}.mp3`;
    const voicePath = path.join(__dirname, '../../public/voices', fileName);
    
    fs.writeFileSync(voicePath, fileBuffer);
    voices[voiceName] = fileName;
    
    fs.writeFileSync(
      path.join(__dirname, '../../config/voices.json'),
      JSON.stringify(voices, null, 2)
    );
    
    return true;
  }
};
