/**
 *	install.js: @org.slashlib/jsbatchrun-npm
 *
 *  @module jsbatchrun-npm/install
 *
 *//*
 *  © 2021, slashlib.org.
 *
 *  install.js is distributed WITHOUT ANY WARRANTY; without even the implied
 *  warranty  of  MERCHANTABILITY  or  FITNESS  FOR  A  PARTICULAR  PURPOSE.
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
  fs:       require( "fs"              ),
  path:     require( "path"            ),
  grunt:    require( "grunt"           )
};

/**
 *  Stringtable initializer
 *  @ignore
 */
function _init_STRINGS() {
  const cache       = "cache";
  const clean       = "clean";
  const install     = "install";
  const npmcommand  = "npm-command";
  const usage      = `${ _m.strings.TAB3 } jsbr npm ${ clean } <options> [directories]`;

  const strings = {
    ARGUMENT_FORCE:           "--force",
    ARGUMENT_CLEAN:           `${ clean   }`,
    CMD_CACHE:                `${ cache   }`,
    CMD_INSTALL:              `${ install }`,
    CMDUSAGE:                 usage,
    GRUNT_PLUGIN_NPM_CMD:     "grunt-npm-command",
    GRUNT_TASK_NPM_CACHE:     `${ npmcommand }:${ cache   }`,
    GRUNT_TASK_NPM_INSTALL:   `${ npmcommand }:${ install }`,
    ID_VALUE:                 `${ install }`
  };
  return Object.assign( strings, _m.strings );
}

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS = _init_STRINGS();

/**
 *  Run `npm install` for a number of project directories.
 *
 *  @param  {object} args
 */
function invoke( args ) {
  if ( ! _m.lang.exists( args )) {
       return Promise.reject( new ReferenceError( "Missing parameter 'args'."));
  }
  else return new Promise(( resolve, reject ) => {

    _m.grunt.task.init  = function() {};
    _m.grunt.loadNpmTasks( _STRINGS.GRUNT_PLUGIN_NPM_CMD );

    const dirs    = Array.isArray( args.args ) ? args.args : [ ];
    const failed  = [ ];

    const promise = dirs.reduce(( promise, dir, index ) => {
      // reset errorcount & warncount
      _m.grunt.fail.errorcount = 0;
      _m.grunt.fail.warncount  = 0;

      return promise.then(( ) => {
        return new Promise(( resolve /*, reject */) => {
          if ( _m.fs.existsSync( dir  )) {
              const tasks = [ ];
              if ( args.cleancache ) {
                   tasks.push( _STRINGS.GRUNT_TASK_NPM_CACHE );
              }
              tasks.push( _STRINGS.GRUNT_TASK_NPM_INSTALL );
              _m.grunt.config.init( config( dir ));
              _m.grunt.tasks( tasks, { force: true }, () => {
                /* istanbul ignore if */
                if ( _m.grunt.fail.errorcount > 0 ) {
                     failed.push({ index, dir })
                     _m.grunt.log.error( dir );
                }
                else _m.grunt.log.ok( dir );
                // always resolve!
                resolve();
              });
            }
            else {
              failed.push({ index, dir })
              _m.grunt.log.error( dir );
              resolve();
            }
        });
      });
    }, Promise.resolve());

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
function config( projectdir ) {
  const cwd     = _m.lang.exists( projectdir ) ? projectdir : "";
  const args    = [ _STRINGS.ARGUMENT_CLEAN, _STRINGS.ARGUMENT_FORCE ];
  const copts   = { cmd: _STRINGS.CMD_CACHE, args, cwd };
  const cache   = { options: copts };
  const iopts   = { cmd: _STRINGS.CMD_INSTALL, cwd };
  const install = { options: iopts };

  return { "npm-command": { cache, install }};
}

/**
 *  Help string for 'npm install' command
 *
 *//* eslint-disable-next-line no-unused-vars */
function help( cmdstr, args ) {
  return `${ _STRINGS.USAGE }\n\r${ _STRINGS.CMDUSAGE }

options:
  --cleancache <boolean>    clean cache if flag is set

${ _STRINGS.USAGEOPTS }

arguments:
  one or more directories, which hold package.json files.
  ${ _STRINGS.USAGEARGS }`;
}

// Module exports:
Object.defineProperty( module.exports, _STRINGS.CONFIG,  {
  value:    config,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.INVOKE,  {
  value:    invoke,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.ID,      {
  value:    _STRINGS.ID_VALUE,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( module.exports, _STRINGS.HELP,    {
  value:    help,
  writable: false, enumerable: true, configurable: false });
