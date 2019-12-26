/* eslint-disable no-undef */

const checkIE = require('../src').default

const userAgents = {
  ie10: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)', // If 10 is detected, all versions below will be as well
  ie11: 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
  edge14: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/51.0.2704.79 Safari/537.36 Edge/14.14931'
}

const options = {
  check10: { ie10: true },
  check11: { ie11: true },
  checkEdge: { edge: true },
  check10AndEdge: { ie10: true, edge: true }
}

describe('General functionality', () => {
  it('Fallbacks to default options if none were provided', () => {
    const { ie10 } = userAgents
    expect(checkIE(ie10)).toEqual({ isIE: true, name: 'Internet Explorer', version: '10.0' })
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

    expect(checkIE(edge14, setup)).toEqual({ isIE: true, name: 'Edge', version: '14.14931' })
  })

  it('Does not detect IE versions with Edge', () => {
    const { ie11 } = userAgents
    const setup = options.checkEdge

    expect(checkIE(ie11, setup)).toEqual({ isIE: false, name: '', version: '' })
  })
})

describe('IE checker', () => {
  it('Detects IE 11', () => {
    const { ie11 } = userAgents
    const setup = options.check11

    expect(checkIE(ie11, setup)).toEqual({ isIE: true, name: 'Internet Explorer', version: '11.0' })
  })

  it('Detects all IE versions from 10 down', () => {
    const { ie10 } = userAgents
    const setup = options.check10

    expect(checkIE(ie10, setup)).toEqual({ isIE: true, name: 'Internet Explorer', version: '10.0' })
  })
})

describe('Combined checker', () => {
  it('Detects all IE versions at once', () => {
    const { ie10, ie11, edge14 } = userAgents

    expect([
      checkIE(ie10),
      checkIE(ie11),
      checkIE(edge14)
    ]).toEqual([
      { isIE: true, name: 'Internet Explorer', version: '10.0' },
      { isIE: true, name: 'Internet Explorer', version: '11.0' },
      { isIE: true, name: 'Edge', version: '14.14931' }
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
      { isIE: true, name: 'Internet Explorer', version: '10.0' },
      { isIE: false, name: '', version: '' },
      { isIE: true, name: 'Edge', version: '14.14931' }
    ])
  })

  it('Detects only a specific version', () => {
    const { ie10, edge14 } = userAgents
    const setup = options.checkEdge

    expect([
      checkIE(ie10, setup),
      checkIE(edge14, setup)
    ]).toEqual([
      { isIE: false, name: '', version: '' },
      { isIE: true, name: 'Edge', version: '14.14931' }
    ])
  })
})
