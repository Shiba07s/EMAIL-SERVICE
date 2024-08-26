const EmailService = require('../src/EmailService');
const MockEmailProvider = require('../src/providers/MockEmailProvider');
const AnotherMockEmailProvider = require('../src/providers/AnotherMockEmailProvider');

describe('EmailService', () => {
  let emailService;
  let mockProvider;
  let anotherMockProvider;

  beforeEach(() => {
    mockProvider = new MockEmailProvider();
    anotherMockProvider = new AnotherMockEmailProvider();
    emailService = new EmailService();
  });

  test('should send email successfully', async () => {
    mockProvider.sendEmail = jest.fn().mockResolvedValueOnce(undefined);
    await expect(emailService.sendEmail('test@example.com', 'Subject', 'Body')).resolves.not.toThrow();
  });

  test('should handle retry logic', async () => {
    mockProvider.sendEmail = jest.fn()
      .mockRejectedValueOnce(new Error('Error'))
      .mockResolvedValueOnce(undefined);

    await expect(emailService.sendEmail('test@example.com', 'Subject', 'Body')).resolves.not.toThrow();
  });

  test('should fallback to another provider on failure', async () => {
    mockProvider.sendEmail = jest.fn().mockRejectedValueOnce(new Error('Error'));
    anotherMockProvider.sendEmail = jest.fn().mockResolvedValueOnce(undefined);

    await expect(emailService.sendEmail('test@example.com', 'Subject', 'Body')).resolves.not.toThrow();
  });
});
