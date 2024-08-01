const Blog = require('../models/blog')

const initialBlogs = [
  {
    author: 'Author A',
    title: 'Blog A',
    url: 'aaaa',
    likes: 1
  },
  {
    author: 'Author B',
    title: 'Blog B',
    url: 'bbbb',
    likes: 5
  }
]

const nonExistingId = async () => {
  const sillyBlog = { 
    author: 'willremovethissoon', 
    title: 'willremovethissoon', 
    url: 'willremovethissoon', 
    likes: 0 
  }

  const blog = new Blog(sillyBlog)
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}