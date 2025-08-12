const { verifyWebhook } = require('../src/bot');

describe('PJ Bot Tests', () => {
  test('Webhook Verification', () => {
    const mockReq = {
      query: {
        'hub.mode': 'subscribe',
        'hub.verify_token': 'correct_token',
        'hub.challenge': 'test_challenge'
      }
    };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    
    verifyWebhook(mockReq, mockRes);
    expect(mockRes.send).toHaveBeenCalledWith('test_challenge');
  });
});
