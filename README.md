# generator-pencil

> [Yeoman](http://yeoman.io) generator for making static websites


## Getting Started

### What is Yeoman?

Learn Yeoman at: http://yeoman.io

```
$ npm install -g yo
```

### Pencil Generators

To install generator-pencil from npm, run:

```
$ npm install -g generator-pencil
```

Finally, initiate the generator. You will be guided to setup a static site project, with `Grunt` and `bower`.

```
$ yo pencil
```

#### Basic usage

Preview built files locally

```
grunt preview
```

Deploy to github branch, likely `gh-pages`

```
grunt deploy
```

### Configurations

Open `Gruntfile.js` and edit to match your settings.

See more documentation at project home sites of these important components that power this generator:

* [grunt-writer](https://github.com/RobinQu/grunt-writer/commits?author=RobinQu)
* [marked](https://github.com/chjj/marked)


### Sub-geneartor

To create a new post

```
yo pencil:post "My brand new car"
```

### Getting To Know Yeoman

Yeoman has a heart of gold. He's a person with feelings and opinions, but he's very easy to work with. If you think he's too opinionated, he can be easily convinced.

If you'd like to get to know Yeoman better and meet some of his friends, [Grunt](http://gruntjs.com) and [Bower](http://bower.io), check out the complete [Getting Started Guide](https://github.com/yeoman/yeoman/wiki/Getting-Started).


## License

MIT
