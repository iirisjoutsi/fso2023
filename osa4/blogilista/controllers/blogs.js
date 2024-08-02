const blogsRouter = require('express').Router()
const { request } = require('../app')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }  
})

blogsRouter.post('/', async (request, response) => {

  const b = request.body

  const blog = new Blog({
    title: b.title,
    author: b.author,
    url: b.url,
    likes: b.likes || 0,
  })

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const b = request.body

  const blog = {
    title: b.title,
    author: b.author,
    url: b.url,
    likes: b.likes,
  }
  
  const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(newBlog)
})

module.exports = blogsRouter