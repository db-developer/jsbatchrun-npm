/**
 *  © 2021, slashlib.org.
 *
 */ // use nodes default assertions
"use strict";
const expect  = require( "expect.js"    );
const lang    = require( "jsbatch-lang" );

describe( "01.10.index.spec.js - Testing module 'lib/index.js'", () => {
  const npm   = require( "../../lib" );

  describe( "Testing exports of module 'npm'", () => {
    it( "Module export should be a function", () => {
        expect( npm ).not.to.be( undefined );
        expect( npm ).not.to.be( null      );
        expect( npm ).to.be.an(  "object"  );
    });
  });
  describe( "Testing module 'npm'", () => {
    it( "should return an 'object' which is a valid registry", () => {
        expect( lang.isRegistry( npm )).to.be.ok();
    });
  });
});
