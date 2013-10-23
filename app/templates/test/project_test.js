'use strict';

require('chai').should();

var <%= projectName %> = require('../lib/<%= projectName %>.js');

describe('<%= props.name %>', function() {
  describe('#awesome()', function() {
    it('should be awesome' function(){
      <%= projectName %>.awesome().should.equal('awesome');
    });
  });
});
