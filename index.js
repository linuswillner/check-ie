const checks = require('./checks')

/**
 * Check if user browser is latest Edge or below.
 * @param {String} userAgent User agent for evaluation.
 * @param {String} options Options object. If omitted, checks for all Internet Explorer versions starting from latest Edge.
 * @see https://github.com/js-rcon/check-ie#readme
 */
function checkIE (userAgent, options) {
  const notIE = { isIE: false, name: null, version: null }

  if (!userAgent) throw new Error('No user agent supplied.')
  else {
    if (!options) options = { detectAll: true }

    for (const c in checks) {
      if (!options.detectAll && !options[c]) continue

      const result = checks[c](userAgent)
      if (result.isIE) return result
    }

    return notIE
  }
}

module.exports = checkIE
