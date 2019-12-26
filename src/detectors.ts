import extractIEVersion from './utils/extractIEVersion'
import { CheckIEResult } from './interfaces'

const notIE: CheckIEResult = { isIE: false, name: '', version: '' }

// IE 10 and below
export function detectMSIE (userAgent: string): CheckIEResult {
  const hasMsie = userAgent.includes('MSIE ')
  return hasMsie
    ? { isIE: true, name: 'Internet Explorer', version: extractIEVersion('10', userAgent) }
    : notIE
}

// IE 11
export function detectTrident (userAgent: string): CheckIEResult {
  const hasTrident = userAgent.includes('Trident/')
  const hasRevision = userAgent.includes('rv:')
  return hasTrident && hasRevision
    ? { isIE: true, name: 'Internet Explorer', version: extractIEVersion('11', userAgent) }
    : notIE
}

// Edge (IE 12+)
export function detectEdge (userAgent: string): CheckIEResult {
  const hasEdge = userAgent.includes('Edge')
  return hasEdge
    ? { isIE: true, name: 'Edge', version: extractIEVersion('edge', userAgent) }
    : notIE
}
