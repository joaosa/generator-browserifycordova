'use strict';

const fs = require('fs-extra');
const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('browserifycordova generator', () => {
  const name = 'test';
  const srcDir = `../generators/${process.env.GEN_DIR}`;
  const generator = require(`${srcDir}/index`);
  var dir;

  before(done => {
    helpers.run(path.join(__dirname, srcDir))
      .withOptions({
        name: name
      })
    .inTmpDir(tmpDir => {
      dir = tmpDir;
      fs.copy(path.join(__dirname, `${srcDir}/templates`), dir, done);
    });
  });

  it('creates expected files', done => {
    const files = Array.from(generator.getFiles(name).keys());
    const expected = files.map(file => `${dir}/${file}`);

    assert.file(expected);
    done();
  });
});
