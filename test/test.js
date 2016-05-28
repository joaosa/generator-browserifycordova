'use strict';

const fs = require('fs-extra');
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

const generator = require('../app/index');

describe('browserifycordova generator', () => {
  before(done => {
    this.name = 'test';

    return helpers.run(path.join(__dirname, '../app'))
      .withOptions({
        name: this.name
      })
    .inTmpDir(dir => {
      this.dir = dir;
      fs.copy(path.join(__dirname, '../app/templates'), dir, done);
    });
  });

  it('creates expected files', done => {
    const files = Array.from(generator.getFiles(this.name).keys());
    const expected = files.map(file => `${this.dir}/${file}`);

    assert.file(expected);
    done();
  });
});
