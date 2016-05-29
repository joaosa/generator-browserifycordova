'use strict';

require('chai').should();

const <%= camelName %> = require('../lib/<%= projectName %>.js');

describe('<%= name %>', () => {
  describe('#awesome()', () => {
    it('should be awesome', () => {
      <%= camelName %>.awesome().should.equal('awesome');
    });
  });
});
