const http = require('http')
const fs = require('fs')
const path = require('path')

const PORT = 3000
const server = http.createServer((req, res) => {
    console.log('Server request')
    console.log('Just for test')

    res.setHeader('Content-Type', 'text/html')
    // res.write('<head><link rel="stylesheet" href="#"></head>')
    // res.write('<h1>Hello</h1>')
    // const data = JSON.stringify([
    //     {name: 'Tanya', age: 27},
    //     {name: 'Dima', age: 26}
    //     ])
    // res.end(data)

    const createPath = (page) => path.resolve(__dirname, 'views', `${page}.html`)

    let basePath = ''

    switch (req.url) {
        case '/':
            basePath = createPath('index')
            break
        case '/contact':
            basePath = createPath('contact')
            break
        default:
            basePath = createPath('error')
            break
    }
        fs.readFile(basePath, (err, data) => {
            if(err) {
                console.log(err)
                res.end()
            }
            else {
                res.write(data)
                res.end()
            }
        })

})
server.listen(PORT,(error) => {
    error ? console.log(error) : console.log(`Listening port ${PORT}`)
})
