'use strict';

var util = require('util');

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

function body (lines) {
  return lines.slice(1, lines.length).join('\n');
}

exports.parse = function parseMessage (message) {
  var lines = message.split('\n');
  return {
    header: header(lines.shift()),
    body: body(lines)
  };
};
