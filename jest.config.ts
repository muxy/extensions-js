import type { JestConfigWithTsJest } from 'ts-jest';

export default async (): Promise<JestConfigWithTsJest> => {
  return {
    // preset: 'ts-jest',
    transform: {
      '^.+\\.ts$': [
        'ts-jest',
        {
          diagnostics: false
        }
      ]
    },

    coveragePathIgnorePatterns: ['/node_modules/', '/libs/'],
    coverageThreshold: {
      global: {
        branches: 25,
        functions: 25,
        lines: 25,
        statements: 25
      }
    },
    collectCoverage: true,
    testEnvironment: 'jest-environment-jsdom-global',
    testRegex: '(/__tests__/.*)\\.ts$',
    moduleFileExtensions: ['ts', 'js'],
    verbose: true
  };
};
