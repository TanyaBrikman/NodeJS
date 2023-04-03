const createPath = require('../helpers/create-path')

const getContacts = (req, res) => {
    const title = 'Contacts'
    const contacts = [
        {name: 'GitHub', link: 'https://github.com/TanyaBrikman'},
        {name: 'YouTube', link: 'https://www.youtube.com/TanyaBrikman'},
    ]
    res.render(createPath('contact'), {contacts, title})
}

module.exports = {
    getContacts
}