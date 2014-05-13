module.exports = function(post) {
  // post = post || this.file;
  if(post) {
    if(post.ref.split("/").pop() === "index.md") {
      return "/" + post.ref.replace("index.md", "");
    }
    return "/" + post.ref.replace(/.md$/, post.metadata.ext || ".html");
  }
  return "/" + this.reference;
};