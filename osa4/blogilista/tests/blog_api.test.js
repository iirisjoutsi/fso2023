const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially some blogs saved', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  // BLOGS ARE JSON
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  // BLOGS INITIALISED CORRECTLY
  test.only('there are two blogs', async () => {
    const blogs = await helper.blogsInDb()
    
    assert.strictEqual(blogs.length, helper.initialBlogs.length)
  })

  // BLOG HAS id INSTEAD OF _id
  test('id as identifier', async () => {
    const blogs = await helper.blogsInDb()

    const correctId = (blog) => {
      return Object.keys(blog).includes('id') && !Object.keys(blog).includes('_id')
    }

    assert(blogs.every(correctId))
  })
})

describe('adding a blog', () => {
  // ADDING A BLOG
  test('a valid blog can be added ', async () => {
    const newBlog = {
      author: 'Author C',
      title: 'async/await simplifies making async calls',
      url: 'cccc',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()

    const title = blogs.map(e => e.title)

    assert.strictEqual(blogs.length, helper.initialBlogs.length + 1)
    assert(title.includes('async/await simplifies making async calls'))
  })

  // ADDING A BLOG WITH NO LIKES
  test('adding a blog without likes results in likes being 0', async () => {
    const newBlog = {
      author: 'Author D',
      title: 'async/await simplifies making async calls',
      url: 'dddd',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    const blogs = await helper.blogsInDb()

    assert.strictEqual(blogs[blogs.length - 1].likes, 0)
  })

  // ADDING A TEST WITH NO TITLE
  test('a blog with no author returns 400', async () => {
    const newBlog = {
      author: 'Author E',
      url: 'eeee',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  // ADDING A TEST WITH NO URL
  test('a blog with no url returns 400', async () => {
    const newBlog = {
      author: 'Author F',
      title: 'Blog F',
      likes: 10,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

// DELETING A BLOG
describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    
    const titles = blogsAtEnd.map(r => r.title)
    assert(!titles.includes(blogToDelete.title))
    
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)
  })
})

// UPDATING A BLOG
describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const newBlog = {
      author: 'Author C',
      title: 'async/await simplifies making async calls',
      url: 'cccc',
      likes: 10,
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
  
    const titles = blogsAtEnd.map(r => r.title)
    const authors = blogsAtEnd.map(r => r.author)
    const urls = blogsAtEnd.map(r => r.url)

    assert(titles.includes(newBlog.title))
    assert(authors.includes(newBlog.author))
    assert(urls.includes(newBlog.url))
  })
})

after(async () => {
  await mongoose.connection.close()
})