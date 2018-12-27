# check-ie

Check if a user browser is Internet Explorer based on the user agent string (In browser context `window.navigator.userAgent`).

## Usage

This module is very easy to use. Simply pass in a user agent string and get a result object in return.

```js
const checkIE = require('check-ie')

const ie11 = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'

checkIE(ie11) // { isIE: true, name: 'Internet Explorer', version: 11 }

const firefox = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0'

checkIE(firefox) // { isIE: false, name: null, version: null }
```

## Options
Per default, this module will check for all Internet Explorer versions including latest Edge. This is equivalent to the following options setup.
```js
const options = {
  detectAll: true
}
```

You may restrict what versions are detected like so:
```js
// Note: detectIE10 includes all versions from 10 down

const options = {
  detectIE10: true,
  detectIE11: true,
  detectEdge: true
}
```

Omitting a value counts as omission of detection, i.e. omitting `detectIE10` would be equivalent to setting `detectIE10` to `false`.

For example, if you only want to detect IE11 and below, your options setup would look like this:
```js
const options = {
  detectIE10: true,
  detectIE11: true
}
```

## License

MIT © Linus Willner and Curtis Fowler.
