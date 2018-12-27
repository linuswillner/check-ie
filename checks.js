const notIE = { isIE: false, name: null, version: null }

// IE 10 and below
function detectIE10 (userAgent) {
  const hasMsie = userAgent.includes('MSIE ')
  return hasMsie
    ? { isIE: true, name: 'Internet Explorer', version: getVersion('10', userAgent) }
    : notIE
}

// IE 11
function detectIE11 (userAgent) {
  const hasTrident = userAgent.includes('Trident/')
  const hasRevision = userAgent.includes('rv:')
  return hasTrident && hasRevision
    ? { isIE: true, name: 'Internet Explorer', version: getVersion('11', userAgent) }
    : notIE
}

// Edge (IE 12+)
function detectEdge (userAgent) {
  const hasEdge = userAgent.includes('Edge')
  return hasEdge
    ? { isIE: true, name: 'Edge', version: getVersion('edge', userAgent) }
    : notIE
}

/**
 * Get Internet Explorer version from user agent
 * @param {String} ie Internet Explorer version to extract ('edge' || '11' || '10')
 * @param {String} userAgent User agent string
 */
function getVersion (ie, userAgent) {
  switch (ie) {
    case 'edge':
      const edgeRegex = /Edge\/(\d*)\.\d*/g
      return +edgeRegex.exec(userAgent)[1]
    case '11':
      const revisionRegex = /rv:(\d*)\.\d*/g
      return +revisionRegex.exec(userAgent)[1]
    case '10':
      const msieRegex = /MSIE (\d*)\.\d*/g
      return +msieRegex.exec(userAgent)[1]
  }
}

module.exports = {
  detectIE10: detectIE10,
  detectIE11: detectIE11,
  detectEdge: detectEdge
}
