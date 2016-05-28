'use strict';

const mkdirp = require('mkdirp');
const path = require('path');
const generators = require('yeoman-generator');
const gitconfig = require('git-config');
const cordova = require('cordova');
const _ = require('underscore.string');

class Generator extends generators.Base {
  constructor(args, options) {
    super(args, options);
  }
  prompting() {
    const moduleName = _.slugify(path.basename(process.cwd()));

    const config = gitconfig.sync();
    const githubUser = config.github ? config.github.user: '';
    const name = config.user ? config.user.name : '';
    const email = config.user ? config.user.email : '';

    const prompts = [{
      name: 'name',
      message: 'Module name',
      default: moduleName
    }, {
      name: 'description',
      message: 'Module description',
      default: 'The best project ever.'
    }, {
      name: 'githubUsername',
      message: 'Your Github username',
      default: githubUser
    }, {
      name: 'authorName',
      message: 'Your name',
      default: name
    }, {
      name: 'authorEmail',
      message: 'Your email',
      default: email
    }, {
      name: 'homepage',
      message: 'Module homepage',
      default: `https://github.com/${githubUser}/${moduleName}`
    }, {
      name: 'license',
      message: 'License',
      default: 'MIT'
    }];

    return this.prompt(prompts)
    .then(props => {
      this.props = Object.assign(props, {
        projectName: _.slugify(props.name),
        camelName: _.camelize(props.name),
        repoURL: props.homepage,
        currentYear: new Date().getFullYear(),
        packageName: 'org.' + props.authorName.toLowerCase().split(' ').sort(-1).join('.'),
      });
    });
  }
  writing() {
    const files = new Map([
      // lib
      ['lib/project.js', `lib/${this.props.projectName}.js`],
      // test
      ['test/project_test.js', `test/${this.props.projectName}_test.js`],
      // config
      ['editorconfig', '.editorconfig'],
      ['travis.yml', '.travis.yml'],
      ['gitignore', '.gitignore'],
      ['jshintrc', '.jshintrc'],
      ['_package.json', 'package.json'],
      ['Gruntfile.js', 'Gruntfile.js'],
      ['README.md', 'README.md'],
      ['LICENSE', 'LICENSE'],
      // cordova
      ['config.xml', 'cordova/www/config.xml'],
      ['index.html', 'cordova/www/index.html']
    ]);

    // build Cordova first, so we can override its settings afterwards
    const cordovaPath = this.destinationPath('dist/cordova');
    const isCordovaSetUp = this.fs.exists(`${cordovaPath}/config.xml`);

    const setupCordova = isCordovaSetUp ? () => {
      this.log('A cordova project is already setup.');
    } : () => {
      mkdirp.sync('dist');
      cordova.create(cordovaPath, this.packageName, this.projectName);
    }

    setupCordova();

    // setup all templates files
    for (var [key, value] of files.entries()) {
      const src = this.templatePath(key);
      const dest = this.destinationPath(`dist/${value}`);
      this.fs.copyTpl(src, dest, this.props);
    }
  }
}

module.exports = Generator;
