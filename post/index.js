var util = require('util');
var yeoman = require('yeoman-generator');


var PostGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
  },

  files: function () {
    var today = new Date(),
        dir,
        fp,
        content;
    dir = ["src/contents", today.getFullYear(), today.getMonth()+1, today.getDate()].join("/") + "/";
    fp = dir + this._.slugify(this.name) + "/index.md";
    content = ["---", "title: " + this.name, "date: " + new Date(), "template: article", "---"].join("\n");
    this.write(fp, content);
  }
});

module.exports = PostGenerator;