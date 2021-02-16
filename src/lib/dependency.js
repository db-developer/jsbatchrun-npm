/**
 *	dependency.js: @org.slashlib/jsbatchrun-npm
 *
 *  @module jsbatchrun-npm/dependency
 *
 *//*
 *  © 2021, slashlib.org.
 *
 *  dependency.js  is  distributed  WITHOUT  ANY WARRANTY;  without even  the
 *  implied warranty of MERCHANTABILITY or FITNESS  FOR A PARTICULAR PURPOSE.
 *
 *//* eslint-disable-next-line */
"use strict";

/**
 *  Moduletable
 *  @ignore
 */
const _m = {
  lang:     require( "jsbatch-lang"    ),
  strings:  require( "jsbatch-strings" ),
  path:     require( "path"            ),
  grunt:    require( "grunt"           )
};

/**
 *  Stringtable initializer
 *  @ignore
 */
function _init_STRINGS() {
  const dependency = "dependency";
  const usage      = `${ _m.strings.TAB3 } jsbr npm ${ dependency } <options> [directories]`;

  const strings    = {
    CMDUSAGE:                 usage,
    GRUNT_PLUGIN_JSONFILE:    "grunt-jsonfile",
    GRUNT_TASK_JSONFILE:      "jsonfile",
    ID_VALUE:                 dependency,
    UPDATE:                   "update"
  };
  return Object.assign( strings, _m.strings );
}

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS = _init_STRINGS();

/**
 *  Run `npm dependency` for a number of project directories.
 *  This updates the version of a depencency for a number of  projects.
 *
 *  Properties:
 *    --pkg     {string}  package name
 *    --version {string}  version
 *    --dev     {boolean} is a developer package
 *
 *  @param  {object} args
 */
function invoke( args ) {
  if ( ! _m.lang.exists( args )) {
       return Promise.reject( new ReferenceError( "Missing parameter 'args'."));
  }
  else if ( ! _m.lang.isNotEmpty( args.pkg )) {
       return Promise.reject( new ReferenceError( "Property 'args.pkg' {string} not set."));
  }
  else if ( ! _m.lang.isNotEmpty( args.version )) {
       return Promise.reject( new ReferenceError( "Property 'args.version' {string} not set."));
  }
  else return new Promise(( resolve, reject ) => {
    const dependencies  = {};
          dependencies[ args.pkg ] = args.version;

    let change = undefined;
    if ( args.dev ) { change = { devDependencies: dependencies }; }
    else change = { dependencies };

    _m.grunt.task.init  = function() {};
    _m.grunt.loadNpmTasks( _STRINGS.GRUNT_PLUGIN_JSONFILE );

    const dirs    = Array.isArray( args.args ) ? args.args : [ ];
    const failed  = [ ];
    const promise = dirs.reduce(( promise, dir, index ) => {
      // reset errorcount & warncount
      _m.grunt.fail.errorcount = 0;
      _m.grunt.fail.warncount  = 0;

      return promise.then(( ) => {
        return new Promise(( resolve /*, reject */) => {
          const tasks = [ _STRINGS.GRUNT_TASK_JSONFILE ];
          _m.grunt.config.init( config( dir, _STRINGS.UPDATE, change ));
          _m.grunt.tasks( tasks, { force: true }, () => {
            if ( _m.grunt.fail.errorcount > 1 ) {
                 failed.push({ index, dir })
                 _m.grunt.log.error( dir );
            }
            else _m.grunt.log.ok( dir );
            // always resolve!
            resolve();
          });
        });
      });
    }, Promise.resolve())

    // finally resolve or reject our promise ...
    promise.then(( /*v*/ ) => { if ( failed.length > 0 ) { reject( failed ); }
                                else resolve(); },
                 /* istanbul ignore next */
                 ( error ) => { reject( error )});
  });
}

/**
 *  Returns a grunt configuration for npm install
 *  @param  {string}  projectdir
 *  @return {object}  grunt configuration
 */
function config( projectdir, type, value ) {
        projectdir        = _m.lang.exists( projectdir ) ? projectdir : "";
  const pkgjsonpath       = _m.path.join( projectdir, "package.json" );
  const name              = "pkgjson";

  const templates         = { };
        templates[ name ] = pkgjsonpath;
  const options           = { templates };

  const update            = { template: name, dest: pkgjsonpath };
  if ( _m.lang.isNotEmpty( type  ) &&
       _m.lang.exists( value )) {
      update[ type ] = value;
  }

  return { jsonfile: { options, update }};
}

/**
 *  Help string for 'npm dependency' command
 *
 *  @param  {string}  cmdstr  - Command string
 *  @param  {Array}   args    - Arguments from halp call (not used)
 *
 *  @return {string}  helptext.
 *
 *//* eslint-disable-next-line no-unused-vars */
function help( cmdstr, args ) {
  return `${ _STRINGS.USAGE }\n\r${ _STRINGS.CMDUSAGE }

options:
  --pkg <string>        a package name
  --version <string>    a version matching semver format
  --dev <boolean>       a flag to indicate a 'dev' dependency.

${ _STRINGS.USAGEOPTS }

arguments:
  one or more directories, which hold package.json files.
  ${ _STRINGS.USAGEARGS }`;
}

// Module exports:
Object.defineProperty( module.exports, _STRINGS.CONFIG,  {
  value:    config,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.HELP,    {
  value:    help,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.ID,      {
  value:    _STRINGS.ID_VALUE,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.INVOKE,  {
  value:    invoke,
  writable: false, enumerable: true, configurable: false });
