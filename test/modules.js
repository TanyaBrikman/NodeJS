const os = require('os')
const {userName: user, sayHi} = require('./test')
const name = 'Tanya'
console.log(sayHi(name))
module.exports = name
console.log(os.platform(), os.release())