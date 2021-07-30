/**
 *  © 2021, slashlib.org.
 *
 */ // use nodes default assertions
"use strict";
const expect  = require( "expect.js" );
const path    = require( "path" );

describe( "01.04.outdated.spec.js - Testing module 'outdated.js'", () => {
  const outdated = require( "../../lib/outdated" );

  describe( "Testing exports of module 'outdated'", () => {
    it( "Identifier 'id' {string} (interface) should exist", () => {
        expect( outdated.id     ).not.to.be( undefined  );
        expect( outdated.id     ).not.to.be( null       );
        expect( outdated.id     ).to.be.a(   "string"   );
    });
    it( "Function 'help' (interface) should exist", () => {
        expect( outdated.help   ).not.to.be( undefined  );
        expect( outdated.help   ).not.to.be( null       );
        expect( outdated.help   ).to.be.a(   "function" );
    });
    it( "Function 'invoke' (interface) should exist", () => {
        expect( outdated.invoke ).not.to.be( undefined  );
        expect( outdated.invoke ).not.to.be( null       );
        expect( outdated.invoke ).to.be.a(   "function" );
    });
    it( "Function 'config' should exist", () => {
        expect( outdated.config  ).not.to.be( undefined  );
        expect( outdated.config  ).not.to.be( null       );
        expect( outdated.config  ).to.be.a(   "function" );
    });
  });
  describe( "Testing 'id' of module 'outdated'", () => {
    it( "should be equal to 'outdated'", () => {
        expect( outdated.id === "outdated" ).to.be.ok();
    });
  });
  describe( "Testing function 'help' of module 'outdated'", () => {
    it( "should be callable without arguments", () => {
        expect(() => { outdated.help(); }).not.to.throwException();
        expect( outdated.help()).to.be.a( "string" );
    });
  });
  describe( "Testing function 'config' of module 'outdated'", () => {
    it( "should be callable without arguments", () => {
        expect(() => { outdated.config(); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string}", () => {
        const projectdir = "";
        expect(() => { outdated.config( projectdir ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string} and 'args' {object}", () => {
        const projectdir = "";
        const args       = { json: true };
        expect(() => { outdated.config( projectdir, args ); }).not.to.throwException();
    });
  });
  describe( "Testing function 'invoke' of module 'outdated'", () => {
    it( "should be callable without arguments but get rejected", ( done ) => {
        expect(() => { outdated.invoke()
                               .then(( value ) => { done( new Error( "Should get rejectd" ))},
                                     ( error ) => {
                                       expect( error ).to.be.a( ReferenceError );
                                       done();
                                })
                               .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable without arguments but get rejected", ( done ) => {
        const args = { };
        expect(() => { outdated.invoke( args )
                               .then(( value ) => { done() })
                               .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve (1)", ( done ) => {
        const projects = [ "project-01" ];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const args     = { args: dirs };
        expect(() => { outdated.invoke( args )
                               .then(( value ) => { done() })
                               .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    }).timeout( 150000 );
    it.only( "should be callable with argument 'args' { ... } (complete and valid) and resolve (2)", ( done ) => {
        const projects  = [ "project-04", "project-05" ];
        const dirs      = projects.map(( dir ) => {
                            return path.join( process.cwd(), "src", "test", "tmp", dir );
                          });
        const args      = { args: dirs };
        expect(() => { outdated.invoke( args )
                               .then(( value ) => { done( new Error( "Should get rejected!" )) },
                                     ( error ) => {
                                       // console.log( error );
                                       expect( Array.isArray( error )).to.be.ok();
                                       expect( error.length === 2 ).to.be.ok();
                                       done();
                                })
                               .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    }).timeout( 150000 );
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve (3)", ( done ) => {
        const projects = [ "project-06" ];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const args     = { args: dirs, json: true };
        expect(() => { outdated.invoke( args )
                               .then(( value ) => { done( new Error( "Should get rejected!" )) },
                                     ( error ) => {
                                       // console.log( error );
                                       expect( Array.isArray( error )).to.be.ok();
                                       expect( error.length === 1 ).to.be.ok();
                                       done();
                                })
                               .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    }).timeout( 150000 );
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve (4)", ( done ) => {
        const projects = [ "does.not.exist" ];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const args     = { args: dirs, json: true };
        expect(() => { outdated.invoke( args )
                               .then(( value ) => { done( new Error( "Should get rejected!" )) },
                                     ( error ) => {
                                       // console.log( error );
                                       expect( Array.isArray( error )).to.be.ok();
                                       expect( error.length === 1 ).to.be.ok();
                                       done();
                                })
                               .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
  });
});
