const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@pages/(.*)$": "<rootDir>/src/pages/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@public/(.*)$": "<rootDir>/public/$1",
  },
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "babel-jest",
    "^.+\\.svg$": "jest-transformer-svg",
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
