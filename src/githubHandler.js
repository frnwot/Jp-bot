const { Octokit } = require('@octokit/rest');
const voiceHandler = require('./voiceHandler');

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

module.exports = {
  downloadVoice: async (repoUrl, voiceName) => {
    try {
      // Extract owner/repo/path from URL
      const pathParts = repoUrl.replace('https://github.com/', '').split('/');
      const [owner, repo, , ...filePath] = pathParts;
      
      const { data } = await octokit.repos.getContent({
        owner,
        repo,
        path: filePath.join('/')
      });

      const fileBuffer = Buffer.from(data.content, 'base64');
      return voiceHandler.addVoice(voiceName, fileBuffer);
    } catch (error) {
      console.error('GitHub download error:', error);
      return false;
    }
  }
};
