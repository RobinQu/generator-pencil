module.exports = function(grunt) {
  var pkg = grunt.file.readJSON("package.json");
  
  // Load all avaiable tasks
  require("load-grunt-tasks")(grunt);
  
  // Time how long tasks take. Can help when optimizing build times
  require("time-grunt")(grunt);
  
  grunt.initConfig({
    pkg: pkg,
    
    clean: {
      build: ["dist/**/*"]
    },
    
    concurrent: {
      build: [
        "sass:build",
        "imagemin:dist",
        "svgmin:dist",
        "copy:resources",
        "htmlmin"
      ]
    },
    
    writer: {
      all: {
        files: [{
          expand: true,
          src: "**/*.md",
          dest: "dist",
          ext: ".html",
          cwd: "src/contents"
        }],
        options: {
          markdownOptions: {
            gfm: true,
            sanitize: false,
            breaks: true,
            smartypants: true,
            highlight: "auto",
            langPrefix: "hjs-"
          },
          context: {
            buildDate: (new Date()).toISOString(),
            revision: <%= "\"\<\%\= meta.revision \%\>\"" %>
          }
        }
      }
    },
    

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: "src/assets/images",
          src: "{,*/}*.{gif,jpeg,jpg,png}",
          dest: "dist/images"
        }, {
          expand: true,
          cwd: "src/content",
          src: "**/*.{gif,jpeg,jpg,png}",
          dest: "dist"
        }]
      }
    },
    
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: "src/assets/images",
          src: "{,*/}*.svg",
          dest: "dist/images"
        }]
      }
    },
    
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: "dist",
          src: ["**/*.html", "!bower_components/**/*"],
          dest: "dist"
        }]
      }
    },
    
    sass: {
      build: {
        files: {
          "dist/css/blog.css": "src/assets/scss/blog.scss"
        },
        options: {
          imagePath: "/images",
          outputStyle: "compact",
          includePaths: []
        }
      }
    },
    
    <% if(site.git) { %>
    buildcontrol: {
      deploy: {
        options: {
          dir: "dist",
          commit: true,
          push: true,
          message: "Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%",
          remote: "<%= site.git %>",
          branch: "gh-pages"
        }
      }
    },
    <% } %>
    
    revision: {
      options: {
        property: "meta.revision",
        ref: "HEAD",
        short: true
      }
    },
    
    connect: {
      options: {
        port: 9000,
        livereload: 35729,
        // Change this to "0.0.0.0" to access the server from outside
        hostname: "0.0.0.0"
      },
      preview: {
        options: {
          open: false,
          base: ["dist"],
          livereload: false
        }
      }
    },
    
    copy: {
      
      resources: {
        files: [{
          cwd: "src/assets",
          dest: "dist",
          src: ["bower_components/**/*", "fonts/*", "js/**/*"],
          expand: true
        }, {
          src: "src/assets/gitignore",
          dest: "dist/.gitignore"
        }]
      }
    },
    
    watch: {
      markdown: {
        files: ["src/assets/scss/**/*.scss"],
        tasks: ["sass:build"]
      }
    }
  });
  
  grunt.registerTask("default", "build");
  
  grunt.registerTask("build", ["revision", "clean:build", "writer:all", "concurrent:build"]);
  
  grunt.registerTask("preview", ["build", "connect:preview", "watch"]);
  
  grunt.registerTask("publish", ["build", "buildcontrol:deploy"]);
};