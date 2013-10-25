'use strict';

require('chai').should();

var <%= camelName %> = require('../lib/<%= projectName %>.js');

describe('<%= props.name %>', function() {
  describe('#awesome()', function() {
    it('should be awesome', function() {
      <%= camelName %>.awesome().should.equal('awesome');
    });
  });
});
