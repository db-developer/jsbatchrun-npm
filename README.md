# jsbatchrun-npm #

do npm tasks with this [jsbatchrun](https://www.npmjs.com/package/jsbatchrun) plugin.

[![npm version](https://img.shields.io/npm/v/jsbatchrun-npm?color=blue)](https://www.npmjs.com/package/jsbatchrun-npm)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![jsdoc](https://img.shields.io/static/v1?label=jsdoc&message=%20api%20&color=blue)](https://jsdoc.app/)
[![Built with Grunt](https://cdn.gruntjs.com/builtwith.svg)](https://gruntjs.com/)
[![codecov](https://codecov.io/gh/db-developer/jsbatchrun-npm/branch/master/graph/badge.svg)](https://codecov.io/gh/db-developer/jsbatchrun-npm)
[![Build Status](https://travis-ci.com/db-developer/jsbatchrun-npm.svg?branch=master)](https://travis-ci.com/db-developer/jsbatchrun-npm)
[![dependencies](https://david-dm.org/db-developer/jsbatchrun-npm.svg)](https://david-dm.org/)

jsbatchrun-npm uses [grunt](https://gruntjs.com/) for accessing npm in a platform independent manner.

## content ##

* Usage (see further down this page)
  * [Getting started guide](#getting-started)
  * [Usage and examples](#usage)
  * [jsbr npm dependency](docs/npm.dependency.md)
  * [jsbr npm install](docs/npm.install.md)

* Developers
  * [Testing jsbatchrun-npm](docs/grunt.md#testing)
  * [Code coverage of tests for jsbatchrun-npm](docs/grunt.md#code-coverage)
  * [Build jsbatchrun-npm from scratch](docs/grunt.md#building)
  * [NPM integration of jsbatchrun-npm](docs/grunt.md#npm_integration)
  * [Frameworks used for testing, building, etc.](docs/frameworks.md)
  * [API of package jsbatchrun-npm](docs/api.index.md) (self generated with jsbatchrun-npm)

## getting started ##

### install ###

This guide assumes, that you are familiar with the use of [npm](https://npmjs.com "Homepage of npm").  

<code>npm install jsbatchrun-npm --save</code>

### prerequisites ###

This plugin requires [jsbatchrun](https://www.npmjs.com/package/jsbatchrun).  

Install [jsbatchrun-npm]() in your [jsbatchrun](https://www.npmjs.com/package/jsbatchrun)
project. Check jsbatchrun for loading and configuring plugins.

## usage ##

This plugin provides you with the following commands

* <code>&gt; jsbr npm dependency ...</code> [for updating a dependency in a list of target
  directories. (Help)](docs/npm.dependency.md)

* <code>&gt; jsbr npm install ...</code> [for installing all dependencies in a list of target
  directories. (Help)](docs/npm.dependency.md)

* <code>&gt; jsbr npm run ...</code> [for running scripts (package.json script section) in a list of target
  directories. (Help)](docs/npm.run.md)
