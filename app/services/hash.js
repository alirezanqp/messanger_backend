const bcrypt = require('bcrypt')

module.exports.hash = async (pass) => {
    try {
        const salt = await bcrypt.genSalt(10)
        return await bcrypt.hash(pass, salt)
    } catch (error) {
       return false 
    }
}

module.exports.compare = (pass, user) => {
   return bcrypt.compare(pass, user.password)
}

