'use strict';

const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('browserifycordova generator', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../app'))
      .withOptions({ 'skip-install': true })
      .toPromise();
  });

  it('creates expected files', done => {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig'
    ];

    assert.file(expected);
    done();
  });
});
