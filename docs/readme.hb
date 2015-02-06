[![Travis CI Build Status](https://img.shields.io/travis/rockabox/Auxilium.js/master.svg)](https://travis-ci.org/rockabox/Auxilium.js)
[![Coverage Status](https://img.shields.io/coveralls/rockabox/Auxilium.js/master.svg)](https://coveralls.io/r/rockabox/Auxilium.js?branch=master)
![Bower version](https://img.shields.io/bower/v/Auxilium.js.svg)
[![NPM devDependencies](https://img.shields.io/david/dev/rockabox/Auxilium.js.svg)](https://david-dm.org/rockabox/Auxilium.js#info=devDependencies)

# Auxilium.js
Rockabox's AMD utility helpers, which work with IE7+.

Primarily this project is used in conjunction with [webpack](http://webpack.github.io/) builds being included in via bower, however this should work with any AMD loaders such as Require. Documentation for the modules can be found [here](#all-modules).

# Using within your project

This project is downloadable via bower using
```sh
bower install Auxilium.js
```

## Using with webpack

Within this project the file ``webpack.base.config.js`` provides an Object of aliases to use with Webpack.

```js
var aliases = require('./<YOUR_BOWER_FILE>/Auxilium.js/webpack.base.config.js');
wepback.resolve.alias = aliases;
```

This will now mean that within your own project using ``aux/`` will now straight alias to this project allowing all modules to be used such as:

```js
define([
    'aux/attach-events'
], function (attachEvents) {
    // Attach events module will now be accessible within your Webpack module.
});
```

<a name="all-modules"></a>

{{heading-depth-set 2~}}
{{#module name="ajax"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="attach-attr"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="attach-class"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="attach-css"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="attach-events"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="clone"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="create-element"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="error"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="events"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="get-element-by-tag"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="get-elements-by-class"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="has-class"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="has-property"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="load-script"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="merge"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="remove-class"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="remove-element"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}

{{#module name="serialize"~}}
  # {{>name}}
  {{>body~}}
  {{>exported~}}
{{/module}}
