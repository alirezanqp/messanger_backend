const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

module.exports.register = async(req, res) => {
    const { name, email, password } = req.body
    const result =  await prisma.user.create({
       data: {
        name,
        email,
        password
       } 
    })
    res.json(result)
}

