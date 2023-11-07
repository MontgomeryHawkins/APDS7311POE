const mongoose = require('mongoose')
const Joi = require('joi')
const userschema = mongoose.Schema(
    {
        username: {type: String, required:true},
        password: {type: String, required:true},
        firstname: {type: String, required:true},
        lastname: {type: String, required:true}
    }
)

const User = mongoose.model('User', userschema)

function validateUser(user) {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(3).max(50).required(),
        firstname: Joi.string().max(50).required(),
        lastname: Joi.string().max(50).required()
    })
    return schema.validate(user);
}

module.exports = {User, validateUser};