'use strict';

var util    = require('util');
var split   = require('split');
var through = require('through2');

// https://github.com/angular/angular.js/blob/master/validate-commit-msg.js#L19
var pattern = /^(?:fixup!\s*)?(\w*)(\(([\w\$\.\*/-]*)\))?\: (.*)$/;

function header (line) {
  var matches = pattern.exec(line);
  return {
    type: matches[1],
    scope: matches[3],
    subject: matches[4],
    toString: function () {
      return util.format('%s(%s): %s', this.type, this.scope, this.subject);
    }
  };
}

function parseStream (messageStream) {
  var i = 0;
  var parsed = {
    body: ''
  };

  function transform (chunk, enc, callback) {
    if (i === 0) {
      parsed.header = header(chunk);
    }
    else if (i !== 1) {
      parsed.body += chunk + '\n';
    }
    i++;
    callback();
  }

  function flush (callback) {
    this.push(parsed);
    callback();
  }

  return messageStream
    .pipe(split())
    .pipe(through.obj(transform, flush));
}

function parseString (message) {
  var lines = message.split('\n');
  return {
    header: header(lines.shift()),
    body: lines.slice(1, lines.length).join('\n')
  };
}

exports.parse = function (message) {
  return typeof message.pipe === 'function' ? parseStream(message) : parseString(message);
};
