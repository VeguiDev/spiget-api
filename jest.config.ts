/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/configuration
 */

export default {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: [
    "./src/test"
  ],
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose:true,
  coverageReporters: ["json-summary"]
};
