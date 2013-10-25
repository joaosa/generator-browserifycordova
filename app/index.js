'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var gitconfig = require('git-config');
var cordova = require('cordova');

var BrowserifycordovaGenerator = module.exports = function BrowserifycordovaGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function() {
    this.installDependencies({
      skipInstall: options['skip-install']
    });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(BrowserifycordovaGenerator, yeoman.generators.Base);

BrowserifycordovaGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  var moduleName = this._.slugify(path.basename(process.cwd()));

  var config = gitconfig.sync();
  var hasGitUser = config.github && config.github.user;
  var hasName = config.user && config.user.name;
  var hasEmail = config.user && config.user.email;

  // have Yeoman greet the user.
  console.log(this.yeoman +
    'Check https://npmjs.org/doc/files/package.json.html for guidelines on how to name your project adequately.');

  var prompts = [{
      'name': 'name',
      'message': 'Module name',
      'default': moduleName
    }, {
      'name': 'description',
      'message': 'Module description',
      'default': 'The best project ever.'
    }, {
      'name': 'githubUsername',
      'message': 'Your Github username',
      'default': hasGitUser || ''
    }, {
      'name': 'authorName',
      'message': 'Your name',
      'default': hasName || ''
    }, {
      'name': 'authorEmail',
      'message': 'Your email',
      'default': hasEmail || ''
    }, {
      'name': 'homepage',
      'message': 'Module homepage',
      'default': (hasGitUser && 'https://github.com/' + config.github.user + '/' + moduleName) || ''
    }, {
      'name': 'license',
      'message': 'License',
      'default': 'MIT'
    }
  ];

  this.prompt(prompts, function(props) {
    this.projectName = this._.slugify(props.name);
    this.camelName = this._.camelize(props.name);
    this.repoURL = props.homepage;
    this.currentYear = new Date().getFullYear();
    this.packageName = 'org.' + props.authorName.toLowerCase().split(' ').sort(-1).join('.');

    this.props = props;

    cb();
  }.bind(this));
};

BrowserifycordovaGenerator.prototype.lib = function lib() {
  this.mkdir('lib');
  this.template(path.join('lib', 'project.js'), path.join('lib', this.projectName + '.js'));
};

BrowserifycordovaGenerator.prototype.test = function test() {
  this.mkdir('test');
  this.template(path.join('test', 'project_test.js'), path.join('test', this.projectName + '_test.js'));
};

BrowserifycordovaGenerator.prototype.files = function files() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('travis.yml', '.travis.yml');

  this.template('LICENSE', 'LICENSE');
  this.template('README.md', 'README.md');
  this.template('Gruntfile.js', 'Gruntfile.js');
  this.template('_package.json', 'package.json');
};

BrowserifycordovaGenerator.prototype.build = function build() {
  this.mkdir('dist');
  this.mkdir('cordova');

  var cordovaPath = path.join(process.cwd(), 'cordova');

  var cb = this.async();
  cordova.create(cordovaPath, this.packageName, this.projectName, (function(self) {
    self.template('config.xml', path.join(cordovaPath, 'www', 'config.xml'));
    self.template('index.html', path.join(cordovaPath, 'www', 'index.html'));
    cb();
  }(this)));
};
