export interface CheckIEOptions {
  detectIE10?: boolean
  detectIE11?: boolean
  detectEdge?: boolean
  [index: string]: boolean | undefined
}

export interface CheckIEResult {
  isIE: boolean
  name: string
  version: string
}

export interface CheckIEDetectors {
  ie10: (userAgent: string) => CheckIEResult
  ie11: (userAgent: string) => CheckIEResult
  edge: (userAgent: string) => CheckIEResult
  [index: string]: (userAgent: string) => CheckIEResult
}
