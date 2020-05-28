import { detectMSIE, detectTrident, detectEdge } from './detectors'
import { CheckIEOptions, CheckIEResult, CheckIEDetectors } from './interfaces'

const detectors: CheckIEDetectors = {
  ie10: detectMSIE,
  ie11: detectTrident,
  edge: detectEdge
}

/**
 * Check if user browser is latest Edge or below.
 * @param {String} userAgent User agent for evaluation.
 * @param {String} options Options object. If omitted, checks for all Internet Explorer versions starting from latest Edge.
 * @see https://github.com/linuswillner/check-ie#readme
 */
export default function checkIE (userAgent: string, options: CheckIEOptions): CheckIEResult {
  const notIE: CheckIEResult = { isIE: false, name: '', version: '' }

  if (!userAgent) throw new Error('No user agent supplied.')
  else {
    for (const check in detectors) {
      if (options && !options[check]) continue // Not checking for this version, skip

      const result = detectors[check](userAgent)
      if (result.isIE) return result
    }

    return notIE
  }
}
