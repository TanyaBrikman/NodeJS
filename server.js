const express = require('express')
const chalk = require('chalk')
const morgan = require('morgan')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const postRoutes = require('./routes/post-routes')
const postApiRoutes = require('./routes/api-post-routes')
const contactRoutes = require('./routes/contact-routes')
const createPath = require('./helpers/create-path')

const errorMsg = chalk.bgKeyword('white').redBright
const successMsg = chalk.bgKeyword('green').whiteBright

const app = express()

//подключение шаблонизатора  (движок представлений)
app.set('view engine', 'ejs')

const PORT = 3000

mongoose
    .connect('mongodb://127.0.0.1:27017/test')
    .then((res) => console.log(successMsg('Connected to DB')))
    .catch(err => console.log(errorMsg(err)))

app.listen(PORT, (error) => {
    error ? console.log((error)) : console.log(successMsg(`Listening port ${PORT}`))
})

//Пормежуточное ПО(Middleware)
app.use(morgan(':method :url :status :res[content-lenght] - :response-time ms'))

app.use(express.urlencoded({extended: false}))

app.use(express.static('styles'))

app.use(methodOverride('_method'))

app.get('/', (req, res) => {
    const title = 'Home'
    res.render(createPath('index'), {title})
})

app.get('/posts/:id', (req, res) => {
    const title = 'Post'
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('post'), {post, title}))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })
})

app.delete('/posts/:id', (req, res) => {
    const title = 'Post'
    Post
        .findByIdAndDelete(req.params.id)
        .then(result => {
            res.sendStatus(200)
        })
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })
})

app.get('/edit/:id', (req, res) => {
    const title = 'Edit Post'
    Post
        .findById(req.params.id)
        .then((post) => res.render(createPath('edit-post'), {post, title}))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })
})

app.put('/edit/:id', (req, res) => {
    const {title, author, text } = req.body
    const { id } = req.params
    Post
        .findByIdAndUpdate(id, { title, author, text })
        .then(result => res.redirect(`/posts/${id}`))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })
})

app.get('/posts', (req, res) => {
    const title = 'Posts'
    Post
        .find()
        .sort({createdAt: -1})
        .then((posts) => res.render(createPath('posts'), {posts, title}))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })
})
nameUser.usernam
//Обработка post запроса
app.post('/add-post', (req, res) => {
    const {title, author, text} = req.body
    const post = new Post({title, author, text})
    post.save()
        .then((result) => res.redirect('/posts'))
        .catch((error) => {
            console.log(error)
            res.render(createPath('error'), {title: 'Error'})
        })
})

app.get('/add-post', (req, res) => {
    const title = 'Add post'
    res.render(createPath('add-post'), {title})
})

app.get('/contacts', (req, res) => {
    const title = 'Contacts'
    const contacts = [
        {name: 'GitHub', link: 'https://github.com/TanyaBrikman'},
        {name: 'YouTube', link: 'https://www.youtube.com/TanyaBrikman'},
    ]
    res.render(createPath('contact'), {contacts, title})
})

app.use((req, res) => {
    const title = 'Error page'
    res.status(404)
        .render(createPath('error'), {title})
})