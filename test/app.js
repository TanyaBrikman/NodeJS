const fs = require('fs')

fs.readFile('./text.txt', 'utf8', (err, data) => {
    fs.mkdir('./files', () => {
        fs.writeFile('./files/text2.txt', `${data} new text`, (err) => {
            if(err) {
                throw err
            }
        })
    })

    fs.rmdir('./files', (err) => {
        if (err) {
        throw err
    }})

})
