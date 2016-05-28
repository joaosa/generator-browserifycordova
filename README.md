# generator-browserifycordova [![Build Status](https://secure.travis-ci.org/joaosa/generator-browserifycordova.png?branch=master)](https://travis-ci.org/joaosa/generator-browserifycordova)

Feeling uneasy when your perfectly good browserifiable apps have to fit into a [Apache Cordova](http://cordova.apache.org/)-specific layout?

Voilá! Problem solved.

Your browserifiable apps can now be wrapped by Cordova and live on the mobile side of life, while you can code in a perfectly normal Node.js Grunt project layout.

It all boils down to having [Browserify](https://github.com/substack/node-browserify) convert your code to a bundle that is copied to the Cordova side, every `grunt watch` cycle. It can then be deployed to any of the supported mobile platforms with `grunt deploy`.

This [Yeoman](http://yeoman.io) generator was based on [eugeneware/generator-nodejs](https://github.com/eugeneware/generator-nodejs), [yeoman/generator-node](https://github.com/yeoman/generator-nodel) and [dangeross/generator-cordova](https://github.com/dangeross/generator-cordova).

## Getting Started

- Firstly, install:
  - the SDKs you fancy (i.e. Android, iOS, FirefoxOS, etc)
  - Apache Cordova `npm install -g cordova`
  - Yo `npm install -g yo`

- To install generator-browserifycordova from npm, run:

```
npm install -g generator-browserifycordova
```

- Finally, initiate the generator:

```
yo browserifycordova
```

## Getting To Know Yeoman

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
