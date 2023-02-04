const express = require('express')
const path = require('path')

const app = express()

const PORT = 3000

app.set('view engine', 'ejs')

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`)
})

app.get('/', (req, res) => {
    res.render(createPath('index'))
})

app.get('/posts/:id', (req, res) => {
    res.render(createPath('post'))
})

app.get('/posts', (req, res) => {
    res.render(createPath('posts'))
})

app.get('/add-post', (req, res) => {
    res.render(createPath('add-post'))
})

app.get('/contacts', (req, res) => {
    res.render(createPath('contact'))
})

app.use((req, res) => {
    res.status(404)
       .render(createPath('error'))
})


