'use strict';

const path = require('path');
const generators = require('yeoman-generator');
const gitconfig = require('git-config');
const cordova = require('cordova');
const _ = require('underscore.string');

class Generator extends generators.Base {
  constructor(args, options) {
    super(args, options);

    this.on('end', () => {
      this.installDependencies({
        skipInstall: options['skip-install']
      });
    });

    this.pkg = require(path.join(__dirname, '../package.json'));
  }
  askFor() {
    const cb = this.async();

    const moduleName = _.slugify(path.basename(process.cwd()));

    const config = gitconfig.sync();
    const hasGitUser = config.github && config.github.user;
    const hasName = config.user && config.user.name;
    const hasEmail = config.user && config.user.email;

    // have Yeoman greet the user.
    console.log(this.yeoman +
        'Check https://npmjs.org/doc/files/package.json.html for guidelines on how to name your project adequately.');

    const prompts = [{
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
  }
  lib() {
    this.mkdir('lib');
    this.template(path.join('lib', 'project.js'), path.join('lib', this.projectName + '.js'));
  }
  test() {
    this.mkdir('test');
    this.template(path.join('test', 'project_test.js'), path.join('test', this.projectName + '_test.js'));
  }
  files() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('gitignore', '.gitignore');
    this.copy('travis.yml', '.travis.yml');

    this.template('LICENSE', 'LICENSE');
    this.template('README.md', 'README.md');
    this.template('Gruntfile.js', 'Gruntfile.js');
    this.template('_package.json', 'package.json');
  }
  build() {
    this.mkdir('dist');
    this.mkdir('cordova');

    const cordovaPath = path.join(process.cwd(), 'cordova');

    const cb = this.async();
    cordova.create(cordovaPath, this.packageName, this.projectName, (function(self) {
      self.template('config.xml', path.join(cordovaPath, 'www', 'config.xml'));
      self.template('index.html', path.join(cordovaPath, 'www', 'index.html'));
      cb();
    }(this)));
  }
}

module.exports = Generator;
