/**
 *  © 2021, slashlib.org.
 *
 */ // use nodes default assertions
"use strict";
const expect  = require( "expect.js" );
const path    = require( "path" );

describe( "01.03.run.spec.js - Testing module 'run.js'", () => {
  const run = require( "../../lib/run" );

  describe( "Testing exports of module 'run'", () => {
    it( "Identifier 'id' {string} (interface) should exist", () => {
        expect( run.id     ).not.to.be( undefined  );
        expect( run.id     ).not.to.be( null       );
        expect( run.id     ).to.be.a(   "string"   );
    });
    it( "Function 'help' (interface) should exist", () => {
        expect( run.help   ).not.to.be( undefined  );
        expect( run.help   ).not.to.be( null       );
        expect( run.help   ).to.be.a(   "function" );
    });
    it( "Function 'invoke' (interface) should exist", () => {
        expect( run.invoke ).not.to.be( undefined  );
        expect( run.invoke ).not.to.be( null       );
        expect( run.invoke ).to.be.a(   "function" );
    });
    it( "Function 'config' should exist", () => {
        expect( run.config  ).not.to.be( undefined  );
        expect( run.config  ).not.to.be( null       );
        expect( run.config  ).to.be.a(   "function" );
    });
  });
  describe( "Testing 'id' of module 'run'", () => {
    it( "should be equal to 'run'", () => {
        expect( run.id === "run" ).to.be.ok();
    });
  });
  describe( "Testing function 'help' of module 'run'", () => {
    it( "should be callable without arguments", () => {
        expect(() => { run.help(); }).not.to.throwException();
        expect( run.help()).to.be.a( "string" );
    });
  });
  describe( "Testing function 'config' of module 'run'", () => {
    it( "should be callable without arguments", () => {
        expect(() => { run.config(); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string}", () => {
        const projectdir = "";
        expect(() => { run.config( projectdir ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string} and 'type' {string}", () => {
        const projectdir = "";
        const type = "merge";
        expect(() => { run.config( projectdir, type ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string}, 'type' {string} and 'value' {any}", () => {
        const projectdir = "";
        const type  = "merge";
        const value = { some: "value" };
        expect(() => { run.config( projectdir, type, value ); }).not.to.throwException();
    });
  });
  describe( "Testing function 'invoke' of module 'run'", () => {
    it( "should be callable without arguments but get rejected", ( done ) => {
        expect(() => { run.invoke()
                           .then(( value ) => { done( new Error( "Should get rejectd" ))},
                                 ( error ) => {
                                   expect( error ).to.be.a( ReferenceError );
                                   done();
                            })
                           .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should not be callable with argument 'args' { } but get rejected", ( done ) => {
        const errmsg = "Property 'args.script' {string} not set.";
        expect(() => { run.invoke({ })
                           .then(( value ) => { done( "Should get rejected" ); },
                                 ( error ) => {
                                   // console.log( error );
                                   expect( error ).to.be.a( ReferenceError );
                                   expect( error.message === errmsg ).to.be.ok();
                                   done();
                            })
                           .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve (1)", ( done ) => {
        const projects  = [ "project-01", "project-02" ];
        const dirs      = projects.map(( dir ) => {
                            return path.join( process.cwd(), "src", "test", "tmp", dir );
                          });
        const args      = { args: dirs };
        const errmsg    = "Property 'args.script' {string} not set.";
        expect(() => { run.invoke( args )
                          .then(( value ) => { done( "Should get rejected" ); },
                                ( error ) => {
                                  // console.log( error );
                                  expect( error ).to.be.a( ReferenceError );
                                  expect( error.message === errmsg ).to.be.ok();
                                  done();
                           })
                          .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    }).timeout( 3000 );
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve (2)", ( done ) => {
        const args     = { script: "test" };
        expect(() => { run.invoke( args )
                           .then(( value ) => { done() })
                           .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    }).timeout( 3000 );
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve (3)", ( done ) => {
        const projects = [ "project-03" ];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const args     = { args: dirs, script: "test" };
        expect(() => { run.invoke( args )
                           .then(( value ) => { done() })
                           .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    }).timeout( 3000 );
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve (4)", ( done ) => {
        const projects = [ "project-03" ];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const args     = { args: dirs, script: "does.not.exist" };
        expect(() => { run.invoke( args )
                          .then(( value ) => { done( "Should get rejected" ); },
                                ( error ) => {
                                  // console.log( error );
                                  expect( error ).to.be.an( Array );
                                  expect( error.length === 1 ).to.be.ok();
                                  done();
                           })
                          .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    }).timeout( 3000 );
    it( "should be callable with argument 'args' { ... } (complete but invalid directory) and get rejected", ( done ) => {
        const projects = [ "does.not.exist" ];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const args     = { args: dirs, script: "test" };
        expect(() => { run.invoke( args )
                           .then(( value ) => { done( new Error( "Should get rejected" )) },
                                 ( error ) => {
                                   expect( error ).to.be.an( Array );
                                   done();
                            })
                           .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
  });
});
