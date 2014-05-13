# <%= site.name %>

Static site genearted by [generator-pencil](https://github.com/RobinQu/generator-pencil)


## Build

```
grunt build
```

## Preview

Start a http server to preview your generated content

```
grunt preview
```

<% if(site.git) { %>
## Deploy

Deploy your site to Github page

```
grunt deploy
```
<% } %>