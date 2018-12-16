const checks = require('./checks')

/**
 * Check if user browser is Edge 13 or below.
 * @param {String} userAgent User agent for evaluation.
 * @param {String} options Options object. If omitted, checks for all Internet Explorer versions starting from Edge 13.
 * @see https://github.com/js-rcon/check-ie#readme
 */
function checkIE (userAgent, options) {
  if (!userAgent) throw new Error('No user agent supplied.')
  else {
    if (!options) options = { detectAll: true }

    for (let c in checks) {
      const result = checks[c](userAgent)
      if (options.detectAll || options[c]) return result
    }
  }
}

module.exports = checkIE
