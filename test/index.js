'use strict';

var expect  = require('chai').expect;
var fs      = require('fs');
var through = require('through2');
var parser  = require('../');

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

  describe('body', function () {

    it('parses the body', function () {
      expect(parsed.body)
        .to.match(/^Hey/)
        .and.match(/too\.$/);
    });

  });

  describe('streaming', function () {

    before(function (done) {
      var commit = fs.createReadStream(__dirname + '/commit.txt', {
        encoding: 'utf8'
      });
      parser.parse(commit)
        .on('data', function (_parsed_) {
          parsed = _parsed_;
        })
        .on('error', done)
        .on('finish', done);
    });

    it('parses the header', function () {
      expect(parsed.header).to.contain({
        type: 'feat',
        scope: 'project',
        subject: 'adds a commit subject'
      });
    });

    it('parses the body', function () {
      expect(parsed.body)
        .to.match(/^Hey/)
        .and.match(/too\.\n$/);
    });

  });

});
