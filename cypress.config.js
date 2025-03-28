const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultBrowser: 'electron',
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})
