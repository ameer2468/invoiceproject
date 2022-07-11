// jest.config.js
const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});
process.env = Object.assign(process.env, {
  NEXT_PUBLIC_API_URL:
    'https://7vy6w209dc.execute-api.us-east-1.amazonaws.com/dev',
  NEXT_PUBLIC_API_KEY: 'APdaQ9aP7392W2yUFOeS16DJlGnoU7le67O9BbX5',
});
// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  // if using TypeScript with a baseUrl set to the root directory then you need the below for alias' to work
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testEnvironment: 'jest-environment-jsdom',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
