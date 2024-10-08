const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
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
  const u = await User.findById(request.user)

  const blog = new Blog({
    title: b.title,
    author: b.author,
    url: b.url,
    likes: b.likes || 0,
    user: u._id
  })
  
  const result = await blog.save()

  u.blogs = u.blogs.concat(blog._id)
  await u.save()

  response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)
  
  if (request.user === blog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'token invalid' })
  }
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