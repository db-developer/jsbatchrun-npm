/**
 *	outdated.js: @org.slashlib/jsbatchrun-npm
 *
 *  @module jsbatchrun-npm/outdated
 *
 *//*
 *  © 2021, slashlib.org.
 *
 *  outdated.js  is distributed WITHOUT ANY WARRANTY; without even the implied
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
  const outdated    = "outdated";
  const usage       = `${ _m.strings.TAB3 } jsbr npm ${ outdated } <options> [directories]`;

  const strings = {
    CMDUSAGE:                 usage,
    GRUNT_PLUGIN_NPM_CMD:     "grunt-npm-command",
    GRUNT_TASK:               "npm-command",
    MSG_ERR_MISSING_ARGS:     "Missing parameter 'args'.",
    NPM_CMD:                  outdated,
    ID_VALUE:                 outdated
  };
  return Object.assign( strings, _m.strings );
}

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS = _init_STRINGS();

/**
 *  Run `npm outdated` for a number of project directories.
 *
 *  @param  {object} args
 */
function invoke( args ) {
  if ( ! _m.lang.exists( args )) {
       return Promise.reject( new ReferenceError( _STRINGS.MSG_ERR_MISSING_ARGS ));
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
               _m.grunt.tasks( tasks, { force: true }, ( ) => {
                 if (( _m.grunt.fail.errorcount > 0 ) ||
                     ( _m.grunt.fail.warncount  > 0 )) {
                       failed.push({ index, dir,
                                     warnings: _m.grunt.fail.warncount,
                                     errors:   _m.grunt.fail.errorcount })
                       _m.grunt.log.error( "Outdated: " + dir );
                 }
                 else  _m.grunt.log.ok( "Up to date: " + dir );
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
    promise.then(( /*v*/ ) => {
                   if ( failed.length > 0 ) {
                        const message      = _STRINGS.GRUNT_TASK + " " + _STRINGS.NPM_CMD + " failed."
                        const error        = new Error( message );
                              error.failed = failed;
                        reject( error );
                   }
                   else resolve();
            }, /* istanbul ignore next */
                 ( error ) => { reject( error )});
  });
}

const _OPTIONS = [ "json", "long", "parseable", "global", "depth" ];

/**
 *  Returns a grunt configuration for npm outdated
 *  @param  {string}  projectdir
 *  @return {object}  grunt configuration
 */
function config( projectdir, args ) {
  const argo = _m.lang.exists( args ) ? args : { };
        args = [];
  const cwd  = _m.lang.exists( projectdir ) ? projectdir : ".";

  _OPTIONS.forEach(( option ) => {
    if ( _m.lang.exists( argo[ option ])) {
         args.push( `--${ option }` );
    }
  });

  return  {
    "npm-command": {
      target: {
        options: {
          cwd, cmd: _STRINGS.NPM_CMD, args
        }
      }
    }
  };
}

/**
 *  Help string for 'npm outdated' command
 *
 *//* eslint-disable-next-line no-unused-vars */
function help( cmdstr, args ) {
  return `${ _STRINGS.USAGE }\n\r${ _STRINGS.CMDUSAGE }

options:
  --json <boolean>        Show information in JSON format.
  --long <boolean>        Show extended information.
  --parseable <boolean>   Show parseable output instead of tree view.
  --global <boolean>      Check packages in the global install prefix
                                instead of in the current project.
  --depth <integer>       Max depth for checking dependency tree.

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
