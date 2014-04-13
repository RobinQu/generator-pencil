var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');


var PencilGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    // this.on('end', function () {
    //   if (!this.options['skip-install']) {
    //     this.installDependencies();
    //   }
    // });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Pencil generator.'));
    this.log(chalk.red("This generator is working in progress. The main generator is far from completed."));
    var prompts = [{
      type: 'input',
      name: 'sitename',
      message: 'What is your site name?',
      default: true
    }];

    this.prompt(prompts, function (props) {
      this.sitename = props.sitename;
      done();
    }.bind(this));
  },

  app: function () {
    // this.mkdir('app');
    // this.mkdir('app/templates');
    // 
    // this.copy('_package.json', 'package.json');
    // this.copy('_bower.json', 'bower.json');
  },

  projectfiles: function () {
    // this.copy('editorconfig', '.editorconfig');
    // this.copy('jshintrc', '.jshintrc');
  }
});

module.exports = PencilGenerator;