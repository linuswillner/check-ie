# v2.0.0

Complete rewrite of the project to TypeScript.  
Options have been reworked; see below.  
Return value types for the `name` and `version` properties have changed; see below.

## BREAKING CHANGES

### Option names

Previously, in order to detect all versions including Edge, one would pass no options (`undefined`) or `{ detectAll: true }` to the main function. The `detectAll` option has been removed as redundant in v2.0.0.

The options for detecting different operating systems were also needlessly verbose, so they have been shortened as follows.

```diff
- detectIE10: true
- detectIE11: true
- detectEdge: true
+ ie10: true
+ ie11: true
+ edge: true
```

All behaviour of the options remains unchanged; in other words, `ie10` will still detect Internet Explorer 10 and below, `ie11` will still detect Internet Explorer 11 and `edge` will still detect all versions of Edge.

### Return value types for browser name and version

Previously, the return value from check-ie would be `{ isIE: false, name: null, version: null }` if the user agent did not pass checks. However, successful results would yield a string for `name` and a number for `version`. This causes needless type confusion, and in the case of the former, prevents return of the exact version number. 

In v2.0.0, the `name` and `version` fields will always yield strings no matter of the detection result. In an unsuccessful check, the strings will simply be empty. Users using the `!` operator to check the results will not be affected at all, but users with strict return value checks will need to update them.

# v1.0.3

Linting fixes.

# v1.0.2

Development dependency updates.

# v1.0.1

Improved Internet Explorer 11 detection.

# v1.0.0

Initial release of check-ie.
