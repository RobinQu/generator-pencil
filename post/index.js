var util = require("util");
var yeoman = require("yeoman-generator");


var PostGenerator = yeoman.generators.NamedBase.extend({
  init: function () {
    var config = {};
    try {
      config = JSON.parse(this.read(".wirterrc"));
    } catch (e) {}
    this.primary = config.primary || "blog";
  },

  files: function () {
    var today = new Date(),
        dir,
        fp,
        content;
    dir = ["src/contents", this.primary, today.getFullYear(), today.getMonth() + 1, today.getDate()].join("/") + "/";
    fp = dir + this._.slugify(this.name) + "/index.md";
    content = ["---", "title: " + this.name, "date: " + new Date(), "template: article", "---", "Enter your content here"].join("\n");
    this.write(fp, content);
  }
});

module.exports = PostGenerator;