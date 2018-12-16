/* eslint-disable no-undef */

const checkIE = require('../')

const userAgents = {
  ie10: 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)', // If 10 is detected, all versions below will be as well
  ie11: 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko',
  edge12: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0',
  edge13: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586'
}

const options = {
  checkAll: { detectAll: true },
  checkEdge: { detectEdge: true },
  check10: { detectIE10: true },
  check11: { detectIE11: true }
}

describe('General functionality', () => {
  it('Fallbacks to default options if none were provided', () => {
    const { ie10 } = userAgents
    expect(checkIE(ie10)).toEqual({ isIE: true, version: 10 })
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
    const { edge13, edge12 } = userAgents
    const setup = options.checkEdge

    expect(checkIE(edge13, setup)).toEqual({ isIE: true, version: 13 })
    expect(checkIE(edge12, setup)).toEqual({ isIE: true, version: 12 })
  })

  it('Does not detect IE versions with Edge', () => {
    const { ie11 } = userAgents
    const setup = options.checkEdge

    expect(checkIE(ie11, setup)).toEqual({ isIE: false, version: null })
  })
})

describe('IE checker', () => {
  it('Detects IE 11', () => {
    const { ie11 } = userAgents
    const setup = options.check11

    expect(checkIE(ie11, setup)).toEqual({ isIE: true, version: 11 })
  })

  it('Detects all IE versions from 10 down', () => {
    const { ie10 } = userAgents
    const setup = options.check10

    expect(checkIE(ie10, setup)).toEqual({ isIE: true, version: 10 })
  })
})
