# check-ie

Check if a user browser is Internet Explorer based on the user agent.

## Usage

This module is very easy to use. Simply pass in a user agent string and get a result object in return.

```js
const checkIE = require('check-ie')

// From window.navigator.userAgent
const userAgent = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'

checkIE(userAgent) // { isIE: true, version: 11 }
```

Per default, this module will check for all Internet Explorer versions including Edge.

## Options

The default option setup is as follows:
```js
const options = {
  detectAll: true
}
```

You may restrict up to what version to check in the options object, like so:
```js
const options = {
  detectIE10: true
}
```
