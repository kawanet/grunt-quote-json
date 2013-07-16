# grunt-quote-json

Grunt contirb plugin to quote a part of JSON to another

## Usage

This task copies a part of the source JSON file into the destination JSON file.

Load `grunt-quote-json` module and install `quoteJson` task at your `Gruntfile.js`.

```js
grunt.loadNpmTasks('grunt-quote-json');

grunt.initConfig({
  quoteJson: {
    bower: {
      src: 'package.json',
      dest: 'bower.json',
      options: {
        fields: {
          name: 1,
          version: 1,
          description: 1,
          repository: 1
        }
      }
    }
  }
})
```

In the case above, it copies `name`, `version`, `description`
and `repository` fields from `package.json` file to `bower.json` file.
You don't need care the consistency of version number etc.
between those JSON files with the plugin.

Dot notation (e.g. `repository.url`) is supported to handle child nodes.

## INSTALLATION

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```sh
npm install grunt-quote-json --save-dev
```

## LINKS

### Sources

https://github.com/kawanet/grunt-quote-json

### Author

https://github.com/kawanet
