/**
 *  © 2021, slashlib.org.
 *
 */ // use nodes default assertions
"use strict";
const expect  = require( "expect.js" );
const path    = require( "path" );

describe( "01.01.dependency.spec.js - Testing module 'dependency.js'", () => {
  const dep = require( "../../lib/dependency" );

  describe( "Testing exports of module 'dependency'", () => {
    it( "Identifier 'id' {string} (interface) should exist", () => {
        expect( dep.id     ).not.to.be( undefined  );
        expect( dep.id     ).not.to.be( null       );
        expect( dep.id     ).to.be.a(   "string"   );
    });
    it( "Function 'help' (interface) should exist", () => {
        expect( dep.help   ).not.to.be( undefined  );
        expect( dep.help   ).not.to.be( null       );
        expect( dep.help   ).to.be.a(   "function" );
    });
    it( "Function 'invoke' (interface) should exist", () => {
        expect( dep.invoke ).not.to.be( undefined  );
        expect( dep.invoke ).not.to.be( null       );
        expect( dep.invoke ).to.be.a(   "function" );
    });
    it( "Function 'config' should exist", () => {
        expect( dep.config ).not.to.be( undefined  );
        expect( dep.config ).not.to.be( null       );
        expect( dep.config ).to.be.a(   "function" );
    });
  });
  describe( "Testing 'id' of module 'dependency'", () => {
    it( "should be equal to 'dependency'", () => {
        expect( dep.id === "dependency" ).to.be.ok();
    });
  });
  describe( "Testing function 'help' of module 'dependency'", () => {
    it( "should be callable without arguments", () => {
        expect(() => { dep.help(); }).not.to.throwException();
        expect( dep.help()).to.be.a( "string" );
    });
  });
  describe( "Testing function 'config' of module 'dependency'", () => {
    it( "should be callable without arguments", () => {
        expect(() => { dep.config(); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string}", () => {
        const projectdir = "";
        expect(() => { dep.config( projectdir ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string} and 'type' {string}", () => {
        const projectdir = "";
        const type = "merge";
        expect(() => { dep.config( projectdir, type ); }).not.to.throwException();
    });
    it( "should be callable with argument 'projectdir' {string}, 'type' {string} and 'value' {any}", () => {
        const projectdir = "";
        const type  = "merge";
        const value = { some: "value" };
        expect(() => { dep.config( projectdir, type, value ); }).not.to.throwException();
    });
  });
  describe( "Testing function 'invoke' of module 'dependency'", () => {
    it( "should be callable without arguments but get rejected", ( done ) => {
        expect(() => { dep.invoke()
                          .then(( value ) => { done( new Error( "Should get rejectd" ))},
                                ( error ) => {
                                  expect( error ).to.be.a( ReferenceError );
                                  done();
                           })
                          .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { } but get rejected", ( done ) => {
        expect(() => { dep.invoke({ })
                          .then(( value ) => { done( new Error( "Should get rejectd" ))},
                                ( error ) => {
                                  expect( error ).to.be.a( ReferenceError );
                                  done();
                           })
                          .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { pkg: {string}} but get rejected", ( done ) => {
        expect(() => { dep.invoke({ pkg: "some-pkg" })
                          .then(( value ) => { done( new Error( "Should get rejectd" ))},
                                ( error ) => {
                                  expect( error ).to.be.a( ReferenceError );
                                  done();
                           })
                          .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { pkg: {string}, version: {string}} and resolve", ( done ) => {
        expect(() => { dep.invoke({ pkg: "some-pkg", version:"^1.2.1" })
                          .then(( value ) => { done() })
                          .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { pkg: {string}, version: {string}, dev: {boolean}} and resolve", ( done ) => {
        expect(() => { dep.invoke({ pkg: "some-pkg", version:"^1.2.1", dev: true })
                          .then(( value ) => { done() })
                          .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { ... } (complete and valid) and resolve", ( done ) => {
        const projects = [ "project-04", "project-05", "project-06"];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const pkg      = "some-pkg";
        const version  = "^1.2.1";
        const dev      = false;
        const args     = { pkg, version, dev, args: dirs };
        expect(() => { dep.invoke( args )
                          .then(( value ) => { done() })
                          .catch(( error ) => { done( error ); });
                     }).not.to.throwException();
    });
    it( "should be callable with argument 'args' { ... } (complete but invalid directory) and resolve", ( done ) => {
        const projects = [ "does.not.exist" ];
        const dirs     = projects.map(( dir ) => {
                           return path.join( process.cwd(), "src", "test", "tmp", dir );
                         });
        const pkg      = "some-pkg";
        const version  = "^1.2.1";
        const dev      = false;
        const args     = { pkg, version, dev, args: dirs };
        expect(() => { dep.invoke( args )
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
