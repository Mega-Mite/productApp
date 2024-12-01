const jwt = require('jsonwebtoken')
const db = require('../config/config.js')
const { ObjectId } = require('mongodb')
const verifyAuth = async (req, res, next) => {
    const encode = req.cookies.encode
    console.log(encode)
    jwt.verify(encode, 'sanju', async (err, decodedTocken) => {
        try {
            if (err) {
                console.log(err)
                 res.redirect('/signUp')
                next()
            } else if (decodedTocken) {
                console.log(decodedTocken)
                await db.get().collection('clients').findOne({ _id: new ObjectId(decodedTocken.id) }).then((data) => {
                    if (data) {
                        next()
                    } else {
                        
                        next()
                    }
                })
            } else if (!decodedTocken) {
                // res.redirect('/signUp')
                next()
            }
        } catch (error) {
            console.log(error)
        }
    })
}

module.exports = verifyAuth