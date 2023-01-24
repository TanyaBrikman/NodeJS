const EventEmitter = require('events')

class Logger extends EventEmitter {
   log = (msg) => {
        console.log(msg)
        this.emit('event', {id:1, text: 'test text'})
}

}

module.exports = Logger