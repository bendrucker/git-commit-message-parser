'use strict';

var expect = require('chai').expect;
var fs     = require('fs');
var parser = require('../');

describe('git-commit-parser', function () {

  var message, parsed;
  before(function () {
    message = fs.readFileSync(__dirname + '/commit.txt').toString();
    parsed  = parser.parse(message);
  });

  describe('header', function () {

    var header;
    before(function () {
      header = parsed.header;
    });

    it('parses the type', function () {
      expect(header.type).to.equal('feat');
    });

    it('parses the scope', function () {
      expect(header.scope).to.equal('project');
    });

    it('parses the subject', function () {
      expect(header.subject)
        .to.equal('adds a commit subject');
    });

    it('formats with #toString', function () {
      expect(header.toString())
        .to.equal('feat(project): adds a commit subject');
    });

  });

});