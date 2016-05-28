# generator-browserifycordova [![Build Status](https://secure.travis-ci.org/joaosa/generator-browserifycordova.png?branch=master)](https://travis-ci.org/joaosa/generator-browserifycordova)

Feeling uneasy when your perfectly good browserifiable apps have to fit into a [Apache Cordova](http://cordova.apache.org/)-specific layout?

Voilá! Problem solved.

Your browserifiable apps can now be wrapped by Cordova and live on the mobile side of life, while you can code in a perfectly normal Node.js Grunt project layout.

It all boils down to having [Browserify](https://github.com/substack/node-browserify) convert your code to a bundle that is copied to the Cordova side, every `grunt watch` cycle. It can then be deployed to any of the supported mobile platforms with `grunt deploy`.

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

- Satisfy the prompt's configurational demands and you're good to go

- Don't forget to look inside the `dist` dir to make friends with your new project

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
