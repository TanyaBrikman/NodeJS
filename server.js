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

app.use(postRoutes)
app.use(contactRoutes)
app.use(postApiRoutes)

app.use((req, res) => {
    const title = 'Error page'
    res.status(404)
        .render(createPath('error'), {title})
})