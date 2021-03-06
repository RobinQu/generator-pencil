var util = require("util");
var path = require("path");
var yeoman = require("yeoman-generator");
var chalk = require("chalk");
var Moniker = require("moniker");
var validator = require("validator");

var PencilGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require("../package.json");
    
    this.pencil = this.read("./pencil");

    this.on("end", function () {
      if (!this.options["skip-install"]) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.pencil);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta("You\"re using the fantastic Pencil generator."));
    var prompts = [{
      type: "input",
      name: "sitename",
      message: "What is your site name?",
      default: Moniker.choose()
    }, {
      type: "input",
      name: "git",
      message: "Github repo url (Leave it blank if you are not using Github Pages)"
    }, {
      type: "input",
      name: "author",
      message: "Author name of this site",
      default: "Great writer"
    }, {
      type: "input",
      name: "url",
      message: "URL this site",
      validate: function(input) {
        return validator.isURL(input);
      }
    }, {
      type: "input",
      name: "disqus",
      message: "Enter your Disqus username to enable comment feature (Leave it blank if you don't want to use Disqus)"
    }, {
      type: "input",
      name: "primary",
      message: "Where would like to store the documents?",
      default: "src/contents/blog"
    }];

    this.prompt(prompts, function (props) {
      var site = {};
      site.name = props.sitename;
      site.git = props.git;
      site.author = props.author;
      site.url = props.url.replace(/\/$/, "");
      this.site = site;
      this.primary = props.primary.split("/").pop();
      this.disqus = props.disqus;
      
      done();
    }.bind(this));
  },
  
  persist: function () {
    this.write(".writerrc", JSON.stringify({
      "primary": this.primary
    }));
  },

  app: function () {
    this.mkdir("src");

    this.template("_package.json", "package.json");
    this.template("_README.md", "README.md");
    this.template("_Gruntfile.js", "Gruntfile.js");
    this.directory("contents", "src/contents");
    this.directory("templates", "src/templates");
    this.directory("data", "src/data");
    this.directory("assets", "src/assets");
    
    // bower is not used currently
    this.template("_bower.json", "bower.json");
    this.copy("bowerrc", ".bowerrc");
    this.copy("gitignore", ".gitignore");
  },

  projectfiles: function () {
    this.copy("editorconfig", ".editorconfig");
    this.copy("jshintrc", ".jshintrc");
  },
  
  createfirst: function () {
    this.log(chalk.magenta("Create a sample post"));
    
    this.invoke("pencil:post", {
      args: ["brand new page"]
    });
  }
});

module.exports = PencilGenerator;