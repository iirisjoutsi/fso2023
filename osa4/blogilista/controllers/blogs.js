const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
  
    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch (e) {
    next(e)
  }  
})

blogsRouter.post('/', async (request, response, next) => {

  const b = request.body

  const blog = new Blog({
    title: b.title,
    author: b.author,
    url: b.url,
    likes: b.likes,
  })

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch(e) {
    next(e)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (e) {
    next(e)
  }
})

module.exports = blogsRouter