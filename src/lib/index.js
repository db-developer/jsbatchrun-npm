/**
 *	index.js: @org.slashlib/jsbatchrun-npm
 *
 *  @module jsbatchrun-npm
 *
 *//*
 *  © 2021, slashlib.org.
 *
 *  index.js is distributed WITHOUT ANY WARRANTY; without even the implied
 *  warranty  of  MERCHANTABILITY  or  FITNESS  FOR  A PARTICULAR  PURPOSE.
 *
 *//* eslint-disable-next-line */
"use strict";

/**
 *  Module initializer
 *  @ignore
 */
const _m = {
  // import 'lang' helpers from jsbatchrun
  lang:         require( "jsbatch-lang" ),
  // import command 'dependency' from its own module
  dependency:   require( "./dependency" ),
  // import command 'install' from its own module
  install:      require( "./install"    ),
  // import command 'outdated' from its own module
  outdated:     require( "./outdated"   ),
  // import command 'run' from its own module
  run:          require( "./run" )
};

/**
 *  Stringtable
 *  @ignore
 */
const _STRINGS =  {
  EXPORTS:      "exports",
  PLUGIN_ID:    "npm"
};

/**
 *  Registry for npm commands
 *  @ignore
 */
const _REGISTRY = _m.lang.registry( _STRINGS.PLUGIN_ID );

// dependency
Object.defineProperty( _REGISTRY.cmd, _m.dependency.id,  {
  value:    _m.dependency.invoke,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( _REGISTRY.help, _m.dependency.id, {
  value:    _m.dependency.help,
  writable: false, enumerable: true, configurable: false });

// install
Object.defineProperty( _REGISTRY.cmd, _m.install.id,     {
  value:    _m.install.invoke,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( _REGISTRY.help, _m.install.id,    {
  value:    _m.install.help,
  writable: false, enumerable: true, configurable: false });

// outdated
Object.defineProperty( _REGISTRY.cmd, _m.outdated.id,    {
  value:    _m.outdated.invoke,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( _REGISTRY.help, _m.outdated.id,   {
  value:    _m.outdated.help,
  writable: false, enumerable: true, configurable: false });

// outdated
Object.defineProperty( _REGISTRY.cmd, _m.run.id,         {
  value:    _m.run.invoke,
  writable: false, enumerable: true, configurable: false });
Object.defineProperty( _REGISTRY.help, _m.run.id,        {
  value:    _m.run.help,
  writable: false, enumerable: true, configurable: false });

// Module exports:
Object.defineProperty( module, _STRINGS.EXPORTS,         {
  value:    _REGISTRY,
  writable: false, enumerable: true, configurable: false });
