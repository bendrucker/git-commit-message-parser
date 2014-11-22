git-commit-message-parser [![Build Status](https://travis-ci.org/bendrucker/git-commit-message-parser.svg?branch=master)](https://travis-ci.org/bendrucker/git-commit-message-parser)
=================

Parse commit messages from a plain string or a stream using a simplified version of the the [AngularJS style](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#).

## Install

```bash
$ npm install --save git-commit-message-parser
```

## API

#### `parser.parse(message)` -> `Object` / `Stream`

`message` can be a `String` or a `Stream`.

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
