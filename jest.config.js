const { defaults } = require('jest-config')

module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  setupFiles: [
    '<rootDir>/tests/setup.js'
  ],
  moduleFileExtensions: [
    ...defaults.moduleFileExtensions,
    'vue'
  ],
  transform: {
    '.*\\.(vue)$': 'vue-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  verbose: false
}
