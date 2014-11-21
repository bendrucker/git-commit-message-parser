'use strict';

var util = require('util');

// https://github.com/angular/angular.js/blob/master/validate-commit-msg.js#L19
var pattern = /^(?:fixup!\s*)?(\w*)(\(([\w\$\.\*/-]*)\))?\: (.*)$/;

exports.parse = function parseMessage (message) {
  var lines = message.split('\n');
  var matches = pattern.exec(lines[0]);
  return {
    header: {
      type: matches[1],
      scope: matches[3],
      subject: matches[4],
      toString: function () {
        return util.format('%s(%s): %s', this.type, this.scope, this.subject);
      }
    }
  }
};