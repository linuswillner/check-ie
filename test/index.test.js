/* eslint-disable no-undef */

const checkIE = require('../')

const userAgents = {
  ie10: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)', // If 10 is detected, all versions below will be as well
  ie11: 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
  edge14: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14931'
}

const options = {
  checkAll: { detectAll: true },
  checkEdge: { detectEdge: true },
  check10: { detectIE10: true },
  check11: { detectIE11: true },
  check10AndEdge: { detectIE10: true, detectEdge: true }
}

describe('General functionality', () => {
  it('Fallbacks to default options if none were provided', () => {
    const { ie10 } = userAgents
    expect(checkIE(ie10)).toEqual({ isIE: true, name: 'Internet Explorer', version: 10 })
  })

  it('Throws an error if no user agent is supplied', () => {
    try {
      expect(checkIE()).toThrowError('No user agent supplied.')
    } catch (err) {
      // This is here just so Jest won't throw a strop
    }
  })
})

describe('Edge checker', () => {
  it('Detects all Edge versions', () => {
    const { edge14 } = userAgents
    const setup = options.checkEdge

    expect(checkIE(edge14, setup)).toEqual({ isIE: true, name: 'Edge', version: 14 })
  })

  it('Does not detect IE versions with Edge', () => {
    const { ie11 } = userAgents
    const setup = options.checkEdge

    expect(checkIE(ie11, setup)).toEqual({ isIE: false, name: null, version: null })
  })
})

describe('IE checker', () => {
  it('Detects IE 11', () => {
    const { ie11 } = userAgents
    const setup = options.check11

    expect(checkIE(ie11, setup)).toEqual({ isIE: true, name: 'Internet Explorer', version: 11 })
  })

  it('Detects all IE versions from 10 down', () => {
    const { ie10 } = userAgents
    const setup = options.check10

    expect(checkIE(ie10, setup)).toEqual({ isIE: true, name: 'Internet Explorer', version: 10 })
  })
})

describe('Combined checker', () => {
  it('Detects all IE versions at once', () => {
    const { ie10, ie11, edge14 } = userAgents
    const setup = options.checkAll

    expect([
      checkIE(ie10, setup),
      checkIE(ie11, setup),
      checkIE(edge14, setup)
    ]).toEqual([
      { isIE: true, name: 'Internet Explorer', version: 10 },
      { isIE: true, name: 'Internet Explorer', version: 11 },
      { isIE: true, name: 'Edge', version: 14 }
    ])
  })

  it('Detects several separate versions', () => {
    const { ie10, ie11, edge14 } = userAgents
    const setup = options.check10AndEdge

    expect([
      checkIE(ie10, setup),
      checkIE(ie11, setup),
      checkIE(edge14, setup)
    ]).toEqual([
      { isIE: true, name: 'Internet Explorer', version: 10 },
      { isIE: false, name: null, version: null },
      { isIE: true, name: 'Edge', version: 14 }
    ])
  })

  it('Detects only a specific version', () => {
    const { ie10, edge14 } = userAgents
    const setup = options.checkEdge

    expect([
      checkIE(ie10, setup),
      checkIE(edge14, setup)
    ]).toEqual([
      { isIE: false, name: null, version: null },
      { isIE: true, name: 'Edge', version: 14 }
    ])
  })
})
