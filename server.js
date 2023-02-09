const express = require('express')
const path = require('path')
const morgan = require('morgan')

const app = express()

const PORT = 3000

app.set('view engine', 'ejs')

const createPath = (page) => path.resolve(__dirname, 'ejs-views', `${page}.ejs`)

app.listen(PORT, (error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`)
})

app.use(morgan(':method :url :status :res[content-lenght] - :response-time ms'))

app.use(express.static('styles'))
app.get('/', (req, res) => {
    const title = 'Home'
    res.render(createPath('index'), {title})
})

app.get('/posts/:id', (req, res) => {
    const title = 'Post'
    res.render(createPath('post'), {title})
})

app.get('/posts', (req, res) => {
    const title = 'Posts'
    res.render(createPath('posts'), {title})
})

app.get('/add-post', (req, res) => {
    const title = 'Add post'
    res.render(createPath('add-post'), {title})
})

app.get('/contacts', (req, res) => {
    const title = 'Contacts'
    const contacts = [
        {name: 'GitHub', link: 'https://github.com/TanyaBrikman' },
        {name: 'YouTube', link: 'https://www.youtube.com/TanyaBrikman'},
    ]
    res.render(createPath('contact'), { contacts, title })
})

app.use((req, res) => {
    const title = 'Error page'
    res.status(404)
       .render(createPath('error'), {title})
})


