const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogsRouter.post('/', (request, response, next) => {

  const b = request.body

  const blog = new Blog({
    title: b.title,
    author: b.author,
    url: b.url,
    likes: b.likes,
  })

  blog
    .save()
    .then(result => {
      response.json(result)
    })
    .catch(error => next(error))
})

module.exports = blogsRouter