type IEVariant = 'edge' | '11' | '10'

/**
 * Get Internet Explorer version from user agent
 * @param {String} variant Internet Explorer version to extract ('edge' || '11' || '10')
 * @param {String} userAgent User agent string
 */
export default function extractIEVersion (variant: IEVariant, userAgent: string): string {
  const edgeRegex = /Edge\/(\d*\.\d*)/g
  const revisionRegex = /rv:(\d*\.\d*)/g
  const msieRegex = /MSIE (\d*\.\d*)/g

  let version

  switch (variant) {
    case 'edge':
      version = edgeRegex.exec(userAgent)
      break
    case '11':
      version = revisionRegex.exec(userAgent)
      break
    case '10':
      version = msieRegex.exec(userAgent)
      break
  }

  return version !== null ? version[1] : ''
}
