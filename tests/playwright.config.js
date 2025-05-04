module.exports = {
    testDir: './tests',
    use: {
      baseURL: 'http://localhost:3000',
      browserName: 'chromium',
      headless: true,
    },
    webServer: {
      command: 'cd frontend && npm run start',
      port: 3000,
      reuseExistingServer: !process.env.CI,
    },
  };