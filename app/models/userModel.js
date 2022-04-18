const bookshelf = require('../../database/bookshelf')

const User = bookshelf.model('User', {
    tableName: 'users',
    hidden:[password]
})

module.exports = User