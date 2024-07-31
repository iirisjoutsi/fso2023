var _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.length === 0 ? undefined : blogs.reduce((max, current) => current.likes > max.likes ? current : max)
}

const mostBlogs = (blogs) => {
  const groupByAuthor = _.groupBy(blogs, 'author');
    
  const mostBlogsAuthor = _.maxBy(Object.keys(groupByAuthor), author => groupByAuthor[author].length);
    
    return { author: mostBlogsAuthor, blogs: groupByAuthor[mostBlogsAuthor].length };
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}