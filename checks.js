const notIE = { isIE: false, version: null }

// IE 10 and below
function detectIE10 (userAgent) {
  const hasMsie = userAgent.includes('MSIE ')
  return hasMsie
    ? { isIE: true, version: _getVersion('10', userAgent) }
    : notIE
}

// IE 11
function detectIE11 (userAgent) {
  const hasTrident = userAgent.includes('Trident/')
  return hasTrident
    ? { isIE: true, version: _getVersion('11', userAgent) }
    : notIE
}

// Edge (IE 12+)
function detectEdge (userAgent) {
  const hasEdge = userAgent.includes('Edge')
  return hasEdge
    ? { isIE: true, version: _getVersion('edge', userAgent) }
    : notIE
}

/**
 * Get Internet Explorer version from user agent
 * @param {String} ie Internet Explorer version to extract ('edge' || '11' || '10')
 * @param {String} userAgent User agent string
 */
function _getVersion (ie, userAgent) {
  const parseVersion = versionIndex => userAgent.indexOf('.', versionIndex)

  switch (ie) {
    case 'edge':
      const edgeIndex = userAgent.indexOf('Edge/')
      return +userAgent.substring(edgeIndex + 5, parseVersion(edgeIndex), 10)
    case '11':
      const revisionIndex = userAgent.indexOf('rv:')
      return +userAgent.substring(revisionIndex + 3, parseVersion(revisionIndex), 10)
    case '10':
      const msieIndex = userAgent.indexOf('MSIE ')
      return +userAgent.substring(msieIndex + 5, parseVersion(msieIndex), 10)
  }
}

module.exports = {
  detectIE10: detectIE10,
  detectIE11: detectIE11,
  detectEdge: detectEdge
}
