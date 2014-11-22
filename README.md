git-commit-parser [![Build Status](https://travis-ci.org/bendrucker/git-commit-parser.svg?branch=master)](https://travis-ci.org/bendrucker/git-commit-parser)
=================

Parse commit messages using a simplified version of the the [AngularJS style](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#).

## Install

```bash
$ npm install --save git-commit-parser
```

## API

#### `parser.parse(message)` -> `Object`

##### Input
```
feat(user): allow a user to log in

Allow a user to log in with username and password
```

#### Output:
```js
{
  header: {
    type: 'feat',
    scope: 'user',
    subject: 'allow a user to log in'
  },
  body: 'Allow a user to log in with username and password'
}
```

#### `header.toString()` -> `String`

Stringifies the header back to its original format
