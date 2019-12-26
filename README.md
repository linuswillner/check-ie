# check-ie

Check if a user browser is Internet Explorer based on the user agent string (In browser context [`window.navigator.userAgent`](https://developer.mozilla.org/en-US/docs/Web/API/NavigatorID/userAgent)).

## Usage

This module is very easy to use. Simply pass in a user agent string and get a result object in return.

```js
const checkIE = require('check-ie')

const ie11 = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'

checkIE(ie11) // { isIE: true, name: 'Internet Explorer', version: '11.0' }

const firefox = 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:64.0) Gecko/20100101 Firefox/64.0'

checkIE(firefox) // { isIE: false, name: '', version: '' }
```

## Options
Per default, this module will check for all Internet Explorer versions including Edge if no options are passed.
```js
checkIE(window.navigator.userAgent)
```

You may restrict what versions are detected like so:
```js
// Note: ie10 includes all versions including 10 and below

const options = {
  ie10: true,
  ie11: true,
  edge: false // Detects Internet Explorer, but not Edge
}

checkIE(window.navigator.userAgent)
```

Omitting a value counts as omission of detection, i.e. omitting `ie10` would be equivalent to setting `ie10` to `false`.

For example, if you only want to detect IE 11 and below, your options setup would look like this:
```js
const options = {
  ie10: true,
  ie11: true
}
```

## License

MIT © Linus Willner and Curtis Fowler.
