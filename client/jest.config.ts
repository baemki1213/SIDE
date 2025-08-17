const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  setupFiles: ["<rootDir>/jest.polyfills.ts"],
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
  },
  testEnvironmentOptions: {
    customExportConditions: [""],
  },
};

module.exports = createJestConfig(customJestConfig);
