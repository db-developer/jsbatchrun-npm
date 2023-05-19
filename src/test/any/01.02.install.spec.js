/**
 *  © 2021, slashlib.org.
 *
 */ // use nodes default assertions
"use strict";
const expect  = require( "expect.js" );
const path    = require( "path" );

describe( "01.02.install.spec.js - Testing module 'install.js'", () => {
  const inst = require( "../../lib/install" );

  describe( "Testing exports of module 'install'", () => {
    it( "Identifier 'id' {string} (interface) should exist", () => {
        expect( inst.id     ).not.to.be( undefined  );
        expect( inst.id     ).not.to.be( null       );
        expect( inst.id     ).to.be.a(   "string"   );
    });
    it( "Function 'help' (interface) should exist", () => {
        expect( inst.help   ).not.to.be( undefined  );
        expect( inst.help   ).not.to.be( null       );
        expect( inst.help   ).to.be.a(   "function" );
    });
    it( "Function 'invoke' (interface) should exist", () => {
        expect( inst.invoke ).not.to.be( undefined  );
        expect( inst.invoke ).not.to.be( null       );
        expect( inst.invoke ).to.be.a(   "function" );
    });
    it( "Function 'config' should exist", () => {
        expect( inst.config  ).not.to.be( undefined  );
        expect( inst.config  ).not.to.be( null       );
        expect( inst.config  ).to.be.a(   "function" );
    });
  });
  describe( "Testing 'id' of module 'install'", () => {
    it( "should be equal to 'install'", () => {
        expect( inst.id === "install" ).to.be.ok();
    });
  });
  describe( "Testing function 'help' of module 'install'", () => {
    it( "should be callable without arguments", () => {
        expect(() => { inst.help(); }).not.to.throwException();
        expect( inst.help()).to.be.a( "string" );
    });
  });
  describe( "Testing function 'config' of module 'install'", () => {
    it( "should be callable without arguments", () => {
        expect(() => { inst.config(); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string}", () => {
        const projectdir = "";
        expect(() => { inst.config( projectdir ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string} and 'type' {string}", () => {
        const projectdir = "";
        const type = "merge";
        expect(() => { inst.config( projectdir, type ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string}, 'type' {string} and 'value' {any}", () => {
        const projectdir = "";
        const type  = "merge";
        const value = { some: "value" };
        expect(() => { inst.config( projectdir, type, value ); }).not.to.throwException();
    });
  });
  describe( "Testing function 'invoke' of module 'install'", () => {
    it( "should be callable without arguments but get rejected", ( done ) => {
        expect(() => { inst.invoke()
                           .then(( value ) => { done( new Error( "Should get rejectd" ))},
                                 ( error ) => {
                                   expect( error ).to.be.a( ReferenceError );
                                   done();
                            })
                           .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { } but get rejected", ( done ) => {
        expect(() => { inst.invoke({ })
                           .then(( value ) => { done(); })
                           .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve", ( done ) => {
        const projects = [ "project-01", "project-02" ];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const args     = { args: dirs };
        expect(() => { inst.invoke( args )
                           .then(( value ) => { done() })
                           .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    }).timeout( 250000 );
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve", ( done ) => {
        const projects = [ "project-03" ];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const args     = { args: dirs, cleancache: true };
        expect(() => { inst.invoke( args )
                           .then(( value ) => { done() })
                           .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    }).timeout( 250000 );
    it( "should be callable with argument 'args' { ... } (complete but invalid directory) and get rejected", ( done ) => {
        const projects = [ "does.not.exist" ];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const args     = { args: dirs };
        expect(() => { inst.invoke( args )
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
