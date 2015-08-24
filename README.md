# Yeoman Generator for Polymer projects with Node.js

## About Polymer

[Polymer](http://www.polymer-project.org/) is a library of polyfills and sugar which enable the use of Web Components in modern browsers. The project allows developers to build apps using the platform of tomorrow and inform the W3C of places where in-flight specifications can be further improved.

`generator-polynode` is an opinionated extension to `generator-polymer`  which provides Polymer scaffolding using Yeoman (a scaffolding tool for the web), letting you easily create and customize Polymer (custom) elements via the command-line and import them using HTML Imports. This saves you time writing boilerplate code so you can start writing up the logic to your components straight away.

The main reasons for developing `generator-polynode` consist of a number of personal preferences.
 * I prefer:
    * Grunt to Gulp.
    * SCSS Variables to Polymer's CSS Variables (in its current state Polymer v1.0).
    * Having more access to Server side code.
    * One polymer-element to rule them all!
 * I wanted:
    * A simpler method to expand on the in place page system through the generator.
    * To ensure the user can see the page is loading immediately without waiting for WebComponents, Polymer and the App's Dependencies.



## Features

### From generator-polymer
  * A Polymer app scaffold
  * Sub-generator to create Polymer elements for your app

### Extended Features
  * Splash Screen while App elements are loaded
  * SCSS Theming
  * Inbuilt theme for standard web elements to follow Material Design Specsheet
  * Full development workflow and production deployment with Grunt
  * Custom element stylesheet live reloading with BrowserSync
  * Lazy loading for page elements



## Installation

### Pre-requisites

This is a yeoman-generator, please ensure that `yo` is installed.

```bash
npm install -g yo
```

### Installing

 1) Install the generator via npm.
```bash
npm install -g generator-polynode
```


 2) Create your project's directory and change directory into it.
```bash
mkdir MyProject
cd MyProject
```

 3) Run the generator in the project directory.
```bash
yo polynode
```



## Generators

Available generators:

* [polynode (aka polynode:app)](#app)
* [polynode:element](#element)
* [polynode:page](#page)

**Note: All generators are to be run at the root of your project's directory.**

### App

Scaffolds a new PolyNode app to start building your app.

```bash
yo polynode
```

### Element

Generates a polymer element in `app/browser/custom_components/`.

The generator will provide the option to append the new element to the global app elements dependencies import file `app/elements.html`.

The generator additionally provides the option for generating a WCT template for you to add tests to your polymer elements.

**Note: You must pass in an element name, and the name must contain a dash '-'**

```bash
yo polynode:element my-element
```

### Page

Generates a polymer element in `app/browser/custom_components/pages/` which is recognised as a page by the PolyNode app.

The page is appended to PageBehavior in `app/browser/cutom_components/behaviors/pages.html`.

**Note: You must pass in an element name, and the name must start with 'page-'**

```bash
yo polynode:page page-home
```

## Running your New PolyNode App

### Install Dependencies

Don't forget to install the app's dependencies!

```bash
npm install
```

### Development Workflow

After templating your project, install dependencies and build your app using grunt.

```bash
grunt
grunt serve
```

`grunt` will begin the build process:
  * Installing and minifying bower components
  * Minifying HTML
  * Uglifying JS
  * Compiling SCSS to CSS
  * Optimising Images
  * Setting up the WCT Test Suites

`grunt serve` will start the `express` server to host the project. The `express` server will run on port 5000 on the local machine by default `localhost:5000`. To configure this port, please change `grunt/express.js` to the use to the desired ports.

`BrowserSync` will be deployed by the `express` server, which is the preferred testing space. `BrowserSync` will run on port 3000 and proxy the express server, please use `localhost:3000` for development purposes.

While the server is running, `grunt` will watch the project directory for changes. Any changes to the project directory will begin the appropriate Grunt Task, rebuilding the project and redeploying. When editing `browser/` files, BrowserSync will detect the files that have changed and attempt to push them to any connected clients. For CSS files, these changes are pushed live without requiring a page refresh.

**Note: Live reloading only pushes new content to clients connected to `BrowserSync`.**

### Project Deployment/Production

For when your app is ready to be deployed, `generator-polynode` provides utility to optimise your app further than the standard build.

```bash
grunt build
```

`grunt build` will follow the same build process as Development, however:
  * Bower DevDependencies will not be installed
  * Custom Elements will have their style and prototypes inlined after minification
  * ServiceWorker will be set up if enabled
  * WCT Test Suites will not be copied

**Note: Be careful editing source files while serving the Production build, as changes will build as Development state.**

### Testing your app

#### Mocha (Node)
To test any server side code changes, use `grunt test:developer` or `grunt test:production` for the state you are working in. This will run the Mocha Test Suite for server side code.

#### WebComponentTester (Polymer Elements)
For your custom polymer-elements, use the web interface for `WCT` by building your test suites, starting the server with `grunt serve` and navigating to `localhost:3000/test`. You can ensure your test suites are up to date by using `grunt build:test`.



## Contributing

### Quick Guide

Clone this repo, and link locally to npm to allow `yo` to find this generator.

```bash
git clone https://github.com/KK578/generator-polynode.git
cd generator-polynode
npm link
```

### Making a Pull Request

Lint your code using `JSHint` and `JSCS` with the project's configs through `grunt`.
If adding a new sub-generator, you may need to add a new definition to `grunt/jshint.js` and `grunt/jscs.js`.

Add test cases for new features and test your code with `grunt mochaTest`.



## License

  > [BSD License](http://opensource.org/licenses/bsd-license.php)

  > Copyright (c) 2015, Kevin Kwan
  > All rights reserved.

  > Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:

  > 1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
  > 2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.

  > THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.



## Credits

 * [generator-polynode](https://github.com/yeoman/generator-polymer)
 * [polymer-starer-kit](https://github.com/PolymerElements/polymer-starter-kit)
