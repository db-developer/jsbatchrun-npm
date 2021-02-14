/**
 *	run.js: @org.slashlib/jsbatchrun-npm
 *
 *  @module jsbatchrun-npm/run
 *
 *//*
 *  © 2021, slashlib.org.
 *
 *  run.js  is distributed WITHOUT ANY WARRANTY; without even the implied
 *  warranty of  MERCHANTABILITY or  FITNESS  FOR A  PARTICULAR  PURPOSE.
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
  const run         = "run";
  const usage       = `${ _m.strings.TAB3 } jsbr npm ${ run } <options> [directories]`;

  const strings = {
    CMD_RUN:                  run,
    CMDUSAGE:                 usage,
    GRUNT_PLUGIN_NPM_CMD:     "grunt-npm-command",
    GRUNT_TASK:               "npm-command",
    MSG_ERR_MISSING_ARGS:     "Missing parameter 'args'.",
    MSG_ERR_MISSING_SCRIPT:   "Property 'args.script' {string} not set.",
    ID_VALUE:                 run
  };
  return Object.assign( strings, _m.strings );
}

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS = _init_STRINGS();

/**
 *  Run `npm run` for a number of project directories.
 *
 *  @param  {object} args
 */
function invoke( args ) {
  if ( ! _m.lang.exists( args )) {
       return Promise.reject( new ReferenceError( _STRINGS.MSG_ERR_MISSING_ARGS ));
  }
  else if ( ! _m.lang.isNotEmpty( args.script )) {
       return Promise.reject( new ReferenceError( _STRINGS.MSG_ERR_MISSING_SCRIPT ));
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
          if ( _m.fs.existsSync( dir )) {
               const tasks = [ _STRINGS.GRUNT_TASK ];
               _m.grunt.config.init( config( dir, args ));
               _m.grunt.tasks( tasks, { force: true }, () => {
                 if (( _m.grunt.fail.errorcount > 0 ) ||
                     ( _m.grunt.fail.warncount  > 0 )) {
                       failed.push({ index, dir })
                       _m.grunt.log.error( dir );
                 }
                 else  _m.grunt.log.ok( dir );
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
 *  Returns a grunt configuration for npm run
 *  @param  {string}  projectdir
 *  @return {object}  grunt configuration
 */
function config( projectdir, args ) {
  args = _m.lang.exists( args ) ? args : [ ];
  return {
    "npm-command": {
      target: {
        options: {
          cwd:  projectdir,
          cmd:  _STRINGS.CMD_RUN,
          args: args.script
        }
      }
    }
  };
}

/**
 *  Help string for 'npm install' command
 *
 *//* eslint-disable-next-line no-unused-vars */
function help( cmdstr, args ) {
  return `${ _STRINGS.USAGE }\n\r${ _STRINGS.CMDUSAGE }

options:
  --script <string>     npm run <script>

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
